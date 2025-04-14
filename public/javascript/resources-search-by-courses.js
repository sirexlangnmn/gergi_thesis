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
