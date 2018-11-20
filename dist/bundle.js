(function () {
  'use strict';

  // todo vísa í rétta hluti með import
  // allar breytur hér eru aðeins sýnilegar innan þessa módúl
  var startButton; // takki sem byrjar leik

  var problem; // element sem heldur utan um verkefni, sjá index.html

  var result; // element sem heldur utan um niðurstöðu, sjá index.html

  var playTime; // hversu lengi á að spila? Sent inn gegnum init()

  var total = 0; // fjöldi spurninga í núverandi leik

  var correct = 0; // fjöldi réttra svara í núverandi leik

  var currentProblem; // spurning sem er verið að sýna

  var highscore = new Highscore();
  /**
   * Klárar leik. Birtir result og felur problem. Reiknar stig og birtir í result.
   */

  function finish() {
    var text = "\xDE\xFA svara\xF0ir ".concat(correct, " r\xE9tt af ").concat(total, " spurningum og f\xE9kkst ").concat(points, " stig fyrir. Skr\xE1\xF0u \xFEig \xE1 stigat\xF6fluna!");
    var points = score(total, correct, playTime);
    result.querySelector('.result__text').appendChild(document.createTextNode(text));
    problem.classList.add('problem--hidden');
    result.classList.remove('result--hidden'); // todo útfæra
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
    problem.querySelector('.problem__timer').appendChild(el('p', "".concat(current)));

    if (current <= 0) {
      return finish();
    }

    return function () {
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
    e.preventDefault(); // todo útfæra

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
    e.preventDefault(); // todo útfæra

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


  function init(_playTime) {
    playTime = _playTime;
    highscore.clear(); // todo útfæra

    startButton = document.querySelector('.start');
    problem = document.querySelector('.problem');
    result = document.querySelector('.result');
    startButton.addEventListener('click', start);
    problem.querySelector('.button').addEventListener('click', onSubmit);
    result.querySelector('.button').addEventListener('click', onSubmitScore);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Útbúa stigatöflu, sækir gögn í gegnum storage.js
   */

  var Highscore$1 =
  /*#__PURE__*/
  function () {
    function Highscore() {
      _classCallCheck(this, Highscore);

      this.scores = document.querySelector('.highscore__scores');
      this.button = document.querySelector('.highscore__button');
      this.button.addEventListener('click', this.clear.bind(this));
    }
    /**
     * Hlaða stigatöflu inn
     */


    _createClass(Highscore, [{
      key: "load",
      value: function load() {} // todo útfæra

      /**
       * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
       */

    }, {
      key: "clear",
      value: function clear() {} // todo útfæra

      /**
       * Hlaða inn stigatöflu fyrir gefin gögn.
       *
       * @param {array} data Fylki af færslum í stigatöflu
       */

    }, {
      key: "highscore",
      value: function highscore(data) {// todo útfæra
      }
    }]);

    return Highscore;
  }();

  var PLAY_TIME = 10;
  document.addEventListener('DOMContentLoaded', function () {
    init(PLAY_TIME);
    var highscore = new Highscore$1();
    highscore.load();
  });

}());
//# sourceMappingURL=bundle.js.map
