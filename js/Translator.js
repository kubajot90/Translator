import { LanguagePanel } from "./LanguagePanel.js";
import { languagesList } from "./languagesList.js";
import { Navigation } from "./Navigation.js";
import { FooterPanel } from "./FooterPanel.js";

export class Translator {
  constructor() {
    this.textareaLeftElm = null;
    this.textareaRightElm = null;
    this.loaderElm = null;
    this.panelBackgroundElm = null;
    this.textareaXMarkElm = null;
    this.counterElm = null;
    this.panelRightElm = null;
    this.panelStarIconElm = null;
    this.panelCopyIconElm = null;
    this.languageButtonsRightElm = null;

    this.fetchTimeout = null;

    this.firstLanguage = null;
    this.secondLanguage = null;
    this.detectedLanguage = "";
    this.textToTranslate = null;
    this.translatedText = null;

    this.API = "https://api.mymemory.translated.net";
    this.API__ENDPOINT = null;

    this.isSpaceClick = false;

    this.languagePanel = new LanguagePanel();
    this.languagePanel.init();
    this.navigation = new Navigation();
    this.navigation.init();
    this.footerPanel = new FooterPanel();
    this.footerPanel.init();

    this.lettersCounter = 5000;
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
    this.counterElm = document.querySelector("[data-counter]");
    this.panelRightElm = document.querySelector("[data-panel-right]");
    this.panelStarIconElm = document.querySelector("[data-main-panel-star]");
    this.panelCopyIconElm = document.querySelector("[data-copy-icon]");
    // this.languageButtonsRightElm = document.querySelectorAll(
    //   "[data-buttons-lang-right]"
    // );
  }

  eventlisteners() {
    //   this.languageButtonsRightElm.forEach((button) => {
    //     button.addEventListener("click", () => {
    //       console.log("dziala");
    //       console.log(this.API__ENDPOINT);
    //       this.fetchData(this.API__ENDPOINT);
    //     });
    //   });

    this.textareaLeftElm.addEventListener("input", () => {
      this.elementShow(this.textareaXMarkElm);
      this.setApiEndpoint();
      this.delayFetch(this.API__ENDPOINT);
      this.changeDetectButtonText(this.detectedLanguage);
      this.textCounter();

      if (!this.textareaLeftElm.value) {
        this.hidePanel();
        this.elementHide(this.panelStarIconElm);
        this.elementHide(this.panelCopyIconElm);
      } else {
        this.elementShow(this.panelRightElm);
      }
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
      this.hidePanel();
      this.elementHide(this.panelStarIconElm);
      this.elementHide(this.panelCopyIconElm);
    });

    this.panelStarIconElm.addEventListener("click", () => {
      const firstLanguage = this.languagePanel.isLanguageAutodetect
        ? `Wykryto: ${this.detectedLanguage.toLowerCase()}`
        : languagesList[
            this.languagePanel.buttonLanguages.left[0]
          ].name.toLowerCase();

      const secondLanguage =
        languagesList[
          this.languagePanel.buttonLanguages.right[0]
        ].name.toLowerCase();

      this.footerPanel.createSaveItem(
        firstLanguage,
        secondLanguage,
        this.textToTranslate,
        this.translatedText
      );
      this.footerPanel.addItemToList(
        this.footerPanel.saveListElm,
        this.footerPanel.saveItemArr
      );
      this.footerPanel.subtitleCounter();
    });

    // this.panelCopyIconElm.addEventListener("click", () =>
    //   this.footerPanel.
    // );
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
      this.elementShow(this.panelStarIconElm);
      this.elementShow(this.panelCopyIconElm);
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
    console.log("first lang: " + this.firstLanguage);
    console.log("second lang: " + this.secondLanguage);

    this.API__ENDPOINT = `${this.API}/get?q=${this.textToTranslate}!&langpair=${this.firstLanguage}|${this.secondLanguage}`;
    console.log("API: " + this.API__ENDPOINT);
  }

  displayText(text) {
    if (text === "!" || text.slice(-2) === "!#") {
      this.textareaRightElm.textContent = "";
    } else {
      // this.textareaRightElm.textContent = text.replace("!", "");
      this.textareaRightElm.textContent = text.replace("!", "");
      this.translatedText = text.replace("!", "");
    }
    this.changeDetectButtonText(this.detectedLanguage);
    this.resetTextareaRight();
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

  textCounter() {
    const number = this.textareaLeftElm.value.length;
    this.counterElm.textContent = `${number} / 5 000`;
  }

  hidePanel() {
    if (window.innerWidth < "720") {
      this.elementHide(this.panelRightElm);
    }
  }
}
