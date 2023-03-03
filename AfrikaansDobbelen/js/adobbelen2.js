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

class AfrikaansDobbelenComponent {
  #speler;

  constructor() {
    this.#speler = new Speler("Kirikou");
    document.getElementById("play").onclick = () => {
      this.#speler.speel();
      this.#toHtml();
    };
    this.#toHtml();
  }
  #toHtml() {
    const { dobbelstenen, naam, score } = this.#speler;
    for (let i = 0; i < Speler.aantalDobbelstenen; i++) {
      document.getElementById(
        i + 1
      ).src = `images/Dice${dobbelstenen[i].aantalOgen}.png`;
    }
    document.getElementById("speler").innerText = `Speler: ${naam}`;
    document.getElementById("score").innerText = `Score: ${score}`;
  }
}

function init() {
  const component = new AfrikaansDobbelenComponent();
}

window.onload = init;
