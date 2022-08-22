export class FooterIcons {
  constructor() {
    this.historyButtonElm = null;
    this.historyPanelElm = null;
    this.historySubtitleElm = null;

    this.saveButtonElm = null;
    this.savePanelElm = null;
    this.saveSubtitleElm = null;
  }

  init() {
    this.htmlElements();
    this.eventlisteners();

    // clickAnimation(ClassSelector){
    //   ClassSelector = document.querySelector(".options__sort");
    //   ClassSelector.addEventListener("click", () => {
    //     const style = document.createElement("style");
    //     style.innerText = `.options__sort::after {
    //     position: absolute;
    //     content:'';
    //     top: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 100%;
    //     border-radius: 4px;
    //     background-color:  #5f636818;
    //     transition: .4s;
    //     animation: clickAnimation .1s ;
    // }`;
    //     ClassSelector.appendChild(style);
    //     setTimeout(() => {
    //       style.innerText = "";
    //     }, 100);
    //     ClassSelector.appendChild(style);
    //   });
    // }
  }

  htmlElements() {
    this.historyButtonElm = document.querySelector("[data-history-button]");

    this.historyPanelElm = document.querySelector("[data-history-panel]");

    this.historySubtitleElm = document.querySelector("[data-history-subtitle]");

    this.savePanelElm = document.querySelector("[data-save-panel]");

    this.saveButtonElm = document.querySelector("[data-save-button]");

    this.saveSubtitleElm = document.querySelector("[data-save-subtitle]");
  }

  eventlisteners() {
    this.historyButtonElm.addEventListener("click", () => {
      this.toggleHistoryPanel();
      if (this.savePanelElm.classList.contains("panel--show"))
        this.toggleSavePanel();
    });

    this.saveButtonElm.addEventListener("click", () => {
      this.toggleSavePanel();
      if (this.historyPanelElm.classList.contains("panel--show"))
        this.toggleHistoryPanel();
    });
  }

  toggleHistoryPanel() {
    this.historyPanelElm.classList.toggle("panel--show");
    this.historyButtonElm.classList.toggle("footer__icon--active");
    this.historySubtitleElm.classList.toggle("footer__icon-subtitle--active");
  }

  toggleSavePanel() {
    this.savePanelElm.classList.toggle("panel--show");
    this.saveButtonElm.classList.toggle("footer__icon--active");
    this.saveSubtitleElm.classList.toggle("footer__icon-subtitle--active");
  }
}
