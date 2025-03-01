const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Resources = db.resources;


const Op = db.Sequelize.Op;

exports.pdf = async (req, res) => {
    const getRows = await Resources.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving number Of Trader Members.';
        });
};

exports.resourcesOrderByLatest = async (req, res) => {
    try {
        const data = await Resources.findAll({
            order: [['id', 'DESC']]
        });
        res.send(data);
    } catch (err) {
        console.error('Error occurred while retrieving resources:', err);
        res.status(500).send('Some error occurred while retrieving resources.');
    }
};



exports.getResourcesById = async (req, res) => {
    const resourceId = req.body.resourceId;
    try {
        const resource = await Resources.findOne({
            where: { id: resourceId }
        });

        if (resource) {
            res.send(resource);
        } else {
            res.status(404).send('Resource not found');
        }
    } catch (err) {
        console.error('Error occurred while retrieving resource:', err);
        res.status(500).send('Some error occurred while retrieving resource.');
    }
};