
let debounceTimer;
const inputField = document.getElementById("searchKeyword");

inputField.addEventListener("keyup", (event) => {
    clearTimeout(debounceTimer);

    if (event.key === "Enter") {
        const container = document.getElementById("resourcesContainer");
        container.innerHTML = ""; // Clear previous content

        event.preventDefault();
        getInputValue();
    } else {
        debounceTimer = setTimeout(() => {
            const container = document.getElementById("resourcesContainer");
            container.innerHTML = ""; // Clear previous content
            getInputValue();
        }, 2000);
    }
});

function getInputValue() {
    const searchInput = inputField.value.trim();
    fetchResourcesBySearchKeyword(searchInput)
}

function fetchResourcesBySearchKeyword(searchInput) {
    fetch(`${baseUrl}api/get/resources-by-search-keyword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ searchInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(`fetchResourcesBySearchKeyword data.resources ==>> `, data.resources)
        renderResources(data.resources);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}