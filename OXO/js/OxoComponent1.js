import Spelbord from './Spelbord.js';
export default class OxoComponent {
  #bord;

  constructor() {
    this.#bord = new Spelbord();
    const imgElementen = document.getElementsByTagName('img');
    for (const img of imgElementen) {
      img.onclick = () => {
        const rij = img.id[0] - 1;
        const kol = img.id[1] - 1;
        this.#bord.plaatsSymbool('O', rij, kol);
        this.#toHtml();
      };
    }
    this.#toHtml();
  }

  #toHtml() {
    for (let rij = 0; rij < 3; rij++) {
      for (let kol = 0; kol < 3; kol++) {
        const cel = this.#bord.geefSymbool(rij, kol);
        const id = (rij + 1).toString() + (kol + 1).toString();
        document.getElementById(id).src = `images/${cel ? cel : 'wit'}.png`;
      }
    }
  }
}
