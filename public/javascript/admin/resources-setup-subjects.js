function getSubjectsByCategory(categoryId, categoryTitle) {
    // console.log("getSubjectsByCategory categoryId  ==>> ", categoryId);
    // console.log("getSubjectsByCategory categoryTitle  ==>> ", categoryTitle);

    fetch(`${baseUrl}api/get/subjects-by-category-id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ categoryId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("getSubjectsByCategory data received:", data);
        renderSubjectsContainer(data, categoryTitle);
    })
    .catch(error => {
        // Catch any errors (e.g., network errors, API errors)
        console.error('There was a problem with the fetch operation:', error);
    });
}


function renderSubjectsContainer(subjects, categoryTitle) {
    // console.log("renderSubjectsContainer data  ==>> ", data);
    // console.log("renderSubjectsContainer courseTitle  ==>> ", courseTitle);

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const categoriesContainer = getId("categoriesContainer");
    const subjectsContainer = getId("subjectsContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";
    coursesContainer.style.display = "none";
    categoriesContainer.style.display = "none";
    subjectsContainer.style.display = "display";

    subjectsContainer.innerHTML = "";

    if (subjects && subjects.length > 0) {
        subjects.forEach(subject => {
            const subjectHTML = `
                <div class="widget-post clearfix" onclick="handleSubjectClick(${subject.id}, '${subject.title}');">
                    <div class="dz-info">
                        <h6 class="title"><a href="javascript:void(0)">${subject.title}</a></h6>
                        <div class="dz-meta">
                            <ul>
                                <li class="post-date">${categoryTitle}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `;

            subjectsContainer.insertAdjacentHTML("beforeend", subjectHTML);
        });

    } else {
        const noSubjectsMessage = `
            <div class="no-subjects-message" style="text-align: center; padding: 20px;">
                <p>No subjects available under ${categoryTitle}.</p>
            </div>
        `;
        subjectsContainer.insertAdjacentHTML("beforeend", noSubjectsMessage);
    }

}


function handleSubjectClick(subjectId, subjectTitle) {
    // console.log("handleSubjectClick subjectId  ==>> ", subjectId);
    // console.log("handleSubjectClick subjectTitle  ==>> ", subjectTitle);

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");
    const categoriesContainer = getId("categoriesContainer");
    const subjectsContainer = getId("subjectsContainer");

    organizationsContainer.style.display = "none";
    departmentContainer.style.display = "none";
    coursesContainer.style.display = "none";
    categoriesContainer.style.display = "none";
    subjectsContainer.style.display = "none";

    handleBreadcrumbs('subject', subjectId, subjectTitle);
    renderSearchContainer();
    getResourcesOrderByLatest();
    checkHiddenInputs();
}



function checkHiddenInputs() {
    // to check kung dala dala pa din yun hidden data
    const organizationInput = getId('organization_input').value;
    console.log(`checkHiddenInputs organizationInput ==>> `, organizationInput)
    const departmentInput = getId('department_input').value;
    console.log(`checkHiddenInputs departmentInput ==>> `, departmentInput)
    const courseInput = getId('course_input').value;
    console.log(`checkHiddenInputs courseInput ==>> `, courseInput)
    const categoryInput = getId('category_input').value;
    console.log(`checkHiddenInputs categoryInput ==>> `, categoryInput)
    const subjectInput = getId('subject_input').value;
    console.log(`checkHiddenInputs subjectInput ==>> `, subjectInput)
}

