"use strict";
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
let countInterval;
let countSeconds = 4;
let isGameStarted = false;
const presspopupoverlay = document.getElementById("presspopupOverlay");
const input = document.getElementById("input_field");
const mistake = document.getElementById("mistake");
let miss = 0;
const theme = document.getElementById("theme");
let theme_index = 0;
let choose_theme;
let countStarted = false;
let isDownRunning = false;
let difficulty;
const startpopupoverlay = document.getElementById("startpopupOverlay");
const easy_theme_list = [["island", "rabbit", "orange", "in", "china", "streamer", "off", "on", "radio", "wave"],
["control", "monitor", "set", "next", "audio", "by", "scan", "ask", "solve", "core"]];
const normal_theme_list = [["telephone", "adventure", "motorcycle", "kangaroo", "chocolate", "watermelon", "sunflower", "calculator", "astronaut", "pineapple"],
["impossible", "not", "for", "sale", "pause", "break", "insert", "back", "space", "home"]];
const hard_theme_list = [["lilac", "kaijuunohanauta", "kawaiidakejadamedesuka", "saudade", "zankokunatenshinothese", "sayonaraelegy", "marigold", "dryflower", "366nichi", "bansanka"],
["darling", "queserasera", "suiheisen", "chankapana", "ikuokukonen", "kanade", "takanenohanakosan", "cherry", "chiisanakoinouta", "tenbyounouta"]]
const countdown = document.getElementById("count");
let downTimerInterval;
let downTimerSeconds = 60;
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const topReturn = document.getElementById("top");
const once = document.getElementById("once");
const resetTop = document.getElementById("return");
function choice() {
    startpopupoverlay.style.display = "none";
    presspopupoverlay.style.display = "flex";
    document.addEventListener("keydown", handlekeydown);
}
function handlekeydown(event) {
    if (!isGameStarted && event.key === " ") {
        isGameStarted = true;
        document.removeEventListener("keydown", handlekeydown);
        presspopupoverlay.style.display = "none";
        document.getElementById("countpopupOverlay").style.display = "flex";
        count()
    }
}
function count() {
    if (countStarted) return;
    countStarted = true;
    countInterval = setInterval(function () {
        if (countSeconds === 0) {
            clearInterval(countInterval);
            countStarted = true;
            document.getElementById("countpopupOverlay").style.display = "none";
            document.getElementById("gamepopupOverlay").style.display = "flex";
            choose_topic()
            setTimeout(function () {
                input.focus();
            }, 100);
        }
        else if (countSeconds <= 1) {
            countdown.textContent = "Start";
            countSeconds--;
        }
        else {
            countSeconds--;
            countdown.textContent = countSeconds;
        }
    }, 1000)
}
function choose_topic() {
    theme_index = 0;
    let random = Math.floor(Math.random() * 2);
    if (difficulty === "easy") {
        choose_theme = easy_theme_list[random];
    } else if (difficulty === "normal") {
        choose_theme = normal_theme_list[random];
    } else {
        choose_theme = hard_theme_list[random];
    }
    theme.textContent = choose_theme[theme_index];
    typing();
}
function typing() {
    downTimerSeconds = 60;
    startDownTimer();
    input.addEventListener("input", function () {
        if (input.value === choose_theme[theme_index]) {
            theme_index++;
            if (theme_index < choose_theme.length) {
                input.value = "";
                updateThemeDisplay();
                theme.textContent = choose_theme[theme_index];
            }
            else {
                clearInterval(downTimerInterval);
                isDownRunning = false;
                document.getElementById("gamepopupOverlay").style.display = "none";
                document.getElementById("resultpopupOverlay").style.display = "flex";
                document.getElementById("missRest").textContent = `ミスタイプ数:${miss}、経過秒数:${60 - downTimerSeconds}秒`
            }
        } else {
            let currentInput = input.value;
            let correctText = theme.textContent.slice(0, currentInput.length);
            if (currentInput !== correctText) {
                miss++;
                mistake.textContent = `ミスタイプ数:${miss}`;
                input.value = input.value.slice(0, -1);
            }
        }
        updateThemeDisplay();
    })
}
function updateThemeDisplay() {
    if (theme_index < choose_theme.length) {
        let currentInput = input.value;
        let correctPart = choose_theme[theme_index].slice(0, currentInput.length);
        let remainingPart = choose_theme[theme_index].slice(currentInput.length);
        theme.innerHTML = `<span style="color: green;">${correctPart}</span>${remainingPart}`;
    }
}
function startDownTimer() {
    if (isDownRunning) return;
    isDownRunning = true;
    downTimerInterval = setInterval(function () {
        if (downTimerSeconds > 0) {
            downTimerSeconds--;
            displayDownTimer();
        } else {
            clearInterval(downTimerInterval);
            isDownRunning = false;
            document.getElementById("gamepopupOverlay").style.display = "none";
            document.getElementById("resultpopupOverlay").style.display = "flex";
            document.getElementById("missRest").textContent = `ミスタイプ数:${miss}、経過秒数:${60 - downTimerSeconds}秒`;
        }
    }, 1000);
}
function displayDownTimer() {
    const seconds = downTimerSeconds % 60;
    document.getElementById("rest").textContent = `残り時間:${seconds}秒`;
}
function pauseDownTimer() {
    clearInterval(downTimerInterval);
    isDownRunning = false;
}
function returnTop() {
    clearInterval(downTimerInterval);
    isDownRunning = false;
    document.getElementById("pausepopupOverlay").style.display = "none";
    document.getElementById("gamepopupOverlay").style.display = "none";
    downTimerSeconds = 60;
    startpopupoverlay.style.display = "flex";
    countSeconds = 4;
    isGameStarted = false;
    miss = 0;
    mistake.textContent = "ミスタイプ数:0";
    theme_index = 0;
    countStarted = false;
    countdown.textContent = "";
    input.value = "";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "auto";
}
function reset() {
    clearInterval(downTimerInterval);
    isDownRunning = false;
    document.getElementById("resultpopupOverlay").style.display = "none";
    downTimerSeconds = 60;
    startpopupoverlay.style.display = "flex";
    countSeconds = 4;
    isGameStarted = false;
    miss = 0;
    mistake.textContent = "ミスタイプ数:0";
    theme_index = 0;
    countStarted = false;
    countdown.textContent = "";
    input.value = "";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "auto";
    document.getElementById("rest").textContent = "残り時間:60秒"
}
easy.addEventListener("click", function () {
    difficulty = "easy";
    choice();
});
normal.addEventListener("click", function () {
    difficulty = "normal";
    choice();
});
hard.addEventListener("click", function () {
    difficulty = "hard";
    choice();
});
pause.addEventListener("click", function () {
    document.getElementById("pausepopupOverlay").style.display = "flex";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "none";
    pauseDownTimer();
})
resume.addEventListener("click", function () {
    document.getElementById("pausepopupOverlay").style.display = "none";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "auto";
    startDownTimer();
    setTimeout(function () {
        input.focus();
    }, 100);
})
once.addEventListener("click", function () {
    clearInterval(downTimerInterval);
    isDownRunning = false;
    countSeconds = 4;
    miss = 0;
    mistake.textContent = "ミスタイプ数:0";
    theme_index = 0;
    countStarted = false;
    countdown.textContent = "";
    input.value = "";
    document.getElementById("resultpopupOverlay").style.display = "none";
    document.getElementById("countpopupOverlay").style.display = "flex";
    document.getElementById("rest").textContent = "残り時間:60秒"
    count();
})
topReturn.addEventListener("click", returnTop);
resetTop.addEventListener("click", reset);