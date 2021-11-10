import { render } from '@testing-library/react';

import { JijiProvider } from './jiji-provider';

describe('JijiProvider', () => {
  it('renders', () => {
    const { baseElement } = render(<JijiProvider />);
    expect(baseElement).toBeTruthy();
  });
});
