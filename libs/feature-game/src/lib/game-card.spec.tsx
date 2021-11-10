import { render, screen } from '@cat-match/shared-testing';
import { GameCard, GameCardStatus } from './game-card';

describe('GameCard', () => {
  it('renders the card', () => {
    render(<GameCard defaultStatus={GameCardStatus.DEFAULT} />);

    expect(screen.getByTestId('game-card')).toBeInTheDocument();
  });
});
