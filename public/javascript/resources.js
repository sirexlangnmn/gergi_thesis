document.addEventListener("DOMContentLoaded", () => {
    displayResources();
    displayCategories();
    displayFormats();

    updateOrganizationTitle(organizationId);
    updateDepartmentTitle(departmentTitle);
    updateCourseTitle(courseValue);
});


async function displayResources() {
    const course = convertToTitleCase(courseValue);
    try {
        const response = await fetch(`${baseUrl}api/get/resources-by-course`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course })
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
    const resourcesContainer = getId("resourcesContainer");

    const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
    const publicationYear = 'Publication Year : 2021';
    const author = "Author : WebMaster";

    data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("group");

        div.innerHTML = `
            <div class="relative overflow-hidden duration-500 rounded-md shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800">
                <img src="${imageSrc}" alt="">
                <div class="absolute duration-500 -bottom-20 group-hover:bottom-3 start-3 end-3">
                    <a href="${item.url_link}" target="_blank" class="inline-block w-full px-5 py-2 text-base font-semibold tracking-wide text-center text-white align-middle duration-500 border rounded-md bg-slate-900 border-slate-900">Download</a>
                </div>
                <ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500">
                    <li><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-heart"></i></a></li>
                    <li class="mt-1"><a href="/" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-eye-outline"></i></a></li>
                    <li class="mt-1"><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-bookmark-outline"></i></a></li>
                </ul>
                <ul class="list-none absolute top-[10px] start-4">
                    <li><a href="javascript:void(0)" class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">
                        ${item.category_title}
                    </a></li>
                </ul>
            </div>
            <div class="mt-4">
                <a href="${item.url_link}" target="_blank" class="text-lg font-semibold hover:text-indigo-600">${item.title}</a>
                <div class="items-center justify-between mt-1">
                    <p class="text-gray-600">${author}</p>
                    <p class="text-gray-600">${publicationYear}</p>
                    <p class="text-gray-600">Subject : ${item.subject_title}</p>
                </div>
            </div>
        `;
        resourcesContainer.appendChild(div);
    });
})
.catch((error) => {
    console.error('Error rendering resource : ', error);
});


async function displayFormats() {
    const resourceTypeContainer = getId("resourceTypeContainer");
    resourceTypeContainer.innerHTML = generateRadioButtons(formatsReference, 'resourceTypeRadio');

    formatsReference.forEach(item => {
        const radioButton = document.getElementById(`resourceTypeRadio-${item.id}`);
        radioButton.addEventListener('change', function() {
            const searchData = {
                value: this.value,
                elementId: 'resourceTypeRadio'
            }
            search(searchData)
        });
    });
}

async function displayCategories() {

    const course = convertToTitleCase(courseValue);

    try {
        const response = await fetch(baseUrl + 'api/get/categories-by-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course })
        });

        if (response.ok) {
            const data = await response.json();

            const categoriesContainer = getId("categoriesContainer");
            categoriesContainer.innerHTML = generateRadioButtons(data, 'categoryRadio');

            data.forEach(item => {
                const radioButton = document.getElementById(`categoryRadio-${item.id}`);
                radioButton.addEventListener('change', function() {

                    const resourcesContainer = getId("resourcesContainer");
                    resourcesContainer.innerHTML = '';

                    // const searchData = {
                    //     value: this.value,
                    //     elementId: 'categoryRadio'
                    // }
                    // search(searchData)

                    const searchData = {
                        value: this.value,
                        elementId: 'categoryRadio'
                    };

                    triggerSearch(searchData);
                });
            });


        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        const errorMessage = error || 'An error occurred with the fetch operation';
        console.log('There was a problem with the fetch operation:', errorMessage);
    }
}


// Function to clean the resourcesContainer
function cleanResourcesContainer() {
    const resourcesContainer = getId("resourcesContainer");
    resourcesContainer.innerHTML = '';
}

// Function to trigger search after cleaning
function triggerSearch(searchData) {
    cleanResourcesContainer(); // Clean the resourcesContainer
    search(searchData); // Trigger the search
}


function generateRadioButtons(data, elementId) {
    let radioHtml = '';
    data.forEach(item => {
        radioHtml += `
            <div class="block mt-2">
                <div>
                    <label class="inline-flex items-center">
                        <input type="radio" class="text-indigo-600 border-gray-200 form-radio dark:border-gray-800 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2" name="radio-colors ${elementId}" value="${item.id}"
                        id="${elementId}-${item.id}">
                        <span for="${elementId}-${item.id}" class="text-slate-400">${item.title}</span>
                    </label>
                </div>
            </div>`;
    });
    return radioHtml;
}



document.getElementById("searchInput").addEventListener("keyup", function(event) {

    const inputValue = event.target.value.trim();

    if (event.key === "Enter") {
        event.preventDefault();
        if (inputValue !== "") {
            console.log(inputValue);

            const searchData = {
                value: inputValue,
                elementId: 'searchInput'
            }
            search(searchData)
        } else {
            console.log("Input is empty");

            const searchData = {
                value: inputValue,
                elementId: 'searchInput'
            }
            search(searchData)
        }
    }

    if (inputValue === "") {
        console.log("Input is empty");

        const searchData = {
            value: inputValue,
            elementId: 'searchInput'
        }
        search(searchData)

    }
});


