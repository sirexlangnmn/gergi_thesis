let breadcrumbPath = []; // Stores breadcrumb history

function handleBreadcrumbs(type, id, title) {
    // console.log("type ==>> ", type);
    // console.log("title ==>> ", title);
    const breadcrumbsContainer = document.getElementById("resourceSetupBreadcrumbs");

    // Add the new breadcrumb entry
    breadcrumbPath.push({ type, id, title });

    if (breadcrumbsContainer) {
        // Generate breadcrumb links dynamically
        let breadcrumbHTML = `<div class="tagcloud">`;

        breadcrumbPath.forEach((item, index) => {
            // console.log("item2 ==>> ", item);
            // console.log("index ==>> :", index);
            breadcrumbHTML += `
            <a href="javascript:void(0);">${item.title}</a> >
            <input type="text" name="${item.type}_input" id="${item.type}_input" class="breadcrumb-input" value="${item.id}" data-index="${index}" hidden >
            `;
        });

        // Remove trailing '>'
        breadcrumbHTML = breadcrumbHTML.replace(/>$/, "");

        breadcrumbHTML += `</div>`;

        // Update the breadcrumbs container
        breadcrumbsContainer.innerHTML = breadcrumbHTML;
    }
}

// // Function to reset breadcrumbs back to 'Home'
// function resetBreadcrumbs() {
//     breadcrumbPath = []; // Clear the breadcrumb path
//     handleBreadcrumbs(); // Re-render with only 'Home'
// }

// // Function to remove a breadcrumb from a specific index
// function removeBreadcrumb(index) {
//     breadcrumbPath = breadcrumbPath.slice(0, index + 1); // Keep only the clicked path and previous ones
//     handleBreadcrumbs(); // Re-render breadcrumbs
// }












function renderSearchContainer() {
    const searchContainer = getId("searchContainer");

    const searchContainerHtml = `<div class="col-lg-12 col-md-12">
        <div class="mb-3">
            <form action="javascript:void(0);" accept-charset="utf-8">
            <label for="exampleFormControlTextarea" class="form-label">Search:</label>
            <input type="text" class="form-control" id="searchKeyword" placeholder="Keyword">
            </form>
        </div>
    </div>`

    searchContainer.insertAdjacentHTML("beforeend", searchContainerHtml);
}

function getResourcesOrderByLatest() {
    // console.log("getDepartmentsByOrganization orgId  ==>> ", orgId);
    // console.log("getDepartmentsByOrganization imageUrl  ==>> ", imageUrl);
    // console.log("getDepartmentsByOrganization orgTitle  ==>> ", orgTitle);

    fetch(`${baseUrl}api/v1/get/resources-orde-by-random-with-limit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("getResourcesOrderByLatest data received:", data);
        renderResources(data);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderResources(data) {
    console.log('renderResources data ==> ', data)

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const categoriesContainer = getId("categoriesContainer");
    const subjectsContainer = getId("subjectsContainer");
    const resourcesContainer = getId("resourcesContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";
    categoriesContainer.style.display = "none";
    subjectsContainer.style.display = "none";
    resourcesContainer.style.display = "display";

    // const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";



    data.forEach(book => {
        const imageSrc = getImageSrc(book.image);
        console.log(`imageSrc rex =>> `, imageSrc)



        const bookCard = document.createElement("div");
        bookCard.className = "col-md-12 col-sm-12";

        bookCard.innerHTML = `
            <div class="dz-shop-card style-2">
                <div class="dz-media">
                    <img src="${imageSrc}" alt="">
                </div>
                <div class="dz-content">
                    <div>
                        <li><a href="${book.url_link}" target="_blank" class="download-link">${book.url_link}</a></li>
                    </div>
                    <div class="dz-header">
                        <div>
                            <h4 class="title mb-0">
                                <a href="${book.url_link}" target="_blank" class="book-name">${book.title}</a>
                            </h4>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="rate" style="justify-content: none">
                            <div class="d-flex">
                                <a href="#" class="btn btn-secondary btnhover btnhover2 save-btn">
                                    <i class="flaticon-send m-r10"></i> Save
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

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
        console.log('Image not found, using fallback');
        return `${filePath}${fallbackImage}`;  // Return fallback image path
    } else {
        console.log('Image exists:', `${filePath}${image}`);
        return `${filePath}${image}`;  // Return the original image path
    }
}



