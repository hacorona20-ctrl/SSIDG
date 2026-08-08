/*
=========================================================
SSIDG Community Edition v1.0

Smart Student ID Card Generator

Print Engine

Developed By : Saurabh Sahai

© 2026 All Rights Reserved
=========================================================
*/

//=========================================================
// GLOBAL CONSTANTS
//=========================================================

const CARDS_PER_PAGE = 8;
const PAGE_COLUMNS = 2;
const PAGE_ROWS = 4;

//=========================================================
// PRINT BUTTON
//=========================================================

document.addEventListener("DOMContentLoaded", function () {

    const printButton = document.getElementById("printBtn");

    if (printButton) {

        printButton.addEventListener("click", printAllCards);

    }

});

//=========================================================
// MAIN PRINT FUNCTION
//=========================================================

function printAllCards() {

    // Check Student Data

    if (!students || students.length === 0) {

        statusError("No student data found.");

        alert("Please upload Student Excel first.");

        return;

    }

    // School Information

    const schoolName =
        document.getElementById("schoolName").value.trim();

    const schoolAddress =
        document.getElementById("schoolAddress").value.trim();

    const udise =
        document.getElementById("udise").value.trim();

    // Principal Signature

    let signatureURL = "";

    const signatureInput =
        document.getElementById("signature");

    if (
        signatureInput &&
        signatureInput.files.length > 0
    ) {

        signatureURL =
            URL.createObjectURL(signatureInput.files[0]);

    }

    statusPrinting();

    // Create Print Window

    const printWindow =
        window.open("", "_blank");

    if (!printWindow) {

        alert("Popup blocked. Please allow popups.");

        return;

    }

    // Build Complete HTML

    const html = buildPrintHTML(

        schoolName,
        schoolAddress,
        udise,
        signatureURL

    );

    // Write HTML

    printWindow.document.open();

    printWindow.document.write(html);

    printWindow.document.close();

    // Wait for Loading

    printWindow.onload = function () {

        setTimeout(function () {

            printWindow.focus();

            printWindow.print();

            statusSuccess();

        }, 500);

    };

}
//=========================================================
// BUILD COMPLETE PRINT HTML
//=========================================================

function buildPrintHTML(

    schoolName,
    schoolAddress,
    udise,
    signatureURL

){

let html = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>

SSIDG Student ID Cards

</title>

<style>

*{

    margin:0;
    padding:0;
    box-sizing:border-box;

}

@page{

    size:A4 portrait;

    margin:8mm;

}

body{

    font-family:Arial,Helvetica,sans-serif;
    background:#ffffff;

}

.page{

    width:194mm;
    min-height:280mm;

    display:grid;

    grid-template-columns:repeat(2,90mm);

    grid-auto-rows:62mm;

    gap:4mm;

    page-break-after:always;

}

.student-card{

    width:90mm;
    height:62mm;

    border-left:3px solid #1565C0;
    border-right:3px solid #1565C0;
    border-top:3px solid #FF9933;
    border-bottom:3px solid #138808;

    border-radius:5mm;

    overflow:hidden;

    background:#ffffff;

}

.bsp-strip{

    width:100%;

    height:6mm;

    margin-top:2px;

}

.bsp-strip img{

    width:100%;
    height:100%;
    object-fit:cover;
    display:block;

}

.card-header{

    background:#1565C0;

    color:#ffffff;

    text-align:center;

    padding:1mm;

}

.card-title{

    font-size:10pt;

    font-weight:bold;

}

.school-name{

    font-size:13pt;

    font-weight:700;

    margin-top:1mm;

    line-height:1.05;

    text-transform:uppercase;

}

.school-address{

    font-size:8pt;

    font-weight:bold;

}

.udise{

    font-size:8pt;

    font-weight:bold;

    margin-top:0.5mm;

}
    .card-type{

    text-align:center;

    font-size:9pt;

    font-weight:bold;

    color:#0D47A1;

    background:#ffffff;

    border-bottom:1px solid #1565C0;

    padding:1.2mm 0;

    letter-spacing:0.5px;

}
.card-body{

    display:flex;

    padding:2mm;

}

.photo-box{

    width:18mm;
    height:22mm;

    border:1px solid #000;

    display:flex;

    justify-content:center;

    align-items:center;

    font-size:7pt;

    margin-right:3mm;

}

.student-details{

    flex:1;

}

.student-details table{

    width:100%;

    border-collapse:collapse;

}

.student-details td{

    padding:0.4mm;

    font-size:7.5pt;

    vertical-align:top;

}

.student-details td:first-child{

    width:18mm;

    font-weight:bold;

    color:#C62828;

}

.card-footer{

    display:flex;

    justify-content:flex-end;

    margin-top:-3mm;

    padding:0 2mm 1mm;

}
.signature-box{

    text-align:center;

}

.signature{

    width:18mm;

    max-height:8mm;

    object-fit:contain;

    display:block;

    margin:auto;

}

.signature-line{

    width:20mm;

    border-top:1px solid #000;

    margin-top:1mm;

}

.signature-text{

    font-size:6pt;

}

</style>

</head>

<body>

`;

students.forEach(function(student,index){

    if(index % CARDS_PER_PAGE === 0){

        if(index !== 0){

            html += "</div>";

        }

        html += '<div class="page">';

    }

    html += createStudentCard(

        student,

        schoolName,

        schoolAddress,

        udise,

        signatureURL

    );

});

html += `

</div>

</body>

</html>

`;

return html;

}
//=========================================================
// CREATE STUDENT ID CARD
//=========================================================

function createStudentCard(

    student,
    schoolName,
    schoolAddress,
    udise,
    signatureURL

){

return `

<div class="student-card">

    <!-- BSP HEADER -->

    <div class="bsp-strip">

        <img src="./assets/images/bsp-strip.png">

    </div>

    <!-- HEADER -->

    <div class="card-header">

    <div class="school-name">

        ${schoolName}

    </div>

    <div class="school-address">

        ${schoolAddress}

    </div>

    <div class="udise">

        UDISE : ${udise}

    </div>

</div>

<div class="card-type">

    STUDENT IDENTITY CARD

</div>

    <!-- BODY -->

    <div class="card-body">

        <!-- PHOTO -->

        <div class="photo-box">

            PHOTO

        </div>

        <!-- DETAILS -->

        <div class="student-details">

            <table>

                <tr>

                    <td>SR No.</td>

                    <td>${student.srNo}</td>

                </tr>

                <tr>

                    <td>Name</td>

                    <td>${student.studentName}</td>

                </tr>

                <tr>

                    <td>Father</td>

                    <td>${student.fatherName}</td>

                </tr>

                <tr>

                    <td>Class</td>

                    <td>${student.studentClass}</td>

                </tr>

                <tr>

                    <td>DOB</td>

                    <td>${student.dob}</td>

                </tr>

            </table>

        </div>

    </div>

    <!-- FOOTER -->

    <div class="card-footer">

        <div class="signature-box">

            ${
                signatureURL
                ?
                `<img src="${signatureURL}" class="signature">`
                :
                ""
            }

            <div class="signature-line"></div>

            <div class="signature-text">

                Principal Signature

            </div>

        </div>

    </div>

</div>

`;

}
//=========================================================
// FINISH PRINT PROCESS
//=========================================================

function finishPrinting(printWindow, signatureURL){

    printWindow.onload = function(){

        setTimeout(function(){

            printWindow.focus();

            printWindow.print();

            if(signatureURL){

                URL.revokeObjectURL(signatureURL);

            }

            if(typeof statusSuccess === "function"){

                statusSuccess();

            }

        },500);

    };

}
