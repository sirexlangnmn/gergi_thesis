let debounceTimeout;
let searchedCurrentPage = 1;

(sessionUserType == 1) ? fetchAdminSavedFavoriteResources(searchedCurrentPage) : fetchUserSavedFavoriteResources(searchedCurrentPage);

const input = getId("searchKeyword");

input.addEventListener("input", function () {
    console.log('debounceTimeout input')
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const keyword = input.value.trim();
        if (keyword) {
            searchedCurrentPage = 1;
            (sessionUserType == 1) ? fetchAdminSavedFavoriteResources(searchedCurrentPage) : fetchUserSavedFavoriteResources(searchedCurrentPage);
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
            (sessionUserType == 1) ? fetchAdminSavedFavoriteResources(searchedCurrentPage) : fetchUserSavedFavoriteResources(searchedCurrentPage);
        } else {
            getId("searchKeyword").value = "";
        }
    }
});


input.addEventListener("keyup", function (e) {
    const keyword = input.value.trim();
    if (!keyword) {
        getId("searchKeyword").value = "";
        (sessionUserType == 1) ? fetchAdminSavedFavoriteResources(searchedCurrentPage) : fetchUserSavedFavoriteResources(searchedCurrentPage);
    }
});



async function fetchUserSavedFavoriteResources(page = 1) {
    const searchKeyword = getId("searchKeyword").value.trim();
    const limit = 10;

    const filters = {
        searchKeyword,
        sessionUserId,
        page,
        limit
    };

    console.log(`fetchUserSavedFavoriteResources filters ==>> `, filters)

    try {
        const response = await fetch(`${baseUrl}api/v1/get/user-saved-favorite-resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });

        if (!response.ok) throw new Error('Failed to fetch resources');

        const result = await response.json();
        console.log('fetchUserSavedFavoriteResources result ==>> ', result);

        currentPage = page;
        renderData(result);
        showingXfromYdata(result);

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}



async function fetchAdminSavedFavoriteResources(page = 1) {
    const searchKeyword = getId("searchKeyword").value.trim();
    const limit = 10;

    const filters = {
        searchKeyword,
        page,
        limit
    };

    console.log(`fetchAdminSavedFavoriteResources filters ==>> `, filters)

    try {
        const response = await fetch(`${baseUrl}api/v1/get/all-saved-favorite-resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        });

        if (!response.ok) throw new Error('Failed to fetch resources');

        const result = await response.json();
        console.log('fetchAdminSavedFavoriteResources result ==>> ', result);

        currentPage = page;
        renderData(result);
        showingXfromYdata(result);

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}


function renderData(data) {
    const resources = data.resources;
    const message = data.message;
    const resourcesContainer = getId("resourcesContainer");
    resourcesContainer.innerHTML = '';

    if (!resources || resources.length === 0) {
        const noDataMessage = document.createElement("div");
        noDataMessage.className = "no-resources-message text-center py-4";
        noDataMessage.innerHTML = `
            <h4>${message}.</h4>
        `;
        resourcesContainer.appendChild(noDataMessage);
        return;
    }

    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    let index = 0;

    resources.forEach(book => {
        const imageSrc = getImageSrc(book.image);

        const bookCard = document.createElement("div");
        bookCard.className = "col-book style-2";

        const checkboxId = `flexCheckDefault${book.id}`;

        bookCard.innerHTML = `
            <div class="dz-shop-card style-1">
                <div class="dz-media">
                    <img src="${imageSrc}" alt="${book.title}">
                </div>
                <div class="bookmark-btn style-2">
                    <input class="form-check-input" type="checkbox" id="${checkboxId}">
                    <label class="form-check-label" for="${checkboxId}" style="background-color: #FF1E6F; color: #ffffff; border-color: #FF1E6F;" >
                        <i class="flaticon-heart" style=""></i>
                    </label>
                </div>
                <div class="dz-content">
                    <h5 class="title"><a href="${book.url_link}">${book.title}</a></h5>
                    <ul class="dz-tags">

                    </ul>
                    <ul class="dz-rating">

                    </ul>
                    <div class="book-footer">
                        <div class="price">
                        </div>
                        <a href="${book.url_link}" target="_blank" class="btn btn-secondary box-btn btnhover btnhover2">
                            <i class="flaticon-send m-r10"></i> Download
                        </a>
                    </div>
                </div>
            </div>
        `;
        index++;
        resourcesContainer.appendChild(bookCard);

        // handleSaveAsFavoriteBtn(checkboxId);

    });
}


function getImageSrc(image) {
    const filePath = `${baseUrl}uploads/gergi/resources_image/`;
    const fallbackImage = 'CoverNotAvailable.jpg';

    // Function to check if image exists using XMLHttpRequest
    function checkImageExists(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);  // false makes it synchronous
        xhr.send();

        if (xhr.status >= 200 && xhr.status < 300) {
            return true;  // Image exists
        } else {
            return false;  // Image does not exist
        }
    }

    // Check if the image exists and return the appropriate image URL
    const exists = checkImageExists(`${filePath}${image}`);
    if (!exists) {
        return `${filePath}${fallbackImage}`;  // Return fallback image path
    } else {
        return `${filePath}${image}`;  // Return the original image path
    }
}

function showingXfromYdata(data) {
    getId("showingXfromYdata").innerText = `Showing ${data.currentPage} from total of ${data.totalPages} pages. Total of ${data.total} reseources. `;
}