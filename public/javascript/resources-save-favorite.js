function handleSaveAsFavoriteBtn(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.addEventListener("change", () => {
            const fullId = checkbox.id;
            const prefix = "flexCheckDefault";
            const bookId = fullId.replace(prefix, "");

            saveResources(bookId)
        });
    }
}


// function saveResources(bookId) {
//     fetch(`${baseUrl}api/v1/post/save-as-favorites`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ bookId, sessionUserId })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to send bookId');
//         }
//         return response.json();
//     })
//     .then(data => {
//         alert(`Successfully sent bookId: ${bookId}`);
//         console.log('Successfully sent bookId:', bookId, data);
//     })
//     .catch(error => {
//         console.error('Error sending bookId:', error);
//     });
// }


// function saveResources(bookId) {
//     fetch(`${baseUrl}api/v1/post/save-as-favorites`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ bookId, sessionUserId })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to send bookId');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.message === 'Resource already saved as favorite') {
//             alert(`Book ID ${bookId} is already saved as favorite.`);
//         } else if (data.message === 'Resource save successful') {
//             alert(`Successfully saved Book ID: ${bookId}`);
//         } else {
//             alert(`Unexpected response: ${data.message}`);
//         }

//         console.log('API Response:', data);
//     })
//     .catch(error => {
//         console.error('Error sending bookId:', error);
//         alert('An error occurred while saving the resource.');
//     });
// }



function saveResources(bookId) {
    fetch(`${baseUrl}api/v1/post/save-as-favorites`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId, sessionUserId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send bookId');
        }
        return response.json();
    })
    .then(data => {
        if (data.message === 'Resource already saved as favorite') {
            Swal.fire({
                icon: 'info',
                title: 'Already Saved',
                text: `Book ID ${bookId} is already saved as favorite.`,
            });
        } else if (data.message === 'Resource save successful') {
            Swal.fire({
                icon: 'success',
                title: 'Saved Successfully',
                text: `Successfully saved Book ID: ${bookId}`,
                timer: 2000,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Unexpected Response',
                text: data.message || 'Unexpected response from server',
            });
        }

        console.log('API Response:', data);
    })
    .catch(error => {
        console.error('Error sending bookId:', error);
        Swal.fire({
            icon: 'error',
            title: 'Save Failed',
            text: 'An error occurred while saving the resource.',
        });
    });
}
