const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models/index.js');
const sequelizeConfig = require('../config/sequelize.config.js');

const Subject_titles = db.subject_titles;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Subject_titles.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Subject_titles.';
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

        const { subjectInput } = req.body;

        let title = subjectInput;

        const data = await Subject_titles.create({
            title
        });

        return res.status(201).json({
            message: 'create classification successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during create classification :', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};