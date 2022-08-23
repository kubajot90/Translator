export class FooterIcons {
  constructor() {
    this.historyButtonElm = null;
    this.historyPanelElm = null;
    this.historySubtitleElm = null;

    this.saveButtonElm = null;
    this.savePanelElm = null;
    this.saveSubtitleElm = null;
    this.saveListElm = null;
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

    this.saveListElm = document.querySelector("[data-save-list]");
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

  createSaveItem(firstLang, secondLang, textFrom, textTo) {
    const item = document.createElement("li");
    item.classList.add("panel__item");
    item.innerHTML = `<div class="item__header">
        <div class="item__lang-box">
            <span class="translate__from">${firstLang}</span>
            <span class="material-symbols-outlined item__arrow">
            trending_flat
            </span>
            <span class="translate__to">${secondLang}</span>
        </div>
        
        <div class="item__icon-box">
                <span class="material-symbols-sharp item__star">
                    star
                    </span>
        </div>   
      </div>
      <div class="item__content">
          <span class="text__from">${textFrom}</span>
          <span class="text__to">${textTo}</span>
      </div>`;
    this.saveListElm.appendChild(item);
  }
}
