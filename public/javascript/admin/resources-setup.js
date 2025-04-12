function getResourcesOrderByLatest() {
    // console.log("getDepartmentsByOrganization orgId  ==>> ", orgId);
    // console.log("getDepartmentsByOrganization imageUrl  ==>> ", imageUrl);
    // console.log("getDepartmentsByOrganization orgTitle  ==>> ", orgTitle);

    fetch(`${baseUrl}api/v1/get/resources-order-by-random-with-limit`, {
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
                                <p class="book-id hidden">${book.resource_id}</p>
                                <a href="${book.url_link}" target="_blank" class="book-name">${book.title}</a>
                            </h4>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="rate" style="justify-content: none">
                            <div class="d-flex">
                                <a href="#" class="btn btn-secondary btnhover btnhover2 save-btn" onclick="handleSaveButton('${book.resource_id}')">
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


function handleSaveButton(bookId) {
    let departmentInput = getId('department_input').value;
    let courseInput = getId('course_input').value;
    let categoryInput = getId('category_input').value;
    let subjectInput = getId('subject_input').value;

    const bookData = {
        bookId,
        subjectInput,
        categoryInput,
        courseInput,
        departmentInput,
    };

        console.log("handleSaveButton bookData ==>>", bookData);

        // Send the data to your API
        sendBookDataToAPI(bookData);
}


// Function to send `bookData` via POST request
function sendBookDataToAPI(bookData) {
    fetch(`${baseUrl}api/post/resource-setup`, {  // Replace with your actual API endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData) // Convert object to JSON format
    })
    .then(response => response.json())
    .then(data => {
        console.log("Response from API:", data);
        alert("Book saved successfully!"); // Show success message
    })
    .catch(error => {
        console.error("Error sending data:", error);
        alert("Failed to save book.");
    });
}


function chooseLabel(label) {
    getId('chooseLabel').innerHTML= label;
}