import { Translator } from "./Translator.js";
import { LanguagePanel } from "./LanguagePanel.js";

document.addEventListener("DOMContentLoaded", () => {
  const translator = new Translator();
  translator.init();
  const languagePanel = new LanguagePanel();
  languagePanel.init();
});
