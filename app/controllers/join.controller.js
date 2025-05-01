const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');

const Resource_setups = db.resource_setups
const Resources = db.resources
const Categories = db.categories

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;


exports.search = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }
    } catch (error) {
        return res.status(400).json({
            error: {
                message: error,
            },
        });
    }

    try {

        const { searchInput, categoryInput, resourceTypeInput } = req.body;

        const searchKeyword = searchInput ? searchInput : '';
        const categoryId = categoryInput ? categoryInput : '';
        const resourceType = resourceTypeInput ? resourceTypeInput : 1;

        if (searchKeyword && categoryId && resourceType) {
            try {
                let query = QUERY.getResources

                const values = [];

                if (searchKeyword) {
                    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?)`;
                    values.push(`%${searchKeyword}%`, `%${searchKeyword}%`);
                    query += ` OR rs.category_id = '${categoryId}'`;
                    query += ` ORDER BY RAND()`;
                }

                sql.query(query, values, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }

        if (!searchKeyword && categoryId && resourceType) {
            try {
                let query = QUERY.getResources2
                query += ` WHERE rs.category_id = '${categoryId}'`;

                sql.query(query, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }

        if (searchKeyword && !categoryId && resourceType) {
            try {
                let query = QUERY.getResources

                const values = [];

                if (searchKeyword) {
                    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?)`;
                    values.push(`%${searchKeyword}%`, `%${searchKeyword}%`);
                    query += ` ORDER BY RAND()`;
                }

                sql.query(query, values, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }



    } catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};



exports.getUsers = async (req, res) => {
    try {
        let query = QUERY.getUsers

        const values = [];

        sql.query(query, values, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                return;
            }

            res.json(result);
        });

    } catch (error) {
        console.error('Error executing query:', error);
    }
};


