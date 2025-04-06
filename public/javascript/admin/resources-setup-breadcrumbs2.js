let breadcrumbPath = []; // Stores breadcrumb history

function handleBreadcrumbs(type, id, title) {
    breadcrumbPath.push({ type, id, title });
    renderBreadcrumbs();
}

function renderBreadcrumbs() {
    const container = document.getElementById("resourceSetupBreadcrumbs");

    if (!container) return;

    let html = `<div class="tagcloud">`;

    breadcrumbPath.forEach((item, index) => {
        // if (index < breadcrumbPath.length - 1) {
            html += `
                <a href="javascript:void(0);" class="breadcrumb-link"
                    data-index="${index}"
                    data-type="${item.type}"
                    data-id="${item.id}"
                    data-title="${item.title}">
                    ${item.title}
                </a>
                ${index < breadcrumbPath.length - 1 ? '>' : ''}
            `;
        // } else {
        //     // Last breadcrumb – current location, not clickable
        //     html += `
        //         <span class="breadcrumb-current">${item.title}</span>
        //     `;
        // }
    });

    html += `</div>`;
    container.innerHTML = html;

    // attachBreadcrumbEvents();
}

function attachBreadcrumbEvents() {
    const links = document.querySelectorAll(".breadcrumb-link");
    links.forEach(link => {
        link.addEventListener("click", () => {
            const index = parseInt(link.getAttribute("data-index"));
            const type = link.getAttribute("data-type");
            const id = link.getAttribute("data-id");
            const title = link.getAttribute("data-title");

            console.log(`Breadcrumb clicked: [${type}] ${title} (id: ${id}, index: ${index})`);

            // Slice the breadcrumb trail up to the clicked index
            breadcrumbPath = breadcrumbPath.slice(0, index + 1);

            // Re-render the trail
            renderBreadcrumbs();

            // 🔁 Optionally: trigger content load based on selected breadcrumb
            // loadContentByBreadcrumb(type, id);
        });
    });
}


function loadContentByBreadcrumb(type, data) {
    // <input type="" id="hiddenOrgId" name="hiddenOrgId" value="" />
    // <input type="" id="hiddenImageUrl" name="hiddenImageUrl" value="" />
    // <input type="" id="hiddenOrgTitle" name="hiddenOrgTitle" value="" />

    // <input type="" id="hiddenDepartmentId" name="hiddenDepartmentId" value="" />
    // <input type="" id="hiddenDepartmentTitle" name="hiddenDepartmentTitle" value="" />

    // <input type="" id="hiddenCourseId" name="hiddenCourseId" value="" />
    // <input type="" id="hiddenCoursTitle" name="hiddenCoursTitle" value="" />

    // <input type="" id="hiddenCategoryId" name="hiddenCategoryId" value="" />
    // <input type="" id="hiddenCategoryTitle" name="hiddenCategoryTitle" value="" />


    const orgId = getId("hiddenOrgId").value;
    const imageUrl = getId("hiddenImageUrl").value;
    const orgTitle = getId("hiddenOrgTitle").value;

    const hiddenDepartmentId = getId("hiddenDepartmentId").value;
    const hiddenDepartmentTitle = getId("hiddenDepartmentTitle").value;

    const hiddenCourseId = getId("hiddenCourseId").value;
    const hiddenCoursTitle = getId("hiddenCoursTitle").value;

    const hiddenCategoryId = getId("hiddenCategoryId").value;
    const hiddenCategoryTitle = getId("hiddenCategoryTitle").value;

    const resourcesContainer = getId("resourcesContainer");
    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const categoriesContainer = getId("categoriesContainer");
    const subjectsContainer = getId("subjectsContainer");

    // organizationsContainer.style.display = "none";
    // departmentContainer.style.display = "none";
    // coursesContainer.style.display = "none";
    // categoriesContainer.style.display = "none";
    // subjectsContainer.style.display = "none";

    resourcesContainer.innerHTML = "";
    organizationsContainer.innerHTML = "";
    departmentContainer.innerHTML = "";
    coursesContainer.innerHTML = "";
    categoriesContainer.innerHTML = "";
    subjectsContainer.innerHTML = "";

    resourcesContainer.classList.add('hidden');
    organizationsContainer.classList.add('hidden');
    departmentContainer.classList.add('hidden');
    coursesContainer.classList.add('hidden');
    categoriesContainer.classList.add('hidden');
    subjectsContainer.classList.add('hidden');

    switch (type) {
        case 'organization':
            organizationsContainer.classList.remove('hidden');
            departmentContainer.classList.add('hidden');
            coursesContainer.classList.add('hidden');
            categoriesContainer.classList.add('hidden');
            subjectsContainer.classList.add('hidden');
            fetchAndPopulateOrganizations();
            break;
        case 'department':
            organizationsContainer.classList.add('hidden');
            departmentContainer.classList.remove('hidden');
            coursesContainer.classList.add('hidden');
            categoriesContainer.classList.add('hidden');
            subjectsContainer.classList.add('hidden');
            getDepartmentsByOrganization(orgId, imageUrl, orgTitle);
            break;
        case 'course':
            organizationsContainer.classList.add('hidden');
            departmentContainer.classList.add('hidden');
            coursesContainer.classList.remove('hidden');
            categoriesContainer.classList.add('hidden');
            subjectsContainer.classList.add('hidden');
            getCoursesByDepartment(hiddenDepartmentId, hiddenDepartmentTitle);
            break;
        case 'category':
            organizationsContainer.classList.add('hidden');
            departmentContainer.classList.add('hidden');
            coursesContainer.classList.add('hidden');
            categoriesContainer.classList.remove('hidden');
            subjectsContainer.classList.add('hidden');
            getCategoriesByCourse(hiddenCourseId, hiddenCoursTitle);
            break;
        case 'subject':
            organizationsContainer.classList.add('hidden');
            departmentContainer.classList.add('hidden');
            coursesContainer.classList.add('hidden');
            categoriesContainer.classList.add('hidden');
            subjectsContainer.classList.remove('hidden');
            getSubjectsByCategory(hiddenCategoryId, hiddenCategoryTitle);
            break;
        default:
            console.warn(`Unknown breadcrumb type: ${type}`);
    }
}