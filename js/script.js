fetch("https://api.mymemory.translated.net/get?q=bella!&langpair=Autodetect|pl")
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
