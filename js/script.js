/*
==========================================
SSIDG - Smart Student ID Card Generator
Version : 1.0.0

File : script.js

Purpose :
Main Application Controller

Author :
Saurabh Sahai
==========================================
*/

//======================================
// INPUT ELEMENTS
//======================================

const schoolName = document.getElementById("schoolName");
const schoolAddress = document.getElementById("schoolAddress");
const udise = document.getElementById("udise");

const signature = document.getElementById("signature");
const excelFile = document.getElementById("excelFile");

const generateBtn = document.getElementById("generateBtn");
const previewBtn = document.getElementById("previewBtn");
const printBtn = document.getElementById("printBtn");

const startBtn = document.getElementById("startBtn");

//======================================
// AUTO UPPERCASE
//======================================

schoolName.addEventListener("input", () => {
    schoolName.value = schoolName.value.toUpperCase();
});

schoolAddress.addEventListener("input", () => {
    schoolAddress.value = schoolAddress.value.toUpperCase();
});

//======================================
// UDISE VALIDATION
//======================================

udise.addEventListener("input", () => {

    udise.value = udise.value.replace(/\D/g, "");

    if (udise.value.length > 11) {
        udise.value = udise.value.substring(0,11);
    }

});

//======================================
// WELCOME SCREEN
//======================================

if(startBtn){

    startBtn.addEventListener("click", function(){

        const welcome=document.getElementById("welcomeScreen");
        const app=document.getElementById("mainApp");

        welcome.classList.add("fade-out");

        setTimeout(function(){

            welcome.style.display="none";

            app.style.display="block";

            app.classList.add("fade-in");

        },500);

    });

}

//======================================
// GENERATE BUTTON
//======================================

generateBtn.addEventListener("click", function(){

    // School Name

    if(schoolName.value.trim()===""){

        alert("Please enter School Name.");

        schoolName.focus();

        return;

    }

    // UDISE

    if(udise.value.length!==11){

        alert("UDISE Code must contain exactly 11 digits.");

        udise.focus();

        return;

    }

    // School Address

    if(schoolAddress.value.trim()===""){

        alert("Please enter School Address.");

        schoolAddress.focus();

        return;

    }

    // Signature

    if(signature.files.length===0){

        alert("Please upload Principal Signature.");

        return;

    }

    // Excel

    if(excelFile.files.length===0){

        alert("Please upload Student Excel File.");

        return;

    }

    // Read Excel

updateStatus("Reading Excel File...", "blue");

readExcel(excelFile.files[0]);

setTimeout(function () {

    if (students.length > 0) {

        updateStatus("ID Cards Generated Successfully", "green");

        alert(
            "✅ " + students.length +
            " Student ID Cards are ready.\n\n" +
            "Click 'Preview First Card' to see the first card or 'Print All Cards' to print all cards."
        );

    }

}, 300);
}); 
//======================================
// PREVIEW BUTTON
//======================================

if(previewBtn){

    previewBtn.addEventListener("click",function(){

        generatePreview();

    });

}

//======================================
// PRINT BUTTON
//======================================

