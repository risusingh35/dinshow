'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPrintProcessListOnlineCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" SELECT COUNT(EvolvePrintProcess_ID) as count FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolveModel em, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32733: Error while  getting Print Process List Online Count " + error.message);
            return new Error(" EERR32733: Error while  getting Print Process List Online Count " + error.message);
        }
    },

    getPrintProcessListOnline: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" SELECT eph.*, epp.EvolvePrintProcess_Status, epp.EvolvePrintProcess_ID , epp.EvolvePrintProcess_ErrorMessage , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted, em.EvolveModel_Code, ei.EvolveItem_Code, ei.EvolveItem_Desc, epls.EvolvePrintLabelSerial_Number FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolveModel em, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'ONLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR32734: Error while  getting Print Process List Online " + error.message);
            return new Error(" EERR32734: Error while  getting Print Process List Online " + error.message);
        }
    },

    getPrintProcessListOfflineCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" SELECT COUNT(EvolvePrintProcess_ID) as count FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolveModel em, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
            return new Error(" EERR32735 : Error while  getting Print Process List Offline Count" + error.message);
        }
    },

    getPrintProcessListOffline: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query(" SELECT eph.*, epp.EvolvePrintProcess_Status, epp.EvolvePrintProcess_ID , epp.EvolvePrintProcess_ErrorMessage , convert(varchar, eph.EvolvePrintHistory_Date, 120) as EvolvePrintHistory_DateConverted, em.EvolveModel_Code, ei.EvolveItem_Code, ei.EvolveItem_Desc, epls.EvolvePrintLabelSerial_Number FROM EvolvePrintProcess epp, EvolvePrintHistory eph, EvolveItem ei, EvolveModel em, EvolvePrintLabelSerial epls WHERE epp.EvolvePrintHistory_ID = eph.EvolvePrintHistory_ID AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolveModel_ID = em.EvolveModel_ID AND em.EvolveModel_OnOff = 'OFFLINE' AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID ");

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
                .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 0)
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
            .input('EvolvePrinter_status', Evolve.Sql.Bit, 1)
            .query("SELECT EvolvePrinter_ID , EvolvePrinter_Name FROM EvolvePrinter WHERE EvolvePrinter_status = @EvolvePrinter_status")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label "+error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label "+error.message);
        }
    },

    // SOCKET-IO SERVICES

    // getPrinterTask: async function () {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .query("SELECT epq.EvolvePrintProcess_ID, epq.EvolvePrintProcess_ZplCode, ep.EvolvePrinter_Name, ep.EvolvePrinter_ID , ep.EvolvePrinter_IP, ep.EvolvePrinter_Port, ep.EvolvePrinter_pcName, ep.EvolvePrinter_Type FROM EvolvePrintProcess epq, EvolvePrinter ep WHERE epq.EvolvePrintProcess_Status = 0 AND epq.EvolvePrinter_ID = ep.EvolvePrinter_ID AND ep.EvolvePrinter")
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32738: Error while  Get Printer Task " + error.message);
    //         return new Error(" EERR32738: Error while  Get Printer Task " + error.message);
    //     }
    // },

    getPrinterTask: async function (EvolvePrinter_Code) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) epq.EvolvePrintProcess_ID, epq.EvolvePrintProcess_ZplCode as EvolvePrintProcess_Data, ep.EvolvePrinter_Name,ep.EvolvePrinter_Code, ep.EvolvePrinter_ID , ep.EvolvePrinter_IP, ep.EvolvePrinter_Port, ep.EvolvePrinter_pcName, ep.EvolvePrinter_Type FROM EvolvePrintProcess epq, EvolvePrinter ep WHERE epq.EvolvePrintProcess_Status = 0 AND epq.EvolvePrinter_ID = ep.EvolvePrinter_ID AND ep.EvolvePrinter_Code ='"+EvolvePrinter_Code+"' ORDER BY  epq.EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Printer Task " + error.message);
            return new Error(" EERR32738: Error while  Get Printer Task " + error.message);
        }
    },

    getEvolvePrinterTaskReceiveStatus: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
                .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 1)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, 1)
                .query("UPDATE EvolvePrintProcess SET EvolvePrintProcess_Status = @EvolvePrintProcess_Status , EvolvePrintProcess_UpdatedAt = @EvolvePrintProcess_UpdatedAt , EvolvePrintProcess_UpdatedUser = @EvolvePrintProcess_UpdatedUser WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Printer Task Receive Status" + error.message);
            return new Error(" EERR32738: Error while  Get Printer Task Receive Status" + error.message);
        }
    },

    getEvolvePrinterTaskStatus: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
                .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 2)
                .input('EvolvePrintProcess_ErrorMessage', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ErrorMessage)
                .input('EvolvePrintProcess_ErrorCode', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ErrorCode)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, 1)
                .query("UPDATE EvolvePrintProcess SET EvolvePrintProcess_Status = @EvolvePrintProcess_Status , EvolvePrintProcess_ErrorMessage = @EvolvePrintProcess_ErrorMessage , EvolvePrintProcess_ErrorCode = @EvolvePrintProcess_ErrorCode , EvolvePrintProcess_UpdatedAt = @EvolvePrintProcess_UpdatedAt , EvolvePrintProcess_UpdatedUser = @EvolvePrintProcess_UpdatedUser WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Printer Task Status" + error.message);
            return new Error(" EERR32738: Error while  Get Printer Task Status" + error.message);
        }
    },

    getPrintProcessDetail: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("SELECT * FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Print Process Detail" + error.message);
            return new Error(" EERR32738: Error while  Get Print Process Detail" + error.message);
        }
    },

    checkStatusInPrintQueue: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintHistory_ID', Evolve.Sql.Int, id)
                .query("SELECT EvolvePrintHistory_Flag FROM EvolvePrintHistory WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Check Status In Print Queue" + error.message);
            return new Error(" EERR32738: Error while  Check Status In Print Queue" + error.message);
        }
    },

    updateStatusInPrintQueue: async function (id) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintHistory_ID', Evolve.Sql.Int, id)
                .input('EvolvePrintHistory_Flag', Evolve.Sql.Bit, 1)
                .input('EvolvePrintHistory_IsScan', Evolve.Sql.Bit, 0)
                .input('EvolvePrintHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintHistory_UpdatedUser', Evolve.Sql.Int, 1)
                .input('EvolvePrintHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintHistory_CreatedUser', Evolve.Sql.Int, 1)
                .query("UPDATE EvolvePrintHistory SET EvolvePrintHistory_Flag = @EvolvePrintHistory_Flag , EvolvePrintHistory_IsScan = @EvolvePrintHistory_IsScan , EvolvePrintHistory_IsScanning = @EvolvePrintHistory_IsScan , EvolvePrintHistory_IsMove = @EvolvePrintHistory_IsScan ,EvolvePrintHistory_CreatedAt = @EvolvePrintHistory_CreatedAt , EvolvePrintHistory_CreatedUser = @EvolvePrintHistory_CreatedUser , EvolvePrintHistory_UpdatedAt = @EvolvePrintHistory_UpdatedAt , EvolvePrintHistory_UpdatedUser = @EvolvePrintHistory_UpdatedUser WHERE EvolvePrintHistory_ID = @EvolvePrintHistory_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Update Status In Print Queue" + error.message);
            return new Error(" EERR32738: Error while  Update Status In Print Queue" + error.message);
        }
    },

    addRecordInPrintHistory: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
                .input('EvolvePrintProcess_ZplCode', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ZplCode)
                .input('EvolvePrintQueue_RePrint', Evolve.Sql.Int, 0)
                .input('EvolvePrintQueue_Status', Evolve.Sql.Bit, data.IsPrinted)
                .input('EvolvePrintQueue_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintQueue_UpdatedUser', Evolve.Sql.Int, 1)
                .input('EvolvePrintQueue_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintQueue_CreatedUser', Evolve.Sql.Int, 1)
                .query("INSERT INTO EvolvePrintQueue (EvolvePrintHistory_ID , EvolvePrintProcess_ZplCode , EvolvePrintQueue_RePrint , EvolvePrintQueue_Status , EvolvePrintQueue_UpdatedAt , EvolvePrintQueue_UpdatedUser , EvolvePrintQueue_CreatedAt , EvolvePrintQueue_CreatedUser) VALUES (@EvolvePrintHistory_ID , @EvolvePrintProcess_ZplCode , @EvolvePrintQueue_RePrint , @EvolvePrintQueue_Status , @EvolvePrintQueue_UpdatedAt , @EvolvePrintQueue_UpdatedUser , @EvolvePrintQueue_CreatedAt , @EvolvePrintQueue_CreatedUser)")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Add Record In Print History" + error.message);
            return new Error(" EERR32738: Error while  Add Record In Print History" + error.message);
        }
    },

    deleteRecordInPrintProcess : async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("DELETE EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
            return new Error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
        }
    },

    getPrinterList : async function () {
        try {
            return await Evolve.SqlPool.request()
            .query("SELECT EvolvePrinter_ID , EvolvePrinter_Name , EvolvePrinter_Type , EvolvePrinter_IP , EvolvePrinter_Port , EvolvePrinter_pcName FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
            return new Error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
        }
    },

    updatePrinterStatus : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
            .input('EvolvePrinter_status', Evolve.Sql.Bit, data.EvolvePrinter_status)
            .input('EvolvePrinter_statusUpdatedDT', Evolve.Sql.NVarChar, datetime)
            .query("UPDATE EvolvePrinter SET EvolvePrinter_status = @EvolvePrinter_status , EvolvePrinter_statusUpdatedDT = @EvolvePrinter_statusUpdatedDT WHERE EvolvePrinter_ID = @EvolvePrinter_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Update Printer Status " + error.message);
            return new Error(" EERR32738: Error while  Update Printer Status " + error.message);
        }
    },

    checkLabelStatus : async function (id) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
            .query("SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Check Label Status " + error.message);
            return new Error(" EERR32738: Error while  Check Label Status " + error.message);
        }
    }

}