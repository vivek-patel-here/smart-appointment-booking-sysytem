import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "remixicon/fonts/remixicon.css";
import { StoreProvider } from "./Contexts/Store.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreProvider>
        <App />
    </StoreProvider>
  </BrowserRouter>
);
