import { Box } from '@chakra-ui/react';
import { Story, Meta } from '@storybook/react';
import { GameCard, GameCardProps } from './game-card';
import { CardStatus } from './machines/game-machine';

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

export const Default = Template.bind({});
Default.args = {
  card: {
    id: 'card-1',
    status: CardStatus.DEFAULT,
    photo: {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    },
  },
};

export const Selected = Template.bind({});
Selected.args = {
  card: {
    id: 'card-1',
    status: CardStatus.SELECTED,
    photo: {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    },
  },
};

export const Removed = Template.bind({});
Removed.args = {
  card: {
    id: 'card-1',
    status: CardStatus.REMOVED,
    photo: {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    },
  },
};
