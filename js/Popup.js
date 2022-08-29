export class Popup {
  constructor() {
    this.popupELm = document.querySelector("[data-popup]");
    this.popupButton = document.querySelector("[data-popup-button]");
    this.popupButton.addEventListener("click", () => this.hidePopup());
  }

  hidePopup() {
    this.popupELm.style.display = "none";
  }
}
