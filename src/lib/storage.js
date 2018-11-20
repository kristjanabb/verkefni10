/**
 * Sækir og vistar í localStorage
 */

// Fast sem skilgreinir heiti á lykli sem vistað er undir í localStorage
const LOCALSTORAGE_KEY = 'calc_game_scores';

/**
 * Sækir gögn úr localStorage. Skilað sem röðuðum lista á forminu:
 * { points: <stig>, name: <nafn> }
 *
 * @returns {array} Raðað fylki af svörum eða tóma fylkið ef ekkert vistað.
 */
export function load() {
  // todo útfæra
  return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_KEY));
}

/**
 * Vista stig
 *
 * @param {string} name Nafn þess sem á að vista
 * @param {number} points Stig sem á að vista
 */
export function save(name, points) {
  const data = window.localStorage.getItem(LOCALSTORAGE_KEY);

  if(data === null) {
    const arr = JSON.stringify([{
      name: _name,
      points: _points,
    }]);
    window.localStorage.setItem(LOCALSTORAGE_KEY, arr);
  } else {
    const obj = JSON.parse(data);
    obj.push({
      name: _name,
      points: _points,
    });
    obj.sort((a,b) => {
      return b.points - a.points;
    });
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(obj));
  }
}

/**
 * Hreinsa öll stig úr localStorage
 */
export function clear() {
  window.localStorage.clear();
}
