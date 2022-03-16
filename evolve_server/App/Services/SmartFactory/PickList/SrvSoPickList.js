'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getUnPickLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
                //  .input("EvolveTranstype_code", Evolve.Sql.NVarChar, code)
                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_Status = 'GOOD'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    }, 
    getShipToList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT DISTINCT EvolveSalesOrder_Shipto FROM EvolveSalesOrder WHERE EvolveSalesOrder_Status = 'OPEN'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },    
    getSoNoList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_Shipto", Evolve.Sql.NVarChar, data.EvolveSalesOrder_Shipto)
                .query("SELECT EvolveSalesOrder_ID, EvolveSalesOrder_Number FROM EvolveSalesOrder WHERE EvolveSalesOrder_Shipto = @EvolveSalesOrder_Shipto AND EvolveSalesOrder_Status = 'OPEN'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },     
    getCustomer: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_Shipto", Evolve.Sql.NVarChar, data.EvolveSalesOrder_Shipto)
                .query("SELECT EvolveSupplier_Name FROM EvolveSupplier WHERE EvolveSupplier_Code = @EvolveSalesOrder_Shipto")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },    
    getSoLineList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
                .query("SELECT * FROM EvolveSalesOrderLine WHERE EvolveSalesOrder_ID = @EvolveSalesOrder_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getSoTableData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input("EvolveSalesOrder_ID", Evolve.Sql.Int, data.EvolveSalesOrder_ID)
            .query("SELECT esol.*,  eso.EvolveSalesOrder_Number,(SELECT SUM(EvolvePickList_QtyPick) FROM EvolveSoPickList esopl WHERE esopl.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID ) AS 'EvolvePickList_QtyPick', ei.EvolveItem_ID FROM EvolveSalesOrderLine esol, EvolveItem ei, EvolveSalesOrder eso WHERE esol.EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND eso.EvolveSalesOrder_ID = esol.EvolveSalesOrder_ID AND ei.EvolveItem_Code = esol.EvolveSalesOrderLine_Part AND esol.EvolveSalesOrderLine_Status = 'OPEN'")
            
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },    

            
    getAvailablePalletsList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT einv.*, el.EvolveLocation_Name, euom.EvolveUom_Uom FROM EvolveInventory einv, EvolveLocation el, EvolveUom euom, EvolveItem ei WHERE einv.EvolveLocation_ID = el.EvolveLocation_ID AND el.EvolveLocation_Status = 'GOOD' AND ei.EvolveItem_ID = einv.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveInventory_Status ='ACCEPTED' ORDER BY einv.EvolveInventory_ID")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getPickedPalletsList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                 .input("EvolveInventory_Status", Evolve.Sql.NVarChar, 'PICKED')
                .query("SELECT einv.*, el.EvolveLocation_Name, euom.EvolveUom_Uom, ei.EvolveItem_Code, ei.EvolveItem_Desc FROM EvolveInventory einv, EvolveLocation el, EvolveUom euom, EvolveItem ei WHERE einv.EvolveLocation_ID = el.EvolveLocation_ID AND ei.EvolveItem_ID = einv.EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveInventory_Status = @EvolveInventory_Status")
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
    getShipLocation: async function (code) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveLocation_Code", Evolve.Sql.NVarChar, code)
                .query("SELECT EvolveLocation_ID FROM EvolveLocation WHERE EvolveLocation_Code = @EvolveLocation_Code")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addSoPickList: async function (data, lineData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                 .input("EvolveSalesOrder_ID", Evolve.Sql.Int, lineData.EvolveSalesOrder_ID)
                 .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                 .input("EvolveItem_ID", Evolve.Sql.Int, lineData.EvolveItem_ID)
                 .input("EvolveSoPickList_Status", Evolve.Sql.NVarChar, 'PICKED')
                 .input("EvolvePickList_QtyPick", Evolve.Sql.Int, data.QtyPick)
                //  .input("EvolveSoPickList_ShipID", Evolve.Sql.NVarChar, data.EvolveSoPickList_ShipID)
                 .input("EvolveSoPickList_ShipID", Evolve.Sql.NVarChar, data.EvolveSoPickList_ShipID)
                
                 .input("EvolveSoPickList_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveSoPickList_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                 .input("EvolveSoPickList_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveSoPickList_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveSoPickList (EvolveSalesOrder_ID, EvolveUser_ID, EvolveItem_ID, EvolveSoPickList_Status, EvolvePickList_QtyPick, EvolveSoPickList_CreatedAt, EvolveSoPickList_CreatedUser, EvolveSoPickList_UpdatedAt, EvolveSoPickList_UpdatedUser, EvolveSoPickList_ShipID) VALUES (@EvolveSalesOrder_ID, @EvolveUser_ID, @EvolveItem_ID, @EvolveSoPickList_Status, @EvolvePickList_QtyPick, @EvolveSoPickList_CreatedAt, @EvolveSoPickList_CreatedUser, @EvolveSoPickList_UpdatedAt, @EvolveSoPickList_UpdatedUser, @EvolveSoPickList_ShipID);select @@IDENTITY AS 'inserted_id'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    addSoPickListDetails: async function (data, lineData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                 .input("EvolveSoPickList_ID", Evolve.Sql.Int, data.EvolveSoPickList_ID)
                 .input("EvolveItem_ID", Evolve.Sql.Int, lineData.EvolveItem_ID)
                 .input("EvolveSoPickListDetail_ReqQty", Evolve.Sql.Int, lineData.EvolveSalesOrderLine_OrderQty)
                 .input("EvolveSoPickListDetail_QtyPick", Evolve.Sql.Int, data.QtyPick)
                 .input("EvolveSoPickListDetail_Status", Evolve.Sql.NVarChar, 'PICKED')
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 
                 .input("EvolveSoPickListDetail_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveSoPickListDetail_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                 .input("EvolveSoPickListDetail_UpdateAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveSoPickListDetail_UpdateUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveSoPickListDetail (EvolveSoPickList_ID, EvolveItem_ID, EvolveSoPickListDetail_ReqQty, EvolveSoPickListDetail_QtyPick,EvolveSoPickListDetail_Status, EvolveInventory_ID, EvolveSoPickListDetail_CreatedAt, EvolveSoPickListDetail_CreatedUser, EvolveSoPickListDetail_UpdateAt, EvolveSoPickListDetail_UpdateUser) VALUES (@EvolveSoPickList_ID, @EvolveItem_ID, @EvolveSoPickListDetail_ReqQty, @EvolveSoPickListDetail_QtyPick, @EvolveSoPickListDetail_Status, @EvolveInventory_ID, @EvolveSoPickListDetail_CreatedAt, @EvolveSoPickListDetail_CreatedUser, @EvolveSoPickListDetail_UpdateAt, @EvolveSoPickListDetail_UpdateUser);select @@IDENTITY AS 'inserted_id'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    }, 
    updateInventory: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                 .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)

                 .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveInventory SET EvolveInventory_Status = @EvolveInventory_Status, EvolveTranstype_ID = @EvolveTranstype_ID, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser, EvolveLocation_ID = @EvolveLocation_ID WHERE EvolveInventory_ID = @EvolveInventory_ID")
              
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },       
    updateInventoryRemainingQty: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let updateInv = await Evolve.SqlPool.request()
                 .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                 .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.remainingQty)
                 .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                 .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveInventory SET EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt, EvolveInventory_UpdatedUser = @EvolveInventory_UpdatedUser WHERE EvolveInventory_ID = @EvolveInventory_ID")

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                .query("SELECT * FROM EvolveInventory WHERE EvolveInventory_ID = @EvolveInventory_ID")
              
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    AddInventoryPallet: async function (data, inventoryData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveCompany_ID", Evolve.Sql.Int, inventoryData.EvolveCompany_ID)
                .input("EvolveUnit_ID", Evolve.Sql.Int, inventoryData.EvolveUnit_ID)
                .input("EvolveItem_ID", Evolve.Sql.Int, inventoryData.EvolveItem_ID)
                .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, data.QtyPick)
                .input("EvolveInventory_QtyAllocated", Evolve.Sql.Int, inventoryData.EvolveInventory_QtyAllocated)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_LotNumber)
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.NewRefNumber)
                .input("EvolveInventory_ExpireDateTime", Evolve.Sql.NVarChar, inventoryData.ExpireDate)
                .input("EvolveInventory_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveInventory_CreatedUser", Evolve.Sql.Int, inventoryData.EvolveInventory_CreatedUser)
                .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.EvolveInventory_Status)
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, inventoryData.EvolveInventory_UpdatedUser)
                .input("EvolveInventory_LotNotes", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_LotNotes)
                .input("EvolveReason_ID", Evolve.Sql.Int, inventoryData.EvolveReason_ID)
                .input("EvolveInventory_CustLotRef", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_CustLotRef)
                .input("EvolveInventory_ReceiptDate", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_ReceiptDate)
                .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, inventoryData.EvolveInventory_PostingStatus)
               

                .query("INSERT INTO EvolveInventory (EvolveCompany_ID,EvolveUnit_ID,EvolveItem_ID,EvolveLocation_ID,EvolveInventory_QtyOnHand,EvolveInventory_QtyAllocated,EvolveInventory_LotNumber,EvolveInventory_RefNumber,EvolveInventory_ExpireDateTime,EvolveInventory_CreatedAt,EvolveInventory_CreatedUser,EvolveInventory_Status,EvolveInventory_UpdatedAt,EvolveInventory_UpdatedUser,EvolveInventory_LotNotes,EvolveReason_ID,EvolveInventory_CustLotRef, EvolveInventory_ReceiptDate, EvolveTranstype_ID, EvolveInventory_PostingStatus) VALUES (@EvolveCompany_ID,@EvolveUnit_ID,@EvolveItem_ID,@EvolveLocation_ID,@EvolveInventory_QtyOnHand,@EvolveInventory_QtyAllocated,@EvolveInventory_LotNumber,@EvolveInventory_RefNumber,@EvolveInventory_ExpireDateTime,@EvolveInventory_CreatedAt,@EvolveInventory_CreatedUser,@EvolveInventory_Status,@EvolveInventory_UpdatedAt,@EvolveInventory_UpdatedUser,@EvolveInventory_LotNotes,@EvolveReason_ID, @EvolveInventory_CustLotRef,@EvolveInventory_ReceiptDate, @EvolveTranstype_ID, @EvolveInventory_PostingStatus);select @@IDENTITY AS 'inserted_id'");
        } catch (error) {
            Evolve.Log.error(" EERR1910: Error while Inv Create New Pallet "+error.message);
            return new Error(" EERR1910: Error while Inv Create New Pallet "+error.message);
        }
    },    
    getGoodLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_Status = 'GOOD'")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
 
}