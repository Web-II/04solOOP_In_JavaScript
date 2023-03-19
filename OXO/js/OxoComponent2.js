import Spel from './Spel.js';
export default class OxoComponent {
  #spel;

  constructor() {
    this.#spel = new Spel();
    const imgElementen = document.getElementsByTagName('img');
    for (const img of imgElementen) {
      img.onclick = () => {
        const rij = img.id[0] - 1;
        const kol = img.id[1] - 1;
        this.#spel.plaatsSymbool(rij, kol);
        this.#toHtml();
      };
    }
    this.#toHtml();
  }

  #toHtml() {
    const { tePlaatsenSymbool } = this.#spel;
    for (let rij = 0; rij < 3; rij++) {
      for (let kol = 0; kol < 3; kol++) {
        const cel = this.#spel.geefSymbool(rij, kol);
        const id = (rij + 1).toString() + (kol + 1).toString();
        document.getElementById(id).src = `images/${cel ? cel : 'wit'}.png`;
      }
    }
    document.getElementById(
      'message'
    ).innerHTML = `Speler ${tePlaatsenSymbool} is aan de beurt`;
  }
}
