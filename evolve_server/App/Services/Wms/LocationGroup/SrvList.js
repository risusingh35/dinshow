'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    
    checkLocationGroup: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocationGroup_Code', Evolve.Sql.NVarChar, data.EvolveLocationGroup_Code)

                .query("SELECT  EvolveLocationGroup_Code FROM EvolveLocationGroup   WHERE EvolveLocationGroup_Code=@EvolveLocationGroup_Code ");

        } catch (error) {
            Evolve.Log.error(" EERR1293: Error while check location group "+error.message);
            return new Error(" EERR1293: Error while check location group "+error.message);
        }
    },


    addLocationGroup: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLocationGroup_Code', Evolve.Sql.NVarChar, data.EvolveLocationGroup_Code)
                .input('EvolveLocationGroup_Status', Evolve.Sql.Bit, data.EvolveLocationGroup_Status)
                .input('EvolveLocationGroup_Sequence', Evolve.Sql.Int, data.EvolveLocationGroup_Sequence)
                .input('EvolveLocationGroup_Description', Evolve.Sql.NVarChar, data.EvolveLocationGroup_Description)
                .input('EvolveLocationGroup_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocationGroup_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveLocationGroup_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocationGroup_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveLocationGroup (EvolveLocationGroup_Description , EvolveLocationGroup_Sequence ,EvolveLocationGroup_Code, EvolveLocationGroup_Status,EvolveLocationGroup_CreatedAt, EvolveLocationGroup_CreatedUser, EvolveLocationGroup_UpdatedAt, EvolveLocationGroup_UpdatedUser)VALUES(@EvolveLocationGroup_Description , @EvolveLocationGroup_Sequence ,@EvolveLocationGroup_Code, @EvolveLocationGroup_Status, @EvolveLocationGroup_CreatedAt, @EvolveLocationGroup_CreatedUser, @EvolveLocationGroup_UpdatedAt, @EvolveLocationGroup_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1293: Error while adding location group "+error.message);
            return new Error(" EERR1293: Error while adding location group "+error.message);
        }
    },

    getLocationGroupListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveLocationGroup_ID) AS count FROM EvolveLocationGroup WHERE EvolveLocationGroup_Name LIKE @search OR EvolveLocationGroup_Code LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR1294: Error while getting Location Group List Count "+error.message);
            return new Error(" EERR1294: Error while getting Location Group List Count "+error.message);
        }
    },
    getLocationGroupList: async function () {
        try {
            return await Evolve.SqlPool.request()

                .query("SELECT * FROM EvolveLocationGroup  ORDER BY EvolveLocationGroup_ID desc");

        } catch (error) {
            Evolve.Log.error(" EERR1295: Error while getting Location Group List "+error.message);
            return new Error(" EERR1295: Error while getting Location Group List "+error.message);
        }
    },
    getSingleLocationGroup: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .query("SELECT * FROM EvolveLocationGroup WHERE EvolveLocationGroup_ID = @EvolveLocationGroup_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1296: Error while getting Single Location Group "+error.message);
            return new Error(" EERR1296: Error while getting Single Location Group "+error.message);
        }
    },
    updateLocationGroup: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveLocationGroup_ID', Evolve.Sql.Int, data.EvolveLocationGroup_ID)
                .input('EvolveLocationGroup_Name', Evolve.Sql.NVarChar, data.EvolveLocationGroup_Name)
                .input('EvolveLocationGroup_Code', Evolve.Sql.NVarChar, data.EvolveLocationGroup_Code)
                .input('EvolveLocationGroup_Status', Evolve.Sql.Bit, data.EvolveLocationGroup_Status)
                .input('EvolveLocationGroup_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveLocationGroup_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveLocationGroup SET EvolveLocationGroup_Name = @EvolveLocationGroup_Name, EvolveLocationGroup_Code = @EvolveLocationGroup_Code, EvolveLocationGroup_Status = @EvolveLocationGroup_Status, EvolveLocationGroup_UpdatedAt = @EvolveLocationGroup_UpdatedAt, EvolveLocationGroup_UpdatedUser = @EvolveLocationGroup_UpdatedUser WHERE EvolveLocationGroup_ID = @EvolveLocationGroup_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1297: Error while updating Location Group "+error.message);
            return new Error(" EERR1297: Error while updating Location Group "+error.message);
        }
    },



}