document.addEventListener("DOMContentLoaded", () => {
    // fetchBiblioboardApiData('Business Manager');
});


async function fetchBiblioboardApiData(searchKeyword) {
    const encoded = encodeURIComponent(searchKeyword);
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
                "X-Auth-Token": "6d506236-4324-4eb5-aee3-63f87e25aaa0", // it expires, just get new token to the main website
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
                    <img src="${book.thumbnailUrl}" alt="${book.name}">
                </div>
                <div class="dz-content">
                    <div class="dz-header">
                        <div>
                            <h4 class="title mb-0"><a href="${publicUrl}">${book.name}</a></h4>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="rate" style="justify-content: none">
                            <div class="d-flex">
                                <a href="shop-cart.html" class="btn btn-secondary btnhover btnhover2">
                                    <i class="flaticon-shopping-cart-1 m-r10"></i> Save
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(bookElement);
    });
}


let debounceTimer;
const inputField = document.getElementById("searchKeyword");

inputField.addEventListener("keyup", (event) => {
    clearTimeout(debounceTimer);
    
    if (event.key === "Enter") {
        event.preventDefault();
        getInputValue();
    } else {
        debounceTimer = setTimeout(() => {
            getInputValue();
        }, 2000);
    }
});

function getInputValue() {
    const inputValue = inputField.value.trim();
    console.log("Input Value:", inputValue);
    fetchBiblioboardApiData(inputValue);
}
