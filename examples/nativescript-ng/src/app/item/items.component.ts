import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core'
import { UrlHandlerService } from '../services/url-handler.service';
import { DynamicComponentService } from '../services/dynamic-component.service';
import { ButtonComponent } from '../components/button/button.component';

export const TEMP_COMPONENT_MAPPING = {
  'ns-button': ButtonComponent
}

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  @ViewChild('target', { read: ViewContainerRef, static: true })
  target: ViewContainerRef;
  message: string = '';

  constructor(
    private cfr: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private dynamicComponentService: DynamicComponentService
  ) {}

  ngOnInit(): void {
    this.listenToUrlChange();
  }

  listenToUrlChange(): void {
    let storybookUrl;
    UrlHandlerService.getInstance().handleOpenURL((storybook) => {
      if (storybook.url === storybookUrl) {
        return;
      }
      storybookUrl = storybook.url;

      console.log('======================================');
      console.log('url changed', storybook);
      console.log('--------------------------------------');
      this.message = storybook.params.label

      this.target.clear();
      if (!!storybook.params?.component) {
        const argsString = decodeURIComponent(storybook.params.args)
        let args = {}
        if (argsString) {
          args = argsString.split(';').reduce((args, arg) => {
            const [key, val] = arg.split(':');
            args[key] = val;
            return args;
          }, {})
          console.log('--- args', args);
        }
        this.dynamicComponentService.getComponentBySelector(storybook.params.component, () => import("../components/components.module").then(m => m.ComponentsModule)).then(componentRef => {
          this.addComponentInputs(componentRef, args);
          this.target.insert(componentRef.hostView);
          this.changeDetectorRef.detectChanges();
        }).catch(error => {
          console.log('error', error);
        });
      }


// console.log('--- comp', TEMP_COMPONENT_MAPPING[storybook.params.component]);
// try {

//   const compFactory = this.cfr.resolveComponentFactory(TEMP_COMPONENT_MAPPING[storybook.params.component]);
//   const componentRef = this.target.createComponent(compFactory);
//   const { instance } = componentRef;
// } catch(error) {
// console.log('error', error);
// }
      // For some reason, manual change detection ref is only working when getting the ref from the injector (rather than componentRef.changeDetectorRef)
      // const childChangeDetectorRef: ChangeDetectorRef =
      //   componentRef.injector.get(ChangeDetectorRef);
    })
  }

  addComponentInputs(componentRef: ComponentRef<unknown>, inputs: any) {
    if (componentRef && componentRef.instance && inputs) {
      Object.keys(inputs).forEach(p => {
        return (componentRef.instance[p] = inputs[p])
      });
      (<any>componentRef.instance).ngOnChanges();
      componentRef.changeDetectorRef.detectChanges();
    }
  }
}
