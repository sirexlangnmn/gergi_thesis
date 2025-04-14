async function fetchCategories(courseId) {
    try {
        const response = await fetch(`${baseUrl}api/get/categories-by-course-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(`fetchCategories data ==>> `, data)
        renderCategories(data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


function renderCategories(categories) {
    const container = getId('collapseCategoriesContainer');
    container.innerHTML = '';

    categories.forEach((category, index) => {
        const radioId = `categoryRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'categoryRadioGroup';
        input.value = category.id;
        input.id = radioId;

        input.addEventListener('change', function () {
            if (this.checked) {

                removeValue('subjectRadio')

                getId('collapseSubjectsContainer').innerHTML = '';

                currentSubjectId = null;

                fetchFilteredResources(1);
                fetchSubjects(category.id);
            }
        });

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', radioId);
        label.textContent = category.title;

        formCheckDiv.appendChild(input);
        formCheckDiv.appendChild(label);
        container.appendChild(formCheckDiv);
    });
}
