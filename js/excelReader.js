/*
==========================================
SSIDG - Smart Student ID Card Generator
Version : 1.0

File : excelReader.js

Purpose :
Reads and validates Student Excel File

Author :
Saurabh Sahai
==========================================
*/

// ==========================================
// Global Variables
// ==========================================

let students = [];
let workbook = null;
let worksheet = null;


// ==========================================
// Read Excel File
// ==========================================

function readExcel(file) {

    if (!file) {

        statusError("Please select an Excel file.");

        return;

    }

    statusReading();

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const data = new Uint8Array(e.target.result);

            workbook = XLSX.read(data, {
                type: "array"
            });

            worksheet = workbook.Sheets[
                workbook.SheetNames[0]
            ];

            const jsonData = XLSX.utils.sheet_to_json(
                worksheet,
                {
                    defval: ""
                }
            );

            if (jsonData.length === 0) {

                statusError("Excel file is empty.");

                return;

            }

            validateExcel(jsonData, file.name);

        }

        catch (error) {

            console.error(error);

            statusError("Invalid Excel file.");

            alert("Unable to read the Excel file.");

        }

    };

    reader.readAsArrayBuffer(file);

}
// ==========================================
// Validate Excel Template
// ==========================================

function validateExcel(jsonData, fileName) {

    const requiredColumns = [
        "SR No.",
        "Student Name",
        "Father's Name",
        "Class",
        "Date of Birth"
    ];

    const headers = Object.keys(jsonData[0]);

    // Check required columns

    for (let i = 0; i < requiredColumns.length; i++) {

        if (!headers.includes(requiredColumns[i])) {

            statusError("Invalid Excel Template");

            alert(
                "Missing Column : " +
                requiredColumns[i]
            );

            return;

        }

    }

    // Clear previous data

    students = [];

    // Store students

    jsonData.forEach(function (row) {

        students.push({

            srNo: row["SR No."],

            studentName: row["Student Name"],

            fatherName: row["Father's Name"],

            studentClass: row["Class"],

            dob: row["Date of Birth"]

        });

    });

    // Update Summary

    document.getElementById("summaryBox").style.display = "block";

    document.getElementById("fileName").innerHTML = fileName;

    document.getElementById("totalStudents").innerHTML =
        students.length;

    // Enable Buttons

    document.getElementById("previewBtn").style.display =
        "inline-block";

    document.getElementById("printBtn").style.display =
        "inline-block";

    statusSuccess();

}
// ==========================================
// Remove Empty Records
// ==========================================

function removeEmptyStudents() {

    students = students.filter(function(student){

        return (
            String(student.studentName).trim() !== "" &&
            String(student.fatherName).trim() !== "" &&
            String(student.studentClass).trim() !== ""
        );

    });

}


// ==========================================
// Check Duplicate SR No.
// ==========================================

function hasDuplicateSRNo() {

    const srSet = new Set();

    for (let student of students) {

        const sr = String(student.srNo).trim();

        if (srSet.has(sr)) {

            return true;

        }

        srSet.add(sr);

    }

    return false;

}


// ==========================================
// Format Date
// ==========================================

function formatDOB(value) {

    if (value === undefined || value === null || value === "") {

        return "";

    }

    // If already text, keep it

    if (typeof value === "string") {

        return value;

    }

    // Excel Date Number

    if (typeof value === "number") {

        const date = XLSX.SSF.parse_date_code(value);

        if (!date) return "";

        const dd = String(date.d).padStart(2, "0");
        const mm = String(date.m).padStart(2, "0");
        const yyyy = date.y;

        return `${dd}-${mm}-${yyyy}`;

    }

    return value;

}


// ==========================================
// Prepare Student Data
// ==========================================

function prepareStudents() {

    removeEmptyStudents();

    students.forEach(function(student){

        student.dob = formatDOB(student.dob);

    });

    if (hasDuplicateSRNo()) {

        alert("Duplicate SR No. found in Excel.");

        statusError("Duplicate SR No.");

        return false;

    }

    return true;

}


// ==========================================
// Final Processing
// ==========================================

(function(){

    const oldValidate = validateExcel;

    validateExcel = function(jsonData,fileName){

        oldValidate(jsonData,fileName);

        if(students.length===0){

            return;

        }

        if(!prepareStudents()){

            return;

        }

        statusSuccess();

        console.log("Students Loaded :",students);

    };

})();