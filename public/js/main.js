const refs = {
  input: document.querySelector('.js-input'),
  cardContainer: document.querySelector('.js-card-container'),
  btnDefs: document.querySelector('button[data-action="definitions"]'),
  btnSyns: document.querySelector('button[data-action="synonyms"]'),
  btnExamples: document.querySelector('button[data-action="examples"]'),
  btnAntonyms: document.querySelector('button[data-action="antonyms"]'),
  btnArrowDown: document.querySelector('.js-arrow-down'),
  btnArrowUp: document.querySelector('.js-arrow-up'),
  footer: document.querySelector('.footer'),
};

refs.btnDefs.addEventListener('click', onSearchDefs);
refs.btnSyns.addEventListener('click', onSearchSyns);
refs.btnExamples.addEventListener('click', onSearchExamples);
refs.btnAntonyms.addEventListener('click', onSearchAntonyms);
refs.input.addEventListener('keydown', onEnter);
refs.btnArrowDown.addEventListener('click', onArrowDown);
refs.btnArrowUp.addEventListener('click', onArrowUp);

fetchRandom();

function onEnter(e) {
  if (e.code === 'Enter' || e.keyCode === 13) {
    onSearchDefs();
  }
}

function onSearchDefs() {
  const searchQuery = refs.input.value;

  if (searchQuery === '') {
    alert('Enter a word, please!');
    return;
  }
  fetchDefs(searchQuery).then(renderDefs).catch(onFetchError);
}

function onSearchSyns() {
  const searchQuery = refs.input.value;

  if (searchQuery === '') {
    alert('Enter a word, please!');
    return;
  }
  fetchSyns(searchQuery).then(renderSyns).catch(onFetchError);
}

function onSearchExamples() {
  const searchQuery = refs.input.value;

  if (searchQuery === '') {
    alert('Enter a word, please!');
    return;
  }
  fetchExamples(searchQuery).then(renderExamples).catch(onFetchError);
}

function onSearchAntonyms() {
  const searchQuery = refs.input.value;

  if (searchQuery === '') {
    alert('Enter a word, please!');
    return;
  }
  fetchAntonyms(searchQuery).then(renderAntonyms).catch(onFetchError);
}

//fetch for random
function fetchRandom() {
  return fetch('/api/random')
    .then(res => res.json())
    .then(res => res.word)
    .then(renderRandomWord)
    .catch(onFetchError);
}

//markup for ramdom
function renderRandomWord(word) {
  refs.input.value = word;
}

//fetch for definitions
function fetchDefs(query) {
  return fetch(`/api/word/${query}`).then(res => res.json());
}

//Markup for definitions
function renderDefs(res) {
  clearContainer();
  const defs = res.definitions;
  if (defs.length === 0) {
    nothingToShow();
    return;
  }
  const markup = defs.reduce(
    (string, item) =>
      string + `<li>${item.definition} (${item.partOfSpeech})</li>`,
    '',
  );
  refs.cardContainer.innerHTML = markup;
}

//fetch for synonyms
function fetchSyns(query) {
  return fetch(`/api/synonym/${query}`).then(res => res.json());
}

//Markup for synonyms
function renderSyns(res) {
  clearContainer();
  const syns = res.synonyms;
  if (syns.length === 0) {
    nothingToShow();
    return;
  }
  const markup = syns.reduce((string, item) => string + `<li>${item}</li>`, '');
  refs.cardContainer.innerHTML = markup;
}

//fetch for examples
function fetchExamples(query) {
  return fetch(`/api/example/${query}`).then(res => res.json());
}

//Markup for examples
function renderExamples(res) {
  clearContainer();
  const examples = res.examples;
  if (examples.length === 0) {
    nothingToShow();
    return;
  }
  const markup = examples.reduce(
    (string, item) => string + `<li>${item}</li>`,
    '',
  );
  refs.cardContainer.innerHTML = markup;
}

//fetch for antonyms
function fetchAntonyms(query) {
  return fetch(`/api/antonym/${query}`).then(res => res.json());
}

//Markup for antonyms
function renderAntonyms(res) {
  clearContainer();
  const antonyms = res.antonyms;
  if (antonyms.length === 0) {
    nothingToShow();
    return;
  }
  const markup = antonyms.reduce(
    (string, item) => string + `<li>${item}</li>`,
    '',
  );
  refs.cardContainer.innerHTML = markup;
}

function clearContainer() {
  refs.cardContainer.innerHTML = '';
}

function nothingToShow() {
  refs.cardContainer.innerHTML =
    '<p class="empty">Sorry, we have nothing to show you.</p>';
}

function onFetchError(err) {
  alert('Something is wrong! We did not find your word!');
  console.error(err);
}

function onArrowDown() {
  refs.footer.classList.replace('d-block', 'd-none');
  refs.btnArrowUp.classList.replace('d-none', 'd-block');
}

function onArrowUp() {
  refs.footer.classList.replace('d-none', 'd-block');
  refs.btnArrowUp.classList.replace('d-block', 'd-none');
}
