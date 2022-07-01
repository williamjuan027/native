// Button.stories.ts

import { Meta, Story } from '@storybook/angular';

import { CardComponent } from './card.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  id: 'ns-card',
  title: 'Example/card',
  component: CardComponent,
  argTypes: {
    title: { control: 'text' },
    titleColor: { control: 'color' },
    content: { control: 'text' },
    contentColor: { control: 'color' },
    borderRadius: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    imageBorderRadius: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    boxShadow: { control: 'text' },
  },
} as Meta;


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'NativeScript x Storybook',
  titleColor: '#555',
  content: 'Is this cool or what?',
  contentColor: '#777',
  borderRadius: 10,
  imageBorderRadius: 10,
  boxShadow: '2 2 5 5 rgba(0,0,0,0.5)'
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Storybook on Simulators',
  titleColor: '#75ACEB',
  content: 'This is pretty cool right?',
  contentColor: '#777',
  borderRadius: 0,
  imageBorderRadius: 0,
  boxShadow: '0 0 5 0 #75ACEB'
};