let searchInput, searchInputOld, categoryInput, categoryInputOld, resourceTypeInput, resourceTypeInputOld;

async function search(searchData) {

    const resourcesContainer = getId("resourcesContainer");
    resourcesContainer.innerHTML = '';

    if (searchData.elementId === 'searchInput') {
        searchInput = searchData.value;
        searchInputOld = searchData.value;
    } else {
        searchInput = searchInputOld;
    }

    if (searchData.elementId === 'categoryRadio') {
        categoryInput = searchData.value;
        categoryInputOld = searchData.value;
    } else {
        categoryInput = categoryInputOld;
    }

    if (searchData.elementId === 'resourceTypeRadio') {
        resourceTypeInput = searchData.value;
        resourceTypeInputOld = searchData.value;
    } else {
        resourceTypeInput = resourceTypeInputOld;
    }

    // console.log("Searching for searchInput : ", searchInput);
    // console.log("Searching for categoryRadio : ", categoryRadio);
    // console.log("Searching for resourceTypeRadio : ", resourceTypeRadio);

    try {
        const response = await fetch(`${baseUrl}api/get/search-resources`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchInput,
                categoryInput,
                resourceTypeInput
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log('frontend search : ', data);

        const resourcesContainer = getId("resourcesContainer");
        resourcesContainer.innerHTML = '';

        const imageSrc = `${baseUrl}/uploads/gergi/optometry/OPTOMETRY.webp`
        const publicationYear = 'Publication Year : 2021';
        const author = "Author : WebMaster";

        data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("group");

            div.innerHTML = `
                <div class="relative overflow-hidden duration-500 rounded-md shadow dark:shadow-gray-800 group-hover:shadow-lg group-hover:dark:shadow-gray-800">
                    <img src="${imageSrc}" alt="">
                    <div class="absolute duration-500 -bottom-20 group-hover:bottom-3 start-3 end-3">
                        <a href="${item.url_link}" target="_blank" class="inline-block w-full px-5 py-2 text-base font-semibold tracking-wide text-center text-white align-middle duration-500 border rounded-md bg-slate-900 border-slate-900">Download</a>
                    </div>
                    <ul class="list-none absolute top-[10px] end-4 opacity-0 group-hover:opacity-100 duration-500">
                        <li><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-heart"></i></a></li>
                        <li class="mt-1"><a href="/" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-eye-outline"></i></a></li>
                        <li class="mt-1"><a href="javascript:void(0)" class="inline-flex items-center justify-center text-base tracking-wide text-center text-white align-middle duration-500 bg-indigo-600 border-indigo-600 rounded-full size-8 hover:bg-indigo-700 hover:border-indigo-700"><i class="mdi mdi-bookmark-outline"></i></a></li>
                    </ul>
                    <ul class="list-none absolute top-[10px] start-4">
                        <li><a href="javascript:void(0)" class="bg-orange-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded h-5">
                        ${item.category_title}
                        </a></li>
                    </ul>
                </div>
                <div class="mt-4">
                    <a href="${item.url_link}" target="_blank" class="text-lg font-semibold hover:text-indigo-600">${item.title}</a>
                    <div class="items-center justify-between mt-1">
                        <p class="text-gray-600">${author}</p>
                        <p class="text-gray-600">${publicationYear}</p>
                        <p class="text-gray-600">Subject : ${item.subject_title}</p>
                    </div>
                </div>
            `;
            resourcesContainer.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching resources : ', error);
        throw error;
    }
}





function updateOrganizationTitle(organizationId) {
    const organizationAngleRight = getId("organization-angle-right");
    const organizationTitleElement = getId("organization-title");

    const organization = findOrganizationById(organizationId);

    if (organization) {
        organizationAngleRight.style.display = "inline-block";
        setElementContent(organizationTitleElement, organization.title);
    } else {
        organizationAngleRight.style.display = "none";
        setElementContent(organizationTitleElement, '');
    }
}

function updateDepartmentTitle(departmentTitle) {
    const departmentAngleRight = getId("department-angle-right");
    const departmentTitleElement = getId("department-title");

    if (departmentTitle) {
        departmentAngleRight.style.display = "inline-block";
        setElementContent(departmentTitleElement, departmentTitle);
    } else {
        departmentAngleRight.style.display = "none";
        setElementContent(departmentTitleElement, '');
    }
}

function updateCourseTitle(courseValue) {
    const courseAngleRight = getId("course-angle-right");
    const courseTitleElement = getId("course-title");

    if (courseValue) {
        courseAngleRight.style.display = "inline-block";
        setElementContent(courseTitleElement, courseValue);
    } else {
        courseAngleRight.style.display = "none";
        setElementContent(courseTitleElement, '');
    }
}

function findOrganizationById(organizationId) {
    return organizationsReference.find(item => item.id === parseInt(organizationId));
}

function setElementContent(element, content) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    const newContent = document.createTextNode(content);
    element.appendChild(newContent);
}


