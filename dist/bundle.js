(function () {
  'use strict';

  /**
   * Hreinsa börn úr elementi
   *
   * @param {object} element Element sem á að hreinsa börn úr
   */
  function empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
  /**
   * Búa til element og aukalega setja börn ef send með
   *
   * @param {string} name Nafn á element
   * @param  {...any} children Börn fyrir element
   */

  function el(name) {
    var element = document.createElement(name);

    for (var _len = arguments.length, children = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      children[_key - 1] = arguments[_key];
    }

    if (Array.isArray(children)) {
      children.forEach(function (child) {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child) {
          element.appendChild(child);
        }
      });
    }

    return element;
  }

  /**
   * Úr sýnilausn fyrir verkefni 7.
   */
  var operators = ['+', '-', '*', '/'];
  /**
  * Skilar tölu af handahófi á bilinu [min, max]
  */

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
  * Útbýr spurningu og skilar sem hlut:
  * { problem: strengur með spurningu, answer: svar við spurningu sem tala }
  */


  function question() {
    var operator = operators[randomNumber(0, operators.length - 1)];
    var a = null;
    var b = null;
    var answer = null;

    switch (operator) {
      case '+':
        a = randomNumber(10, 100);
        b = randomNumber(10, 100);
        answer = a + b;
        break;

      case '-':
        a = randomNumber(10, 100);
        b = randomNumber(10, a);
        answer = a - b;
        break;

      case '*':
        a = randomNumber(1, 10);
        b = randomNumber(1, 10);
        answer = a * b;
        break;

      case '/':
        b = randomNumber(2, 10);
        a = randomNumber(2, 10) * b;
        answer = a / b;
        break;

      default:
        break;
    }

    return {
      problem: "".concat(a, " ").concat(operator, " ").concat(b),
      answer: answer
    };
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
   * Sækir og vistar í localStorage
   */
  // Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
  var LOCALSTORAGE_KEY = 'calc_game_scores';
  /**
   * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
   * { points: <stig>, name: <nafn> }
   *
   * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
   */

  function load() {
    // todo útfæra
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
  }
  /**
   * Vista stig
   *
   * @param {string} name Nafn þess sem á að vista
   * @param {number} points Stig sem á að vista
   */

  function save(name, points) {
    var data = window.localStorage.getItem(LOCALSTORAGE_KEY);

    if (data === null) {
      var arr = JSON.stringify([{
        name: _name,
        points: _points
      }]);
      window.localStorage.setItem(LOCALSTORAGE_KEY, arr);
    } else {
      var obj = JSON.parse(data);
      obj.push({
        name: _name,
        points: _points
      });
      obj.sort(function (a, b) {
        return b.points - a.points;
      });
      window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
    }
  }
  /**
   * Hreinsa öll stig úr localStorage
   */

  function clear() {
    window.localStorage.clear();
  }

  /**
   * Reikna út stig fyrir svör út frá heildarfjölda svarað á tíma.
   * Ekki þarf að gera ráð fyrir hversu lengi seinasta spurning var sýnd. Þ.e.a.s.
   * stig verða alltaf reiknuð fyrir n-1 af n spurningum.
   *
   * @param {number} total Heildarfjöldi spurninga
   * @param {number} correct Fjöldi svarað rétt
   * @param {number} time Tími sem spurningum var svarað á í sekúndum
   *
   * @returns {number} Stig fyrir svör
   */

  function score(total, correct, time) {
    // todo útfæra
    return Math.round((Math.pow(correct / total, 2) + correct) * total / time * 100);
  }
  /**
   * Útbúa stigatöflu, sækir gögn í gegnum storage.js
   */

  var Highscore =
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
      value: function load$$1() {
        // todo útfæra
        if (load() !== null) this.button.classList.remove('highscore__button--hidden');
      }
      /**
       * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
       */

    }, {
      key: "clear",
      value: function clear$$1() {
        clear();
        empty(this.scores);
        this.scores.appendChild(el('p', 'Engin stig skráð'));
        this.button.classList.add('highscore__button--hidden');
      }
      /**
       * Hlaða inn stigatöflu fyrir gefin gögn.
       *
       * @param {array} data Fylki af færslum í stigatöflu
       */

    }, {
      key: "highscore",
      value: function highscore(data) {
        // todo útfæra
        var datainfo = _datainfo;
        empty(this.scores);
        var listi = el('ol');

        for (var i = 0; i < datainfo.length; i += 1) {
          var s = datainfo[i];
          var name = el('span', s.name);
          name.classList.add('highscore__name');
          var points = el('span', "".concat(s.points, " stig  "));
          points.classList.add('highscore__number');
          var li = el('li');
          li.appendChild(points);
          li.appendChild(name);
          listi.appendChild(li);
        }

        this.scores.appendChild(listi);
      }
    }]);

    return Highscore;
  }();

  // todo vísa í rétta hluti með import

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
    var points = score(total, correct, playTime);
    var text = "\xDE\xFA svara\xF0ir ".concat(correct, " r\xE9tt af ").concat(total, " spurningum og f\xE9kkst ").concat(points, " stig fyrir. Skr\xE1\xF0u \xFEig \xE1 stigat\xF6fluna!");
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

  var PLAY_TIME = 10;
  document.addEventListener('DOMContentLoaded', function () {
    init(PLAY_TIME);
    var highscore = new Highscore();
    highscore.load();
  });

}());
//# sourceMappingURL=bundle.js.map
