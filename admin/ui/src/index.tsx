import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ConfigProvider } from 'antd';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { store } from './app/store';

import esES from 'antd/lib/locale/es_ES';
import App from './App';
import './index.css';
import { AesaInfo } from './types/AesaInfo';
// Globals
declare global {
  interface Window {
    AesaInfo: AesaInfo;
  }
}
// Antd Config
const antdThemeConfig = {
  token: {
    colorPrimary: '#2271B1',
    borderRadius: 4,
  },
  components: {
    Button: {
      fontWeight: 600,
    },
  },
};
// Render the app
const targetElementId = 'aesa-wrapper';
const rootElement = document.getElementById(targetElementId);
if (!rootElement) {
  throw new Error(`Element with id ${targetElementId} not found`);
}
const root = createRoot(rootElement);
root.render(
  <FluentProvider theme={webLightTheme} className="shadow rounded-b pb-8">
    <ConfigProvider locale={esES} theme={antdThemeConfig}>
      <BrowserRouter>
        <ReduxStoreProvider store={store}>
          <App />
        </ReduxStoreProvider>
      </BrowserRouter>
    </ConfigProvider>
  </FluentProvider>
);
