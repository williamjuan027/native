// Button.stories.ts

import { Meta, Story } from '@storybook/angular';

import { LabelComponent } from './label.component';
import { listenToStoryChange } from '../../core/deep-link-generator';


// TODO: move this to somehwere that makes sense
// it has to be called once to generate deeplinks
listenToStoryChange();

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Example/Label',
  component: LabelComponent,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as Meta;


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<LabelComponent> = (args: LabelComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  // primary: true,
  text: 'TEST TEXT',
  color: 'blue'
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary',
  color: 'green'
};
