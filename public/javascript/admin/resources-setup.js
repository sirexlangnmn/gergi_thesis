document.addEventListener("DOMContentLoaded", () => {
    fetchAndPopulateOrganizations();
});

async function fetchAndPopulateOrganizations() {
    try {
        const organizations = await fetchOrganizations();
        populateOrganizations(organizations);
    } catch (error) {
        console.error('Error fetching or displaying organizations:', error);
    }
}

async function fetchOrganizations() {
    try {
        const response = await fetch(`${baseUrl}api/v1/get/organizations`);
        if (!response.ok) throw new Error('Failed to fetch organizations');

        return await response.json();
    } catch (error) {
        console.error("Error fetching organizations:", error);
    }
}


function populateOrganizations(organizations) {
    const organizationsContainer = getId("organizationsContainer");

    organizationsContainer.innerHTML = "";

    organizations.forEach(org => {
        const organizationHTML = `
            <div class="widget-post clearfix">
                <div class="dz-media">
                    <a href="blog-detail.html" style="display: inline-block; width: 50px; height: 50px;">
                        <img src="${baseUrl}uploads/gergi/client-logo/${org.imageUrl}" alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                    </a>

                </div>
                <div class="dz-info">
                    <h6 class="title"><a href="blog-detail.html">${org.title}</a></h6>
                    <div class="dz-meta">
                        <ul>
                            <li class="post-date">${org.classification_id}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        organizationsContainer.insertAdjacentHTML("beforeend", organizationHTML);
    });

}
