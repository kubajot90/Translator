import { exampleSaveItems } from "./exampleSaveItems.js";

export class FooterPanel {
  constructor() {
    this.historyButtonElm = null;
    this.historyPanelElm = null;
    this.historySubtitleElm = null;

    this.saveButtonElm = null;
    this.savePanelElm = null;
    this.saveSubtitleElm = null;
    this.saveListElm = null;
    this.saveXMarkElm = null;
    this.saveSearchIconElm = null;
    this.saveSearchElm = null;
    this.saveSearchInputElm = null;
    this.saveOptionsElm = null;
    this.saveInputXMarkElm = null;

    this.saveSortButtonElm = null;
    this.saveSortMenuElm = null;
    this.saveOptionDateElm = null;
    this.saveDateCheckIconElm = null;
    this.saveOptionAlphabetElm = null;
    this.saveAlphabetCheckIconElm = null;
    this.saveTitleDotsIconElm = null;
    this.saveTitleDotsMenuElm = null;
    this.saveTitleDotsTextElm = null;
    this.subtitleCounterElm = null;

    this.saveItemArr = [...exampleSaveItems];
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
    this.addItemsToList(this.saveListElm, this.saveItemArr);
    this.saveItemArr.forEach((item) =>
      item.content.addEventListener("click", (e) => this.deleteItem(e))
    );
    this.subtitleCounter();
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
    this.historyXMarkElm = document.querySelector("[data-x-mark-history]");

    this.savePanelElm = document.querySelector("[data-save-panel]");
    this.saveButtonElm = document.querySelector("[data-save-button]");
    this.saveSubtitleElm = document.querySelector("[data-save-subtitle]");
    this.saveListElm = document.querySelector("[data-save-list]");
    this.saveXMarkElm = document.querySelector("[data-x-mark-panel-save]");
    this.saveSearchIconElm = document.querySelector("[data-title-search-icon]");
    this.saveSearchElm = document.querySelector("[data-title-search]");
    this.saveSearchInputElm = document.querySelector(
      "[data-title-search-input]"
    );
    this.saveOptionsElm = document.querySelector("[data-save-options]");

    this.saveInputXMarkElm = document.querySelector("[data-input-x-mark]");
    this.saveSortButtonElm = document.querySelector("[data-sort-button]");
    this.saveSortMenuElm = document.querySelector("[data-sort-menu]");
    this.saveOptionDateElm = document.querySelector("[data-sort-date]");
    this.saveDateCheckIconElm = document.querySelector("[data-date-check]");
    this.saveOptionAlphabetElm = document.querySelector("[data-sort-alphabet]");
    this.saveAlphabetCheckIconElm = document.querySelector(
      "[data-alphabet-check]"
    );
    this.saveTitleDotsIconElm = document.querySelector(
      "[data-title-dots-icon]"
    );
    this.saveTitleDotsMenuElm = document.querySelector(
      "[data-title-dots-menu]"
    );
    this.saveTitleDotsTextElm = document.querySelector(
      "[data-title-dots-text]"
    );
    this.subtitleCounterElm = document.querySelector("[data-subtitle-counter]");
  }

