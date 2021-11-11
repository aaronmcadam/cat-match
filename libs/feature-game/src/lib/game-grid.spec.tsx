import { render, screen } from '@cat-match/shared-testing';
import { GameGrid } from './game-grid';
import { CardStatus } from './machines/game-machine';

const cards = [
  {
    id: 'card-1',
    status: CardStatus.DEFAULT,
    photo: {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    },
  },
  {
    id: 'card-2',
    status: CardStatus.DEFAULT,
    photo: {
      id: 'photo-1',
      src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
    },
  },
];

describe('GameGrid', () => {
  it('renders a the grid of cards', () => {
    render(<GameGrid pairCount={0} cards={cards} />);

    expect(screen.getAllByTestId('game-card')).toHaveLength(2);
  });

  it('lets users select cards', () => {
    const handleCardClick = jest.fn();
    render(
      <GameGrid pairCount={0} cards={cards} onCardClick={handleCardClick} />
    );

    screen.getAllByTestId('game-card')[0].click();

    expect(handleCardClick).toHaveBeenCalled();
  });

  it('renders the current number of pairs', () => {
    render(<GameGrid pairCount={1} cards={cards} />);

    expect(screen.getByRole('heading')).toHaveTextContent('1 pair');
  });
});
