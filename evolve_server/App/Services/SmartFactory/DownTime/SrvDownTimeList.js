'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


        // Andon  Report


        getAndonReportListCountList: async function (data) {
            try {
              
                return await Evolve.SqlPool.request()
                   .query("SELECT COUNT(EvolveBreakDownReport_ID) AS count from EvolveBreakDownReport");
            } catch (error) {
                Evolve.Log.error(" EERR1657: Error while getting Andon Report List Count List "+error.message);
                return new Error(" EERR1657: Error while getting Andon Report List Count List "+error.message);
            }
        },
    
        getAndonReportListDatatableList: async function (start,length,data) {
            try {
     
                    return await Evolve.SqlPool.request()
                        .input('start', Evolve.Sql.Int, start)
                        .input('length', Evolve.Sql.Int, length)
                        .query("SELECT EvolveBreakDownReport.*,EvolveMachine.EvolveMachine_Name from EvolveBreakDownReport , EvolveMachine  WHERE EvolveMachine.EvolveMachine_ID = EvolveBreakDownReport.EvolveBreakDownReport_EvolveMachine_ID order by EvolveBreakDownReport_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
                } catch (error) {
                    Evolve.Log.error(" EERR1658:  Error while getting Andon Report List Datatable List "+error.message);
                    return new Error(" EERR1658:  Error while getting Andon Report List Datatable List "+error.message);
                }
        },



}