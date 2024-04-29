import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Theme } from '@pearsonwfs/component-library';

import GlobalStyle from 'styles/GlobalStyle';
import App from 'screens/AppContent';

ReactDOM.render(
  <StrictMode>
    <GlobalStyle />
    {/* <BrowserRouter basename={basename}> */}
    <Theme theme="workforce">
      <App />
    </Theme>
    {/* </BrowserRouter> */}
  </StrictMode>,
  document.getElementById('root')
);
