import Pokemon from "./pokemon.js";
import { clickCounter, generateLog, renderFightLog } from "./utils.js";

const $control = document.querySelector(".control");

class Game {
  getPokemons = async () => {
    const responce = await fetch(
      "https://reactmarathon-api.netlify.app/api/pokemons?random=true"
    );
    const body = await responce.json();
    return body;
  };

  getFight = async (id_1, id_2, attackId) => {
    const responce = await fetch(
      `https://reactmarathon-api.netlify.app/api/fight?player1id=${id_1}&attackId=${attackId}&player2id=${id_2}`
    );
    const body = await responce.json();
    return body;
  };

  startGame = async () => {
    let pl1 = await this.getPokemons();
    let pl2 = await this.getPokemons();

    const player1 = new Pokemon({
      ...pl1,
      selectors: "player1",
    });
    const player2 = new Pokemon({
      ...pl2,
      selectors: "player2",
    });

    player1.attacks.forEach((item) => {
      const bntUsed = clickCounter();
      const $btn = document.createElement("button");
      const $remaining = document.createElement("div");
      $remaining.classList.add("remaining");
      $btn.classList.add("button");
      $btn.innerText = item.name;

      $btn.addEventListener("click", () => {
        kickEvent(item.id);
      });
      $control.appendChild($btn);
      $btn.appendChild($remaining);
    });

    const kickEvent = async (kickId) => {
      let srvKick = await this.getFight(player1.id, player2.id, kickId);
      
      player1.changeHP(srvKick.kick.player1, function (count, isDisabled) {
        renderFightLog(generateLog(player1, player2, count), isDisabled);
        game.gameOver(isDisabled, player2);
      });
      player2.changeHP(srvKick.kick.player2, function (count, isDisabled) {
        renderFightLog(generateLog(player2, player1, count), isDisabled);
        game.gameOver(isDisabled, player1);
      });
    };
  };

  gameOver = (isGameOver, winner) => {
    if (isGameOver == true) {
      const allButtons = document.querySelectorAll(".control .button");
      allButtons.forEach(($item) => $item.remove());
      const $winnerText = document.createElement("div");
      $winnerText.classList.add("winner");
      $winnerText.innerText = winner.name + " Won!";
      $control.appendChild($winnerText);
      game.preStart();
    }
  };

  preStart = () => {
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
      game.startGame();
    });
  };
}

const game = new Game();
game.preStart();
