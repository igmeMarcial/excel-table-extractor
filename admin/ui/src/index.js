import { createRoot } from "react-dom/client";
import MainLayout from "./layout/MainLayout";
import {BrowserRouter} from "react-router-dom"
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import App from "./App";
import "./index.css"

// Render the app
const root = createRoot(document.getElementById("aesa-wrapper"));
root.render(
    <FluentProvider theme={teamsLightTheme}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </FluentProvider>
    

);
