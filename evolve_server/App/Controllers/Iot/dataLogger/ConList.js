'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async addDeviceData (req, res) {
        const payload = req.body;

        payload.EvolveUser_ID = req.EvolveUser_ID;

        try {
            const result = await Evolve.App.Services.Iot.dataLogger.SrvList.addNewDeviceData(payload);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw(result);
            }
            else {
                res.status(201).json({ 
                    status: 201, 
                    message: "Data added successfully", 
                    result: null 
                });
            }

        }
        catch (error) {
            const message = "Error while add device data";

            Evolve.Log.error(message);
            res.status(500).json({ status: 500, message, result: null });
        }
    }
}