exports.getResourcesByOrganization = async (req, res) => {
    const { sessionOrganizationId } = req.body;

    try {
        let query = QUERY.getResourcesByOrganizationId;
        query += ` WHERE organization_id = ? LIMIT 50`;

        const values = [sessionOrganizationId];

        sql.query(query, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            res.status(200).json(result);
        });

    } catch (error) {
        console.error('Unexpected error in getResourcesByOrganization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getResourcesByOrganizationWithPagination = async (req, res) => {
    const { sessionOrganizationId, page = 1, limit = 12 } = req.body;
    const offset = (page - 1) * limit;

    try {
        let query = QUERY.getResourcesByOrganizationId;
        query += ` WHERE organization_id = ? LIMIT ? OFFSET ?`;

        const values = [sessionOrganizationId, Number(limit), Number(offset)];

        sql.query(query, values, (err, resources) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            res.status(200).json({
                    message: resources.length > 0
                        ? 'Resources fetched successfully'
                        : 'No resources available',
                    resources,
                    currentPage: Number(page)
            });
        });
    } catch (error) {
        console.error('Unexpected error in getResourcesByOrganization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.showingXfromYdata = async (req, res) => {
    const { sessionOrganizationId} = req.body;

    try {
        let query = QUERY.showingXfromYdata;
        query += ` WHERE d.organization_id = ?`;

        const values = [sessionOrganizationId];

        sql.query(query, values, (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Database query error' });
            }

            // console.log(`result rex ==>> `, result)
            res.status(200).json(result);
        });
    } catch (error) {
        console.error('Unexpected error in getResourcesByOrganization:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




exports.getResourcesByOrganizationWithPaginationAndSearchKeyword = async (req, res) => {
    const {
        sessionOrganizationId,
        searchKeyword = '',
        page = 1,
        limit = 12
    } = req.body;

    const keyword = `%${searchKeyword}%`;
    const offset = (page - 1) * limit;

    const searchQuery = `
        SELECT
            d.id AS department_id,
            rs.resource_id AS resource_id,
            r.*
        FROM
            departments d
        LEFT JOIN
            resource_setups rs ON d.id = rs.department_id
        LEFT JOIN
            resources r ON rs.resource_id = r.resource_id
        WHERE
            d.organization_id = ?
            AND r.title LIKE ?
        LIMIT ? OFFSET ?
    `;

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM departments d
        LEFT JOIN resource_setups rs ON d.id = rs.department_id
        LEFT JOIN resources r ON rs.resource_id = r.resource_id
        WHERE d.organization_id = ?
        AND r.title LIKE ?
    `;

    try {
        const values = [sessionOrganizationId, keyword, Number(limit), Number(offset)];

        sql.query(searchQuery, values, (err, resources) => {
            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Get total count
            sql.query(countQuery, [sessionOrganizationId, keyword], (countErr, countResult) => {
                if (countErr) {
                    console.error("Error executing count query:", countErr);
                    return res.status(500).json({ error: "Count error" });
                }

                const total = countResult[0].total;
                res.status(200).json({
                    message: resources.length > 0
                        ? 'Resources fetched successfully'
                        : 'No resources available for this keyword',
                    resources,
                    total
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



// exports.getCoursesByOrganization = async (req, res) => {


//     // I have API like this 
//     // `const response = await fetch(`${baseUrl}api/get/courses-by-organization`, {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     },
//     //     body: JSON.stringify({ organizationId })
//     // });`


//     // create a sql query here to get data in departments table departments.organization_id using organizationId
//     // then using all department.id, get the data of courses table under courses.department_id
//     // then all courses.course_title_id get the data of course_titles table under course_titles.title
//     // then return course_titles.title


// };




exports.getCoursesByOrganization = async (req, res) => {
    const {
        organizationId,
        departmentId,
        searchKeyword = '',
        page = 1,
        limit = 12
    } = req.body;


    const keyword = `%${searchKeyword}%`;
    const offset = (page - 1) * limit;

    // Query to fetch courses with title using joins
    const searchQuery = `
        SELECT
            d.id AS department_id,
            c.id AS course_id,
            ct.title AS course_title
        FROM departments d
        LEFT JOIN courses c ON d.id = c.department_id
        LEFT JOIN course_titles ct ON c.course_title_id = ct.id
        WHERE d.organization_id = ?
        AND c.department_id = ?
        AND ct.title LIKE ?
        LIMIT ? OFFSET ?
    `;

    // Query to get total count for pagination
    const countQuery = `
        SELECT COUNT(*) AS total
        FROM departments d
        LEFT JOIN courses c ON d.id = c.department_id
        LEFT JOIN course_titles ct ON c.course_title_id = ct.id
        WHERE d.organization_id = ?
        AND ct.title LIKE ?
    `;

    try {
        const values = [organizationId, departmentId, keyword, Number(limit), Number(offset)];

        sql.query(searchQuery, values, (err, resources) => {
            if (err) {
                console.error("Error executing search query:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Fetch total count for pagination
            sql.query(countQuery, [organizationId, keyword], (countErr, countResult) => {
                if (countErr) {
                    console.error("Error executing count query:", countErr);
                    return res.status(500).json({ error: "Count error" });
                }

                const total = countResult[0].total;
                res.status(200).json({
                    message: resources.length > 0 
                        ? 'Resources fetched successfully' 
                        : 'No resources available for this course',
                    resources,
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / limit)
                });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



exports.getCategoriesByOrganization = async (req, res) => {
    const {
        organizationId,
        searchKeyword = '',
        page = 1,
        limit = 12
    } = req.body;

    const keyword = `%${searchKeyword}%`;
    const offset = (page - 1) * limit;

    // Query to fetch courses with title using joins
    const searchQuery = `
        SELECT 
            d.id AS department_id,
            c.id AS course_id,
            ct.title AS course_title
        FROM departments d
        LEFT JOIN courses c ON d.id = c.department_id
        LEFT JOIN course_titles ct ON c.course_title_id = ct.id
        WHERE d.organization_id = ?
        AND ct.title LIKE ?
        LIMIT ? OFFSET ?
    `;

    // Query to get total count for pagination
    const countQuery = `
        SELECT COUNT(*) AS total
        FROM departments d
        LEFT JOIN courses c ON d.id = c.department_id
        LEFT JOIN course_titles ct ON c.course_title_id = ct.id
        WHERE d.organization_id = ?
        AND ct.title LIKE ?
    `;

    try {
        const values = [organizationId, keyword, Number(limit), Number(offset)];

        sql.query(searchQuery, values, (err, resources) => {
            if (err) {
                console.error("Error executing search query:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Fetch total count for pagination
            sql.query(countQuery, [organizationId, keyword], (countErr, countResult) => {
                if (countErr) {
                    console.error("Error executing count query:", countErr);
                    return res.status(500).json({ error: "Count error" });
                }

                const total = countResult[0].total;
                res.status(200).json({
                    message: resources.length > 0 
                        ? 'Resources fetched successfully' 
                        : 'No resources available for this course',
                    resources,
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / limit)
                });
            });
        });

    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};







exports.getResourcesByFilters = async (req, res) => {
    const {
        searchKeyword = '',
        organizationId,
        departmentId,
        courseId,
        categoryId,
        subjectId,
        page = 1,
        limit = 12
    } = req.body;

    const offset = (page - 1) * limit;
    const keyword = `%${searchKeyword}%`;

    let whereConditions = [];
    let values = [];

    // Dynamically build WHERE conditions
    if (organizationId) {
        whereConditions.push("d.organization_id = ?");
        values.push(organizationId);
    }
    if (departmentId) {
        whereConditions.push("rs.department_id = ?");
        values.push(departmentId);
    }
    if (courseId) {
        whereConditions.push("rs.course_id = ?");
        values.push(courseId);
    }
    if (categoryId) {
        whereConditions.push("rs.category_id = ?");
        values.push(categoryId);
    }
    if (subjectId) {
        whereConditions.push("rs.subject_id = ?");
        values.push(subjectId);
    }
    if (searchKeyword) {
        whereConditions.push("r.title LIKE ?");
        values.push(keyword);
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

    // Main query
    const searchQuery = `
        SELECT 
            rs.resource_id,
            r.*
        FROM resource_setups rs
        LEFT JOIN resources r ON rs.resource_id = r.resource_id
        LEFT JOIN departments d ON rs.department_id = d.id
        ${whereClause}
        LIMIT ? OFFSET ?
    `;

    const countQuery = `
        SELECT COUNT(*) AS total
        FROM resource_setups rs
        LEFT JOIN resources r ON rs.resource_id = r.resource_id
        LEFT JOIN departments d ON rs.department_id = d.id
        ${whereClause}
    `;

    try {
        const paginatedValues = [...values, Number(limit), Number(offset)];

        // Fetch data
        sql.query(searchQuery, paginatedValues, (err, resources) => {
            if (err) {
                console.error("Error executing search query:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Fetch total count
            sql.query(countQuery, values, (countErr, countResult) => {
                if (countErr) {
                    console.error("Error executing count query:", countErr);
                    return res.status(500).json({ error: "Count error" });
                }

                const total = countResult[0].total;

                res.status(200).json({
                    message: resources.length > 0
                        ? 'Resources fetched successfully'
                        : 'No resources found for the provided filters',
                    resources,
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / limit)
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};





// exports.getSavedFavoriteResources = async (req, res) => {
//     const {
//         searchKeyword,
//         userId,
//         page,
//         limit
//     } = req.body;

//     const offset = (page - 1) * limit;
//     const keyword = `%${searchKeyword}%`;

//     let whereConditions = [];
//     let values = [];

//     // Dynamically build WHERE conditions
//     if (userId) {
//         whereConditions.push("rs.user_id = ?");
//         values.push(userId);
//     }

//     if (searchKeyword) {
//         whereConditions.push("r.title LIKE ?");
//         values.push(keyword);
//     }

//     const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

//     // Main query
//     const searchQuery = `
//         SELECT
//             rs.resource_id,
//             r.*
//         FROM resource_saves rs
//         LEFT JOIN resources r ON rs.resource_id = r.resource_id
//         ${whereClause}
//         LIMIT ? OFFSET ?
//     `;

//     const countQuery = `
//         SELECT COUNT(*) AS total
//         FROM resource_saves rs
//         LEFT JOIN resources r ON rs.resource_id = r.resource_id
//         ${whereClause}
//     `;

//     try {
//         const paginatedValues = [...values, Number(limit), Number(offset)];

//         // Fetch data
//         sql.query(searchQuery, paginatedValues, (err, resources) => {
//             if (err) {
//                 console.error("Error executing search query:", err);
//                 return res.status(500).json({ error: "Database error" });
//             }

//             // Fetch total count
//             sql.query(countQuery, values, (countErr, countResult) => {
//                 if (countErr) {
//                     console.error("Error executing count query:", countErr);
//                     return res.status(500).json({ error: "Count error" });
//                 }

//                 const total = countResult[0].total;

//                 res.status(200).json({
//                     message: resources.length > 0
//                         ? 'Resources saved fetched successfully'
//                         : 'No resources found for the provided filters',
//                     resources,
//                     total,
//                     currentPage: Number(page),
//                     totalPages: Math.ceil(total / limit)
//                 });
//             });
//         });
//     } catch (error) {
//         console.error("Unexpected error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// };




exports.getSavedFavoriteResources = async (req, res) => {
    const {
        searchKeyword = "",
        sessionUserId,
        page = 1,
        limit = 10
    } = req.body;

    if (!sessionUserId) {
        return res.status(400).json({ error: "userId is required" });
    }

    const offset = (page - 1) * limit;
    const keyword = `%${searchKeyword}%`;

    let whereConditions = ["rs.user_id = ?"];
    let values = [sessionUserId];

    if (searchKeyword) {
        whereConditions.push("r.title LIKE ?");
        values.push(keyword);
    }

    const whereClause = `WHERE ${whereConditions.join(" AND ")}`;

    // Main paginated query
    const searchQuery = `
        SELECT
            rs.resource_id,
            r.*
        FROM resource_saves rs
        INNER JOIN resources r ON rs.resource_id = r.resource_id
        ${whereClause}
        ORDER BY rs.createdAt DESC
        LIMIT ? OFFSET ?
    `;

    // Total count query
    const countQuery = `
        SELECT COUNT(*) AS total
        FROM resource_saves rs
        INNER JOIN resources r ON rs.resource_id = r.resource_id
        ${whereClause}
    `;

    try {
        const paginatedValues = [...values, Number(limit), Number(offset)];

        // Fetch paginated data
        sql.query(searchQuery, paginatedValues, (err, resources) => {
            if (err) {
                console.error("Error executing search query:", err);
                return res.status(500).json({ error: "Database error" });
            }

            // Fetch total count
            sql.query(countQuery, values, (countErr, countResult) => {
                if (countErr) {
                    console.error("Error executing count query:", countErr);
                    return res.status(500).json({ error: "Count error" });
                }

                const total = countResult[0].total;

                res.status(200).json({
                    message: resources.length > 0
                        ? "Resources saved fetched successfully"
                        : "No resources found for the provided filters",
                    resources,
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / limit)
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
