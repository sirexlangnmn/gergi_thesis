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
    // organizationsContainer.style.display = "display";


    organizationsContainer.innerHTML = "";

    organizations.forEach(org => {
        const classificationName = getClassificationName(org.classification_id);
        const organizationHTML = `
            <div class="widget-post clearfix" onclick="handleOrganizationClick(${org.id}, '${org.imageUrl}', '${org.title}');">
                <div class="dz-media">
                    <a href="javascript:void(0)" style="display: inline-block; width: 50px; height: 50px;">
                        <img src="${baseUrl}uploads/gergi/client-logo/${org.imageUrl}" alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                    </a>

                </div>
                <div class="dz-info">
                    <h6 class="title"><a href="javascript:void(0)">${org.title}</a></h6>
                    <div class="dz-meta">
                        <ul>
                            <li class="post-date">${classificationName}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        organizationsContainer.insertAdjacentHTML("beforeend", organizationHTML);
    });
}

function getClassificationName(id) {
    const classifications = [
        { "id": 1, "name": "Government Agencies" },
        { "id": 2, "name": "Academic Institutions" },
        { "id": 3, "name": "Private Sectors" },
        { "id": 4, "name": "Public Sectors" }
    ];

    const classification = classifications.find(item => item.id == id);
    return classification ? classification.name : "Unknown Classification";
}

function handleOrganizationClick(orgId, imageUrl, orgTitle) {
    // console.log("orgId  ==>> ", orgId);
    // console.log("imageUrl ==>> :", imageUrl);
    // console.log("orgTitle ==>> :", orgTitle);

    const organizationsContainer = getId("organizationsContainer");

    if (organizationsContainer) {
        organizationsContainer.style.display = "none";
    }

    handleBreadcrumbs('organization', orgId, orgTitle);
    getDepartmentsByOrganization(orgId, imageUrl, orgTitle);
}
