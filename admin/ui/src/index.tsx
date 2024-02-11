import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { ConfigProvider } from "antd";
import esES from "antd/lib/locale/es_ES";
import App from "./App";
import "./index.css";
// Globals
declare global {
  interface Window {
    AesaInfo: any;
  }
}
// Antd Config
const antdThemeConfig = {
  token: {
    colorPrimary: "#2271B1",
    borderRadius: 4,
  },
  components: {
    Button: {
      fontWeight: 600,
    },
  },
};
// Render the app
const targetElementId = "aesa-wrapper";
const rootElement = document.getElementById(targetElementId);
if (!rootElement) {
  throw new Error(`Element with id ${targetElementId} not found`);
}
const root = createRoot(rootElement);
root.render(
  <FluentProvider theme={webLightTheme} className="shadow rounded-b pb-0">
    <ConfigProvider locale={esES} theme={antdThemeConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </FluentProvider>
);
