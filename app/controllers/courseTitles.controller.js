const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Course_titles = db.course_titles;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Course_titles.findAll()
        .then((data) => {
            console.error('Course_titles : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Course_titles.';
        });
};


exports.create = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array(),
            });
        }

        const { courseInput } = req.body;

        let title = courseInput;

        const data = await Course_titles.create({
            title
        });

        return res.status(201).json({
            message: 'create course_titles successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during create course_titles :', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};