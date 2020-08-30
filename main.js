(function () {
  const $btn = document.getElementById("btn-jolt");
  const $btn2 = document.getElementById("btn-wave");
  const totalClick = clickCounter();
  const bntUsed = clickCounter();
  const bntUsed2 = clickCounter();
  const character = {
    name: "Pikachu",
    hp: {
      current: 100,
      total: 100,
    },
    elHP: document.getElementById("health-character"),
    elProgressbar: document.getElementById("progressbar-character"),
    renderHP: renderHP,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
  };

  const enemy = {
    name: "Charmander",
    hp: {
      current: 100,
      total: 100,
    },
    elHP: document.getElementById("health-enemy"),
    elProgressbar: document.getElementById("progressbar-enemy"),
    renderHP: renderHP,
    renderProgressbarHP: renderProgressbarHP,
    changeHP: changeHP,
  };

  addEventListener("click", function (event) {
    if (event.path[0].id == "btn-jolt") {
      kickEvent(10);
      bntUsed.remaining($btn);
    }
    if (event.path[0].id == "btn-wave") {
      kickEvent(30);
      bntUsed2.remaining($btn2);
    }
  });

  function init() {
    console.log("Start Game!");
    character.renderHP();
    enemy.renderHP();
  }

  function renderHP() {
    this.elHP.innerText = this.hp.current + " / " + this.hp.total;
    this.renderProgressbarHP(this);
  }

  function renderProgressbarHP() {
    this.elProgressbar.style.width = this.hp.current + "%";
  }

  function changeHP(count) {
    this.hp.current -= count;

    const log =
      this === enemy
        ? generateLog(this, character, count)
        : generateLog(this, enemy, count);
    console.log(log);
    renderFightLog(log);

    if (this.hp.current <= count) {
      this.hp.current = 0;
      alert("Бедный " + this.name + " проиграл бой!");
      $btn.disabled = true;
      $btn2.disabled = true;
    }
    this.renderHP();
  }

  const random = (num) => Math.ceil(Math.random() * num);

  function kickEvent(kickPower) {
    totalClick.total();
    character.changeHP(random(kickPower));
    enemy.changeHP(random(kickPower));
  }

  function generateLog(firstPerson, secondPerson, damage) {
    const {
      name,
      hp: { current, total },
    } = firstPerson;
    const logs = [
      `${name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage}, [${current}\\${total}]`,
      `${name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage}, [${current}\\${total}]`,
      `${name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage}, [${current}\\${total}]`,
      `${name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage}, [${current}\\${total}]`,
      `${name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${damage}, [${current}\\${total}]`,
      `${name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage}, [${current}\\${total}]`,
      `${name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage}, [${current}\\${total}]`,
      `${name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${damage}, [${current}\\${total}]`,
      `${name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage}, [${current}\\${total}]`,
      `${name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage}, [${current}\\${total}]`,
    ];

    return logs[random(logs.length) - 1];
  }

  function renderFightLog(logText) {
    const $logs = document.querySelector("#logs");
    const $p = document.createElement("p");
    $p.innerText = logText;
    $logs.insertBefore($p, $logs.children[0]);
  }

  function clickCounter() {
    let click = 0;
    let btnClickLimit = 6;
    return {
      total: function () {
        click++;
        console.log(`Total button clicks: ${click}`);
      },
      remaining: function (button) {
        btnClickLimit--;
        if (btnClickLimit <= 0) button.disabled = true;
        console.log(`${btnClickLimit}`);
      },
    };
  }

  init();
})();
