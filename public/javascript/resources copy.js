document.addEventListener("DOMContentLoaded", () => {
    displayResources();

});


async function displayResources() {
    // const course = convertToTitleCase(courseValue);
    const course = "Optometry";
    try {
        const response = await fetch(`${baseUrl}api/get/resources-by-course`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course })
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
    console.log('data2 ==> ', data)
    const resourcesContainer = getId("resourcesContainer");

    const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    let index = 0;
    data.forEach(book => {
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
                    <h5 class="title"><a href="${book.link}">${book.title}</a></h5>
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
                            <i class="flaticon-shopping-cart-1 m-r10"></i> Download
                        </a>
                    </div>
                </div>
            </div>
        `;
        index ++;
        resourcesContainer.appendChild(bookCard);
    });
})
.catch((error) => {
    console.error('Error rendering resource : ', error);
});
