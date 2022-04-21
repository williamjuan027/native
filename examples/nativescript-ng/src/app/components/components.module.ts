import { ComponentFactoryResolver, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseModule } from "../core/base.module";
import { ButtonComponent } from "./button/button.component";
import { LabelComponent } from "./label/label.component";

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonComponent, LabelComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule extends BaseModule {
  dynamicComponents = [ButtonComponent, LabelComponent];

  constructor(componentFactoryResolver: ComponentFactoryResolver) {
    super(componentFactoryResolver);
  }
}