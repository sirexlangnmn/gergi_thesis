let toggleDiv = [
    'addresources',
    'editresources',
    'resourcesetuppage',
    'resourcesetup',
    'classificationspage',
    'organizationspage',
    'departmentspage',
    'coursespage',
    'categoriespage',
    'subjectspage',
    'addclassification',
    'addorganization',
    'adddepartment',
    'addcourse',
    'addcategory',
    'addsubject'
];


function editResourcesDiv(resourceId) {
    getResourcesById(resourceId)
    showAndHide('editresources', toggleDiv);
}

function showAddResourcesDiv() {
    showAndHide('addresources', toggleDiv);
}

function showResourceSetupDiv() {
    showAndHide('resourcesetuppage', toggleDiv);

    displayResources().then((data) => {
        generateTableRows(data)
    })
        .catch((error) => {
            console.error('Error rendering resource : ', error);
        });
}

function resourceSetupFormDiv(resourceId, title) {
    getId('resourcesTitle').innerHTML = title;
    getId('resourceId').value = resourceId;
    showAndHide('resourcesetup', toggleDiv);
}

function showResourceSetupDiv() {
    showAndHide('resourcesetuppage', toggleDiv);
}


function showClassificationsDiv() {
    showAndHide('classificationspage', toggleDiv);
}

function showAddClassificationDiv() {
    showAndHide('addclassification', toggleDiv);
}

function showOrganizationsDiv() {
    showAndHide('organizationspage', toggleDiv);
}

function showAddOrganizationDiv() {
    showAndHide('addorganization', toggleDiv);
}

function showDepartmentsDiv() {
    showAndHide('departmentspage', toggleDiv);
}

function showAddDepartmentDiv() {
    showAndHide('adddepartment', toggleDiv);
}

function showCoursesDiv() {
    showAndHide('coursespage', toggleDiv);
}

function showAddCourseDiv() {
    showAndHide('addcourse', toggleDiv);
}

function showCategoriesDiv() {
    showAndHide('categoriespage', toggleDiv);
}

function showAddCategoryDiv() {
    showAndHide('addcategory', toggleDiv);
}

function showSubjectDiv() {
    showAndHide('subjectspage', toggleDiv);
}

function showAddSubjectDiv() {
    showAndHide('addsubject', toggleDiv);
}

function showAndHide(showElement, toggleDiv) {
    toggleDiv.forEach(id => {
        if (id === showElement) {
            getId(id).classList.remove('hidden');
        } else {
            getId(id).classList.add('hidden');
        }
    });
}
