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
            <div class="widget-post clearfix" onclick="handleOrganizationClick(${org.id}, '${org.title}');">
                <div class="dz-media">
                    <a href="javascript:void(0)" style="display: inline-block; width: 50px; height: 50px;">
                        <img src="${baseUrl}uploads/gergi/client-logo/${org.imageUrl}" alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                    </a>

                </div>
                <div class="dz-info">
                    <h6 class="title"><a href="javascript:void(0)">${org.title}</a></h6>
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

function handleOrganizationClick(id, title) {
    console.log("Clicked Organization ID ==>> ", id);
    console.log("Clicked Organization title ==>> :", title);
    // Get the admin navigation element
    const organizationsContainer = getId("organizationsContainer");

    // Hide the element if it exists
    if (organizationsContainer) {
        organizationsContainer.style.display = "none";
    }

    handleBreadcrumbs('organization', id, title);
}


let breadcrumbPath = []; // Stores breadcrumb history

function handleBreadcrumbs(type, id, title) {
    console.log("type ==>> ", type);
    console.log("title ==>> ", title);
    const breadcrumbsContainer = document.getElementById("resourceSetupBreadcrumbs");

    // Add the new breadcrumb entry
    breadcrumbPath.push({ type, title });

    if (breadcrumbsContainer) {
        // Generate breadcrumb links dynamically
        let breadcrumbHTML = `<div class="tagcloud">`;

        breadcrumbPath.forEach((item, index) => {
            console.log("item2 ==>> ", item);
            console.log("index ==>> :", index);
            breadcrumbHTML += ` 
            <a href="javascript:void(0);">${item.title}</a> >
            <input type="text" name="${item.type}_input" class="breadcrumb-input" value="${item.title}" data-index="${index}" hidden >
            `;
        });

        // Remove trailing '>'
        breadcrumbHTML = breadcrumbHTML.replace(/>$/, "");

        breadcrumbHTML += `</div>`;

        // Update the breadcrumbs container
        breadcrumbsContainer.innerHTML = breadcrumbHTML;
    }
}

// // Function to reset breadcrumbs back to 'Home'
// function resetBreadcrumbs() {
//     breadcrumbPath = []; // Clear the breadcrumb path
//     handleBreadcrumbs(); // Re-render with only 'Home'
// }

// // Function to remove a breadcrumb from a specific index
// function removeBreadcrumb(index) {
//     breadcrumbPath = breadcrumbPath.slice(0, index + 1); // Keep only the clicked path and previous ones
//     handleBreadcrumbs(); // Re-render breadcrumbs
// }
