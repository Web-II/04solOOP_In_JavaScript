import { Spel } from "./spel.js";
import { Speler } from "./speler.js";

function toHtml(spel) {
  const {
    spelerAanZet: { dobbelstenen, naam, score },
    heeftWinnaar,
  } = spel;
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
      document.getElementById("play").onclick = function () {
        spel.bepaalVolgendeSpeler();
        toHtml(spel);
      };
    } else {
      document.getElementById("play").value = "Rol dobbelstenen";
      document.getElementById("play").onclick = function () {
        spel.speel();
        toHtml(spel);
      };
    }
  }
}

function init() {
  const aantalSpelers = prompt("Geef aantal spelers");
  const spelers = [];
  for (let i = 0; i < aantalSpelers; i++)
    spelers.push(prompt(`Naam speler ${i + 1}`));
  const spel = new Spel(spelers);
  toHtml(spel);
  document.getElementById("play").onclick = function () {
    spel.speel();
    toHtml(spel);
  };
  document.getElementById("scorebord").onclick = function () {
    alert(spel.scoreOverzicht);
  };
}

window.onload = init;
