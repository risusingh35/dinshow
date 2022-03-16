'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getDetails (deviceId) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId ORDER BY EvolveIoTDeviceDetail_Id");
        }
        catch (error) {
            const msg = `Error while device detail ${error.message}`;

            Evolve.Log.Error(msg);
            return new Error(msg);
        }
    },

    async addDetail (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_DeviceId)
                .input('EvolveIoTDeviceDetail_AQI', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_AQI)
                .input('EvolveIoTDeviceDetail_CO', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_CO)
                .input('EvolveIoTDeviceDetail_CO2', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_CO2)
                .input('EvolveIoTDeviceDetail_H', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_H)
                .input('EvolveIoTDeviceDetail_NO2', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_NO2)
                .input('EvolveIoTDeviceDetail_O3', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_O3)
                .input('EvolveIoTDeviceDetail_P', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_P)
                .input('EvolveIoTDeviceDetail_PM10', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_PM10)
                .input('EvolveIoTDeviceDetail_PM25', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_PM25)
                .input('EvolveIoTDeviceDetail_PM1', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_PM1)
                .input('EvolveIoTDeviceDetail_TV', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_TV)
                .input('EvolveIoTDeviceDetail_SO2', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_SO2)
                .input('EvolveIoTDeviceDetail_T', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_T)
                .input('EvolveIoTDeviceDetail_W', Evolve.Sql.Int, data.EvolveIoTDeviceDetail_W)
                .input('EvolveIoTDeviceDetail_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolveIoTDeviceDetail (EvolveIoTDeviceDetail_DeviceId, EvolveIoTDeviceDetail_AQI, EvolveIoTDeviceDetail_CO, EvolveIoTDeviceDetail_CO2, EvolveIoTDeviceDetail_H, EvolveIoTDeviceDetail_NO2, EvolveIoTDeviceDetail_O3, EvolveIoTDeviceDetail_P, EvolveIoTDeviceDetail_PM10, EvolveIoTDeviceDetail_PM25, EvolveIoTDeviceDetail_PM1, EvolveIoTDeviceDetail_TV, EvolveIoTDeviceDetail_SO2, EvolveIoTDeviceDetail_T, EvolveIoTDeviceDetail_W, EvolveIoTDeviceDetail_CreatedAt) VALUES (@EvolveIoTDeviceDetail_DeviceId, @EvolveIoTDeviceDetail_AQI, @EvolveIoTDeviceDetail_CO, @EvolveIoTDeviceDetail_CO2, @EvolveIoTDeviceDetail_H, @EvolveIoTDeviceDetail_NO2, @EvolveIoTDeviceDetail_O3, @EvolveIoTDeviceDetail_P, @EvolveIoTDeviceDetail_PM10, @EvolveIoTDeviceDetail_PM25, @EvolveIoTDeviceDetail_PM1, @EvolveIoTDeviceDetail_TV, @EvolveIoTDeviceDetail_SO2, @EvolveIoTDeviceDetail_T, @EvolveIoTDeviceDetail_W, @EvolveIoTDeviceDetail_CreatedAt);");
        }
        catch (error) {
            const msg = `Error while add detail of deviced ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLatestDetailOfDevice (deviceId) {
    
        // to number
        if (typeof deviceId === 'string') {
            deviceId = Number(deviceId);
        }

        // in case of Undefined or NaN
        if (!deviceId) {
            throw("Invalid device id");
        }

        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT TOP 1 * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId ORDER BY EvolveIoTDeviceDetail_Id DESC;");
        }
        catch (error) {
            const msg = `Error while getting device info ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastMonthDeviceDetail (deviceId) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId AND EvolveIoTDeviceDetail_CreatedAt >= DATEADD(day, -30, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting last month device detail ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastWeekDeviceDetail (deviceId) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId AND EvolveIoTDeviceDetail_CreatedAt >= DATEADD(day, -7, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting last week device detail ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastYearDeviceDetail (deviceId) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId AND EvolveIoTDeviceDetail_CreatedAt >= DATEADD(day, -365, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting last year device detail ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getTodayDeviceDetail (deviceId) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveIoTDeviceDetail_DeviceId', Evolve.Sql.Int, deviceId)
                .query("SELECT * FROM EvolveIoTDeviceDetail WHERE EvolveIoTDeviceDetail_DeviceId=@EvolveIoTDeviceDetail_DeviceId AND convert(varchar, EvolveIoTDeviceDetail_CreatedAt, 1) = convert(varchar, getdate(), 1);");
        }
        catch (error) {
            const msg = `Error while getting today's device detail ${error.message}`;

            Evolve.Log.error(msg);
            return new Error(msg);
        }
    }
};