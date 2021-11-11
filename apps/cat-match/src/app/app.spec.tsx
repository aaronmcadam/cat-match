import { render, screen } from '@cat-match/shared-testing';

import { App } from './app';

describe('App', () => {
  // Seeing the following error:
  // Missing onError handler for invocation 'fetchPhotos', error was 'ReferenceError: fetch is not defined'. Stacktrace was 'ReferenceError: fetch is not defined
  // We might want to use MSW to stub the API call, or stub it with jest.
  it.skip('displays the app name', () => {
    render(<App />);

    expect(screen.getByText('CatMatch')).toBeInTheDocument();
  });
});
