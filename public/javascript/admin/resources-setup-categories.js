function getCategoriesByCourse(courseId, coursTitle) {
    // console.log("getCategoriesByCourse courseId  ==>> ", courseId);
    // console.log("getCategoriesByCourse coursTitle  ==>> ", coursTitle);

    fetch(`${baseUrl}api/get/categories-by-course-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ courseId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        renderCategoriesContainer(data, coursTitle);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderCategoriesContainer(categories, courseTitle) {
    // console.log("renderCategoriesContainer data  ==>> ", data);
    // console.log("renderCategoriesContainer courseTitle  ==>> ", courseTitle);

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const categoriesContainer = getId("categoriesContainer");

    // organizationsContainer.style.display = "none";
    // departmentContainer.style.display = "none";
    // coursesContainer.style.display = "none";
    // categoriesContainer.style.display = "display";

    organizationsContainer.classList.add('hidden');
    departmentContainer.classList.add('hidden');
    coursesContainer.classList.add('hidden');
    categoriesContainer.classList.remove('hidden');

    categoriesContainer.innerHTML = "";

    if (categories && categories.length > 0) {
        categories.forEach(category => {
            const categoryHTML = `
                <div class="widget-post clearfix" onclick="handleCategoryClick(${category.id}, '${category.title}');">
                    <div class="dz-info">
                        <h6 class="title"><a href="javascript:void(0)">${category.title}</a></h6>
                        <div class="dz-meta">
                            <ul>
                                <li class="post-date">${courseTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            categoriesContainer.insertAdjacentHTML("beforeend", categoryHTML);
        });

    } else {
        const noCategoriesMessage = `
            <div class="no-categories-message" style="text-align: center; padding: 20px;">
                <p>No categories available under ${courseTitle}.</p>
            </div>
        `;
        categoriesContainer.insertAdjacentHTML("beforeend", noCategoriesMessage);
    }

}


function handleCategoryClick(categoryId, categoryTitle) {
    // console.log("handleCategoryClick categoryId  ==>> ", categoryId);
    // console.log("handleCategoryClick categoryTitle  ==>> ", categoryTitle);

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const categoriesContainer = getId("categoriesContainer");

    // organizationsContainer.style.display = "none";
    // departmentContainer.style.display = "none";
    // coursesContainer.style.display = "none";
    // categoriesContainer.style.display = "none";

    organizationsContainer.classList.add('hidden');
    departmentContainer.classList.add('hidden');
    coursesContainer.classList.add('hidden');
    categoriesContainer.classList.add('hidden');

    getId("hiddenCategoryId").value = categoryId;
    getId("hiddenCategoryTitle").value = categoryTitle;

    handleBreadcrumbs('category', categoryId, categoryTitle);
    getSubjectsByCategory(categoryId, categoryTitle);
}
