export let languagesList = {
  // Autodetect: { name: "Autodetect" },

  af: { name: "Afrikaans" },

  sq: { name: "Albański" },

  am: { name: "amharski" },

  ar: { name: "arabski" },

  hy: { name: "ormiański" },

  az: { name: "Azerbejdżan" },

  bj: { name: "Bajan" },

  rm: { name: "bałkański" },

  eu: { name: "baskijski" },
  bn: { name: "bengalski" },
  be: { name: "Białoruski" },
  bi: { name: "Bislama" },
  bs: { name: "bośniacki" },
  br: { name: "Breton" },
  bg: { name: "bułgarski" },
  my: { name: "birmański" },
  ca: { name: "Kataloński" },
  cb: { name: "Cebuano" },
  ch: { name: "Chamorro" },
  zh: { name: "chiński" },
  zd: { name: "Komorczyk" },
  co: { name: "koptyjski" },
  ba: { name: "kreolski" },
  hr: { name: "Chorwacki" },
  cs: { name: "Czeski" },
  da: { name: "Duński" },
  nl: { name: "holenderski" },
  dz: { name: "Dzongkha" },
  en: { name: "angielski" },
  eo: { name: "Esperanto" },
  et: { name: "estoński" },
  fn: { name: "Fanagalo" },
  fo: { name: "farerski" },
  fi: { name: "fiński" },
  fr: { name: "francuski" },
  gl: { name: "Galicyjski" },
  ka: { name: "gruziński" },
  de: { name: "niemiecki" },
  gr: { name: "grecki" },
  gu: { name: "gudżarati" },
  ha: { name: "Hausa" },
  ha: { name: "hawajski" },
  on: { name: "hebrajski" },
  hi: { name: "Hindi" },
  hu: { name: "węgierski" },
  is: { name: "islandzki" },
  id: { name: "indonezyjski" },
  kl: { name: "Inuktitut" },
  ga: { name: "irlandzko-gaelicki" },
  it: { name: "włoski" },
  ja: { name: "japoński" },
  jv: { name: "Jawajski" },
  ke: { name: "Kabuverdianu" },
  ka: { name: "Kabylian" },
  kn: { name: "Kannada" },
  kk: { name: "kazachski" },
  km: { name: "Khmer" },
  rw: { name: "Kinyarwanda" },
  rn: { name: "Kirundi" },
  ko: { name: "koreański" },
  ku: { name: "kurdyjski" },
  ky: { name: "Kirgiski" },
  lo: { name: "Lao" },
  la: { name: "łac." },
  lv: { name: "łotewski" },
  lt: { name: "litewski" },
  lb: { name: "luksemburski" },
  mk: { name: "macedoński" },
  mg: { name: "malgaski" },
  ms: { name: "malajski" },
  dv: { name: "Maledivian" },
  mt: { name: "Maltańczyk" },
  gv: { name: "Manx-gaelicki" },
  mi: { name: "Maorysi" },
  mh: { name: "Marszałek" },
  ja: { name: "Mende" },
  mn: { name: "mongolski" },
  mf: { name: "Morisyen" },
  ne: { name: "Nepalski" },
  ni: { name: "Niuean" },
  nr: { name: "Norweski" },
  ny: { name: "Nyanja" },
  ur: { name: "Pakistański" },
  pa: { name: "Palauan" },
  pa: { name: "Panjabi" },
  pa: { name: "Papiamentu" },
  ps: { name: "Paszto" },
  fa: { name: "perski" },
  pi: { name: "Pijin" },
  pl: { name: "polski" },
  pt: { name: "portugalski" },
  po: { name: "Potawatomi" },
  qu: { name: "Keczua" },
  ru: { name: "rosyjski" },
  sm: { name: "Samoan" },
  sg: { name: "Sango" },
  gd: { name: "celtycki" },
  sr: { name: "serbski" },
  sn: { name: "Szona" },
  si: { name: "syngaleski" },
  sk: { name: "słowacki" },
  sl: { name: "słoweński" },
  st: { name: "Sotho" },
  es: { name: "hiszpański" },
  sr: { name: "Sranan" },
  sw: { name: "suahili" },
  sv: { name: "szwedzki" },
  de: { name: "niemiecki" },
  sy: { name: "syryjski" },
  tl: { name: "tagalski" },
  tg: { name: "tadżycki" },
  tm: { name: "Tamaszek" },
  ta: { name: "Tamilski" },
  te: { name: "Telugu" },
  te: { name: "Tetum" },
  th: { name: "tajski" },
  bo: { name: "tybetański" },
  ti: { name: "Tigrinia" },
  tp: { name: "Tok-Pisin" },
  tk: { name: "Tokelauan" },
  do: { name: "Tonga" },
  tn: { name: "Tswana" },
  tr: { name: "turecki" },
  tk: { name: "Turkmen" },
  tv: { name: "Tuvaluan" },
  uk: { name: "ukraiński" },
  pp: { name: "Uma" },
  uz: { name: "Uzbecki" },
  vi: { name: "wietnamski" },
  wl: { name: "Wallisian" },
  cy: { name: "Walijski" },
  wo: { name: "Wolof" },
  xh: { name: "Xhosa" },
  yi: { name: "jidysz" },
  zu: { name: "Zulu" },
};

let reverseObjects = {};
let sortedValue = {};
let sortedObjectsByName = {};

function swapInObjects() {
  for (const property in languagesList) {
    reverseObjects[languagesList[property].name] = property;
  }
}

function sortValues() {
  let values = Object.values(languagesList);
  values.sort((a, b) => a.name.localeCompare(b.name));
  values.forEach((value) => {
    sortedValue[value.name] = reverseObjects[value.name];
  });
}

function setByName() {
  for (const property in sortedValue) {
    sortedObjectsByName[reverseObjects[property]] = { name: property };
  }
}

function sortByName() {
  swapInObjects();
  sortValues();
  setByName();

  return sortedObjectsByName;
}
languagesList = sortByName();
