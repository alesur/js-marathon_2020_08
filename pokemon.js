class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, selectors }) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;

    this.renderHP();
  }

  renderHP = () => {
    const {
      elHP,
      hp: { current, total },
    } = this;
    elHP.innerText = current + " / " + total;
    this.renderProgressbarHP();
  };

  renderProgressbarHP = () => {
    this.elProgressbar.style.width = this.hp.current + "%";
  };

  changeHP = (count, cb) => {
    let isDisabled = false;
    this.hp.current -= count;
    if (this.hp.current <= count) {
      this.hp.current = 0;
      alert("Бедный " + this.name + " проиграл бой!");
      isDisabled = true;
    }
    this.renderHP();
    cb && cb(count, isDisabled);
  };
}

export default Pokemon;
