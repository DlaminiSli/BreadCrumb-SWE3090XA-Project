const ComboDeal = require("../models/ComboDeal");

exports.getDeals = async (req, res) => {

    try {

        const deals = await ComboDeal.find();

        res.json(deals);

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};