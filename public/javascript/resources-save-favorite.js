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
        alert(`Successfully sent bookId: ${bookId}`);
        console.log('Successfully sent bookId:', bookId, data);
    })
    .catch(error => {
        console.error('Error sending bookId:', error);
    });
}
