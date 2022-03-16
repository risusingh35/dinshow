'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPalletData: async function (data) {
        try {
            console.log("EvolveInventory_RefNumber",data.EvolveInventory_RefNumber)
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                .query("SELECT einv.EvolveInventory_ID, einv.EvolveInventory_LotNumber, einv.EvolveInventory_QtyOnHand, ei.EvolveItem_ID, ei.EvolveItem_Code, ei.EvolveItem_Desc, el.EvolveLocation_Name FROM EvolveInventory einv, EvolveItem ei, EvolveLocation el WHERE einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND (einv.EvolveInventory_Status = 'REJECT' OR einv.EvolveInventory_Status = 'SAMPLE' OR einv.EvolveInventory_Status = 'ACCEPTED') AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_RefNumber = @EvolveInventory_RefNumber")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },    
   
    getReasonList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveReason")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },       
     getTransTypeID: async function (code) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveTranstype_code", Evolve.Sql.NVarChar, code)
                .query("SELECT * FROM EvolveTranstype WHERE EvolveTranstype_code = @EvolveTranstype_code")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },    
    
    addUnplannedIssue: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            if(data.RemaingQty == 0){
                return await Evolve.SqlPool.request()
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                 .input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, data.RemaingQty)
                 .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
                 .input("EvolveInventory_PalletNotes", Evolve.Sql.NVarChar, data.Remark)
                 .input("EvolveInventory_Status", Evolve.Sql.NVarChar, 'DESTROYED')
                 .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                
                 .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveReason_ID = @EvolveReason_ID, EvolveInventory_PalletNotes = @EvolveInventory_PalletNotes, EvolveInventory_Status = @EvolveInventory_Status, EvolveTranstype_ID = @EvolveTranstype_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID")
            }else{
                return await Evolve.SqlPool.request()
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                 .input("EvolveInventory_QtyOnHand", Evolve.Sql.NVarChar, data.RemaingQty)
                 .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
                 .input("EvolveInventory_PalletNotes", Evolve.Sql.NVarChar, data.Remark)
                 .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                
                 .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveReason_ID = @EvolveReason_ID, EvolveInventory_PalletNotes = @EvolveInventory_PalletNotes, EvolveTranstype_ID = @EvolveTranstype_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID")

            }
            
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
 
}