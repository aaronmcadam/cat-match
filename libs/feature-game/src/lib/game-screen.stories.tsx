import { Story, Meta } from '@storybook/react';
import { GameScreen, GameScreenProps } from './game-screen';

export default {
  component: GameScreen,
  title: 'GameScreen',
} as Meta;

const Template: Story<GameScreenProps> = (args) => <GameScreen {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
