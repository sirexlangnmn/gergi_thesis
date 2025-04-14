fetchDepartments(sessionOrganizationId);


async function fetchDepartments(organizationId) {
    try {
        const response = await fetch(`${baseUrl}api/get/departments-by-organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ organizationId })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderDepartments(data);
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
}


function renderDepartments(departments) {
    const container = document.getElementById('collapseDepartmentsContainer');
    container.innerHTML = '';

    departments.forEach((dept, index) => {
        const radioId = `departmentRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'departmentRadioGroup';
        input.value = dept.id;
        input.id = radioId;

        input.addEventListener('change', function () {
            if (this.checked) {

                // to remove course radio button value
                removeValue('courseRadioGroup')
                removeValue('categoryRadio')
                removeValue('subjectRadio')

                getId('collapseCoursesContainer').innerHTML = '';
                getId('collapseCategoriesContainer').innerHTML = '';
                getId('collapseSubjectsContainer').innerHTML = '';

                currentCourseId = null;
                currentCategoryId = null;
                currentSubjectId = null;

                fetchFilteredResources(1);
                fetchCourses(sessionOrganizationId, dept.id);

            }
        });

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', radioId);
        label.textContent = dept.title;

        formCheckDiv.appendChild(input);
        formCheckDiv.appendChild(label);
        container.appendChild(formCheckDiv);
    });
}





