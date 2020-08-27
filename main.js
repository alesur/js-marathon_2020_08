(function() {
    const $btn = document.getElementById("btn-jolt");
    const $btn2 = document.getElementById("btn-wave");

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

    addEventListener("click", function(event) {
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
            this === enemy ?
            generateLog(this, character, count, this.hp.current, this.hp.total) :
            generateLog(this, enemy, count, this.hp.current, this.hp.total);
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

    function random(num) {
        return Math.ceil(Math.random() * num);
    }

    function kickEvent(kickPower) {
        character.changeHP(random(kickPower));
        enemy.changeHP(random(kickPower));
    }

    function generateLog(
        firstPerson,
        secondPerson,
        damage,
        currentHealth,
        totalHealt
    ) {
        const logs = [
            `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком <вырезанно цензурой> противника. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${damage}, [${currentHealth}\\${totalHealt}]`,
            `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${damage}, [${currentHealth}\\${totalHealt}]`,
        ];

        return logs[random(logs.length) - 1];
    }

    function renderFightLog(logText) {
        const $logs = document.querySelector('#logs');
        const $p = document.createElement('p');
        $p.innerText = logText;
        $logs.insertBefore($p, $logs.children[0]);
    }

    init();
})();