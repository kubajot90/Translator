import { languagesList } from "./languagesList.js";

export class LanguagePanel {
  constructor() {
    this.languagePanelElm = null;
    this.languageButtonsElm = null;
    this.mainPanelElm = null;
    this.mainFooterElm = null;
    this.footerElm = null;
    this.expandIconsBackgroundElm = null;
    this.languagesListElm = null;
    this.languageListItems = null;

    this.isbuttonExpandclick = false;
  }

  init() {
    this.createListItem();
    this.htmlElements();

    this.eventlisteners();
  }

  htmlElements() {
    this.languagePanelElm = document.querySelector("[data-lang-panel]");
    this.mainPanelElm = document.querySelector("[data-main-panel]");
    this.mainFooterElm = document.querySelector("[data-main-footer]");
    this.footerElm = document.querySelector("[data-footer]");

    this.expandIconsBackgroundElm = document.querySelectorAll(
      "[data-expand-icon-background]"
    );
    this.languageButtonsElm = document.querySelectorAll(
      "[data-button-lang-expand]"
    );
    this.languageListItems = document.querySelectorAll("[data-language-item]");
  }

  eventlisteners() {
    this.languageButtonsElm.forEach((button, index) =>
      button.addEventListener("click", () => {
        this.togglePanelVisibility();
        this.buttonsAnimation(button, index);
      })
    );

    this.languageListItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log(e.target.dataset.code);
        this.activeItem(item);
      });
    });
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

  buttonsAnimation(button, index) {
    if (this.isbuttonExpandclick) {
      this.languageButtonsElm.forEach((element) =>
        element.classList.remove("rotate")
      );
      this.isbuttonExpandclick = false;
    } else {
      button.classList.toggle("rotate");
      this.isbuttonExpandclick = true;
    }

    const backgroudElm = this.expandIconsBackgroundElm[index];
    backgroudElm.classList.add("expand-icon--click");
    setTimeout(() => backgroudElm.classList.remove("expand-icon--click"), 300);
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
