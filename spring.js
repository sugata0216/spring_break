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
const theme_list = [["island", "rabbit", "orange", "in", "china", "streamer", "off", "on", "radio", "wave"], 
                    ["control", "monitor", "set", "next", "audio", "by", "scan", "ask", "solve", "core"]];
                    function choice() {
                        const startpopupoverlay = document.getElementById("startpopupOverlay");
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
    if (!countStarted) {
        countInterval = setInterval(function() {
            if (countSeconds === 0) {
                document.getElementById("countpopupOverlay").style.display = "none";
                document.getElementById("gamepopupOverlay").style.display = "flex";
                countStarted = true;
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
    choose_topic()
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
    input.focus();
    // updateThemeDisplay();
    // input.value = "";
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