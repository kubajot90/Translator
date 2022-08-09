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
    this.languageListItemsElm = null;
    this.languageButtonsLeftElm = null;
    this.languageButtonsRightElm = null;
    this.detectButtonElm = null;
    this.detectButtonAfterElm = null;
    this.leftPanel = null;
    this.rightPanel = null;

    this.isbuttonExpandclick = false;
    this.isLanguageAutodetect = true;
    this.languageExpandButtonleftClick = null;

    this.buttonLanguages = {
      left: ["pl", "en", "de"],
      right: ["pl", "en", "de"],
    };
    this.currentLanguage = {
      left: this.buttonLanguages.left[0],
      right: this.buttonLanguages.right[0],
    };

    this.lastLanguage = {
      left: this.buttonLanguages.right[1],
      right: this.buttonLanguages.right[1],
    };

    this.beforeLastLanguage = {
      left: this.buttonLanguages.left[2],
      right: this.buttonLanguages.right[2],
    };

    this.languagesWithHistoryIcon = [];
  }

  init() {
    this.createListItem();
    this.htmlElements();
    this.eventlisteners();
    this.buttonText(this.languageButtonsLeftElm, "left");
    this.buttonText(this.languageButtonsRightElm, "right");
    this.languageListItemsElm[1].style.display = "none";
  }

  htmlElements() {
    this.languagePanelElm = document.querySelector("[data-lang-panel]");
    this.mainPanelElm = document.querySelector("[data-main-panel]");
    this.mainFooterElm = document.querySelector("[data-main-footer]");
    this.footerElm = document.querySelector("[data-footer]");
    this.detectButtonElm = document.querySelector("[data-detect-lang]");
    this.detectButtonAfterElm = document.querySelector(
      "[data-detect-lang-after]"
    );
    this.leftPanel = document.querySelector("[data-left-panel]");
    this.rightPanel = document.querySelector("[data-right-panel]");

    this.expandIconsBackgroundElm = document.querySelectorAll(
      "[data-expand-icon-background]"
    );
    this.languageExpandButtonsElm = document.querySelectorAll(
      "[data-button-lang-expand]"
    );
    this.languageListItemsElm = document.querySelectorAll(
      "[data-language-item]"
    );

    this.languageButtonsLeftElm = document.querySelectorAll(
      "[data-buttons-lang-left]"
    );

    this.languageButtonsRightElm = document.querySelectorAll(
      "[data-buttons-lang-right]"
    );
  }

  eventlisteners() {
    this.languageExpandButtonsElm.forEach((button, index) =>
      button.addEventListener("click", () => {
        this.togglePanelVisibility();
        this.buttonsAnimation(button, index);
        index
          ? (this.languageExpandButtonleftClick = false)
          : (this.languageExpandButtonleftClick = true);
      })
    );

    this.languageListItemsElm.forEach((item) => {
      item.addEventListener("click", (e) => {
        const languageCode = e.target.dataset.code;
        this.AddHistoryIcon(item);
        this.addButtonActiveClass("list__item--active", item);
        this.addButtonActiveClass(
          "list__item-active-icon--show",
          item.firstElementChild
        );
        this.addButtonActiveClass(
          "main__button-lang--active",
          this.languageButtonsLeftElm[0],
          this.leftPanel
        );

        languageCode === "Autodetect"
          ? (this.isLanguageAutodetect = true)
          : (this.isLanguageAutodetect = false);

        if (!this.isLanguageAutodetect) {
          if (this.languageExpandButtonleftClick) {
            this.changeLanguage(languageCode, "left");
            this.buttonText(this.languageButtonsLeftElm, "left");
          } else {
            this.changeLanguage(languageCode, "right");
            this.buttonText(this.languageButtonsRightElm, "right");
          }
        }

        this.togglePanelVisibility();
        this.isbuttonExpandclick = false;
        this.rotateButtonsBack();
      });
    });

    this.languageButtonsLeftElm.forEach((button) => {
      button.addEventListener("click", (e) => {
        const languageCode = e.target.dataset.code;
        this.hideDetectButtonAfter();
        this.addButtonActiveClass(
          "main__button-lang--active",
          e.target,
          this.leftPanel
        );
        this.changeLanguage(languageCode, "left");
        this.isLanguageAutodetect = false;
        this.checkButtonExpandClick();
      });
    });

    this.languageButtonsRightElm.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.addButtonActiveClass(
          "main__button-lang--active",
          e.target,
          this.rightPanel
        );
        this.hideDetectButtonAfter();
        const languageCode = e.target.dataset.code;
        this.changeLanguage(languageCode, "right");
        this.checkButtonExpandClick();
      });
    });

    this.detectButtonElm.addEventListener("click", () => {
      this.isLanguageAutodetect = true;
      this.addButtonActiveClass(
        "main__button-lang--active",
        this.detectButtonElm,
        this.leftPanel
      );
    });
  }

  addButtonActiveClass(className, ofElement, inElement) {
    this.removeAllActiveClass(className, inElement);
    this.changeClass("add", ofElement, className);
  }

  showDetectButtonAfter() {
    this.changeClass("add", this.detectButtonElm, "hide");
    this.detectButtonAfterElm.style.display = "block";
    this.changeClass(
      "add",
      this.detectButtonAfterElm,
      "main__button-lang--active"
    );
  }

  hideDetectButtonAfter() {
    this.detectButtonElm.classList.remove("hide");
    this.detectButtonAfterElm.style.display = "none";
  }

  checkButtonExpandClick() {
    if (this.isbuttonExpandclick) {
      this.isbuttonExpandclick = false;
      this.togglePanelVisibility();
      this.rotateButtonsBack();
    }
  }

  changeLanguage(languageCode, buttonsSide) {
    const temporary = this.buttonLanguages[buttonsSide][0];
    this.buttonLanguages[buttonsSide][0] = languageCode;
    this.buttonLanguages[buttonsSide][2] = this.buttonLanguages[buttonsSide][1];
    this.buttonLanguages[buttonsSide][1] = temporary;

    this.setButtonLanguagesOrder(buttonsSide);
  }

  setButtonLanguagesOrder(buttonsSide) {
    this.currentLanguage[buttonsSide] = this.buttonLanguages[buttonsSide][0];
    this.lastLanguage[buttonsSide] = this.buttonLanguages[buttonsSide][1];
    this.beforeLastLanguage[buttonsSide] = this.buttonLanguages[buttonsSide][2];
  }

  togglePanelVisibility() {
    this.toggleElementVisibility(this.languagePanelElm);
    this.toggleElementVisibility(this.mainPanelElm);
    this.toggleElementVisibility(this.mainFooterElm);
    this.toggleElementVisibility(this.footerElm);
  }

  buttonText(elements, buttonsSide) {
    elements.forEach((button, index) => {
      button.textContent =
        languagesList[
          this.buttonLanguages[buttonsSide][index]
        ].name.toUpperCase();
      button.dataset.code = this.buttonLanguages[buttonsSide][index];
    });
  }

  buttonsAnimation(button, index) {
    if (this.isbuttonExpandclick) {
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

      const item = `<li class="list__item" data-code="${property}" data-language-item>
      <span class="material-symbols-outlined list__item-active-icon">done</span>
      <span class="material-symbols-outlined list__item-history-icon">history</span>
      ${nameLowerCase}
      </li>`;

      this.drawList(item);
    }
  }

  drawList(item) {
    this.languagesListElm = document.querySelector("[data-lang-list]");
    this.languagesListElm.insertAdjacentHTML("beforeend", item);
  }

  removeAllActiveClass(selector, inElement = document) {
    const allActiveElements = inElement.querySelectorAll(`.${selector}`);
    allActiveElements.forEach((item) =>
      this.changeClass("remove", item, selector)
    );
  }

  changeClass(action, element, className) {
    element.classList[action](className);
  }

  toggleElementVisibility(element) {
    element.classList.toggle("hide");
  }

  AddHistoryIcon(item) {
    this.AddToHistoryArr(item);
    this.removeAllActiveClass("list__item-history-icon--show");
    this.languagesWithHistoryIcon.forEach((language, index) => {
      if (index > 0) {
        this.changeClass(
          "add",
          language.lastElementChild,
          "list__item-history-icon--show"
        );
      }
    });
  }

  AddToHistoryArr(item) {
    const firstItem = this.languagesWithHistoryIcon[0];
    if (item != firstItem) {
      this.languagesWithHistoryIcon.unshift(item);
    }
    if (this.languagesWithHistoryIcon.length > 5)
      this.languagesWithHistoryIcon.pop();
    console.log(this.languagesWithHistoryIcon);
  }
}
