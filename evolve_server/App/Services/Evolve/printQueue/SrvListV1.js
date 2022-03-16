'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllItemList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveItem_ID as id , EvolveItem_Code as value From EvolveItem")
        } catch (error) {
            Evolve.Log.error(" EERR32712: Error while  Get All Items " + error.message);
            return new Error(" EERR32712: Error while Get All Items " + error.message);
        }
    },

    getSerialNumberDetail: async function (modelId) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveModel_ID', Evolve.Sql.Int, modelId)
                .query("SELECT * FROM EvolveSerial WHERE EvolveModel_ID = @EvolveModel_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32687: Error while getting Serial Number Detail " + error.message);
            return new Error(" EERR32687: Error while getting Serial Number Detail " + error.message);
        }
    },

    addSerialNumber: async function (number) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintLabelSerial_Number', Evolve.Sql.NVarChar, number)
                .query("INSERT INTO EvolvePrintLabelSerial (EvolvePrintLabelSerial_Number) VALUES (@EvolvePrintLabelSerial_Number)")
        } catch (error) {
            Evolve.Log.error(" EERR32688: Error while Adding Serial Number " + error.message);
            return new Error(" EERR32688: Error while Adding Serial Number " + error.message);
        }
    },

    updateNextSerialNumber: async function (number, ModelId) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_Next', Evolve.Sql.NVarChar, number)
                .input('EvolveModel_ID', Evolve.Sql.Int, ModelId)
                .query("UPDATE EvolveSerial SET EvolveSerial_Next = @EvolveSerial_Next WHERE EvolveModel_ID = @EvolveModel_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32690: Error while Update Next Serial Number " + error.message);
            return new Error(" EERR32690: Error while Update Next Serial Number " + error.message);
        }
    },

    getSerialNumberId: async function (number) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintLabelSerial_Number', Evolve.Sql.NVarChar, number)
                .query("SELECT EvolvePrintLabelSerial_ID FROM EvolvePrintLabelSerial WHERE EvolvePrintLabelSerial_Number = @EvolvePrintLabelSerial_Number")
        } catch (error) {
            Evolve.Log.error(" EERR32689: Error while getting Serial Number ID " + error.message);
            return new Error(" EERR32689: Error while gettting Serial Number ID " + error.message);
        }
    },

    addPrintProcess: async function (userId) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, "WAITING")
                .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, userId)
                .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, userId)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query("INSERT INTO EvolvePrintProcess (EvolvePrintProcess_Status , EvolvePrintProcess_CreatedUser , EvolvePrintProcess_CreatedAt , EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrintProcess_Status , @EvolvePrintProcess_CreatedUser , @EvolvePrintProcess_CreatedAt , @EvolvePrintProcess_UpdatedUser , @EvolvePrintProcess_UpdatedAt) ;select SCOPE_IDENTITY() AS \'inserted_id\'")
        } catch (error) {
            Evolve.Log.error(" EERR32689: Error while Add Print Process " + error.message);
            return new Error(" EERR32689: Error while Add Print Process  " + error.message);
        }
    },

    addRecordInPrintProcessDetails: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
                .input('EvolvePrintProcessDetails_ParentID', Evolve.Sql.Int, data.EvolvePrintProcessDetails_ParentID)
                .input('EvolvePrintProcessDetails_Key', Evolve.Sql.NVarChar, data.EvolvePrintProcessDetails_Key)
                .input('EvolvePrintProcessDetails_Value', Evolve.Sql.NVarChar, data.EvolvePrintProcessDetails_Value)
                .input('EvolvePrintProcessDetails_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcessDetails_CreatedUser', Evolve.Sql.Int, data.EvolvePrintProcessDetails_CreatedUser)
                .input('EvolvePrintProcessDetails_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintProcessDetails_UpdatedUser', Evolve.Sql.Int, data.EvolvePrintProcessDetails_CreatedUser)
                .query("INSERT INTO EvolvePrintProcessDetails (EvolvePrintProcess_ID , EvolvePrintProcessDetails_ParentID , EvolvePrintProcessDetails_Key , EvolvePrintProcessDetails_Value , EvolvePrintProcessDetails_CreatedAt , EvolvePrintProcessDetails_CreatedUser , EvolvePrintProcessDetails_UpdatedAt , EvolvePrintProcessDetails_UpdatedUser) VALUES (@EvolvePrintProcess_ID , @EvolvePrintProcessDetails_ParentID , @EvolvePrintProcessDetails_Key , @EvolvePrintProcessDetails_Value , @EvolvePrintProcessDetails_CreatedAt , @EvolvePrintProcessDetails_CreatedUser , @EvolvePrintProcessDetails_UpdatedAt , @EvolvePrintProcessDetails_UpdatedUser)")
        } catch (error) {
            Evolve.Log.error(" EERR32689: Error while Add Print Process " + error.message);
            return new Error(" EERR32689: Error while Add Print Process  " + error.message);
        }
    },

    getAllOfflinePrintQueueCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("select count(epp.EvolvePrintProcess_ID) as count FROM EvolvePrintProcess epp WHERE epp.EvolvePrintProcess_Status = 'WAITING' AND (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR32682: Error while getting Offline PrintQueue List Count " + error.message);
            return new Error(" EERR32682: Error while getting Offline PrintQueue List Count " + error.message);
        }
    },

    // getAllOfflinePrintQueue : async function(start, length,search){
    //     try {
    //         return await Evolve.SqlPool.request()
    //         .input('start',Evolve.Sql.Int,start)
    //         .input('length',Evolve.Sql.Int,length)
    //         .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
    //          .query("select 0 as IsSelected , eph.* , convert(varchar, eph.EvolvePrintHistory_CreatedAt, 120) as EvolvePrintHistory_DateConverted , ei.EvolveItem_Code , ei.EvolveItem_Desc , ei.EvolveCustItem_Code , epls.EvolvePrintLabelSerial_Number FROM EvolvePrintHistory eph , EvolveItem ei , EvolvePrintLabelSerial epls WHERE eph.EvolvePrintHistory_ID not in(SELECT EvolvePrintHistory_ID FROM EvolvePrintProcess) AND eph.EvolveItem_ID = ei.EvolveItem_ID AND eph.EvolvePrintHistory_Flag = 0 AND eph.EvolvePrintLabelSerial_ID = epls.EvolvePrintLabelSerial_ID AND ei.EvolveItem_Code LIKE @search order by  eph.EvolvePrintHistory_CreatedAt DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32683: Error while getting Offline PrintQueue List "+error.message);
    //         return new Error(" EERR32683: Error while getting Offline PrintQueue List "+error.message);
    //     }
    // },

    getAllOfflinePrintQueue: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("select 0 as IsSelected , convert(varchar, epp.EvolvePrintProcess_CreatedAt, 120) as EvolvePrintHistory_DateConverted , epp.* , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID') as EvolveItem_ID , (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Code , (SELECT ei.EvolveCustItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveCustItem_Code ,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT)	FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID	AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Desc , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID') as EvolvePrintLabelSerial_ID , (SELECT epls.EvolvePrintLabelSerial_Number from EvolvePrintLabelSerial epls WHERE epls.EvolvePrintLabelSerial_ID = (SELECT CONVERT(INT , CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value)) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID')) as EvolvePrintLabelSerial_Number from EvolvePrintProcess epp where epp.EvolvePrintProcess_Status = 'WAITING'  AND    (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) LIKE @search order by  epp.EvolvePrintProcess_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR32683: Error while getting Offline PrintQueue List " + error.message);
            return new Error(" EERR32683: Error while getting Offline PrintQueue List " + error.message);
        }
    },

    getLabelData: async function (EvolveItem_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, EvolveItem_ID)
                .query("SELECT es.* FROM EvolveSticker es , EvolveItem ei WHERE ei.EvolveItem_ID = @EvolveItem_ID AND ei.EvolveSticker_ID = es.EvolveSticker_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32691: Error while getting Label Data " + error.message);
            return new Error(" EERR32691: Error while getting Label Data " + error.message);
        }
    },

    getAllVariables: async function (EvolveSticker_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, EvolveSticker_ID)
                .query(" SELECT * FROM EvolveStickerVar WHERE EvolveSticker_ID = @EvolveSticker_ID ");

        } catch (error) {
            Evolve.Log.error(" EERR32692: Error while  Getting Variables " + error.message);
            return new Error(" EERR32692: Error while Getting Variables" + error.message);
        }
    },

    getAllShift: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query(" SELECT EvolveShift_ID , EvolveShift_Name FROM EvolveShift");

        } catch (error) {
            Evolve.Log.error(" EERR32693: Error while  Getting Shifts " + error.message);
            return new Error(" EERR32693: Error while Getting Shifts " + error.message);
        }
    },

    // updateRecordInPrintProcess : async function (zplCode ,userid , data){
    //     try {
    //         let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
    //         return await Evolve.SqlPool.request()
    //         .input('EvolvePrintProcess_ZplCode', Evolve.Sql.NVarChar, zplCode)
    //         .input('EvolvePrintHistory_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
    //         .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
    //         .input('EvolvePrintProcess_Status', Evolve.Sql.Int, 0)
    //         .input('EvolvePrintProcess_CreatedUser', Evolve.Sql.Int, userid)
    //         .input('EvolvePrintProcess_CreatedAt', Evolve.Sql.NVarChar, datetime)
    //         .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, userid)
    //         .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
    //         .query(" INSERT INTO EvolvePrintProcess (EvolvePrintProcess_ZplCode , EvolvePrintHistory_ID , EvolvePrinter_ID , EvolvePrintProcess_Status , EvolvePrintProcess_CreatedUser , EvolvePrintProcess_CreatedAt , EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_UpdatedAt) VALUES (@EvolvePrintProcess_ZplCode , @EvolvePrintHistory_ID , @EvolvePrinter_ID , @EvolvePrintProcess_Status , @EvolvePrintProcess_CreatedUser , @EvolvePrintProcess_CreatedAt , @EvolvePrintProcess_UpdatedUser , @EvolvePrintProcess_UpdatedAt) ");
    //     } catch (error) {
    //         Evolve.Log.error(" EERR32696: Error while  Getting Print Detail "+error.message);
    //         return new Error(" EERR32696: Error while Getting Print Detail "+error.message);
    //     }
    // },

    updateRecordInPrintProcess: async function (zplCode, userid, data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_Data', Evolve.Sql.NVarChar, zplCode)
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, data.EvolvePrintProcess_ID)
                .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrinter_ID)
                .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolvePrintProcess_UpdatedUser', Evolve.Sql.Int, userid)
                .input('EvolvePrintProcess_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query(" UPDATE EvolvePrintProcess SET  EvolvePrintProcess_Data = @EvolvePrintProcess_Data , EvolvePrinter_ID = @EvolvePrinter_ID , EvolvePrintProcess_Status = @EvolvePrintProcess_Status , EvolvePrintProcess_UpdatedUser = @EvolvePrintProcess_UpdatedUser , EvolvePrintProcess_UpdatedAt = @EvolvePrintProcess_UpdatedAt WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32696: Error while  Getting Print Detail " + error.message);
            return new Error(" EERR32696: Error while Getting Print Detail " + error.message);
        }
    },

    getAllPrinter: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * , 'false' as showStatus FROM EvolvePrinter")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Reprint Online Label " + error.message);
            return new Error(" EERR32679: Error while  Reprint Online Label " + error.message);
        }
    },

    deletePrintQueue: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("DELETE FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID ; DELETE FROM EvolvePrintProcessDetails WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32679: Error while  Delete Record " + error.message);
            return new Error(" EERR32679: Error while  Delete Record " + error.message);
        }
    },

    getPrintTask: async function (EvolvePrinter_Code) {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT TOP(1) epq.EvolvePrintProcess_ID, epq.EvolvePrintProcess_Data, ep.EvolvePrinter_Name,ep.EvolvePrinter_Code, ep.EvolvePrinter_ID , ep.EvolvePrinter_IP, ep.EvolvePrinter_Port, ep.EvolvePrinter_pcName, ep.EvolvePrinter_Type FROM EvolvePrintProcess epq, EvolvePrinter ep WHERE epq.EvolvePrintProcess_Status = 'PROCESS' AND epq.EvolvePrinter_ID = ep.EvolvePrinter_ID AND ep.EvolvePrinter_Code ='" + EvolvePrinter_Code + "' ORDER BY  epq.EvolvePrintProcess_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Printer Task " + error.message);
            return new Error(" EERR32738: Error while  Get Printer Task " + error.message);
        }
    },
    deleteRecordInPrintProcess: async function (EvolvePrintProcess_ID) {
        try {
            console.log("EvolvePrintProcess_ID >>>", EvolvePrintProcess_ID);
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, EvolvePrintProcess_ID)
                .query("DELETE FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID ; DELETE FROM EvolvePrintProcessDetails WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID");
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
            return new Error(" EERR32738: Error while  Delete Record In Print Process" + error.message);
        }
    },
    updatePrintTaskStatus: async function (EvolvePrintProcess_ID, EvolvePrintProcess_ErrorCode, EvolvePrintProcess_ErrorMessage, EvolvePrinter_Code, EvolvePrinter_SubType) {
        try {
            let query = 'UPDATE EvolvePrintProcess SET EvolvePrintProcess_Status = @EvolvePrintProcess_Status , EvolvePrintProcess_ErrorMessage = @EvolvePrintProcess_ErrorMessage, EvolvePrintProcess_ErrorCode = @EvolvePrintProcess_ErrorCode ';
            if (EvolvePrintProcess_ErrorCode == '99') {

                query += "WHERE EvolvePrinter_ID = (SELECT EvolvePrinter_ID FROM EvolvePrinter WHERE EvolvePrinter_Code ='" + EvolvePrinter_Code + "'   AND EvolvePrinter_SubType = '" + EvolvePrinter_SubType + "')";

            } else {

                query += 'WHERE EvolvePrintProcess_ID = ' + EvolvePrintProcess_ID;
            }
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, EvolvePrintProcess_ID)
                .input('EvolvePrintProcess_Status', Evolve.Sql.NVarChar, 'ERROR')
                .input('EvolvePrintProcess_ErrorCode', Evolve.Sql.Int, 2)
                .input('EvolvePrintProcess_ErrorMessage', Evolve.Sql.NVarChar, EvolvePrintProcess_ErrorMessage)
                .query(query)
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Update Printer Task Status " + error.message);
            return new Error(" EERR32738: Error while  Update Printer Task Status " + error.message);
        }
    },

    getPrintedTaskData: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("SELECT * FROM EvolvePrintProcess WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Get Record From Print Process" + error.message);
            return new Error(" EERR32738: Error while  Get Record From Print Process" + error.message);
        }
    },

    addRecordInPrintHistory: async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrinter_ID', Evolve.Sql.Int, data.EvolvePrintHistory_ID)
                .input('EvolvePrintHistory_Data', Evolve.Sql.NVarChar, data.EvolvePrintProcess_Data)
                .input('EvolvePrintHistory_Status', Evolve.Sql.NVarChar, 'SUCCESS')
                .input('EvolvePrintHistory_ErrorCode', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ErrorCode)
                .input('EvolvePrintHistory_ErrorMsg', Evolve.Sql.NVarChar, data.EvolvePrintProcess_ErrorMsg)
                .input('EvolvePrintHistory_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintHistory_UpdatedUser', Evolve.Sql.Int, 1)
                .input('EvolvePrintHistory_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePrintHistory_CreatedUser', Evolve.Sql.Int, 1)
                .query("INSERT INTO EvolvePrintHistory (EvolvePrinter_ID , EvolvePrintHistory_Data , EvolvePrintHistory_Status , EvolvePrintHistory_ErrorCode ,EvolvePrintHistory_ErrorMsg, EvolvePrintHistory_UpdatedAt , EvolvePrintHistory_UpdatedUser , EvolvePrintHistory_CreatedAt , EvolvePrintHistory_CreatedUser) VALUES (@EvolvePrinter_ID , @EvolvePrintHistory_Data , @EvolvePrintHistory_Status , @EvolvePrintHistory_ErrorCode , @EvolvePrintHistory_ErrorMsg , @EvolvePrintHistory_UpdatedAt , @EvolvePrintHistory_UpdatedUser , @EvolvePrintHistory_CreatedAt , @EvolvePrintHistory_CreatedUser) ; select SCOPE_IDENTITY() AS \'inserted_id\'")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Add Record In Print History" + error.message);
            return new Error(" EERR32738: Error while  Add Record In Print History" + error.message);
        }
    },

    getprintProcessDetailsTabel: async function (id) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("SELECT * FROM EvolvePrintProcessDetails WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Add Record In Print History" + error.message);
            return new Error(" EERR32738: Error while  Add Record In Print History" + error.message);
        }
    },

    addRecordInPrintHistoryDetails: async function (insertString) {
        try {
            return await Evolve.SqlPool.request()
                .query("INSERT INTO EvolvePrintHistoryDetails (EvolvePrintHistory_ID , EvolvePrintHistoryDetails_ParentID , EvolvePrintHistoryDetails_Key , EvolvePrintHistoryDetails_Value) VALUES " + insertString)
        } catch (error) {
            Evolve.Log.error(" EERR32738: Error while  Add Record In Print History Details" + error.message);
            return new Error(" EERR32738: Error while  Add Record In Print History Details" + error.message);
        }
    },
    getPrintType: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePrintProcess_ID', Evolve.Sql.Int, id)
                .query("SELECT EvolvePrintProcessDetails_Key , EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails WHERE EvolvePrintProcess_ID = @EvolvePrintProcess_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Print Type " + error.message);
            return new Error(" EERR####: Error while getting Print Type " + error.message);
        }
    },

    updateInvoicePrintTaskErrorStatus: async function (id, status, code, message) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, id)
                .input('EvolveEinvoice_Status', Evolve.Sql.NVarChar, status)
                .input('EvolveEinvoice_ErrorCode', Evolve.Sql.NVarChar, code)
                .input('EvolveEinvoice_ErrorMessage', Evolve.Sql.NVarChar, message)
                .input('EvolveEinvoice_CurrentAction', Evolve.Sql.NVarChar, "EINVPRINT")
                .query("UPDATE EvolveEinvoice SET EvolveEinvoice_Status = @EvolveEinvoice_Status , EvolveEinvoice_ErrorCode = @EvolveEinvoice_ErrorCode , EvolveEinvoice_ErrorMessage = @EvolveEinvoice_ErrorMessage , EvolveEinvoice_CurrentAction = @EvolveEinvoice_CurrentAction WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID")
        } catch (error) {
            Evolve.Log.error(" ERROR####: Error while Update Print Invoice Error Status " + error.message);
            return new Error(" ERROR####: Error while Update Print Invoice Error Status " + error.message);
        }
    },

    updateInvoicePrintTaskStatus: async function (id, status, action) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoice_ID', Evolve.Sql.Int, id)
                .input('EvolveEinvoice_Status', Evolve.Sql.NVarChar, status)
                .input('EvolveEinvoice_CurrentAction', Evolve.Sql.NVarChar, action)
                .query("UPDATE EvolveEinvoice SET EvolveEinvoice_Status = @EvolveEinvoice_Status , EvolveEinvoice_CurrentAction = @EvolveEinvoice_CurrentAction WHERE EvolveEinvoice_ID = @EvolveEinvoice_ID")
        } catch (error) {
            Evolve.Log.error(" ERROR####: Error while Update Print Invoice Error Status " + error.message);
            return new Error(" ERROR####: Error while Update Print Invoice Error Status " + error.message);
        }
    },

    getAllOfflinePrintQueueForPrint: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select 0 as IsSelected , convert(varchar, epp.EvolvePrintProcess_CreatedAt, 120) as EvolvePrintHistory_DateConverted , epp.* , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID') as EvolveItem_ID , (SELECT ei.EvolveItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Code , (SELECT ei.EvolveCustItem_Code FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50)  , eppds.EvolvePrintProcessDetails_Value) AS INT) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveCustItem_Code ,(SELECT ei.EvolveItem_Desc FROM EvolveItem ei WHERE ei.EvolveItem_ID = (SELECT CAST(CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value) AS INT)	FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID	AND eppds.EvolvePrintProcessDetails_Key = 'ITEMID')) AS EvolveItem_Desc , (SELECT eppds.EvolvePrintProcessDetails_Value FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID') as EvolvePrintLabelSerial_ID , (SELECT epls.EvolvePrintLabelSerial_Number from EvolvePrintLabelSerial epls WHERE epls.EvolvePrintLabelSerial_ID = (SELECT CONVERT(INT , CONVERT(nvarchar(50) , eppds.EvolvePrintProcessDetails_Value)) FROM EvolvePrintProcessDetails eppds WHERE eppds.EvolvePrintProcess_ID = epp.EvolvePrintProcess_ID AND eppds.EvolvePrintProcessDetails_Key = 'LABELSEIALID')) as EvolvePrintLabelSerial_Number from EvolvePrintProcess epp where epp.EvolvePrintProcess_Status = 'WAITING' order by  epp.EvolvePrintProcess_ID DESC")
        } catch (error) {
            Evolve.Log.error(" EERR32683: Error while getting Offline PrintQueue List " + error.message);
            return new Error(" EERR32683: Error while getting Offline PrintQueue List " + error.message);
        }
    }

}