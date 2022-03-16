'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    MachinetoUserListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT COUNT(ema.EvolveMachineAssign_ID) as count FROM EvolveMachineAssign ema , EvolveUser eu,EvolveMachine em ,EvolveMenu eml  WHERE ema.EvolveUser_ID = eu.EvolveUser_ID AND em.EvolveMachine_ID = ema.EvolveMachine_ID AND eml.EvolveMenu_Id = ema.EvolveMenu_ID  AND ema.EvolveMachineAssign_Code='USER' AND (em.EvolveMachine_Name LIKE @search OR eu.EvolveUser_Name LIKE @search)")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getMachinetoUserList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query("SELECT eml.EvolveMenu_Id , eml.EvolveMenu_Name ,ema.EvolveMachineAssign_ID ,eu.EvolveUser_Name , em.EvolveMachine_Name  FROM EvolveMachineAssign ema , EvolveUser eu,EvolveMachine em ,EvolveMenu eml  WHERE ema.EvolveUser_ID = eu.EvolveUser_ID AND em.EvolveMachine_ID = ema.EvolveMachine_ID AND eml.EvolveMenu_Id = ema.EvolveMenu_ID  AND ema.EvolveMachineAssign_Code='USER' AND (em.EvolveMachine_Name LIKE @search OR eu.EvolveUser_Name LIKE @search) order by EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY  ");
        } catch (error) {
            Evolve.Log.error(" EERR1319: Error while getting Machine to User List "+error.message);
            return new Error(" EERR1319: Error while getting Machine to User List "+error.message);
        }
    },

    getUsers: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveUser_ID ,EvolveUser_Name  from EvolveUser ')
        } catch (error) {
            Evolve.Log.error(" EERR1320: Error while getting Users "+error.message);
            return new Error(" EERR1320: Error while getting Users "+error.message);
        }
    },

    getMachines: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('select  EvolveMachine_ID ,EvolveMachine_Name  from EvolveMachine ')
        } catch (error) {
            Evolve.Log.error(" EERR1321: Error while getting Machines "+error.message);
            return new Error(" EERR1321: Error while getting Machines "+error.message);
        }
    },

    getMenuList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveMenu_Id ,EvolveMenu_Name from EvolveMenu ')
        } catch (error) {
            Evolve.Log.error(" EERR1322: Error while getting Menu List "+error.message);
            return new Error(" EERR1322: Error while getting Menu List "+error.message);
        }
    },
    checkMachineToUser: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("SELECT EvolveMachineAssign_ID FROM EvolveMachineAssign WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID   AND  EvolveMachineAssign_Code='USER' ");
        } catch (error) {
            Evolve.Log.error(" EERR1323: Error while checking Machine To User "+error.message);
            return new Error(" EERR1323: Error while checking Machine To User  "+error.message);
        }
    },

    addMachineToUser: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachineAssign_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMachineToUser_DefaultMenu)
                .input('EvolveMachineAssign_Code', Evolve.Sql.NVarChar, 'USER')

                .query("INSERT INTO EvolveMachineAssign (EvolveUser_ID ,EvolveMachine_ID ,EvolveMachineAssign_CreatedAt ,EvolveMachineAssign_CreatedUser,EvolveMachineAssign_UpdatedAt,EvolveMachineAssign_UpdatedUser,EvolveMenu_ID ,EvolveMachineAssign_Code)VALUES (@EvolveUser_ID ,@EvolveMachine_ID ,@EvolveMachineAssign_CreatedAt ,@EvolveMachineAssign_CreatedUser,@EvolveMachineAssign_UpdatedAt,@EvolveMachineAssign_UpdatedUser,@EvolveMenu_ID,@EvolveMachineAssign_Code) ");
        } catch (error) {
            Evolve.Log.error(" EERR1324: Error while adding Machine To User "+error.message);
            return new Error(" EERR1324: Error while adding Machine To User "+error.message);
        }
    },

    getSingleMachineToUser: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, id)
                .query("SELECT EvolveMachineAssign_ID , EvolveUser_ID , EvolveMachine_ID , EvolveMenu_ID FROM EvolveMachineAssign  WHERE EvolveMachineAssign_ID = @EvolveMachineAssign_ID AND  EvolveMachineAssign_Code='USER' ")
        } catch (error) {
            Evolve.Log.error(" EERR1325: Error while getting Single Machine To User "+error.message);
            return new Error(" EERR1325: Error while getting Single Machine To User "+error.message);
        }
    },
    checkMachineToUserUpdate: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
                .query("SELECT EvolveMachineAssign_ID FROM EvolveMachineAssign WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID AND EvolveMachineAssign_ID != @EvolveMachineAssign_ID AND  EvolveMachineAssign_Code='USER'" );
        } catch (error) {
            Evolve.Log.error(" EERR1326: Error while checking Machine To User Update "+error.message);
            return new Error(" EERR1326: Error while checking Machine To User Update "+error.message);
        }
    },

    updateMachineToUser: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let update_machine_to_user = await Evolve.SqlPool.request()
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveUpdatedUser_ID)
                .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMachineToUser_DefaultMenu)
                
                .query('UPDATE EvolveMachineAssign SET EvolveUser_ID=@EvolveUser_ID ,EvolveMachine_ID =@EvolveMachine_ID ,EvolveMachineAssign_UpdatedAt=@EvolveMachineAssign_UpdatedAt,EvolveMachineAssign_UpdatedUser=@EvolveMachineAssign_UpdatedUser,EvolveMenu_ID=@EvolveMenu_ID  WHERE EvolveMachineAssign_ID=@EvolveMachineAssign_ID ');

            if (update_machine_to_user instanceof Error || update_machine_to_user.rowsAffected < 1) {
                Evolve.Log.Error("Error In Update Machine to User", create_role);
                return new Error("Error in Update Process")
            } else {
                return update_machine_to_user;
            }
        } catch (error) {
            Evolve.Log.error(" EERR1327: Error while updating Machine To User "+error.message);
            return new Error(" EERR1327: Error while updating Machine To User "+error.message);
        }
    },

    deleteMachineToUser: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveMachineAssign WHERE EvolveMachineAssign_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1328: Error while deleting Machine To User "+error.message);
            return new Error(" EERR1328: Error while deleting Machine To User "+error.message);
        }
    },



}