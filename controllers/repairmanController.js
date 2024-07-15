const Repairman = require('../models/repairmansModel');

exports.getAllRepairmans = async (req, res) => {
    try {
        let filter = {};

        if (req.params.serviceId) {
            filter = { service: req.params.serviceId };
        }

        const repairmans = await Repairman.find(filter);

        res.status(200).json({
            status: 'success',
            result: repairmans.length,
            data: { repairmans }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.createRepairman = async (req, res) => { // Added "async" here
    try {
        if (!req.body.service) req.body.service = req.params.serviceId;
        if (!req.body.user) req.body.user = req.user.id;

        const newRepairman = await Repairman.create(req.body);

        res.status(201).json({
            status: 'success',
            message: "New review created", // Corrected to "created"
            data: { newRepairman }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
}
