import { LanguagePanel } from "./LanguagePanel.js";

export class Translator {
  constructor() {
    this.textareaLeftElm = null;
    this.textareaRightElm = null;
    this.loaderElm = null;

    this.fetchTimeout = null;

    this.firstLanguage = null;
    this.secondLanguage = null;
    this.textToTranslate = null;

    this.API = "https://api.mymemory.translated.net";
    this.API__ENDPOINT = null;

    this.isSpaceClick = false;

    this.languagePanel = new LanguagePanel();
    this.languagePanel.init();
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
    this.textareaLeftElm.value = "";
  }

  htmlElements() {
    this.textareaLeftElm = document.querySelector("[data-textarea-left]");
    this.textareaRightElm = document.querySelector("[data-textarea-right]");
    this.loaderElm = document.querySelector("[data-loader]");
  }

  eventlisteners() {
    this.textareaLeftElm.addEventListener("input", () => {
      this.setApiEndpoint();
      this.delayFetch(this.API__ENDPOINT);
    });

    this.textareaLeftElm.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.isSpaceClick = true;
    });
  }

  delayFetch(endpoint) {
    clearTimeout(this.fetchTimeout);
    if (this.isSpaceClick) {
      this.fetchData(endpoint);
      this.isSpaceClick = false;
    } else {
      this.fetchTimeout = setTimeout(() => this.fetchData(endpoint), 500);
    }
  }

  async fetchData(endpoint) {
    this.loaderShow();
    try {
      const response = await fetch(endpoint);
      const parsedResponse = await response.json();
      console.log(parsedResponse);
      this.displayText(parsedResponse.responseData.translatedText);
      this.loaderHide();
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  setApiEndpoint() {
    this.textToTranslate = this.textareaLeftElm.value;
    this.firstLanguage = "Autodetect";
    this.secondLanguage = "pl";

    this.API__ENDPOINT = `${this.API}/get?q=${this.textToTranslate}!&langpair=${this.firstLanguage}|${this.secondLanguage}`;
  }

  displayText(text) {
    console.log(text);
    if (text === "!" || text.slice(-2) === "!#") {
      this.textareaRightElm.textContent = "";
    } else {
      this.textareaRightElm.textContent = text;
    }
    this.resetTextarea();
  }

  resetTextarea() {
    if (this.textareaLeftElm.value === "") {
      this.textareaRightElm.innerHTML =
        '<span class="textarea__placeholder">Tłumaczenie</span>';
    }
  }

  loaderShow() {
    this.loaderElm.style.display = "inline-block";
  }

  loaderHide() {
    this.loaderElm.style.display = "none";
  }
}
