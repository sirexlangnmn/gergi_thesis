document.addEventListener('DOMContentLoaded', async function () {
    displayDepartmentsByOrganization();

});

async function displayDepartmentsByOrganization() {
    // can be found to departments.ejs
    // const organizationValue = '<%= data.organizationValue %>';

    const organization = convertToTitleCase(organizationValue);

    try {
        const response = await fetch(baseUrl + 'api/get/departments-by-organization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ organization })
        });

        if (response.ok) {
            const data = await response.json();

            const departmentContainer = document.getElementById('departmentContainer');
            departmentContainer.innerHTML = '';

            data.forEach(item => {
                const slug = slugilize(`${item.title}`);
                const div = document.createElement('div');
                div.className = 'p-6 mt-6 text-center duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 rounded-2xl';

                const innerHTML = `
                    <div onclick="selectCourse('${slug}')" id="card2" class="flex items-center justify-center mx-auto text-3xl text-indigo-600 align-middle shadow-sm bg-indigo-600/5 rounded-xl dark:shadow-gray-800">
                        <img src="${baseUrl}/uploads/gergi/national_university.svg" class="h-100 w-100" alt="">
                    </div>
                    <div class="content mt-7">
                        <a href="javascript:void(0)" onclick="selectCourse('${slug}')" class="text-lg font-medium title h5 hover:text-indigo-600">${item.title}</a>
                    </div>
                `;

                div.innerHTML = innerHTML;
                departmentContainer.appendChild(div);
            });
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}



function selectCourse(organizationValue) {
    console.log('organizationValue: ', organizationValue)
    // const fullUrl = baseUrl + organizationValue;
    // window.location.href = fullUrl;
}