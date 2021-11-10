import { render, screen } from '@cat-match/shared-testing';

import { GameScreen } from './game-screen';

describe('GameScreen', () => {
  it('renders the name of the app', () => {
    render(<GameScreen />);

    expect(screen.getByRole('heading')).toHaveTextContent('CatMatch');
  });
});
