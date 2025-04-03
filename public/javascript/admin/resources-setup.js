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


let breadcrumbPath = []; // Stores breadcrumb history

function handleBreadcrumbs(type, id, title) {
    // console.log("type ==>> ", type);
    // console.log("title ==>> ", title);
    const breadcrumbsContainer = document.getElementById("resourceSetupBreadcrumbs");

    // Add the new breadcrumb entry
    breadcrumbPath.push({ type, id, title });

    if (breadcrumbsContainer) {
        // Generate breadcrumb links dynamically
        let breadcrumbHTML = `<div class="tagcloud">`;

        breadcrumbPath.forEach((item, index) => {
            // console.log("item2 ==>> ", item);
            // console.log("index ==>> :", index);
            breadcrumbHTML += `
            <a href="javascript:void(0);">${item.title}</a> >
            <input type="text" name="${item.type}_input" id="${item.type}_input" class="breadcrumb-input" value="${item.id}" data-index="${index}" hidden >
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

function getCoursesByDepartment(departmentId, departmentTitle) {
    // console.log("getCoursesByDepartment departmentId  ==>> ", departmentId);
    // console.log("getCoursesByDepartment departmentTitle  ==>> ", departmentTitle);

    fetch(`${baseUrl}api/get/courses-by-department-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ departmentId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("getCoursesByDepartment data received:", data);
        renderCourses(data, departmentTitle);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderCourses(courses, departmentTitle) {
    // console.log(`departments ==> `, departments)

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";
    coursesContainer.style.display = "display";

    coursesContainer.innerHTML = "";

    if (courses && courses.length > 0) {
        courses.forEach(course => {
            const coursetHTML = `
                <div class="widget-post clearfix" onclick="handleCourseClick(${course.id}, '${course.course_title}');">
                    <div class="dz-info">
                        <h6 class="title"><a href="javascript:void(0)">${course.course_title}</a></h6>
                        <div class="dz-meta">
                            <ul>
                                <li class="post-date">${departmentTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            coursesContainer.insertAdjacentHTML("beforeend", coursetHTML);
        });

    } else {
        const noCoursesMessage = `
            <div class="no-courses-message" style="text-align: center; padding: 20px;">
                <p>No courses available under ${departmentTitle}.</p>
            </div>
        `;
        coursesContainer.insertAdjacentHTML("beforeend", noCoursesMessage);
    }
}

function handleCourseClick(courseId, coursTitle) {
    console.log(`handleCourseClick courseId ==> `, courseId)
    console.log(`handleCourseClick coursTitle ==> `, coursTitle)

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const resourcesContainer = getId("resourcesContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";
    coursesContainer.style.display = "none";
    resourcesContainer.style.display = "display";

    handleBreadcrumbs('course', courseId, coursTitle);
    renderSearchContainer();
    renderResourcesContainer();
    getResourcesOrderByLatest();
}


function renderSearchContainer() {
    const searchContainer = getId("searchContainer");

    const searchContainerHtml = `<div class="col-lg-12 col-md-12">
        <div class="mb-3">
            <form action="javascript:void(0);" accept-charset="utf-8">
            <label for="exampleFormControlTextarea" class="form-label">Search:</label>
            <input type="text" class="form-control" id="searchKeyword" placeholder="Keyword">
            </form>
        </div>
    </div>`

    searchContainer.insertAdjacentHTML("beforeend", searchContainerHtml);
}


function renderResourcesContainer() {
    const resourcesContainer = getId("resourcesContainer");
    const resourcesContainerHtml = `<div class="row" id="searchedData"  style="--bs-gutter-x: 9px;">
    dadas
    </div>`

    // resourcesContainer.insertAdjacentHTML("beforeend", resourcesContainerHtml);


    const organizationInput = getId('organization_input').value;
    console.log(`renderResourcesContainer organizationInput ==>> `, organizationInput)
    const departmentInput = getId('department_input').value;
    console.log(`renderResourcesContainer departmentInput ==>> `, departmentInput)
    const courseInput = getId('course_input').value;
    console.log(`renderResourcesContainer courseInput ==>> `, courseInput)
}


function getResourcesOrderByLatest() {
    // console.log("getDepartmentsByOrganization orgId  ==>> ", orgId);
    // console.log("getDepartmentsByOrganization imageUrl  ==>> ", imageUrl);
    // console.log("getDepartmentsByOrganization orgTitle  ==>> ", orgTitle);

    fetch(`${baseUrl}api/get/resources-orde-by-random-with-limit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("getResourcesOrderByLatest data received:", data);
        renderResources(data);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderResources(data) {
    console.log('renderResources data ==> ', data)
    const resourcesContainer = getId("resourcesContainer");

    const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    

    data.forEach(book => {
        const imageExists = book.image ? isValidUrl(book.image) : false;
        const linkExists = book.url_link ? isValidUrl(book.url_link) : false;


        const bookCard = document.createElement("div");
        bookCard.className = "col-md-12 col-sm-12";

        bookCard.innerHTML = `
            <div class="dz-shop-card style-2">
                <div class="dz-media">
                    <img src="${imageSrc}" alt="${book.title}">
                </div>
                <div class="dz-content">
                    <div>
                        <li><a href="${book.url_link}" target="_blank" class="download-link">${book.url_link}</a></li>
                    </div>
                    <div class="dz-header">
                        <div>
                            <h4 class="title mb-0">
                                <a href="${book.url_link}" target="_blank" class="book-name">${book.title}</a>
                            </h4>
                        </div>
                    </div>
                    <div class="dz-body">
                        <div class="rate" style="justify-content: none">
                            <div class="d-flex">
                                <a href="#" class="btn btn-secondary btnhover btnhover2 save-btn">
                                    <i class="flaticon-send m-r10"></i> Save
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        resourcesContainer.appendChild(bookCard);
    });
}


async function isValidUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

