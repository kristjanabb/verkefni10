// todo vísa í rétta hluti með import
import { empty, el } from './helpers';
import question from './question';
import { score } from './highscore';
import { load, save } from './storage';
import Highscore from './highscore';

// allar breytur hér eru aðeins sýnilegar innan þessa módúl

let startButton; // takki sem byrjar leik
let problem; // element sem heldur utan um verkefni, sjá index.html
let result; // element sem heldur utan um niðurstöðu, sjá index.html

let playTime; // hversu lengi á að spila? Sent inn gegnum init()
let total = 0; // fjöldi spurninga í núverandi leik
let correct = 0; // fjöldi réttra svara í núverandi leik
let currentProblem; // spurning sem er verið að sýna


const highscore = new Highscore();
/**
 * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
 */
function finish() {
  
  const points = score(total, correct, playTime);
  const text = `Þú svaraðir ${correct} rétt af ${total} spurningum og fékkst ${points} stig fyrir. Skráðu þig á stigatöfluna!`;
  
  result.querySelector('.result__text').appendChild(document.createTextNode(text));

  problem.classList.add('problem--hidden');
  result.classList.remove('result--hidden');
  // todo útfæra

}

/**
 * Keyrir áfram leikinn. Telur niður eftir því hve langur leikur er og þegar
 * tími er búinn kallar í finish().
 *
 * Í staðinn fyrir að nota setInterval köllum við í setTimeout á sekúndu fresti.
 * Þurfum þá ekki að halda utan um id á intervali og skilum falli sem lokar
 * yfir fjölda sekúnda sem eftir er.
 *
 * @param {number} current Sekúndur eftir
 */
function tick(current) {
  // todo uppfæra tíma á síðu
  empty(problem.querySelector('.problem__timer'));
  problem.querySelector('.problem__timer').appendChild(el('p', `${current}`));


  if (current <= 0) {
    return finish();
  }

  return () => {
    setTimeout(tick(current - 1), 1000);
  };
}

/**
 * Býr til nýja spurningu og sýnir undir .problem__question
 */
function showQuestion() {
  // todo útfæra
  currentProblem = question();
  empty(document.querySelector('.problem__question'));
  document.querySelector('.problem__question').appendChild(document.createTextNode(currentProblem.problem));
}

/*
 * Byrjar leik
 *
 * - Felur startButton og sýnir problem
 * - Núllstillir total og correct
 * - Kallar í fyrsta sinn í tick()
 * - Sýnir fyrstu spurningu
 */
function start() {
  // todo útfæra
  startButton.classList.add('button--hidden');
  total = 0;
  correct = 0;

  setTimeout(tick(playTime), 1000);

  problem.classList.remove('problem--hidden');
  problem.querySelector('.problem__input').focus();
  showQuestion();
}

/*
 * Event handler fyrir það þegar spurningu er svarað. Athugar hvort svar sé
 * rétt, hreinsar input og birtir nýja spurningu.
 *
 * @param {object} e Event þegar spurningu svarað
 */
function onSubmit(e) {
  e.preventDefault();

  // todo útfæra

  e.preventDefault();
  if (Number(problem.querySelector('.problem__input').value) === currentProblem.answer) {
    correct += 1;
  }
  total += 1;
  problem.querySelector('.problem__input').value = '';
  problem.querySelector('.problem__input').focus();

  showQuestion();
}

/*
 * Event handler fyrir þegar stig eru skráð eftir leik.
 *
 * @param {*} e Event þegar stig eru skráð
 */
function onSubmitScore(e) {
  e.preventDefault();

  // todo útfæra
  problem.querySelector('.problem__input').value = '';
  save(result.querySelector('.result__input').value, score(total, correct, playTime));

  empty(result.querySelector('.result__text'));
  result.querySelector('.result__input').value = '';

  result.classList.add('result--hidden');
  problem.classList.add('problem--hidden');
  startButton.classList.remove('button--hidden');

  highscore.load();
  highscore.highscore(load());
}

/**
 * Finnur öll element DOM og setur upp event handlers.
 *
 * @param {number} _playTime Fjöldi sekúnda sem hver leikur er
 */
export default function init(_playTime) {
  playTime = _playTime;
  highscore.clear();

  // todo útfæra
  startButton = document.querySelector('.start');
  problem = document.querySelector('.problem');
  result = document.querySelector('.result');

  startButton.addEventListener('click', start);
  problem.querySelector('.button').addEventListener('click', onSubmit);
  result.querySelector('.button').addEventListener('click', onSubmitScore);
}

