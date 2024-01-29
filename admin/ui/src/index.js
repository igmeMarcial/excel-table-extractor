import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import App from "./App";
import "./index.css"

// Render the app
const root = createRoot(document.getElementById("aesa-wrapper"));
root.render(
  <FluentProvider theme={webLightTheme} className='shadow rounded-b pb-6'>
    <ConfigProvider locale={esES}
      theme={{
        token: {
          colorPrimary: '#2271B1',
          borderRadius: 4,
        },
        components: {
          Button: {
            fontWeight: 600,
          },
        },
      }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </FluentProvider>
);
