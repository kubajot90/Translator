export class Navigation {
  constructor() {
    this.navigationLogo = null;
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
  }

  htmlElements() {
    this.navigationLogo = document.querySelector("[data-nav-logo-box]");
  }

  eventlisteners() {
    this.navigationLogo.addEventListener("click", () =>
      this.refreshAplication()
    );
  }

  refreshAplication() {
    window.location.reload();
  }
}
