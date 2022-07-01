// Button.stories.ts

import { Meta, Story } from '@storybook/angular';

import { ButtonComponent } from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  id: 'ns-button',
  title: 'Example/Button',
  component: ButtonComponent,
  argTypes: {
    text: { control: 'text' },
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    borderColor: { control: 'color' },
  },
} as Meta;


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
  text: 'Primary',
  color: '#FFF',
  backgroundColor: '#75ACEB',
  borderColor: 'transparent'
};

export const Secondary = Template.bind({});
Secondary.args = {
  text: 'Secondary',
  color: '#75ACEB',
  backgroundColor: '#FFF',
  borderColor: '#75ACEB'
};
