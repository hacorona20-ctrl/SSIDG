/*
==========================================
SSIDG - Smart Student ID Card Generator
Version : 1.0

File : preview.js

Purpose :
Generate Student ID Card Preview

Author :
Saurabh Sahai
==========================================
*/

// ==========================================
// Preview First Student
// ==========================================

function generatePreview() {

    if (students.length === 0) {

        statusError("No student data available.");

        alert("Please upload a valid Excel file first.");

        return;

    }

    statusPreview();

    createStudentCard(students[0]);

}


// ==========================================
// Create Student Card
// ==========================================

function createStudentCard(student) {

    const school = document.getElementById("schoolName").value;

    const address = document.getElementById("schoolAddress").value;

    const udise = document.getElementById("udise").value;

    const signature = document.getElementById("signature").files[0];

    const previewContainer =
        document.getElementById("previewContainer");

    const idCard =
        document.getElementById("idCard");

    previewContainer.style.display = "block";

    let signatureURL = "";

    if (signature) {

        signatureURL = URL.createObjectURL(signature);

    }

    idCard.innerHTML = `
    <div class="student-card">

    <div class="card-header">

        <div class="card-title">
            STUDENT IDENTITY CARD
        </div>

        <div class="school-name">
            ${school}
        </div>

        <div class="school-address">
            ${address}
        </div>

        <div class="udise">
            UDISE : ${udise}
        </div>

    </div>

    <div class="card-body">

        <div class="photo-box">

            PHOTO

        </div>

        <div class="student-details">

            <p>

                <strong>Name :</strong>
                ${student.studentName}

            </p>

            <p>

                <strong>Father :</strong>
                ${student.fatherName}

            </p>

            <p>

                <strong>Class :</strong>
                ${student.studentClass}

            </p>

            <p>

                <strong>Date of Birth :</strong>
                ${student.dob}

            </p>

        </div>

    </div>

    <div class="card-footer">

        <div class="signature-area">

            ${
                signatureURL
                ?
                `<img src="${signatureURL}" class="signature-image">`
                :
                ""
            }

            <div class="signature-text">

                Principal Signature

            </div>

        </div>

    </div>

</div>
`;

} // End of createStudentCard()


// ==========================================
// Show Preview
// ==========================================

function showPreview() {

    document.getElementById("previewContainer").style.display = "block";

}


// ==========================================
// Hide Preview
// ==========================================

function hidePreview() {

    document.getElementById("previewContainer").style.display = "none";

}


// ==========================================
// Clear Preview
// ==========================================

function clearPreview() {

    document.getElementById("idCard").innerHTML = "";

    hidePreview();

}


// ==========================================
// Refresh Preview
// ==========================================

function refreshPreview() {

    if (students.length === 0) {

        return;

    }

    createStudentCard(students[0]);

}


// ==========================================
// Auto Refresh
// ==========================================

document.getElementById("schoolName").addEventListener("input", refreshPreview);

document.getElementById("schoolAddress").addEventListener("input", refreshPreview);

document.getElementById("udise").addEventListener("input", refreshPreview);

document.getElementById("signature").addEventListener("change", refreshPreview);