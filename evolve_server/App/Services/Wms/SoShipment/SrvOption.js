'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //Quote Header  


    getSoHeadDetails : async function (data) {
      try {
        return await Evolve.SqlPool.request() 
        .input('EvolveSalesOrder_ID', Evolve.Sql.NVarChar, data.EvolveSalesOrder_ID)
        .query("  select eso.EvolveSalesOrder_Number  ,  eso.EvolveUnit_ID , (SELECT eadd.EvolveAddress_Street1+' ,'+eadd.EvolveAddress_Street2 FROM EvolveAddress eadd ,  EvolveSalesOrder esoc WHERE esoc.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND esoc.EvolveShipTo_ID = eadd.EvolveAddress_ID) as shipToAddress ,  (SELECT  eadd.EvolveAddress_Code FROM EvolveAddress eadd ,  EvolveSalesOrder esoc WHERE esoc.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND esoc.EvolveShipTo_ID = eadd.EvolveAddress_ID) as shipToCode  ,   ec.EvolveCustomer_Code,ec.EvolveCustomer_Name,  eso.EvolveSalesOrder_Remark , eu.EvolveUnit_Code,  (ea.EvolveAddress_Street1 + ''+ea.EvolveAddress_Street2 ) as BillToAddress , ea.EvolveAddress_Code as billToCode  from EvolveSalesOrder as eso   left join EvolveAddress as ea on  ea.EvolveAddress_ID = eso.EvolveBillTo_ID   LEFT join EvolveUnit as eu on eu.EvolveUnit_ID = eso.EvolveUnit_ID   LEFT join EvolveCustomer as ec on ec.EvolveCustomer_ID = eso.EvolveCustomer_ID where eso.EvolveSalesOrder_ID = @EvolveSalesOrder_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Single SO HEAD DETAILS  "+error.message);
        return new Error(" EERR####: Error While Get Single SO HEAD DETAILS  "+error.message);
      }
    },

    getSoLineData : async function (data) {
      try {
        return await Evolve.SqlPool.request()
          .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
          .query("select 0 as qtyPicked ,  EvolveSalesOrderLine_UM , EvolveSalesOrderLine_Number , ei.EvolveItem_Part , ei.EvolveItem_ID, EvolveSalesOrderLine_Qty , EvolveSalesOrderLine_ID , EvolveSalesOrderLine_ShippedQty , EvolveSalesOrderLine_Qty - EvolveSalesOrderLine_ShippedQty as pendingQty from EvolveSalesOrderLine as esol   left join EvolveItem as ei on esol.EvolveItem_ID = ei.EvolveItem_ID  where EvolveSalesOrder_ID = @EvolveSalesOrder_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Sales Order Line Details " + error.message);
        return new Error(" EERR####: Error While Get Sales Order Line Details " + error.message);
      }
    },
  

    getSoshipTo : async function (data) {
      try {

        return await Evolve.SqlPool.request()
        .input('EvolveShipTo_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ShipToID)
        .query("   SELECT EvolveShipTo_Code , EvolveShipTo_Address1 , EvolveShipTo_Address2  , EvolveShipTo_Address3, EvolveShipTo_Name , EvolveShipTo_City , EvolveShipTo_State , EvolveShipTo_ZipCode  FROM EvolveShipTo WHERE  EvolveShipTo_ID = @EvolveShipTo_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get SO Ship To Details  "+error.message);
        return new Error(" EERR####: Error While Get SO Ship To Details  "+error.message);
      }
    },


    getInventoryList: async function (data) {
        try {      

          console.log('data???' , data)
            return await Evolve.SqlPool.request()
            //.input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
            .input('search', Evolve.Sql.NVarChar, '%' + data.search + '%')
            .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)
            .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)


            .query("SELECT CAST(0 AS int) as isPicked , eloc.EvolveLocation_Code , env.EvolveInventory_LotSerialNo, env.EvolveInventory_BatchNo , env.EvolveInventory_SerialNo , env.EvolveInventory_SupplierBatchNo , env.EvolveInventory_QtyAvailable ,   env.EvolveInventory_ID , convert(varchar, env.EvolveInventory_CreatedAt, 103)  as EvolveInventory_CreatedAt , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, env.EvolveInventory_CreatedAt), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, env.EvolveInventory_CreatedAt), 22), 3)) as time ,  env.EvolveInventory_Status , eu.EvolveUnit_Code FROM EvolveInventory env , EvolveLocation eloc , EvolveUnit eu WHERE  env.EvolveItem_ID=@EvolveItem_ID  AND  env.EvolveUnit_ID = @EvolveUnit_ID AND env.EvolveInventory_Status != 'QCHOLD' AND eloc.EvolveLocation_ID = env.EvolveLocation_ID  AND env.EvolveUnit_ID = eu.EvolveUnit_ID    AND   env.EvolveInventory_LotSerialNo LIKE @search ORDER BY env.EvolveInventory_CreatedAt DESC");
        } catch (error) {
    
          Evolve.Log.error(" EERR####: Error While Get Inventory List "+error.message);
          return new Error(" EERR####: Error While Get Inventory List "+error.message);
        }
    },

    updateSoRemarks : async function (data) {
      try {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        .input('EvolveSalesOrder_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrder_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesOrder_Remark', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Remark)
        // .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, 'PROCESS')
        .input('EvolveSalesOrder_Status', Evolve.Sql.NVarChar, 'SOSHIPMENT')
        .query(" UPDATE EvolveSalesOrder SET EvolveSalesOrder_Remark=@EvolveSalesOrder_Remark , EvolveSalesOrder_UpdatedUser=@EvolveSalesOrder_UpdatedUser ,  EvolveSalesOrder_UpdatedAt=@EvolveSalesOrder_UpdatedAt ,EvolveSalesOrder_Status=@EvolveSalesOrder_Status  WHERE EvolveSalesOrder_ID=@EvolveSalesOrder_ID  ");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Update So Remarks  "+error.message);
        return new Error(" EERR####: Error While Update So Remarks  "+error.message);
      }
    },

    
    onPerformShipment : async function (data) {
      try {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        .input('EvolveInventory_ID', Evolve.Sql.Int, data.EvolveInventory_ID)
        .input('EvolveInventory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveInventory_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveInventory_QtyPicked', Evolve.Sql.NVarChar, data.EvolveInventory_QtyPicked)

        // .input('EvolveInventory_Status', Evolve.Sql.NVarChar, data.EvolveInventory_Status)
        // .input('EvolveSalesOrder_ID', Evolve.Sql.Int, data.EvolveSalesOrder_ID)
        // .input('EvolveSalesOrderLine_Number', Evolve.Sql.Int, data.EvolveSalesOrderLine_Number)
        .query(" UPDATE EvolveInventory SET EvolveInventory_UpdatedAt=@EvolveInventory_UpdatedAt , EvolveInventory_UpdatedUser=@EvolveInventory_UpdatedUser , EvolveInventory_QtyAvailable= EvolveInventory_QtyAvailable - @EvolveInventory_QtyPicked  WHERE  EvolveInventory_ID=@EvolveInventory_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Update inventory  on  transform shipment "+error.message);
        return new Error(" EERR####: Error While Update inventory  on  transform shipment "+error.message);
      }
    },


    updateSoLine : async function (data) {
      try {

        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrderLine_ID', Evolve.Sql.Int, data.EvolveSalesOrderLine_ID)
        .input('EvolveSalesOrderLine_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveSalesOrderLine_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
        .input('EvolveSalesOrderLine_ShippedQty', Evolve.Sql.Int, data.EvolveSalesOrderLine_ShippedQty)
        .input('EvolveSalesOrderLine_PickedQty', Evolve.Sql.Int, data.qtyPicked)

        
        .query(" UPDATE EvolveSalesOrderLine SET EvolveSalesOrderLine_UpdatedAt=@EvolveSalesOrderLine_UpdatedAt , EvolveSalesOrderLine_UpdatedUser=@EvolveSalesOrderLine_UpdatedUser ,EvolveSalesOrderLine_ShippedQty=(@EvolveSalesOrderLine_ShippedQty+@EvolveSalesOrderLine_PickedQty) WHERE  EvolveSalesOrderLine_ID=@EvolveSalesOrderLine_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Update So Line  "+error.message);
        return new Error(" EERR####: Error While Update So Line  "+error.message);
      }
    },

    getSOList : async function (data) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)

        .query(" SELECT EvolveSalesOrder_ID ,  EvolveSalesOrder_Number  FROM EvolveSalesOrder WHERE EvolveUnit_ID =@EvolveUnit_ID ");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Getting SO List "+error.message);
        return new Error(" EERR####: Error While Getting SO List "+error.message);
      }
    },

    getSONumber : async function (EvolveSalesOrder_ID) {
      try {
        return await Evolve.SqlPool.request()
        .input('EvolveSalesOrder_ID', Evolve.Sql.Int, EvolveSalesOrder_ID)
        .query(" select eso.* , eu.EvolveUnit_Code from EvolveSalesOrder eso , EvolveUnit eu where EvolveSalesOrder_ID = @EvolveSalesOrder_ID AND eso.EvolveUnit_ID = eu.EvolveUnit_ID");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Getting SO List "+error.message);
        return new Error(" EERR####: Error While Getting SO List "+error.message);
      }
    },

    addTransHistory : async function (data , EvolveUser_ID) {
      try {
        console.log("data????????", data);
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        return await Evolve.SqlPool.request()
        .input('EvolveProdOrders_OrderNo', Evolve.Sql.NVarChar, data.EvolveSalesOrder_Number)
        .input('EvolveInventory_SerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
        .input('EvolveTransHistory_LotSerialNo', Evolve.Sql.NVarChar, data.EvolveInventory_LotSerialNo)
        .input('EvolveLocation_Code', Evolve.Sql.NVarChar, data.EvolveLocation_Code)

        .input('EvolveTransHistory_LineNo', Evolve.Sql.NVarChar, data.EvolveTransHistory_LineNo)
        .input('EvolveItem_Part', Evolve.Sql.NVarChar, data.EvolveItem_Part)
        .input('EvolveTransHistory_Qty', Evolve.Sql.NVarChar, data.EvolveTransHistory_Qty)
        .input('EvolveTransHistory_BatchNo', Evolve.Sql.NVarChar, data.EvolveInventory_BatchNo)
        .input('EvolveTransHistory_Type', Evolve.Sql.NVarChar, data.EvolveTransHistory_Type)
        .input('EvolveTransHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
        .input('EvolveTransHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
        .input('user', Evolve.Sql.NVarChar,EvolveUser_ID )

        .query("INSERT INTO EvolveTransHistory  (EvolveLocation_Code , EvolveProdOrders_OrderNo , EvolveInventory_SerialNo ,EvolveTransHistory_LotSerialNo  , EvolveTransHistory_LineNo ,EvolveItem_Part   ,EvolveTransHistory_Qty  ,EvolveTransHistory_BatchNo , EvolveTransHistory_Type , EvolveTransHistory_CreatedAt, EvolveTransHistory_CreatedUser , EvolveTransHistory_UpdatedAt ) VALUES  (@EvolveLocation_Code , @EvolveProdOrders_OrderNo  , @EvolveInventory_SerialNo , @EvolveTransHistory_LotSerialNo  , @EvolveTransHistory_LineNo ,@EvolveItem_Part  ,@EvolveTransHistory_Qty  ,@EvolveTransHistory_BatchNo , @EvolveTransHistory_Type , @EvolveTransHistory_CreatedAt , @user , @EvolveTransHistory_UpdatedAt )");


      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Update inventory  on  transform shipment "+error.message);
        return new Error(" EERR####: Error While Update inventory  on  transform shipment "+error.message);
      }
    },

    
    getTransHistoryData : async function (data) {
      try {

        console.log("data????" ,  data)
        return await Evolve.SqlPool.request() 
        .input('EvolveProdOrders_OrderNo', Evolve.Sql.NVarChar, data.EvolveProdOrders_OrderNo)
        .input('EvolveTransHistory_LineNo', Evolve.Sql.NVarChar, data.EvolveTransHistory_LineNo)
        .query("SELECT * FROM EvolveTransHistory where EvolveProdOrders_OrderNo = @EvolveProdOrders_OrderNo and EvolveTransHistory_LineNo = @EvolveTransHistory_LineNo");
      } catch (error) {
        Evolve.Log.error(" EERR####: Error While Get Trans History Data  "+error.message);
        return new Error(" EERR####: Error While Get Trans History Data  "+error.message);
      }
    },
    checkInventoryPallet : async function (data){
      try {
        console.log("datadatadatadatadatadatadata" ,  data)
          return await Evolve.SqlPool.request()
            .input("EvolveInventory_SerialNo", Evolve.Sql.NVarChar, data.EvolveInventory_SerialNo)
            .input("EvolveItem_ID", Evolve.Sql.Int, data.EvolveItem_ID)
            .input("EvolveUnit_ID", Evolve.Sql.Int, data.EvolveUnit_ID)
            .query("  SELECT eloc.EvolveLocation_Code , convert(varchar, einv.EvolveInventory_CreatedAt, 103)  as EvolveInventory_CreatedAt ,  ei.EvolveItem_Part  ,  einv.EvolveInventory_Status , einv.EvolveInventory_ID , einv.EvolveUnit_ID , einv.EvolveItem_ID , einv.EvolveLocation_ID ,  einv.EvolveInventory_BatchNo ,einv.EvolveInventory_Pallet ,einv.EvolveInventory_SerialNo ,  einv.EvolveInventory_LotSerialNo , einv.EvolveInventory_QtyAvailable , einv.EvolveInventory_QtyAvailable as EvolveInventory_QtyPicked FROM  EvolveInventory einv  LEFT JOIN EvolveItem ei ON einv.EvolveItem_ID = ei.EvolveItem_ID LEFT JOIN EvolveLocation eloc ON einv.EvolveLocation_ID = eloc.EvolveLocation_ID  WHERE einv.EvolveInventory_SerialNo=@EvolveInventory_SerialNo AND ei.EvolveItem_ID = @EvolveItem_ID AND einv.EvolveUnit_ID = @EvolveUnit_ID")
        } catch (error) {
          Evolve.Log.error(" EERR####: Erorr while Check Inventory " + error.message);
          return new Error(" EERR####: Erorr while Check Inventory " + error.message);
        }
    },
    

}