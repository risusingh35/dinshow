'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID ORDER BY EvolveAQIHistory_ID DESC;");
        }
        catch (error) {
            const msg = `Error while get device history ${error.message}`;

            Evolve.Log.Error(msg);
            return new Error(msg);
        }
    },
    async addHistory (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .input('EvolveAQIHistory_AQI', Evolve.Sql.Int, data.EvolveAQIHistory_AQI)
                .input('EvolveAQIHistory_CO', Evolve.Sql.Int, data.EvolveAQIHistory_CO)
                .input('EvolveAQIHistory_CO2', Evolve.Sql.Int, data.EvolveAQIHistory_CO2)
                .input('EvolveAQIHistory_H', Evolve.Sql.Int, data.EvolveAQIHistory_H)
                .input('EvolveAQIHistory_NO2', Evolve.Sql.Int, data.EvolveAQIHistory_NO2)
                .input('EvolveAQIHistory_O3', Evolve.Sql.Int, data.EvolveAQIHistory_O3)
                .input('EvolveAQIHistory_P', Evolve.Sql.Int, data.EvolveAQIHistory_P)
                .input('EvolveAQIHistory_PM10', Evolve.Sql.Int, data.EvolveAQIHistory_PM10)
                .input('EvolveAQIHistory_PM25', Evolve.Sql.Int, data.EvolveAQIHistory_PM25)
                .input('EvolveAQIHistory_PM1', Evolve.Sql.Int, data.EvolveAQIHistory_PM1)
                .input('EvolveAQIHistory_TV', Evolve.Sql.Int, data.EvolveAQIHistory_TV)
                .input('EvolveAQIHistory_SO2', Evolve.Sql.Int, data.EvolveAQIHistory_SO2)
                .input('EvolveAQIHistory_T', Evolve.Sql.Int, data.EvolveAQIHistory_T)
                .input('EvolveAQIHistory_W', Evolve.Sql.Int, data.EvolveAQIHistory_W)
                
                .input('EvolveAQIHistory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveAQIHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveAQIHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveAQIHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)

                .query("INSERT INTO EvolveAQIHistory (EvolveAQIHistory_Device_ID, EvolveAQIHistory_AQI, EvolveAQIHistory_CO, EvolveAQIHistory_CO2, EvolveAQIHistory_H, EvolveAQIHistory_NO2, EvolveAQIHistory_O3, EvolveAQIHistory_P, EvolveAQIHistory_PM10, EvolveAQIHistory_PM25, EvolveAQIHistory_PM1, EvolveAQIHistory_TV, EvolveAQIHistory_SO2, EvolveAQIHistory_T, EvolveAQIHistory_W, EvolveAQIHistory_CreatedUser, EvolveAQIHistory_CreatedAt, EvolveAQIHistory_UpdatedUser, EvolveAQIHistory_UpdatedAt) VALUES (@EvolveAQIHistory_Device_ID, @EvolveAQIHistory_AQI, @EvolveAQIHistory_CO, @EvolveAQIHistory_CO2, @EvolveAQIHistory_H, @EvolveAQIHistory_NO2, @EvolveAQIHistory_O3, @EvolveAQIHistory_P, @EvolveAQIHistory_PM10, @EvolveAQIHistory_PM25, @EvolveAQIHistory_PM1, @EvolveAQIHistory_TV, @EvolveAQIHistory_SO2, @EvolveAQIHistory_T, @EvolveAQIHistory_W, @EvolveAQIHistory_CreatedUser, @EvolveAQIHistory_CreatedAt, @EvolveAQIHistory_UpdatedUser, @EvolveAQIHistory_UpdatedAt);");
        }
        catch (error) {
            const msg = `Error while add detail history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLatestHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT TOP 1 * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID ORDER BY EvolveAQIHistory_ID DESC;");
        }
        catch (error) {
            const msg = `Error while getting device history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastMonthHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID AND EvolveAQIHistory_CreatedAt >= DATEADD(day, -30, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting device history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastWeekHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID AND EvolveAQIHistory_CreatedAt >= DATEADD(day, -7, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting device history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getLastYearHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID AND EvolveAQIHistory_CreatedAt >= DATEADD(day, -365, GETDATE());");
        }
        catch (error) {
            const msg = `Error while getting device history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

    async getTodaysHistory (data) {
        try {
            return await Evolve.SqlPool
                .request()
                .input('EvolveAQIHistory_Device_ID', Evolve.Sql.Int, data.EvolveAQIHistory_Device_ID)
                .query("SELECT * FROM EvolveAQIHistory WHERE EvolveAQIHistory_Device_ID=@EvolveAQIHistory_Device_ID AND convert(varchar, EvolveAQIHistory_CreatedAt, 1) = convert(varchar, getdate(), 1);");
        }
        catch (error) {
            const msg = `Error while getting device history ${error.message}`;
            
            Evolve.Log.error(msg);
            return new Error(msg);
        }
    },

}