import { Spel } from "./spel.js";

function toHtml(spel) {
  const { spelbord, tePlaatsenSymbool, winnaarsSymbool, isEindeSpel } = spel;
  for (let rij = 0; rij < 3; rij++) {
    for (let kol = 0; kol < 3; kol++) {
      const symbool = spelbord.geefSymbool(rij, kol);
      const id = [rij + 1, kol + 1].join("");
      document.getElementById(id).src = `images/${
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

function init() {
  const spel = new Spel();
  const imgElementen = document.getElementsByTagName("img");
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
