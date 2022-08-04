import { Translator } from "./Translator.js";
import { LanguagePanel } from "./LanguagePanel.js";

document.addEventListener("DOMContentLoaded", () => {
  const languagePanel = new LanguagePanel();
  languagePanel.init();
  const translator = new Translator();
  translator.init();
});
