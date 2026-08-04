const Catalogue = require("../models/Catalogue");

exports.getCatalogues = async (req, res) => {

    try {

        const catalogues = await Catalogue.find();

        res.json(catalogues);

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};