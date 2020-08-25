(function () {
  const $btn = document.getElementById("btn-jolt");
  const $btn2 = document.getElementById("btn-wave");

  const character = {
    name: "Pikachu",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-character"),
    elProgressbar: document.getElementById("progressbar-character"),
    renderHP: renderHP,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
  };

  const enemy = {
    name: "Charmander",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById("health-enemy"),
    elProgressbar: document.getElementById("progressbar-enemy"),
    renderHP: renderHP,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
  };

  addEventListener("click", function (event) {
    if (event.path[0].id == "btn-jolt") {
      kickEvent(20);
    }
    if (event.path[0].id == "btn-wave") {
      kickEvent(50);
    }
  });

  function init() {
    console.log("Start Game!");
    character.renderHP();
    enemy.renderHP();
  }

  function renderHP(renderHP) {
    this.elHP.innerText = this.damageHP + " / " + this.defaultHP;
    this.renderProgressbarHP();
  }

  function renderProgressbarHP(renderProgressbarHP) {
    this.elProgressbar.style.width = this.damageHP + "%";
  }

  function changeHP(changeHP) {
    if (this.damageHP < changeHP) {
      this.damageHP = 0;
      alert("Бедный " + this.name + " проиграл бой!");
      $btn.disabled = true;
      $btn2.disabled = true;

    } else {
      this.damageHP -= changeHP;
    }
    this.renderHP();
  }

  function random(num) {
    return Math.ceil(Math.random() * num);
  }

  function kickEvent(kickPower){
    character.changeHP(random(kickPower));
    enemy.changeHP(random(kickPower));
  };

  init();
})();
