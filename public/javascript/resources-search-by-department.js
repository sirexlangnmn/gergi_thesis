let currentDepartmentId = null;
// let currentPage = 1; this is declared alread in resources-pagination.js

fetchDepartments(sessionOrganizationId);

// Fetch departments using POST
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
        console.log(`fetchDepartments data ==>> `, data)
        renderDepartments(data); // Adjust if response format differs
    } catch (error) {
        console.error('Error fetching departments:', error);
    }
}


function renderDepartments(departments) {
    const container = document.getElementById('collapseDepartmentsContainer');
    container.innerHTML = ''; // Clear previous items

    departments.forEach((dept, index) => {
        const radioId = `departmentRadio${index}`;

        const formCheckDiv = document.createElement('div');
        formCheckDiv.className = 'form-check search-content';

        const input = document.createElement('input');
        input.className = 'form-check-input';
        input.type = 'radio';
        input.name = 'departmentRadioGroup'; // Group name for mutual exclusivity
        input.value = dept.id;
        input.id = radioId;

        // Add change event listener to send data when selected
        input.addEventListener('change', function () {
            if (this.checked) {
                // sendDepartmentSelection(dept.id);
                fetchResourcesByDepartment(dept.id, page = 1);
                // console.log(`dept.id ==>> `, dept.id)
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



// Fetch resources by department and page
async function fetchResourcesByDepartment(departmentId, page = 1) {
    currentDepartmentId = departmentId;
    currentPage = page;

    console.log(`Fetching resources for Department: ${departmentId}, Page: ${page}`);

    try {
        const response = await fetch(`${baseUrl}api/get/resources-by-department`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ departmentId, page })
        });

        if (!response.ok) throw new Error('Failed to fetch resources');

        const result = await response.json();
        console.log('Fetched resources:', result);

        renderResources(result.resources); // Display the resources
        // renderPagination(result.totalPages); // Render pagination if needed

    } catch (error) {
        console.error('Error fetching resources:', error);
    }
}

// Render your resources here
// existing to reseources-setup
// function renderResources(resources) {
//     console.log(`renderResources resources ==>> `, resources)
//     const container = document.getElementById('resourceContainer');
//     container.innerHTML = ''; // Clear previous data

//     resources.forEach(resource => {
//         const div = document.createElement('div');
//         div.textContent = resource.title; // Adjust based on your structure
//         container.appendChild(div);
//     });
// }



// function renderResources(data) {
//     const resourcesContainer = getId("resourcesContainer");
//     resourcesContainer.innerHTML = '';

//     const publicationYear = 'Publication Year : 2021';
//     const author = "Author : WebMaster";

//     let index = 0;

//     data.forEach(book => {
//         const imageSrc = getImageSrc(book.image);

//         const bookCard = document.createElement("div");
//         bookCard.className = "col-book style-2";

//         bookCard.innerHTML = `
//             <div class="dz-shop-card style-1">
//                 <div class="dz-media">
//                     <img src="${imageSrc}" alt="${book.title}">
//                 </div>
//                 <div class="bookmark-btn style-2">
//                     <input class="form-check-input" type="checkbox" id="flexCheckDefault${index}">
//                     <label class="form-check-label" for="flexCheckDefault${index}">
//                         <i class="flaticon-heart"></i>
//                     </label>
//                 </div>
//                 <div class="dz-content">
//                     <h5 class="title"><a href="${book.url_link}">${book.title}</a></h5>
//                     <ul class="dz-tags">
//                       link
//                     </ul>
//                     <ul class="dz-rating">
//                       ratings
//                     </ul>
//                     <div class="book-footer">
//                         <div class="price">
//                         </div>
//                         <a href="${book.url_link}" target="_blank" class="btn btn-secondary box-btn btnhover btnhover2">
//                             <i class="flaticon-send m-r10"></i> Download
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         `;
//         index ++;
//         resourcesContainer.appendChild(bookCard);
//     });
// }


function renderResources(data) {
    const resourcesContainer = getId("resourcesContainer");
    resourcesContainer.innerHTML = '';

    if (!data || data.length === 0) {
        const noDataMessage = document.createElement("div");
        noDataMessage.className = "no-resources-message text-center py-4";
        noDataMessage.innerHTML = `
            <h4>No resources available for this department.</h4>
            <p>Please check back later or try a different department.</p>
        `;
        resourcesContainer.appendChild(noDataMessage);
        return;
    }

    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    let index = 0;

    data.forEach(book => {
        const imageSrc = getImageSrc(book.image);

        const bookCard = document.createElement("div");
        bookCard.className = "col-book style-2";

        bookCard.innerHTML = `
            <div class="dz-shop-card style-1">
                <div class="dz-media">
                    <img src="${imageSrc}" alt="${book.title}">
                </div>
                <div class="bookmark-btn style-2">
                    <input class="form-check-input" type="checkbox" id="flexCheckDefault${index}">
                    <label class="form-check-label" for="flexCheckDefault${index}">
                        <i class="flaticon-heart"></i>
                    </label>
                </div>
                <div class="dz-content">
                    <h5 class="title"><a href="${book.url_link}">${book.title}</a></h5>
                    <ul class="dz-tags">
                      link
                    </ul>
                    <ul class="dz-rating">
                      ratings
                    </ul>
                    <div class="book-footer">
                        <div class="price">
                        </div>
                        <a href="${book.url_link}" target="_blank" class="btn btn-secondary box-btn btnhover btnhover2">
                            <i class="flaticon-send m-r10"></i> Download
                        </a>
                    </div>
                </div>
            </div>
        `;
        index++;
        resourcesContainer.appendChild(bookCard);
    });
}


// Render pagination buttons
// function renderPagination(totalPages) {
//     const paginationContainer = document.querySelector('.pagination');
//     paginationContainer.innerHTML = ''; // Clear previous

//     // Prev Button
//     const prev = document.createElement('li');
//     prev.className = 'page-item';
//     prev.innerHTML = `<a class="page-link prev" href="javascript:void(0);">Prev</a>`;
//     prev.onclick = () => {
//         if (currentPage > 1) fetchResourcesByDepartment(currentDepartmentId, currentPage - 1);
//     };
//     paginationContainer.appendChild(prev);

//     // Page Numbers
//     for (let i = 1; i <= totalPages; i++) {
//         const pageBtn = document.createElement('li');
//         pageBtn.className = 'page-item';
//         pageBtn.innerHTML = `<a class="page-link ${i === currentPage ? 'active' : ''}" href="javascript:void(0);">${i}</a>`;
//         pageBtn.onclick = () => fetchResourcesByDepartment(currentDepartmentId, i);
//         paginationContainer.appendChild(pageBtn);
//     }

//     // Next Button
//     const next = document.createElement('li');
//     next.className = 'page-item';
//     next.innerHTML = `<a class="page-link next" href="javascript:void(0);">Next</a>`;
//     next.onclick = () => {
//         if (currentPage < totalPages) fetchResourcesByDepartment(currentDepartmentId, currentPage + 1);
//     };
//     paginationContainer.appendChild(next);
// }
