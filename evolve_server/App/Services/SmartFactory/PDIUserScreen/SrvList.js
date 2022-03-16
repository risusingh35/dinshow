'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT ei.EvolveItem_Code, ei.EvolveItem_ID, ei.EvolveItem_Desc FROM EvolveItem ei");
                // .query("SELECT DISTINCT ei.EvolveItem_Code, ei.EvolveItem_ID FROM EvolveSapUpload esu, EvolveItem ei WHERE ei.EvolveItem_Code = esu.EvolveSapUpload_ItemCode AND cast(esu.EvolveSapUpload_CreatedAt as Date) = cast(getdate() as Date)");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
            return new Error(" EERR1240: Error while getting Item List "+error.message);
        }
    },
    getItemQty: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT EvolveItem_load_capacity FROM EvolveItem WHERE EvolveItem_ID = @EvolveItem_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
            return new Error(" EERR1240: Error while getting Item List "+error.message);
        }
    },
    getItemCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .query("SELECT ei.EvolveItem_Code, ei.EvolveItem_Desc, epts.EvolveProcessTemp_Seq FROM EvolveItem ei, EvolveProcessTemp ept, EvolveProcessTempSeq epts WHERE ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveProcessTemp_Id = ept.EvolveProcessTemp_ID AND epts.EvolveProcessTemp_ID = ept.EvolveProcessTemp_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1240: Error while getting Item List "+error.message);
            return new Error(" EERR1240: Error while getting Item List "+error.message);
        }
    },

    addProdOrders: async function (data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            let addProdOrder =  await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveProdOrders_Quantity', Evolve.Sql.NVarChar, data.Qty)
                .input('EvolveProdOrders_OrderId', Evolve.Sql.NVarChar, data.WorkOrderNo)
                .input('EvolveProdOrders_Order', Evolve.Sql.NVarChar, data.WorkOrderNo)
                .input('EvolveProdOrders_Status', Evolve.Sql.NVarChar, 'STATED')

                .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrders_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrders_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveProdOrders (EvolveItem_ID, EvolveProdOrders_Quantity, EvolveProdOrders_OrderId, EvolveProdOrders_Order, EvolveProdOrders_Status, EvolveProdOrders_CreatedAt,EvolveProdOrders_CreatedUser, EvolveProdOrders_UpdatedUser, EvolveProdOrders_UpdatedAt) VALUES(@EvolveItem_ID , @EvolveProdOrders_Quantity, @EvolveProdOrders_OrderId, @EvolveProdOrders_Order, @EvolveProdOrders_Status, @EvolveProdOrders_CreatedAt,@EvolveProdOrders_CreatedUser, @EvolveProdOrders_UpdatedUser, @EvolveProdOrders_UpdatedAt);select @@IDENTITY AS 'inserted_id'")

            if (addProdOrder instanceof Error || addProdOrder.rowsAffected < 1) {
                return addProdOrder;
            } else {
                let EvolveProdOrders_ID =  addProdOrder.recordset[0].inserted_id;
                console.log("EvolveProdOrders_ID===",EvolveProdOrders_ID)
                return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, EvolveProdOrders_ID)
                .query("SELECT * FROM EvolveProdOrders WHERE EvolveProdOrders_ID = @EvolveProdOrders_ID")
            }
        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while adding Prod Orders "+error.message);
            return new Error(" EERR1243: Error while adding Prod Orders "+error.message);
        }
    },
    addProdOrdersDetail: async function (data, ProdOrder) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrders_ID', Evolve.Sql.Int, ProdOrder.EvolveProdOrders_ID)
                .input('EvolveProdOrdersDetail_Qty', Evolve.Sql.NVarChar, ProdOrder.EvolveProdOrders_Quantity)
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, data.WorkOrderNo)
                .input('EvolveProdOrdersDetail_Status', Evolve.Sql.NVarChar, 'INPROCESS')
                .input('EvolveProdOrdersDetail_NxtSeq', Evolve.Sql.Int, data.EvolveProdOrdersDetail_NxtSeq)

                .input('EvolveProdOrdersDetail_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrdersDetail_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrdersDetail_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrdersDetail_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveProdOrdersDetail (EvolveProdOrders_ID, EvolveProdOrdersDetail_Qty, EvolveProdOrdersDetail_Serial, EvolveProdOrdersDetail_Status, EvolveProdOrdersDetail_NxtSeq, EvolveProdOrdersDetail_CreatedAt,EvolveProdOrdersDetail_CreatedUser, EvolveProdOrdersDetail_UpdatedUser, EvolveProdOrdersDetail_UpdatedAt) VALUES(@EvolveProdOrders_ID , @EvolveProdOrdersDetail_Qty, @EvolveProdOrdersDetail_Serial, @EvolveProdOrdersDetail_Status, @EvolveProdOrdersDetail_NxtSeq, @EvolveProdOrdersDetail_CreatedAt,@EvolveProdOrdersDetail_CreatedUser, @EvolveProdOrdersDetail_UpdatedUser, @EvolveProdOrdersDetail_UpdatedAt)")

        } catch (error) {
            Evolve.Log.error(" EERR1243: Error while adding Prod Orders Details "+error.message);
            return new Error(" EERR1243: Error while adding Prod Orders Details "+error.message);
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

}    