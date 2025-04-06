function getDepartmentsByOrganization(orgId, imageUrl, orgTitle) {
    // console.log("getDepartmentsByOrganization orgId  ==>> ", orgId);
    // console.log("getDepartmentsByOrganization imageUrl  ==>> ", imageUrl);
    // console.log("getDepartmentsByOrganization orgTitle  ==>> ", orgTitle);

    fetch(`${baseUrl}api/get/departments-by-organization`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ organizationId: orgId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Departments data received:", data);
        renderDepartments(data, imageUrl, orgTitle);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderDepartments(departments, imageUrl, orgTitle) {
    // console.log(`departments ==> `, departments)

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "display";

    departmentContainer.innerHTML = "";

    if (departments && departments.length > 0) {
        departments.forEach(department => {
            const departmentHTML = `
                <div class="widget-post clearfix" onclick="handleDepartmentClick(${department.id}, '${department.title}');">
                    <div class="dz-media">
                        <a href="javascript:void(0)" style="display: inline-block; width: 50px; height: 50px;">
                            <img src="${baseUrl}uploads/gergi/client-logo/${imageUrl}" alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 5px;">
                        </a>
                    </div>
                    <div class="dz-info">
                        <h6 class="title"><a href="javascript:void(0)">${department.title}</a></h6>
                        <div class="dz-meta">
                            <ul>
                                <li class="post-date">${orgTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            departmentContainer.insertAdjacentHTML("beforeend", departmentHTML);
        });

    } else {
        const noDepartmentsMessage = `
            <div class="no-departments-message" style="text-align: center; padding: 20px;">
                <p>No departments available under ${orgTitle}.</p>
            </div>
        `;
        departmentContainer.insertAdjacentHTML("beforeend", noDepartmentsMessage);
    }
}

function handleDepartmentClick(departmentId, departmentTitle) {
    // console.log("departmentId  ==>> ", departmentId);
    // console.log("departmentTitle ==>> :", departmentTitle);

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";

    handleBreadcrumbs('department', departmentId, departmentTitle);
    getCoursesByDepartment(departmentId, departmentTitle);
}
