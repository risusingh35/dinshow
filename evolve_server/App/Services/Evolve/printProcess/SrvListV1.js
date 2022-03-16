'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    // getPrintProcessListOfflineCount: async function (search) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
    //             .query(" SELECT COUNT(EvolvePrintProcess_ID) as count FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");

    //     } catch (error) {
    //         Evolve.Log.error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
    //         return new Error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
    //     }
    // },

    getPrintProcessListOfflineCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" select count(epp.EvolvePrintProcess_ID) as count FROM EvolvePrintProcess epp WHERE epp.EvolvePrintProcess_Status != 'WAITING' AND (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) LIKE @search ");

        } catch (error) {
            Evolve.Log.error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
            return new Error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
        }
    },

    // getPrintProcessListOffline: async function (start, length, search) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
    //             .query(" SELECT eph.*, epp.EvolvePrintProcess_Status, epp.EvolvePrintProcess_ID , epp.EvolvePrintProcess_ErrorMessage , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted, ei.EvolveItem_Code, ei.EvolveItem_Desc, epls.EvolvePrintLabelSerial_Number FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");

    //     } catch (error) {
    //         Evolve.Log.error(" EERR32736: Error while  getting Print Process List Offline " + error.message);
    //         return new Error(" EERR32736: Error while  getting Print Process List Offline " + error.message);
    //     }
    // },

    getPrintProcessListOffline: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" select 0 as IsSelected , convert(varchar, epp.EvolvePrintProcess_CreatedAt, 120) as EvolvePrintHistory_DateConverted , epp.* , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID') as EvolveItem_ID , (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Code , (SELECT ei.EvolveCustItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveCustItem_Code ,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT)	FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID	AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Desc , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID') as EvolvePrintLabelSerial_ID , (SELECT epls.EvolvePrintLabelSerial_Number from EvolvePrintLabelSerial epls WHERE epls.EvolvePrintLabelSerial_ID = (SELECT CONVERT(INT , CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value)) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID')) as EvolvePrintLabelSerial_Number from EvolvePrintProcess epp where epp.EvolvePrintProcess_Status != 'WAITING'  AND    (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) LIKE @search order by  epp.EvolvePrintProcess_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");

        } catch (error) {
            Evolve.Log.error(" EERR32736: Error while  getting Print Process List Offline " + error.message);
            return new Error(" EERR32736: Error while  getting Print Process List Offline " + error.message);
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
            .query("SELECT * , 'false' as showStatus FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    requeueAllErrorLabels : async function (printerId) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, printerId)
            .query("UPDATE EvolvePrintProcess SET EvolvePrintProcess_Status = 'PROCESS', EvolvePrintProcess_ErrorCode = null ,EvolvePrinter_ID = @EvolvePrinter_ID WHERE EvolvePrintProcess_Status = 'ERROR'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while requeue all error Label " + error.message);
            return new Error(" EERR####: Error while requeue all error Label " + error.message);
        }
    },

}