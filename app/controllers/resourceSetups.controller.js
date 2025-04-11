const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Departments = db.departments;
const Courses = db.courses;
const Course_titles = db.course_titles
const Resource_setups = db.resource_setups
const Resources = db.resources

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

exports.getResourcesByCourse = async (req, res) => {
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
        // const courseTitle = req.body.course;
        const courseTitle = "Optometry";
        try {
            let query = QUERY.getResources3
            query += ` WHERE ct.title = '${courseTitle}'`;
            query += ` ORDER BY RAND()`;
            query += ` LIMIT 20;`;

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

    } catch (error) {
        console.error('Error in getCoursesByDepartment:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }
};



// exports.resourceSetup = async (req, res) => {
//     const errors = validationResult(req);

//     try {
//         if (!errors.isEmpty()) {
//             return res.status(200).send({
//                 message: errors.array(),
//             });
//         }

//         const { resourceId, classification, organization, department, course, category, subject } = req.body;

//         try {
//             // Sequelize insert query here
//             const newResource = await Resource_setups.create({
//                 resource_id: resourceId,
//                 department_id: department,
//                 course_id: course,
//                 category_id: category,
//                 subject_id: subject,
//                 createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
//                 updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
//             });

//             if (newResource) {
//                 return res.status(200).json({ message: 'Resource setup successful', resource: newResource });
//             } else {
//                 throw new Error('Failed to create resource');
//             }
//         } catch (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).json({ error: 'Failed to create resource' });
//         }

//     } catch (error) {
//         console.error('Error in resourceSetup:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };


exports.resourceSetup = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }

        const { bookId, subjectInput, categoryInput, courseInput, departmentInput } = req.body;

        try {
            // Sequelize insert query here
            const newResource = await Resource_setups.create({
                resource_id: bookId,
                subject_id: subjectInput,
                category_id: categoryInput,
                course_id: courseInput,
                department_id: departmentInput,
                resource_type: 1, // ebooks or pdf
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            if (newResource) {
                return res.status(200).json({ message: 'Resource setup successful', resource: newResource });
            } else {
                throw new Error('Failed to create resource');
            }
        } catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Failed to create resource' });
        }

    } catch (error) {
        console.error('Error in resourceSetup:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getResourcesByOrganization = async (req, res) => {
    try {
        const { sessionOrganizationId } = req.body;
        console.log(`getResourceByOrganization sessionOrganizationId ==>> `, sessionOrganizationId);

        const department = await Departments.findOne({
            where: { organization_id: sessionOrganizationId  }
        });

        console.log(`getResourceByOrganization department ==>> `, department);

        const resources = await Resource_setups.findAll({
            where: { department_id: department.id }
        });

        console.log(`getResourceByOrganization resources ==>> `, resources);

        if (resources && resources.length > 0) {
            return res.status(200).json({ message: 'Resources fetched successfully', resources });
        } else {
            return res.status(404).json({ message: 'No resources found for this organization' });
        }
    } catch (error) {
        console.error('Error fetching resources by organization:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



exports.getResourcesByDepartment = async (req, res) => {
    const {
        departmentId,
        page = 1,
        limit = 10
    } = req.body;

    if (!departmentId) {
        return res.status(400).json({ message: 'departmentId is required' });
    }

    const offset = (page - 1) * limit;

    const dataQuery = `
        SELECT r.*
        FROM resource_setups rs
        JOIN resources r ON r.resource_id = rs.resource_id
        WHERE rs.department_id = ?
        ORDER BY r.createdAt DESC
        LIMIT ? OFFSET ?
    `;

    const countQuery = `
        SELECT COUNT(*) as total
        FROM resource_setups rs
        JOIN resources r ON r.resource_id = rs.resource_id
        WHERE rs.department_id = ?
    `;

    try {
        sql.query(dataQuery, [departmentId, Number(limit), Number(offset)], (err, resources) => {
            if (err) {
                console.error("Error fetching resources:", err);
                return res.status(500).json({ error: "Database error" });
            }

            if (resources.length === 0) {
                return res.status(404).json({ message: 'No resources found for this department' });
            }

            sql.query(countQuery, [departmentId], (countErr, countResult) => {
                if (countErr) {
                    console.error("Error fetching count:", countErr);
                    return res.status(500).json({ error: "Count query error" });
                }

                const total = countResult[0].total;
                const totalPages = Math.ceil(total / limit);

                return res.status(200).json({
                    message: 'Resources fetched successfully',
                    resources,
                    totalPages,
                    currentPage: Number(page)
                });
            });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
