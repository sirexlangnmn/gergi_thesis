let breadcrumbPath = []; // Stores breadcrumb history

function handleBreadcrumbs(type, id, title) {
    // console.log("type ==>> ", type);
    // console.log("title ==>> ", title);
    const breadcrumbsContainer = document.getElementById("resourceSetupBreadcrumbs");

    // Add the new breadcrumb entry
    breadcrumbPath.push({ type, id, title });

    if (breadcrumbsContainer) {
        // Generate breadcrumb links dynamically
        let breadcrumbHTML = `<div class="tagcloud">`;

        breadcrumbPath.forEach((item, index) => {
            // console.log("item2 ==>> ", item);
            // console.log("index ==>> :", index);
            breadcrumbHTML += `
            <a href="javascript:void(0);">${item.title}</a> >
            <input type="text" name="${item.type}_input" id="${item.type}_input" class="breadcrumb-input" value="${item.id}" data-index="${index}" hidden >
            `;
        });

        // Remove trailing '>'
        breadcrumbHTML = breadcrumbHTML.replace(/>$/, "");

        breadcrumbHTML += `</div>`;

        // Update the breadcrumbs container
        breadcrumbsContainer.innerHTML = breadcrumbHTML;
    }
}






// // Function to reset breadcrumbs back to 'Home'
// function resetBreadcrumbs() {
//     breadcrumbPath = []; // Clear the breadcrumb path
//     handleBreadcrumbs(); // Re-render with only 'Home'
// }

// // Function to remove a breadcrumb from a specific index
// function removeBreadcrumb(index) {
//     breadcrumbPath = breadcrumbPath.slice(0, index + 1); // Keep only the clicked path and previous ones
//     handleBreadcrumbs(); // Re-render breadcrumbs
// }















