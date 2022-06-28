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
    content: { control: 'text' },
    borderRadius: { control: { type: 'range', min: 0, max: 30, step: 1 } },
    boxShadow: { control: 'text' },
  },
} as Meta;


// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Bali',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  borderRadius: 10,
  boxShadow: '2 2 10 10 rgba(0,0,0,0.5)'
};

export const Secondary = Template.bind({});
Secondary.args = {
  title: 'Chicago',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  borderRadius: 0,
  boxShadow: '2 2 10 10 pink'
};
