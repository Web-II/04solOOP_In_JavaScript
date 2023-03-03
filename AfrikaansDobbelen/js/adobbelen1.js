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

class AfrikaansDobbelenComponent {
  #dobbelsteen;

  constructor() {
    this.#dobbelsteen = new Dobbelsteen();
    //   dobbelsteen.rol();
    this.#toHtml();
  }

  #toHtml() {
    document.getElementById("1").src = `./images/Dice${
      this.#dobbelsteen.aantalOgen
    }.png`;
  }
}

function init() {
  const component = new AfrikaansDobbelenComponent();
}

window.onload = init;
