import { render, screen } from '@cat-match/shared-testing';

import { App } from './app';

describe('App', () => {
  it('displays the app name', () => {
    render(<App />);

    expect(screen.getByText('CatMatch')).toBeInTheDocument();
  });
});
