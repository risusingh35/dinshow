'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocument: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_Name', Evolve.Sql.NVarChar, data.EvolveDocument_Name)
                .input('EvolveDocument_Code', Evolve.Sql.NVarChar, data.EvolveDocument_Code)
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .input('EvolveDocumentSubType_ID', Evolve.Sql.Int, data.EvolveDocumentSubType_ID)
                .input('EvolveDocument_Data_Input_Type', Evolve.Sql.NVarChar, data.EvolveDocument_Data_Input_Type)
                .input('EvolveDocument_Status', Evolve.Sql.NVarChar, data.EvolveDocument_Status)
                .input('EvolveDocument_Data_Input_Folder', Evolve.Sql.NVarChar, data.EvolveDocument_Data_Input_Folder)
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .input('EvolveDocument_E_Invoice', Evolve.Sql.NVarChar, data.EvolveDocument_E_Invoice)
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .input('EvolveDocument_IsCSV_Required', Evolve.Sql.Bit, data.EvolveDocument_IsCSV_Required)
                .input('EvolveDocument_IsGST_Process', Evolve.Sql.Bit, data.EvolveDocument_IsGST_Process)
                .input('EvolveDocument_IsDS_Process', Evolve.Sql.Bit, data.EvolveDocument_IsDS_Process)
                .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)

                .input('EvolveDocument_IsEmail_Process', Evolve.Sql.Bit, data.EvolveDocument_IsEmail_Process)
                .input('EvolveDocument_IsPrintRequired', Evolve.Sql.Bit, data.EvolveDocument_IsPrintRequired)

                // .input('EvolveDocument_ToEmail_ID', Evolve.Sql.NVarChar, data.EvolveDocument_ToEmail_ID)
                // .input('EvolveDocument_CCEmail_IDS', Evolve.Sql.NVarChar, data.EvolveDocument_CCEmail_IDS)
                // .input('EvolveDocument_EmailBody', Evolve.Sql.NVarChar, data.EvolveDocument_EmailBody)

                .input('EvolveDocument_IsIRN', Evolve.Sql.Bit, data.EvolveDocument_IsIRN)
                .input('EvolveDocument_IsIRNQRCode', Evolve.Sql.Bit, data.EvolveDocument_IsIRNQRCode)
                .input('EvolveDocument_IsCustomerQRCode', Evolve.Sql.Bit, data.EvolveDocument_IsCustomerQRCode)
                .input('EvolveDocument_CustomerQRCodeField', Evolve.Sql.NVarChar, data.EvolveDocument_CustomerQRCodeField)

                .input('EvolveDocument_IsEWayBill', Evolve.Sql.Bit, data.EvolveDocument_IsEWayBill)
                .input('EvolveDocument_IsDistanceAPI', Evolve.Sql.Bit, data.EvolveDocument_IsDistanceAPI)
                .input('EvolveDocument_IsVahanValidation', Evolve.Sql.Bit, data.EvolveDocument_IsVahanValidation)
                .input('EvolveDocument_IsGPRSTracking', Evolve.Sql.Bit, data.EvolveDocument_IsGPRSTracking)

                .input('EvolveDocument_SignatureSetting', Evolve.Sql.NVarChar, data.EvolveDocument_SignatureSetting)
                .input('EvolveDocument_SignatureSettingDetails', Evolve.Sql.NVarChar, data.EvolveDocument_SignatureSettingDetails)
                .input('EvolveDocument_DS_Setting', Evolve.Sql.NVarChar, data.EvolveDocument_DS_Setting)
                .input('EvolveDocument_EmailSetting', Evolve.Sql.NVarChar, data.EvolveDocument_EmailSetting)
                .input('EvolveDocument_PrintCopy', Evolve.Sql.NVarChar, data.EvolveDocument_PrintCopy)
                

                .input('EvolveDocument_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocument_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocument_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocument_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocument (EvolveDocument_Name, EvolveDocumentType_ID, EvolveDocumentSubType_ID, EvolveDocument_Data_Input_Type, EvolveDocument_Status, EvolveDocument_Data_Input_Folder, EvolveCoordinatesTemplate_ID, EvolveDocument_E_Invoice, EvolveGSP_ID, EvolveDocument_CreatedAt, EvolveDocument_CreatedUser, EvolveDocument_UpdatedAt, EvolveDocument_UpdatedUser, EvolveDocument_IsCSV_Required, EvolveDocument_IsGST_Process, EvolveDocument_IsDS_Process, EvolveDocument_Code, EvolveDocument_IsEmail_Process, EvolveDocument_IsIRN, EvolveDocument_IsIRNQRCode, EvolveDocument_IsCustomerQRCode, EvolveDocument_CustomerQRCodeField, EvolveDocument_IsEWayBill, EvolveDocument_IsDistanceAPI, EvolveDocument_IsVahanValidation, EvolveDocument_IsGPRSTracking, EvolveDocument_SignatureSetting, EvolveDocument_SignatureSettingDetails, EvolveDocument_DS_Setting,EvolveDocument_IsPrintRequired, EvolveCustQRTemplate_ID, EvolveDocument_EmailSetting, EvolveDocument_PrintCopy)VALUES(@EvolveDocument_Name, @EvolveDocumentType_ID, @EvolveDocumentSubType_ID, @EvolveDocument_Data_Input_Type, @EvolveDocument_Status, @EvolveDocument_Data_Input_Folder, @EvolveCoordinatesTemplate_ID, @EvolveDocument_E_Invoice, @EvolveGSP_ID, @EvolveDocument_CreatedAt, @EvolveDocument_CreatedUser, @EvolveDocument_UpdatedAt, @EvolveDocument_UpdatedUser, @EvolveDocument_IsCSV_Required, @EvolveDocument_IsGST_Process, @EvolveDocument_IsDS_Process, @EvolveDocument_Code, @EvolveDocument_IsEmail_Process, @EvolveDocument_IsIRN, @EvolveDocument_IsIRNQRCode, @EvolveDocument_IsCustomerQRCode, @EvolveDocument_CustomerQRCodeField, @EvolveDocument_IsEWayBill, @EvolveDocument_IsDistanceAPI, @EvolveDocument_IsVahanValidation, @EvolveDocument_IsGPRSTracking, @EvolveDocument_SignatureSetting, @EvolveDocument_SignatureSettingDetails, @EvolveDocument_DS_Setting,@EvolveDocument_IsPrintRequired, @EvolveCustQRTemplate_ID, @EvolveDocument_EmailSetting, @EvolveDocument_PrintCopy)select @@IDENTITY AS \'inserted_id\' ");

        } catch (error) {
            Evolve.Log.error(" EERR1218: Error while adding document " + error.message);
            return new Error(" EERR1218: Error while adding document " + error.message);
        }
    },

    addDocumentStamping: async function (data, tableData) {
        try {

            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, tableData.EvolveDocument_ID)
                .input('EvolveDocumentStamping_Code', Evolve.Sql.NVarChar, tableData.EvolveDocumentStamping_Code)
                .input('EvolveDocumentStamping_StartX', Evolve.Sql.NVarChar, tableData.EvolveDocumentStamping_StartX)
                .input('EvolveDocumentStamping_StartY', Evolve.Sql.NVarChar, tableData.EvolveDocumentStamping_StartY)
                .input('EvolveDocumentStamping_EndX', Evolve.Sql.NVarChar, tableData.EvolveDocumentStamping_EndX)
                .input('EvolveDocumentStamping_EndY', Evolve.Sql.NVarChar, tableData.EvolveDocumentStamping_EndY)
                .input('EvolveDocumentStamping_Status', Evolve.Sql.Bit, tableData.EvolveDocumentStamping_Status)

                .input('EvolveDocumentStamping_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentStamping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentStamping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentStamping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocumentStamping (EvolveDocument_ID, EvolveDocumentStamping_Code, EvolveDocumentStamping_StartX, EvolveDocumentStamping_StartY, EvolveDocumentStamping_EndX, EvolveDocumentStamping_EndY, EvolveDocumentStamping_Status, EvolveDocumentStamping_CreatedAt, EvolveDocumentStamping_CreatedUser, EvolveDocumentStamping_UpdatedAt, EvolveDocumentStamping_UpdatedUser) VALUES (@EvolveDocument_ID, @EvolveDocumentStamping_Code, @EvolveDocumentStamping_StartX, @EvolveDocumentStamping_StartY, @EvolveDocumentStamping_EndX, @EvolveDocumentStamping_EndY, @EvolveDocumentStamping_Status, @EvolveDocumentStamping_CreatedAt, @EvolveDocumentStamping_CreatedUser, @EvolveDocumentStamping_UpdatedAt, @EvolveDocumentStamping_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while ADD Document stamping " + error.message);
            return new Error(" EERR1227: Error while ADD Document stamping" + error.message);
        }
    },
    getDocumentListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(EvolveDocument_ID) AS count FROM EvolveDocument WHERE EvolveDocument_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document List Count " + error.message);
            return new Error(" EERR1219: Error while getting Document List Count " + error.message);
        }
    },

    getDocumentList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT  ed.*, edt.EvolveDocumentType_Name, edst.EvolveDocumentSubType_Name, ect.EvolveCoordinatesTemplate_Name, egsp.EvolveGSP_Name FROM EvolveDocument ed, EvolveDocumentType edt, EvolveDocumentSubType edst, EvolveGSP egsp, EvolveCoordinatesTemplate ect WHERE ed.EvolveDocumentType_ID = edt.EvolveDocumentType_ID AND ed.EvolveDocumentSubType_ID = edst.EvolveDocumentSubType_ID AND ed.EvolveGSP_ID = egsp.EvolveGSP_ID AND ed.EvolveCoordinatesTemplate_ID = ect.EvolveCoordinatesTemplate_ID AND ed.EvolveDocument_Name LIKE @search ORDER BY ed.EvolveDocument_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1220: Error while getting document list " + error.message);
            return new Error(" EERR1220: Error while getting document list " + error.message);
        }
    },

    getDocumentTypeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveDocumentType");

        } catch (error) {
            Evolve.Log.error(" EERR1221: Error while getting document type list " + error.message);
            return new Error(" EERR1221: Error while getting document type list " + error.message);
        }
    },
    getDocumentSubTypeList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .query("SELECT * FROM EvolveDocumentSubType WHERE EvolveDocumentType_ID = @EvolveDocumentType_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1222: Error while getting document sub type list " + error.message);
            return new Error(" EERR1222: Error while getting document sub type list " + error.message);
        }
    },
    getGspList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveGSP");

        } catch (error) {
            Evolve.Log.error(" EERR1223: Error while getting Gsp List " + error.message);
            return new Error(" EERR1223: Error while getting Gsp List " + error.message);
        }
    },
    getInvoiceList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveInvoice");

        } catch (error) {
            Evolve.Log.error(" EERR1224: Error while getting Invoice list " + error.message);
            return new Error(" EERR1224: Error while getting Invoice list " + error.message);
        }
    },
    getCTemplateList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCoordinatesTemplate");

        } catch (error) {
            Evolve.Log.error(" EERR1225: Error while getting CTemplate List " + error.message);
            return new Error(" EERR1225: Error while getting CTemplate List " + error.message);
        }
    },
    getSingleDocument: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .query("SELECT * FROM EvolveDocument WHERE EvolveDocument_ID = @EvolveDocument_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1226: Error while getting Single Document " + error.message);
            return new Error(" EERR1226: Error while getting Single Document " + error.message);
        }
    },
    updateDocument: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('Evolvedocument_ID', Evolve.Sql.Int, data.Evolvedocument_ID)
                .input('EvolveDocument_Name', Evolve.Sql.NVarChar, data.EvolveDocument_Name)
                .input('EvolveDocument_Code', Evolve.Sql.NVarChar, data.EvolveDocument_Code)
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .input('EvolveDocumentSubType_ID', Evolve.Sql.Int, data.EvolveDocumentSubType_ID)
                .input('EvolveDocument_Data_Input_Type', Evolve.Sql.NVarChar, data.EvolveDocument_Data_Input_Type)
                .input('EvolveDocument_Status', Evolve.Sql.NVarChar, data.EvolveDocument_Status)
                .input('EvolveDocument_Data_Input_Folder', Evolve.Sql.NVarChar, data.EvolveDocument_Data_Input_Folder)
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.NVarChar, data.EvolveCoordinatesTemplate_ID)
                .input('EvolveDocument_E_Invoice', Evolve.Sql.NVarChar, data.EvolveDocument_E_Invoice)
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .input('EvolveDocument_IsCSV_Required', Evolve.Sql.Bit, data.EvolveDocument_IsCSV_Required)
                .input('EvolveDocument_IsGST_Process', Evolve.Sql.Bit, data.EvolveDocument_IsGST_Process)
                .input('EvolveDocument_IsDS_Process', Evolve.Sql.Bit, data.EvolveDocument_IsDS_Process)
                .input('EvolveCustQRTemplate_ID', Evolve.Sql.Int, data.EvolveCustQRTemplate_ID)

                .input('EvolveDocument_IsEmail_Process', Evolve.Sql.Bit, data.EvolveDocument_IsEmail_Process)
                .input('EvolveDocument_IsPrintRequired', Evolve.Sql.Bit, data.EvolveDocument_IsPrintRequired)

                // .input('EvolveDocument_ToEmail_ID', Evolve.Sql.NVarChar, data.EvolveDocument_ToEmail_ID)
                // .input('EvolveDocument_CCEmail_IDS', Evolve.Sql.NVarChar, data.EvolveDocument_CCEmail_IDS)
                // .input('EvolveDocument_EmailBody', Evolve.Sql.NVarChar, data.EvolveDocument_EmailBody)

                .input('EvolveDocument_IsIRN', Evolve.Sql.Bit, data.EvolveDocument_IsIRN)
                .input('EvolveDocument_IsIRNQRCode', Evolve.Sql.Bit, data.EvolveDocument_IsIRNQRCode)
                .input('EvolveDocument_IsCustomerQRCode', Evolve.Sql.Bit, data.EvolveDocument_IsCustomerQRCode)
                .input('EvolveDocument_CustomerQRCodeField', Evolve.Sql.NVarChar, data.EvolveDocument_CustomerQRCodeField)

                .input('EvolveDocument_IsEWayBill', Evolve.Sql.Bit, data.EvolveDocument_IsEWayBill)
                .input('EvolveDocument_IsDistanceAPI', Evolve.Sql.Bit, data.EvolveDocument_IsDistanceAPI)
                .input('EvolveDocument_IsVahanValidation', Evolve.Sql.Bit, data.EvolveDocument_IsVahanValidation)
                .input('EvolveDocument_IsGPRSTracking', Evolve.Sql.Bit, data.EvolveDocument_IsGPRSTracking)

                .input('EvolveDocument_SignatureSetting', Evolve.Sql.NVarChar, data.EvolveDocument_SignatureSetting)
                .input('EvolveDocument_SignatureSettingDetails', Evolve.Sql.NVarChar, data.EvolveDocument_SignatureSettingDetails)
                .input('EvolveDocument_DS_Setting', Evolve.Sql.NVarChar, data.EvolveDocument_DS_Setting)
                .input('EvolveDocument_EmailSetting', Evolve.Sql.NVarChar, data.EvolveDocument_EmailSetting)
                .input('EvolveDocument_PrintCopy', Evolve.Sql.NVarChar, data.EvolveDocument_PrintCopy)

                .input('EvolveDocument_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocument_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveDocument SET EvolveDocument_Name = @EvolveDocument_Name, EvolveDocumentType_ID = @EvolveDocumentType_ID, EvolveDocumentSubType_ID = @EvolveDocumentSubType_ID, EvolveDocument_Data_Input_Type = @EvolveDocument_Data_Input_Type, EvolveDocument_Status = @EvolveDocument_Status, EvolveDocument_Data_Input_Folder = @EvolveDocument_Data_Input_Folder, EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID, EvolveDocument_E_Invoice = @EvolveDocument_E_Invoice, EvolveGSP_ID = @EvolveGSP_ID, EvolveDocument_UpdatedAt = @EvolveDocument_UpdatedAt, EvolveDocument_UpdatedUser = @EvolveDocument_UpdatedUser, EvolveDocument_IsCSV_Required = @EvolveDocument_IsCSV_Required, EvolveDocument_IsGST_Process = @EvolveDocument_IsGST_Process, EvolveDocument_IsDS_Process = @EvolveDocument_IsDS_Process, EvolveDocument_Code = @EvolveDocument_Code, EvolveDocument_IsEmail_Process = @EvolveDocument_IsEmail_Process, EvolveDocument_IsIRN = @EvolveDocument_IsIRN, EvolveDocument_IsIRNQRCode = @EvolveDocument_IsIRNQRCode, EvolveDocument_IsCustomerQRCode = @EvolveDocument_IsCustomerQRCode, EvolveDocument_CustomerQRCodeField = @EvolveDocument_CustomerQRCodeField, EvolveDocument_IsEWayBill = @EvolveDocument_IsEWayBill, EvolveDocument_IsDistanceAPI = @EvolveDocument_IsDistanceAPI, EvolveDocument_IsVahanValidation = @EvolveDocument_IsVahanValidation, EvolveDocument_IsGPRSTracking = @EvolveDocument_IsGPRSTracking, EvolveDocument_SignatureSetting = @EvolveDocument_SignatureSetting, EvolveDocument_SignatureSettingDetails = @EvolveDocument_SignatureSettingDetails, EvolveDocument_DS_Setting = @EvolveDocument_DS_Setting , EvolveDocument_IsPrintRequired=@EvolveDocument_IsPrintRequired, EvolveCustQRTemplate_ID = @EvolveCustQRTemplate_ID, EvolveDocument_EmailSetting = @EvolveDocument_EmailSetting, EvolveDocument_PrintCopy = @EvolveDocument_PrintCopy WHERE Evolvedocument_ID = @Evolvedocument_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while updating Document " + error.message);
            return new Error(" EERR1227: Error while updating Document " + error.message);
        }

    },
    getCoordinateList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.Int, data.EvolveCoordinatesTemplate_ID)
                .query("SELECT * From EvolveCoordinates WHERE EvolveCoordinatesTemplate_ID = @EvolveCoordinatesTemplate_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1450: Error while get Coordinate list" + error.message);
            return new Error(" EERR1450: Error while get Coordinate list" + error.message);
        }
    },
    getDocumentMapppingList: async function (data) {
        try {
            console.log("data :",data)
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .query("SELECT * From EvolveDocumentMappingSetting WHERE EvolveDocument_ID = @EvolveDocument_ID")
        } catch (error) {
            Evolve.Log.error(" EERR1450: Error while get Document Mapping list" + error.message);
            return new Error(" EERR1450: Error while get Document Mapping list" + error.message);
        }
    },
    addDocumentMapping: async function (data, tableData) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, tableData.EvolveDocument_ID)
                .input('EvolveCoordinates_ID', Evolve.Sql.NVarChar, tableData.EvolveCoordinates_ID)
                .input('EvolveDocumentMappingSetting_MatchingValue', Evolve.Sql.NVarChar, tableData.EvolveDocumentMappingSetting_MatchingValue)
                .input('EvolveCoordinatesTemplate_ID', Evolve.Sql.NVarChar, tableData.EvolveCoordinatesTemplate_ID)

                .input('EvolveDocumentMappingSetting_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentMappingSetting_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentMappingSetting_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentMappingSetting_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocumentMappingSetting (EvolveDocument_ID, EvolveCoordinates_ID, EvolveDocumentMappingSetting_MatchingValue, EvolveCoordinatesTemplate_ID, EvolveDocumentMappingSetting_CreatedAt, EvolveDocumentMappingSetting_CreatedUser, EvolveDocumentMappingSetting_UpdatedAt, EvolveDocumentMappingSetting_UpdatedUser) VALUES (@EvolveDocument_ID, @EvolveCoordinates_ID, @EvolveDocumentMappingSetting_MatchingValue, @EvolveCoordinatesTemplate_ID,@EvolveDocumentMappingSetting_CreatedAt, @EvolveDocumentMappingSetting_CreatedUser, @EvolveDocumentMappingSetting_UpdatedAt, @EvolveDocumentMappingSetting_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while ADD Document Mapping  " + error.message);
            return new Error(" EERR1227: Error while ADD Document Mapping " + error.message);
        }
    },

    removeDocumentMapping: async function (Evolvedocument_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, Evolvedocument_ID)
                .query("DELETE EvolveDocumentMappingSetting WHERE EvolveDocument_ID = @EvolveDocument_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while REMOVE Document Mapping  "+error.message);
            return new Error(" EERR1227: Error while REMOVE Document Mapping "+error.message);
        }
    },
    getCustQRTempList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCustQRTemplate");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while GET EvolveCustQRTemplate "+error.message);
            return new Error(" EERR1227: Error while GET EvolveCustQRTemplate "+error.message);
        }
    },


}