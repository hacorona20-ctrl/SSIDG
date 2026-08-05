/*
=========================================================
SSIDG Community Edition v1.0

Smart Student ID Card Generator

Preview Engine

Developed By : Saurabh Sahai

© 2026 All Rights Reserved
=========================================================
*/


//=========================================================
// GENERATE PREVIEW
//=========================================================

function generatePreview() {

    if (!students || students.length === 0) {

        statusError("No student data found.");

        alert("Please upload Student Excel first.");

        return;

    }

    buildPreview(students[0]);

}



//=========================================================
// BUILD PREVIEW
//=========================================================

function buildPreview(student) {

    const schoolName =
        document.getElementById("schoolName").value.trim();

    const schoolAddress =
        document.getElementById("schoolAddress").value.trim();

    const udise =
        document.getElementById("udise").value.trim();

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

    const previewContainer =
        document.getElementById("previewContainer");

    const idCard =
        document.getElementById("idCard");

    previewContainer.style.display = "block";
    idCard.innerHTML = `

<div class="preview-page">

<div class="student-card">

    <!-- BSP HEADER -->

    <div class="bsp-strip">

        <img src="assets/images/bsp-strip.png"
             alt="Basic Shiksha Parishad">

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
                    <td>${student.srNo || ""}</td>
                </tr>

                <tr>
                    <td>Name</td>
                    <td>${student.studentName || ""}</td>
                </tr>

                <tr>
                    <td>Father</td>
                    <td>${student.fatherName || ""}</td>
                </tr>

                <tr>
                    <td>Class</td>
                    <td>${student.studentClass || ""}</td>
                </tr>

                <tr>
                    <td>DOB</td>
                    <td>${student.dob || ""}</td>
                </tr>

            </table>

        </div>

    </div>

    <!-- FOOTER -->

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

</div>

`;

}
//=========================================================
// PREVIEW CSS
//=========================================================

const previewStyle = document.getElementById("ssidgPreviewStyle");

if (!previewStyle) {

    const style = document.createElement("style");

    style.id = "ssidgPreviewStyle";

    style.innerHTML = `

    .preview-page{

        display:flex;

        justify-content:center;

        align-items:flex-start;

        padding:20px;

        background:#e9ecef;

    }

    .student-card{

        width:90mm;

        height:62mm;

        background:#ffffff;

        border-left:3px solid #1565C0;

        border-right:3px solid #1565C0;

        border-top:3px solid #FF9933;

        border-bottom:3px solid #138808;

        border-radius:5mm;

        overflow:hidden;

        box-shadow:0 2px 8px rgba(0,0,0,.20);

        font-family:Arial,Helvetica,sans-serif;

    }

    .bsp-strip{

        width:100%;

        height:6mm;

        margin-top:2px;

    }

    .bsp-strip img{

        width:100%;

        height:100%;

        display:block;

        object-fit:cover;

    }

    .card-header{

        background:#1565C0;

        color:#ffffff;

        text-align:center;

        padding:1mm;

    }

    .school-name{

        font-size:11pt;

        font-weight:bold;

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

        border-bottom:1px solid #1565C0;

        padding:1.2mm 0;

        background:#ffffff;

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

        font-size:7.5pt;

        padding:0.4mm;

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

        padding:0 2mm 2mm;

    }

    .signature-box{

        text-align:center;

    }

    .signature{

        width:18mm;

        max-height:8mm;

        display:block;

        margin:auto;

        object-fit:contain;

    }

    .signature-line{

        width:20mm;

        border-top:1px solid #000;

        margin-top:0.5mm;

    }

    .signature-text{

        font-size:6pt;

    }

    `;

    document.head.appendChild(style);

}
//=========================================================
// SHOW PREVIEW
//=========================================================

function showPreview() {

    const previewContainer =
        document.getElementById("previewContainer");

    if (previewContainer) {

        previewContainer.style.display = "block";

    }

}



//=========================================================
// HIDE PREVIEW
//=========================================================

function hidePreview() {

    const previewContainer =
        document.getElementById("previewContainer");

    if (previewContainer) {

        previewContainer.style.display = "none";

    }

}



//=========================================================
// CLEAR PREVIEW
//=========================================================

function clearPreview() {

    const idCard =
        document.getElementById("idCard");

    if (idCard) {

        idCard.innerHTML = "";

    }

    hidePreview();

}



//=========================================================
// REFRESH PREVIEW
//=========================================================

function refreshPreview() {

    if (!students || students.length === 0) {

        return;

    }

    buildPreview(students[0]);

}



//=========================================================
// AUTO REFRESH EVENTS
//=========================================================

document.addEventListener("DOMContentLoaded", function () {

    const schoolName =
        document.getElementById("schoolName");

    const schoolAddress =
        document.getElementById("schoolAddress");

    const udise =
        document.getElementById("udise");

    const signature =
        document.getElementById("signature");

    if (schoolName) {

        schoolName.addEventListener(
            "input",
            refreshPreview
        );

    }

    if (schoolAddress) {

        schoolAddress.addEventListener(
            "input",
            refreshPreview
        );

    }

    if (udise) {

        udise.addEventListener(
            "input",
            refreshPreview
        );

    }

    if (signature) {

        signature.addEventListener(
            "change",
            refreshPreview
        );

    }

});


//=========================================================
// END OF FILE
//=========================================================