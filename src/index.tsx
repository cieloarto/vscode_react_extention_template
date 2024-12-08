import { createRoot } from "react-dom/client";
import { App } from "./app";

function getElementById(elementId: string): HTMLElement {
  const element = document.getElementById(elementId);
  if (element === null) {
    throw new Error(`Element with ID ${elementId} not found`);
  }
  return element;
}

const element = getElementById('app');

const root = createRoot(element);
root.render(<App />);
