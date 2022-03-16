'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addSizes: async function (data) {
        let date = new Date();
        let datetime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSize_Name', Evolve.Sql.NVarChar, data.EvolveSize_Name)
                .input('EvolveSize_Desc', Evolve.Sql.NVarChar, data.EvolveSize_Desc)
                .input('EvolveSize_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSize_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveSize (EvolveSize_Name, EvolveSize_Desc, EvolveSize_CreatedAt, EvolveSize_UpdateAt) VALUES (@EvolveSize_Name, @EvolveSize_Desc, @EvolveSize_CreatedAt, @EvolveSize_UpdateAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1083: Error while adding sizes "+error.message);
            return new Error(" EERR1083: Error while adding sizes "+error.message);
        }
    },

    getSizesCount: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select count(EvolveSize_ID) AS count from EvolveSize');
        } catch (error) {
            Evolve.Log.error(" EERR1084: Error while getting sizes count "+error.message);
            return new Error(" EERR1084: Error while getting sizes count "+error.message);
        }
    },

    getSizesDatatableList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT * from EvolveSize ORDER BY EvolveSize_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1085: Error while getting Sizes Datatable List "+error.message);
            return new Error(" EERR1085: Error while getting Sizes Datatable List "+error.message);
        }
    },

    getSingleSizes: async function (EvolveSize_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSize_ID', Evolve.Sql.Int, EvolveSize_ID)
                .query('SELECT * FROM EvolveSize WHERE EvolveSize_ID = @EvolveSize_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1086: Error in getting single sizes "+error.message);
            return new Error(" EERR1086: Error in getting single sizes "+error.message);
        }
    },

    editSizes: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSize_ID', Evolve.Sql.NVarChar, data.EvolveSize_ID)
                .input('EvolveSize_Name', Evolve.Sql.NVarChar, data.EvolveSize_Name)
                .input('EvolveSize_Desc', Evolve.Sql.NVarChar, data.EvolveSize_Desc)
                .input('EvolveSize_UpdateAt', Evolve.Sql.NVarChar, datetime)

                .query('UPDATE EvolveSize SET EvolveSize_Name = @EvolveSize_Name, EvolveSize_Desc = @EvolveSize_Desc, EvolveSize_UpdateAt = @EvolveSize_UpdateAt WHERE EvolveSize_ID = @EvolveSize_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1087: Error while editing sizes "+error.message);
            return new Error(" EERR1087: Error while editing sizes "+error.message);
        }
    },

    deleteSizes: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSize_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSize WHERE EvolveSize_ID =@EvolveSize_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1088: Error while deleting sizes "+error.message);
            return new Error(" EERR1088: Error while deleting sizes "+error.message);
        }
    },


}