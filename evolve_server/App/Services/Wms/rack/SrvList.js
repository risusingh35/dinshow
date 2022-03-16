'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllRackListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(er.EvolveRack_ID) as count  FROM EvolveRack er WHERE er.EvolveRack_Code LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Rack List Count "+error.message);
            return new Error(" EERR####: Error while getting Rack List Count "+error.message);
        }
    },

    getAllRackList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT er.* FROM EvolveRack er WHERE er.EvolveRack_Code LIKE @search ORDER BY er.EvolveRack_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Rack List "+error.message);
            return new Error(" EERR####: Error while getting Rack List "+error.message);
        }
    },

    selectSingleRack : async function (EvolveRack_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRack_ID', Evolve.Sql.Int, EvolveRack_ID)
                .query('SELECT * FROM EvolveRack WHERE EvolveRack_ID = @EvolveRack_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Single Rack "+error.message);
            return new Error(" EERR####: Error while getting Single Rack "+error.message);
        }
    },

    addRack: async function (data) {
        // console.log("add rack>>>>", data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRack_Code', Evolve.Sql.NVarChar, data.EvolveRack_Code)
                .input('EvolveRack_Type', Evolve.Sql.NVarChar, data.EvolveRack_Type)
                .input('EvolveRack_Capacity', Evolve.Sql.Int, data.EvolveRack_Capacity)
                .input('EvolveRack_ActualCount', Evolve.Sql.Int, 0)
                .input('EvolveDevice_ID', Evolve.Sql.Int, 0)
                .input('EvolveItem_ID', Evolve.Sql.NVarChar, 0)
                .input('EvolveLocation_ID', Evolve.Sql.NVarChar, 0)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveRack_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveRack_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRack_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveRack_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveRack (EvolveRack_Code, EvolveRack_Type, EvolveRack_Capacity, EvolveRack_ActualCount, EvolveDevice_ID, EvolveItem_ID,EvolveLocation_ID,  EvolveRack_CreatedAt, EvolveRack_CreatedUser, EvolveRack_UpdatedAt, EvolveRack_UpdatedUser, EvolveUnit_ID) VALUES (@EvolveRack_Code, @EvolveRack_Type, @EvolveRack_Capacity,@EvolveRack_ActualCount,  @EvolveDevice_ID, @EvolveItem_ID,@EvolveLocation_ID,  @EvolveRack_CreatedAt, @EvolveRack_CreatedUser, @EvolveRack_UpdatedAt, @EvolveRack_UpdatedUser, @EvolveUnit_ID)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Adding Rack "+error.message);
            return new Error(" EERR####: Error while Adding Rack "+error.message);
        }
    },

    updateRack: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRack_ID', Evolve.Sql.Int, data.EvolveRack_ID)
                .input('EvolveRack_Code', Evolve.Sql.NVarChar, data.EvolveRack_Code)
                .input('EvolveRack_Type', Evolve.Sql.NVarChar, data.EvolveRack_Type)
                .input('EvolveRack_Capacity', Evolve.Sql.Int, data.EvolveRack_Capacity)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveDevice_ID', Evolve.Sql.Int, 0)
                .input('EvolveItem_ID', Evolve.Sql.Int, 0)
                .input('EvolveLocation_ID', Evolve.Sql.Int, 0)
                .input('EvolveRack_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveRack_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' UPDATE EvolveRack SET EvolveRack_Code = @EvolveRack_Code, EvolveRack_Type = @EvolveRack_Type, EvolveRack_Capacity = @EvolveRack_Capacity, EvolveDevice_ID = @EvolveDevice_ID, EvolveItem_ID = @EvolveItem_ID, EvolveLocation_ID = @EvolveLocation_ID, EvolveRack_UpdatedAt = @EvolveRack_UpdatedAt, EvolveRack_UpdatedUser = @EvolveRack_UpdatedUser, EvolveUnit_ID = @EvolveUnit_ID  WHERE  EvolveRack_ID = @EvolveRack_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR32534: Error while updating Rack "+error.message);
            return new Error(" EERR32534: Error while updating Rack "+error.message);
        }
    },

    getLocationList : async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveLocation');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Location List "+error.message);
            return new Error(" EERR####: Error while getting Location List "+error.message);
        }
    },

    getDeviceList : async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveDevice');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Device List "+error.message);
            return new Error(" EERR####: Error while getting Device List "+error.message);
        }
    },

    getItemList : async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveItem');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Item List "+error.message);
            return new Error(" EERR####: Error while getting Item List "+error.message);
        }
    },

    getAllRackDetailsList : async function (data) {
        try {
            if (data.EvolveLocation_ID != '' &&  data.EvolveRack_Code == '') {
                return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .query('SELECT TOP(20)* FROM EvolveRack WHERE EvolveLocation_ID = @EvolveLocation_ID');
            }
            else if (data.EvolveLocation_ID == '' &&  data.EvolveRack_Code != '') {
                return await Evolve.SqlPool.request()
                .input('EvolveRack_Code', Evolve.Sql.NVarChar, '%'+data.EvolveRack_Code+'%')
                .query("SELECT TOP(20)*, (SELECT COUNT(EvolveRackDetails_ID) FROM EvolveRackDetails WHERE EvolveRack_ID = er.EvolveRack_ID) as 'RackDetailsCount'  FROM EvolveRack er  WHERE er.EvolveRack_Code LIKE @EvolveRack_Code");
            }
            else if (data.EvolveLocation_ID != '' &&  data.EvolveRack_Code != '') {
                return await Evolve.SqlPool.request()
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveRack_Code', Evolve.Sql.NVarChar, '%'+data.EvolveRack_Code+'%')
                .query('SELECT TOP(20)* FROM EvolveRack WHERE EvolveLocation_ID = @EvolveLocation_ID AND EvolveRack_Code LIKE @EvolveRack_Code');
            }
            else{
                return await Evolve.SqlPool.request()
                .query("SELECT TOP(20)*, (SELECT COUNT(EvolveRackDetails_ID) FROM EvolveRackDetails WHERE EvolveRack_ID = er.EvolveRack_ID) as 'RackDetailsCount'  FROM EvolveRack er");
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Rack Details List "+error.message);
            return new Error(" EERR####: Error while getting Rack Details List "+error.message);
        }
    },

    getCurrentCount : async function (EvolveRack_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRack_ID', Evolve.Sql.Int, parseInt(EvolveRack_ID))
                .query(' SELECT * FROM EvolveRack WHERE EvolveRack_ID = @EvolveRack_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Actual Count "+error.message);
            return new Error(" EERR####: Error while Update Actual Count "+error.message);
        }
    },

    // updateActualCount : async function (data) {
    //     console.log("final srv data >>>>>",data);
    //     try {
    //         return await Evolve.SqlPool.request()
    //         .input('EvolveRack_ActualCount', Evolve.Sql.Int, data.EvolveRack_ActualCount)
    //         .input('EvolveRack_ID', Evolve.Sql.Int, parseInt(data.rackId))
    //             .query(' UPDATE EvolveRack SET EvolveRack_ActualCount = @EvolveRack_ActualCount WHERE EvolveRack_ID = @EvolveRack_ID ');
    //     } catch (error) {
    //         Evolve.Log.error(" EERR####: Error while Update Actual Count "+error.message);
    //         return new Error(" EERR####: Error while Update Actual Count "+error.message);
    //     }
    // },

    updateActualCount : async function (data) {
        // console.log("final srv data >>>>>",data);
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveRack_ActualCount', Evolve.Sql.Int, data.EvolveRack_ActualCount)
            .input('EvolveRack_ID', Evolve.Sql.Int, parseInt(data.rackData[0]))
                .query(' UPDATE EvolveRack SET EvolveRack_ActualCount = @EvolveRack_ActualCount WHERE EvolveRack_ID = @EvolveRack_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Actual Count "+error.message);
            return new Error(" EERR####: Error while Update Actual Count "+error.message);
        }
    },

    getDeviceData : async function (deviceId) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('EvolveDevice_ID', Evolve.Sql.Int, parseInt(deviceId))
            .query(" SELECT * FROM EvolveDevice WHERE EvolveDevice_ID = @EvolveDevice_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get device data "+error.message);
            return new Error(" EERR####: Error in get device data "+error.message);
        }
    },

    getItemData : async function (itemId) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, parseInt(itemId))
            .query(" SELECT * FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get item data "+error.message);
            return new Error(" EERR####: Error in get item data "+error.message);
        }
    },

    getLocationData : async function (locationId) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('EvolveLocation_ID', Evolve.Sql.Int, parseInt(locationId))
            .query(" SELECT * FROM EvolveLocation WHERE EvolveLocation_ID = @EvolveLocation_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get location data "+error.message);
            return new Error(" EERR####: Error in get location data "+error.message);
        }
    },

    updateInventoryTaskCompleted : async function (invId) {
        // console.log("invId>>>>>>>>>>>>>>>>>", invId);
        try {
            
            return await Evolve.SqlPool.request()
            .input('EvolveInventory_ID', Evolve.Sql.Int, parseInt(invId))
            .query(" UPDATE EvolveInventory SET EvolveInventory_IsTaskCompleted = 1 WHERE EvolveInventory_ID = @EvolveInventory_ID ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in update inventory task completed "+error.message);
            return new Error(" EERR####: Error in update inventory task completed "+error.message);
        }
    },

    // LOCATION SYNC WITH DEVICE

    getRackData : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveRack_ID', Evolve.Sql.Int, parseInt(data.EvolveRack_ID))
            .query(" SELECT el.EvolveLocation_Code, ed.EvolveDevice_Code, er.* FROM EvolveRack er, EvolveDevice ed, EvolveLocation el WHERE er.EvolveLocation_ID = el.EvolveLocation_ID AND er.EvolveDevice_ID = ed.EvolveDevice_ID AND er.EvolveRack_ID = @EvolveRack_ID");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get rack data "+error.message);
            return new Error(" EERR####: Error in get rack data "+error.message);
        }
    },



}