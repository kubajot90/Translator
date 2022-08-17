export class Navigation {
  constructor() {
    this.navigationLogoElms = null;
    this.navigationLeftElm = null;
    this.navigationIconElm = null;
    this.containerElm = null;
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
  }

  htmlElements() {
    this.navigationLogoElms = document.querySelectorAll("[data-nav-logo-box]");

    this.navigationLeftElm = document.querySelector("[data-nav-left]");

    this.navigationIconElm = document.querySelector("[data-nav-icon]");

    this.containerElm = document.querySelector("[data-container]");
  }

  eventlisteners() {
    this.navigationLogoElms.forEach((elm) =>
      elm.addEventListener("click", () => this.refreshAplication())
    );

    this.navigationIconElm.addEventListener("click", () =>
      this.showLeftNavigation()
    );

    document.addEventListener("wheel", () => this.hideLeftNavigation());

    this.containerElm.addEventListener("click", () =>
      this.hideLeftNavigation()
    );
  }

  refreshAplication() {
    window.location.reload();
  }

  hideLeftNavigation() {
    this.navigationLeftElm.style.transform = "translateX(-120%)";
  }

  showLeftNavigation() {
    this.navigationLeftElm.style.transform = "translateX(0)";
  }
}
