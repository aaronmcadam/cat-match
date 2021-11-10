import { Box, Heading } from '@cat-match/jiji';
import { render, screen } from './test-utils';

function ComponentRequiringProviders() {
  return (
    <Box>
      <Heading>CatMatch</Heading>
    </Box>
  );
}

describe('Test utils', () => {
  test('wraps components in the design system', () => {
    render(<ComponentRequiringProviders />);

    expect(screen.getByRole('heading')).toHaveTextContent('CatMatch');
  });
});
