import Pokemon from "./pokemon.js";
import random from "./utils.js";

const player1 = new Pokemon({
  name: "Pikachu",
  type: "electric",
  hp: 100,
  selectors: "character",
});

const player2 = new Pokemon({
  name: "Charmander",
  type: "fire",
  hp: 100,
  selectors: "enemy",
});

const $btn = document.getElementById("btn-jolt");
const $btn2 = document.getElementById("btn-wave");
const totalClick = clickCounter();
const bntUsed = clickCounter();
const bntUsed2 = clickCounter();

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

function kickEvent(kickPower) {
  totalClick.total();
  player1.changeHP(random(kickPower), function (count, isDisabled) {
    renderFightLog(generateLog(player1, player2, count), isDisabled);
  });
  player2.changeHP(random(kickPower), function (count, isDisabled) {
    renderFightLog(generateLog(player2, player1, count), isDisabled);
  });
}

function renderFightLog(logText, isDisabled) {
  const $logs = document.querySelector("#logs");
  const $p = document.createElement("p");
  $p.innerText = logText;
  $logs.insertBefore($p, $logs.children[0]);

  console.log(isDisabled);
  if (isDisabled == true) {
    $btn.disabled = true;
    $btn2.disabled = true;
  }
}

function clickCounter() {
  let click = 0;
  let btnClickLimit = 6;
  return {
    total: function () {
      click++;
    },
    remaining: function (button) {
      btnClickLimit--;
      if (btnClickLimit <= 0) button.disabled = true;
      button.getElementsByClassName(
        "remaining"
      )[0].innerText = `Осталось ${btnClickLimit} Удар(ов)`;
    },
  };
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
