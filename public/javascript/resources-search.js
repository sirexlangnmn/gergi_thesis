let debounceTimeout;
let searchedCurrentPage = 1;
const searchedLimit = 12;

const input = getId("searchKeyword");

input.addEventListener("input", function () {
    console.log('debounceTimeout input')
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const keyword = input.value.trim();
        if (keyword) {
            searchedCurrentPage = 1;
            fetchFilteredResources(searchedCurrentPage);
        } else {
            getId("searchKeyword").value = "";
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
            fetchFilteredResources(searchedCurrentPage)
        } else {
            getId("searchKeyword").value = "";
        }
    }
});


input.addEventListener("keyup", function (e) {
    const keyword = input.value.trim();
    if (!keyword) {
        getId("searchKeyword").value = "";
        fetchFilteredResources(searchedCurrentPage)
    }
});



async function fetchFilteredResources(page = 1) {
    const searchKeyword = getId("searchKeyword").value.trim();

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

        currentPage = page;
        renderData(result);
        showingXfromYdata(result);

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


function removeValue(groupName) {
    const radios = document.getElementsByName(groupName);
    for (let radio of radios) {
        if (radio.checked) return '';
    }
}
