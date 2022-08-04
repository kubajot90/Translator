export class Translator {
  constructor() {
    this.textareaLeftElm = null;
    this.textareaRightElm = null;
    this.loaderElm = null;
    this.languageListItems = null;

    this.fetchTimeout = null;

    this.firstLanguage = null;
    this.secondLanguage = null;
    this.textToTranslate = null;

    this.API = "https://api.mymemory.translated.net";
    this.API__ENDPOINT = null;

    this.isSpaceClick = false;
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
    this.languageListItems = document.querySelectorAll("[data-language-item]");
  }

  eventlisteners() {
    this.textareaLeftElm.addEventListener("input", () => {
      this.setApiEndpoint();
      this.delayFetch(this.API__ENDPOINT);
    });

    this.textareaLeftElm.addEventListener("keydown", (e) => {
      if (e.code === "Space") this.isSpaceClick = true;
    });

    this.languageListItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(e.target.dataset.code);
        this.activeItem(item);
      });
    });
  }

  delayFetch(endpoint) {
    clearTimeout(this.fetchTimeout);
    if (this.isSpaceClick) {
      this.fetchData(endpoint);
      console.log("loader");
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
      this.displayText(parsedResponse.responseData.translatedText);
      this.loaderHide();
    } catch (err) {
      console.log("ERROR");
      console.log(err);
    }
  }

  setApiEndpoint() {
    this.textToTranslate = this.textareaLeftElm.value;
    this.firstLanguage = "pl";
    this.secondLanguage = "en";

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

  activeItem(item) {
    item.classList.toggle("list__item--active");
  }
}
