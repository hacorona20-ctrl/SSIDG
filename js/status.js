/*
==========================================
SSIDG - Smart Student ID Card Generator
Version : 1.0

File : status.js

Purpose :
Controls the Status Bar

Author :
Saurabh Sahai
==========================================
*/

const statusText = document.getElementById("statusText");

/*
------------------------------------------
Update Status
------------------------------------------
*/

function updateStatus(message, color = "#0D47A1") {

    if (!statusText) return;

    statusText.innerHTML = "● " + message;

    statusText.style.color = color;

}

/*
------------------------------------------
Ready
------------------------------------------
*/

function statusReady() {

    updateStatus("STATUS : READY", "#2E7D32");

}

/*
------------------------------------------
Reading Excel
------------------------------------------
*/

function statusReading() {

    updateStatus("STATUS : Reading Excel File...", "#1565C0");

}

/*
------------------------------------------
Generating Cards
------------------------------------------
*/

function statusGenerating() {

    updateStatus("STATUS : Generating Student ID Cards...", "#1565C0");

}

/*
------------------------------------------
Preview Ready
------------------------------------------
*/

function statusPreview() {

    updateStatus("STATUS : Preview Ready", "#2E7D32");

}

/*
------------------------------------------
Printing
------------------------------------------
*/

function statusPrinting() {

    updateStatus("STATUS : Preparing for Printing...", "#F57C00");

}

/*
------------------------------------------
Success
------------------------------------------
*/

function statusSuccess() {

    updateStatus("STATUS : Completed Successfully", "#2E7D32");

}

/*
------------------------------------------
Error
------------------------------------------
*/

function statusError(message) {

    updateStatus("STATUS : " + message, "#C62828");

}

/*
------------------------------------------
Initial Status
------------------------------------------
*/

window.addEventListener("load", function () {

    statusReady();

});