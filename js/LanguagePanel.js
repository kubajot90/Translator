export class LanguagePanel {
  constructor() {
    this.languagePanelElm = null;
    this.languageButtonsElm = null;
    this.mainPanelElm = null;
    this.mainFooterElm = null;
    this.footerElm = null;
    this.expandIconsBackgroundElm = null;

    this.isbuttonExpandclick = false;
  }

  init() {
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
  }

  eventlisteners() {
    this.languageButtonsElm.forEach((button, index) =>
      button.addEventListener("click", () => {
        this.togglePanelVisibility();
        this.buttonsAnimation(button, index);
      })
    );

    // this.expandIconsBackgroundElm.forEach((element) => {
    //   element.addEventListener("click", () =>
    //     element.classList.toggle("expand-icon--click")
    //   );
    // });
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
}
