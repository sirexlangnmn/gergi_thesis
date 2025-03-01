const { v4: uuidV4 } = require('uuid');
const { check, validationResult } = require('express-validator');

const db = require('../models');
const sequelizeConfig = require('../config/sequelize.config.js');

const Users = db.users;

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

        // Inserting data into the users table
        const newUser = await Users.create({
            name,
            mobile_number,
            email,
            password,
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