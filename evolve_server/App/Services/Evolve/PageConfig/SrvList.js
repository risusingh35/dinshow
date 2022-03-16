'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMenuUrl: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveMenu_Id, EvolveMenu_Url FROM EvolveMenu');
        } catch (error) {
            Evolve.Log.error(" EERR1341: Error while getting menu url "+error.message);
            return new Error(" EERR1341: Error while getting menu url "+error.message);
        }
    },
    addPageConfig: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
                .input('EvolvePageConfig_Key', Evolve.Sql.NVarChar, data.EvolvePageConfig_Key)
                .input('EvolvePageConfig_Value', Evolve.Sql.Bit, data.EvolvePageConfig_Value)
                .input('EvolvePageConfig_Desc', Evolve.Sql.NVarChar, data.EvolvePageConfig_Desc)

                .input('EvolvePageConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePageConfig_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolvePageConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePageConfig_UpdatedAt', Evolve.Sql.NVarChar, dateTime)

                .query('INSERT INTO EvolvePageConfig (EvolveMenu_Id, EvolvePageConfig_Key, EvolvePageConfig_Value, EvolvePageConfig_Desc, EvolvePageConfig_CreatedUser, EvolvePageConfig_CreatedAt, EvolvePageConfig_UpdatedUser, EvolvePageConfig_UpdatedAt)VALUES (@EvolveMenu_Id, @EvolvePageConfig_Key, @EvolvePageConfig_Value, @EvolvePageConfig_Desc, @EvolvePageConfig_CreatedUser, @EvolvePageConfig_CreatedAt, @EvolvePageConfig_UpdatedUser, @EvolvePageConfig_UpdatedAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1342: Error while adding page config "+error.message);
            return new Error(" EERR1342: Error while adding page config "+error.message);
        }
    },


    getPageConfigListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()   
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT COUNT(epc.EvolvePageConfig_ID) AS count FROM EvolvePageConfig epc,EvolveMenu em WHERE epc.EvolveMenu_Id = em.EvolveMenu_Id AND em.EvolveMenu_Name LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1343: Error while getting Page Config List Count "+error.message);
            return new Error(" EERR1343: Error while getting Page Config List Count "+error.message);
        }
    },

    getPageConfigList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT epc.EvolvePageConfig_ID, em.EvolveMenu_Name, em.EvolveMenu_Url, epc.EvolvePageConfig_Key, epc.EvolvePageConfig_Value FROM EvolvePageConfig epc, EvolveMenu em WHERE epc.EvolveMenu_Id = em.EvolveMenu_Id AND em.EvolveMenu_Name LIKE @search ORDER BY epc.EvolveMenu_Id OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1344: Error while getting Page Config List "+error.message);
            return new Error(" EERR1344: Error while getting Page Config List "+error.message);
        }
    },
    getSinglePageConfig: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
                .query('SELECT * FROM EvolvePageConfig WHERE EvolvePageConfig_ID = @EvolvePageConfig_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1345: Error while getting Single Page Config "+error.message);
            return new Error(" EERR1345: Error while getting Single Page Config "+error.message);
        }
    },
    deletePageConfig: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
                .query('DELETE FROM EvolvePageConfig WHERE EvolvePageConfig_ID = @EvolvePageConfig_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1346: Error while deleting Page Config "+error.message);
            return new Error(" EERR1346: Error while deleting Page Config "+error.message);
        }
    },
    updatePageConfig: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePageConfig_ID', Evolve.Sql.Int, data.EvolvePageConfig_ID)
                .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
                .input('EvolvePageConfig_Key', Evolve.Sql.NVarChar, data.EvolvePageConfig_Key)
                .input('EvolvePageConfig_Value', Evolve.Sql.Bit, data.EvolvePageConfig_Value)
                .input('EvolvePageConfig_Desc', Evolve.Sql.NVarChar, data.EvolvePageConfig_Desc)

                .input('EvolvePageConfig_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePageConfig_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolvePageConfig_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePageConfig_UpdatedAt', Evolve.Sql.NVarChar, dateTime)

                .query('UPDATE EvolvePageConfig SET EvolveMenu_Id = @EvolveMenu_Id, EvolvePageConfig_Key = @EvolvePageConfig_Key, EvolvePageConfig_Value = @EvolvePageConfig_Value, EvolvePageConfig_Desc = @EvolvePageConfig_Desc, EvolvePageConfig_UpdatedUser = @EvolvePageConfig_UpdatedUser, EvolvePageConfig_UpdatedAt = @EvolvePageConfig_UpdatedAt WHERE EvolvePageConfig_ID = @EvolvePageConfig_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1347: Error while updating Page Config "+error.message);
            return new Error(" EERR1347: Error while updating Page Config "+error.message);
        }
    },

}