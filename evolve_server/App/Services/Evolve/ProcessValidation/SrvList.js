'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessValListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
          .query("SELECT COUNT(epv.EvolveProcessVal_ID) as count FROM EvolveProcess ep ,EvolveProcessVal epv WHERE ep.EvolveProcess_ID = epv.EvolveProcess_ID AND ep.EvolveProcess_Name LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getProcessValList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query("SELECT  epv.EvolveProcessVal_ID, ep.EvolveProcess_Name , epv.EvolveProcessVal_Seq , epv.EvolveProcessVal_Desc , epv.EvolveProcessVal_Type , epv.EvolveProcessVal_Value , epv.EvolveProcessVal_Compare_Type , epv.EvolveProcessVal_Compare_Value , epv.EvolveProcessVal_Required, epv.EvolveProcessVal_Auto FROM EvolveProcess ep ,EvolveProcessVal epv WHERE ep.EvolveProcess_ID = epv.EvolveProcess_ID AND ep.EvolveProcess_Name LIKE @search order by epv.EvolveProcessVal_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR1382: Error while getting Process Val List "+error.message);
            return new Error(" EERR1382: Error while getting Process Val List "+error.message);
        }
    },

    getProcesses: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveProcess_ID, EvolveProcess_Name FROM EvolveProcess ')
        } catch (error) {
            Evolve.Log.error(" EERR1383: Error while getting Processes "+error.message);
            return new Error(" EERR1383: Error while getting Processes "+error.message);
        }
    },

    getLastProcessValSeqNum: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('SELECT TOP(1) EvolveProcessVal_Seq FROM EvolveProcessVal WHERE EvolveProcess_ID = @id ORDER BY EvolveProcessVal_ID DESC')
        } catch (error) {
            Evolve.Log.error(" EERR1384: Error while getting Last Process Val Seq Num "+error.message);
            return new Error(" EERR1384: Error while getting Last Process Val Seq Num "+error.message);
        }
    },

    getSingleProcessVal: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('SELECT    epv.EvolveProcessVal_ID, epv.EvolveProcess_ID,ep.EvolveProcess_Name, epv.EvolveProcessVal_Seq , epv.EvolveProcessVal_Desc , epv.EvolveProcessVal_Type , epv.EvolveProcessVal_Value,epv.EvolveProcessVal_Compare_Type , epv.EvolveProcessVal_Compare_Value , epv.EvolveProcessVal_Required, epv.EvolveProcessVal_Auto FROM EvolveProcess ep ,EvolveProcessVal epv WHERE ep.EvolveProcess_ID = epv.EvolveProcess_ID  AND EvolveProcessVal_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1385: Error while getting Single Process Val "+error.message);
            return new Error(" EERR1385: Error while getting Single Process Val "+error.message);
        }
    },

    addProcessVal: async function (data) {
        try {

            console.log("Image Name :", data.imageName)

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.selected_process)
                .input('EvolveProcessVal_Seq', Evolve.Sql.Int, data.validation_sequence_number)
                .input('EvolveProcessVal_Desc', Evolve.Sql.NVarChar, data.validation_description)
                .input('EvolveProcessVal_Type', Evolve.Sql.NVarChar, data.selected_validation_type)
                .input('EvolveProcessVal_Value', Evolve.Sql.NVarChar, data.process_default_value)
                .input('EvolveProcessVal_Compare_Type', Evolve.Sql.NVarChar, data.selected_process_validation_type)
                .input('EvolveProcessVal_Compare_Value', Evolve.Sql.NVarChar, data.process_validation_value)
                .input('EvolveProcessVal_Required', Evolve.Sql.NVarChar, data.is_required)
                .input('EvolveProcessVal_Auto', Evolve.Sql.NVarChar, data.is_auto)
                .input('EvolveProcessVal_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProcessVal_CreatedAt', Evolve.Sql.NVarChar, dataTime)
               

                .query('INSERT INTO EvolveProcessVal (EvolveProcess_ID ,EvolveProcessVal_Seq ,EvolveProcessVal_Desc ,EvolveProcessVal_Type,EvolveProcessVal_Value,EvolveProcessVal_Compare_Type,EvolveProcessVal_Compare_Value,EvolveProcessVal_Required,EvolveProcessVal_Auto,EvolveProcessVal_CreatedAt,EvolveProcessVal_CreatedUser )VALUES (@EvolveProcess_ID,@EvolveProcessVal_Seq,@EvolveProcessVal_Desc,@EvolveProcessVal_Type,@EvolveProcessVal_Value,@EvolveProcessVal_Compare_Type,@EvolveProcessVal_Compare_Value,@EvolveProcessVal_Required,@EvolveProcessVal_Auto ,@EvolveProcessVal_CreatedAt,@EvolveProcessVal_CreatedUser ) ');
        } catch (error) {
            Evolve.Log.error(" EERR1386: Error while adding Process Val "+error.message);
            return new Error(" EERR1386: Error while adding Process Val "+error.message);
        }
    },

    updateProcessVal: async function (data) {
        try {
            console.log("Image Name :", data.imageName)
            return await Evolve.SqlPool.request()
                .input('EvolveProcessVal_ID', Evolve.Sql.Int, data.EvolveProcessVal_ID)
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
                .input('EvolveProcessVal_Desc', Evolve.Sql.NVarChar, data.EvolveProcessVal_Desc)
                .input('EvolveProcessVal_Seq', Evolve.Sql.Int, data.EvolveProcessVal_Seq)
                .input('EvolveProcessVal_Type', Evolve.Sql.NVarChar, data.EvolveProcessVal_Type)
                .input('EvolveProcessVal_Value', Evolve.Sql.NVarChar, data.EvolveProcessVal_Value)
                .input('EvolveProcessVal_Compare_Type', Evolve.Sql.NVarChar, data.EvolveProcessVal_Compare_Type)
                .input('EvolveProcessVal_Compare_Value', Evolve.Sql.NVarChar, data.EvolveProcessVal_Compare_Value)
                .input('EvolveProcessVal_Required', Evolve.Sql.Int, data.EvolveProcessVal_Required)
                .input('EvolveProcessVal_Auto', Evolve.Sql.Int, data.EvolveProcessVal_Auto)
                .query('UPDATE EvolveProcessVal SET EvolveProcessVal_Desc = @EvolveProcessVal_Desc ,EvolveProcessVal_Seq = @EvolveProcessVal_Seq,EvolveProcessVal_Type = @EvolveProcessVal_Type,EvolveProcessVal_Value = @EvolveProcessVal_Value,EvolveProcessVal_Compare_Type = @EvolveProcessVal_Compare_Type,EvolveProcessVal_Compare_Value = @EvolveProcessVal_Compare_Value ,EvolveProcessVal_Required = @EvolveProcessVal_Required ,EvolveProcessVal_Auto = @EvolveProcessVal_Auto,EvolveProcess_ID=@EvolveProcess_ID  WHERE EvolveProcessVal_ID = @EvolveProcessVal_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1387: Error while updating Process Val "+error.message);
            return new Error(" EERR1387: Error while updating Process Val "+error.message);
        }
    },

    deleteProcessVal: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveProcessVal WHERE EvolveProcessVal_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1388: Error while deleting Process Val "+error.message);
            return new Error(" EERR1388: Error while deleting Process Val "+error.message);
        }
    },




}