import { Box } from '@chakra-ui/react';
import { Story, Meta } from '@storybook/react';
import { GameCard, GameCardProps, GameCardStatus } from './game-card';

export default {
  component: GameCard,
  title: 'GameCard',
} as Meta;

const Template: Story<GameCardProps> = (args) => {
  return (
    <Box display="flex" w={32}>
      <GameCard {...args} />
    </Box>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  defaultStatus: GameCardStatus.DEFAULT,
};
