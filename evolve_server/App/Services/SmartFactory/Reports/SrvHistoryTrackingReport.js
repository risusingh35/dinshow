'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getHistoryTrackReport: async function (condition) {
        try {
          let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
          let query =
            "SELECT epoh.EvolveProdOrdersDetail_Serial , epoh.EvolveProdOrders_Order , epoh.EvolveItem_Code , ept.EvolveProcessTemp_Name , em.EvolveMachine_Name , es.EvolveSection_Name , epoh.EvolveProdOrderHistoryType_Code , ep.EvolveProcess_Name , epv.EvolveProcessVal_Desc , epoh.EvolveProcess_Value , epoh.EvolveProdOrderHistory_CreatedAt as start_time, epoh.EvolveProdOrderHistory_UpdatedAt as end_time , epoh.EvolveProdOrdersDetails_Status as prod_status FROM EvolveProdOrdersHistory epoh INNER JOIN EvolveProcessTemp ept ON ept.EvolveProcessTemp_ID = epoh.EvolveProcessTemp_ID INNER JOIN EvolveMachine em ON em.EvolveMachine_ID = epoh.EvolveMachine_ID INNER JOIN EvolveSection es ON es.EvolveSection_ID = em.EvolveSection_ID INNER JOIN EvolveProcess ep ON ep.EvolveProcess_ID = epoh.EvolveProcess_ID INNER JOIN EvolveProcessVal epv ON epv.EvolveProcessVal_ID = epoh.EvolveProcessVal_ID  " +
            condition +
            " ORDER BY epoh.EvolveMachine_ID ASC";
          // console.log('query---', query);
          return await Evolve.SqlPool.request()
            // .input('TodayDate', Evolve.Sql.NVarChar, dataTime)
            .query(query);
        } catch (error) {
          Evolve.Log.error(" EERR1965: Error while getting History Track Report "+error.message);
          return new Error(" EERR1965: Error while getting History Track Report "+error.message);
        }
      },
    



}