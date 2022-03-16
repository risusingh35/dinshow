'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMachineWiseProdReportsCount: async function (data, condition) {
        try {
          return await Evolve.SqlPool.request().query(
            "SELECT DISTINCT epoh.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code, epoh.EvolveProdOrders_Order ,                CONVERT(VARCHAR,ei.EvolveItem_Desc) AS EvolveItem_Desc , em.EvolveMachine_Name , epoh.EvolveProdOrderHistoryType_Code, epoh.EvolveProdOrderHistory_CreatedAt  , epoh.EvolveProdOrdersDetails_Remark , epoh.EvolveProdOrdersDetails_Operator , ep.EvolveProcess_Name , epoh.EvolvePDI_Status FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epoh.EvolveItem_ID     INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID WHERE (epoh.EvolveProdOrderHistoryType_Code = 'MFPROCESS' OR epoh.EvolveProdOrderHistoryType_Code = 'SRREJECT')" +
            condition
          );
        } catch (error) {
          Evolve.Log.error(" EERR1966: Error while getting Machine Wise Prod Reports Count "+error.message);
          return new Error(" EERR1966: Error while getting Machine Wise Prod Reports Count "+error.message);
        }
      },


      getMachineWiseProdReportsDatatableList: async function (
        start,
        length,
        condition
      ) {
        try {
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(
              "SELECT DISTINCT epoh.EvolveProdOrdersDetail_Serial , ei.EvolveItem_Code, epoh.EvolveProdOrders_Order , CONVERT(VARCHAR,ei.EvolveItem_Desc) AS EvolveItem_Desc , em.EvolveMachine_Name , epoh.EvolveProdOrderHistoryType_Code, epoh.EvolveProdOrderHistory_CreatedAt  , epoh.EvolveProdOrdersDetails_Remark , epoh.EvolveProdOrdersDetails_Operator , ep.EvolveProcess_Name , (SELECT CASE WHEN EXISTS  ( SELECT edp.EvolveProdOrdersDetail_Serial  FROM EvolvePDIHistory edp WHERE edp.EvolveProdOrdersDetail_Serial = epoh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'EvolvePDI_Status'   FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveItem ei ON ei.EvolveItem_ID = epoh.EvolveItem_ID     INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID WHERE (epoh.EvolveProdOrderHistoryType_Code = 'MFPROCESS' OR epoh.EvolveProdOrderHistoryType_Code = 'SRREJECT' )" +
              condition +
              "order by epoh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY "
              //OR  epoh.EvolveProdOrderHistoryType_Code = 'PRODORD'
            );
        } catch (error) {
          Evolve.Log.error(" EERR1967: Error while getting Machine Wise Prod Reports Datatable List "+error.message);
          return new Error(" EERR1967: Error while getting Machine Wise Prod Reports Datatable List "+error.message);
        }
      },

      getItem: async function (search) {
        try {
          let query =
            "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
            search +
            "%'";
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1968: Error while getting Item "+error.message);
          return new Error(" EERR1968: Error while getting Item "+error.message);
        }
      },

      getMachine: async function (search) {
        try {
          let query =
            "SELECT TOP(20) EvolveMachine_Name as title , EvolveMachine_ID as id FROM EvolveMachine WHERE EvolveMachine_Name LIKE  '%" +
            search +
            "%'";
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1969: Error while getting Machine "+error.message);
          return new Error(" EERR1969: Error while getting Machine "+error.message);
        }
      },
    
    


}