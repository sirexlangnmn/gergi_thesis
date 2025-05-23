module.exports = (app) => {
    const { check, validationResult } = require('express-validator');

    const controllers = require('../controllers');
    const middleware = require('../middleware');

    const resourcesController = controllers.resources;
    const joinController = controllers.join;
    const departmentsController = controllers.departments;
    const usersController = controllers.users;
    const coursesController = controllers.courses;
    const resourceSetupsController = controllers.resourceSetups;
    const resourceSavesController = controllers.resourceSaves;
    const categoriesController = controllers.categories;
    const organizationsController = controllers.organizations;
    const requestsController = controllers.requests;
    const subjectsController = controllers.subjects;
    const classificationsController = controllers.classifications;
    const courseTitlesController = controllers.courseTitles;
    const subjectTitlesController = controllers.subjectTitles;

    const webScrapingController = controllers.webScraping;

    app.get(['/api/v1/get/resources/pdf'], resourcesController.pdf);
    app.post(['/api/get/resources-order-by-latest'], resourcesController.resourcesOrderByLatest);
    app.post(['/api/get/resources-by-id'], resourcesController.getResourcesById);
    app.post(['/api/get/departments-by-organization'], departmentsController.getDepartmentsByOrganization);
    app.post(['/api/post/registration'], usersController.registration);
    app.post(['/api/post/login'], usersController.login);
    app.post(['/api/get/courses-by-department'], coursesController.getCoursesByDepartment);
    app.post(['/api/get/courses-by-department-id'], coursesController.getCoursesByDepartmentId);
    app.post(['/api/get/resources-by-course'], resourceSetupsController.getResourcesByCourse);
    app.post(['/api/post/resource-setup'], resourceSetupsController.resourceSetup);
    app.post(['/api/get/categories-by-course'], categoriesController.getCategoriesByCourse);
    app.post(['/api/get/categories-by-course-id'], categoriesController.getCategoriesByCourseId);
    app.post(['/api/get/search-resources'], joinController.search);
    app.get(['/api/get/organizations'], organizationsController.getAll);
    app.get(['/api/get/departments'], departmentsController.getAll);
    app.post(['/api/get/subjects-by-category-id'], subjectsController.getSubjectsByCategoryId);

    app.post(['/api/get/classifications'], classificationsController.getAll);
    app.post(['/api/get/course-titles'], courseTitlesController.getAll);
    app.post(['/api/get/categories'], categoriesController.getAll);
    app.post(['/api/get/subject-titles'], subjectTitlesController.getAll);

    app.post(['/api/post/add-classification'], classificationsController.create);
    app.post(['/api/post/add-organization'], organizationsController.create);
    app.post(['/api/post/add-department'], departmentsController.create);
    app.post(['/api/post/add-course-title'], courseTitlesController.create);
    app.post(['/api/post/add-category'], categoriesController.create);
    app.post(['/api/post/add-subject-title'], subjectTitlesController.create);


    app.post(['/api/v1/get/web-scraping/open-research-library'], webScrapingController.openResearchLibrary);
    app.post(['/api/v1/get/web-scraping/fetch-pdf-room'], webScrapingController.fetchPdfRoomApiData);
    app.post(['/api/v1/post/web-scraping/save-resources'], webScrapingController.saveResources);
    // app.post(['/api/v1/get/users'], usersController.getUsers);
    app.post(['/api/v1/get/users'], joinController.getUsers);
    app.get(['/api/v1/get/organizations'], organizationsController.getAll);
    app.post(['/api/v1/post/user'], usersController.update);
    app.post(['/api/v1/get/resources-order-by-latest-with-limit'], resourcesController.resourcesOrderByLatestWithLimit);
    app.post(['/api/v1/get/resources-order-by-random-with-limit'], resourcesController.resourcesOrderByRandomWithLimit);
    // app.post(['/api/v1/get/resources-by-organization'], resourceSetupsController.getResourcesByOrganization);
    app.post(['/api/v1/get/resources-by-organization'], joinController.getResourcesByOrganization);
    app.post(['/api/v1/get/resources-by-organization-with-pagination'], joinController.getResourcesByOrganizationWithPagination);
    app.post(['/api/v1/get/resources-showing-x-from-y-data'], joinController.showingXfromYdata);
    app.post(['/api/v1/get/resources-by-organization-with-pagination-and-search-keyword'], joinController.getResourcesByOrganizationWithPaginationAndSearchKeyword);
    app.post(['/api/get/resources-by-department'], resourceSetupsController.getResourcesByDepartment);
    app.post(['/api/get/resources-by-search-keyword'], resourcesController.getResourcesBySearchKeyword);
    app.post(['/api/get/courses-by-organization'], joinController.getCoursesByOrganization);
    app.post(['/api/get/fetch-resources-by-course'], resourceSetupsController.fetchResourcesByCourse);
    app.post(['/api/get/categories-by-organization'], joinController.getCategoriesByOrganization);
    app.post(['/api/get/resources-by-category'], resourceSetupsController.fetchResourcesByCategory);
    app.post(['/api/v1/get/fetch-filtered-resources'], joinController.getResourcesByFilters);
    app.post(['/api/v1/post/save-as-favorites'], resourceSavesController.saveAsFavorite);
    app.post(['/api/v1/get/user-saved-favorite-resources'], joinController.getUserSavedFavoriteResources);
    app.post(['/api/v1/get/all-saved-favorite-resources'], joinController.getAllSavedFavoriteResources);
    app.post(['/api/v1/post/request-book'], requestsController.saveRequestBook);
    app.post(['/api/v1/get/requested-books'], requestsController.getRequestedBooks);
    app.post(['/api/v1/get/all-requested-books'], requestsController.getAllRequestedBooks);
    

};