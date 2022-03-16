'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getSectionANdPrinterDetailByMachinCode: async function(EvolveMachine_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                .query("  SELECT ep.* , em.EvolveMachine_ID , es.EvolveSection_Code , em.EvolveSection_ID from   EvolveSection es ,EvolveMachine em LEFT JOIN EvolvePrinter ep ON  ep.EvolvePrinter_ID = em.EvolvePrinter_ID    Where em.EvolveMachine_Code = @EvolveMachine_Code AND em.EvolveSection_ID = es.EvolveSection_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get  Section Code By Machine Code " + error.message);
            return new Error(" EERR####: Error while get  Section Code By Machine Code " + error.message);
        }
    },

    getWoList: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMachine_ID', Evolve.Sql.Int, data.EvolveMachine_ID)
                .query("SELECT  * FROM  EvolveProdOrders WHERE EvolveMachine_ID=@EvolveMachine_ID AND EvolveProdOrders_Status = 'PUBLISHED' ")
        } catch (error) {
            Evolve.Log.error(" EERR2748: Error while get wo list " + error.message);
            return new Error(" EERR2748: Error while get wo list " + error.message);
        }
    },

    getWoDetails: async function(EvolveProdOrders_ID) {
        try {
            let date = new Date();
            let time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
                .input("TIME", Evolve.Sql.NVarChar, time)
                .query("SELECT es.EvolveShift_Name,   eunit.EvolveUnit_Code ,  eloc.EvolveLocation_Code , euom.EvolveUom_ID ,  euom.EvolveUom_Uom ,   ei.EvolveItem_Desc1 ,  ei.EvolveItem_Part , ei.EvolveQCTemp_ID ,  epo.*   , esec.EvolveSection_Code ,  em.EvolveMachine_Code   FROM EvolveUom euom ,  EvolveItem ei ,    EvolveProdOrders epo  LEFT JOIN  EvolveSection esec ON  epo.EvolveSection_ID  = esec.EvolveSection_ID LEFT JOIN   EvolveMachine em   ON epo.EvolveMachine_ID = em.EvolveMachine_ID LEFT JOIN EvolveLocation eloc ON em.EvolveLocation_ID = eloc.EvolveLocation_ID LEFT JOIN EvolveUnit eunit ON epo.EvolveUnit_ID = eunit.EvolveUnit_ID LEFT JOIN EvolveShift es ON es.EvolveShift_Start <=  @TIME AND es.EvolveShift_End >= @TIME  WHERE  EvolveProdOrders_ID  = @EvolveProdOrders_ID AND euom.EvolveUom_ID = ei.EvolveUom_ID AND epo.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
            return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        }
    },

    getWoBomDetails: async function(EvolveProdOrders_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
                .query("SELECt  eip.EvolveItem_Part as parentPart ,   eunit.EvolveUnit_Code ,  epo.EvolveUnit_ID ,  epo.EvolveProdOrders_OrderNo , epo.EvolveProdOrders_OrderID  ,     CAST(0 AS int) as disabled , euom.EvolveUom_Uom , 0 as qty , 0 as background_color , epod.*        , ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  LEFT JOIN  EvolveUom euom ON  ei.EvolveUom_ID = euom.EvolveUom_ID , EvolveProdOrders epo  LEFT JOIN EvolveUnit eunit ON epo.EvolveUnit_ID = eunit.EvolveUnit_ID  LEFT JOIN  EvolveItem eip ON epo.EvolveItem_ID = eip.EvolveItem_ID WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID AND Epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while getting Wo  Details " + error.message);
            return new Error(" EERR1799: Erorr while getting Wo  Details " + error.message);
        }
    },

    getTransHistory: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
                .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
                .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
                .input("EvolveItem_Part", Evolve.Sql.NVarChar, data.EvolveItem_Part)

            .query("SELECT * FROM EvolveTransHistory eth , EvolveInventory einv ,EvolveInventoryDetails einvd WHERE eth.EvolveProdOrders_OrderNo= @EvolveProdOrders_OrderNo AND eth.EvolveProdOrders_OrderID= @EvolveProdOrders_OrderID AND eth.EvolveTransHistory_Type=@EvolveTransHistory_Type AND eth.EvolveItem_Part= @EvolveItem_Part AND eth.EvolveInventory_SerialNo = einv.EvolveInventory_SerialNo AND einv.EvolveInventory_ID = einvd.EvolveInventory_ID  ORDER BY eth.EvolveTransHistory_ID DESC")
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
            return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
        }
    },

    getConsumedPallet: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
                .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
                .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
                .input("EvolveItem_Part", Evolve.Sql.NVarChar, data.EvolveItem_Part)

            .query("SELECT * FROM EvolveTransHistory eth  WHERE eth.EvolveProdOrders_OrderNo= @EvolveProdOrders_OrderNo AND eth.EvolveProdOrders_OrderID= @EvolveProdOrders_OrderID AND eth.EvolveTransHistory_Type= @EvolveTransHistory_Type AND eth.EvolveItem_Part= @EvolveItem_Part   ORDER BY eth.EvolveTransHistory_ID DESC")
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
            return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
        }
    },

    getDeviceList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT ed.EvolveDevice_Code , ed.EvolveDevice_ID  FROM EvolveDevice ed , EvolveDeviceType edt Where edt.EvolveDeviceType_Name = 'Weight' AND ed.EvolveDeviceType_ID = edt.EvolveDeviceType_ID")
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error While Get Device List " + error.message);
            return new Error(" EERR#### : Error While Get Device List " + error.message);
        }
    },

    getProductDesignList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("Select EvolveProductDesign_Name , EvolveProductDesign_Code , EvolveProductDesign_ID from EvolveProductDesign")
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error While Get ProductDesign List " + error.message);
            return new Error(" EERR#### : Error While Get ProductDesign List " + error.message);
        }
    },

    getProductColourList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("  Select EvolveProductColour_Name , EvolveProductColour_Code , EvolveProductColour_ID from EvolveProductColour")
        } catch (error) {
            Evolve.Log.error(" EERR#### : Error While Get ProductColour Lise " + error.message);
            return new Error(" EERR#### : Error While Get ProductColour Lise " + error.message);
        }
    },

    findMachineLocation: async function(EvolveMachine_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMachine_Code", Evolve.Sql.NVarChar, EvolveMachine_Code)
                .query("SELECt EvolveLocation_Code ,  EvolveLocation_ID  FROM EvolveLocation WHERE EvolveLocation_Code=@EvolveMachine_Code ")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while get machine location " + error.message);
            return new Error(" EERR1799: Erorr while get machine location " + error.message);
        }
    },

    getItemDefaultLocation: async function(EvolveItem_ID) {
        try {

            console.log('EvolveItem_ID???', EvolveItem_ID)
            return await Evolve.SqlPool.request()
                .input("EvolveItem_ID", Evolve.Sql.Int, EvolveItem_ID)
                .query("SELECT  eloc.EvolveLocation_ID ,  eloc.EvolveLocation_Code  FROM  EvolveItem ei ,  EvolveLocation eloc  WHERE eloc.EvolveLocation_Code = ei.EvolveItem_Defaultloc AND ei.EvolveItem_ID = @EvolveItem_ID  ")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while get Item Default Location " + error.message);
            return new Error(" EERR1799: Erorr while get Item Default Location " + error.message);
        }
    },

    addInventory: async function(data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                // .input('EvolvePurchaseOrderRcpt_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderRcpt_ID)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
                .input('EvolveLocation_ID', Evolve.Sql.Int, data.EvolveLocation_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                // .input('EvolveInventory_MemoItem', Evolve.Sql.NVarChar, data.EvolvePurchaseOrderDetails_Type == 'M' ? data.EvolvePurchaseOrderDetails_MemoItem : '' )
                .input('EvolveInventory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)
                .input('EvolveInventory_LotSerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_LotSerialNo)
                .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
                .input('EvolveInventory_SupplierBatchNo', Evolve.Sql.NVarChar, '')
                .input('EvolveInventory_QtyRecieved', Evolve.Sql.NVarChar, 0)
                .input('EvolveInventory_QtyIssued', Evolve.Sql.NVarChar, 0)
                .input('EvolveInventory_QtyAvailable', Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
                .input('EvolveInventory_Status', Evolve.Sql.NVarChar, data.EvolveInventory_Status)
                .input('EvolveInventory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_CreatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveInventory_UpdatedUser', Evolve.Sql.NVarChar, data.EvolveUser_ID)
                .query(' INSERT INTO EvolveInventory (EvolveInventory_Status , EvolveUnit_ID, EvolveItem_ID, EvolveLocation_ID, EvolveUom_ID  ,EvolveInventory_BatchNo, EvolveInventory_LotSerialNo ,EvolveInventory_SerialNo, EvolveInventory_SupplierBatchNo ,EvolveInventory_QtyRecieved , EvolveInventory_QtyIssued ,  EvolveInventory_QtyAvailable  , EvolveInventory_CreatedAt , EvolveInventory_CreatedUser  ,EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser  ) VALUES ( @EvolveInventory_Status  , @EvolveUnit_ID, @EvolveItem_ID, @EvolveLocation_ID,@EvolveUom_ID  ,  @EvolveInventory_BatchNo,@EvolveInventory_LotSerialNo , @EvolveInventory_SerialNo, @EvolveInventory_SupplierBatchNo , @EvolveInventory_QtyRecieved , @EvolveInventory_QtyIssued , @EvolveInventory_QtyAvailable  , @EvolveInventory_CreatedAt , @EvolveInventory_CreatedUser  , @EvolveInventory_UpdatedAt , @EvolveInventory_UpdatedUser  )select @@IDENTITY AS \'inserted_id\' ');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add inventory " + error.message);
            return new Error(" EERR####: Erorr while add inventory " + error.message);
        }
    },

    addInventoryDetail: async function(id, productColour, productDesign) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                // .input('EvolvePurchaseOrderRcpt_ID', Evolve.Sql.Int, data.EvolvePurchaseOrderRcpt_ID)
                .input('EvolveInventory_ID', Evolve.Sql.Int, id)
                .input('EvolveProductColour_Code', Evolve.Sql.NVarChar, productColour)
                .input('EvolveProductDesign_Code', Evolve.Sql.NVarChar, productDesign)
                .input('EvolveInventoryDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .query(' INSERT INTO EvolveInventoryDetails (EvolveInventory_ID , EvolveProductColour_Code, EvolveProductDesign_Code, EvolveInventoryDetails_CreatedAt  ) VALUES ( @EvolveInventory_ID  , @EvolveProductColour_Code, @EvolveProductDesign_Code, @EvolveInventoryDetails_CreatedAt  )');

        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while add inventory " + error.message);
            return new Error(" EERR####: Erorr while add inventory " + error.message);
        }
    },

    updateProdOrderCompletedQty: async function(data) {
        try {

            console.log("data????", data)
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrders_ID", Evolve.Sql.Int, data.EvolveProdOrders_ID)
                .input("EvolveInventory_QtyAvailable", Evolve.Sql.NVarChar, data.EvolveInventory_QtyAvailable)
                // .input("EvolveProdOrders_IsPicklistGenerated", Evolve.Sql.Int, 1)
                .input("EvolveProdOrders_CreatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveProdOrders_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveProdOrders_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveProdOrders_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .query("UPDATE EvolveProdOrders SET  EvolveProdOrders_QtyComplete=EvolveProdOrders_QtyComplete+@EvolveInventory_QtyAvailable   , EvolveProdOrders_CreatedUser = @EvolveProdOrders_CreatedUser  , EvolveProdOrders_UpdatedUser =@EvolveProdOrders_UpdatedUser ,  EvolveProdOrders_CreatedAt =@EvolveProdOrders_CreatedAt ,  EvolveProdOrders_UpdatedAt =@EvolveProdOrders_UpdatedAt WHERE EvolveProdOrders_ID=@EvolveProdOrders_ID ")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while update work order qty " + error.message);
            return new Error(" EERR1799: Erorr while update work order qty " + error.message);
        }
    },


    checkInventoryPallet: async function(data) {
        try {

            console.log("data.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_ID", data.EvolveItem_ID)
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
                .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)

            .query("SELECT eloc.EvolveLocation_Code ,  ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveLocation eloc ON einv.EvolveLocation_ID = eloc.EvolveLocation_ID  WHERE einv.EvolveInventory_SerialNo=@EvolveInventory_SerialNo AND ei.EvolveItem_ID = @EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
            return new Error(" EERR####: Erorr while Check Inventory " + error.message);
        }
    },

    updateInventory: async function(data) {
        try {
            let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
                .input("EvolveInventory_UpdatedUser", Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input("EvolveInventory_QtyAvailable", Evolve.Sql.NVarChar, data.qty)
                .input("EvolveInventory_QtyIssued", Evolve.Sql.NVarChar, data.qty)



            .query("UPDATE EvolveInventory SET EvolveInventory_QtyAvailable=EvolveInventory_QtyAvailable - @EvolveInventory_QtyAvailable  ,  EvolveInventory_QtyIssued=EvolveInventory_QtyIssued + @EvolveInventory_QtyIssued ,EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser ,EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt  WHERE EvolveInventory_SerialNo=@EvolveInventory_SerialNo")

        } catch (error) {
            Evolve.Log.error(" EERR1781: Error while update inventory " + error.message);
            return new Error(" EERR1781: Error while update inventory " + error.message);
        }
    },

    updateIssuedQty: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveProdOrdersDetail_ID", Evolve.Sql.Int, data.EvolveProdOrdersDetail_ID)
                .input("EvolveProdOrdersDetails_QtyIssued", Evolve.Sql.NVarChar, data.qty)
                .query("UPDATE EvolveProdOrdersDetail SET EvolveProdOrdersDetails_QtyIssued = EvolveProdOrdersDetails_QtyIssued + @EvolveProdOrdersDetails_QtyIssued WHERE EvolveProdOrdersDetail_ID = @EvolveProdOrdersDetail_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1799: Erorr while UpDate IssuedQty " + error.message);
            return new Error(" EERR1799: Erorr while UpDate IssuedQty " + error.message);
        }
    },

}