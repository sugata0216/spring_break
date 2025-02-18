"use strict";
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
// let press_flag = true;
let countInterval;
let countSeconds = 4;
function choice() {
    const startpopupoverlay = document.getElementById("startpopupOverlay");
    startpopupoverlay.style.display = "none";
    const presspopupoverlay = document.getElementById("presspopupOverlay");
    presspopupoverlay.style.display = "flex";
    addEventListener("keydown", (event) => {
        if (event.key === " ") {
            presspopupoverlay.style.display = "none";
            document.getElementById("countpopupOverlay").style.display = "flex";
            count()
        }
        })
    }
const countdown = document.getElementById("count");
function count() {
    countInterval = setInterval(function() {
        if (countSeconds === 0) {
            document.getElementById("countpopupOverlay").style.display = "none";
            document.getElementById("gamepopupOverlay").style.display = "flex";
            typing()
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
const input = document.getElementById("input_field");
const mistake = document.getElementById("mistake");
let miss = 0;
const theme = document.getElementById("theme");
let theme_index = 0;
const theme_list = ["island", "rabbit", "orange", "in", "china", "streamer", "off", "on", "radio", "wave"]
function typing() {
    input.focus();
    theme.textContent = theme_list[theme_index];
    input.value = "";
    input.addEventListener("input", function() {
        if (input.value === theme.textContent) {
            theme_index++;
            theme.textContent = theme_list[theme_index];
            typing()
        } else {
            for (let i = 0; i < input.value.length; i++) {
                if (input.value[i] !== theme.textContent[i]) {
                    miss++;
                    mistake.textContent = `ミスタイプ数:${miss}`;
                    input.value = input.value.slice(0, -1);
                }
            }
        }
    })
}
easy.addEventListener("click", choice);
normal.addEventListener("click", choice);
hard.addEventListener("click", choice);