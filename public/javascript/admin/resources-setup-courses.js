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

    // organizationsContainer.style.display = "none";
    // departmentContainer.style.display = "none";
    // coursesContainer.style.display = "display";

    organizationsContainer.classList.add('hidden');
    departmentContainer.classList.add('hidden');
    coursesContainer.classList.remove('hidden');

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

    chooseLabel('Choose Course');
}


function handleCourseClick(courseId, coursTitle) {
    // console.log(`handleCourseClick courseId ==> `, courseId)
    // console.log(`handleCourseClick coursTitle ==> `, coursTitle)

    const organizationsContainer = getId("organizationsContainer");
    const departmentContainer = getId("departmentContainer");
    const coursesContainer = getId("coursesContainer");

    // organizationsContainer.style.display = "none";
    // departmentContainer.style.display = "none";
    // coursesContainer.style.display = "none";

    organizationsContainer.classList.add('hidden');
    departmentContainer.classList.add('hidden');
    coursesContainer.classList.add('hidden');

    getId("hiddenCourseId").value = courseId;
    getId("hiddenCoursTitle").value = coursTitle;

    handleBreadcrumbs('course', courseId, coursTitle);
    getCategoriesByCourse(courseId, coursTitle)
}