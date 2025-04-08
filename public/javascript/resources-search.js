let debounceTimeout;
let searchedCurrentPage = 1;
const searchedLimit = 12;

const input = document.getElementById("searchKeyword");

input.addEventListener("input", function () {
    console.log('debounceTimeout input')
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const keyword = input.value.trim();
        if (keyword) {
            searchedCurrentPage = 1;
            fetchSearchResults(keyword, searchedCurrentPage);
        }
    }, 3000);
});

input.addEventListener("keypress", function (e) {
    console.log('keypress enter')
    if (e.key === "Enter") {
        e.preventDefault();
        clearTimeout(debounceTimeout);
        const keyword = input.value.trim();
        if (keyword) {
            searchedCurrentPage = 1;
            fetchSearchResults(keyword, searchedCurrentPage);
        }
    }
});

// Add pagination button listeners
function goToPage(page) {
    const keyword = input.value.trim();
    searchedCurrentPage = page;
    fetchSearchResults(keyword, page);
}

function fetchSearchResults(keyword, page = 1) {

    const bodyData = {
        sessionOrganizationId: sessionOrganizationId,
        searchKeyword: keyword,
        page: page,
        limit: searchedLimit
    };

    console.log(`fetchSearchResults bodyData ==>> `, bodyData);

    fetch(`${baseUrl}api/v1/get/resources-by-organization-with-pagination-and-search-keyword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
    })
    .then(res => res.json())
    .then(({ data, total }) => {
        renderData(data); // your UI logic
        updatePaginationUI(total, page);
    })
    .catch(err => console.error("Search error:", err));
}

function updatePaginationUI(total, page) {
    if (total && page) {
        const totalPages = Math.ceil(total / searchedLimit);
        // render buttons: Prev, 1, 2, 3, Next based on `totalPages` and `page`
        // for example:
        console.log(`Page ${page} of ${totalPages}`);
    }
}

fetchSearchResults("", 1);