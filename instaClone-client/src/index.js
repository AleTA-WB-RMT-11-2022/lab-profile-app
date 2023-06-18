import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CurrentProfileWrapper } from "./context/profile.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProviderWrapper>
      <CurrentProfileWrapper>
        <App />
      </CurrentProfileWrapper>
    </AuthProviderWrapper>
  </Router>
);
