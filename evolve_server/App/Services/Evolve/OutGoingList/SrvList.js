'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getOutGoingList : async function (){
        try {
            return await Evolve.SqlPool.request()
             .query("SELECT eph.* , convert(varchar, eph.EvolvePrintHistory_ScanDateTime, 120) as EvolvePrintHistory_ScanDateConverted , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintHistory_Flag = 1 AND eph.EvolvePrintHistory_IsMove = 0 AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32666: Error while getting OutGoingList Data "+error.message);
            return new Error(" EERR32666: Error while getting OutGoingList Data "+error.message);
        }
    }
}