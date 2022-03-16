'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getCoordinateTempList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCoordinatesTemplate ORDER BY EvolveCoordinatesTemplate_ID ASC");
        } catch (error) {
            Evolve.Log.error(" EERR1208: Error while getting Template List "+error.message);
            return new Error(" EERR1208: Error while getting Template List "+error.message);
        }
    },
    getCoordinateList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .query("SELECT EvolveCoordinates_ID, EvolveCoordinatesTemplate_ID, EvolveCoordinates_Name FROM EvolveCoordinates WHERE EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1208: Error while getting Template List "+error.message);
            return new Error(" EERR1208: Error while getting Template List "+error.message);
        }
    },
    getSingleCoordinateData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                .query("SELECT * FROM EvolveCoordinates WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1208: Error while getting Template List "+error.message);
            return new Error(" EERR1208: Error while getting Template List "+error.message);
        }
    },
    updateCoordinates: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinates_ID', Evolve.Sql.Int, data.EvolveCoordinates_ID)
                .input('EvolveCoordinates_X', Evolve.Sql.NVarChar, data.EvolveCoordinates_X)
                .input('EvolveCoordinates_Y', Evolve.Sql.NVarChar, data.EvolveCoordinates_Y)
                .input('EvolveCoordinates_ExtraText', Evolve.Sql.NVarChar, data.EvolveCoordinates_ExtraText)
                .input('EvolveCoordinates_MinX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinX)
                .input('EvolveCoordinates_MaxX', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxX)
                .input('EvolveCoordinates_MaxY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MaxY)
                .input('EvolveCoordinates_MinY', Evolve.Sql.NVarChar, data.EvolveCoordinates_MinY)
                .input('EvolveCoordinates_DiffWithLineNumber', Evolve.Sql.NVarChar, data.EvolveCoordinates_DiffWithLineNumber)

                .input('EvolveCoordinates_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveCoordinates_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query("UPDATE EvolveCoordinates SET EvolveCoordinates_X = @EvolveCoordinates_X, EvolveCoordinates_Y = @EvolveCoordinates_Y, EvolveCoordinates_ExtraText = @EvolveCoordinates_ExtraText, EvolveCoordinates_DiffWithLineNumber = @EvolveCoordinates_DiffWithLineNumber, EvolveCoordinates_MinX = @EvolveCoordinates_MinX, EvolveCoordinates_MaxX = @EvolveCoordinates_MaxX, EvolveCoordinates_MaxY = @EvolveCoordinates_MaxY, EvolveCoordinates_MinY = @EvolveCoordinates_MinY WHERE EvolveCoordinates_ID = @EvolveCoordinates_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1208: Error while getting Template List "+error.message);
            return new Error(" EERR1208: Error while getting Template List "+error.message);
        }
    },
}