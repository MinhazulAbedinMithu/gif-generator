import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <div className="w-[900px] mx-auto">
    <App />
  </div>,
);
