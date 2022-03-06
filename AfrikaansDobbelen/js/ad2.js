// start hier
class Dobbelsteen {
  #aantalOgen = 1;

  get aantalOgen() {
    return this.#aantalOgen;
  }
  rol() {
    this.#aantalOgen = Math.floor(Math.random() * 6 + 1);
  }
}

class Speler {
  static #aantalDobbelstenen = 5;
  #naam;
  #score;
  #dobbelstenen;

  constructor(naam) {
    this.#naam = naam;
    this.#score = 0;
    this.#dobbelstenen = [];
    for (let i = 1; i <= Speler.aantalDobbelstenen; i++) {
      this.#dobbelstenen.push(new Dobbelsteen());
    }
  }

  static get aantalDobbelstenen() {
    return Speler.#aantalDobbelstenen;
  }

  get naam() {
    return this.#naam;
  }

  get score() {
    return this.#score;
  }

  get dobbelstenen() {
    return this.#dobbelstenen;
  }

  speel() {
    for (const d of this.dobbelstenen) {
      d.rol();
      if (d.aantalOgen === 1) this.#score += 100;
      else if (d.aantalOgen === 5) this.#score += 50;
    }
  }
}

function toHtml(speler) {
  for (let i = 0; i < Speler.aantalDobbelstenen; i++) {
    document.getElementById(
      i + 1
    ).src = `images/Dice${speler.dobbelstenen[i].aantalOgen}.png`;
  }
  document.getElementById('speler').innerText = `Speler: ${speler.naam}`;
  document.getElementById('score').innerText = `Score: ${speler.score}`;
}

function init() {
  const speler = new Speler('Kirikou');
  toHtml(speler);
  document.getElementById('play').onclick = function () {
    speler.speel();
    toHtml(speler);
  };
}

window.onload = init;

/***************************************************************************************** */
/* onderstaand stukje code heb je pas in de laatste stap van de oefening nodig (zie opgave) */
/***************************************************************************************** */
// if (document.getElementById('play').value === 'Rol dobbelstenen') {
// 	document.getElementById('play').value = 'Volgende speler';
// 	document.getElementById('play').onclick = function() {
// 		spel.bepaalVolgendeSpeler();
// 		toHtml(spel);
// 	};
// } else {
// 	document.getElementById('play').value = 'Rol dobbelstenen';
// 	document.getElementById('play').onclick = function() {
// 		spel.speel();
// 		toHtml(spel);
// 	};
// }
