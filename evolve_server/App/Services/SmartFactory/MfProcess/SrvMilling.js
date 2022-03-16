'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getMillingWoList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=1 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(" EERR1724: Error while getting Milling Wo List "+error.message);
            return new Error(" EERR1724: Error while getting Milling Wo List "+error.message);
        }
    },
    getMillingCompletedTriggers: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =1 AND EvolveProdOrdersDetail_NxtSeq=2 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(" EERR1725: Error while getting Milling Completed Triggers "+error.message);
            return new Error(" EERR1725: Error while getting Milling Completed Triggers "+error.message);
        }
    },

}

// 