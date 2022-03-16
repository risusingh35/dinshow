'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getOnlinePrintHistoryCount : async function (condition , search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT COUNT(epq.EvolvePrintQueue_ID) as count FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolvePrintLabelSerial epls , EvolveModel em WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'ONLINE' AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search)"+ condition);
        } catch (error) {
            Evolve.Log.error(" EERR32675: Error while  getting Online Print History Count "+error.message);
            return new Error(" EERR32675: Error while  getting Online Print History Count "+error.message);
        }
    },

    getOnlinePrintHistory: async function (start , length, condition , search) {
        try {
            return await Evolve.SqlPool.request()
      .input('start',Evolve.Sql.Int,start)
      .input('length',Evolve.Sql.Int,length)
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT  0 as IsSelected , epq.* , eph.* , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted , convert(varchar, eph.EvolvePrintHistory_ScanDateTime, 120) as EvolvePrintHistoryScan_DateConverted , ei.EvolveItem_Code , ei.EvolveItem_Desc , em.EvolveModel_Code , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolveItem ei , EvolveModel em , EvolvePrintLabelSerial epls WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search)" + condition +" ORDER BY epq.EvolvePrintQueue_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
       
        } catch (error) {
            Evolve.Log.error(" EERR32676: Error while  getting Online Print History "+error.message);
            return new Error(" EERR32676: Error while  getting Online Print History "+error.message);
        }
    },
    
    getOfflinePrintHistoryCount : async function (condition, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT COUNT(epq.EvolvePrintQueue_ID) as count FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolvePrintLabelSerial epls , EvolveModel em , EvolveItem ei WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search OR ei.EvolveItem_Code LIKE @search)"+ condition);
        } catch (error) {
            Evolve.Log.error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
            return new Error(" EERR32677: Error while  getting Offline Print History Count "+error.message);
        }
    }, 

    getOfflinePrintHistory: async function (start , length, condition, search) {
        try {
            return await Evolve.SqlPool.request()
      .input('start',Evolve.Sql.Int,start)
      .input('length',Evolve.Sql.Int,length)
      .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
       .query(" SELECT  0 as IsSelected , epq.* , eph.*, convert(varchar, epq.EvolvePrintQueue_CreatedAt, 120) as EvolvePrintHistory_DateConverted , convert(varchar, eph.EvolvePrintHistory_ScanDateTime, 120) as EvolvePrintHistoryScan_DateConverted ,  ei.EvolveItem_Code , ei.EvolveItem_Desc , em.EvolveModel_Code , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintQueue epq , EvolvePrintHistory eph , EvolveItem ei , EvolveModel em , EvolvePrintLabelSerial epls WHERE epq.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND (epls.EvolvePrintLabelSerial_Number LIKE @search OR eph.EvolvePrintHistory_DSN LIKE @search OR ei.EvolveItem_Code LIKE @search)" + condition +" ORDER BY epq.EvolvePrintQueue_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
       
        } catch (error) {
            Evolve.Log.error(" EERR32678: Error while  getting Offline Print History List "+error.message);
            return new Error(" EERR32678: Error while  getting Offline Print History List "+error.message);
        }
    },

    rePrintLabel : async function (data , reprint){
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrintQueue_ID',Evolve.Sql.Int,data.EvolvePrintQueue_ID)
            .input('EvolvePrintProcess_Status',Evolve.Sql.Bit,0)
            .input('EvolvePrintQueue_RePrint',Evolve.Sql.Int,reprint)
            .input('EvolvePrinter_ID',Evolve.Sql.Int,data.EvolvePrinter_ID)
            .input('EvolvePrintHistory_ID',Evolve.Sql.Int,data.EvolvePrintHistory_ID)
            .input('EvolvePrintProcess_ZplCode',Evolve.Sql.NVarChar,data.EvolvePrintProcess_ZplCode)
            .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .query(" UPDATE EvolvePrintQueue SET EvolvePrintQueue_RePrint = @EvolvePrintQueue_RePrint WHERE EvolvePrintQueue_ID = @EvolvePrintQueue_ID ; INSERT INTO EvolvePrintProcess (EvolvePrintHistory_ID , EvolvePrintProcess_ZplCode , EvolvePrintProcess_Status , EvolvePrinter_ID , EvolvePrintProcess_CreatedUser , EvolvePrintProcess_CreatedAt , EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrintHistory_ID , @EvolvePrintProcess_ZplCode , @EvolvePrintProcess_Status , @EvolvePrinter_ID , @EvolvePrintProcess_CreatedUser , @EvolvePrintProcess_CreatedAt , @EvolvePrintProcess_UpdatedUser , @EvolvePrintProcess_UpdatedAt)")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    getAllPrinter : async function () {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_status',Evolve.Sql.Bit,1)
            .query("SELECT EvolvePrinter_ID , EvolvePrinter_Name FROM EvolvePrinter WHERE EvolvePrinter_status = @EvolvePrinter_status")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    }
}