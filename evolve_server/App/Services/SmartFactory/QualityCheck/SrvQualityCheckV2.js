'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDepartmentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveSection");
        } catch (error) {
            return new Error(" EERR2648: Error while getting Department List  "+error.message);
        }
    },    
    
    getQCMachineList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                 .input("EvolveSection_ID", Evolve.Sql.NVarChar, data.EvolveSection_ID)
                .query("SELECT * FROM EvolveMachine WHERE EvolveSection_ID = @EvolveSection_ID");
        } catch (error) {
            return new Error(" EERR2649: Error while getting Machine List  "+error.message);
        }
    },    
    getQCLotSerialList: async function (data) {
        try {
            console.log("data",data)
            let StartDateTimeFull = data.StartDateTime.split(' ');
            let dt = StartDateTimeFull[0].split("/")
            let StartTime = StartDateTimeFull[1];
            let DBStartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;  
            console.log("DBStartDateTime",DBStartDateTime)
            
            let EndDateTimeFull = data.EndDateTime.split(' ');
            let dte = EndDateTimeFull[0].split("/");
            let EndTime = EndDateTimeFull[1];
            let DBEndDateTime = dte[2] + "-" + dte[1] + "-" + dte[0] + " " + EndTime;
            console.log("DBEndDateTime",DBEndDateTime)

            return await Evolve.SqlPool.request()
                 .input("EvolveMachine_ID", Evolve.Sql.NVarChar, data.EvolveMachine_ID)
                .query("SELECT DISTINCT einv.EvolveInventory_LotNumber FROM EvolveInventory einv, EvolveItem ei, EvolveItemGroup eig, EvolveLocation el,  EvolveMachineAssign ema WHERE einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveItem_ID = ei.EvolveItem_ID AND eig.EvolveItemGroup_ID = ei.EvolveItemGroup_ID AND eig.EvolveItemGroup_Code = 'manufactured' AND el.EvolveLocation_ID = einv.EvolveLocation_ID AND el.EvolveLocation_Status = 'HOLD' AND einv.EvolveInventory_Status != 'DESTROYED' AND ema.EvolveMachine_ID = @EvolveMachine_ID AND ema.EvolveItem_ID = einv.EvolveItem_ID AND convert(varchar, einv.EvolveInventory_CreatedAt, 20) >= convert(varchar, '" + DBStartDateTime + "', 20) AND convert(varchar, einv.EvolveInventory_CreatedAt, 20) <= convert(varchar, '" + DBEndDateTime + "', 20) ");
        } catch (error) {
            return new Error(" EERR2650: Error while getting Lot/Serial List  "+error.message);
        }
    },

    getQCTabelData: async function (data) {
        try {

            console.log("data",data)
            let StartDateTimeFull = data.StartDateTime.split(' ');
            let dt = StartDateTimeFull[0].split("/")
            let StartTime = StartDateTimeFull[1];
            let DBStartDateTime = dt[2] + "-" + dt[1] + "-" + dt[0] + " " + StartTime;  
            console.log("DBStartDateTime",DBStartDateTime)
            
            let EndDateTimeFull = data.EndDateTime.split(' ');
            let dte = EndDateTimeFull[0].split("/");
            let EndTime = EndDateTimeFull[1];
            let DBEndDateTime = dte[2] + "-" + dte[1] + "-" + dte[0] + " " + EndTime;
            console.log("DBEndDateTime",DBEndDateTime)
            
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .input("EvolveMachine_ID", Evolve.Sql.NVarChar, data.EvolveMachine_ID)
                .query("SELECT einv.EvolveInventory_ID, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_LotNumber, einv.EvolveInventory_RefNumber, einv.EvolveInventory_Status, einv.EvolveInventory_CustLotRef, convert(varchar, einv.EvolveInventory_ExpireDateTime, 103) as ExpireDate, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, eitem.EvolveQCTemp_ID, eitem.EvolveQc_IsRequired, euom.EvolveUom_Uom, el.EvolveLocation_Name, einv.EvolveLocation_ID FROM EvolveInventory einv, EvolveItem eitem, EvolveItemGroup eig, EvolveUom euom, EvolveLocation el, EvolveMachineAssign ema WHERE einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eig.EvolveItemGroup_ID = eitem.EvolveItemGroup_ID AND eig.EvolveItemGroup_Code = 'manufactured' AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND el.EvolveLocation_Status = 'HOLD' AND einv.EvolveInventory_Status != 'DESTROYED' AND ema.EvolveMachine_ID = @EvolveMachine_ID AND ema.EvolveItem_ID = einv.EvolveItem_ID AND convert(varchar, EvolveInventory_CreatedAt, 20) >= convert(varchar, '" + DBStartDateTime + "', 20) AND convert(varchar, EvolveInventory_CreatedAt, 20) <= convert(varchar, '" + DBEndDateTime + "', 20)");
        } catch (error) {
            Evolve.Log.error(" EERR2651: Error while getting QC Tabel Data "+error.message);
            return new Error(" EERR2651: Error while getting QC Tabel Data "+error.message);
        }
    },    
    getqcTempData: async function (EvolveQCTemp_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveQCTemp_ID", Evolve.Sql.Int, EvolveQCTemp_ID)
                .query("SELECT EvolveQCVal_ID, EvolveQCVal_Desc, EvolveQCVal_Type, EvolveQCVal_Value  FROM EvolveQCVal WHERE EvolveQCTemp_ID = @EvolveQCTemp_ID");
        } catch (error) {
            Evolve.Log.error(" EERR2652: Error while  getting qc Temp Data "+error.message);
            return new Error(" EERR2652: Error while  getting qc Temp Data "+error.message);
        }
    },

    getQCBADLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()

                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_Status = 'BAD'");
        } catch (error) {
            Evolve.Log.error(" EERR2653: Error while  getting Bad Location List  "+error.message);
            return new Error(" EERR2653: Error while  getting Bad Location List  "+error.message);
        }
    },

    getQCGOODLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()

                .query("SELECT * FROM EvolveLocation WHERE EvolveLocation_Status = 'GOOD'");
        } catch (error) {
            Evolve.Log.error(" EERR2654: Error while  getting good Location List  "+error.message);
            return new Error(" EERR2654: Error while  getting good Location List  "+error.message);
        }
    },

    // QC Table

     // Order Number
    getQCOrderNo: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT EvolveQCOrder_Num FROM EvolveQCOrder WHERE EvolveInventory_LotNumber = @EvolveInventory_LotNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1920: Error while  getting QC Order No "+error.message);
            return new Error(" EERR1920: Error while  getting QC Order No "+error.message);
        }
    },

    // Get NCR Number
    getNCR_Num: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT TOP(1) EvolveNCR_No FROM EvolveNCR WHERE EvolveNCR_Lot_No = @EvolveNCR_Lot_No");
        } catch (error) {
            Evolve.Log.error(" EERR1923: Error while  getting NCR Num "+error.message);
            return new Error(" EERR1923: Error while  getting NCR Num "+error.message);
        }
    },
    // end
    
    // Check NCR Number
    CheckNCR_Num: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .query("SELECT TOP(1) EvolveNCR_No FROM EvolveNCR WHERE EvolveNCR_Lot_No = @EvolveNCR_Lot_No");
        } catch (error) {
            Evolve.Log.error(" EERR1924: Error while checking NCR Num "+error.message);
            return new Error(" EERR1924: Error while checking NCR Num "+error.message);
        }
    },
    // end

    // checkQCOLotExists
    checkQCOLotExists: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveInventory_LotNumber', Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .query("SELECT * FROM EvolveQCOrder WHERE EvolveInventory_LotNumber = @EvolveInventory_LotNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1927: Error while checking QCO Lot Exists "+error.message);
            return new Error(" EERR1927: Error while checking QCO Lot Exists "+error.message);
        }
    },

    addQCOrder: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let QCOrderNo =  'QC'+tableData.EvolveInventory_LotNumber
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQCOrder_Num", Evolve.Sql.NVarChar, QCOrderNo)

                .input("EvolveQCOrder_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCOrder_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCOrder_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCOrder_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrder (EvolveInventory_LotNumber, EvolveQCOrder_Num, EvolveQCOrder_CreatedAt, EvolveQCOrder_CreatedUser, EvolveQCOrder_UpdatedAt, EvolveQCOrder_UpdatedUser)VALUES (@EvolveInventory_LotNumber, @EvolveQCOrder_Num, @EvolveQCOrder_CreatedAt, @EvolveQCOrder_CreatedUser, @EvolveQCOrder_UpdatedAt, @EvolveQCOrder_UpdatedUser);select @@IDENTITY AS 'inserted_id'");
        } catch (error) {
            Evolve.Log.error(" EERR1928: Error while  adding QC Order "+error.message);
            return new Error(" EERR1928: Error while  adding QC Order "+error.message);
        }
    },

    // insert QCODetails 
    addQCOrderDetailsReject: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvovleQCOrder_ID", Evolve.Sql.Int, data.EvovleQCOrder_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_RejectedQty", Evolve.Sql.Int, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveQC_SampleQty", Evolve.Sql.Int, null)
                .input("EvolveQC_DestroyedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_AcceptedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCOrderDetails_RejectedLocation_ID", Evolve.Sql.Int, tableData.InventoryLocation)
                .input("EvolveQCOrderDetails_Sample_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Destroyed_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_AcceptedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_HoldLocation_ID", Evolve.Sql.Int, data.holdLocation)

                .input("EvovleQCOrderDetails_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvovleQCOrderDetails_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrderDetails (EvovleQCOrder_ID, EvolveInventory_LotNumber, EvolveQC_AcceptedQty, EvolveQC_RejectedQty, EvolveQC_SampleQty, EvolveQC_Pallet_No, EvovleQCOrderDetails_CreatedAt, EvovleQCOrderDetails_CreatedUser, EvovleQCOrderDetails_UpdatedAt, EvovleQCOrderDetails_UpdatedUser, EvolveQCOrderDetails_AcceptedLocation_ID, EvolveQCOrderDetails_RejectedLocation_ID, EvolveQCOrderDetails_Sample_Location_ID, EvolveQCOrderDetails_HoldLocation_ID, EvolveQC_DestroyedQty, EvolveQCOrderDetails_Destroyed_Location_ID)VALUES (@EvovleQCOrder_ID, @EvolveInventory_LotNumber, @EvolveQC_AcceptedQty, @EvolveQC_RejectedQty, @EvolveQC_SampleQty, @EvolveQC_Pallet_No, @EvovleQCOrderDetails_CreatedAt, @EvovleQCOrderDetails_CreatedUser, @EvovleQCOrderDetails_UpdatedAt, @EvovleQCOrderDetails_UpdatedUser, @EvolveQCOrderDetails_AcceptedLocation_ID, @EvolveQCOrderDetails_RejectedLocation_ID, @EvolveQCOrderDetails_Sample_Location_ID, @EvolveQCOrderDetails_HoldLocation_ID, @EvolveQC_DestroyedQty, @EvolveQCOrderDetails_Destroyed_Location_ID)");
        } catch (error) {
            Evolve.Log.error(" EERR1929: Error while  adding QC Order Details Reject "+error.message);
            return new Error(" EERR1929: Error while  adding QC Order Details Reject "+error.message);
        }
    },
    addQCOrderDetailsSample: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvovleQCOrder_ID", Evolve.Sql.Int, data.EvovleQCOrder_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_RejectedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_SampleQty", Evolve.Sql.Int, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveQC_DestroyedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_AcceptedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCOrderDetails_RejectedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Sample_Location_ID", Evolve.Sql.Int, tableData.InventoryLocation)
                .input("EvolveQCOrderDetails_Destroyed_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_AcceptedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_HoldLocation_ID", Evolve.Sql.Int, data.holdLocation)

                .input("EvovleQCOrderDetails_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvovleQCOrderDetails_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrderDetails (EvovleQCOrder_ID, EvolveInventory_LotNumber, EvolveQC_AcceptedQty, EvolveQC_RejectedQty, EvolveQC_SampleQty, EvolveQC_Pallet_No, EvovleQCOrderDetails_CreatedAt, EvovleQCOrderDetails_CreatedUser, EvovleQCOrderDetails_UpdatedAt, EvovleQCOrderDetails_UpdatedUser, EvolveQCOrderDetails_AcceptedLocation_ID, EvolveQCOrderDetails_RejectedLocation_ID, EvolveQCOrderDetails_Sample_Location_ID, EvolveQCOrderDetails_HoldLocation_ID, EvolveQC_DestroyedQty, EvolveQCOrderDetails_Destroyed_Location_ID)VALUES (@EvovleQCOrder_ID, @EvolveInventory_LotNumber, @EvolveQC_AcceptedQty, @EvolveQC_RejectedQty, @EvolveQC_SampleQty, @EvolveQC_Pallet_No, @EvovleQCOrderDetails_CreatedAt, @EvovleQCOrderDetails_CreatedUser, @EvovleQCOrderDetails_UpdatedAt, @EvovleQCOrderDetails_UpdatedUser, @EvolveQCOrderDetails_AcceptedLocation_ID, @EvolveQCOrderDetails_RejectedLocation_ID, @EvolveQCOrderDetails_Sample_Location_ID, @EvolveQCOrderDetails_HoldLocation_ID, @EvolveQC_DestroyedQty, @EvolveQCOrderDetails_Destroyed_Location_ID)");
        } catch (error) {
            Evolve.Log.error(" EERR1930: Error while  adding QC Order Details Sample "+error.message);
            return new Error(" EERR1930: Error while  adding QC Order Details Sample "+error.message);
        }
    },
    addQCOrderDetailsDestroyed: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvovleQCOrder_ID", Evolve.Sql.Int, data.EvovleQCOrder_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_RejectedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_SampleQty", Evolve.Sql.Int, null)
                .input("EvolveQC_DestroyedQty", Evolve.Sql.Int, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveQC_AcceptedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCOrderDetails_RejectedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Sample_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Destroyed_Location_ID", Evolve.Sql.Int, tableData.InventoryLocation)
                .input("EvolveQCOrderDetails_AcceptedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_HoldLocation_ID", Evolve.Sql.Int, data.holdLocation)

                .input("EvovleQCOrderDetails_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvovleQCOrderDetails_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrderDetails (EvovleQCOrder_ID, EvolveInventory_LotNumber, EvolveQC_AcceptedQty, EvolveQC_RejectedQty, EvolveQC_SampleQty, EvolveQC_Pallet_No, EvovleQCOrderDetails_CreatedAt, EvovleQCOrderDetails_CreatedUser, EvovleQCOrderDetails_UpdatedAt, EvovleQCOrderDetails_UpdatedUser, EvolveQCOrderDetails_AcceptedLocation_ID, EvolveQCOrderDetails_RejectedLocation_ID, EvolveQCOrderDetails_Sample_Location_ID, EvolveQCOrderDetails_HoldLocation_ID, EvolveQC_DestroyedQty, EvolveQCOrderDetails_Destroyed_Location_ID)VALUES (@EvovleQCOrder_ID, @EvolveInventory_LotNumber, @EvolveQC_AcceptedQty, @EvolveQC_RejectedQty, @EvolveQC_SampleQty, @EvolveQC_Pallet_No, @EvovleQCOrderDetails_CreatedAt, @EvovleQCOrderDetails_CreatedUser, @EvovleQCOrderDetails_UpdatedAt, @EvovleQCOrderDetails_UpdatedUser, @EvolveQCOrderDetails_AcceptedLocation_ID, @EvolveQCOrderDetails_RejectedLocation_ID, @EvolveQCOrderDetails_Sample_Location_ID, @EvolveQCOrderDetails_HoldLocation_ID, @EvolveQC_DestroyedQty, @EvolveQCOrderDetails_Destroyed_Location_ID)");
        } catch (error) {
            Evolve.Log.error(" EERR1931: Error while  adding QC Order Details Destroyed "+error.message);
            return new Error(" EERR1931: Error while  adding QC Order Details Destroyed "+error.message);
        }
    },
    addQCOrderDetailsAccept: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvovleQCOrder_ID", Evolve.Sql.Int, data.EvovleQCOrder_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_RejectedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_SampleQty", Evolve.Sql.Int, null)
                .input("EvolveQC_DestroyedQty", Evolve.Sql.Int, null)
                .input("EvolveQC_AcceptedQty", Evolve.Sql.Int, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCOrderDetails_RejectedLocation_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Sample_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_Destroyed_Location_ID", Evolve.Sql.Int, null)
                .input("EvolveQCOrderDetails_AcceptedLocation_ID", Evolve.Sql.Int, tableData.InventoryLocation)
                .input("EvolveQCOrderDetails_HoldLocation_ID", Evolve.Sql.Int, data.holdLocation)

                .input("EvovleQCOrderDetails_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvovleQCOrderDetails_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvovleQCOrderDetails_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCOrderDetails (EvovleQCOrder_ID, EvolveInventory_LotNumber, EvolveQC_AcceptedQty, EvolveQC_RejectedQty, EvolveQC_SampleQty, EvolveQC_Pallet_No, EvovleQCOrderDetails_CreatedAt, EvovleQCOrderDetails_CreatedUser, EvovleQCOrderDetails_UpdatedAt, EvovleQCOrderDetails_UpdatedUser, EvolveQCOrderDetails_AcceptedLocation_ID, EvolveQCOrderDetails_RejectedLocation_ID, EvolveQCOrderDetails_Sample_Location_ID, EvolveQCOrderDetails_HoldLocation_ID, EvolveQC_DestroyedQty, EvolveQCOrderDetails_Destroyed_Location_ID)VALUES (@EvovleQCOrder_ID, @EvolveInventory_LotNumber, @EvolveQC_AcceptedQty, @EvolveQC_RejectedQty, @EvolveQC_SampleQty, @EvolveQC_Pallet_No, @EvovleQCOrderDetails_CreatedAt, @EvovleQCOrderDetails_CreatedUser, @EvovleQCOrderDetails_UpdatedAt, @EvovleQCOrderDetails_UpdatedUser, @EvolveQCOrderDetails_AcceptedLocation_ID, @EvolveQCOrderDetails_RejectedLocation_ID, @EvolveQCOrderDetails_Sample_Location_ID, @EvolveQCOrderDetails_HoldLocation_ID, @EvolveQC_DestroyedQty, @EvolveQCOrderDetails_Destroyed_Location_ID)");
        } catch (error) {
            Evolve.Log.error(" EERR1932: Error while  adding QC Order Details Accept "+error.message);
            return new Error(" EERR1932: Error while  adding QC Order Details Accept "+error.message);
        }
    },
    // end

    addNCRNo: async function (data, tableData) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveNCR_No", Evolve.Sql.NVarChar, data.EvolveNCR_No)
                .input("EvolveNCR_Lot_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveNCR_Qty", Evolve.Sql.NVarChar, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveNCR_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)

                .input("EvolveNCR_CreatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveNCR_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveNCR_UpdatedAt", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveNCR_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveNCR (EvolveNCR_No, EvolveNCR_Lot_No, EvolveNCR_Qty, EvolveNCR_Pallet_No, EvolveNCR_CreatedAt, EvolveNCR_CreatedUser, EvolveNCR_UpdatedAt, EvolveNCR_UpdatedUser) VALUES (@EvolveNCR_No, @EvolveNCR_Lot_No, @EvolveNCR_Qty, @EvolveNCR_Pallet_No, @EvolveNCR_CreatedAt, @EvolveNCR_CreatedUser, @EvolveNCR_UpdatedAt, @EvolveNCR_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1933: Error while  adding NCR No "+error.message);
            return new Error(" EERR1933: Error while  adding NCR No "+error.message);
        }
    },

    addQCClear: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveInventoryFrom_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventoryTo_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)
                .input("EvolveQCClear_Qty", Evolve.Sql.Int, tableData.EvolveInventory_QtyOnHand)
                .input("EvolveQCClear_Location_ID", Evolve.Sql.Int, tableData.InventoryLocation)
                .input("EvolveQCClear_Status", Evolve.Sql.NVarChar, tableData.InventoryStatus)

                .input("EvolveQCClear_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCClear_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCClear_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCClear_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCClear (EvolveInventoryFrom_ID, EvolveInventoryTo_ID, EvolveInventory_LotNumber, EvolveQC_Pallet_No, EvolveQCClear_Qty, EvolveQCClear_Location_ID, EvolveQCClear_Status, EvolveQCClear_CreatedAt, EvolveQCClear_CreatedUser, EvolveQCClear_UpdatedAt, EvolveQCClear_UpdatedUser )VALUES (@EvolveInventoryFrom_ID, @EvolveInventoryTo_ID, @EvolveInventory_LotNumber, @EvolveQC_Pallet_No, @EvolveQCClear_Qty, @EvolveQCClear_Location_ID, @EvolveQCClear_Status, @EvolveQCClear_CreatedAt, @EvolveQCClear_CreatedUser, @EvolveQCClear_UpdatedAt, @EvolveQCClear_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error(" EERR1934: Error while  adding QC Clear "+error.message);
            return new Error(" EERR1934: Error while  adding QC Clear "+error.message);
        }
    },

    addQCHistory: async function (data, tableData, param) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveQCVal_ID", Evolve.Sql.Int, param.EvolveQCVal_ID)
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, tableData.EvolveInventory_LotNumber)
                .input("EvolvePallet_ID", Evolve.Sql.Int, data.EvolvePallet_ID)
                .input("EvolveParam_Name", Evolve.Sql.NVarChar, param.param_name)
                .input("EvolveParam_Value", Evolve.Sql.NVarChar, param.param_value)
                .input("EvolveQCHistory_Status", Evolve.Sql.NVarChar, null)
                .input("EvolveQC_Pallet_No", Evolve.Sql.NVarChar, tableData.EvolveInventory_RefNumber)

                .input("EvolveQCHistory_CreatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCHistory_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveQCHistory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)
                .input("EvolveQCHistory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveQCHistory (EvolveQCVal_ID, EvolveInventory_LotNumber, EvolvePallet_ID, EvolveParam_Name, EvolveParam_Value, EvolveQCHistory_CreatedAt, EvolveQCHistory_CreatedUser, EvolveQCHistory_UpdatedAt, EvolveQCHistory_UpdatedUser, EvolveQCHistory_Status, EvolveQC_Pallet_No)VALUES (@EvolveQCVal_ID, @EvolveInventory_LotNumber, @EvolvePallet_ID, @EvolveParam_Name, @EvolveParam_Value, @EvolveQCHistory_CreatedAt, @EvolveQCHistory_CreatedUser, @EvolveQCHistory_UpdatedAt, @EvolveQCHistory_UpdatedUser, @EvolveQCHistory_Status, @EvolveQC_Pallet_No)");
        } catch (error) {
            Evolve.Log.error(" EERR1935: Error while  adding QC History "+error.message);
            return new Error(" EERR1935: Error while  adding QC History "+error.message);
        }
    },

    updateInventory: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let updateInventory = await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventory_Status", Evolve.Sql.NVarChar, tableData.InventoryStatus)
                .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, 'ERPPOSTED')
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)

                .query("UPDATE EvolveInventory SET EvolveInventory_Status = @EvolveInventory_Status, EvolveTranstype_ID = @EvolveTranstype_ID, EvolveInventory_PostingStatus = @EvolveInventory_PostingStatus, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt WHERE EvolveInventory_ID = @EvolveInventory_ID");

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .query("SELECT einv.*, eitem.EvolveUom_ID FROM EvolveInventory einv, EvolveItem eitem WHERE einv.EvolveInventory_ID = @EvolveInventory_ID AND einv.EvolveItem_ID = eitem.EvolveItem_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1936: Error while updating Inventory "+error.message);
            return new Error(" EERR1936: Error while updating Inventory "+error.message);
        }
    },
    updateDestroyedInventory: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let updateInventory = await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .input("EvolveInventory_Status", Evolve.Sql.NVarChar, tableData.InventoryStatus)
                .input("EvolveTranstype_ID", Evolve.Sql.Int, data.EvolveTranstype_ID)
                .input("EvolveInventory_QtyOnHand", Evolve.Sql.Int, 0)
                .input("EvolveInventory_UpdatedAt", Evolve.Sql.NVarChar, dataTime)

                .query("UPDATE EvolveInventory SET EvolveInventory_Status = @EvolveInventory_Status, EvolveTranstype_ID = @EvolveTranstype_ID, EvolveInventory_QtyOnHand = @EvolveInventory_QtyOnHand, EvolveInventory_UpdatedAt = @EvolveInventory_UpdatedAt WHERE EvolveInventory_ID = @EvolveInventory_ID");

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .query("SELECT einv.*, eitem.EvolveUom_ID FROM EvolveInventory einv, EvolveItem eitem WHERE einv.EvolveInventory_ID = @EvolveInventory_ID AND einv.EvolveItem_ID = eitem.EvolveItem_ID");
        
        } catch (error) {
            Evolve.Log.error(" EERR1937: Error while update Destroyed Inventory "+error.message);
            return new Error(" EERR1937: Error while update Destroyed Inventory "+error.message);
        }
    },

    getTransType_ID: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveTranstype_code", Evolve.Sql.NVarChar, data.EvolveTranstype_Code)
                .query("SELECT EvolveTranstype_ID FROM EvolveTranstype WHERE EvolveTranstype_code = @EvolveTranstype_code");
        } catch (error) {
            Evolve.Log.error(" EERR1938: Error while getting TransType_ID "+error.message);
            return new Error(" EERR1938: Error while getting TransType_ID "+error.message);
        }
    },


    getInvUpdateData: async function (tableData) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, tableData.EvolveInventory_ID)
                .query("SELECT einv.*, convert(varchar, einv.EvolveInventory_UpdatedAt, 105) as effDate, eitem.EvolveUom_ID, eitem.EvolveItem_Code, euom.EvolveUom_Uom, eloc.EvolveLocation_Name FROM EvolveInventory einv, EvolveItem eitem, EvolveUom euom, EvolveLocation eloc WHERE einv.EvolveInventory_ID = @EvolveInventory_ID AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND eloc.EvolveLocation_ID = einv.EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1939: Error while getting Inv Update Data "+error.message);
            return new Error(" EERR1939: Error while getting Inv Update Data "+error.message);
        }
    },

    addIOData: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveIO_Data", Evolve.Sql.NVarChar, JSON.stringify(data.EvolveIO_Data))
                .input("EvolveIO_File_Data", Evolve.Sql.NVarChar, JSON.stringify(data.EvolveIO_File_Data))
                .input("EvolveIO_File_InTime", Evolve.Sql.NVarChar, dateTime)
                .input("EvolveIO_Data_Formate", Evolve.Sql.NVarChar, data.EvolveIO_Data_Formate)
                .input("EvolveIO_Code", Evolve.Sql.NVarChar, data.EvolveIO_Code)
                .input("EvolveIO_Direction", Evolve.Sql.Bit, data.EvolveIO_Direction)
                .input("EvolveIO_Status", Evolve.Sql.Bit, data.EvolveIO_Status)
                .input("EvolveIO_ERP_Type", Evolve.Sql.NVarChar, data.EvolveIO_ERP_Type)
                .query("INSERT INTO EvolveIO(EvolveIO_Data,EvolveIO_File_Data,EvolveIO_File_InTime,EvolveIO_Data_Formate,EvolveIO_Code,EvolveIO_Direction,EvolveIO_Status,EvolveIO_ERP_Type) VALUES (@EvolveIO_Data,@EvolveIO_File_Data,@EvolveIO_File_InTime,@EvolveIO_Data_Formate,@EvolveIO_Code,@EvolveIO_Direction,@EvolveIO_Status,@EvolveIO_ERP_Type)");

        } catch (error) {
            Evolve.Log.error(" EERR1940: Error while adding IO Data "+error.message);
            return new Error(" EERR1940: Error while adding IO Data "+error.message);
        }
    },

    // Qc Location
     getQcLocationLotSerialList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT DISTINCT einv.EvolveInventory_LotNumber FROM EvolveInventory einv, EvolveLocation el, EvolveItem eitem, EvolveItemGroup eig WHERE einv.EvolveInventory_Status != 'QCHOLD' AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND el.EvolveLocation_Status = 'HOLD' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eig.EvolveItemGroup_ID = eitem.EvolveItemGroup_ID AND eig.EvolveItemGroup_Code = 'manufactured'");
        } catch (error) {
            Evolve.Log.error(" EERR1945: Error while getting Qc Location Lot Serial List "+error.message);
            return new Error(" EERR1945: Error while getting Qc Location Lot Serial List "+error.message);
        }
    },
    getQCLocationTableList: async function (data) {
        try {
           
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
                .query("SELECT (select TOP(1)EvolveQCOrder_Num from EvolveQCOrder where einv.EvolveInventory_LotNumber = EvolveInventory_LotNumber) as 'QCOrder_no', (select TOP(1)EvolveNCR_No from EvolveNCR where einv.EvolveInventory_RefNumber = EvolveNCR_Pallet_No) as 'NCR_No', convert(varchar, einv.EvolveInventory_CreatedAt, 103) as InvDate, convert(varchar, einv.EvolveInventory_CreatedAt, 108) as InvTime, einv.EvolveInventory_ID, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_LotNumber, euom.EvolveUom_Uom, einv.EvolveInventory_RefNumber, einv.EvolveInventory_CustLotRef, convert(varchar, einv.EvolveInventory_ExpireDateTime, 103) as ExpireDate, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, el.EvolveLocation_Name, einv.EvolveLocation_ID, einv.EvolveInventory_Status FROM EvolveInventory einv, EvolveItem eitem, EvolveItemGroup eig, EvolveLocation el, EvolveUom euom WHERE einv.EvolveInventory_Status != 'QCHOLD' AND el.EvolveLocation_Status = 'HOLD' AND einv.EvolveInventory_PostingStatus = 'ERPPOSTED' AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eig.EvolveItemGroup_ID = eitem.EvolveItemGroup_ID AND eig.EvolveItemGroup_Code = 'manufactured' AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber"); 
            
            
             // return await Evolve.SqlPool.request()
            //     .input("EvolveInventory_LotNumber", Evolve.Sql.NVarChar, data.EvolveInventory_LotNumber)
            //     .query("SELECT einv.EvolveInventory_ID, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_LotNumber, einv.EvolveInventory_RefNumber, einv.EvolveInventory_CustLotRef, convert(varchar, einv.EvolveInventory_ExpireDateTime, 103) as ExpireDate, eitem.EvolveItem_Code, eitem.EvolveItem_Desc, euom.EvolveUom_Uom, el.EvolveLocation_Name, einv.EvolveLocation_ID, einv.EvolveInventory_Status FROM EvolveInventory einv, EvolveItem eitem , EvolveUom euom, EvolveLocation el WHERE einv.EvolveInventory_LotNumber = @EvolveInventory_LotNumber AND einv.EvolveItem_ID = eitem.EvolveItem_ID AND eitem.EvolveUom_ID = euom.EvolveUom_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND ((einv.EvolveInventory_Status = 'REJECT' AND el.EvolveLocation_Status != 'BAD') OR (einv.EvolveInventory_Status = 'SAMPLE' AND el.EvolveLocation_Status != 'BAD') OR (einv.EvolveInventory_Status = 'DESTROYED' AND el.EvolveLocation_Status != 'BAD') OR (einv.EvolveInventory_Status = 'ACCEPTED' AND el.EvolveLocation_Status != 'GOOD'))");
        } catch (error) {
            Evolve.Log.error(" EERR1946: Error while getting QC Location Table List "+error.message);
            return new Error(" EERR1946: Error while getting QC Location Table List "+error.message);
        }
    },
    saveQCLocation: async function (data) {
        try {
            let updateLocation = await Evolve.SqlPool.request()
                .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                .input("EvolveInventory_PostingStatus", Evolve.Sql.NVarChar, 'ERPPOSTED')
                .query("UPDATE EvolveInventory SET EvolveLocation_ID = @EvolveLocation_ID, EvolveInventory_PostingStatus = @EvolveInventory_PostingStatus WHERE EvolveInventory_ID = @EvolveInventory_ID");

            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                .query("SELECT einv.*, ei.EvolveItem_Code, el.EvolveLocation_Name FROM EvolveInventory einv, EvolveItem ei, EvolveLocation el WHERE einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND einv.EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1947: Error while saving QC Location "+error.message);
            return new Error(" EERR1947: Error while saving QC Location "+error.message);
        }
    },
}
