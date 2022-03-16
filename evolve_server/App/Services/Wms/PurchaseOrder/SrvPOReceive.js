'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    gateEntryNoList: async function (search) {
        try {
            let query = "SELECT EvolvePurchaseOrder_Number as title, EvolvePurchaseOrder_ID as id FROM EvolvePurchaseOrder WHERE EvolvePurchaseOrder_Status = 'open' AND  EvolvePurchaseOrder_Number LIKE '%" + search + "%'"
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR2117: Error in gate entry no list  "+error.message);
            return new Error(" EERR2117: Error in gate entry no list  "+error.message);
        }
    },
    // gateEntryNoList: async function (search) {
    //     try {
    //         let query = "SELECT EvolveGate_RefNumber as title, EvolveGate_ID as id FROM EvolveGate WHERE EvolveGate_ModuleType = 'MATRL' AND  EvolveGate_RefNumber LIKE '%" + search + "%'"
    //         return await Evolve.SqlPool.request().query(query);
    //     } catch (error) {
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },
}