const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Users = db.users;
const Organizations = db.organizations;

const Op = db.Sequelize.Op;

exports.registration = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array(),
            });
        }

        const { fullNameInput, mobileNumberInput, emailAddressInput, passwordInput } = req.body;

        let name = fullNameInput;
        let mobile_number = mobileNumberInput;
        let email = emailAddressInput;
        let password = passwordInput;
        let user_type = 2; // client

        // Inserting data into the users table
        const newUser = await Users.create({
            name,
            mobile_number,
            email,
            password,
            user_type,
        });

        return res.status(201).json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};


// exports.login = async (req, res) => {
//     const errors = validationResult(req);

//     try {
//         if (!errors.isEmpty()) {
//             return res.status(400).send({
//                 message: errors.array(),
//             });
//         }

//         const { emailAddressInput, passwordInput } = req.body;

//         let email = emailAddressInput;
//         let password = passwordInput;

//         // other code here for login

//     } catch (error) {
//         console.error('Error during user registration:', error);
//         return res.status(500).json({
//             error: {
//                 message: 'Internal server error',
//             },
//         });
//     }
// };


exports.login = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array(),
            });
        }

        const { emailAddressInput, passwordInput } = req.body;
        console.log('req.body', req.body)

        const user = await Users.findOne({ where: { email: emailAddressInput } });


        if (!user) {
            return res.status(401).json({
                error: {
                    message: 'The email address or password is incorrect. Please retry.'
                }
            });
        }


        if (passwordInput === user.password) {
            let sessionUser = {
                name: user.name,
                email: user.email,
                user_type: user.user_type,
                organization_id:  user.organization_id
            };

            req.session.user = sessionUser
            return res.status(200).json({ message: 'Login successful', user });
        } else {
            // return res.status(401).json({ error: { message: 'The email address or password is incorrect. Please retry.' } });
            return res.status(401).json({ error: {
                message: 'The email address or password is incorrect. Please retry.',
            }});
        }


    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};

exports.getUsers = async (req, res) => {
    const getRows = await Users.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            return 'Some error occurred while retrieving users.';
        });
};


exports.update = async (req, res) => {
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array(),
            });
        }

        const { id, organization_id } = req.body;
        console.log(`req.body ===> `, req.body)

        // Check if the user exists
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        // Update user details
        await user.update({
            organization_id,
            updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });

        return res.status(200).json({
            message: 'User updated successfully',
            user,
        });
    } catch (error) {
        console.error('Error during user update:', error);
        return res.status(500).json({
            error: {
                message: 'Internal server error',
            },
        });
    }
};
