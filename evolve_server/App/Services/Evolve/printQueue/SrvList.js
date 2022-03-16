'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getAllOnlinePrintQueueCount : async function(search){
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
             .query("select count(eph.EvolvePrintHistory_ID) as count FROM EvolvePrintHistory eph , EvolveModel em WHERE eph.EvolvePrintHistory_ID not in(SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess) AND   eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolvePrintHistory_DSN != '' AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolvePrintHistory_Flag = 0 AND eph.EvolvePrintHistory_DSN LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR32680: Error while getting Online PrintQueue List Count "+error.message);
            return new Error(" EERR32680: Error while getting Online PrintQueue List Count "+error.message);
        }
    },

    getAllOnlinePrintQueue : async function(start, length,search){
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
             .query("select 0 as IsSelected , eph.* , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted , epls.EvolvePrintLabelSerial_Number , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintHistory_ID not in(SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess) AND  eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND eph.EvolvePrintHistory_DSN != '' AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolvePrintHistory_Flag = 0 AND eph.EvolvePrintHistory_DSN LIKE @search order by  eph.EvolvePrintHistory_Date ASC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR32681: Error while getting Online PrintQueue List "+error.message);
            return new Error(" EERR32681: Error while getting Online PrintQueue List "+error.message);
        }
    },

    getAllOfflinePrintQueueCount : async function(search){
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
             .query("select count(eph.EvolvePrintHistory_ID) as count FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei WHERE eph.EvolvePrintHistory_ID not in(SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess) AND eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND eph.EvolvePrintHistory_Flag = 0 AND ei.EvolveItem_Code LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR32682: Error while getting Offline PrintQueue List Count "+error.message);
            return new Error(" EERR32682: Error while getting Offline PrintQueue List Count "+error.message);
        }
    },

    getAllOfflinePrintQueue : async function(start, length,search){
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
             .query("select 0 as IsSelected , eph.* , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintHistory_ID not in(SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess) AND eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND eph.EvolvePrintHistory_Flag = 0 AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND ei.EvolveItem_Code LIKE @search order by  eph.EvolvePrintHistory_Date ASC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR32683: Error while getting Offline PrintQueue List "+error.message);
            return new Error(" EERR32683: Error while getting Offline PrintQueue List "+error.message);
        }
    },

    getAllOfflineModelList : async function (){
        try {
            return await Evolve.SqlPool.request()
             .query("SELECT EvolveModel_ID as id , EvolveModel_Code as value FROM EvolveModel WHERE EvolveModel_OnOff = 'OFFLINE'")
        } catch (error) {
            Evolve.Log.error(" EERR32684: Error while getting Offline Model List "+error.message);
            return new Error(" EERR32684: Error while getting Offline Model List "+error.message);
        }
    },

    getItemByModelId : async function(EvolveModel_ID){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID',Evolve.Sql.NVarChar, EvolveModel_ID)
            .query("SELECT EvolveItemTomodel_ID , EvolveItem_ID FROM EvolveItemTomodel WHERE EvolveModel_ID = @EvolveModel_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32685: Error while getting item by model id "+error.message);
            return new Error(" EERR32685: Error while getting item by model id "+error.message);
        }
    },

    addPrintHistory : async function(itemId , modelId , serialNo){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID',Evolve.Sql.Int, modelId)
            .input('EvolveItem_ID',Evolve.Sql.Int, itemId)
            .input('EvolvePrintLabelSerial_ID',Evolve.Sql.Int, serialNo)
            .input('EvolvePrintHistory_Flag',Evolve.Sql.Bit, 0)
            .input('EvolvePrintHistory_Reprint',Evolve.Sql.Int, 0)
            .input('EvolvePrintHistory_IsScan',Evolve.Sql.Bit, 0)
            .query("INSERT INTO EvolvePrintHistory (EvolveModel_ID , EvolveItem_ID , EvolvePrintLabelSerial_ID , EvolvePrintHistory_Flag , EvolvePrintHistory_Reprint , EvolvePrintHistory_IsScan) VALUES (@EvolveModel_ID , @EvolveItem_ID , @EvolvePrintLabelSerial_ID , @EvolvePrintHistory_Flag , @EvolvePrintHistory_Reprint , @EvolvePrintHistory_IsScan)")
        } catch (error) {
            Evolve.Log.error(" EERR32686: Error while adding print history "+error.message);
            return new Error(" EERR32686: Error while adding print history "+error.message);
        }
    },

    getSerialNumberDetail : async function(modelId){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveModel_ID',Evolve.Sql.Int, modelId)
            .query("SELECT * FROM EvolveSerial WHERE EvolveModel_ID = @EvolveModel_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32687: Error while getting Serial Number Detail "+error.message);
            return new Error(" EERR32687: Error while getting Serial Number Detail "+error.message);
        }
    },

    addSerialNumber : async function (number) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintLabelSerial_Number',Evolve.Sql.NVarChar, number)
            .query("INSERT INTO EvolvePrintLabelSerial (EvolvePrintLabelSerial_Number) VALUES (@EvolvePrintLabelSerial_Number)")
        } catch (error) {
            Evolve.Log.error(" EERR32688: Error while Adding Serial Number "+error.message);
            return new Error(" EERR32688: Error while Adding Serial Number "+error.message);
        }
    },

    getSerialNumberId : async function(number){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintLabelSerial_Number',Evolve.Sql.NVarChar, number)
            .query("SELECT EvolvePrintLabelSerial_ID FROM EvolvePrintLabelSerial WHERE EvolvePrintLabelSerial_Number = @EvolvePrintLabelSerial_Number")
        } catch (error) {
            Evolve.Log.error(" EERR32689: Error while getting Serial Number ID "+error.message);
            return new Error(" EERR32689: Error while gettting Serial Number ID "+error.message);
        }
    },

    updateNextSerialNumber : async function (number , ModelId) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSerial_Next',Evolve.Sql.NVarChar, number)
            .input('EvolveModel_ID',Evolve.Sql.Int, ModelId)
            .query("UPDATE EvolveSerial SET EvolveSerial_Next = @EvolveSerial_Next WHERE EvolveModel_ID = @EvolveModel_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32690: Error while Update Next Serial Number "+error.message);
            return new Error(" EERR32690: Error while Update Next Serial Number "+error.message);
        }
    },

    getLabelData : async function (EvolveSticker_ID){
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSticker_ID',Evolve.Sql.Int, EvolveSticker_ID)
            .query("SELECT * FROM EvolveSticker WHERE EvolveSticker_ID = @EvolveSticker_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32691: Error while getting Label Data "+error.message);
            return new Error(" EERR32691: Error while getting Label Data "+error.message);
        }
    },

    getAllVariables: async function (EvolveSticker_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveSticker_ID', Evolve.Sql.Int, EvolveSticker_ID)
       .query(" SELECT * FROM EvolveStickerVar WHERE EvolveSticker_ID = @EvolveSticker_ID ");
       
        } catch (error) {
            Evolve.Log.error(" EERR32692: Error while  Getting Variables "+error.message);
            return new Error(" EERR32692: Error while Getting Variables"+error.message);
        }
    },

    getAllShift : async function (){
        try {
            return await Evolve.SqlPool.request()
            .query(" SELECT * , convert(varchar, EvolveShift_Start, 8) as StartTime , convert(varchar, EvolveShift_End, 8) as EndTime FROM EvolveShift");
       
        } catch (error) {
            Evolve.Log.error(" EERR32693: Error while  Getting Shifts "+error.message);
            return new Error(" EERR32693: Error while Getting Shifts "+error.message);
        }
    },

    getFirst21DSN : async function (){
        try {
            return await Evolve.SqlPool.request()
            .query(" SELECT DISTINCT TOP 21 EvolvePrintHistory_DSN , EvolvePrintHistory_Date FROM EvolvePrintHistory WHERE EvolvePrintHistory_Flag = 0 ORDER BY EvolvePrintHistory_Date ASC");
        } catch (error) {
            Evolve.Log.error(" EERR32694: Error while  Getting Shifts "+error.message);
            return new Error(" EERR32694: Error while Getting Shifts "+error.message);
        }
    },

    getPrintDetail : async function (data){
        try {
            console.log(data);
            return await Evolve.SqlPool.request()
            .input('EvolvePrinthistory_DSN', Evolve.Sql.NVarChar, data.EvolvePrintHistory_DSN)
            .input('EvolvePrinthistory_Date', Evolve.Sql.DateTime, data.EvolvePrintHistory_Date)
            .query(" select eph.* , epls.EvolvePrintLabelSerial_Number , em.EvolveModel_Code , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code FROM EvolvePrintHistory eph , EvolveModel em , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND eph.EvolvePrinthistory_DSN = @EvolvePrinthistory_DSN AND eph.EvolvePrinthistory_Date = @EvolvePrinthistory_Date ");
        } catch (error) {
            Evolve.Log.error(" EERR32695: Error while  Getting Print Detail "+error.message);
            return new Error(" EERR32695: Error while Getting Print Detail "+error.message);
        }
    },

    addRecordInPrintProcess : async function (zplCode ,userid , data){
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ZplCode', Evolve.Sql.NVarChar, zplCode)
            .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
            .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
            .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 0)
            .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, userid)
            .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, userid)
            .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .query(" INSERT INTO EvolvePrintProcess (EvolvePrintProcess_ZplCode , EvolvePrintHistory_ID , EvolvePrinter_ID , EvolvePrintProcess_Status , EvolvePrintProcess_CreatedUser , EvolvePrintProcess_CreatedAt , EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrintProcess_ZplCode , @EvolvePrintHistory_ID , @EvolvePrinter_ID , @EvolvePrintProcess_Status , @EvolvePrintProcess_CreatedUser , @EvolvePrintProcess_CreatedAt , @EvolvePrintProcess_UpdatedUser , @EvolvePrintProcess_UpdatedAt) ");
        } catch (error) {
            Evolve.Log.error(" EERR32696: Error while  Getting Print Detail "+error.message);
            return new Error(" EERR32696: Error while Getting Print Detail "+error.message);
        }
    },

    getAllPrinter : async function () {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_status', Evolve.Sql.Bit, 1)
            .query("SELECT EvolvePrinter_ID , EvolvePrinter_Name FROM EvolvePrinter WHERE EvolvePrinter_status = @EvolvePrinter_status")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    }
}