  eventlisteners() {
    this.historyButtonElm.addEventListener("click", () => {
      this.toggleHistoryPanel();
      if (this.savePanelElm.classList.contains("panel--show"))
        this.toggleSavePanel();
    });
    this.historyXMarkElm.addEventListener("click", () =>
      this.toggleHistoryPanel()
    );

    this.saveButtonElm.addEventListener("click", () => {
      this.toggleSavePanel();
      if (this.historyPanelElm.classList.contains("panel--show"))
        this.toggleHistoryPanel();
    });

    this.saveXMarkElm.addEventListener("click", () => this.toggleSavePanel());

    this.saveSearchIconElm.addEventListener("click", () => {
      this.saveSearchElm.style.display = "flex";
      this.saveOptionsElm.style.display = "none";
    });

    this.saveInputXMarkElm.addEventListener("click", () =>
      this.resetSaveInput()
    );

    this.saveSortButtonElm.addEventListener("click", () => {
      this.saveSortMenuElm.classList.toggle("hide");
      this.saveTitleDotsMenuElm.classList.add("hide");
    });

    document.addEventListener("click", (event) => this.closeMenu(event));

    this.saveOptionDateElm.addEventListener("click", () => {
      this.saveDateCheckIconElm.style.visibility = "visible";
      this.saveAlphabetCheckIconElm.style.visibility = "hidden";
    });

    this.saveOptionAlphabetElm.addEventListener("click", () => {
      this.saveDateCheckIconElm.style.visibility = "hidden";
      this.saveAlphabetCheckIconElm.style.visibility = "visible";
    });

    this.saveTitleDotsIconElm.addEventListener("click", () => {
      this.saveTitleDotsMenuElm.classList.toggle("hide");
      this.saveSortMenuElm.classList.add("hide");
    });

    this.saveTitleDotsTextElm.addEventListener("click", () => {
      this.clearPanelList(this.saveListElm, this.saveItemArr);
      this.subtitleCounter();
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
    this.resetSaveInput();
  }

  resetSaveInput() {
    this.saveSearchElm.style.display = "none";
    this.saveOptionsElm.style.display = "flex";
    this.saveSearchInputElm.value = "";
  }

  clearPanelList(panelElm, arr) {
    panelElm.innerHTML = "";
    arr.splice(0, arr.length);
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
                <span class="material-symbols-sharp item__star" data-item-remove-button>
                    star
                    </span>
        </div>   
      </div>
      <div class="item__content">
          <span class="text__from">${textFrom}</span>
          <span class="text__to">${textTo}</span>
      </div>`;

    item.addEventListener("click", (e) => this.deleteItem(e));

    const itemObj = { firstLanguage: firstLang, content: item };
    this.saveItemArr.unshift(itemObj);
  }

  addItemsToList(list, arr) {
    arr.forEach((item, index) => {
      item.content.dataset.indexOfItem = index;
      list.appendChild(item.content);
      // this.addRemoveButtonListener(item.content, index);
    });
  }

  addRemoveButtonListener(item, index) {
    const removeButton = item.querySelector("[data-item-remove-button]");
    removeButton.dataset.indexOfItem = index;

    removeButton.addEventListener("click", (e) => {
      const indexOfItem = e.target.dataset.indexOfItem;
      window.setTimeout(() => this.deleteItem(indexOfItem), 400);
    });
  }

  // deleteItem(indexOfItem) {
  //   this.deleteItemFromArr(this.saveItemArr, indexOfItem);
  //   this.saveListElm.innerHTML = "";
  //   this.addItemsToList(this.saveListElm, this.saveItemArr);
  //   this.subtitleCounter();
  // }
  deleteItem(e) {
    console.log(e.target.parentNode.parentNode.parentNode.dataset.indexOfItem);
    const indexOfItem =
      e.target.parentNode.parentNode.parentNode.dataset.indexOfItem;
    this.deleteItemFromArr(this.saveItemArr, indexOfItem);
    this.saveListElm.innerHTML = "";
    this.addItemsToList(this.saveListElm, this.saveItemArr);
    this.subtitleCounter();
  }

  deleteItemFromArr(array, indexOfItem) {
    array.splice(indexOfItem, 1);
  }

  closeMenu(event) {
    const isClickInsideSort = this.saveSortButtonElm.contains(event.target);
    const isClickInsideDots = this.saveTitleDotsIconElm.contains(event.target);

    if (!isClickInsideSort && !isClickInsideDots) {
      this.saveSortMenuElm.classList.add("hide");
      this.saveTitleDotsMenuElm.classList.add("hide");
    }
  }

  subtitleCounter() {
    const length = this.saveItemArr.length;
    this.subtitleCounterElm.textContent = `1-10 z ${length} wyrażeń`;
  }
}

// var a = [
// 	{FirsName:"Ellie", LastName:"Williams"},
// 	{FirstName:"Lara", LastName : "Croft"}
// ];
// function SortArray(x, y){
//     return x.LastName.localeCompare(y.LastName);
// }
// var s = a.sort(SortArray);
// console.log(s);
