/***********************************
Deze klasse vormt de lijm tussen ons domein (Dobbelsteen) en de HTML pagina
als de gebruiker iets wijzigt op de html pagina gaat het domein aangesproken worden en de
web pagina aangepast worden. Voorbeeld: de gebruiker rolt de dobbelsteen
  De AfrikaansDobbelenComponent gaat de methode rol aanspreken in de domeinklasse Dobbelsteen
*/

import Spel from "./Spel.js";
import Speler from "./Speler.js";

export default class AfrikaansDobbelenComponent {
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

  #toHtml() {
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
