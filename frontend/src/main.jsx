import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UseContext from "./context/UseContext.jsx";
import UseSocketApi from "./context/UseSocketApi.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UseContext>
        <UseSocketApi>
        <App />
        </UseSocketApi>
      </UseContext>
    </BrowserRouter>
  </StrictMode>
);
