import { languagesList } from "./languagesList.js";

export class LanguagePanel {
  constructor() {
    this.languagePanelElm = null;
    this.languageExpandButtonsElm = null;
    this.mainPanelElm = null;
    this.mainFooterElm = null;
    this.footerElm = null;
    this.expandIconsBackgroundElm = null;
    this.languagesListElm = null;
    this.languageListItems = null;
    this.languageButtonsLeft = null;
    this.languageButtonsRight = null;

    this.isbuttonExpandclick = false;

    this.buttonLanguages = ["pl", "en", "de"];
    this.currentLanguage = this.buttonLanguages[0];
    this.lastLanguage = this.buttonLanguages[1];
    this.beforeLastLanguage = this.buttonLanguages[2];
  }

  init() {
    this.createListItem();
    this.htmlElements();
    this.eventlisteners();
    this.buttonText();
  }

  htmlElements() {
    this.languagePanelElm = document.querySelector("[data-lang-panel]");
    this.mainPanelElm = document.querySelector("[data-main-panel]");
    this.mainFooterElm = document.querySelector("[data-main-footer]");
    this.footerElm = document.querySelector("[data-footer]");

    this.expandIconsBackgroundElm = document.querySelectorAll(
      "[data-expand-icon-background]"
    );
    this.languageExpandButtonsElm = document.querySelectorAll(
      "[data-button-lang-expand]"
    );
    this.languageListItems = document.querySelectorAll("[data-language-item]");

    this.languageButtonsLeft = document.querySelectorAll(
      "[data-buttons-lang-left]"
    );

    this.languageButtonsRight = document.querySelectorAll(
      "[data-buttons-lang-right]"
    );
  }

  eventlisteners() {
    this.languageExpandButtonsElm.forEach((button, index) =>
      button.addEventListener("click", () => {
        this.togglePanelVisibility();
        this.buttonsAnimation(button, index);
      })
    );

    this.languageListItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(e.target.dataset.code);
        const languageCode = e.target.dataset.code;
        // const languageName = languagesList[languageCode].name;
        this.activeItem(item);
        this.changeLanguage(languageCode);
        this.buttonText();
        this.togglePanelVisibility();
        this.isbuttonExpandclick = false;
        this.rotateButtonsBack();
      });
    });

    this.languageButtonsLeft.forEach((button) => {
      button.addEventListener("click", (e) => {
        console.log(e.target.dataset.code);
        if (this.isbuttonExpandclick) {
          this.isbuttonExpandclick = false;
          this.togglePanelVisibility();
          this.rotateButtonsBack();
        }
      });
    });
  }

  // changeLanguage(languageName) {
  //   const temporary = this.buttonLanguages[0];
  //   this.buttonLanguages[0] = languageName;
  //   this.buttonLanguages[2] = this.buttonLanguages[1];
  //   this.buttonLanguages[1] = temporary;

  //   this.setButtonLanguagesOrder();
  //   console.log(this.buttonLanguages);
  // }

  // setButtonLanguagesOrder() {
  //   this.currentLanguage = this.buttonLanguages[0];
  //   this.lastLanguage = this.buttonLanguages[1];
  //   this.beforeLastLanguage = this.buttonLanguages[2];
  // }

  changeLanguage(languageCode) {
    const temporary = this.buttonLanguages[0];
    this.buttonLanguages[0] = languageCode;
    this.buttonLanguages[2] = this.buttonLanguages[1];
    this.buttonLanguages[1] = temporary;

    this.setButtonLanguagesOrder();
    console.log(this.buttonLanguages);
  }

  setButtonLanguagesOrder() {
    this.currentLanguage = this.buttonLanguages[0];
    this.lastLanguage = this.buttonLanguages[1];
    this.beforeLastLanguage = this.buttonLanguages[2];
  }

  togglePanelVisibility() {
    this.toggleElementVisibility(this.languagePanelElm);
    this.toggleElementVisibility(this.mainPanelElm);
    this.toggleElementVisibility(this.mainFooterElm);
    this.toggleElementVisibility(this.footerElm);
  }

  toggleElementVisibility(element) {
    element.classList.toggle("hide");
  }

  // buttonText() {
  //   this.languageButtonsLeft.forEach((button, index) => {
  //     button.textContent = this.buttonLanguages[index].toUpperCase();
  //   });
  // }
  buttonText() {
    this.languageButtonsLeft.forEach((button, index) => {
      button.textContent =
        languagesList[this.buttonLanguages[index]].name.toUpperCase();
      button.dataset.code = this.buttonLanguages[index];
    });
  }

  buttonsAnimation(button, index) {
    if (this.isbuttonExpandclick) {
      // this.languageExpandButtonsElm.forEach((element) =>
      //   element.classList.remove("rotate")
      // );
      this.rotateButtonsBack();
      this.isbuttonExpandclick = false;
    } else {
      button.classList.toggle("rotate");
      this.isbuttonExpandclick = true;
    }

    const backgroudElm = this.expandIconsBackgroundElm[index];
    backgroudElm.classList.add("expand-icon--click");
    setTimeout(() => backgroudElm.classList.remove("expand-icon--click"), 300);
  }

  rotateButtonsBack(button = this.languageExpandButtonsElm) {
    button.forEach((element) => element.classList.remove("rotate"));
  }

  createListItem() {
    for (const property in languagesList) {
      const nameLowerCase = languagesList[property].name
        .toLowerCase()
        .replace(/,|;/gi, "")
        .split(" ")[0];

      const item = `<li class="list__item" data-code="${property}" data-language-item>${nameLowerCase}</li>`;

      this.drawList(item);
    }
  }

  drawList(item) {
    this.languagesListElm = document.querySelector("[data-lang-list]");
    this.languagesListElm.insertAdjacentHTML("beforeend", item);
  }

  activeItem(item) {
    item.classList.toggle("list__item--active");
  }
}
