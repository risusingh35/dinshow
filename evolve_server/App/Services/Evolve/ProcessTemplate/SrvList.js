'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessTemplateCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT COUNT(EvolveProcessTemp_ID) as count FROM EvolveProcessTemp WHERE EvolveProcessTemp_Name LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getProcessTemplateList: async function (start , length,search) {
        try {
           
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query('SELECT * from EvolveProcessTemp WHERE EvolveProcessTemp_Name LIKE @search ORDER BY EvolveprocessTemp_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1361: Error while getting Process Template List "+error.message);
            return new Error(" EERR1361: Error while getting Process Template List "+error.message);
        }
    },

    addProcessTemplate: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveprocessTemp_Name', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Name)
                .input('EvolveprocessTemp_Desc', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Desc)
                .input('EvolveprocessTemp_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveProcessTemp (EvolveprocessTemp_Name, EvolveprocessTemp_Desc, EvolveprocessTemp_CreatedAt, EvolveprocessTemp_CreatedUser) VALUES (@EvolveprocessTemp_Name, @EvolveprocessTemp_Desc, @EvolveprocessTemp_CreatedAt, @EvolveprocessTemp_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1362: Error while adding Process Template "+error.message);
            return new Error(" EERR1362: Error while adding Process Template "+error.message);
        }
    },

    getSingleProcessTempalte: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolveProcessTemp WHERE EvolveprocessTemp_ID = @id');
        } catch (error) {
            Evolve.Log.error(" EERR1363: Error while getting Single Process Tempalte "+error.message);
            return new Error(" EERR1363: Error while getting Single Process Tempalte "+error.message);
        }
    },

    updateProcessTempalte: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveprocessTemp_ID', Evolve.Sql.NVarChar, data.EvolveprocessTemp_ID)
                .input('EvolveprocessTemp_Name', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Name)
                .input('EvolveprocessTemp_Desc', Evolve.Sql.NVarChar, data.EvolveprocessTemp_Desc)
                .input('EvolveprocessTemp_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveProcessTemp SET EvolveprocessTemp_Name = @EvolveprocessTemp_Name, EvolveprocessTemp_Desc = @EvolveprocessTemp_Desc WHERE EvolveprocessTemp_ID = @EvolveprocessTemp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1364: Error while updating Process Tempalte "+error.message);
            return new Error(" EERR1364: Error while updating Process Tempalte "+error.message);
        }
    },

    getProcessSequencePTN: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select EvolveprocessTemp_ID, EvolveprocessTemp_Name from EvolveProcessTemp')
        } catch (error) {
            Evolve.Log.error(" EERR1365: Error while getting Process Sequence PTN "+error.message);
            return new Error(" EERR1365: Error while getting Process Sequence PTN "+error.message);
        }
    },

    getProcessSequencePN: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select EvolveProcess_ID, EvolveProcess_Name from EvolveProcess')
        } catch (error) {
            Evolve.Log.error(" EERR1366: Error while getting Process Sequence PTN "+error.message);
            return new Error(" EERR1366: Error while getting Process Sequence PTN "+error.message);
        }
    },

    checkSequenceProcessName: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
                .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
                .query('SELECT * FROM EvolveProcessTempSeq WHERE EvolveProcess_ID = @EvolveProcess_ID AND EvolveProcessTemp_ID = @EvolveProcessTemp_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1367: Error while checking Sequence Process Name "+error.message);
            return new Error(" EERR1367: Error while checking Sequence Process Name "+error.message);
        }
    },

    getProcessSequenceON: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.id)
                .query('SELECT TOP(1) EvolveProcessTemp_Seq FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID = @EvolveProcessTemp_ID ORDER BY EvolveProcessTempSeq_ID DESC')
        } catch (error) {
            Evolve.Log.error(" EERR1368: Error while getting Process Sequence ON "+error.message);
            return new Error(" EERR1368: Error while getting Process Sequence ON "+error.message);
        }
    },

    addProcessSequence: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            console.log("entering in services >>> ")
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
                .input('EvolveProcessTemp_ID', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
                .input('EvolveProcessTemp_Seq', Evolve.Sql.Int, data.EvolveProcessTemp_Seq)
                .input('EvolveProcessTempSeq_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveProcessTempSeq_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveProcessTempSeq (EvolveProcess_ID,EvolveProcessTemp_ID,EvolveProcessTemp_Seq,EvolveProcessTempSeq_CreatedAt,EvolveProcessTempSeq_CreatedUser) VALUES (@EvolveProcess_ID, @EvolveProcessTemp_ID, @EvolveProcessTemp_Seq, @EvolveProcessTempSeq_CreatedAt, @EvolveProcessTempSeq_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1369: Error while adding Process Sequence "+error.message);
            return new Error(" EERR1369: Error while adding Process Sequence "+error.message);
        }
    },

    getProcessTeplateSequence: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.EvolveProcessTemp_ID)
                .query('SELECT EvolveProcessTempSeq.EvolveProcessTempSeq_ID, EvolveProcessTemp.EvolveprocessTemp_Name, EvolveProcess.EvolveProcess_Name, EvolveProcessTempSeq.EvolveProcessTemp_Seq FROM EvolveProcessTempSeq INNER JOIN EvolveProcessTemp ON EvolveProcessTempSeq.EvolveProcessTemp_ID = EvolveProcessTemp.EvolveprocessTemp_ID INNER JOIN EvolveProcess ON EvolveProcessTempSeq.EvolveProcess_ID = EvolveProcess.EvolveProcess_ID WHERE EvolveProcessTemp.EvolveProcessTemp_ID = @id ORDER BY EvolveProcessTemp_Seq ASC');
        } catch (error) {
            Evolve.Log.error(" EERR1370: Error while getting Process Template Sequence "+error.message);
            return new Error(" EERR1370: Error while getting Process Template Sequence "+error.message);
        }
    },

    deleteProcessTempalte: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveProcessTemp WHERE EvolveprocessTemp_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1371: Error while deleting Process Template "+error.message);
            return new Error(" EERR1371: Error while deleting Process Template "+error.message);
        }
    },

    deleteProcessTempalteSeq: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveProcessTempSeq WHERE EvolveProcessTemp_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1372: Error while deleting Process Template Seq "+error.message);
            return new Error(" EERR1372: Error while deleting Process Template Seq "+error.message);
        }
    },



}