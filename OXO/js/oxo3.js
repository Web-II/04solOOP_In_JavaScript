import { Spel } from './spel.js';

function toHtml(spel) {
  for (let rij = 0; rij < 3; rij++) {
    for (let kol = 0; kol < 3; kol++) {
      const symbool = spel.spelbord.geefSymbool(rij, kol);
      const id = [rij + 1, kol + 1].join('');
      document.getElementById(id).src = `images/${
        symbool ? symbool : 'wit'
      }.png`;
    }
  }
  if (spel.winnaarsSymbool)
    document.getElementById(
      'message'
    ).innerText = `Proficiat, speler ${spel.winnaarsSymbool} wint`;
  else if (spel.isEindeSpel)
    document.getElementById('message').innerText = `Gelijkspel!`;
  else
    document.getElementById(
      'message'
    ).innerText = `Speler ${spel.tePlaatsenSymbool} is aan de beurt`;
}

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName('img');
  for (const img of imgElementen) {
    img.onclick = function () {
      const [rij, kol] = this.id;
      spel.plaatsSymbool(rij - 1, kol - 1);
      toHtml(spel);
    };
  }
  toHtml(spel);
}

window.onload = init;
