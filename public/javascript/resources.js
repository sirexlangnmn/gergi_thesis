document.addEventListener("DOMContentLoaded", () => {
    fetchFilteredResources();
});


let currentDepartmentId = null;
let currentCourseId = null;
let currentCategoryId = null;
let currentSubjectId = null;


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

        bookCard.innerHTML = `
            <div class="dz-shop-card style-1">
                <div class="dz-media">
                    <img src="${imageSrc}" alt="${book.title}">
                </div>
                <div class="bookmark-btn style-2">
                    <input class="form-check-input" type="checkbox" id="flexCheckDefault${index}">
                    <label class="form-check-label" for="flexCheckDefault${index}">
                        <i class="flaticon-heart"></i>
                    </label>
                </div>
                <div class="dz-content">
                    <h5 class="title"><a href="${book.url_link}">${book.title}</a></h5>
                    <ul class="dz-tags">
                      link
                    </ul>
                    <ul class="dz-rating">
                      ratings
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