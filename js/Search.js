export class Search {
  constructor(langListElm, langListItems) {
    this.langListElm = langListElm;
    this.langListItems = langListItems;

    this.searchInputElm = document.querySelector("[data-search]");
    this.searchInputElm.addEventListener("input", () =>
      this.searchInList(this.searchInputElm.value)
    );

    this.isInputSearch = false;
  }

  searchInList(text) {
    this.isInputSearch = true;

    this.langListElm.innerHTML = "";

    let languages = [...this.langListItems];
    languages = languages.filter((lang) => lang.innerText.includes(text));
    this.drawList(languages);
  }

  drawList(items) {
    items.forEach((item) => this.langListElm.appendChild(item));
  }

  clearInput() {
    this.searchInputElm.value = "";
    this.isInputSearch = false;
  }
}
