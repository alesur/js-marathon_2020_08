import Pokemon from "./pokemon.js";
import { random, clickCounter, generateLog, renderFightLog } from "./utils.js";
import { pokemons } from "./pokemons.js";

let pl1 = pokemons[random(pokemons.length)-1];
let pl2 = pokemons[random(pokemons.length)-1];
const player1 = new Pokemon({
  ...pl1,
  selectors: "player1",

});
const player2 = new Pokemon({
  ...pl2,
  selectors: "player2",
});

//Load buttons
const $control = document.querySelector(".control");
const totalClick = clickCounter();

player1.attacks.forEach((item) => {
  const bntUsed = clickCounter();
  const $btn = document.createElement("button");
  const $remaining = document.createElement("div");
  $remaining.classList.add("remaining");
  $btn.classList.add("button");
  $btn.innerText = item.name;


  $btn.addEventListener("click", () => {
    console.log("Click button ", $btn.innerText);
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
  });
  player2.changeHP(random(kickPower), function (count, isDisabled) {
    renderFightLog(generateLog(player2, player1, count), isDisabled);
  });
}
