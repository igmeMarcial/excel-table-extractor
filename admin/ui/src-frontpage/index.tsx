import './check-globals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { store } from './app/store';
import App from './App';
import { AesaInfo } from '../src/types/AesaInfo';
import './index.css';

// Globals
declare global {
  interface Window {
    AesaInfo: AesaInfo;
  }
}

// Render the app
const targetElementId = 'aesa-frontpage-wrapper';
const rootElement = document.getElementById(targetElementId);
if (!rootElement) {
  throw new Error(`Element with id ${targetElementId} not found`);
}
const root = createRoot(rootElement);
root.render(
  <FluentProvider theme={webLightTheme}>
    <BrowserRouter>
      <ReduxStoreProvider store={store}>
        <App />
      </ReduxStoreProvider>
    </BrowserRouter>
  </FluentProvider>
);
