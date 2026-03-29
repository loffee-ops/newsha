import ReactDOM from "react-dom/client";

import { AppProviders } from "@/app/providers/AppProvider";
import App from "./App";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element #root not found");
}

ReactDOM.createRoot(rootElement).render(
    <AppProviders>
        <App />
    </AppProviders>,
);
