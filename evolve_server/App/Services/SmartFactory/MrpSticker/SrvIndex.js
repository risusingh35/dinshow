'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
  getAllDoSup: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT DISTINCT edo.EvolveDO_ID, edo.EvolveDO_SONumber , edo.EvolveDO_Number, es.EvolveSupplier_Name, es.EvolveSupplier_Code, es.EvolveSupplier_ID FROM EvolveDo edo, EvolveSalesOrder eso, EvolveSupplier es WHERE  edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND eso.EvolveSalesOrder_Cust = es.EvolveSupplier_Code"
      );
    } catch (error) {
      Evolve.Log.error("Error while getting All Do data "+error.message);
      return new Error("Error while getting All Do data "+error.message);
    }
  },
  
  getSingleDOSOData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
        .query("SELECT edo.EvolveDO_SONumber, edo.EvolveDO_CreatedAt,(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'billTo_City',(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',(SELECT DISTINCT es.EvolveSupplier_City FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'shipTo_City',edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter, eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto FROM EvolveDo edo, EvolveSalesOrder eso WHERE edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND edo.EvolveDO_ID = @EvolveDO_ID");
    } catch (error) {
      Evolve.Log.error("Error while getting Single DO SO Data "+error.message);
      return new Error("Error while getting Single DO SO Data "+error.message);
    }
  },
  getDoLine: async function (data) {
    try {
        // SELECT ed.EvolveDO_ID , edl.EvolveDOLine_ID , edl.EvolveDOLine_Number , edl.EvolveDOLine_Part ,edl.EvolveDOLine_QtyDO ,  epl.EvolvePriceList_ItemDesc , epl.EvolvePriceList_StdPktSize , epl.EvolvePriceList_MRPPrice , epl.EvolvePriceList_CouponOf , epl.EvolvePriceList_ID
        // FROM EvolveDo ed 
        // INNER JOIN EvolveDoLine edL ON edl.EvolveDO_ID = ed.EvolveDO_ID
        // INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber
        // INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto
        // LEFT JOIN EvolvePriceList epl  ON epl.EvolvePriceList_ItemCode = edl.EvolveDOLine_Part AND es.EvolveSupplier_PrintType = epl.EvolvePriceList_Code AND FORMAT (getdate(), 'yyyy-MM-dd') BETWEEN CONVERT(DATE,epl.EvolvePriceList_StartDate,103) AND CONVERT(DATE,epl.EvolvePriceList_ExpriryDate,103)
        // WHERE ed.EvolveDO_ID = 1 
        return await Evolve.SqlPool.request()
            .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
            .query("SELECT ed.EvolveDO_ID , edl.EvolveDOLine_ID , edl.EvolveDOLine_Number , edl.EvolveDOLine_Part ,edl.EvolveDOLine_QtyDO ,  epl.EvolvePriceList_ItemDesc , epl.EvolvePriceList_StdPktSize , epl.EvolvePriceList_MRPPrice , epl.EvolvePriceList_CouponOf , epl.EvolvePriceList_ID FROM EvolveDo ed INNER JOIN EvolveDoLine edL ON edl.EvolveDO_ID = ed.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto LEFT JOIN EvolvePriceList epl  ON epl.EvolvePriceList_ItemCode = edl.EvolveDOLine_Part AND es.EvolveSupplier_PrintType = epl.EvolvePriceList_Code AND FORMAT (getdate(), 'yyyy-MM-dd') BETWEEN CONVERT(DATE,epl.EvolvePriceList_StartDate,103) AND CONVERT(DATE,epl.EvolvePriceList_ExpriryDate,103) WHERE ed.EvolveDO_ID = @EvolveDO_ID ");
    } catch (error) {
      Evolve.Log.error("Error while getting Do Line  "+error.message);
      return new Error("Error while getting Do Line  "+error.message);
    }
  },

  getDoLineDetails: async function (data) {
    try {
        // SELECT ed.EvolveDO_ID , edl.EvolveDOLine_ID , edl.EvolveDOLine_Number , edl.EvolveDOLine_Part ,edl.EvolveDOLine_QtyDO ,  epl.EvolvePriceList_ItemDesc , epl.EvolvePriceList_StdPktSize , epl.EvolvePriceList_MRPPrice , epl.EvolvePriceList_CouponOf , epl.EvolvePriceList_ID
        // FROM EvolveDo ed 
        // INNER JOIN EvolveDoLine edL ON edl.EvolveDO_ID = ed.EvolveDO_ID
        // INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber
        // INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto
        // LEFT JOIN EvolvePriceList epl  ON epl.EvolvePriceList_ItemCode = edl.EvolveDOLine_Part AND es.EvolveSupplier_PrintType = epl.EvolvePriceList_Code AND FORMAT (getdate(), 'yyyy-MM-dd') BETWEEN CONVERT(DATE,epl.EvolvePriceList_StartDate,103) AND CONVERT(DATE,epl.EvolvePriceList_ExpriryDate,103)
        // WHERE ed.EvolveDO_ID = 1 
        return await Evolve.SqlPool.request()
            .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
            .query("SELECT ed.EvolveDO_ID , ed.EvolveDO_Number , edl.EvolveDOLine_ID , edl.EvolveDOLine_Number , edl.EvolveDOLine_Part ,edl.EvolveDOLine_QtyDO ,  epl.EvolvePriceList_ItemDesc , epl.EvolvePriceList_StdPktSize , epl.EvolvePriceList_MRPPrice , epl.EvolvePriceList_CouponOf , epl.EvolvePriceList_ID FROM EvolveDo ed INNER JOIN EvolveDoLine edL ON edl.EvolveDO_ID = ed.EvolveDO_ID INNER JOIN EvolveSalesOrder eso ON eso.EvolveSalesOrder_Number = ed.EvolveDO_SONumber INNER JOIN EvolveSupplier es ON es.EvolveSupplier_Code = eso.EvolveSalesOrder_Billto LEFT JOIN EvolvePriceList epl  ON epl.EvolvePriceList_ItemCode = edl.EvolveDOLine_Part AND es.EvolveSupplier_PrintType = epl.EvolvePriceList_Code AND FORMAT (getdate(), 'yyyy-MM-dd') BETWEEN CONVERT(DATE,epl.EvolvePriceList_StartDate,103) AND CONVERT(DATE,epl.EvolvePriceList_ExpriryDate,103) WHERE edl.EvolveDOLine_ID = @EvolveDOLine_ID ");
    } catch (error) {
      Evolve.Log.error("Error while getting Do Line Details "+error.message);
      return new Error("Error while getting Do Line Details "+error.message);
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