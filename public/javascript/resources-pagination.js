let currentPage = 1;

document.querySelectorAll('.pagination .page-link').forEach(link => {
    link.addEventListener('click', () => {
        const text = link.innerText.toLowerCase();
        if (text === 'prev' && currentPage > 1) {
            fetchFilteredResources(currentPage - 1);
        } else if (text === 'next') {
            fetchFilteredResources(currentPage + 1);
        } else if (!isNaN(text)) {
            fetchFilteredResources(parseInt(text));
        }
    });
});


function showingXfromYdata(data) {
    getId("showingXfromYdata").innerText = `Showing ${data.currentPage} from total of ${data.totalPages} pages. Total of ${data.total} reseources. `;
}