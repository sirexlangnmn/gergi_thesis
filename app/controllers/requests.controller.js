const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Departments = db.departments;
const Courses = db.courses;
const Course_titles = db.course_titles
const Requests = db.requests
const Resource_setups = db.resource_setups
const Resource_saves = db.resource_saves
const Resources = db.resources

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;



exports.saveRequestBook = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }

        const { sessionUserId, bookTitle, author, isbn, instructions } = req.body;

        try {
            const newSave = await Requests.create({
                user_id: sessionUserId,
                book_title: bookTitle,
                author,
                isbn,
                instructions,
                createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });

            if (newSave) {
                return res.status(200).json({ message: 'Book request save successful', added: newSave });
            } else {
                throw new Error('Failed to save book request');
            }

        } catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Failed to save  book request' });
        }

    } catch (error) {
        console.error('Error in saveRequestBook:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};



// exports.getRequestedBooks = async (req, res) => {
//     const errors = validationResult(req);

//     try {
//         if (!errors.isEmpty()) {
//             return res.status(200).send({
//                 message: errors.array(),
//             });
//         }

//         const { sessionUserId } = req.body;

//         try {
//             const requests = await Requests.findAll({ where: { user_id: sessionUserId } });

//             if (requests) {
//                 return res.status(200).json({ message: 'Get book request successful', requests });
//             } else {
//                 throw new Error('Failed to get book request');
//             }

//         } catch (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).json({ error: 'Failed to get book request' });
//         }

//     } catch (error) {
//         console.error('Error in getRequestedBooks:', error);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// };



exports.getRequestedBooks = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }

        const { sessionUserId } = req.body;

        try {
            const requests = await Requests.findAll({
                where: { user_id: sessionUserId },
                order: [['createdAt', 'DESC']] // <-- Order by latest created
            });

            if (requests) {
                return res.status(200).json({
                    message: 'Get book request successful',
                    requests
                });
            } else {
                throw new Error('Failed to get book request');
            }

        } catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Failed to get book request' });
        }

    } catch (error) {
        console.error('Error in getRequestedBooks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};




exports.getAllRequestedBooks = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(200).send({
                message: errors.array(),
            });
        }


        try {
            const requests = await Requests.findAll({
                order: [['createdAt', 'DESC']] // <-- Order by latest created
            });

            if (requests) {
                return res.status(200).json({
                    message: 'Get book request successful',
                    requests
                });
            } else {
                throw new Error('Failed to get book request');
            }

        } catch (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Failed to get book request' });
        }

    } catch (error) {
        console.error('Error in getRequestedBooks:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};