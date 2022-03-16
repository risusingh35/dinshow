'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    // getScanningItemData : async function (data){
    //     try {
    //         return await Evolve.SqlPool.request()
    //         .input('EvolvePrintLabelSerial_Number', Evolve.Sql.NVarChar, data.EvolvePrintLabelSerial_Number)
    //          .query("SELECT eph.* , convert(varchar, eph.EvolvePrintHistory_ScanDateTime, 120) as EvolvePrintHistory_ScanDateConverted , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND epls.EvolvePrintLabelSerial_Number = @EvolvePrintLabelSerial_Number AND eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID")
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32697: Error while getting Scanning Item Data "+error.message);
    //         return new Error(" EERR32697: Error while getting Scanning Item Data "+error.message);
    //     }
    // },

    getScanningItemData : async function (data){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistory_DSNDate', Evolve.Sql.NVarChar, data.EvolvePrintHistory_DSNDate)
            .input('EvolvePrintHistory_DSN', Evolve.Sql.NVarChar, data.EvolvePrintHistory_DSN)
             .query("SELECT eph.* , convert(varchar, eph.EvolvePrintHistory_ScanDateTime, 120) as EvolvePrintHistory_ScanDateConverted , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintHistory_DSN = @EvolvePrintHistory_DSN AND format(Cast(eph.EvolvePrintHistory_DSNDate as date), 'MMdd') = @EvolvePrintHistory_DSNDate AND eph.EvolvePrintHistory_DSNDate >= DATEADD(YEAR,-1, GETDATE())")
        } catch (error) {
            Evolve.Log.error(" EERR32697: Error while getting Scanning Item Data "+error.message);
            return new Error(" EERR32697: Error while getting Scanning Item Data "+error.message);
        }
    },

    upadteScanningFlag : async function (id) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintLabelSerial_ID', Evolve.Sql.Int, id)
            .input('EvolvePrintHistory_IsScanning', Evolve.Sql.Bit, 1)
             .query("UPDATE EvolvePrintHistory SET EvolvePrintHistory_IsScanning = @EvolvePrintHistory_IsScanning WHERE EvolvePrintLabelSerial_ID = @EvolvePrintLabelSerial_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32698: Error while Update Scanning Flag "+error.message);
            return new Error(" EERR32698: Error while Update Scanning Flag "+error.message);
        }
    },

    updateMoveFlag : async function (id,datetime) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintLabelSerial_ID', Evolve.Sql.Int, id)
            .input('EvolvePrintHistory_IsScan', Evolve.Sql.Bit, 1)
            .input('EvolvePrintHistory_ScanDateTime', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintHistory_IsMove', Evolve.Sql.Bit, 1)
            .input('EvolvePrintHistory_IsScanning', Evolve.Sql.Bit, 0)
             .query("UPDATE EvolvePrintHistory SET EvolvePrintHistory_IsScanning = @EvolvePrintHistory_IsScanning , EvolvePrintHistory_IsScan = @EvolvePrintHistory_IsScan , EvolvePrintHistory_IsMove = @EvolvePrintHistory_IsMove , EvolvePrintHistory_ScanDateTime = @EvolvePrintHistory_ScanDateTime WHERE EvolvePrintLabelSerial_ID = @EvolvePrintLabelSerial_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32699: Error while Update Move Flag "+error.message);
            return new Error(" EERR32699: Error while Update Move Flag "+error.message);
        }
    },

    updateScanFlag : async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
            .input('EvolvePrintHistory_IsScan', Evolve.Sql.Bit, data.EvolvePrintHistory_IsScan)
            .input('EvolvePrintHistory_ScanDateTime', Evolve.Sql.NVarChar, data.EvolvePrintHistory_ScanDateTime)
            .input('EvolvePrintHistory_IsScanning', Evolve.Sql.Bit, 0)
             .query("UPDATE EvolvePrintHistory SET EvolvePrintHistory_IsScanning = @EvolvePrintHistory_IsScanning , EvolvePrintHistory_IsScan = @EvolvePrintHistory_IsScan , EvolvePrintHistory_ScanDateTime = @EvolvePrintHistory_ScanDateTime WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32700: Error while Update Move Flag "+error.message);
            return new Error(" EERR32700: Error while Update Move Flag "+error.message);
        }
    },

    getAutoMoveConfigVariable : async function (){
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveConfig_Value FROM EvolveConfig WHERE EvolveConfig_Key = 'ISAUTOMOVEATLASTSCAN'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Auto Move Config Variable "+error.message);
            return new Error(" EERR####: Error while Get Auto Move Config Variable "+error.message);
        }
    },

    getScanAltConfigVariable : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolveConfig_Value FROM EvolveConfig WHERE EvolveConfig_Key = 'SCANALT'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Auto Move Config Variable "+error.message);
            return new Error(" EERR####: Error while Get Auto Move Config Variable "+error.message);
        }
    }
}