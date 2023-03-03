import Dobbelsteen from './dobbelsteen.js';

export default class Speler {
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
