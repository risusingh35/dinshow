'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllModelsCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveModel_ID) as count  FROM EvolveModel WHERE EvolveModel_Name LIKE @search")
        } catch (error) {
          Evolve.Log.error("EERR32653: Error while  getting Model List Count " +error.message);
          return new Error("EERR32653: Error while  getting Model List Count " +error.message);
        }
    },

    getAllModels : async function (start, length,search){
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)  
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT em.* , eu.EvolveUnit_Code FROM EvolveModel em , EvolveUnit eu WHERE eu.EvolveUnit_ID = em.EvolveUnit_ID AND (EvolveModel_Name LIKE @search OR EvolveModel_Code LIKE @search) ORDER BY em.EvolveModel_Id OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
          } catch (error) {
          Evolve.Log.error("EERR32654: Error while  getting Model List " +error.message);
          return new Error("EERR32654: Error while  getting Model List " +error.message);
          }
    },

    getItemsLinked : async function (id){
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveModel_ID', Evolve.Sql.Int, id)
                .query("SELECT eim.EvolveItemToModel_ID , eim.EvolveModel_ID , ei.EvolveItem_ID , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code FROM EvolveItem ei , EvolveItemToModel eim WHERE eim.EvolveModel_ID = @EvolveModel_ID AND eim.EvolveItem_ID = ei.EvolveItem_ID")
          } catch (error) {
          Evolve.Log.error("EERR32655: Error while  getting Items Linked " +error.message);
          return new Error("EERR32655: Error while  getting Items Linked " +error.message);
          }
    },

    getAllUnitList : async function (){
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveUnit_ID , EvolveUnit_Code FROM EvolveUnit")
          } catch (error) {
          Evolve.Log.error("EERR32656: Error while  getting Unit List " +error.message);
          return new Error("EERR32656: Error while  getting Unit List " +error.message);
          }
    },

    getAllItemList : async function (id){
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveItem_ID , EvolveItem_Code FROM EvolveItem")
            
          } catch (error) {
          Evolve.Log.error("EERR32657: Error while  getting Item List " +error.message);
          return new Error("EERR32657: Error while  getting Item List " +error.message);
          }
    },

    deleteModel : async function (id){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int, id)
            .query("DELETE FROM EvolveModel WHERE EvolveModel_ID = @EvolveModel_ID ; DELETE FROM EvolveItemToModel WHERE EvolveModel_ID = @EvolveModel_ID")
          } catch (error) {
          Evolve.Log.error("EERR32658: Error while delete model " +error.message);
          return new Error("EERR32658: Error while delete model " +error.message);
          }
    },

    addNewModel : async function (data){
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_Code', Evolve.Sql.NVarChar, data.EvolveModel_Code)
            .input('EvolveModel_Name', Evolve.Sql.NVarChar, data.EvolveModel_Name)
            .input('EvolveModel_Desc', Evolve.Sql.NVarChar, data.EvolveModel_Desc)
            .input('EvolveModel_OnOff', Evolve.Sql.NVarChar, data.EvolveModel_OnOff)
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveModel_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveModel_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveModel_CreatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveModel_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("INSERT INTO EvolveModel (EvolveModel_Code , EvolveModel_Name , EvolveModel_Desc , EvolveModel_OnOff , EvolveUnit_ID , EvolveModel_UpdatedAt , EvolveModel_UpdatedUser , EvolveModel_CreatedAt , EvolveModel_CreatedUser) VALUES (@EvolveModel_Code , @EvolveModel_Name , @EvolveModel_Desc ,  @EvolveModel_OnOff , @EvolveUnit_ID , @EvolveModel_UpdatedAt , @EvolveModel_UpdatedUser , @EvolveModel_CreatedAt , @EvolveModel_CreatedUser)")
          } catch (error) {
          Evolve.Log.error("EERR32659: Error while Add New Model " +error.message);
          return new Error("EERR32659: Error while Add New Model " +error.message);
          }
    },

    getModelId : async function (EvolveModel_Code){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_Code', Evolve.Sql.NVarChar, EvolveModel_Code)
            .query("SELECT EvolveModel_ID FROM EvolveModel WHERE EvolveModel_Code = @EvolveModel_Code")
          } catch (error) {
          Evolve.Log.error("EERR32660: Error while getting Model ID " +error.message);
          return new Error("EERR32660: Error while getting Model ID " +error.message);
          }
    },

    addNewSerial : async function (prefix , userid , id){
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, prefix)
            .input('EvolveSerial_Code', Evolve.Sql.NVarChar, prefix)
            .input('EvolveModel_ID', Evolve.Sql.Int, id)
            .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, userid)
            .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, userid)
            .query("INSERT INTO EvolveSerial (EvolveSerial_Prefix , EvolveSerial_Code , EvolveModel_ID , EvolveSerial_UpdatedAt , EvolveSerial_UpdatedUser , EvolveSerial_CreatedAt , EvolveSerial_CreatedUser) VALUES (@EvolveSerial_Prefix , @EvolveSerial_Code , @EvolveModel_ID , @EvolveSerial_UpdatedAt , @EvolveSerial_UpdatedUser , @EvolveSerial_CreatedAt , @EvolveSerial_CreatedUser)")
          } catch (error) {
          Evolve.Log.error("EERR32661: Error while Add New Serial Number " +error.message);
          return new Error("EERR32661: Error while Add New Serial Number " +error.message);
          }
    },

    addItemToModel : async function (itemid , modelid , unitid , userid){
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int, modelid)
            .input('EvolveItem_ID', Evolve.Sql.Int, itemid)
            .input('EvolveUnit_ID', Evolve.Sql.Int, unitid)
            .input('EvolveItemToModel_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveItemToModel_UpdatedUser', Evolve.Sql.Int, userid)
            .input('EvolveItemToModel_CreatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveItemToModel_CreatedUser', Evolve.Sql.Int, userid)
            .query("INSERT INTO EvolveItemToModel (EvolveModel_ID , EvolveItem_ID , EvolveUnit_ID , EvolveItemToModel_UpdatedAt , EvolveItemToModel_UpdatedUser , EvolveItemToModel_CreatedAt , EvolveItemToModel_CreatedUser) VALUES (@EvolveModel_ID , @EvolveItem_ID , @EvolveUnit_ID , @EvolveItemToModel_UpdatedAt , @EvolveItemToModel_UpdatedUser , @EvolveItemToModel_CreatedAt , @EvolveItemToModel_CreatedUser)")
          } catch (error) {
          Evolve.Log.error("EERR32662: Error while Add Item To Model " +error.message);
          return new Error("EERR32662: Error while Add Item To Model " +error.message);
          }
    },

    updateModel : async function (data){
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int, data.EvolveModel_ID)
            .input('EvolveModel_Code', Evolve.Sql.NVarChar, data.EvolveModel_Code)
            .input('EvolveModel_Name', Evolve.Sql.NVarChar, data.EvolveModel_Name)
            .input('EvolveModel_Desc', Evolve.Sql.NVarChar, data.EvolveModel_Desc)
            .input('EvolveModel_OnOff', Evolve.Sql.NVarChar, data.EvolveModel_OnOff)
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('EvolveModel_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
            .input('EvolveModel_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query("UPDATE EvolveModel SET EvolveModel_Code = @EvolveModel_Code , EvolveModel_Name = @EvolveModel_Name , EvolveModel_Desc = @EvolveModel_Desc , EvolveModel_OnOff = @EvolveModel_OnOff , EvolveUnit_ID = @EvolveUnit_ID , EvolveModel_UpdatedAt = @EvolveModel_UpdatedAt , EvolveModel_UpdatedUser = @EvolveModel_UpdatedUser WHERE EvolveModel_ID = @EvolveModel_ID")
          } catch (error) {
          Evolve.Log.error("EERR32663: Error while Update Model " +error.message);
          return new Error("EERR32663: Error while Update Model " +error.message);
          }
    },

    // updateSerial : async function (prefix , userid , id){
    //     try {
    //         let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //         .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, prefix)
    //         .input('EvolveSerial_Code', Evolve.Sql.NVarChar, prefix)
    //         .input('EvolveModel_ID', Evolve.Sql.Int, id)
    //         .input('EvolveSerial_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
    //         .input('EvolveSerial_UpdatedUser', Evolve.Sql.Int, userid)
    //         .query("UPDATE EvolveSerial SET EvolveSerial_Prefix = @EvolveSerial_Prefix , EvolveSerial_Code = @EvolveSerial_Code , EvolveSerial_UpdatedAt = @EvolveSerial_UpdatedAt , EvolveSerial_UpdatedUser = @EvolveSerial_UpdatedUser WHERE EvolveModel_ID = @EvolveModel_ID")
    //       } catch (error) {
    //       Evolve.Log.error("EERR32664: Error while Update Serial Number " +error.message);
    //       return new Error("EERR32664: Error while Update Serial Number " +error.message);
    //       }
    // },

    checkItemToModelExists : async function (itemid , modelid){
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID', Evolve.Sql.Int, modelid)
            .input('EvolveItem_ID', Evolve.Sql.Int, itemid)
            .query("SELECT EvolveItemToModel_ID FROM EvolveItemToModel WHERE EvolveModel_ID = @EvolveModel_ID AND EvolveItem_ID = @EvolveItem_ID")
          } catch (error) {
          Evolve.Log.error("EERR32664: Error while Update Serial Number " +error.message);
          return new Error("EERR32664: Error while Update Serial Number " +error.message);
          }
    },

    deleteItemToModel : async function (id){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItemToModel_ID', Evolve.Sql.Int, id)
            .query("DELETE EvolveItemToModel WHERE EvolveItemToModel_ID = @EvolveItemToModel_ID")
          } catch (error) {
          Evolve.Log.error("EERR32665: Error while check Item To Model Exists " +error.message);
          return new Error("EERR32665: Error while check Item To Model Exists " +error.message);
          }
    }
}