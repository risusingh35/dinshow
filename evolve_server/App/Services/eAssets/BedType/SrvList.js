'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addTypes: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveType_Name', Evolve.Sql.NVarChar, data.EvolveType_Name)
                .input('EvolveType_Desc', Evolve.Sql.NVarChar, data.EvolveType_Desc)
                .input('EvolveType_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveType_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .query('INSERT INTO EvolveType (EvolveType_Name, EvolveType_Desc, EvolveType_CreatedAt, EvolveType_UpdateAt) VALUES (@EvolveType_Name, @EvolveType_Desc, @EvolveType_CreatedAt, @EvolveType_UpdateAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1089: Error while adding types "+error.message);
            return new Error(" EERR1089: Error while adding types "+error.message);
        }
    },

    getTypesCount: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select count(EvolveType_ID) AS count from EvolveType');
        } catch (error) {
            Evolve.Log.error(" EERR1090: Error while getting types count "+error.message);
            return new Error(" EERR1090: Error while getting types count "+error.message);
        }
    },

    getTypesDatatableList: async function (start, length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query('SELECT * from EvolveType ORDER BY EvolveType_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1091: Error while getting Types Datatable List "+error.message);
            return new Error(" EERR1091: Error while getting Types Datatable List "+error.message);
        }
    },

    getSingleTypes: async function (EvolveType_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveType_ID', Evolve.Sql.Int, EvolveType_ID)
                .query('SELECT * FROM EvolveType WHERE EvolveType_ID = @EvolveType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1092: Error while getting Single Types "+error.message);
            return new Error(" EERR1092: Error while getting Single Types "+error.message);
        }
    },

    editTypes: async function (data) {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveType_ID', Evolve.Sql.NVarChar, data.EvolveType_ID)
                .input('EvolveType_Name', Evolve.Sql.NVarChar, data.EvolveType_Name)
                .input('EvolveType_Desc', Evolve.Sql.NVarChar, data.EvolveType_Desc)
                .input('EvolveType_UpdateAt', Evolve.Sql.NVarChar, datetime)

                .query('UPDATE EvolveType SET EvolveType_Name = @EvolveType_Name, EvolveType_Desc = @EvolveType_Desc, EvolveType_UpdateAt = @EvolveType_UpdateAt WHERE EvolveType_ID = @EvolveType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1093: Error while editing Types "+error.message);
            return new Error(" EERR1093: Error while editing Types "+error.message);
        }
    },

    deleteTypes: async function (id) {

        try {
            return await Evolve.SqlPool.request()
                .input('EvolveType_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveType WHERE EvolveType_ID =@EvolveType_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1094: Error while deleting Types "+error.message);
            return new Error(" EERR1094: Error while deleting Types "+error.message);
        }
    },

}