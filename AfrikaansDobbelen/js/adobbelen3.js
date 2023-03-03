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

class Spel {
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
    let overzicht = "";
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

class AfrikaansDobbelenComponent {
  #spel;
  constructor() {
    this.#spel = new Spel(this.#geefSpelers());
    document.getElementById("play").onclick = () => {
      this.#spel.speel();
      this.#toHtml();
    };
    document.getElementById("scorebord").onclick = () => {
      alert(this.#spel.scoreOverzicht);
    };
    this.#toHtml();
  }

  #geefSpelers() {
    const aantalSpelers = prompt("Geef aantal spelers");
    const spelers = [];
    for (let i = 0; i < aantalSpelers; i++)
      spelers.push(prompt(`Naam speler ${i + 1}`));
    return spelers;
  }

  #toHtml(spel) {
    const {
      spelerAanZet: { dobbelstenen, naam, score },
      heeftWinnaar,
    } = this.#spel;

    for (let i = 0; i < Speler.aantalDobbelstenen; i++) {
      document.getElementById(
        i + 1
      ).src = `images/Dice${dobbelstenen[i].aantalOgen}.png`;
    }
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("speler").innerText = `Speler: ${naam}`;
    if (heeftWinnaar) {
      alert(`Gefeliciteerd ${naam}, je bent de winnaar!!`);
      document.getElementById("play").disabled = true;
    } else {
      if (document.getElementById("play").value === "Rol dobbelstenen") {
        document.getElementById("play").value = "Volgende speler";
        document.getElementById("play").onclick = () => {
          this.#spel.bepaalVolgendeSpeler();
          this.#toHtml();
        };
      } else {
        document.getElementById("play").value = "Rol dobbelstenen";
        document.getElementById("play").onclick = () => {
          this.#spel.speel();
          this.#toHtml();
        };
      }
    }
  }
}

function init() {
  const component = new AfrikaansDobbelenComponent();
}

window.onload = init;
