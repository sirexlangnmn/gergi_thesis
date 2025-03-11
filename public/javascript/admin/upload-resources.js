document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("uploadExcel");

    fileInput.addEventListener("change", handleFileUpload);
});

function handleFileUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!isValidFileType(file)) {
        alert("Invalid file type! Please upload an Excel file (.xlsx, .xls)");
        return;
    }

    uploadFile(file);
}

function isValidFileType(file) {
    const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel"
    ];
    return allowedTypes.includes(file.type);
}

async function uploadFile(file) {
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
        const response = await fetch('/api/v1/post/upload-resources', {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        displayResult(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayResult(data) {
    document.getElementById("jsonOutput").textContent = JSON.stringify(data, null, 2);
}
