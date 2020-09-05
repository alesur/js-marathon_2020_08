class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressbar = document.getElementById(`progressbar-${name}`);
    this.displayName = document.getElementById(`name-${name}`);
    this.pokemonImg = document.getElementById(`sprite-${name}`);
  }
}

class Pokemon extends Selectors {
  constructor({ name, hp, type, img, selectors, attacks = [] }) {
    super(selectors);

    this.name = name;
    this.hp = {
      current: hp,
      total: hp,
    };
    this.type = type;
    this.attacks = attacks;
    this.img = img;
    this.renderHP();
  }

  renderHP = () => {
    const {
      elHP,
      hp: { current, total },
    } = this;
    elHP.innerText = current + " / " + total;
    this.renderProgressbarHP();
    this.renderPlayer();
  };

  renderProgressbarHP = () => {
    const {
      hp: { current, total },
      elProgressbar,
    } = this;
    const percentage = current / (total / 100);
    if (percentage >= 20 && percentage < 60) elProgressbar.classList.add("low");
    if (percentage < 20) elProgressbar.classList.add("critical");
    elProgressbar.style.width = percentage + "%";
  };

  changeHP = (count, cb) => {
    let isDisabled = false;
    this.hp.current -= count;
    if (this.hp.current <= count) {
      this.hp.current = 0;
      isDisabled = true;
    }
    this.renderHP();
    cb && cb(count, isDisabled);
  };

  renderPlayer = () => {
    this.displayName.innerText = this.name;
    this.pokemonImg.src = this.img;
  };
}

export default Pokemon;
