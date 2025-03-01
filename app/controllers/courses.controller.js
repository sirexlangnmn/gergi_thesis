const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Departments = db.departments;
const Courses = db.courses;
const Course_titles = db.course_titles

const Op = db.Sequelize.Op;

exports.getCoursesByDepartment = async (req, res) => {
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

        const departmentTitle = req.body.department;
        const organizationId = req.session.user.organization_id;

        const departmentData = await Departments.findOne({
            where: {
                title: departmentTitle,
                organization_id: organizationId
            }
        });

        if (!departmentData) { return res.status(404).json({ error: 'Department not found' }); }

        // mag session dito ng department_id
        req.session.department_id = departmentData.id;
        req.session.department_title = departmentData.title;

        const coursesData = await Courses.findAll({
            where: { department_id: departmentData.id },
        });


        const courseTitleIds = coursesData.map(course => course.course_title_id);


        const courseTitlesData = await Course_titles.findAll({
            where: { id: courseTitleIds }
        });


        const courseTitles = courseTitlesData.map(courseTitle => courseTitle.title);


        if (!courseTitles) { return res.status(404).json({ error: 'Course Titles not found' }); }

        res.json(courseTitles);
    } catch (error) {
        console.error('Error in getCoursesByDepartment:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};



exports.getCoursesByDepartmentId = async (req, res) => {
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

        const departmentId = req.body.departmentId;
        console.log('getCoursesByDepartmentId departmentId : ', departmentId)

        let query = QUERY.getCoursesByDepartmentId
        query += ` WHERE co.department_id = '${departmentId}'`;

        sql.query(query, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                return;
            }

            res.json(result);
        });
    } catch (error) {
        console.error('Error in getCoursesByDepartment:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};