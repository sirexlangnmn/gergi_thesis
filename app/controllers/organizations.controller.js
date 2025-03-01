const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Organizations = db.organizations;

const Op = db.Sequelize.Op;


exports.getAll = async (req, res) => {
    const getRows = await Organizations.findAll()
        .then((data) => {
            console.error('organizationsData : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Organizations.';
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

        const { organizationInput } = req.body;

        let title = organizationInput;

        const data = await Organizations.create({
            title
        });

        return res.status(201).json({
            message: 'create organizations successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during create organizations :', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};