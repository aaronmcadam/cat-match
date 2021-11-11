import { render, screen } from '@cat-match/shared-testing';
import { CatIcon } from './cat-icon';

describe('CatIcon', () => {
  it('renders a cat icon', () => {
    render(<CatIcon />);

    expect(screen.getByTestId('icon-cat')).toBeInTheDocument();
  });
});
