let classificationsTableBody = getId('classifications-table-body');

let classificationTitle = getId('classificationTitle');
let classificationTitleError = getId('classificationTitleError');
let addClassificationSuccessMessage = getId('addClassificationSuccessMessage');
let addClassificationErrorMessage = getId('addClassificationErrorMessage');
let addClassificationForm = getId('addClassificationForm');
let addClassificationSubmit = getId('addClassificationSubmit');


const classificationEndpoint = {
    create: `${baseUrl}api/post/add-classification`,
    get: `${baseUrl}api/get/classifications`
}


async function getClassifications() {
    try {
        const response = await fetch(classificationEndpoint.get, {
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

getClassifications().then((data) => {
    displayClassifications(data)
})
    .catch((error) => {
        console.error('Error rendering resource : ', error);
    });


function displayClassifications(data) {
    let html = '';

    data.forEach((item, index) => {
        html += `
            <tr>
                <th class="p-4 font-semibold border-t border-gray-100 text-start dark:border-gray-800">${item.id}</th>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800">${item.title}</td>
                <td class="p-4 border-t border-gray-100 text-start dark:border-gray-800 flex space-x-3">
                    <a href="javascript:void(0);" onclick="editClassificationDiv(${item.id})" class="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-md border bg-transparent hover:bg-indigo-600 border-indigo-600 text-indigo-600 hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 4.04c.39-.39.39-1.04 0-1.41L18.37.29C18-.1 17.35-.1 16.96.29L15 2.25L18.75 6m-1 1L14 3.25l-10 10V17h3.75z"/></svg>
                    </a>
                </td>
            </tr>
        `;
    });

    classificationsTableBody.innerHTML = html;

}



function validateAddClassificationForm() {

    resetErrorMessages();

    let isValid = true;

    if (!getId('classificationTitle').value) {
        displayErrorMessage('Please enter a Title', classificationTitleError);
        isValid = false;
    }

    return isValid;
}


addClassificationSubmit.addEventListener('click', submitAddClassificationForm);

function submitAddClassificationForm(event) {
    event.preventDefault();

    if (!validateAddClassificationForm()) {
        return;
    }

    const formData = {
        classificationInput: getId('classificationTitle').value
    };

    sendFormData(formData, classificationEndpoint.create)
        .then(data => handleSuccess(data, 'Data saved successfully', addClassificationSuccessMessage, resetAddClassificationForm))
        .catch(error => handleError(error, 'Data saved failed', addClassificationErrorMessage));
}

function sendFormData(formData, endpoint) {
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function resetAddClassificationForm() {
    getId('classificationTitle').value = "";
}



function editClassificationDiv(classificationId) {
    console.log('editClassificationDiv classificationId : ', classificationId)
}