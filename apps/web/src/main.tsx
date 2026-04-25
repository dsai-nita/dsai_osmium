import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./App.css"
import { BrowserRouter } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
    <SpeedInsights />
  </BrowserRouter>
);
