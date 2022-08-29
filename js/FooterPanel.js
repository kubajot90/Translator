import { exampleSaveItems } from "./exampleSaveItems.js";

export class FooterPanel {
  constructor() {
    this.historyButtonElm = null;
    this.historyPanelElm = null;
    this.historySubtitleElm = null;
    this.historyListElm = null;
    this.historyClearButton = null;

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
    this.subtitleArrowLeftElm = null;
    this.subtitleArrowRightElm = null;

    this.saveItemArr = [...exampleSaveItems];
    this.sortedItemArr = null;
    this.subtitleCounterArr = [[]];
    this.subtitleCollectionCounter = 0;

    this.historyArr = [];

    this.isSortAlphabet = false;
  }

  init() {
    this.htmlElements();
    this.eventlisteners();
    this.addItemsToList(this.saveListElm, this.saveItemArr);
    this.addListenersToExampleItems();
    this.drawSubtitleCounter();
    this.checkIsArrowEnable();
  }

  htmlElements() {
    this.historyButtonElm = document.querySelector("[data-history-button]");
    this.historyPanelElm = document.querySelector("[data-history-panel]");
    this.historySubtitleElm = document.querySelector("[data-history-subtitle]");
    this.historyXMarkElm = document.querySelector("[data-x-mark-history]");
    this.historyListElm = document.querySelector("[data-history-list]");
    this.historyClearButton = document.querySelector("[data-history-clear]");

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

    this.subtitleArrowLeftElm = document.querySelector(
      "[data-subtitle-arrow-left]"
    );

    this.subtitleArrowRightElm = document.querySelector(
      "[data-subtitle-arrow-right]"
    );
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

    this.historyClearButton.addEventListener("click", () => {
      this.historyArr = [];
      this.historyListElm.innerHTML = "";
    });

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

    this.saveInputXMarkElm.addEventListener("click", () => {
      this.resetSaveInput();
      this.isSortAlphabet
        ? this.addItemsToList(this.saveListElm, this.sortedItemArr)
        : this.addItemsToList(this.saveListElm, this.saveItemArr);
    });

    this.saveSortButtonElm.addEventListener("click", () => {
      this.saveSortMenuElm.classList.toggle("hide");
      this.saveTitleDotsMenuElm.classList.add("hide");
    });

    document.addEventListener("click", (event) => this.closeMenu(event));

    this.saveOptionDateElm.addEventListener("click", () => {
      this.isSortAlphabet = false;
      this.saveDateCheckIconElm.style.visibility = "visible";
      this.saveAlphabetCheckIconElm.style.visibility = "hidden";
      this.addItemsToList(this.saveListElm, this.saveItemArr);
    });

    this.saveOptionAlphabetElm.addEventListener("click", () => {
      this.isSortAlphabet = true;
      this.saveDateCheckIconElm.style.visibility = "hidden";
      this.saveAlphabetCheckIconElm.style.visibility = "visible";
      this.sortAlphabet(this.saveItemArr);
      this.addItemsToList(this.saveListElm, this.sortedItemArr);
    });

    this.saveTitleDotsIconElm.addEventListener("click", () => {
      this.saveTitleDotsMenuElm.classList.toggle("hide");
      this.saveSortMenuElm.classList.add("hide");
    });

    this.saveTitleDotsTextElm.addEventListener("click", () => {
      this.clearPanelList(this.saveListElm, this.saveItemArr);
      this.drawSubtitleCounter();
    });

    this.subtitleArrowLeftElm.addEventListener("click", () => {
      this.subtitleArrowLeftElm.classList.remove("subtitle__arrows--disable");

      if (this.subtitleCollectionCounter > 0) {
        this.subtitleCollectionCounter--;
        this.drawSubtitleCounter();
      }
      if (this.subtitleCollectionCounter === 0) {
        this.subtitleArrowLeftElm.classList.add("subtitle__arrows--disable");
      }
    });

    this.subtitleArrowRightElm.addEventListener("click", () => {
      this.subtitleArrowLeftElm.classList.remove("subtitle__arrows--disable");

      if (this.subtitleCollectionCounter < this.subtitleCounterArr.length - 1) {
        this.subtitleCollectionCounter++;
        this.drawSubtitleCounter();
      }
      if (
        this.subtitleCollectionCounter ===
        this.subtitleCounterArr.length - 1
      ) {
        this.subtitleArrowRightElm.classList.add("subtitle__arrows--disable");
      }
    });

    this.saveSearchInputElm.addEventListener("input", () => {
      const searchText = this.saveSearchInputElm.value;

      const searchResult = this.saveItemArr.filter(
        (item) =>
          item.textToTranslate.includes(searchText) ||
          item.transaltedText.includes(searchText)
      );
      this.addItemsToList(this.saveListElm, searchResult);
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

    const itemButton = item.querySelector("[data-item-remove-button]");

    itemButton.addEventListener("click", (e) => {
      e.target.style.color = "#5f6368";
      e.target.classList.remove("material-symbols-sharp");
      e.target.classList.add("material-symbols-outlined");
      const indexOfItem =
        e.target.parentElement.parentElement.parentElement.dataset.indexOfItem;

      this.deleteItem(indexOfItem);
      this.resetSaveInput();
    });

    const itemObj = {
      textToTranslate: textFrom,
      transaltedText: textTo,
      content: item,
    };
    this.saveItemArr.unshift(itemObj);
  }

  createHistoryItem(firstLang, secondLang, textFrom, textTo) {
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

                  
                    </div>
                    <div class="item__content">
                        <span class="text__from">${textFrom}</span>
                        <span class="text__to">${textTo}</span>
                    </div>`;

    const itemObj = {
      textToTranslate: textFrom,
      transaltedText: textTo,
      content: item,
    };

    this.historyArr.unshift(itemObj);
    this.addItemsToList(this.historyListElm, this.historyArr);
  }

  addItemsToList(list, arr) {
    list.innerHTML = "";

    arr.forEach((item, index) => {
      item.content.dataset.indexOfItem = index;
      list.appendChild(item.content);
    });
    this.checkIsArrowEnable();
  }

  deleteItem(indexOfItem) {
    window.setTimeout(() => {
      if (!this.isSortAlphabet) {
        this.deleteItemFromArr(this.saveItemArr, indexOfItem);
        this.addItemsToList(this.saveListElm, this.saveItemArr);
      } else {
        this.deleteItemFromArr(this.sortedItemArr, indexOfItem);
        this.addItemsToList(this.saveListElm, this.sortedItemArr);
      }
      this.drawSubtitleCounter();
    }, 500);
    this.checkIsArrowEnable();
  }

  deleteItemFromArr(array, indexOfItem) {
    if (this.isSortAlphabet) {
      let secondArray =
        array === this.saveItemArr ? this.sortedItemArr : this.saveItemArr;

      secondArray.forEach((element, index) => {
        if (element === array[indexOfItem]) {
          secondArray.splice(index, 1);
        }
      });
    }
    array.splice(indexOfItem, 1);
  }

  sortAlphabet(array) {
    this.sortedItemArr = [...array];
    this.sortedItemArr.sort((x, y) =>
      x.textToTranslate.localeCompare(y.textToTranslate)
    );
  }

  closeMenu(event) {
    const isClickInsideSort = this.saveSortButtonElm.contains(event.target);
    const isClickInsideDots = this.saveTitleDotsIconElm.contains(event.target);

    if (!isClickInsideSort && !isClickInsideDots) {
      this.saveSortMenuElm.classList.add("hide");
      this.saveTitleDotsMenuElm.classList.add("hide");
    }
  }

  checkIsArrowEnable() {
    if (this.saveItemArr.length > 10) {
      this.subtitleArrowRightElm.classList.remove("subtitle__arrows--disable");
    } else {
      this.subtitleArrowRightElm.classList.add("subtitle__arrows--disable");
    }
  }

  drawSubtitleCounter() {
    this.subtitleCounterArr = [[]];
    const length = this.saveItemArr.length;

    let collection = 0;
    let arrayIndex = 0;
    for (let i = 1; i < length + 1; i++) {
      if (collection === 10) {
        this.subtitleCounterArr.push([]);
        arrayIndex++;
        collection = 0;
      }

      this.subtitleCounterArr[arrayIndex].push(i);
      collection++;
    }

    this.subtitleCounterElm.textContent = `${
      this.subtitleCounterArr[this.subtitleCollectionCounter][0]
    }-${
      this.subtitleCounterArr[this.subtitleCollectionCounter][
        this.subtitleCounterArr[this.subtitleCollectionCounter].length - 1
      ]
    } z ${length} wyrażeń`;
  }

  addListenersToExampleItems() {
    this.saveItemArr.forEach((item) => {
      const itemButton = item.content.querySelector(
        "[data-item-remove-button]"
      );

      itemButton.addEventListener("click", (e) => {
        e.target.style.color = "#5f6368";
        e.target.classList.remove("material-symbols-sharp");
        e.target.classList.add("material-symbols-outlined");

        const indexOfItem =
          e.target.parentElement.parentElement.parentElement.dataset
            .indexOfItem;
        this.deleteItem(indexOfItem);
      });
    });
  }
}
