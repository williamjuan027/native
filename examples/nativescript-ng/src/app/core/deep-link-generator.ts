import { BehaviorSubject, combineLatest, debounceTime } from "rxjs";
import { addons } from "@storybook/addons";
import {
    ControllerManager,
    getFullDeepLinkUrl
  } from "@storybook/native-controllers";



export function listenToStoryChange(): void {
    const queryParams$ = new BehaviorSubject<Record<string, any>>({});
const component$ = new BehaviorSubject<string>('');
const channel = addons.getChannel();
console.log('channel', channel.eventNames());
channel.addListener('updateQueryParams', (queryParams) => {
  console.log('updateQueryParams', queryParams)
  queryParams$.next(queryParams);
})
channel.addListener('setCurrentStory', (story) => {
  console.log('setCurrentStory', story)


  // TODO: TEMPORARY WORKAROUND
    let componentName = '';
  if (story.storyId.toLowerCase().includes('button')) {
    componentName = 'ns-button';
  } else if (story.storyId.toLowerCase().includes('label')) {
    componentName = 'ns-label'
  }

//   const componentName = story.storyId;
  // TODO: find a way to get the component's selector from 
  // the component itself
//   console.log('ButtonComponent', LabelComponent);
//   const componentName = 'ns-button';
  component$.next(componentName);
})
    combineLatest([
      component$,
      queryParams$
    ]).pipe(
      debounceTime(200)
    )
    .subscribe(([component, queryParams]) => {
      console.log(component, queryParams);
      updateDeepLink(component, queryParams);
    })
}


// TODO: parse arguments correctly
function updateDeepLink(component: string, storyParams: Record<string,any>): void {
  const manager = new ControllerManager();
  const platform = 'ios';
  const context = platform;
  // const device = useDevice(platform);
  const controller = manager.getController(context);
  const deepLinkBaseUrl="sb-native://deep.link";
  // const deepLinkUrl = `${deepLinkBaseUrl}?${component}`;
  controller.updateConfig({
    settings: {
        device: 'ios'
    },
    platform,
    baseUrl: deepLinkBaseUrl
  });
  if (storyParams){ 
    const storyParamsWithExtras = { 
      component: component,
      args: storyParams?.args
     };
     const newAppUrl = getFullDeepLinkUrl(
       deepLinkBaseUrl,
       storyParamsWithExtras
    );
    console.log('=====================================');
    console.log('newAppUrl', newAppUrl);
    console.log('storyParamsWithExtras', storyParamsWithExtras);
    console.log('-------------------------------------');
    controller.openDeepLink(newAppUrl);
    return;
  }

  // TODO: update this so we can generate deeplinks without params
  // controller.openDeepLink(deepLinkUrl);
}