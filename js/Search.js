export class Search {
  constructor(langListElm, langListItems) {
    this.langListElm = langListElm;
    this.langListItems = langListItems;

    this.searchInputElm = null;
    this.xMarkSearchElm = null;
    this.arrowSearchElm = null;
    this.searchTextElm = null;

    this.isInputSearch = false;
    this.isSearchTextDisplay = false;
  }

  init() {
    this.htmlElements();
    this.eventListeners();
  }

  htmlElements() {
    this.searchInputElm = document.querySelector("[data-search]");
    this.xMarkSearchElm = document.querySelector("[data-x-mark-search]");
    this.arrowSearchElm = document.querySelector("[data-search-arrow]");
    this.searchTextElm = document.querySelector("[data-search-text]");
  }

  eventListeners() {
    this.searchInputElm.addEventListener("input", () => {
      this.searchInputElm.value
        ? (this.xMarkSearchElm.style.display = "block")
        : (this.xMarkSearchElm.style.display = "none");

      this.searchInList(this.searchInputElm.value);
      this.langListElm.classList.add("main__lang-list--small");
    });

    this.xMarkSearchElm.addEventListener("click", () => {
      this.xMarkSearchElm.style.display = "none";
      this.searchInputElm.value = "";
      this.searchInList(this.searchInputElm.value);
      // this.langListElm.style.height = "781px";
      this.langListElm.classList.remove("main__lang-list--small");
      if (this.isSearchTextDisplay) {
        this.searchTextElm.style.display = "none";
        this.isSearchTextDisplay = false;
      }
    });

    this.arrowSearchElm.addEventListener("click", () => {
      if (window.innerWidth > "720") {
        this.xMarkSearchElm.style.display = "block";
        this.searchTextElm.style.display = "block";
        this.isSearchTextDisplay = true;
        this.searchInputElm.value = "";
        this.searchInList(this.searchInputElm.value);
        // this.langListElm.style.height = "781px";
        this.langListElm.classList.remove("main__lang-list--small");
      }
    });

    this.searchTextElm.addEventListener("click", () => {
      this.xMarkSearchElm.style.display = "none";
      this.searchTextElm.style.display = "none";
      this.isSearchTextDisplay = false;
      this.searchInputElm.value = "";
      this.searchInList(this.searchInputElm.value);
    });
  }

  searchInList(text) {
    text = text.toLowerCase();
    this.isInputSearch = true;
    this.langListElm.innerHTML = "";

    let languages = [...this.langListItems];
    languages = languages.filter(
      (lang) =>
        lang.lastElementChild.innerText.includes(text) &&
        lang.dataset.code != "Autodetect"
    );
    console.log(languages);
    this.boldSearchText(languages, text);
    this.drawList(languages);

    if (!languages) this.langListElm.classList.remove("main__lang-list--small");
  }

  boldSearchText(array, text) {
    array.forEach((lang) => {
      lang.lastElementChild.innerHTML = lang.lastElementChild.innerHTML.replace(
        /[<b></b>]/g,
        ``
      );
    });

    array.forEach((lang) => {
      lang.lastElementChild.innerHTML = lang.lastElementChild.innerHTML.replace(
        text,
        `<b>${text}</b>`
      );
    });
  }

  drawList(items) {
    items.forEach((item) => this.langListElm.appendChild(item));
  }

  clearInput() {
    this.searchInputElm.value = "";
    this.isInputSearch = false;
  }
}
