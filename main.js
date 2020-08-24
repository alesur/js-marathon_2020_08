const $btn = document.getElementById("btn-jolt");
const $btn2 = document.getElementById("btn-wave");
const character = {
  name: "Pikachu",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-character"),
  elProgressbar: document.getElementById("progressbar-character"),
};

const enemy = {
  name: "Charmander",
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById("health-enemy"),
  elProgressbar: document.getElementById("progressbar-enemy"),
};

addEventListener("click", function (event) {
  if(event.path[0].id == "btn-jolt"){
    kickEvent(20);
  }
  if(event.path[0].id == "btn-wave"){
    kickEvent(50);
  }
  console.log(character.name + ' kicked with ' + event.path[0].innerText);
});

function init() {
  console.log("Start Game!");
  renderHP(character);
  renderHP(enemy);
}

function renderHP(person) {
  renderHPLife(person);
  renderProgressbarHP(person);
}

function renderHPLife(person) {
  person.elHP.innerText = person.damageHP + " / " + person.defaultHP;
}

function renderProgressbarHP(person) {
  person.elProgressbar.style.width = person.damageHP + "%";
}

function changeHP(count, person) {
  if (person.damageHP < count) {
    person.damageHP = 0;
    alert("Бедный " + person.name + " проиграл бой!");
    $btn.disabled = true;
    $btn2.disabled = true;
    
  } else {
    person.damageHP -= count;
  }
  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function kickEvent(kickPower){
  changeHP(random(kickPower), character);
  changeHP(random(kickPower), enemy);
};

init();
