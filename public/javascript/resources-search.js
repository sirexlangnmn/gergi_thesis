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
            fetchFilteredResources(1);
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

async function fetchSearchResults(keyword, page = 1) {

    const bodyData = {
        sessionOrganizationId: sessionOrganizationId,
        searchKeyword: keyword,
        page: page,
        limit: searchedLimit
    };

    // try {
    //     const response = await fetch(`${baseUrl}api/v1/get/resources-by-organization-with-pagination-and-search-keyword`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(bodyData)
    //     });

    //     if (!response.ok) throw new Error('Failed to fetch resources');

    //     const result = await response.json();
    //     // console.log('Fetched resources:', result);

    //     renderData(result);
    //     updatePaginationUI(result.total, page);

    // } catch (error) {
    //     console.error('Error fetching resources:', error);
    // }
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





async function fetchFilteredResources(page = 1) {
    const searchKeyword = document.getElementById("searchKeyword").value.trim();

    const departmentId = getCheckedValue("departmentRadioGroup");
    const courseId = getCheckedValue("courseRadioGroup");
    const categoryId = ''
    const subjectId = ''
    const limit = 10;

    const filters = {
        searchKeyword,
        departmentId,
        courseId,
        categoryId,
        subjectId,
        page,
        limit
    };

    console.log(`fetchFilteredResources filters ==>> `, filters)

    try {
        const response = await fetch(`${baseUrl}api/v1/get/fetch-filtered-resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });

        if (!response.ok) throw new Error('Failed to fetch resources');

        const result = await response.json();
        console.log('fetchFilteredResources result ==>> ', result);

        renderData(result);
        // updatePaginationUI(result.total, page);

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}



function getCheckedValue(groupName) {
    const radios = document.getElementsByName(groupName);
    for (let radio of radios) {
        if (radio.checked) return radio.value;
    }
    return '';
}
