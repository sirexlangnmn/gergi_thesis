<!-- "tailwindBuild": "tailwindcss -i ./public/assets/css/input.css -o ./public/assets/css-tailwind/output.css --watch", -->
<!-- "tailwindBuild": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch", --># gergi_thesis
# gergi_thesis





I have departments table, that can get data using departments.organization_id = organizationId
I have courses table, that can get data using courses.department_id = departmentId
I have course_titles table, that can get data using course_titles.id = courses.course_title_id
I have categories table, that can get data using categories.course_id = courseId
I have subjects table, that can get data using subjects.ccategory_id = categoryId

I have resource_setups table, that can get data using
resource_setups.subject_id
resource_setups.category_id
resource_setups.course_id
resource_setups.department_id