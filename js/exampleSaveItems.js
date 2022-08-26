export let exampleSaveItems = [];
const items = [
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "kot",
    textTo: "cat",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "mysz",
    textTo: "mouse",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "pies",
    textTo: "dog",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "ptak",
    textTo: "bird",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "szynszyla",
    textTo: "chinchilla",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "mysz",
    textTo: "mouse",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "orzeł",
    textTo: "eagle",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "delfin",
    textTo: "Dolphin",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "koń",
    textTo: "horse",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "ośmiornica",
    textTo: "octopus",
  },
  {
    firstLang: "polski",
    secondLang: "angielski",
    textFrom: "małpa",
    textTo: "monkey",
  },
];

function itemTemplate(itemObj) {
  const item = document.createElement("li");
  item.classList.add("panel__item");

  item.innerHTML = `<div class="item__header">
  <div class="item__lang-box">
      <span class="translate__from">${itemObj.firstLang}</span>
      <span class="material-symbols-outlined item__arrow">
      trending_flat
      </span>
      <span class="translate__to">${itemObj.secondLang}</span>
  </div>
  
  <div class="item__icon-box">
          <span class="material-symbols-sharp item__star" data-item-remove-button>
              star
              </span>
  </div>   
</div>
<div class="item__content">
  <span class="text__from">${itemObj.textFrom}</span>
  <span class="text__to">${itemObj.textTo}</span>
</div>`;

  const itemObjTemplate = {
    textToTranslate: itemObj.textFrom,
    content: item,
  };
  exampleSaveItems.push(itemObjTemplate);
}

items.forEach((item) => itemTemplate(item));
