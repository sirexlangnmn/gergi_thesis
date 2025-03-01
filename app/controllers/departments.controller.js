const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Organizations = db.organizations;
const Departments = db.departments;

const Op = db.Sequelize.Op;

exports.getDepartmentsByOrganization = async (req, res) => {
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
        const { organizationId } = req.body;

        const departmentsData = await Departments.findAll({ where: { organization_id: organizationId } });

        if (!departmentsData) { return res.status(404).json({ error: 'Departments not found' }); }

        res.json(departmentsData);
    } catch (error) {
        console.error('Error in getDepartmentsByOrganization:', error);

        return res.status(500).json({ error: 'Internal server error' });
    }

};


exports.getAll = async (req, res) => {
    const getRows = await Departments.findAll()
        .then((data) => {
            console.error('Departments : ', data);
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving Departments.';
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

        const { departmentInput } = req.body;

        let title = departmentInput;

        console.log('title : ', title)
        console.log('departmentInput : ', departmentInput)

        const data = await Departments.create({
            title
        });

        return res.status(201).json({
            message: 'create departments successfully',
            data: data,
        });
    } catch (error) {
        console.error('Error during create departments :', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};