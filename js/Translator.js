import { LanguagePanel } from "./LanguagePanel.js";
import { languagesList } from "./languagesList.js";
import { Navigation } from "./Navigation.js";

export class Translator {
  constructor() {
    this.textareaLeftElm = null;
    this.textareaRightElm = null;
    this.loaderElm = null;
    this.panelBackgroundElm = null;
    this.textareaXMarkElm = null;

    this.fetchTimeout = null;

    this.firstLanguage = null;
    this.secondLanguage = null;
    this.detectedLanguage = "";
    this.textToTranslate = null;

    this.API = "https://api.mymemory.translated.net";
    this.API__ENDPOINT = null;

    this.isSpaceClick = false;

    this.languagePanel = new LanguagePanel();
    this.languagePanel.init();
    this.navigation = new Navigation();
    this.navigation.init();
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
    this.resetTextareaLeft();
  }

  htmlElements() {
    this.textareaLeftElm = document.querySelector("[data-textarea-left]");
    this.textareaRightElm = document.querySelector("[data-textarea-right]");
    this.loaderElm = document.querySelector("[data-loader]");
    this.panelBackgroundElm = document.querySelector("[data-panel-background]");
    this.textareaXMarkElm = document.querySelector("[data-x-mark]");
  }

  eventlisteners() {
    this.textareaLeftElm.addEventListener("input", () => {
      this.elementShow(this.textareaXMarkElm);
      this.setApiEndpoint();
      this.delayFetch(this.API__ENDPOINT);
      this.changeDetectButtonText(this.detectedLanguage);
    });

    this.textareaLeftElm.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.isSpaceClick = true;
    });

    this.textareaXMarkElm.addEventListener("click", () => {
      this.resetTextareaLeft();
      this.resetTextareaRight();
      this.languagePanel.hideDetectButtonAfter();
      this.elementHide(this.textareaXMarkElm);
      this.elementHide(this.panelBackgroundElm);
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
    this.elementShow(this.loaderElm);
    try {
      const response = await fetch(endpoint);
      const parsedResponse = await response.json();
      console.log(parsedResponse);

      if (this.languagePanel.isLanguageAutodetect) {
        const detectedLanguage = parsedResponse.responseData.detectedLanguage
          ? parsedResponse.responseData.detectedLanguage
          : this.languagePanel.hideDetectButtonAfter();
        this.detectedLanguage =
          languagesList[detectedLanguage].name.toUpperCase();
      }
      parsedResponse.responseStatus === "403"
        ? this.displayText(this.textToTranslate)
        : this.displayText(parsedResponse.responseData.translatedText);

      this.elementHide(this.loaderElm);
      this.elementShow(this.panelBackgroundElm);
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  setApiEndpoint() {
    this.textToTranslate = this.textareaLeftElm.value;

    this.firstLanguage = this.languagePanel.isLanguageAutodetect
      ? "Autodetect"
      : this.languagePanel.currentLanguage.left;

    this.secondLanguage = this.languagePanel.currentLanguage.right;

    this.API__ENDPOINT = `${this.API}/get?q=${this.textToTranslate}!&langpair=${this.firstLanguage}|${this.secondLanguage}`;
  }

  displayText(text) {
    if (text === "!" || text.slice(-2) === "!#") {
      this.textareaRightElm.textContent = "";
    } else {
      this.textareaRightElm.textContent = text.replace("!", "");
    }
    this.changeDetectButtonText(this.detectedLanguage);
    this.resetTextareaRight();
    // this.languagePanel.hideDetectButtonAfter();
  }

  changeDetectButtonText(text) {
    if (this.firstLanguage === "Autodetect") {
      this.languagePanel.detectButtonAfterElm.textContent = `WYKRYTO:${text}`;
      this.languagePanel.showDetectButtonAfter();
    }
  }

  resetTextareaRight() {
    if (this.textareaLeftElm.value === "") {
      this.textareaRightElm.innerHTML =
        '<span class="textarea__placeholder">Tłumaczenie</span>';
    }
  }

  resetTextareaLeft() {
    this.textareaLeftElm.value = "";
  }

  elementShow(element) {
    element.style.display = "inline-block";
  }

  elementHide(element) {
    element.style.display = "none";
  }
}
