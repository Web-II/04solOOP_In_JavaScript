import Spel from "./Spel.js";
export default class OxoComponent {
  #spel;

  constructor() {
    this.#spel = new Spel();
    const imgElementen = document.getElementsByTagName("img");
    for (const img of imgElementen) {
      img.onclick = () => {
        const [rij, kol] = img.id;
        this.#spel.plaatsSymbool(rij - 1, kol - 1);
        this.#toHtml();
      };
    }
    this.#toHtml();
  }

  #toHtml() {
    const { spelbord, tePlaatsenSymbool, winnaarsSymbool, isEindeSpel } =
      this.#spel;
    for (let rij = 0; rij < 3; rij++) {
      for (let kol = 0; kol < 3; kol++) {
        const symbool = spelbord.geefSymbool(rij, kol);
        const id = [rij + 1, kol + 1].join("");
        document.getElementById(id).src = `./images/${
          symbool ? symbool : "wit"
        }.png`;
      }
    }
    if (winnaarsSymbool)
      document.getElementById(
        "message"
      ).innerText = `Proficiat, speler ${winnaarsSymbool} wint`;
    else if (isEindeSpel)
      document.getElementById("message").innerText = `Gelijkspel!`;
    else
      document.getElementById(
        "message"
      ).innerText = `Speler ${tePlaatsenSymbool} is aan de beurt`;
  }
}
