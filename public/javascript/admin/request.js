document.addEventListener("DOMContentLoaded", loadRequestedBooks);


function loadRequestedBooks() {
    fetchRequestedBooks().then(renderRequestedBooks);
}


const modalAddRequest = getId("modalAddRequest");
const modalRequestBookBtn = getId("modalRequestBookBtn");

if (modalAddRequest) {
    modalAddRequest.addEventListener("click", handleModalAddRequestClick);
}

if (modalRequestBookBtn) {
    modalRequestBookBtn.addEventListener("click", submitBookRequest);
}

async function handleModalAddRequestClick(event) {
    modal.style.display = "block";
    console.log(`modal requestjs here`)
}


function submitBookRequest() {
    const bookTitle = getId("modalBookTitle").value.trim();
    const author = getId("modalAuthor").value.trim();
    const isbn = getId("modalISBN").value.trim();
    const instructions = getId("modalAdditionalInstructions").value.trim();

    const requestData = {
        sessionUserId,
        bookTitle,
        author,
        isbn,
        instructions
    };

    fetch(`${baseUrl}api/v1/post/request-book`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to submit book request");
        }
        return response.json();
    })
    .then(data => {
        console.log(`submitBookRequest data ==>>`, data);
        alert(data.message);
        // Optional: Reset the form
        document.getElementById("modalRequestBook").reset();
        modal.style.display = "none";
        prependRequestedBook(data.added);
    })
    .catch(error => {
        console.error("Error submitting book request:", error);
        alert("There was an error submitting your request. Please try again.");
    });
}



// function fetchRequestedBooks() {
//     return fetch(`${baseUrl}api/v1/get/requested-books`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Failed to fetch requested books");
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.error("Error fetching requested books:", error);
//             return []; // return empty array on error to avoid breaking rendering
//         });
// }


function fetchRequestedBooks() {
    return fetch(`${baseUrl}api/v1/get/all-requested-books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch requested books");
        }
        // console.log(`fetchRequestedBooks response.json() ==>>`, response.json());
        return response.json();
    })
    .catch(error => {
        console.error("Error fetching requested books:", error);
        return []; // return empty array on error to avoid breaking rendering
    });
}



function renderRequestedBooks(data) {
    const books = data.requests;
    console.log(`renderRequestedBooks books ==>>`, books);
    console.log(`renderRequestedBooks data ==>>`, data);
    const requestTable = getId("requestTable");

    // Optional: Reset the table (except header)
    requestTable.innerHTML = ``;

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.book_title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.instructions}</td>
        `;
        requestTable.appendChild(row);
    });
}


// function prependRequestedBook(book) {
//     console.log(`prependRequestedBook book ==>>`, book);
//     const requestTable = document.getElementById("requestTable");

//     const row = document.createElement("tr");
//     row.innerHTML = `
//         <td>${book.book_title}</td>
//         <td>${book.author}</td>
//         <td>${book.isbn}</td>
//         <td>${book.instructions}</td>
//     `;

//     // Insert the new row right after the header
//     const headerRow = requestTable.querySelector("tr");
//     if (headerRow && headerRow.nextSibling) {
//         requestTable.insertBefore(row, headerRow.nextSibling);
//     } else {
//         requestTable.appendChild(row); // fallback if no header
//     }
// }



function prependRequestedBook(book) {
    console.log("prependRequestedBook book ==>>", book);
    const requestTable = document.getElementById("requestTable");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.book_title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td>${book.instructions}</td>
    `;

    // Insert the new row at the very top of the tbody
    requestTable.insertBefore(row, requestTable.firstChild);
}

