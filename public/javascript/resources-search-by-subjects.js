async function fetchSubjects(categoryId) {
    try {
        const response = await fetch(`${baseUrl}api/get/subjects-by-category-id`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(`fetchSubjects data ==>> `, data)
        renderSubjects(data);
    } catch (error) {
        console.error('Error fetching subjects:', error);
    }
}


function renderSubjects(subjects) {
    const container = getId('collapseSubjectsContainer');
    container.innerHTML = '';

    subjects.forEach((subject, index) => {
        const radioId = `subjectRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'subjectRadioGroup';
        input.value = subject.id;
        input.id = radioId;

        input.addEventListener('change', function () {
            if (this.checked) {

                fetchFilteredResources(1);
            }
        });

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', radioId);
        label.textContent = subject.title;

        formCheckDiv.appendChild(input);
        formCheckDiv.appendChild(label);
        container.appendChild(formCheckDiv);
    });
}
