'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessToMachineCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT DISTINCT ema.EvolveProcess_ID  FROM EvolveMachineAssign ema INNER JOIN EvolveProcess ep ON ema.EvolveProcess_ID = ep.EvolveProcess_ID INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = ema.EvolveMachine_ID WHERE ema.EvolveMachineAssign_Code='PROCESS' AND (em.EvolveMachine_Name LIKE @search OR ep.EvolveProcess_Name LIKE @search) ")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getProcessToMachineList: async function(start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT ep.EvolveProcess_ID, ep.EvolveProcess_Name, em.EvolveMachine_Name, ema.EvolveMachineAssign_ID   FROM EvolveMachineAssign ema INNER JOIN EvolveProcess ep ON ema.EvolveProcess_ID = ep.EvolveProcess_ID INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = ema.EvolveMachine_ID WHERE ema.EvolveMachineAssign_Code='PROCESS' AND (em.EvolveMachine_Name LIKE @search OR ep.EvolveProcess_Name LIKE @search) ORDER BY ema.EvolveProcess_ID  DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1373: Error while getting Process To Machine List "+error.message);
            return new Error(" EERR1373: Error while getting Process To Machine List "+error.message);
        }
    },

    getProcessList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveProcess_ID, EvolveProcess_Name FROM EvolveProcess");
        } catch (error) {
            Evolve.Log.error(" EERR1374: Error while getting Process List "+error.message);
            return new Error(" EERR1374: Error while getting Process List "+error.message);
        }
    },

    getMachineList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveMachine')
        } catch (error) {
            Evolve.Log.error(" EERR1375: Error while getting Machine List "+error.message);
            return new Error(" EERR1375: Error while getting Machine List "+error.message);
        }
    },

    getSingleProcessToMachine: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_id', Evolve.Sql.Int, data.EvolveProcess_id)
                .query('SELECT eptm.EvolveMachine_id, em.EvolveMachine_Name FROM EvolveProcessToMachine eptm JOIN EvolveMachine em ON em.EvolveMachine_ID =  eptm.EvolveMachine_id WHERE eptm.EvolveProcess_id = @EvolveProcess_id');
        } catch (error) {
            Evolve.Log.error(" EERR1376: Error while getting Single Process To Machine "+error.message);
            return new Error(" EERR1376: Error while getting Single Process To Machine "+error.message);
        }
    },
    getProcessSelectList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_id)
                .query("SELECT ema.EvolveMachine_ID as EvolveMachine_id, em.EvolveMachine_Name FROM EvolveMachineAssign ema JOIN EvolveMachine em ON em.EvolveMachine_ID =  ema.EvolveMachine_ID WHERE ema.EvolveProcess_ID = @EvolveProcess_ID AND ema.EvolveMachineAssign_Code='PROCESS'");
        } catch (error) {
            Evolve.Log.error(" EERR1377: Error while getting Process Select List "+error.message);
            return new Error(" EERR1377: Error while getting Process Select List "+error.message);
        }
    },
    deleteProcessToMachine: async function (EvolveProcess_id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcess_ID', Evolve.Sql.Int, EvolveProcess_id)
                .query("DELETE FROM EvolveMachineAssign WHERE EvolveProcess_ID = @EvolveProcess_ID AND EvolveMachineAssign_Code='PROCESS'" );
        } catch (error) {
            Evolve.Log.error(" EERR1378: Error while deleting Process To Machine "+error.message);
            return new Error(" EERR1378: Error while deleting Process To Machine "+error.message);
        }
    },

    addProcessToMachine: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveProcess_ID', Evolve.Sql.Int, data.EvolveProcess_ID)
                .input('EvolveMachineAssign_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMachineAssign_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachineAssign_Code', Evolve.Sql.NVarChar, 'PROCESS')

                .query('INSERT INTO EvolveMachineAssign (EvolveProcess_ID,EvolveMachine_ID,EvolveMachineAssign_CreatedUser,EvolveMachineAssign_CreatedAt,EvolveMachineAssign_Code,EvolveMachineAssign_UpdatedAt,EvolveMachineAssign_UpdatedUser) VALUES (@EvolveProcess_ID,@EvolveMachine_ID,@EvolveMachineAssign_CreatedUser,@EvolveMachineAssign_CreatedAt,@EvolveMachineAssign_Code,@EvolveMachineAssign_UpdatedAt,@EvolveMachineAssign_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1379: Error while adding Process To Machine "+error.message);
            return new Error(" EERR1379: Error while adding Process To Machine "+error.message);
        }
    },

    checkProcessToMachineUpdate: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcessToMachine_ID', Evolve.Sql.Int, data.EvolveProcessToMachine_ID)
                .input('EvolveMachine_id', Evolve.Sql.Int, data.EvolveMachine_id)
                .input('EvolveProcess_id', Evolve.Sql.Int, data.EvolveProcess_id)
                .query("SELECT EvolveProcessToMachine_ID FROM EvolveProcessToMachine WHERE  EvolveMachine_id = @EvolveMachine_id AND  EvolveProcess_id = @EvolveProcess_id AND EvolveProcessToMachine_ID != @EvolveProcessToMachine_ID AND  EvolveMachineAssign_Code='PROCESS' ");
        } catch (error) {
            Evolve.Log.error(" EERR1380: Error while checking Process To Machine Update "+error.message);
            return new Error(" EERR1380: Error while checking Process To Machine Update "+error.message);
        }
    },

    updateProcessToMachine: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProcessToMachine_ID', Evolve.Sql.Int, data.EvolveProcessToMachine_ID)
                .input('EvolveMachine_id', Evolve.Sql.Int, parseInt(data.EvolveMachine_id))
                .input('EvolveProcess_id', Evolve.Sql.Int, parseInt(data.EvolveProcess_id))
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveProcessToMachine SET  EvolveMachine_id = @EvolveMachine_id ,  EvolveProcess_id = @EvolveProcess_id , EvolveMachineAssign_UpdatedAt=@EvolveMachineAssign_UpdatedAt ,EvolveMachineAssign_UpdatedUser=@EvolveMachineAssign_UpdatedUser  WHERE EvolveProcessToMachine_ID = @EvolveProcessToMachine_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1381: Error while updating Process To Machine "+error.message);
            return new Error(" EERR1381: Error while updating Process To Machine "+error.message);
        }
    },


}