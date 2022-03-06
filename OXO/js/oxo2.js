import { Spel } from './spel.js';

function toHtml(spel) {
  for (let rij = 0; rij < 3; rij++) {
    for (let kol = 0; kol < 3; kol++) {
      const cel = spel.spelbord.bord[rij][kol];
      const id = (rij + 1).toString() + (kol + 1).toString();
      document.getElementById(id).src = `images/${cel ? cel : 'wit'}.png`;
    }
  }
  document.getElementById(
    'message'
  ).innerHTML = `Speler ${spel.tePlaatsenSymbool} is aan de beurt`;
}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName('img');
  for (const img of imgElementen) {
    img.onclick = function () {
      const rij = this.id[0] - 1;
      const kol = this.id[1] - 1;
      spel.plaatsSymbool(rij, kol);
      toHtml(spel);
    };
  }
  toHtml(spel);
}

window.onload = init;
