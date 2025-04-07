document.addEventListener("DOMContentLoaded", () => {
    // displayResources();
    fetchResources();
    showingXfromYdata();
});


async function displayResources() {
    // console.log(`be sessionName ==>> `, sessionName);
    // console.log(`be sessionEmail ==>> `, sessionEmail);
    // console.log(`be sessionUserType ==>> `, sessionUserType);
    // console.log(`be sessionOrganizationId ==>> `, sessionOrganizationId);


    try {
        const response = await fetch(`${baseUrl}api/v1/get/resources-by-organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionOrganizationId })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('data1 ==> ', data)
        return data;
    } catch (error) {
        console.error('Error fetching resources : ', error);
        throw error;
    }
}

displayResources().then((data) => {
    renderData(data);
})
.catch((error) => {
    console.error('Error rendering resource : ', error);
});


function renderData(data) {
    console.log('data2 ==> ', data)
    const resourcesContainer = getId("resourcesContainer");
    resourcesContainer.innerHTML = '';

    // const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    let index = 0;

    data.forEach(book => {
        const imageSrc = getImageSrc(book.image);
        console.log(`imageSrc rex =>> `, imageSrc)

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
        index ++;
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