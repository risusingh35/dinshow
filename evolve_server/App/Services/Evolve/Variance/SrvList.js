'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getVarianceAllCount: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT COUNT(EvolveVariance_ID) as count FROM EvolveVariance');
        } catch (error) {
            Evolve.Log.error("EERR2554 : Error while getting Variance List Count "+error.message);
            return new Error("EERR2554 : Error while getting Variance List Count "+error.message);
        }
    },

    getVarianceAll: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT ev.* , evg.EvolveVarianceGroup_Code FROM EvolveVariance ev INNER JOIN EvolveVarianceGroup evg ON evg.EvolveVarianceGroup_ID = ev.EvolveVarianceGroup_ID ORDER BY ev.EvolveVariance_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error("EERR2555 : Error while getting variance list "+error.message);
            return new Error("EERR2555 : Error while getting variance list "+error.message);
        }
    },

    createVarianceGroup: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveVarianceGroup_Code', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Code)
                .input('EvolveVarianceGroup_Name', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Name)
                .input('EvolveVarianceGroup_Description', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Description)
                .input('EvolveVarianceGroup_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVarianceGroup_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveVarianceGroup_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVarianceGroup_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveVarianceGroup (EvolveVarianceGroup_Code , EvolveVarianceGroup_Name , EvolveVarianceGroup_Description ,EvolveVarianceGroup_CreatedAt , EvolveVarianceGroup_CreatedUser , EvolveVarianceGroup_UpdatedAt , EvolveVarianceGroup_UpdatedUser) VALUES(@EvolveVarianceGroup_Code , @EvolveVarianceGroup_Name , @EvolveVarianceGroup_Description ,@EvolveVarianceGroup_CreatedAt ,@EvolveVarianceGroup_CreatedUser  , @EvolveVarianceGroup_UpdatedAt , @EvolveVarianceGroup_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error("EERR2556 : Error while create variance group "+error.message);
            return new Error("EERR2556 : Error while create variance group "+error.message);
        }
    },

    getVarianceGroupAll: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveVarianceGroup ORDER BY EvolveVarianceGroup_ID');
        } catch (error) {
            Evolve.Log.error("EERR2557 : Error while get variance group "+error.message);
            return new Error("EERR2557 : Error while get variance group "+error.message);
        }
    },

    getSingleVarianceGroup : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveVarianceGroup_ID",Evolve.Sql.Int,data.EvolveVarianceGroup_ID)
                .query('SELECT * FROM EvolveVarianceGroup WHERE EvolveVarianceGroup_ID = @EvolveVarianceGroup_ID');
        } catch (error) {
            Evolve.Log.error("Error while get single variance group "+error.message);
            return new Error("Error while get single variance group "+error.message);
        }
    },

    updateVarianceGroup: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveVarianceGroup_ID', Evolve.Sql.Int, data.EvolveVarianceGroup_ID)  
                .input('EvolveVarianceGroup_Code', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Code)
                .input('EvolveVarianceGroup_Name', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Name)
                .input('EvolveVarianceGroup_Description', Evolve.Sql.NVarChar, data.EvolveVarianceGroup_Description)
                .input('EvolveVarianceGroup_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVarianceGroup_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveVarianceGroup SET EvolveVarianceGroup_Code = @EvolveVarianceGroup_Code , EvolveVarianceGroup_Name = @EvolveVarianceGroup_Name , EvolveVarianceGroup_Description = @EvolveVarianceGroup_Description , EvolveVarianceGroup_UpdatedAt = @EvolveVarianceGroup_UpdatedAt , EvolveVarianceGroup_UpdatedUser = @EvolveVarianceGroup_UpdatedUser WHERE EvolveVarianceGroup_ID = @EvolveVarianceGroup_ID');
        } catch (error) {
            Evolve.Log.error("EERR2559 : Error while update variance group"+error.message);
            return new Error("EERR2559 : Error while update variance group "+error.message);
        }
    },

    createVariance: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveVarianceGroup_ID', Evolve.Sql.Int, data.EvolveVarianceGroup_ID)
                .input('EvolveVariance_Code', Evolve.Sql.NVarChar, data.EvolveVariance_Code)
                .input('EvolveVariance_Name', Evolve.Sql.NVarChar, data.EvolveVariance_Name)
                .input('EvolveVariance_Description', Evolve.Sql.NVarChar, data.EvolveVariance_Description)
                .input('EvolveVariance_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVariance_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveVariance_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVariance_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveVariance (EvolveVarianceGroup_ID,EvolveVariance_Code , EvolveVariance_Name , EvolveVariance_Description ,EvolveVariance_CreatedAt , EvolveVariance_CreatedUser , EvolveVariance_UpdatedAt , EvolveVariance_UpdatedUser) VALUES(@EvolveVarianceGroup_ID,@EvolveVariance_Code , @EvolveVariance_Name , @EvolveVariance_Description ,@EvolveVariance_CreatedAt ,@EvolveVariance_CreatedUser  , @EvolveVariance_UpdatedAt , @EvolveVariance_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error("EERR2560 : Error while create variance "+error.message);
            return new Error("EERR2560 : Error while create variance "+error.message);
        }
    },

    getSingleVariance : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveVariance_ID",Evolve.Sql.Int,data.EvolveVariance_ID)
                .query('SELECT * FROM EvolveVariance WHERE EvolveVariance_ID = @EvolveVariance_ID');
        } catch (error) {
            Evolve.Log.error("EERR2561 : Error while get single variance "+error.message);
            return new Error("EERR2561 : Error while get single variance "+error.message);
        }
    },

    updateVariance: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveVariance_ID', Evolve.Sql.Int, data.EvolveVariance_ID)
                .input('EvolveVarianceGroup_ID', Evolve.Sql.Int, data.EvolveVarianceGroup_ID)
                .input('EvolveVariance_Code', Evolve.Sql.NVarChar, data.EvolveVariance_Code)
                .input('EvolveVariance_Name', Evolve.Sql.NVarChar, data.EvolveVariance_Name)
                .input('EvolveVariance_Description', Evolve.Sql.NVarChar, data.EvolveVariance_Description)
                .input('EvolveVariance_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveVariance_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveVariance SET EvolveVarianceGroup_ID = @EvolveVarianceGroup_ID ,EvolveVariance_Code = @EvolveVariance_Code , EvolveVariance_Name = @EvolveVariance_Code , EvolveVariance_Description = @EvolveVariance_Description , EvolveVariance_UpdatedAt = @EvolveVariance_UpdatedAt  , EvolveVariance_UpdatedUser = @EvolveVariance_UpdatedUser WHERE EvolveVariance_ID = @EvolveVariance_ID');
        } catch (error) {
            Evolve.Log.error("EERR2562 : Error while update variance "+error.message);
            return new Error("EERR2562 : Error while update variance "+error.message);
        }
    },
}