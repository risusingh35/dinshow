'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getProductionReportsCount: async function (data, condition) {
        try {
          let query =
            "select count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID where EvolveProdOrderHistoryType_Code = 'PRODORD' " +
            condition;
          return await Evolve.SqlPool.request()
            // .input('startDate', Evolve.Sql.NVarChar, startDate)
            // .input('endDate', Evolve.Sql.NVarChar, endDate)
            // .query("select count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID where EvolveProdOrderHistoryType_Code = 'PRODORD' ");
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1976: Error while getting Production Reports Count "+error.message);
          return new Error(" EERR1976: Error while getting Production Reports Count "+error.message);
        }
      },


      getProductionReportsDatatableList: async function (start, length, condition) {
        try {
          let query =
            "select epodh.EvolveProdOrdersDetail_Serial, epodh.EvolveItem_Code, epodh.EvolveProdOrdersDetails_Status, ei.EvolveItem_Desc, epodh.EvolveProdOrders_Order, epodh.EvolveProdOrderHistory_UpdatedAt, ep.EvolveProcess_Name  as 'Current Sequence', (select epp.EvolveProcess_Name from EvolveProcess epp , EvolveProcessTempSeq eptss where epodh.EvolveProdOrderHistory_PrvSeq = eptss.EvolveProcessTemp_Seq and eptss.EvolveProcessTemp_ID = epodh.EvolveProcessTemp_ID AND epp.EvolveProcess_ID = eptss.EvolveProcess_ID) as 'Previous Sequence', em.EvolveMachine_Name ,(SELECT CASE WHEN EXISTS  ( SELECT edp.EvolveProdOrdersDetail_Serial  FROM EvolvePDIHistory edp WHERE edp.EvolveProdOrdersDetail_Serial = epodh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'PDI_Status'   from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID  INNER JOIN EvolveProcessTempSeq epts on epodh.EvolveProdOrderHistory_NextSeq = epts.EvolveProcessTemp_Seq and epts.EvolveProcessTemp_ID = epodh.EvolveProcessTemp_ID  inner join EvolveProcess ep on ep.EvolveProcess_ID = epts.EvolveProcess_ID  inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID    where EvolveProdOrderHistoryType_Code = 'PRODORD' " +
            condition +
            " ORDER BY epodh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
    
          //  console.log("query is >> " , query)
    
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1977: Error while getting Production Reports Datatable List "+error.message);
          return new Error(" EERR1977: Error while getting Production Reports Datatable List "+error.message);
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
          Evolve.Log.error(" EERR1978: Error while getting Item "+error.message);
          return new Error(" EERR1978: Error while getting Item "+error.message);
        }
      },

      getProcessList: async function (id, start, length) {
        try {
          return await Evolve.SqlPool.request()
            //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(
              "SELECT EvolveProcess_ID , EvolveProcess_Name from EvolveProcess ORDER BY EvolveProcess_ID"
            );
        } catch (error) {
          Evolve.Log.error(" EERR1979: Error while getting Process List "+error.message);
          return new Error(" EERR1979: Error while getting Process List "+error.message);
        }
      },

      
  getMachineList: async function (id, start, length) {
    try {
      return await Evolve.SqlPool.request()
        //   .input('EvolveShift_CreatedUser', Evolve.Sql.Int, id)
        .input("start", Evolve.Sql.Int, start)
        .input("length", Evolve.Sql.Int, length)
        .query(
          "  SELECT EvolveMachine_ID , EvolveMachine_Name from EvolveMachine ORDER BY EvolveMachine_ID"
        );
    } catch (error) {
      Evolve.Log.error(" EERR1980: Error while getting Machine List "+error.message);
      return new Error(" EERR1980: Error while getting Machine List "+error.message);
    }
  },


}