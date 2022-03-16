'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProdOrderDetailsList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("SELECT DISTINCT epod.EvolveProdOrdersDetail_ID, ei.EvolveItem_Code , epo.EvolveProdOrders_Order, epod.EvolveProdOrdersDetail_CreatedAt, epod.EvolveProdOrdersDetail_Qty, epod.EvolveProdOrdersDetail_Serial,  ep.EvolveProcess_Name , epts.EvolveProcessTemp_Seq , epo.EvolveProdOrders_OrderId FROM EvolveMachineAssign ema LEFT JOIN EvolveUser eu ON ema.EvolveUser_ID = eu.EvolveUser_ID LEFT JOIN EvolveMachine em ON ema.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveMachineAssign eptm ON em.EvolveMachine_ID = eptm.EvolveMachine_id LEFT JOIN EvolveProcessTempSeq epts ON eptm.EvolveProcess_id = epts.EvolveProcess_ID LEFT JOIN EvolveItem ei ON epts.EvolveProcessTemp_Id  = ei.EvolveProcessTemp_Id LEFT JOIN EvolveProdOrders epo ON ei.EvolveItem_ID= epo.EvolveItem_ID LEFT JOIN EvolveProdOrdersDetail epod ON epo.EvolveProdOrders_ID = epod.EvolveProdOrders_ID LEFT JOIN EvolveProcess ep ON eptm.EvolveProcess_id = ep.EvolveProcess_ID WHERE eu.EvolveUser_ID = @EvolveUser_ID AND epts.EvolveProcessTempSeq_ID <> 0 AND epo.EvolveProdOrders_ID IS NOT NULL AND epod.EvolveProdOrdersDetail_Serial IS NOT NULL AND epod.EvolveProdOrdersDetail_NxtSeq > 0 AND epts.EvolveProcessTemp_Seq = epod.EvolveProdOrdersDetail_NxtSeq AND epod.EvolveProdOrdersDetail_Status = 'INPROCESS' AND em.EvolveMachine_Status = 1 ORDER BY epod.EvolveProdOrdersDetail_ID ASC");
                
                // .query("SELECT epod.*, epo.EvolveProdOrders_Order, ei.EvolveItem_ID, ei.EvolveItem_Code,  ei.EvolveItem_Desc FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei WHERE epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting production order Details  "+error.message);
            return new Error(" EERR1240: Error while getting production order Details  "+error.message);
        }
    },
    checkFirstBarcode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .query("SELECT TOP(1) EvolveProdOrdersDetail_Serial FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Status = 'INPROCESS' ORDER BY EvolveProdOrdersDetail_ID ASC");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Prod Order Data "+error.message);
            return new Error(" EERR1240: Error while getting Prod Order Data "+error.message);
        }
    },
    getBarcodeData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .query("SELECT epo.*, epod.* FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei WHERE epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID AND epod.EvolveProdOrdersDetail_Status = 'INPROCESS' AND epod.EvolveProdOrdersDetail_Serial = @Barcode ORDER BY epod.EvolveProdOrdersDetail_ID ASC");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Prod Order Data "+error.message);
            return new Error(" EERR1240: Error while getting Prod Order Data "+error.message);
        }
    },
    getProcessValData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .query("SELECT epv.* FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei, EvolveProcessTemp ept, EvolveProcess epro, EvolveProcessTempSeq epts, EvolveProcessVal epv WHERE epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID AND ei.EvolveProcessTemp_Id = ept.EvolveProcessTemp_ID AND epts.EvolveProcessTemp_ID = ept.EvolveProcessTemp_ID AND epts.EvolveProcess_ID = epro.EvolveProcess_ID AND epv.EvolveProcess_ID = epro.EvolveProcess_ID AND epod.EvolveProdOrdersDetail_Serial = @Barcode");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Process Val Data "+error.message);
            return new Error(" EERR1240: Error while getting Process Val Data "+error.message);
        }
    },
    checkBinNo: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('BinNumber', Evolve.Sql.NVarChar, data.BinNumber)
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .query("SELECT esu.* FROM EvolveSapUpload esu, EvolveProdOrders epo, EvolveItem ei WHERE esu.EvolveSapUpload_BinNo = @BinNumber AND epo.EvolveProdOrders_Order = @Barcode AND ei.EvolveItem_ID = epo.EvolveItem_ID AND ei.EvolveItem_Code = esu.EvolveSapUpload_ItemCode");

        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while Check Bin Number"+error.message);
            return new Error(" EERR1240: Error while Check Bin Number"+error.message);
        }
    },
    getProdOrderHistory: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
                .query("SELECT epo.EvolveProdOrders_ID, epo.EvolveProdOrders_Order, ei.EvolveItem_ID, ei.EvolveItem_Code, epod.EvolveProdOrdersDetail_ID, epod.EvolveProdOrdersDetail_Serial, epod.EvolveProdOrdersDetail_NxtSeq, epod.EvolveProdOrdersDetail_PrvSeq, ei.EvolveProcessTemp_Id FROM EvolveProdOrders epo, EvolveItem ei, EvolveProdOrdersDetail epod WHERE epo.EvolveProdOrders_Order = @Barcode AND ei.EvolveItem_ID = epo.EvolveItem_ID AND epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while Get Prod Order Details data"+error.message);
            return new Error(" EERR1240: Error while Get Prod Order Details data"+error.message);
        }
    },
    updateProdOrder: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar, 'COMPLETED')

            .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolveProdOrders_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

            .query("UPDATE EvolveProdOrders SET EvolveProdOrders_Status = @EvolveProdOrdersDetail_Status, EvolveProdOrders_UpdatedAt = @EvolveProdOrders_UpdatedAt, EvolveProdOrders_UpdatedUser = @EvolveProdOrders_UpdatedUser WHERE EvolveProdOrders_Order = @Barcode");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while UPDATE Prod Status"+error.message);
            return new Error(" EERR1240: Error while UPDATE Prod Status"+error.message);
        }
    },
    
    updateProdOrderDetails: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('Barcode', Evolve.Sql.NVarChar, data.Barcode)
            .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar, 'COMPLETED')

            .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
            .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

            .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetail_Status = @EvolveProdOrdersDetail_Status, EvolveProdOrdersDetail_UpdatedAt = @EvolveProdOrdersDetail_UpdatedAt, EvolveProdOrdersDetail_UpdatedUser = @EvolveProdOrdersDetail_UpdatedUser WHERE EvolveProdOrdersDetail_Serial = @Barcode");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while UPDATE Prod Details Status"+error.message);
            return new Error(" EERR1240: Error while UPDATE Prod Details Status"+error.message);
        }
    },
    
    InsertProdOrderHistory: async function (data, ProdOrder) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, ProdOrder.EvolveProdOrders_ID)
                .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, ProdOrder.EvolveProdOrders_Order)
                .input('EvolveProdOrderDetails_ID', Evolve.Sql.Int, ProdOrder.EvolveProdOrderDetails_ID)
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, ProdOrder.EvolveProdOrdersDetail_Serial)
                .input('EvolveItem_ID', Evolve.Sql.Int, ProdOrder.EvolveItem_ID)
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, ProdOrder.EvolveItem_Code)
                .input('EvolveProcessTemp_ID', Evolve.Sql.Int, ProdOrder.EvolveProcessTemp_ID)
                .input('EvolveProcess_ID', Evolve.Sql.Int, ProdOrder.EvolveProcess_ID)
                .input('EvolveProcess_Value', Evolve.Sql.NVarChar, ProdOrder.EvolveProcess_Value)
                .input('EvolveProdOrderHistory_NextSeq', Evolve.Sql.Int, ProdOrder.EvolveProdOrderHistory_NextSeq)
                .input('EvolveProdOrderHistory_PrvSeq', Evolve.Sql.Int, ProdOrder.EvolveProdOrderHistory_PrvSeq)
                .input('EvolveMachine_ID', Evolve.Sql.Int, ProdOrder.EvolveMachine_ID)
                .input('EvolveProcessVal_ID', Evolve.Sql.Int, ProdOrder.EvolveProcessVal_ID)
                
                .input('EvolveProdOrderHistory_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrderHistory_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrderHistory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrderHistory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveProdOrdersHistory (EvolveProdOrders_ID, EvolveProdOrders_Order, EvolveProdOrderDetails_ID, EvolveProdOrdersDetail_Serial, EvolveItem_ID, EvolveItem_Code, EvolveProcessTemp_ID, EvolveProcess_ID, EvolveProcess_Value, EvolveProdOrderHistory_NextSeq , EvolveProdOrderHistory_PrvSeq, EvolveMachine_ID, EvolveProcessVal_ID, EvolveProdOrderHistory_CreatedUser,EvolveProdOrderHistory_UpdatedUser,EvolveProdOrderHistory_CreatedAt,EvolveProdOrderHistory_UpdatedAt) VALUES (@EvolveProdOrders_ID, @EvolveProdOrders_Order, @EvolveProdOrderDetails_ID, @EvolveProdOrdersDetail_Serial, @EvolveItem_ID, @EvolveItem_Code, @EvolveProcessTemp_ID, @EvolveProcess_ID, @EvolveProcess_Value, @EvolveProdOrderHistory_NextSeq , @EvolveProdOrderHistory_PrvSeq, @EvolveMachine_ID, @EvolveProcessVal_ID, @EvolveProdOrderHistory_CreatedUser,@EvolveProdOrderHistory_UpdatedUser,@EvolveProdOrderHistory_CreatedAt,@EvolveProdOrderHistory_UpdatedAt)");
        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while adding Prod Orders History "+error.message);
            return new Error(" EERR1243: Error while adding Prod Orders History "+error.message);
        }
    },
    getPrinterID: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("SELECT ep.EvolvePrinter_ID FROM EvolveUserUnitLink utul, EvolvePrinter ep WHERE utul.EvolveUser_ID = @EvolveUser_ID AND utul.EvolveUnit_ID = ep.EvolveUnit_ID")

        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while Get Printer ID "+error.message);
            return new Error(" EERR1243: Error while Get Printer ID "+error.message);
        }
    },
    addPrinterProccess : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
            .input('EvolvePrintProcess_Data', Evolve.Sql.NVarChar, data.EvolvePrintProcess_Data)
            .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
            // .input('EvolvePrintHistory_ID', Evolve.Sql.NVarChar, data.EvolvePrintHistory_ID)
            .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)

            .query(" INSERT INTO EvolvePrintProcess (EvolvePrinter_ID, EvolvePrintProcess_Data, EvolvePrintProcess_Status, EvolvePrintProcess_CreatedUser, EvolvePrintProcess_CreatedAt, EvolvePrintProcess_UpdatedUser, EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrinter_ID, @EvolvePrintProcess_Data, @EvolvePrintProcess_Status, @EvolvePrintProcess_CreatedUser, @EvolvePrintProcess_CreatedAt, @EvolvePrintProcess_UpdatedUser, @EvolvePrintProcess_UpdatedAt);select @@IDENTITY AS \'inserted_id\' ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while insert data in to print process "+error.message);
            return new Error(" EERR####: Error while insert data in to print process "+error.message);
        }
    },

    addPrinterProcessDetails : async function (data) {
        console.log("data>>>>>>>>>>>>", data);
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
            .input('EvolvePrintProcessDetails_Key', Evolve.Sql.NVarChar, data.EvolvePrintHistoryDetails_Key)
            .input('EvolvePrintProcessDetails_Value', Evolve.Sql.NVarChar, data.EvolvePrintHistoryDetails_Value)
            .input('EvolvePrintProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
       .query(" INSERT INTO EvolvePrintProcessDetails (EvolvePrintProcess_ID, EvolvePrintProcessDetails_Key, EvolvePrintProcessDetails_Value, EvolvePrintProcessDetails_CreatedUser, EvolvePrintProcessDetails_CreatedAt, EvolvePrintProcessDetails_UpdatedUser, EvolvePrintProcessDetails_UpdatedAt) VALUES (@EvolvePrintProcess_ID, @EvolvePrintProcessDetails_Key, @EvolvePrintProcessDetails_Value, @EvolvePrintProcessDetails_CreatedUser, @EvolvePrintProcessDetails_CreatedAt, @EvolvePrintProcessDetails_UpdatedUser, @EvolvePrintProcessDetails_UpdatedAt) ") 
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while insert Printer process details "+error.message);
            return new Error(" EERR####: Error while insert printer process details "+error.message);
        }
    },
    DeleteBarcode : async function (data) {
        try {
            let deleteProdOrder =  await Evolve.SqlPool.request()
                .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, data.Barcode)
                .query("DELETE FROM EvolveProdOrders WHERE EvolveProdOrders_Order = @EvolveProdOrders_Order") 
                if (deleteProdOrder instanceof Error || deleteProdOrder.rowsAffected < 1) {
                    return deleteProdOrder;
                } else {
                    return await Evolve.SqlPool.request()
                    .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.Barcode)
                    .query("DELETE FROM EvolveProdOrdersDetail WHERE EvolveProdOrdersDetail_Serial = @EvolveProdOrdersDetail_Serial") 
                }    
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete Barcode "+error.message);
            return new Error(" EERR####: Error while delete Barcode "+error.message);
        }
    },

}    