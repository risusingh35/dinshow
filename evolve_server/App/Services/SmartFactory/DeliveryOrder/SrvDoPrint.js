'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
  getAllDoSup: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT DISTINCT edo.EvolveDO_ID, edo.EvolveDO_SONumber , edo.EvolveDO_Number, es.EvolveSupplier_Name, es.EvolveSupplier_Code, es.EvolveSupplier_ID FROM EvolveDo edo, EvolveSalesOrder eso, EvolveSupplier es WHERE  edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND eso.EvolveSalesOrder_Cust = es.EvolveSupplier_Code"
      );
    } catch (error) {
      Evolve.Log.error(" EERR1653: Error while getting All Do Sup "+error.message);
      return new Error(" EERR1653: Error while getting All Do Sup "+error.message);
    }
  },
  

  getSingleDOSOData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query(
          "SELECT edo.EvolveDO_SONumber, edo.EvolveDO_CreatedAt,(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'billTo_City',(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'shipTo_City',edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter, eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto FROM EvolveDo edo, EvolveSalesOrder eso WHERE edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND edo.EvolveDO_ID = @EvolveDO_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1654: Error while getting Single DO SO Data "+error.message);
      return new Error(" EERR1654: Error while getting Single DO SO Data "+error.message);
    }
  },
  getDoLine: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query("SELECT * FROM EvolveDoLine WHERE EvolveDO_ID = @EvolveDO_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1655: Error while getting Do Line  "+error.message);
      return new Error(" EERR1655: Error while getting Do Line  "+error.message);
    }
  },

  getDoLineDetails: async function (data) {
    try {
      // SELECT  ed.EvolveDO_Number , es.EvolveSupplier_Name , ed.EvolveDO_VehicelNumber , ei.EvolveItem_Code , ei.EvolveItem_Desc
      // FROM  EvolveDoLine edl , EvolveDo ed , EvolveItem ei , EvolveSalesOrder eso , EvolveSupplier es
      // WHERE edl.EvolveDOLine_ID = 1
      // AND ed.EvolveDO_ID = edl.EvolveDO_ID
      // AND ei.EvolveItem_Code = edl.EvolveDOLine_Part
      // AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber
      // AND es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust

      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query("SELECT edl.EvolveDoLine_ID , ed.EvolveDO_Number , es.EvolveSupplier_Name , ed.EvolveDO_VehicelNumber , ei.EvolveItem_Code , ei.EvolveItem_Desc , edl.EvolveDOLine_QtyDO  FROM  EvolveDoLine edl , EvolveDo ed , EvolveItem ei , EvolveSalesOrder eso , EvolveSupplier es  WHERE edl.EvolveDOLine_ID = @EvolveDOLine_ID AND ed.EvolveDO_ID = edl.EvolveDO_ID AND ei.EvolveItem_Code = edl.EvolveDOLine_Part  AND eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber AND es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust");
    } catch (error) {
      Evolve.Log.error(" EERR1656: Error while getting Do Line Details "+error.message);
      return new Error(" EERR1656: Error while getting Do Line Details "+error.message);
    }
  },

  getMrpPrintData : async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input('EvolvePriceList_ItemCode',Evolve.Sql.NVarChar ,data.EvolvePriceList_ItemCode)
        .query("SELECT * FROM EvolvePriceList WHERE EvolvePriceList_ItemCode LIKE @EvolvePriceList_ItemCode");
    } catch (error) {
      Evolve.Log.error("Error while getting MRP price data "+error.message);
      return new Error("Error while getting MRP price data "+error.message);
    }
  },




}