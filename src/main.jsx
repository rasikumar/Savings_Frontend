import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import Provider from "./context/Provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <Provider>
          <App />
        </Provider>
        <Toaster />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
