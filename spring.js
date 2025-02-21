"use strict";
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
// let press_flag = true;
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
const startpopupoverlay = document.getElementById("startpopupOverlay");
const theme_list = [["island", "rabbit", "orange", "in", "china", "streamer", "off", "on", "radio", "wave"], 
                    ["control", "monitor", "set", "next", "audio", "by", "scan", "ask", "solve", "core"]];
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
const countdown = document.getElementById("count");
function count() {
    if (countStarted) return;
    countStarted = true;
    countInterval = setInterval(function() {
        if (countSeconds === 0) {
            clearInterval(countInterval);
            // isDownRunning = false;
            countStarted = true;
            document.getElementById("countpopupOverlay").style.display = "none";
            document.getElementById("gamepopupOverlay").style.display = "flex";
            choose_topic()
            setTimeout(function() {
                input.focus();
            }, 100);
        }
        else if (countSeconds <= 1) {
            countdown.textContent = "Start";
            countSeconds--;
        }
        else{
            countSeconds--;
            countdown.textContent = countSeconds;
        }
    }, 1000)
    }
function choose_topic() {
    theme_index = 0;
    let random = Math.floor(Math.random() * 2);
    choose_theme = theme_list[random];
    // console.log(choose_theme);
    theme.textContent = choose_theme[theme_index];
    typing();
}
function typing() {
    // input.focus();
    // updateThemeDisplay();
    // input.value = "";
    // clearInterval(downTimerInterval);
    startDownTimer();
    input.addEventListener("input", function() {
        if (input.value === choose_theme[theme_index]) {
            theme_index++;
            if (theme_index < choose_theme.length) {
                input.value = "";
                updateThemeDisplay();
                theme.textContent = choose_theme[theme_index];
                // theme.textContent = theme_list[theme_index];
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
// function inputFocus() {
    //     setTimeout(function() {
        //         document.getElementById("input_field").focus();
        //         console.log("a")
        //     }, 100);
        // }
function updateThemeDisplay() {
    if (theme_index < choose_theme.length) {
        let currentInput = input.value;
        let correctPart = choose_theme[theme_index].slice(0, currentInput.length);
        let remainingPart = choose_theme[theme_index].slice(currentInput.length);
        theme.innerHTML = `<span style="color: green;">${correctPart}</span>${remainingPart}`;
    }
}
easy.addEventListener("click", choice);
normal.addEventListener("click", choice);
hard.addEventListener("click", choice);
let downTimerInterval;
let downTimerSeconds = 60;
function startDownTimer() {
    if (isDownRunning) return;
    isDownRunning = true;
    downTimerInterval = setInterval(function() {
        if (downTimerSeconds > 0) {
            downTimerSeconds--;
            displayDownTimer();
        } else {
            clearInterval(downTimerInterval);
            isDownRunning = false;
            
        }
    }, 1000);
}
function displayDownTimer() {
    // const minutes = Math.floor(downTimerSeconds / 60);
    const seconds = downTimerSeconds % 60;
    document.getElementById("rest").textContent = `残り時間:${seconds}秒`;
    // console.log("a");
}
function pauseDownTimer() {
    clearInterval(downTimerInterval);
    isDownRunning = false;
}
const pause = document.getElementById("pause");
pause.addEventListener("click", function() {
    document.getElementById("pausepopupOverlay").style.display = "flex";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "none";
    pauseDownTimer();
})
const resume = document.getElementById("resume");
resume.addEventListener("click", function() {
    document.getElementById("pausepopupOverlay").style.display = "none";
    document.getElementById("gamepopupOverlay").style.pointerEvents = "auto";
    startDownTimer();
    setTimeout(function() {
        input.focus();
    }, 100);
})
const topReturn = document.getElementById("top");
topReturn.addEventListener("click", function() {
    clearInterval(downTimerInterval);
    isDownRunning = false;
    document.getElementById("pausepopupOverlay").style.display = "none";
    downTimerSeconds = 60;
    startpopupoverlay.style.display = "flex";
    countSeconds = 4;
    isGameStarted = false;
    miss = 0;
    theme_index = 0;
    countStarted = false;
})