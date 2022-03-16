'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMachines: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveMachine_ID ,EvolveMachine_Name FROM EvolveMachine')
        } catch (error) {
            Evolve.Log.error(" EERR1309: Error while getting Machines "+error.message);
            return new Error(" EERR1309: Error while getting Machines "+error.message);
        }
    },

    getItems: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveItem_ID ,EvolveItem_Code FROM EvolveItem')
        } catch (error) {
            Evolve.Log.error(" EERR1310: Error while getting Items "+error.message);
            return new Error(" EERR1310: Error while getting Items "+error.message);
        }
    },

    getuoms: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT EvolveUom_ID ,EvolveUom_Uom FROM EvolveUom')
        } catch (error) {
            Evolve.Log.error(" EERR1311: Error while getting uoms "+error.message);
            return new Error(" EERR1311: Error while getting uoms "+error.message);
        }
    },

    checkMachineToItem: async function (data) {
        try {
            // let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveMachineAssign_ID FROM EvolveMachineAssign WHERE EvolveMachine_ID = @EvolveMachine_ID AND EvolveItem_ID = @EvolveItem_ID  AND EvolveMachineAssign_Code='ITEM'");
        } catch (error) {
            Evolve.Log.error(" EERR1312: Error while checking Machine To Item "+error.message);
            return new Error(" EERR1312: Error while checking Machine To Item "+error.message);
        }
    },
    checkUpdateMachineToItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, data.EvolveMachineToItem_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveMachineAssign_ID FROM EvolveMachineAssign WHERE EvolveMachine_ID = @EvolveMachine_ID AND EvolveItem_ID = @EvolveItem_ID AND EvolveMachineAssign_ID != @EvolveMachineAssign_ID AND EvolveMachineAssign_Code='ITEM' ");
        } catch (error) {
            Evolve.Log.error(" EERR1313: Error while checking Updating Machine To Item "+error.message);
            return new Error(" EERR1313: Error while checking Updating Machine To Item "+error.message);
        }
    },

    addMachineToItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveMachineAssign_Capacity', Evolve.Sql.Int, data.EvolveMachineToItem_Capacity)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveMachineAssign_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_CreatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .input('EvolveMachineAssign_Code', Evolve.Sql.NVarChar, 'ITEM')

                .query('INSERT INTO EvolveMachineAssign (EvolveMachine_ID, EvolveItem_ID, EvolveMachineAssign_Capacity, EvolveUom_ID, EvolveMachineAssign_CreatedAt,EvolveMachineAssign_CreatedUser, EvolveMachineAssign_UpdatedAt, EvolveMachineAssign_UpdatedUser,EvolveMachineAssign_Code) VALUES (@EvolveMachine_ID, @EvolveItem_ID, @EvolveMachineAssign_Capacity, @EvolveUom_ID, @EvolveMachineAssign_CreatedAt, @EvolveMachineAssign_CreatedUser, @EvolveMachineAssign_UpdatedAt, @EvolveMachineAssign_UpdatedUser,@EvolveMachineAssign_Code) ');
        } catch (error) {
            Evolve.Log.error(" EERR1314: Error while adding Machine To Item "+error.message);
            return new Error(" EERR1314: Error while adding Machine To Item "+error.message);
        }
    },

    getMachineToItemList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT ema.EvolveMachineAssign_ID, em.EvolveMachine_Name, ei.EvolveItem_Code, ema.EvolveMachineAssign_Capacity, eu.EvolveUom_Uom   FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei, EvolveUom eu    WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveUom_ID= eu.EvolveUom_ID AND ema.EvolveMachineAssign_Code='ITEM' AND (em.EvolveMachine_Name LIKE @search OR ei.EvolveItem_Code LIKE @search) order by  ema.EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")

            // if (data.EvolveMachine_ID != '' && data.EvolveItem_ID == '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            //         .input('start', Evolve.Sql.Int, start)
            //         .input('length', Evolve.Sql.Int, length)
            //         .query("SELECT ema.EvolveMachineAssign_ID, em.EvolveMachine_Name, ei.EvolveItem_Code, ema.EvolveMachineAssign_Capacity, eu.EvolveUom_Uom   FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei, EvolveUom eu    WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveUom_ID= eu.EvolveUom_ID AND ema.EvolveMachineAssign_Code='ITEM' AND ema.EvolveMachine_ID = @EvolveMachine_ID order by  EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            // }
            // else if (data.EvolveMachine_ID == '' && data.EvolveItem_ID != '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            //         .input('start', Evolve.Sql.Int, start)
            //         .input('length', Evolve.Sql.Int, length)
            //         .query("SELECT ema.EvolveMachineAssign_ID, em.EvolveMachine_Name, ei.EvolveItem_Code, ema.EvolveMachineAssign_Capacity, eu.EvolveUom_Uom   FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei, EvolveUom eu    WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveUom_ID= eu.EvolveUom_ID AND ema.EvolveMachineAssign_Code='ITEM' AND ema.EvolveItem_ID = @EvolveItem_ID  order by  EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            // }
            // else if (data.EvolveMachine_ID != '' && data.EvolveItem_ID != '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            //         .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            //         .input('start', Evolve.Sql.Int, start)
            //         .input('length', Evolve.Sql.Int, length)
            //         .query("SELECT ema.EvolveMachineAssign_ID, em.EvolveMachine_Name, ei.EvolveItem_Code, ema.EvolveMachineAssign_Capacity, eu.EvolveUom_Uom   FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei, EvolveUom eu    WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveUom_ID= eu.EvolveUom_ID AND ema.EvolveMachineAssign_Code='ITEM' AND ema.EvolveMachine_ID = @EvolveMachine_ID AND ema.EvolveItem_ID = @EvolveItem_ID order by  EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            // }
            // else {
            //     return await Evolve.SqlPool.request()
            //         .input('start', Evolve.Sql.Int, start)
            //         .input('length', Evolve.Sql.Int, length)
            //         .query("SELECT ema.EvolveMachineAssign_ID, em.EvolveMachine_Name, ei.EvolveItem_Code, ema.EvolveMachineAssign_Capacity, eu.EvolveUom_Uom   FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei, EvolveUom eu    WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveUom_ID= eu.EvolveUom_ID AND ema.EvolveMachineAssign_Code='ITEM' order by  ema.EvolveMachineAssign_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
            // }
        } catch (error) {
            Evolve.Log.error(" EERR1315: Error while getting Machine To Item List "+error.message);
            return new Error(" EERR1315: Error while getting Machine To Item List "+error.message);
        }
    },
    getMachineToItemListCount: async function (search) {
        try {

            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(ema.EvolveMachineAssign_ID) AS count FROM EvolveMachineAssign ema, EvolveMachine em, EvolveItem ei WHERE em.EvolveMachine_ID = ema.EvolveMachine_ID AND ei.EvolveItem_ID = ema.EvolveItem_ID AND ema.EvolveMachineAssign_Code='ITEM' AND (em.EvolveMachine_Name LIKE @search OR ei.EvolveItem_Code LIKE @search) ")
            // if (data.EvolveMachine_ID != '' && data.EvolveItem_ID == '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            //         .query("SELECT COUNT(EvolveMachineAssign_ID) AS count FROM EvolveMachineAssign WHERE EvolveMachine_ID = @EvolveMachine_ID AND EvolveMachineAssign_Code='ITEM'");
            // }
            // else if (data.EvolveMachine_ID == '' && data.EvolveItem_ID != '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            //         .query("SELECT COUNT(EvolveMachineAssign_ID) AS count FROM EvolveMachineAssign WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveMachineAssign_Code='ITEM'");
            // }
            // else if (data.EvolveMachine_ID != '' && data.EvolveItem_ID != '') {
            //     return await Evolve.SqlPool.request()
            //         .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            //         .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
            //         .query("SELECT COUNT(EvolveMachineAssign_ID) AS count FROM EvolveMachineAssign WHERE EvolveMachine_ID = @EvolveMachine_ID AND EvolveItem_ID = @EvolveItem_ID AND EvolveMachineAssign_Code='ITEM'");
            // }
            // else {
            //     return await Evolve.SqlPool.request()
            //         .query("SELECT COUNT(EvolveMachineAssign_ID) AS count FROM EvolveMachineAssign WHERE  EvolveMachineAssign_Code='ITEM'");
            // }

        } catch (error) {
            Evolve.Log.error(" EERR1316: Error while getting Machine To Item List Count "+error.message);
            return new Error(" EERR1316: Error while getting Machine To Item List Count "+error.message);
        }
    },

    getSingleMachineToItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, data.EvolveMachineToItem_ID)
                .query("SELECT EvolveMachineAssign_ID, EvolveMachine_ID, EvolveItem_ID, EvolveMachineAssign_Capacity, EvolveUom_ID   FROM EvolveMachineAssign   WHERE EvolveMachineAssign_ID = @EvolveMachineAssign_ID AND EvolveMachineAssign_Code='ITEM'")
        } catch (error) {
            Evolve.Log.error(" EERR1317: Error while getting Single Machine To Item "+error.message);
            return new Error(" EERR1317: Error while getting Single Machine To Item "+error.message);
        }
    },
    // checkMachineToUserUpdate: async function (data) {
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
    //             .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
    //             .input('EvolveMachineToUser_ID', Evolve.Sql.Int, data.EvolveMachineToUser_ID)
    //             .query('SELECT EvolveMachineToUser_ID FROM EvolveMachineToUser WHERE EvolveUser_ID = @EvolveUser_ID AND EvolveMachine_ID = @EvolveMachine_ID AND EvolveMachineToUser_ID != @EvolveMachineToUser_ID');
    //     } catch (error) {
    //         Evolve.Log.error(" "+error.message);
    //         return new Error(" "+error.message);
    //     }
    // },

    updateMachineToItem: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveMachineAssign_ID', Evolve.Sql.Int, data.EvolveMachineToItem_ID)
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveMachineAssign_Capacity', Evolve.Sql.Int, data.EvolveMachineToItem_Capacity)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveMachineAssign_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveMachineAssign_UpdatedUser', Evolve.Sql.Int, data.EvolveCreatedUser_ID)
                .query('UPDATE EvolveMachineAssign SET EvolveMachine_ID = @EvolveMachine_ID, EvolveItem_ID = @EvolveItem_ID, EvolveMachineAssign_Capacity = @EvolveMachineAssign_Capacity, EvolveUom_ID = @EvolveUom_ID, EvolveMachineAssign_UpdatedAt = @EvolveMachineAssign_UpdatedAt, EvolveMachineAssign_UpdatedUser = @EvolveMachineAssign_UpdatedUser WHERE EvolveMachineAssign_ID = @EvolveMachineAssign_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1318: Error while updating Machine To Item "+error.message);
            return new Error(" EERR1318: Error while updating Machine To Item "+error.message);
        }
    },



}