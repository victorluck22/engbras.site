import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import "./assets/styles/fonts.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <BrowserRouter basename="/engbras.site/">
          <App />

          <Toaster />
        </BrowserRouter>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>
);
