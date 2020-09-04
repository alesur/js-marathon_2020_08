import Pokemon from "./pokemon.js";
import { random, clickCounter, generateLog, renderFightLog } from "./utils.js";
import { pokemons } from "./pokemons.js";

const $control = document.querySelector(".control");

function startGame() {
  let pl1 = pokemons[random(pokemons.length) - 1];
  let pl2 = pokemons[random(pokemons.length) - 1];
  const player1 = new Pokemon({
    ...pl1,
    selectors: "player1",
  });
  const player2 = new Pokemon({
    ...pl2,
    selectors: "player2",
  });

  const totalClick = clickCounter();

  player1.attacks.forEach((item) => {
    const bntUsed = clickCounter();
    const $btn = document.createElement("button");
    const $remaining = document.createElement("div");
    $remaining.classList.add("remaining");
    $btn.classList.add("button");
    $btn.innerText = item.name;

    $btn.addEventListener("click", () => {
      kickEvent(item.maxDamage);
      bntUsed.remaining($btn);
    });
    $control.appendChild($btn);
    $btn.appendChild($remaining);
  });

  function kickEvent(kickPower) {
    totalClick.total();
    player1.changeHP(random(kickPower), function (count, isDisabled) {
      renderFightLog(generateLog(player1, player2, count), isDisabled);
      gameOver(isDisabled, player2);
    });
    player2.changeHP(random(kickPower), function (count, isDisabled) {
      renderFightLog(generateLog(player2, player1, count), isDisabled);
      gameOver(isDisabled, player1);
    });
  }
}

function gameOver(isGameOver, winner) {
  if (isGameOver == true) {
    const allButtons = document.querySelectorAll(".control .button");
    allButtons.forEach(($item) => $item.remove());
    const $winnerText = document.createElement("div");
    $winnerText.classList.add("winner");
    $winnerText.innerText = winner.name + " Won!";
    $control.appendChild($winnerText);
    preStart();
  }
}

function preStart() {
  const $startBtn = document.createElement("button");
  const $logs = document.getElementById("logs");
  const $healthClr = document.querySelectorAll(".health");
  $startBtn.classList.add("button");
  $startBtn.innerText = "New Game";

  $control.appendChild($startBtn);
  $startBtn.addEventListener("click", () => {
    $control.innerText = "";
    $logs.innerHTML = "<p><b>Push buttons to start Fight</b></p>";
    $healthClr.forEach(($item) => $item.classList.remove("low", "critical"));
    startGame();
  });
}

preStart();
