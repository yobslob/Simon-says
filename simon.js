let gameSeq = [];
let userSeq = [];
let gameRunning = false;
let score = 0;

let btns = document.querySelectorAll(".circle");
let start = document.querySelector(".start");
let h3 = document.querySelector("h3");

let audio = {
    red: new Audio("sounds/red.mp3"),
    green: new Audio("sounds/green.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    start: new Audio("sounds/start.mp3"),
    error: new Audio("sounds/error.mp3"),
}

start.addEventListener("click", function () {
    if (!gameRunning) {
        gameRunning = true;
        nextTurn();
        h3.innerText = "How long a sequence can you remember?";
        audio.start.play();
    }
});

function buttonFlash(idx) {
    btns[idx].classList.add("flash");
    setTimeout(function () {
        btns[idx].classList.remove("flash");
    }, 250);
    switch (idx) {
        case 0:
            audio.red.play();
            break;
        case 1:
            audio.green.play();
            break;
        case 2:
            audio.blue.play();
            break;
        case 3:
            audio.yellow.play();
            break;
    }
}

function nextTurn() {
    userSeq = [];
    score++;
    start.textContent = score;
    let buttonidx = Math.floor(Math.random() * 4);
    gameSeq.push(buttonidx);
    console.log(gameSeq);
    buttonFlash(buttonidx);
}

btns.forEach(function (btn, idx) {
    btn.addEventListener("click", function () {
        if (gameSeq.length > 0 && gameRunning) {
            userSeq.push(idx);
            console.log(userSeq);
            buttonFlash(idx);
            checkAns(userSeq.length - 1);
        }
    });
});

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextTurn, 850);
        }
    } else {
        audio.error.play();
        h3.innerHTML = `<b>Game Over!</b><br>Your score was ${score}.`;
        gameRunning = false;
        start.textContent = "Start";
        score = 0;
        userSeq = [];
        gameSeq = [];
    }
}
