import Spelbord from "./Spelbord.js";

export default class Spel {
  #spelbord = new Spelbord();
  #tePlaatsenSymbool = "O";
  #geplaatsteSymbool = "X";
  #winnaarsSymbool = "";

  plaatsSymbool(rij, kol) {
    if (!this.isEindeSpel) {
      if (this.spelbord.isVrij(rij, kol)) {
        this.spelbord.plaatsSymbool(this.tePlaatsenSymbool, rij, kol);
        [this.#tePlaatsenSymbool, this.#geplaatsteSymbool] = [
          this.geplaatsteSymbool,
          this.tePlaatsenSymbool,
        ];
        if (this.spelbord.bevatDrieOpEenRij(this.geplaatsteSymbool, rij, kol))
          this.#winnaarsSymbool = this.geplaatsteSymbool;
      }
    }
  }

  get isEindeSpel() {
    return this.spelbord.isVolzet || this.winnaarsSymbool;
  }

  get spelbord() {
    return this.#spelbord;
  }

  get winnaarsSymbool() {
    return this.#winnaarsSymbool;
  }

  get geplaatsteSymbool() {
    return this.#geplaatsteSymbool;
  }

  get tePlaatsenSymbool() {
    return this.#tePlaatsenSymbool;
  }
}
