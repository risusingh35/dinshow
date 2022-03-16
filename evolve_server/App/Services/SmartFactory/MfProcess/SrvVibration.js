'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkVibrationMachinBarcode: async function (EvolveProdOrdersDetail_Serial) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveProdOrdersDetail_Serial', Evolve.Sql.NVarChar, EvolveProdOrdersDetail_Serial)
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,ei.EvolveItem_Desc,ei.EvolveItem_CustPart FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_Serial =@EvolveProdOrdersDetail_Serial AND EvolveProdOrdersDetail_PrvSeq = 1 AND EvolveProdOrdersDetail_NxtSeq = 2 AND epo.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1726: Error while getting Vibration Completed Triggers "+error.message);
            return new Error(" EERR1726: Error while getting Vibration Completed Triggers "+error.message);
        }
    },

    getVibrationWoList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT epod.EvolveProdOrdersDetail_Serial,ei.EvolveItem_Code,epo.EvolveProdOrders_OrderId FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq = 1 AND EvolveProdOrdersDetail_NxtSeq = 2 AND epod.EvolveProdOrdersDetail_Status ='In Process' AND epo.EvolveItem_ID = ei.EvolveItem_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1727: Error while getting Vibration Wo List "+error.message);
            return new Error(" EERR1727: Error while getting Vibration Wo List "+error.message);
        }
    },

    getVibrationCompletedTriggers: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT count(epod.EvolveProdOrdersDetail_Serial) as count FROM EvolveProdOrdersDetail epod, EvolveProdOrders epo, EvolveItem ei  WHERE  epod.EvolveProdOrders_ID = epo.EvolveProdOrders_ID AND epod.EvolveProdOrdersDetail_PrvSeq =2 AND EvolveProdOrdersDetail_NxtSeq=3 AND EvolveProdOrdersDetail_Status ='Completed' AND epo.EvolveItem_ID = ei.EvolveItem_ID AND CAST(epod.EvolveProdOrdersDetail_CreatedAt as date) >= FORMAT(getdate(), 'yyyy-MM-dd')")
        } catch (error) {
            Evolve.Log.error(" EERR1728: Error while getting Vibration Completed Triggers "+error.message);
            return new Error(" EERR1728: Error while getting Vibration Completed Triggers "+error.message);
        }
    },

}