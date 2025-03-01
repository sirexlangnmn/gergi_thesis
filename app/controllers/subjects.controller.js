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




exports.getSubjectsByCategoryId = async (req, res) => {
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

        const categoryId = req.body.categoryId;
        console.log('getSubjectsByCategoryId categoryId : ', categoryId)

        let query = QUERY.getSubjectsByCategoryId
        query += ` WHERE su.category_id = '${categoryId}'`;

        sql.query(query, (err, result) => {
            if (err) {
                console.log('Error executing query:', err);
                return;
            }

            res.json(result);
        });

    } catch (error) {
        console.error('Error in getSubjectsByCategoryId:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};