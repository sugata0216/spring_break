"use strict";
const easy = document.getElementById("easy");
const normal = document.getElementById("normal");
const hard = document.getElementById("hard");
let press_flag = true;
function choice() {
    const startpopupoverlay = document.getElementById("startpopupOverlay");
    startpopupoverlay.style.display = "none";
    const presspopupoverlay = document.getElementById("presspopupOverlay");
    presspopupoverlay.style.display = "flex";
    while (press_flag) {
        if (!press_flag) {
            break;
        }
    }
}
easy.addEventListener("click", choice);
normal.addEventListener("click", choice);
hard.addEventListener("click", choice);