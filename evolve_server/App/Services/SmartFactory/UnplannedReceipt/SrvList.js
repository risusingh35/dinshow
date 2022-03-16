'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (search) {
        try {
            let query = "SELECT EvolveItem_Code as title, EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%'"
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error("EERR3015: Error while getting Item search "+error.message);
            return new Error("EERR3015: Error while getting Item search"+error.message);
        }
    },    
    getItemData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT ei.EvolveItem_ID, ei.EvolveItem_Code, ei.EvolveItem_Desc, ei.EvolveUom_ID, euom.EvolveUom_Uom FROM EvolveItem ei, EvolveUom euom WHERE ei.EvolveUom_ID = euom.EvolveUom_ID AND EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error("EERR3016: Error while getting Item data "+error.message);
            return new Error("EERR3016: Error while getting Item data"+error.message);
        }
    },    
    getSecUomList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
                .query("SELECT euc.*, eu.EvolveUom_Uom FROM EvolveUomConv euc, EvolveUom eu WHERE euc.EvolveItem_ID = @EvolveItem_ID AND euc.EvolveUom_ID = @EvolveUom_ID AND eu.EvolveUom_ID = euc.EvolveUomConv_AlternateUom_ID")
        } catch (error) {
            Evolve.Log.error("EERR3017: Error while getting Second Uom List "+error.message);
            return new Error("EERR3017: Error while getting Second Uom List"+error.message);
        }
    },    
    getLocationList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_Type = 'I'")
        } catch (error) {
            Evolve.Log.error("EERR3018: Error while getting Location List "+error.message);
            return new Error("EERR3018: Error while getting Location List"+error.message);
        }
    },    
    getReasonList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveReason")
        } catch (error) {
            Evolve.Log.error("EERR3019: Error while getting Reason List "+error.message);
            return new Error("EERR3019: Error while getting Reason List"+error.message);
        }
    },       
    getTransTypeID: async function (code) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveTranstype_code", Evolve.Sql.NVarChar, code)
                .query("SELECT * FROM EvolveTranstype WHERE EvolveTranstype_code = @EvolveTranstype_code")
        } catch (error) {
            Evolve.Log.error("EERR3020: Error while getting Trans type "+error.message);
            return new Error("EERR3020: Error while getting Trans type"+error.message);
        }
    },    
    addUnplannedReceipt: async function (data) {
        try {
            let dt = data.RCPTDate.split("/")
            let RCPTDate = dt[2] + "-" + dt[1] + "-" + dt[0];
            if(data.SecUom_ID == ''){
                data.SecUom_ID = null;
            }
            if(data.SecQty == ''){
                data.SecQty = null;
            }

            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                 .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                 .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.RCPTQty)
                 .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
                 .input("EvolveInventory_SecondaryUom", Evolve.Sql.Int, data.SecUom_ID)
                 .input("EvolveInventory_SecondaryUomQty", Evolve.Sql.Int, data.SecQty)
                 .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                 .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                 .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                 .input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
                 .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
                 .input("EvolveInventory_PalletNotes", Evolve.Sql.NVarChar, data.Remark)
                 .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, data.Remark)
                 .input("EvolveInventory_Status", Evolve.Sql.NVarChar, 'QCHOLD')
                 .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, 'ERPPOSTED')
                 .input("EvolveInventory_ReceiptDate", Evolve.Sql.NVarChar, RCPTDate)
                 .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)

                 .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                 .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveInventory (EvolveItem_ID, EvolveLocation_ID, EvolveInventory_QtyOnHand, EvolveInventory_LotNumber, EvolveInventory_RefNumber, EvolveInventory_Status, EvolveReason_ID, EvolveInventory_CustLotRef, EvolveInventory_ReceiptDate, EvolveInventory_PostingStatus, EvolveTranstype_ID, EvolveUom_ID, EvolveInventory_SecondaryUom, EvolveInventory_SecondaryUomQty, EvolveInventory_PalletNotes, EvolveInventory_LotNotes, EvolveInventory_CreatedAt, EvolveInventory_CreatedUser, EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser) VALUES (@EvolveItem_ID, @EvolveLocation_ID, @EvolveInventory_QtyOnHand, @EvolveInventory_LotNumber, @EvolveInventory_RefNumber, @EvolveInventory_Status, @EvolveReason_ID, @EvolveInventory_CustLotRef, @EvolveInventory_ReceiptDate, @EvolveInventory_PostingStatus, @EvolveTranstype_ID, @EvolveUom_ID, @EvolveInventory_SecondaryUom, @EvolveInventory_SecondaryUomQty, @EvolveInventory_PalletNotes, @EvolveInventory_LotNotes,  @EvolveInventory_CreatedAt, @EvolveInventory_CreatedUser, @EvolveInventory_UpdatedAt, @EvolveInventory_UpdatedUser);select @@IDENTITY AS 'inserted_id'")
        } catch (error) {
            Evolve.Log.error("EERR3021: Error while add unplanned Receipt "+error.message);
            return new Error("EERR3021: Error while add unplanned Receipt"+error.message);
        }
    },
    addTranstionHistory: async function (data) {
        try {
            let dt = data.RCPTDate.split("/")
            let RCPTDate = dt[2] + "-" + dt[1] + "-" + dt[0];

            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                 .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
                 .input("EvolveUom_ID", Evolve.Sql.Int, data.EvolveUom_ID)
                 .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 .input("EvolveTransitionHistory_Quantity", Evolve.Sql.Int, data.RCPTQty)
                 .input("EvolveReason_ID", Evolve.Sql.Int, data.EvolveReason_ID)
                 .input("EvolveTransitionHistory_Description", Evolve.Sql.NVarChar, data.Remark)

                //  .input("EvolveInventory_SecondaryUom", Evolve.Sql.Int, data.SecUom_ID)
                //  .input("EvolveInventory_SecondaryUomQty", Evolve.Sql.Int, data.SecQty)
                //  .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                //  .input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, data.EvolveInventory_CustLotRef)
                //  .input("EvolveInventory_Status", Evolve.Sql.NVarChar, 'QCHOLD')
                //  .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, 'ERPPOSTED')
                //  .input("EvolveInventory_ReceiptDate", Evolve.Sql.NVarChar, RCPTDate)
                //  .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)

                 .input("EvolveTransitionHistory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveTransitionHistory_CreadtedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                 .input("EvolveTransitionHistory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveTransitionHistory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveTranstionHistory (EvolveItem_ID, EvolveLocation_ID, EvolveTransitionHistory_Quantity, EvolveInventory_ID, EvolveTransitionHistory_Description, EvolveReason_ID, EvolveUom_ID, EvolveTransitionHistory_CreatedAt, EvolveTransitionHistory_CreadtedUser, EvolveTransitionHistory_UpdatedAt, EvolveTransitionHistory_UpdatedUser) VALUES (@EvolveItem_ID, @EvolveLocation_ID, @EvolveTransitionHistory_Quantity, @EvolveInventory_ID, @EvolveTransitionHistory_Description, @EvolveReason_ID, @EvolveUom_ID, @EvolveTransitionHistory_CreatedAt, @EvolveTransitionHistory_CreadtedUser, @EvolveTransitionHistory_UpdatedAt, @EvolveTransitionHistory_UpdatedUser)")
        } catch (error) {
            Evolve.Log.error("EERR3022: Error while add Transtion History "+error.message);
            return new Error("EERR3022: Error while add Transtion History"+error.message);
        }
    },

}