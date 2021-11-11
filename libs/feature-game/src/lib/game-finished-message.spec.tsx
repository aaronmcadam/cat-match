import { render, screen } from '@cat-match/shared-testing';
import { GameFinishedMessage } from './game-finished-message';

describe('GameFinishedMessage', () => {
  it('renders a game finished message', () => {
    render(<GameFinishedMessage />);

    expect(screen.getByText(/You completed the game!/)).toBeInTheDocument();
  });

  it('lets the player play the game again', () => {
    const handleReplayButtonClick = jest.fn();
    render(
      <GameFinishedMessage onReplayButtonClick={handleReplayButtonClick} />
    );

    screen.getByRole('button').click();

    expect(handleReplayButtonClick).toHaveBeenCalled();
  });
});
