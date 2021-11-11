import { render, screen } from '@cat-match/shared-testing';

import { GameScreen } from './game-screen';

describe('GameScreen', () => {
  // Seeing the following error:
  // Missing onError handler for invocation 'fetchPhotos', error was 'ReferenceError: fetch is not defined'. Stacktrace was 'ReferenceError: fetch is not defined
  // We might want to use MSW to stub the API call, or stub it with jest.
  it.skip('renders the name of the app', () => {
    render(<GameScreen />);

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Find the matching pairs and have fun!'
    );
  });
});
