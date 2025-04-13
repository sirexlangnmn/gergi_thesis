let currentCourseId = null;
// fetchCourses(sessionOrganizationId, currentDepartmentId);


async function fetchCourses(organizationId, departmentId) {
    try {
        const response = await fetch(`${baseUrl}api/get/courses-by-organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ organizationId, departmentId })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderCourses(data.resources);
    } catch (error) {
        console.error('Error fetching courses:', error);
    }
}


function renderCourses(courses) {
    // console.log(`renderCourses courses ==>> `, courses)
    const container = document.getElementById('collapseCoursesContainer');
    container.innerHTML = '';

    courses.forEach((course, index) => {
        const radioId = `courseRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'courseRadioGroup';
        input.value = course.course_id;
        input.id = radioId;

        input.addEventListener('change', function () {
            if (this.checked) {
                fetchResourcesByCourse(course.course_id, page = 1);
                fetchFilteredResources(1);
            }
        });

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', radioId);
        label.textContent = course.course_title;

        formCheckDiv.appendChild(input);
        formCheckDiv.appendChild(label);
        container.appendChild(formCheckDiv);
    });
}


async function fetchResourcesByCourse(courseId, page = 1) {
    // console.log('fetchResourcesByCourse courseId ==>> ', courseId);
    currentCourseId = courseId;
    currentPage = page;

    console.log(`Fetching resources for Course : ${courseId}, Page: ${page}`);

    // try {
    //     const response = await fetch(`${baseUrl}api/get/fetch-resources-by-course`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ courseId, page })
    //     });

    //     if (!response.ok) throw new Error('Failed to fetch resources');

    //     const result = await response.json();
    //     console.log('fetchResourcesByCourse resources:', result);

    //     renderData(result); // Display the resources

    // } catch (error) {
    //     console.error('Error fetching resources:', error);
    // }
}