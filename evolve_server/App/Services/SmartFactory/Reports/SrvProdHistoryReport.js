'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getProductionHistoryReportsCount: async function (data, condition) {
        try {
          return await Evolve.SqlPool.request().query(
            "select Count(epodh.EvolveProdOrdersDetail_Serial) as count from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID inner join EvolveProdOrdersHistory  epodhi on epodhi.EvolveProdOrdersDetail_Serial = epodh.EvolveProdOrdersDetail_Serial where epodh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND (epodhi.EvolveProcess_Value = 'Finished' OR  epodhi.EvolveProcess_Value = 'Semi Finished') AND epodh.EvolveProdOrdersDetails_Status = 'Completed' " +
            condition
          );
        } catch (error) {
          Evolve.Log.error(" EERR1970: Error while getting Production History Reports Count "+error.message);
          return new Error(" EERR1970: Error while getting Production History Reports Count "+error.message);
        }
      },

      getProductionHistoryReportsDatatableList: async function (start,length,condition) 
      {
        try {
          let query =
            "select epodh.EvolveProdOrdersDetail_Serial, epodh.EvolveItem_Code, convert(varchar,ei.EvolveItem_Desc) AS EvolveItem_Desc, epodh.EvolveProdOrders_Order, epodh.EvolveProdOrderHistory_UpdatedAt, epodh.EvolveProdOrdersDetails_Status , em.EvolveMachine_Name , epodhi.EvolveProcess_Value , convert(varchar,ep.EvolveProcess_Name) as 'Current Sequence', (select epp.EvolveProcess_Name from EvolveProcess epp where epp.EvolveProcess_ID = epodh.EvolveProdOrderHistory_PrvSeq) as 'Previous Sequence', (SELECT CASE WHEN EXISTS ( SELECT edp.EvolveDOLinePDI_Serial FROM EvolveDOLinePDI edp WHERE edp.EvolveDOLinePDI_Serial = epodh.EvolveProdOrdersDetail_Serial) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END ) as 'PDI_Status' from EvolveProdOrdersHistory epodh  inner join EvolveItem ei on epodh.EvolveItem_ID = ei.EvolveItem_ID inner join EvolveProcess ep on epodh.EvolveProdOrderHistory_NextSeq  = ep.EvolveProcess_ID inner join EvolveMachine em on epodh.EvolveMachine_ID = em.EvolveMachine_ID inner join EvolveProdOrdersHistory  epodhi on epodhi.EvolveProdOrdersDetail_Serial = epodh.EvolveProdOrdersDetail_Serial          where epodh.EvolveProdOrderHistoryType_Code = 'PRODORD' AND epodh.EvolveProdOrdersDetails_Status = 'Completed'AND (epodhi.EvolveProcess_Value = 'Finished' OR  epodhi.EvolveProcess_Value = 'Semi Finished') " +
            condition +
            " ORDER BY epodh.EvolveProdOrdersDetail_Serial desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY";
          return await Evolve.SqlPool.request()
            .input("start", Evolve.Sql.Int, start)
            .input("length", Evolve.Sql.Int, length)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1971: Error while getting Production History Reports Datatable List "+error.message);
          return new Error(" EERR1971: Error while getting Production History Reports Datatable List "+error.message);
        }
      },

      getItem: async function (search) {
        try {
          let query = "SELECT TOP(20) EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE  '%" +
            search +
            "%'";
          return await Evolve.SqlPool.request().query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1972: Error while getting Item "+error.message);
          return new Error(" EERR1972: Error while getting Item "+error.message);
        }
      },

      
  getMachineList: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT EvolveMachine_ID , EvolveMachine_Name from EvolveMachine ORDER BY EvolveMachine_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1973: Error while getting Machine List "+error.message);
      return new Error(" EERR1973: Error while getting Machine List "+error.message);
    }
  },

  getProcessList: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT EvolveProcess_ID , EvolveProcess_Name from EvolveProcess ORDER BY EvolveProcess_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1974: Error while getting Process List "+error.message);
      return new Error(" EERR1974: Error while getting Process List "+error.message);
    }
  },
  getshiftList: async function () {
    try {
      return await Evolve.SqlPool.request()
        .query("SELECT EvolveShift_ID , EvolveShift_Name from EvolveShift ORDER BY EvolveShift_ID");
    } catch (error) {
      Evolve.Log.error(" EERR1975: Error while getting shift List "+error.message);
      return new Error(" EERR1975: Error while getting shift List "+error.message);
    }
  },





}