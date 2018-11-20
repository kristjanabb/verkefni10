// todo vísa í rétta hluti með import

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
export function score(total, correct, time) {
  // todo útfæra
  return Math.round(((((correct / total) ** 2) + correct) * total / time) * 100);
}

/**
 * Útbúa stigatöflu, sækir gögn í gegnum storage.js
 */
export default class Highscore {
  constructor() {
    this.scores = document.querySelector('.highscore__scores');
    this.button = document.querySelector('.highscore__button');
    this.button.addEventListener('click', this.clear.bind(this));
  }

  /**
   * Hlaða stigatöflu inn
   */
  load() {
    // todo útfæra
    if (storageLoad() !== null) this.button.classList.remove('highscore__button--hidden');
  }

  /**
   * Hreinsa allar færslur úr stigatöflu, tengt við takka .highscore__button
   */
  clear() {
    storageClear();
    empty(this.scores);
    this.scores.appendChild(el('p', 'Engin stig skráð'));
    this.button.classList.add('highscore__button--hidden');
  }

  /**
   * Hlaða inn stigatöflu fyrir gefin gögn.
   *
   * @param {array} data Fylki af færslum í stigatöflu
   */
  highscore(data) {
    // todo útfæra

    const data = _data;
    empty(this.scores);
    const listi = el('ol');

    for (let i = 0; i < data.length; i += 1) {
      const s = data[i];
      const name = el('span', s.name);
      name.classList.add('highscore__name');
      const points = el('span', `${s.points} stig  `);
      points.classList.add('highscore__number');
      const li = el('li');
      li.appendChild(points);
      li.appendChild(name);
      listi.appendChild(li);
    }
    this.scores.appendChild(listi);
  }
}
