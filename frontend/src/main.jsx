import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import UseContext from "./context/UseContext.jsx";
import UseSocketApi from "./context/UseSocketApi.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <UseContext>
      <UseSocketApi>
        <App />
      </UseSocketApi>
    </UseContext>
  </HashRouter>
);
