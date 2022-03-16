'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT COUNT(EvolveProcess_ID) as count FROM EvolveProcess WHERE EvolveProcess_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    getProcessListDatatable: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query("SELECT EvolveProcess_ID, EvolveProcess_Name,EvolveProcess_Description FROM EvolveProcess WHERE EvolveProcess_Name LIKE @search order by EvolveProcess_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1355: Error while getting process list "+error.message);
            return new Error(" EERR1355: Error while getting process list "+error.message);
        }
    },

    addProcess: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('processName', Evolve.Sql.NVarChar, data.processName)
                .input('processDescription', Evolve.Sql.NVarChar, data.processDescription)
                .query('INSERT INTO EvolveProcess (EvolveProcess_Name ,EvolveProcess_Description)VALUES (@processName,@processDescription) ');

        } catch (error) {
            Evolve.Log.error(" EERR1356: Error while adding process list "+error.message);
            return new Error(" EERR1356: Error while adding process list "+error.message);
        }
    },

    getSingleProcess: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('SELECT EvolveProcess_ID,EvolveProcess_Name,EvolveProcess_Description  FROM EvolveProcess WHERE EvolveProcess_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1357: Error while getting Single Process "+error.message);
            return new Error(" EERR1357: Error while getting Single Process "+error.message);
        }
    },

    updateProcess: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.NVarChar, data.EvolveProcess_ID)
                .input('EvolveProcess_Name', Evolve.Sql.NVarChar, data.EvolveProcess_Name)
                .input('EvolveProcess_Description', Evolve.Sql.NVarChar, data.EvolveProcess_Description)
                .query('UPDATE EvolveProcess SET EvolveProcess_Name = @EvolveProcess_Name , EvolveProcess_Description = @EvolveProcess_Description  WHERE EvolveProcess_ID = @EvolveProcess_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1358: Error while updating  Process "+error.message);
            return new Error(" EERR1358: Error while updating  Process "+error.message);
        }
    },

    deleteProcess: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveProcess WHERE EvolveProcess_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1359: Error while deleting Process "+error.message);
            return new Error(" EERR1359: Error while deleting Process "+error.message);
        }
    },

    selectProcessValidation: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.EvolveProcess_ID)
                .query('SELECT epv.EvolveProcessVal_Seq, ep.EvolveProcess_Name,epv.EvolveProcessVal_Desc, epv.EvolveProcessVal_Type, EvolveProcessVal_Value, epv.EvolveProcessVal_Required, epv.EvolveProcessVal_Compare_Type,epv.EvolveProcessVal_Compare_Value from EvolveProcess ep, EvolveProcessVal epv where ep.EvolveProcess_ID = @id and epv.EvolveProcess_ID = ep.EvolveProcess_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1360: Error while selecting Process Validation "+error.message);
            return new Error(" EERR1360: Error while selecting Process Validation "+error.message);
        }
    },
    // EERR1355: Error while getting process list



}