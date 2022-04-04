// Button.stories.ts

import { Meta, Story } from '@storybook/angular';
import { addons } from "@storybook/addons";

import { ButtonComponent } from './button.component';
// import { DeepLinkRenderer } from "@storybook/native-components";
import {
  ControllerManager,
  ACTION_EVENT_NAME,
  store,
  getAppetizeIframeId,
  getFullDeepLinkUrl
} from "@storybook/native-controllers";
import { useDevice } from "@storybook/native-devices";
import { BehaviorSubject, combineLatest, debounceTime } from 'rxjs';

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

  const componentName = story.storyId;
  component$.next(componentName);
})

combineLatest([
  component$,
  queryParams$
]).pipe(
  debounceTime(200)
)
.subscribe(([component, queryParams]) => {
  console.log('- q', queryParams);
  updateDeepLink(component, queryParams);
})


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
  // const args = storyParams?.args?.split(';').reduce((acc, curr) => {
  //   const [k, v] = curr.split(':');
  //   acc[k] = v
  //   return acc;
  // }, {})
  // console.log('- args', args);
  // const storyParamsWithExtras = { ...storyParams, ...extraParams };
  // const storyParamsWithExtras = {  };
  if (storyParams){ 
    const storyParamsWithExtras = { 
      component: component,
      args: storyParams?.args
     };
    console.log('storyParamsWithExtras', storyParamsWithExtras);
    const newAppUrl = getFullDeepLinkUrl(
      deepLinkBaseUrl,
      storyParamsWithExtras
    );
    console.log('--- newAppUrl', newAppUrl);
    controller.openDeepLink(newAppUrl);
    return;
  }
  // controller.openDeepLink(deepLinkUrl);
}

// export default {
//   /* 👇 The title prop is optional.
//   * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
//   * to learn how to generate automatic titles
//   */
//   title: 'Button',
//   component: ButtonComponent,
// } as Meta;

// export const Primary: Story = () => ({
//   props: {
//     text: 'Button',
//     backgroundColor: '#aaddee',
//   },
// });

// // also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
// import { Story, Meta } from '@storybook/angular/types-6-0';
// import Button from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: ButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  // primary: true,
  text: 'Primary',
  color: 'blue'
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary',
};

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
