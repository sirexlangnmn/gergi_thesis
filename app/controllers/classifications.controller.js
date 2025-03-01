const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Classifications = db.classifications;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Classifications.findAll()
        .then((data) => {
            console.error('Classifications : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Classifications.';
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

        const { classificationInput } = req.body;

        let title = classificationInput;

        const data = await Classifications.create({
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