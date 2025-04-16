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
const Resource_saves = db.resource_saves
const Resources = db.resources

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;




// exports.saveAsFavorite = async (req, res) => {
//     const errors = validationResult(req);

//     try {
//         if (!errors.isEmpty()) {
//             return res.status(200).send({
//                 message: errors.array(),
//             });
//         }

//         const { bookId, sessionUserId } = req.body;

//         try {
//             // Sequelize insert query here
//             const newSave = await Resource_saves.create({
//                 resource_id: bookId,
//                 user_id: sessionUserId,
//                 createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
//                 updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
//             });

//             if (newSave) {
//                 return res.status(200).json({ message: 'Resource save successful', resource: newSave });
//             } else {
//                 throw new Error('Failed to save resource');
//             }
//         } catch (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).json({ error: 'Failed to save resource' });
//         }

//     } catch (error) {
//         console.error('Error in resourceSave:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };




exports.saveAsFavorite = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }

        const { bookId, sessionUserId } = req.body;

        try {
            const existingSave = await Resource_saves.findOne({
                where: {
                    resource_id: bookId,
                    user_id: sessionUserId
                }
            });

            if (existingSave) {
                return res.status(200).json({ message: 'Resource already saved as favorite' });
            }

            const newSave = await Resource_saves.create({
                resource_id: bookId,
                user_id: sessionUserId,
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            if (newSave) {
                return res.status(200).json({ message: 'Resource save successful', resource: newSave });
            } else {
                throw new Error('Failed to save resource');
            }

        } catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Failed to save resource' });
        }

    } catch (error) {
        console.error('Error in resourceSave:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
