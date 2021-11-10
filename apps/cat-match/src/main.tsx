import { JijiProvider } from '@cat-match/jiji';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app/app';

ReactDOM.render(
  <StrictMode>
    <JijiProvider>
      <App />
    </JijiProvider>
  </StrictMode>,
  document.getElementById('root')
);
