const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const sql = require('../models/db.js');
const QUERY = require('../query/join.query.js');

const db = require('../models');

const Resource_setups = db.resource_setups
const Resources = db.resources
const Categories = db.categories

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;


exports.search = async (req, res) => {
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

        const { searchInput, categoryInput, resourceTypeInput } = req.body;

        const searchKeyword = searchInput ? searchInput : '';
        const categoryId = categoryInput ? categoryInput : '';
        const resourceType = resourceTypeInput ? resourceTypeInput : 1;

        if (searchKeyword && categoryId && resourceType) {
            try {
                let query = QUERY.getResources

                const values = [];

                if (searchKeyword) {
                    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?)`;
                    values.push(`%${searchKeyword}%`, `%${searchKeyword}%`);
                    query += ` OR rs.category_id = '${categoryId}'`;
                    query += ` ORDER BY RAND()`;
                }

                sql.query(query, values, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }

        if (!searchKeyword && categoryId && resourceType) {
            try {
                let query = QUERY.getResources2
                query += ` WHERE rs.category_id = '${categoryId}'`;

                sql.query(query, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }

        if (searchKeyword && !categoryId && resourceType) {
            try {
                let query = QUERY.getResources

                const values = [];

                if (searchKeyword) {
                    query += ` WHERE (r.title LIKE ? OR r.ISBN LIKE ?)`;
                    values.push(`%${searchKeyword}%`, `%${searchKeyword}%`);
                    query += ` ORDER BY RAND()`;
                }

                sql.query(query, values, (err, result) => {
                    if (err) {
                        console.log('Error executing query:', err);
                        return;
                    }

                    res.json(result);
                });

            } catch (error) {
                console.error('Error executing query:', error);
            }
        }



    } catch (error) {
        console.error('Error in search:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};







