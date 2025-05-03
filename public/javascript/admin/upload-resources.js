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

// async function uploadFile(file) {
//     const formData = new FormData();
//     formData.append("excelFile", file);

//     try {
//         const response = await fetch('/api/v1/post/upload-resources', {
//             method: "POST",
//             body: formData
//         });

//         const data = await response.json();
//         console.log(`uploadFile ==>> `, data)
//         alert(data.message);
//         // displayResult(data);
//         renderUploadedResources(data.values)
//     } catch (error) {
//         console.error("Error:", error);
//     }
// }



async function uploadFile(file) {
    const formData = new FormData();
    formData.append("excelFile", file);

    try {
        const response = await fetch('/api/v1/post/upload-resources', {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(`uploadFile ==>> `, data);

        // SweetAlert2 success popup
        Swal.fire({
            icon: 'success',
            title: 'Upload Complete',
            text: data.message,
            timer: 2000,
            showConfirmButton: false
        });

        // displayResult(data);
        renderUploadedResources(data.values);
    } catch (error) {
        console.error("Error:", error);

        // SweetAlert2 error popup
        Swal.fire({
            icon: 'error',
            title: 'Upload Failed',
            text: 'There was an error uploading the file.',
        });
    }
}





// function displayResult(data) {
//     document.getElementById("jsonOutput").textContent = JSON.stringify(data, null, 2);
// }


// function renderUploadedResources(data) {
//     const books = data.requests;
//     console.log(`renderUploadedResources books ==>>`, books);
//     console.log(`renderUploadedResources data ==>>`, data);
//     const table = getId("uploadedResourcesTable");

//     table.innerHTML = ``;

//     books.forEach(book => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${book.book_title}</td>
//             <td>${book.download_link}</td>
//             <td>${book.image_link}</td>
//         `;
//         table.appendChild(row);
//     });
// }



function renderUploadedResources(data) {
    console.log("renderUploadedResources data ==>>", data);
    const table = document.getElementById("uploadedResourcesTable");

    // Clear the existing table content
    table.innerHTML = ``;

    // Loop through the array of books
    data.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book[1]}</td>
            <td>${book[2]}</td>
            <td>${book[3]}</td>
        `;
        table.appendChild(row);
    });
}
