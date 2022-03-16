'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getJobOrderList : async function (Machine_Code){
    try {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
            .input("EvolveMachine_Code", Evolve.Sql.NVarChar, Machine_Code)
            .query('SELECT em.EvolveMachine_ID ,  epo.EvolveProdOrders_ID , epo.EvolveProdOrders_OrderNo from EvolveProdOrders epo , EvolveMachine em  WHERE em.EvolveMachine_ID = epo.EvolveMachine_ID AND em.EvolveMachine_Code = @EvolveMachine_Code');
  
    } catch (error) {
  
        Evolve.Log.error(" EERR####: Error While Get JobOrder  " + error.message);
        return new Error(" EERR####: Error While Get JobOrder  " + error.message);
    }
  },
  getBomDatailsList : async function (EvolveProdOrders_ID){
    try {
        return await Evolve.SqlPool.request()
          .input("EvolveProdOrders_ID", Evolve.Sql.Int, EvolveProdOrders_ID)
          .query("  SELECt  eip.EvolveItem_Part as parentPart ,   eunit.EvolveUnit_Code ,  epo.EvolveUnit_ID ,  epo.EvolveProdOrders_OrderNo , epo.EvolveProdOrders_OrderID  ,     CAST(0 AS int) as disabled , euom.EvolveUom_Uom , 0 as qty , 0 as background_color , epod.*        , ei.EvolveItem_Part   ,  ei.EvolveItem_Desc1 , ei.EvolveItem_Desc2   FROM  EvolveProdOrdersDetail epod   ,  EvolveItem ei  LEFT JOIN  EvolveUom euom ON  ei.EvolveUom_ID = euom.EvolveUom_ID , EvolveProdOrders epo  LEFT JOIN EvolveUnit eunit ON epo.EvolveUnit_ID = eunit.EvolveUnit_ID  LEFT JOIN  EvolveItem eip ON epo.EvolveItem_ID = eip.EvolveItem_ID WHERE epod.EvolveProdOrders_ID = @EvolveProdOrders_ID AND epod.EvolveItem_ID = ei.EvolveItem_ID AND Epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID")
      } catch (error) {
        Evolve.Log.error(" EERR1799: Erorr while getting JobOrder  Details " + error.message);
        return new Error(" EERR1799: Erorr while getting JobOrder  Details " + error.message);
      }
  },

  updateIssuedQty : async function (data){
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

  getInvList : async function (data){
    try {
        return await Evolve.SqlPool.request()
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
          .query("SELECT ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID  WHERE einv.EvolveInventory_QtyAvailable>0 AND ei.EvolveItem_ID = @EvolveItem_ID ORDER BY  EvolveInventory_CreatedAt ASC")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
        return new Error(" EERR####: Erorr while Check Inventory " + error.message);
      }
  },
  checkInventoryPallet : async function (data){
    try {

      console.log("data.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_IDdata.EvolveItem_ID" , data.EvolveItem_ID)
        return await Evolve.SqlPool.request()
          .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
          .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)

          .query("SELECT eloc.EvolveLocation_Code ,  ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveLocation eloc ON einv.EvolveLocation_ID = eloc.EvolveLocation_ID  WHERE einv.EvolveInventory_SerialNo=@EvolveInventory_SerialNo AND ei.EvolveItem_ID = @EvolveItem_ID")
      } catch (error) {
        Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
        return new Error(" EERR####: Erorr while Check Inventory " + error.message);
      }
  },
  updateInventory: async function ( data) {
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
  getTransHistory : async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveProdOrders_OrderNo", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
        .input("EvolveProdOrders_OrderID", Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderID)
        .input("EvolveTransHistory_Type", Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
        .input("EvolveItem_Part", Evolve.Sql.NVarChar, data.EvolveItem_Part)

        .query(" SELECT * FROM EvolveTransHistory WHERE EvolveProdOrders_OrderNo=@EvolveProdOrders_OrderNo AND EvolveProdOrders_OrderID=@EvolveProdOrders_OrderID AND EvolveTransHistory_Type=@EvolveTransHistory_Type AND EvolveItem_Part=@EvolveItem_Part ORDER BY EvolveTransHistory_ID DESC")
    } catch (error) {
      Evolve.Log.error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
      return new Error(" EERR#### : Error While Get Completed Work Order Details " + error.message);
    }
  },


  getMixingMachineList : async function (){
    try {
            return await Evolve.SqlPool.request()
            .query("SELECT ed.EvolveDevice_Code,em.*,es.EvolveSection_Name FROM EvolveMachine em,EvolveSection es,EvolveDevice ed WHERE em.EvolveSection_ID = es.EvolveSection_ID AND em.EvolveMachine_ID = ed.EvolveMachine_ID AND es.EvolveSection_Code = 'MIXING'");
    } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get MixingMachineList  " + error.message);
        return new Error(" EERR####: Error While Get MixingMachineList  " + error.message);
    }
  },


    
    // Quality Order Services - End


}