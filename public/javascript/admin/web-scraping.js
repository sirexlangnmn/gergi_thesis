document.addEventListener("DOMContentLoaded", () => {
    fetchBiblioboardApiData('Business Manager');
});


async function fetchBiblioboardApiData(searchKeyword) {
    const encoded = encodeURIComponent(searchKeyword);
    // const url = "https://api.biblioboard.com/search/v2?facet-list=true&limit=20&org-id=1f7368e7-f10b-49a1-8ced-2d9476279974&platform=WEB&offset=0&g=software+engineer";
    const url = `https://api.biblioboard.com/search/v2?facet-list=true&limit=20&org-id=1f7368e7-f10b-49a1-8ced-2d9476279974&platform=WEB&offset=0&g=${encoded}`;
    const publicUrl = `https://openresearchlibrary.org/search-results/g%3D${encoded}`;
    console.log('searchKeyword => ', searchKeyword)
    console.log('encoded => ', encoded)
    console.log('url => ', url)
    console.log('publicUrl => ', publicUrl)

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Language": "en-US,en;q=0.6",
                "Connection": "keep-alive",
                "Origin": "https://openresearchlibrary.org",
                "Referer": "https://openresearchlibrary.org/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "cross-site",
                "Sec-GPC": "1",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
                "X-Auth-Token": "665cc804-989e-4f10-a69a-a88828f7fca2",
                "X-Biblio-Audience": "library.biblioboard.com",
                "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Brave\";v=\"133\", \"Chromium\";v=\"133\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            },
            body: null
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('fetchApiData data => ', data.media)
        generateSearchedData(data.media, publicUrl)
        // return data;
    } catch (error) {
        console.error("Error fetching API data:", error);
    }
}


function generateSearchedData(books, publicUrl) {
    console.log('fetchApiData books => ', books)
    const container = document.getElementById("searchedData");
    container.innerHTML = ""; // Clear previous content

    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.className = "col-md-12 col-sm-12";
        bookElement.innerHTML = `
            <div class="dz-shop-card style-2">
                <div class="dz-media">
                    <img src="${book.image}" alt="${book.title}">
                </div>
                <div class="dz-content">
                    <div class="dz-header">
                        <div>
                            <ul class="dz-tags">
                                dasdsa
                            </ul>
                            <h4 class="title mb-0"><a href="${publicUrl}">${book.name}</a></h4>
                        </div>
                        <div class="price">
                            <span class="price-num text-primary">dasdsadsadsa</span>
                            <del>dasdsadsa</del>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="dz-rating-box">
                            <div>
                                <p class="dz-para">dasdsadsadsa</p>
                                <div>
                                  fdsfdsfsdfdsfdsfsdfdsfsfs
                                </div>
                            </div>
                            <div class="review-num">
                                <h4>fsdfdsfdsfdsfs</h4>
                                <ul class="dz-rating">
                                   fdsfdsfdsfsdfdsfds
                                </ul>
                                <span><a href="javascript:void(0);"> Reviews</a></span>
                            </div>
                        </div>
                        <div class="rate">
                            <ul class="book-info">
                                <li><span>Writen by</span>dasdasdsa</li>
                                <li><span>Publisher</span> dasdassa</li>
                                <li><span>Year</span> dasdasdsa</li>
                            </ul>
                            <div class="d-flex">
                                <a href="shop-cart.html" class="btn btn-secondary btnhover btnhover2">
                                    <i class="flaticon-shopping-cart-1 m-r10"></i> Add to cart
                                </a>
                                <div class="bookmark-btn style-1">
                                    <input class="form-check-input" type="checkbox" id="flexCheckDefault">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        <i class="flaticon-heart"></i>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bookElement);
    });
}

