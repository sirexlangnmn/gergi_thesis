
const limit = 12; // Items per page
let currentPage = 1;

function fetchResources(page = 1) {
    const data = {
        sessionOrganizationId: '1', // Or get it dynamically
        page: page,
        limit: limit
    };

    fetch(`${baseUrl}api/v1/get/resources-by-organization-with-pagination`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Fetched data:', data);
        currentPage = page;
        updatePaginationUI(); // optional: highlight current page
        renderData(data);     // display data in the DOM
    })
    .catch(err => console.error('Fetch error:', err));
}

function updatePaginationUI() {
    const links = document.querySelectorAll('.pagination .page-link');
    links.forEach(link => link.classList.remove('active'));

    links.forEach(link => {
        if (parseInt(link.innerText) === currentPage) {
            link.classList.add('active');
        }
    });
}

document.querySelectorAll('.pagination .page-link').forEach(link => {
    link.addEventListener('click', () => {
        const text = link.innerText.toLowerCase();
        if (text === 'prev' && currentPage > 1) {
            fetchResources(currentPage - 1);
        } else if (text === 'next') {
            fetchResources(currentPage + 1);
        } else if (!isNaN(text)) {
            fetchResources(parseInt(text));
        }
    });
});

// Initial load

