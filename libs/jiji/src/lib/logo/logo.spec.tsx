import { render, screen } from '@cat-match/shared-testing';

import { Logo } from './logo';

describe('Logo', () => {
  it('renders', () => {
    render(<Logo />);

    expect(screen.getByTestId('logo')).toBeInTheDocument();
  });
});
