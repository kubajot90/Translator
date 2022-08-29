import { Translator } from "./Translator.js";
import { Popup } from "./Popup.js";

document.addEventListener("DOMContentLoaded", () => {
  const translator = new Translator();
  translator.init();
  const popup = new Popup();
});
