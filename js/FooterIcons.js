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
      if (this.savePanelElm.classList.contains("save__panel--show"))
        this.toggleSavePanel();
    });

    this.saveButtonElm.addEventListener("click", () => {
      this.toggleSavePanel();
      if (this.historyPanelElm.classList.contains("history__panel--show"))
        this.toggleHistoryPanel();
    });
  }

  toggleHistoryPanel() {
    this.historyPanelElm.classList.toggle("history__panel--show");
    this.historyButtonElm.classList.toggle("footer__icon--active");
    this.historySubtitleElm.classList.toggle("footer__icon-subtitle--active");
  }

  toggleSavePanel() {
    this.savePanelElm.classList.toggle("save__panel--show");
    this.saveButtonElm.classList.toggle("footer__icon--active");
    this.saveSubtitleElm.classList.toggle("footer__icon-subtitle--active");
  }
}
