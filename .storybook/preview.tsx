import React from 'react';
import { JijiProvider } from '../libs/jiji/src';

function withProviders(StoryFn: Function) {
  return (
    <JijiProvider>
      <StoryFn />
    </JijiProvider>
  );
}

// Makes every story work with React Router and Orion
export const decorators = [withProviders];

export const parameters = {
  // Remove padding from the storybook so that we can see the layout as it would
  // normally be rendered.
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
};
