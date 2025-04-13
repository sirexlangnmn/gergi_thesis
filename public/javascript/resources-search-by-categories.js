let currentCategoryId = null;
// let currentPage = 1; this is declared alread in resources-pagination.js

fetchCategories(sessionOrganizationId);


async function fetchCategories(organizationId) {
    try {
        const response = await fetch(`${baseUrl}api/get/categories-by-organization`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ organizationId })
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        renderCategories(data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}


function renderCategories(categories) {
    const container = document.getElementById('collapseCategoriesContainer');
    container.innerHTML = '';

    categories.forEach((dept, index) => {
        const radioId = `categoryRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'categoryRadioGroup';
        input.value = dept.id;
        input.id = radioId;

        input.addEventListener('change', function () {
            if (this.checked) {
                fetchResourcesByCategory(dept.id, page = 1);
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



// Fetch resources by category and page
async function fetchResourcesByCategory(categoryId, page = 1) {
    currentCategoryId = categoryId;
    currentPage = page;

    console.log(`Fetching resources for Category: ${categoryId}, Page: ${page}`);

    try {
        const response = await fetch(`${baseUrl}api/get/resources-by-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId, page })
        });

        if (!response.ok) throw new Error('Failed to fetch resources');

        const result = await response.json();
        console.log('Fetched resources:', result);

        renderData(result);

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}





