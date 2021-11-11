import { Story, Meta } from '@storybook/react';
import {
  GameFinishedMessage,
  GameFinishedMessageProps,
} from './game-finished-message';

export default {
  component: GameFinishedMessage,
  title: 'GameFinishedMessage',
} as Meta;

const Template: Story<GameFinishedMessageProps> = (args) => (
  <GameFinishedMessage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
