import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.info(
  "HackRore Test Suite • Production Build • © Ravindra Ahire"
);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(<App />);
