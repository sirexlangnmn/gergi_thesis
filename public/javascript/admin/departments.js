let departmentsTableBody = getId('departments-table-body');

let departmentTitle = getId('departmentTitle');
let departmentTitleError = getId('departmentTitleError');
let addDepartmentSuccessMessage = getId('addDepartmentSuccessMessage');
let addDepartmentErrorMessage = getId('addDepartmentErrorMessage');
let addDepartmentForm = getId('addDepartmentForm');
let addDepartmentSubmit = getId('addDepartmentSubmit');


const departmentEndpoint = {
    create: `${baseUrl}api/post/add-department`,
    get: `${baseUrl}api/get/departments`
}


async function getDepartments() {
    try {
        const response = await fetch(departmentEndpoint.get, {
            method: 'GET',
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

getDepartments().then((data) => {
    displayDepartments(data)
})
    .catch((error) => {
        console.error('Error rendering resource : ', error);
    });


function displayDepartments(data) {
    let html = '';

    data.forEach((item, index) => {
        html += `
            <tr>
                <th class="p-4 font-semibold border-t border-gray-100 text-start dark:border-gray-800">${item.id}</th>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">${item.title}</td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800 flex space-x-3">
                    <a href="javascript:void(0);" onclick="editDepartmentDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                    </a>
                </td>
            </tr>
        `;
    });

    departmentsTableBody.innerHTML = html;

}


function validateAddDepartmentForm() {

    resetErrorMessages();

    let isValid = true;

    if (!getId('departmentTitle').value) {
        displayErrorMessage('Please enter a Title', departmentTitleError);
        isValid = false;
    }

    return isValid;
}


addDepartmentSubmit.addEventListener('click', submitAddDepartmentForm);

function submitAddDepartmentForm(event) {
    event.preventDefault();

    if (!validateAddDepartmentForm()) {
        return;
    }

    const formData = {
        departmentInput: getId('departmentTitle').value
    };

    sendFormData(formData, departmentEndpoint.create)
        .then(data => handleSuccess(data, 'Data saved successfully', addDepartmentSuccessMessage, resetAddDepartmentForm))
        .catch(error => handleError(error, 'Data saved failed', addDepartmentErrorMessage));
}

function resetAddDepartmentForm() {
    getId('departmentTitle').value = "";
}



function editDepartmentDiv(departmentId) {
    console.log('editDepartmentDiv departmentId : ', departmentId)
}