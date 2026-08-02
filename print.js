/*
==========================================
SSIDG - Smart Student ID Card Generator
Version : 2.0

File : print.js

Purpose :
Professional Print Engine

Author :
Saurabh Sahai
==========================================
*/

//==========================================
// PRINT ALL STUDENT ID CARDS
//==========================================

function printAllCards() {

    if (students.length === 0) {

        statusError("No student data found.");

        alert("Please upload an Excel file first.");

        return;

    }

    statusPrinting();

    const printWindow = window.open("", "_blank");

    //==========================================
    // SCHOOL DETAILS
    //==========================================

    const schoolName =
        document.getElementById("schoolName").value;

    const schoolAddress =
        document.getElementById("schoolAddress").value;

    const udise =
        document.getElementById("udise").value;

const showBSPHeader =
document.getElementById("useBSPHeader").checked;
    //==========================================
    // SIGNATURE
    //==========================================

    let signatureURL = "";

    const signatureFile =
        document.getElementById("signature").files[0];

    if (signatureFile) {

        signatureURL =
            URL.createObjectURL(signatureFile);

    }

    //==========================================
    // HTML START
    //==========================================

    let html = `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Print Student ID Cards</title>

<style>

@page{

    size:A4 portrait;

    margin:8mm;

}

body{

    margin:0;

    font-family:Arial, Helvetica, sans-serif;

    background:white;

}

.page{

    width:194mm;

    min-height:280mm;

    display:grid;

    grid-template-columns:repeat(2,90mm);

    grid-template-rows:repeat(4,62mm);

    gap:4mm;

    page-break-after:always;

}

.student-card{

    width:90mm;

    height:62mm;

    box-sizing:border-box;

    background:#fff;

    border-left:3px solid #1565C0;

    border-right:3px solid #1565C0;

    border-top:3px solid #FF9933;

    border-bottom:3px solid #138808;

    border-radius:5mm;

    overflow:hidden;

}
.bsp-strip{

    width:100%;

    text-align:center;

    margin-bottom:2px;

}

.bsp-strip img{

    width:100%;

    height:auto;

    max-height:7mm;

    object-fit:contain;

    display:block;

}

.card-header{

    background:linear-gradient(#1565C0,#0D47A1);

    color:white;

    text-align:center;

    padding:1.2mm;

    border-bottom:2px solid #FFC107;

}

.card-title{

    font-size:11pt;

    font-weight:bold;

    letter-spacing:.5px;

}

.school-name{

    font-size:9pt;

    font-weight:bold;

    margin-top:1mm;

}

.school-address{

    font-size:7pt;

}

.udise{

    font-size:7pt;

    margin-top:.5mm;

    font-weight:bold;

}

.card-body{

    display:flex;

    padding:2mm;

    align-items:flex-start;

}
    .photo{

    width:18mm;

    height:24mm;

    border:1px solid #444;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:7pt;

    font-weight:bold;

    margin-right:3mm;

    background:#fff;

}

.details{

    flex:1;

}

.details-table{

    width:100%;

    border-collapse:collapse;

    table-layout:fixed;

}

.details-table td{

    padding:0.5mm 1mm;

    font-size:8pt;

    vertical-align:top;

    word-wrap:break-word;

}

.details-table td:first-child{

    width:18mm;

    color:#C62828;

    font-weight:bold;

    white-space:nowrap;

}

.details-table td:last-child{

    color:#000;

    font-weight:normal;

}

.card-footer{

    display:flex;

    justify-content:flex-end;

    align-items:flex-end;

    padding:0 3mm 2mm;

    margin-top:2mm;

}
.signature-box{

    text-align:center;

}

.signature{

    width:16mm;

    max-height:8mm;

    object-fit:contain;

    display:block;

    margin:0 auto;

}
.signature-line{

    width:22mm;

    height:1px;

    background:#000;

    margin:0 auto;

}

.signature-text{

    font-size:6pt;

    margin-top:1mm;

}

</style>

</head>

<body>

`;

students.forEach(function(student,index){

    if(index % 8 === 0){

        if(index !== 0){

            html += "</div>";

        }

        html += '<div class="page">';

    }

    if(useBSPHeader){

        html += createBSPCard(
            student,
            schoolName,
            schoolAddress,
            udise,
            signatureURL
        );

    }else{

        html += createStandardCard(
            student,
            schoolName,
            schoolAddress,
            udise,
            signatureURL
        );

    }

});
<div class="card-title">
🎓 STUDENT IDENTITY CARD
</div>


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

<div class="card-body">

<div class="photo">

PHOTO

</div>

<div class="details">

<table class="details-table">

<tr>
<td>SR No.</td>
<td>: ${student.srNo}</td>
</tr>

<tr>
<td>Name</td>
<td>: ${student.studentName}</td>
</tr>

<tr>
<td>Father</td>
<td>: ${student.fatherName}</td>
</tr>

<tr>
<td>Class</td>
<td>: ${student.studentClass}</td>
</tr>

<tr>
<td>DOB</td>
<td>: ${student.dob}</td>
</tr>

</table>

</div>

</div>
<div class="card-footer">

    <div class="signature-box">

        ${
            signatureURL
            ? `<img src="${signatureURL}" class="signature">`
            : ""
        }

        <div class="signature-line"></div>

        <div class="signature-text">
            Principal Signature
        </div>

    </div>

</div>

</div>

`;

});

//==========================================
// CLOSE LAST PAGE
//==========================================

html += `

</div>

`;
//==========================================
// HTML END
//==========================================

html += `

</body>

</html>

`;

//==========================================
// WRITE HTML
//==========================================

printWindow.document.open();

printWindow.document.write(html);

printWindow.document.close();

//==========================================
// WAIT FOR PAGE LOAD
//==========================================

printWindow.onload = function(){

    setTimeout(function(){

        printWindow.focus();

        printWindow.print();

        // Uncomment if you want the print
        // window to close automatically.

        // printWindow.close();

        if(typeof statusSuccess === "function"){

            statusSuccess();

        }

    },500);

};

//==========================================
// END PRINT FUNCTION
//==========================================

}

//==========================================
// PRINT BUTTON
//==========================================

const printButton = document.getElementById("printBtn");
//==========================================
// STANDARD ID CARD
//==========================================

function createStandardCard(
    student,
    schoolName,
    schoolAddress,
    udise,
    signatureURL
){

return `

<div class="student-card">

<div class="card-header">

<div class="card-title">
🎓 STUDENT IDENTITY CARD
</div>

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

<div class="card-body">

<div class="photo">

PHOTO

</div>

<div class="details">

<table class="details-table">

<tr>
<td>SR No.</td>
<td>: ${student.srNo}</td>
</tr>

<tr>
<td>Name</td>
<td>: ${student.studentName}</td>
</tr>

<tr>
<td>Father</td>
<td>: ${student.fatherName}</td>
</tr>

<tr>
<td>Class</td>
<td>: ${student.studentClass}</td>
</tr>

<tr>
<td>DOB</td>
<td>: ${student.dob}</td>
</tr>

</table>

</div>

</div>

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
if(printButton){

    printButton.addEventListener("click", printAllCards);

}