import Speler from './Speler.js';

export default class Spel {
  #spelers = [];
  #spelerAanZet;
  constructor(spelersNamen) {
    for (const naam of spelersNamen) this.#spelers.push(new Speler(naam));
    this.#spelerAanZet = this.#spelers[0];
  }

  get spelerAanZet() {
    return this.#spelerAanZet;
  }

  get heeftWinnaar() {
    for (const s of this.#spelers) {
      if (s.score >= 1000) return true;
    }
    return false;
  }

  get scoreOverzicht() {
    let overzicht = '';
    for (const s of this.#spelers) {
      overzicht += `${s.naam}: ${s.score}\n`;
    }
    return overzicht;
  }

  speel() {
    if (!this.heeftWinnaar) this.spelerAanZet.speel();
  }

  bepaalVolgendeSpeler() {
    if (!this.heeftWinnaar) {
      const indexNext =
        (this.#spelers.indexOf(this.#spelerAanZet) + 1) % this.#spelers.length;
      this.#spelerAanZet = this.#spelers[indexNext];
    }
  }
}
