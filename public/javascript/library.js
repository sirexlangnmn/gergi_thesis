document.addEventListener('DOMContentLoaded', function () {
    const classificationContainer = document.getElementById('classificationContainer');

    classificationContainer.innerHTML = '';

    classificationsReference.forEach(item => {
        const slug = slugilize(`${item.title}`)
        const div = document.createElement('div');
        div.className = 'p-6 mt-6 text-center duration-500 hover:shadow-xl hover:shadow-gray-100 dark:hover:shadow-gray-800 rounded-2xl';

        const innerHTML = `
            <div onclick="selectClassification('${slug}')" id="card2" class="flex items-center justify-center mx-auto text-3xl text-indigo-600 align-middle shadow-sm bg-indigo-600/5 rounded-xl dark:shadow-gray-800">
                <img src="uploads/gergi/national_university.svg" class="h-100 w-100" alt="">
            </div>

            <div class="content mt-7">
                <a href="javascript:void(0)" onclick="selectClassification('${slug}')" class="text-lg font-medium title h5 hover:text-indigo-600">${item.title}</a>
            </div>
        `;

        div.innerHTML = innerHTML;

        classificationContainer.appendChild(div);
    });
});



function selectClassification(classificationValue) {
    const fullUrl = baseUrl + 'classification/' + classificationValue;
    window.location.href = fullUrl;
}