'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPrintProcessListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT count(epp.EvolvePrintProcess_ID) as count FROM EvolvePrintProcessDetails eppd, EvolvePrintProcess epp LEFT JOIN EvolveUser eu ON eu.EvolveUser_ID = epp.EvolvePrintProcess_CreatedUser WHERE epp.EvolvePrintProcess_Status != 'WAITING' AND eppd.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND (eppd.EvolvePrintProcessDetails_Key = 'PDI' OR eppd.EvolvePrintProcessDetails_Key = 'FGMF')");
        } catch (error) {
            Evolve.Log.error(" EERR32735 : Error while  getting Print Process List Count" + error.message);
            return new Error(" EERR32735 : Error while  getting Print Process List Count" + error.message);
        }
    },

    getPrintProcessList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT epp.*, convert(varchar, epp.EvolvePrintProcess_CreatedAt, 120) as 'CreateDate', eu.EvolveUser_Name, eppd.EvolvePrintProcessDetails_Key, eppd.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppd, EvolvePrintProcess epp LEFT JOIN EvolveUser eu ON eu.EvolveUser_ID = epp.EvolvePrintProcess_CreatedUser WHERE epp.EvolvePrintProcess_Status != 'WAITING' AND eppd.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND (eppd.EvolvePrintProcessDetails_Key = 'PDI' OR eppd.EvolvePrintProcessDetails_Key = 'FGMF') ORDER BY epp.EvolvePrintProcess_ID DESC");

                // .query("SELECT convert(varchar, epp.EvolvePrintProcess_CreatedAt, 120) as EvolvePrintHistory_DateConverted, epp.*, eu.EvolveUser_Name, (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID') as 'EvolveProdOrdersDetail_Serial' FROM EvolvePrintProcess epp, EvolveProdOrdersDetail epod, EvolveUser eu WHERE epp.EvolvePrintProcess_Status != 'WAITING' AND eu.EvolveUser_ID = epp.EvolvePrintProcess_CreatedUser AND epod.EvolveProdOrdersDetail_Serial = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS nvarchar) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID') order by epp.EvolvePrintProcess_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
        } catch (error) {
            Evolve.Log.error(" EERR32736: Error while  getting Print Process List " + error.message);
            return new Error(" EERR32736: Error while  getting Print Process List " + error.message);
        }
    },

    onClickRePrint: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
                .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
                .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolvePrintProcess_ErrorMessage', Evolve.Sql.NVarChar, null)
                .input('EvolvePrintProcess_ErrorCode', Evolve.Sql.NVarChar, null)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolvePrintProcess SET EvolvePrinter_ID = @EvolvePrinter_ID , EvolvePrintProcess_Status = @EvolvePrintProcess_Status , EvolvePrintProcess_ErrorMessage = @EvolvePrintProcess_ErrorMessage , EvolvePrintProcess_ErrorCode = @EvolvePrintProcess_ErrorCode , EvolvePrintProcess_UpdatedAt = @EvolvePrintProcess_UpdatedAt , EvolvePrintProcess_UpdatedUser = @EvolvePrintProcess_UpdatedUser WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  RePrint Label " + error.message);
            return new Error(" EERR32738: Error while  RePrint Label " + error.message);
        }
    },

    getAllPrinter : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT * FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    rePrintAll : async function (printerId) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, printerId)
            .query("UPDATE EvolvePrintProcess SET EvolvePrintProcess_Status = 'PROCESS', EvolvePrintProcess_ErrorCode = null, EvolvePrinter_ID = @EvolvePrinter_ID FROM EvolvePrintProcess epp, EvolvePrintProcessDetails eppd WHERE epp.EvolvePrintProcess_Status = 'ERROR' AND epp.EvolvePrintProcess_ID = eppd.EvolvePrintProcess_ID AND (eppd.EvolvePrintProcessDetails_Key = 'PDI' OR eppd.EvolvePrintProcessDetails_Key = 'FGMF')")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while requeue all error Label " + error.message);
            return new Error(" EERR####: Error while requeue all error Label " + error.message);
        }
    },

}