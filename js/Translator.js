import { LanguagePanel } from "./LanguagePanel.js";
import { languagesList } from "./languagesList.js";

export class Translator {
  constructor() {
    this.textareaLeftElm = null;
    this.textareaRightElm = null;
    this.loaderElm = null;
    this.detectButtonElm = null;
    this.detectButtonAfterElm = null;

    this.fetchTimeout = null;

    this.firstLanguage = null;
    this.secondLanguage = null;
    this.detectedLanguage = null;
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
    this.detectButtonElm = document.querySelector("[data-detect-lang]");
    this.detectButtonAfterElm = document.querySelector(
      "[data-detect-lang-after]"
    );
  }

  eventlisteners() {
    this.textareaLeftElm.addEventListener("input", () => {
      this.setApiEndpoint();
      this.delayFetch(this.API__ENDPOINT);
      // this.changeDetectButtonText();
    });

    this.textareaLeftElm.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.isSpaceClick = true;
    });

    this.detectButtonElm.addEventListener("click", () => {
      this.isLanguageAutodetect = true;
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

      if (this.languagePanel.isLanguageAutodetect) {
        const detectedLanguage = parsedResponse.responseData.detectedLanguage
          ? parsedResponse.responseData.detectedLanguage
          : this.resetButtonDetect();

        this.detectedLanguage =
          languagesList[detectedLanguage].name.toUpperCase();
      }
      parsedResponse.responseStatus === "403"
        ? this.displayText(this.textToTranslate)
        : this.displayText(parsedResponse.responseData.translatedText);

      this.loaderHide();
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  setApiEndpoint() {
    this.textToTranslate = this.textareaLeftElm.value;
    // this.firstLanguage = "Autodetect";
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
    this.changeDetectButtonText();
    this.resetTextarea();
  }

  changeDetectButtonText() {
    if (this.firstLanguage === "Autodetect") {
      this.detectButtonElm.classList.add("hide");
      this.detectButtonAfterElm.style.display = "block";
      this.detectButtonAfterElm.textContent = `WYKRYTO:${this.detectedLanguage}`;
    }
  }

  resetButtonDetect() {
    this.detectButtonElm.classList.remove("hide");
    this.detectButtonAfterElm.style.display = "none";
  }

  resetTextarea() {
    if (this.textareaLeftElm.value === "") {
      this.textareaRightElm.innerHTML =
        '<span class="textarea__placeholder">Tłumaczenie</span>';
      this.resetButtonDetect();
    }
  }

  loaderShow() {
    this.loaderElm.style.display = "inline-block";
  }

  loaderHide() {
    this.loaderElm.style.display = "none";
  }
}
