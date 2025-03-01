document.addEventListener("DOMContentLoaded", function () {

});


let resourcesTableBody = getId('resources-table-body');



let title = getId('title');
let titleError = getId('titleError');
let addBookSuccessMessage = getId('addBookSuccessMessage');
let addBookErrorMessage = getId('addBookErrorMessage');
let addBookForm = getId('addBookForm');



let editResourcesSuccessMessage = getId('editResourcesSuccessMessage');
let editResourcesErrorMessage = getId('editResourcesErrorMessage');
let editResourcesForm = getId('editResourcesForm');



let classificationSelect = getId('classificationData');
let organizationSelect = getId('organizationData');
let departmentSelect = getId('departmentData');
let courseSelect = getId('courseData');
let categorySelect = getId('categoryData');
let subjectSelect = getId('subjectData');
let resourceSetupForm = getId('resourceSetupForm');
let resourceSetupSuccessMessage = getId('resourceSetupSuccessMessage');
let resourceSetupErrorMessage = getId('resourceSetupErrorMessage');

const resourceEndpoint = {
    create: `${baseUrl}add-resources`
}


function validateAddBookForm() {
    title = title.value;

    resetErrorMessages();

    let isValid = true;

    if (!title) {
        displayErrorMessage('Please enter a Title', titleError);
        isValid = false;
    }

    return isValid;
}



addBookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!validateAddBookForm()) {
        return;
    }

    const formData = new FormData(addBookForm);
    sendFormDataV1(formData, resourceEndpoint.create)
        // .then(handleSuccess)
        // .catch(handleError);
        .then(data => handleSuccess(data, 'Data saved successfully', addBookSuccessMessage, resetAddBookForm))
        .catch(error => handleError(error, 'Data saved failed', addBookErrorMessage));
});

