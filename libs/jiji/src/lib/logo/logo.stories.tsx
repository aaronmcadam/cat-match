import { Story, Meta } from '@storybook/react';
import { Logo, LogoProps } from './logo';

export default {
  component: Logo,
  title: 'Logo',
} as Meta;

const Template: Story<LogoProps> = (args) => <Logo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  h: 24,
};
