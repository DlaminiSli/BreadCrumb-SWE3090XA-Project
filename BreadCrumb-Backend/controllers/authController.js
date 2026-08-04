const User = require("../models/User");

exports.syncUser = async (req, res) => {

    try {

        const {
            firebaseUID,
            fullName,
            email,
            country,
            countryCode,
            phoneNumber
        } = req.body;

        let user = await User.findOne({ firebaseUID });

        if (!user) {

            user = await User.create({

                firebaseUID,
                fullName,
                email,
                country,
                countryCode,
                phoneNumber

            });

            return res.status(201).json({

                success: true,
                message: "User created successfully.",
                user

            });

        }

        res.status(200).json({

            success: true,
            message: "User already exists.",
            user

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// ======================================
// GET LOGGED-IN USER PROFILE
// ======================================

exports.getProfile = async (req, res) => {

    try {

        const user = await User.findOne({

            firebaseUID: req.user.uid

        });

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        res.status(200).json({

            success: true,
            user

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

exports.updateProfile = async (req, res) => {

    try {

        const {
            fullName,
            phoneNumber,
            country,
            countryCode
        } = req.body;

        const user = await User.findOneAndUpdate(

            {
                firebaseUID: req.user.uid
            },

            {
                fullName,
                phoneNumber,
                country,
                countryCode
            },

            {
                new: true
            }

        );

        if (!user) {

            return res.status(404).json({

                success: false,
                message: "User not found."

            });

        }

        res.json({

            success: true,
            message: "Profile updated successfully.",

            user

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};