function sendFormDataV1(formData, endpoint) {
    return fetch(endpoint, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}


function handleSuccess(data, successMessage, successElement, resetCallback) {
    console.log('data:', data);
    showSuccessMessage(successMessage, successElement);
    resetCallback(); // Reset form
}

function handleError(error, errorMessage, errorElement) {
    console.error('Error:', error);
    showErrorMessage(errorMessage, errorElement);
}

// Define a reset function to be used as a callback
function resetAddBookForm() {
    addBookForm.reset();
    location.reload();
}




async function displayResources() {
    try {
        const response = await fetch(`${baseUrl}api/get/resources-order-by-latest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching resources : ', error);
        throw error;
    }
}

displayResources().then((data) => {
    generateTableRows(data)
})
    .catch((error) => {
        console.error('Error rendering resource : ', error);
    });


function generateTableRows(data) {
    let html = '';

    data.forEach((item, index) => {
        html += `
            <tr>
                <th class="p-4 font-semibold border-t border-gray-100 text-start dark:border-gray-800">${item.id}</th>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">${item.title}</td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">
                    <span class="text-slate-400">Federex Potolin</span>
                </td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">
                    <span class="text-slate-400">${item.ISBN}</span>
                </td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800 flex space-x-3">

                <a href="javascript:void(0);" onclick="editResourcesDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                </a>

                <a href="javascript:void(0);" onclick="resourceSetupFormDiv('${item.resource_id}', '${item.title}')" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 20a1 1 0 0 0-1-1h-1v-2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4v2h-1a1 1 0 0 0-1 1H2v2h7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1h7v-2zm-6.75-9.92l1.16-1.16L11 10.5l3.59-3.58l1.16 1.41L11 13.08z"/></svg>
                </a>

                <a href="javascript:void(0);" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M11.03 19H5V5h2v2h10V5h2v4.5c.72.3 1.4.74 2 1.32V5a2 2 0 0 0-2-2h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h8.06c-.41-.26-.8-.55-1.16-.9c-.33-.34-.63-.71-.87-1.1M12 3c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m8.31 14.9c.44-.69.69-1.52.69-2.4c0-2.5-2-4.5-4.5-4.5S12 13 12 15.5s2 4.5 4.5 4.5c.87 0 1.69-.25 2.38-.68L22 22.39L23.39 21zm-3.81.1a2.5 2.5 0 0 1 0-5a2.5 2.5 0 0 1 0 5"/></svg>
                </a>
                </td>
            </tr>
        `;
    });

    resourcesTableBody.innerHTML = html;
}











function getResourcesById(resourceId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ resourceId: resourceId })
    };


    fetch('/api/get/resources-by-id', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            getId('update_id').value = data.id;
            getId('update_title').value = data.title;
            getId('update_download_link').value = data.url_link;
            getId('update_isbn').value = data.ISBN;
        })
        .catch(error => {
            console.error('Error updating resource:', error);
        });
}





editResourcesForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(editResourcesForm);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    fetch('/api/update/resources', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // or response.json() if you expect JSON response
        })
        .then(data => {
            showSuccessMessage('Resource updated successfully', editResourcesSuccessMessage)
            editResourcesForm.reset();
            setTimeout(function(){
                showResourceSetupDiv();
            }, 2000);
        })
        .catch(error => {
            console.error('Error updating resource:', error);
            showErrorMessage('Error updating resource', editResourcesErrorMessage)
        });
});







resourceSetupForm.addEventListener('submit', function (event) {
    event.preventDefault();


    const resourceId = getId('resourceId').value;
    const classification = getId('classificationData').value;
    const organization = getId('organizationData').value;
    const department = getId('departmentData').value;
    const course = getId('courseData').value;
    const category = getId('categoryData').value;
    const subject = getId('subjectData').value;


    const data = {
        resourceId: resourceId,
        classification: classification,
        organization: organization,
        department: department,
        course: course,
        category: category,
        subject: subject
    };


    fetch('/api/post/resource-setup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        showSuccessMessage('Data saved successfully', resourceSetupSuccessMessage)
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        showErrorMessage('Data saved failed', resourceSetupErrorMessage)
    });
});








function populateOrganizations(classificationId) {
    organizationSelect.innerHTML = '';
    departmentSelect.innerHTML = '';

    const filteredOrganizations = organizationsReference.filter(org => parseInt(org.classification_id) === parseInt(classificationId));

    filteredOrganizations.forEach(org => {
        const option = document.createElement('option');
        option.value = org.id;
        option.textContent = org.title;
        organizationSelect.appendChild(option);
    });

    populateDepartments(organizationSelect.value);
}

function populateDepartments(organizationId) {
    departmentSelect.innerHTML = '';

    const filteredDepartments = departmentsReference.filter(department => parseInt(department.organization_id) === parseInt(organizationId));

    if (filteredDepartments.length === 0) {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        departmentSelect.appendChild(noneOption);
    } else {
        filteredDepartments.forEach(department => {
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.title;
            departmentSelect.appendChild(option);
        });
    }

    courseSelect.innerHTML = '';

    populateCourses(departmentSelect.value);
}

function populateCourses(departmentId) {
    courseSelect.innerHTML = '';

    if (departmentId === 'None') {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        courseSelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ departmentId: departmentId })
        };

        fetch('/api/get/courses-by-department-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                data.forEach(course => {
                    const option = document.createElement('option');
                    option.value = course.id;
                    option.textContent = course.course_title;
                    courseSelect.appendChild(option);
                });

                populateCategories(courseSelect.value);
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}

function populateCategories(courseId) {
    categorySelect.innerHTML = '';

    if (courseId === 'None') {
        categorySelect.innerHTML = '';
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        categorySelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId: courseId })
        };

        fetch('/api/get/categories-by-course-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                categorySelect.innerHTML = '';

                if (data.length === 0) {
                    const noneOption = document.createElement('option');
                    noneOption.textContent = 'None';
                    categorySelect.appendChild(noneOption);
                } else {
                    data.forEach(category => {
                        const option = document.createElement('option');
                        option.value = category.id;
                        option.textContent = category.title;
                        categorySelect.appendChild(option);
                    });
                }
                populateSubjects(categorySelect.value);
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}

function populateSubjects(categoryId) {
    subjectSelect.innerHTML = '';

    if (categoryId === 'None') {
        const noneOption = document.createElement('option');
        noneOption.textContent = 'None';
        subjectSelect.appendChild(noneOption);
    } else {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId: categoryId })
        };

        fetch('/api/get/subjects-by-category-id', requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    const noneOption = document.createElement('option');
                    noneOption.textContent = 'None';
                    subjectSelect.appendChild(noneOption);
                } else {
                    data.forEach(subject => {
                        const option = document.createElement('option');
                        option.value = subject.id;
                        option.textContent = subject.subject_title;
                        subjectSelect.appendChild(option);
                    });
                }
            })
            .catch(error => {
                console.error('Error updating resource:', error);
            });
    }
}



classificationsReference.forEach(classification => {
    const option = document.createElement('option');
    option.value = classification.id;
    option.textContent = classification.title;
    classificationSelect.appendChild(option);
});


classificationSelect.addEventListener('change', function () {
    populateOrganizations(this.value);
    populateCategories(courseSelect.value);
    populateSubjects(categorySelect.value);
});

organizationSelect.addEventListener('change', function () {
    populateDepartments(this.value);
    populateCategories(courseSelect.value);
    populateSubjects(categorySelect.value);
});

departmentSelect.addEventListener('change', function () {
    populateCourses(this.value);
    populateCategories(courseSelect.value);
    populateSubjects(categorySelect.value);
});

courseSelect.addEventListener('change', function () {
    populateCategories(this.value);
    populateCategories(courseSelect.value);
    populateSubjects(categorySelect.value);
});

categorySelect.addEventListener('change', function () {
    populateSubjects(this.value);
});


const defaultClassificationId = parseInt(classificationSelect.value);
populateOrganizations(defaultClassificationId);
