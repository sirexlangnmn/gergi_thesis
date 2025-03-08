document.addEventListener("DOMContentLoaded", () => {
    // fetchBiblioboardApiData('Business Manager');
});


async function fetchBiblioboardApiData(searchKeyword) {
    const encoded = encodeURIComponent(searchKeyword);
    const url = `https://api.biblioboard.com/search/v2?facet-list=true&limit=20&org-id=1f7368e7-f10b-49a1-8ced-2d9476279974&platform=WEB&offset=0&g=${encoded}`;
    const publicUrl = `https://openresearchlibrary.org/search-results/g%3D${encoded}`;

    console.log('fetchBiblioboardApiData searchKeyword => ', searchKeyword)
    console.log('fetchBiblioboardApiData encoded => ', encoded)
    console.log('fetchBiblioboardApiData url => ', url)

    const OPENRESEARCHLIBRARY_ORG_X_AUTH_TOKEN = 'e4140dd5-8aca-4d26-b77a-11447178ce5b';

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
                "X-Auth-Token": OPENRESEARCHLIBRARY_ORG_X_AUTH_TOKEN, // it expires, just get new token to the main website https://openresearchlibrary.org/search-results/g%3Dsoftware%2520engineer
                "X-Biblio-Audience": "library.biblioboard.com",
                "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Brave\";v=\"133\", \"Chromium\";v=\"133\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            },
            body: null
        });

        if (!response.ok) {
            throw new Error(`fetchBiblioboardApiData HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('fetchBiblioboardApiData fetchApiData data => ', data.media)
        generateSearchedData(data.media, publicUrl)
        // return data;
    } catch (error) {
        console.error("fetchBiblioboardApiData Error fetching API data:", error);
    }
}

async function fetchOpenTextBooksApiData(searchKeyword) {
    const encoded = encodeURIComponent(searchKeyword);
    const url = `https://open.umn.edu/opentextbooks/textbooks?q=${encoded}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const htmlText = await response.text();
        console.log("htmlText:", htmlText);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");

        // Find all book entries
        const books = [];
        const bookElements = doc.querySelectorAll("div.col-sm-9.info"); // Get all book containers

        bookElements.forEach(book => {
            const bookLinkElement = book.querySelector("h2 a");
            const bookTitle = bookLinkElement ? bookLinkElement.textContent.trim() : null;
            const bookLink = bookLinkElement ? bookLinkElement.href : null;

            const imageElement = book.closest("div.row").querySelector("a img.cover"); // Find the image relative to the book
            const imageUrl = imageElement ? imageElement.src : null;

            books.push({ name: bookTitle, attribution: `https://open.umn.edu/${bookLink}`, thumbnailUrl: imageUrl });
        });

        console.log("Extracted Books:", books);
        generateSearchedData(books, url)

    } catch (error) {
        console.error("Error:", error);
    }
}





function generateSearchedData(books, publicUrl) {
    console.log('fetchApiData books => ', books)
    const container = document.getElementById("searchedData");
    // container.innerHTML = ""; // Clear previous content

    books.forEach((book, index) => {
        const downloadLink = book.attribution ? book.attribution : publicUrl;
        const bookElement = document.createElement("div");
        bookElement.className = "col-md-12 col-sm-12";
        bookElement.innerHTML = `
            <div class="dz-shop-card style-2">
                <div class="dz-media">
                    <img src="${book.thumbnailUrl}" alt="${book.name}">
                </div>
                <div class="dz-content">
                    <div>
                        <li><a href="${downloadLink}" target="_blank" >${downloadLink}</a></li>
                    </div>
                    <div class="dz-header">
                        <div>
                            <h4 class="title mb-0"><a href="${downloadLink}" target="_blank" >${book.name}</a></h4>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="rate" style="justify-content: none">
                            <div class="d-flex">
                                <a href="shop-cart.html" class="btn btn-secondary btnhover btnhover2">
                                    <i class="flaticon-send m-r10"></i> Save
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

    const container = document.getElementById("searchedData");
    container.innerHTML = ""; // Clear previous content

    fetchBiblioboardApiData(inputValue);
    fetchOpenTextBooksApiData(inputValue);
}
