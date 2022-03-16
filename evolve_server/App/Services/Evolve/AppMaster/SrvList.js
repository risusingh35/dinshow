'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllAppListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(EvolveApp_ID) as count  FROM EvolveApp WHERE EvolveApp_Code LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR32527: Error while getting App List Count "+error.message);
            return new Error(" EERR32527: Error while getting App List Count "+error.message);
        }
    },

    getAllAppList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT * FROM EvolveApp WHERE EvolveApp_Code LIKE @search ORDER BY EvolveApp_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR32528: Error while getting App List "+error.message);
            return new Error(" EERR32528: Error while getting App List "+error.message);
        }
    },

    selectSingleApp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
                .query('SELECT * FROM EvolveApp WHERE EvolveApp_ID = @EvolveApp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32529: Error while getting Single App "+error.message);
            return new Error(" EERR32529: Error while getting Single App "+error.message);
        }
    },
    
    getSeqenceId: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT  MAX(EvolveApp_SEQ)+1 as EvolveApp_SEQ FROM  EvolveApp');
        } catch (error) {
            Evolve.Log.error(" EERR32530: Error while getting sequence id "+error.message);
            return new Error(" EERR32530: Error while getting sequence id "+error.message);
        }
    },

    addNewApp: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveApp_Code', Evolve.Sql.NVarChar, data.EvolveApp_Code)
                .input('EvolveApp_Name', Evolve.Sql.NVarChar, data.EvolveApp_Name)
                .input('EvolveApp_Description', Evolve.Sql.NVarChar, data.EvolveApp_Description)
                .input('EvolveApp_Url', Evolve.Sql.NVarChar, data.EvolveApp_Url)
                .input('EvolveApp_SEQ', Evolve.Sql.Int, data.EvolveApp_SEQ)
                .input('EvolveApp_Status', Evolve.Sql.NVarChar, data.EvolveApp_Status)
                .input('EvolveApp_Icon', Evolve.Sql.NVarChar, data.EvolveApp_Icon)
                .input('EvolveApp_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveApp_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveApp_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveApp (EvolveApp_Code, EvolveApp_Name, EvolveApp_Description, EvolveApp_Url, EvolveApp_SEQ, EvolveApp_Status, EvolveApp_Icon, EvolveApp_CreatedAt, EvolveApp_CreatedUser, EvolveApp_UpdatedAt, EvolveApp_UpdatedUser) VALUES (@EvolveApp_Code, @EvolveApp_Name, @EvolveApp_Description, @EvolveApp_Url, @EvolveApp_SEQ, @EvolveApp_Status, @EvolveApp_Icon, @EvolveApp_CreatedAt, @EvolveApp_CreatedUser, @EvolveApp_UpdatedAt, @EvolveApp_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR32531: Error while Adding App "+error.message);
            return new Error(" EERR32531: Error while Adding App "+error.message);
        }
    },

    checkSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.Int, EvolveApp_SEQ)
                .query(' SELECT * FROM EvolveApp WHERE EvolveApp_SEQ = @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR32532: Error while checking sequence number "+error.message);
            return new Error(" EERR32532: Error while checking sequence number "+error.message);
        }
    },

    updateSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.NVarChar, EvolveApp_SEQ)
            .query(' UPDATE EvolveApp set EvolveApp_SEQ = EvolveApp_SEQ+1 WHERE EvolveApp_SEQ >= @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR32533: Error while updating seq number "+error.message);
            return new Error(" EERR32533: Error while updating seq number "+error.message);
        }
    },

    updateApp: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_ID', Evolve.Sql.NVarChar, data.EvolveApp_ID)
            .input('EvolveApp_Code', Evolve.Sql.NVarChar, data.EvolveApp_Code)
            .input('EvolveApp_Name', Evolve.Sql.NVarChar, data.EvolveApp_Name)
            .input('EvolveApp_Description', Evolve.Sql.NVarChar, data.EvolveApp_Description)
            .input('EvolveApp_Url', Evolve.Sql.NVarChar, data.EvolveApp_Url)
            .input('EvolveApp_SEQ', Evolve.Sql.Int, data.EvolveApp_SEQ)
            .input('EvolveApp_Status', Evolve.Sql.NVarChar, data.EvolveApp_Status)
            .input('EvolveApp_Icon', Evolve.Sql.NVarChar, data.EvolveApp_Icon)
            .input('EvolveApp_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveApp_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveApp SET EvolveApp_Code = @EvolveApp_Code, EvolveApp_Name = @EvolveApp_Name, EvolveApp_Description = @EvolveApp_Description, EvolveApp_Url = @EvolveApp_Url, EvolveApp_SEQ = @EvolveApp_SEQ, EvolveApp_Status = @EvolveApp_Status, EvolveApp_Icon = @EvolveApp_Icon, EvolveApp_UpdatedAt = @EvolveApp_UpdatedAt, EvolveApp_UpdatedUser = @EvolveApp_UpdatedUser WHERE EvolveApp_ID = @EvolveApp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR32534: Error while updating App "+error.message);
            return new Error(" EERR32534: Error while updating App "+error.message);
        }
    },

}