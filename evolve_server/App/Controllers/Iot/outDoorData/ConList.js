'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {

    /**
     * Get detail of specific device
     * @async 
     */
    async getDetailsByDeviceId (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getDetails(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'List of IoT devices';
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
            const message = "Error while get details of device";

            Evolve.Log.error(message);

            return res.status(500).json({
                statusCode: 400,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    /**
     * Get latest inserted record
     * @async 
     */
    async getLatestDetail (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getLatestDetailOfDevice(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                return res.status(200).json({
                    statusCode: 200,
                    status: 'success',
                    message: 'Device info',
                    result: response.recordset
                });
            }
        }
        catch (error) {
            const message = "Error while getting device detail";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                statusCode: 500,
                status: 'fail',
                result: null
            });
        }
    },

    /**
     * Add new detail of device
     * @async
     */
    async addNewDetail (req, res) {
        const payload = req.query;
        const data = {};
        
        data.EvolveIoTDeviceDetail_DeviceId = Number(payload.id);
        data.EvolveIoTDeviceDetail_AQI = payload.aqi;
        data.EvolveIoTDeviceDetail_CO = payload.co;
        data.EvolveIoTDeviceDetail_CO2 = payload.co2;
        data.EvolveIoTDeviceDetail_H = payload.h;
        data.EvolveIoTDeviceDetail_NO2 = payload.no2;
        data.EvolveIoTDeviceDetail_O3 = payload.o3;
        data.EvolveIoTDeviceDetail_P = payload.p;
        data.EvolveIoTDeviceDetail_PM10 = payload.pm10;
        data.EvolveIoTDeviceDetail_PM25 = payload.pm25;
        data.EvolveIoTDeviceDetail_PM1 = payload.pm1;
        data.EvolveIoTDeviceDetail_TV = payload.tv;
        data.EvolveIoTDeviceDetail_SO2 = payload.so2;
        data.EvolveIoTDeviceDetail_T = payload.t;
        data.EvolveIoTDeviceDetail_W = payload.w;
        
        try {
            const result = await Evolve.App.Services.Iot.outDoorData.SrvList.addDetail(data);

            if (result instanceof Error || result.rowsAffected < 1) {
                throw(result);
            }
            else {
                res.status(201).json({ 
                    statusCode: 201,
                    status: 'success', 
                    message: "Detail added successfully"
                });
            }
        }
        catch (error) {
            const message = "Error while add detail of device";

            Evolve.Log.error(message);
            res.status(400).json({ 
                statusCode: 400, 
                message, 
                status: 'fail',
                result: null 
            });
        }
    },

    async getLastMonthDeviceDetail (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getLastMonthDeviceDetail(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Last month details of IoT devices';
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
            const message = "Error while get last month details of device";

            Evolve.Log.error(message);

            return res.status(500).json({
                message,
                result: null
            });
        }
    },

    async getLastYearDeviceDetail (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getLastYearDeviceDetail(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Last month details of IoT devices';
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
            const message = "Error while get last month details of device";

            Evolve.Log.error(message);

            return res.status(500).json({
                statusCode: 500,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    async getLastWeekDeviceDetail (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getLastWeekDeviceDetail(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = 'Last week details of IoT devices';
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
            const message = "Error while get last week details of device";

            Evolve.Log.error(message);

            return res.status(400).json({
                statusCode: 400,
                status: 'fail',
                message,
                result: null
            });
        }
    },

    async getTodayDeviceDetail (req, res) {
        /** @type {number} */
        const deviceId = req.body.EvolveIoTDeviceDetail_DeviceId;

        try {
            let statusCode, message, result = null;
            const response = await Evolve.App.Services.Iot.outDoorData.SrvList.getTodayDeviceDetail(deviceId);

            if (response instanceof Error) {
                throw(response);
            }
            else {
                statusCode = 200;
                message = "Today's details of IoT devices";
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
            const message = "Error while get today's details of device";

            Evolve.Log.error(message);

            return res.status(400).json({
                message,
                statusCode: 400,
                status: 'fail',
                result: null
            });
        }
    }
};