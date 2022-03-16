'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
  
    getAllDoSup: async function () {
        try {
          return await Evolve.SqlPool.request().query(
            "SELECT DISTINCT edo.EvolveDO_ID, edo.EvolveDO_SONumber , edo.EvolveDO_Number, es.EvolveSupplier_Name, es.EvolveSupplier_Code, es.EvolveSupplier_ID FROM EvolveDo edo, EvolveSalesOrder eso, EvolveSupplier es WHERE  edo.EvolveDO_SONumber = eso.EvolveSalesOrder_Number AND eso.EvolveSalesOrder_Cust = es.EvolveSupplier_Code"
          );
        } catch (error) {
          Evolve.Log.error(" EERR1840: Error while getting All Do Sup "+error.message);
          return new Error(" EERR1840: Error while getting All Do Sup "+error.message);
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
          Evolve.Log.error(" EERR1841: Error while getting Single DO SO Data "+error.message);
          return new Error(" EERR1841: Error while getting Single DO SO Data "+error.message);
        }
      },
      getDoLine: async function (data) {
        try {
          return await Evolve.SqlPool.request()
            .input("EvolveDO_ID", Evolve.Sql.Int, data.EvolveDO_ID)
            .query("SELECT * FROM EvolveDoLine WHERE EvolveDO_ID = @EvolveDO_ID  ");
        } catch (error) {
          Evolve.Log.error(" EERR1842: Error while getting Do Line "+error.message);
          return new Error(" EERR1842: Error while getting Do Line "+error.message);
        }
      },

      
  getPDISingleData: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT edo.EvolveDO_Number, edo.EvolveDO_CreatedAt, edo.EvolveDO_SONumber,EvolveDOLine_QtyDO,(SELECT DISTINCT es.EvolveSupplier_Name FROM EvolveSupplier es  WHERE es.EvolveSupplier_Code = eso.EvolveSalesOrder_Cust) as 'Customer_Name',eso.EvolveSalesOrder_Shipto, eso.EvolveSalesOrder_Billto,edol.EvolveDOLine_Part,(select GETDATE() ) as 'date', edo.EvolveDO_LRDate , edo.EvolveDO_VehicelNumber, edo.EvolveDO_Transporter , ei.EvolveItem_ID ,(SELECT eit.EvolveItem_Code FROM EvolveSubItem esi , EvolveItem eit WHERE esi.EvolveSubItem_ActualItemID = ei.EvolveItem_ID AND eit.EvolveItem_ID = esi.EvolveSubItem_SubItem_ID) as 'sub_item' FROM EvolveDoLine edol, EvolveDo edo, EvolveSalesOrder eso , EvolveItem ei WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDO_ID = edo.EvolveDO_ID AND eso.EvolveSalesOrder_Number = edo.EvolveDO_SONumber AND ei.EvolveItem_Code = edol.EvolveDOLine_Part"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1843: Error while getting PDI Single Data "+error.message);
      return new Error(" EERR1843: Error while getting PDI Single Data "+error.message);
    }
  },
  getAllPdiTempDetail: async function (data) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, data.EvolveDOLine_ID)
        .query(
          "SELECT eptd.* FROM EvolveDoLine edol, EvolveItem ei, EvolvePDITemplateDetail eptd WHERE edol.EvolveDOLine_ID = @EvolveDOLine_ID AND edol.EvolveDOLine_Part = ei.EvolveItem_Code AND ei.EvolvePDITemplate_ID = eptd.EvolvePDITemplate_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1844: Error while getting All Pdi Temp Detail "+error.message);
      return new Error(" EERR1844: Error while getting All Pdi Temp Detail "+error.message);
    }
  },
  getPDIData: async function (EvolveDOLine_ID) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveDOLine_ID", Evolve.Sql.Int, EvolveDOLine_ID)
        .query(
          "SELECT * FROM EvolvePDIHistory WHERE EvolveDOLine_ID = @EvolveDOLine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1845: Error while getting PDI Data "+error.message);
      return new Error(" EERR1845: Error while getting PDI Data "+error.message);
    }
  },

  checkPdiAvailibility: async function (EvolveItem_Code) {
    try {
      return await Evolve.SqlPool.request()
        .input("EvolveItem_Code", Evolve.Sql.NVarChar, EvolveItem_Code)
        .query(
          "SELECT * FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1846: Error while checking Pdi Availibility "+error.message);
      return new Error(" EERR1846: Error while checking Pdi Availibility "+error.message);
    }
  },


}