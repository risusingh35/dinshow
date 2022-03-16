'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    
    async getHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getHistory(payload);
            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'History of AQI device';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                status: 'success', 
                statusCode, 
                result 
            });
        }
        catch (error) {
            const message = "Error while getting device history";
            Evolve.Log.error(message);
            return res.status(500).json({
                statusCode: 400,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    async addHistory (req, res) {
        const payload = req.body;

        payload.EvolveUser_ID = req.EvolveUser_ID;

        try {
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.addHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                return res.status(200).json({
                    statusCode: 200,
                    status: 'success',
                    message: 'History saved',
                    result: response.recordset
                });
            }
        }
        catch (error) {
            const message = "Error while save device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                statusCode: 500,
                status: 'fail',
                result: null
            });
        }
    },

    // Save device history without user id
    async saveDeviceHistory (req, res) {
        const payload = req.query;
        const data = {};
        
        data.EvolveAQIHistory_Device_ID = Number(payload.id);
        data.EvolveAQIHistory_AQI = payload.aqi;
        data.EvolveAQIHistory_CO = payload.co;
        data.EvolveAQIHistory_CO2 = payload.co2;
        data.EvolveAQIHistory_H = payload.h;
        data.EvolveAQIHistory_NO2 = payload.no2;
        data.EvolveAQIHistory_O3 = payload.o3;
        data.EvolveAQIHistory_P = payload.p;
        data.EvolveAQIHistory_PM10 = payload.pm10;
        data.EvolveAQIHistory_PM25 = payload.pm25;
        data.EvolveAQIHistory_PM1 = payload.pm1;
        data.EvolveAQIHistory_TV = payload.tv;
        data.EvolveAQIHistory_SO2 = payload.so2;
        data.EvolveAQIHistory_T = payload.t;
        data.EvolveAQIHistory_W = payload.w;
        
        try {
            const result = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.addHistory(data);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw(result);
            }
            else {
                res.status(201).json({ 
                    statusCode: 201,
                    status: 'success', 
                    message: "History saved"
                });
            }
        }
        catch (error) {
            const message = "Error while save device history";

            Evolve.Log.error(message);
            res.status(400).json({ 
                statusCode: 400, 
                message, 
                status: 'fail',
                result: null 
            });
        }
    },

    async getLatestHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getLatestHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Latest history of device';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                statusCode,
                status: 'success', 
                result 
            });
        }
        catch (error) {
            const message = "Error while get device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },

    async getLastMonthHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getLastMonthHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Device history';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                statusCode,
                status: 'success', 
                result 
            });
        }
        catch (error) {
            const message = "Error while get device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },

    async getLastWeekHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getLastWeekHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Device history';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                statusCode,
                status: 'success', 
                result 
            });
        }
        catch (error) {
            const message = "Error while get device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },

    async getLastYearHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getLastYearHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Device history';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                statusCode,
                status: 'success', 
                result 
            });
        }
        catch (error) {
            const message = "Error while get device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },

    async getTodaysHistory (req, res) {
        const payload = req.body;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.AQIDeviceHistory.SrvList.getTodaysHistory(payload);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Device history';
                result = response.recordset;
            }

            return res.status(statusCode).json({ 
                message, 
                statusCode,
                status: 'success', 
                result 
            });
        }
        catch (error) {
            const message = "Error while get device history";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    }
};