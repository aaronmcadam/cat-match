import { render, screen } from '@cat-match/shared-testing';
import { GameCard } from './game-card';
import { CardStatus } from './machines/game-machine';

describe('GameCard', () => {
  it('renders a card', () => {
    render(
      <GameCard
        card={{
          id: 'card-1',
          status: CardStatus.DEFAULT,
          photo: {
            id: 'photo-1',
            src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          },
        }}
      />
    );

    expect(screen.getByTestId('game-card')).toBeInTheDocument();
  });

  it('renders an empty box when the card is removed (to keep its place in the grid)', () => {
    render(
      <GameCard
        card={{
          id: 'card-1',
          status: CardStatus.REMOVED,
          photo: {
            id: 'photo-1',
            src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          },
        }}
      />
    );

    expect(screen.queryByTestId('game-card')).not.toBeInTheDocument();
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });

  it('renders an icon by default', () => {
    render(
      <GameCard
        card={{
          id: 'card-1',
          status: CardStatus.DEFAULT,
          photo: {
            id: 'photo-1',
            src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          },
        }}
      />
    );

    expect(screen.getByTestId('card-default')).toBeInTheDocument();
    expect(screen.getByTestId('icon-cat')).toBeInTheDocument();
  });

  it('renders a photo when the card is selected', () => {
    render(
      <GameCard
        card={{
          id: 'card-1',
          status: CardStatus.SELECTED,
          photo: {
            id: 'photo-1',
            src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          },
        }}
      />
    );

    expect(screen.getByTestId('card-selected')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Cat' })).toBeInTheDocument();
  });

  it('lets users select cards', () => {
    const handleCardClick = jest.fn();
    render(
      <GameCard
        card={{
          id: 'card-1',
          status: CardStatus.DEFAULT,
          photo: {
            id: 'photo-1',
            src: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80',
          },
        }}
        onClick={handleCardClick}
      />
    );

    screen.getByTestId('game-card').click();

    expect(handleCardClick).toHaveBeenCalled();
  });
});
