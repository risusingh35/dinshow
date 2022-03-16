'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDoStatusReportCount: async function (condition) {
        try {
          let query =
            "SELECT  COUNT(edoh.EvolveDoHistory_ID) as count  FROM EvolveDoHistory edoh inner join EvolveSalesOrder eso on eso.EvolveSalesOrder_Number =  edoh.EvolveSo_Number inner join EvolveSalesOrderLine esol on esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID , EvolveItem ei where  edoh.EvolveDoLine_Part = ei.EvolveItem_Code" +
            condition;
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1962: Error while getting Do Status Report Count "+error.message);
          return new Error(" EERR1962: Error while getting Do Status Report Count "+error.message);
        }
      },
      getDoStatusReportDatatableList: async function (start, length, condition) {
        try {
          let query =
            "SELECT edoh.EvolveSo_Number , edoh.EvolveDo_Number , edoh.EvolveDoLine_CustPart ,edoh.EvolveDoLine_DoQty ,edoh.EvolveSoLine_Number ,edoh.EvolveDoLine_Part,eso.EvolveSalesOrder_Billto,(SELECT EvolveSupplier_ID FROM EvolveSupplier es WHERE es.EvolveSupplier_Code =  eso.EvolveSalesOrder_Billto) ,CONVERT (varchar, edoh.EvolveDoHistory_CreatedAt , 3) as EvolveDoHistory_CreatedAt,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE edoh.EvolveDoLine_Part = ei.EvolveItem_Code) as EvolveItem_Desc,esol.EvolveSalesOrderLine_OrderQty  ,(SELECT SUM(edoh2.EvolveDoLine_DoQty) FROM EvolveDoHistory edoh2 WHERE edoh2.EvolveSoLine_Number = esol.EvolveSalesOrderLine_Number and edoh2.EvolveSo_Number = edoh.EvolveSo_Number)as usedQty ,edoh.EvolveDoLine_Status,edoh.EvolveDoLine_PDIQty ,eso.EvolveSalesOrder_Date FROM EvolveDoHistory edoh inner join EvolveSalesOrder eso on eso.EvolveSalesOrder_Number =  edoh.EvolveSo_Number inner join EvolveSalesOrderLine esol on esol.EvolveSalesOrder_ID = eso.EvolveSalesOrder_ID AND edoh.EvolveDoLine_Part = esol.EvolveSalesOrderLine_Part" +
            condition +
            " ORDER BY edoh.EvolveDo_Number desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1963: Error while getting Do Status Report Datatable List "+error.message);
          return new Error(" EERR1963: Error while getting Do Status Report Datatable List "+error.message);
        }
      },

      getCustCode: async function (search) {
        try {
          let query =
            "SELECT TOP(20) EvolveSupplier_Code as title , EvolveSupplier_ID as id FROM EvolveSupplier WHERE EvolveSupplier_Code LIKE  '%" +
            search +
            "%'";
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1964: Error while getting Cust Code "+error.message);
          return new Error(" EERR1964: Error while getting Cust Code "+error.message);
        }
      },



}