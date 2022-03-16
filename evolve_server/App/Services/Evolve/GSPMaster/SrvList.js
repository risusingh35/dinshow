'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addGsp: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSP_Code', Evolve.Sql.NVarChar, data.EvolveGSP_Code)
                .input('EvolveGSP_Name', Evolve.Sql.NVarChar, data.EvolveGSP_Name)
                .input('EvolveGSP_Integration_Type', Evolve.Sql.NVarChar, data.EvolveGSP_Integration_Type)
                .input('EvolveGSP_URL_Type', Evolve.Sql.NVarChar, data.EvolveGSP_URL_Type)
                .input('EvolveGSP_URL', Evolve.Sql.NVarChar, data.EvolveGSP_URL)
                .input('EvolveGSP_OutPut_Drive', Evolve.Sql.NVarChar, data.EvolveGSP_OutPut_Drive)
                .input('EvolveGSP_Input_Drive', Evolve.Sql.NVarChar, data.EvolveGSP_Input_Drive)
                .input('EvolveGSP_SFTP_Server_PORT', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Server_PORT)
                .input('EvolveGSP_SFTP_Output_Folder', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Output_Folder)
                .input('EvolveGSP_SFTP_Input_Folder', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Input_Folder)
                .input('EvolveGSP_SFTP_Username', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Username)
                .input('EvolveGSP_SFTP_Password', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Password)
                .input('EvolveGSP_Contact_Name', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Name)
                .input('EvolveGSP_Contact_Email', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Email)
                .input('EvolveGSP_Contact_Phone', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Phone)
                .input('EvolveGSP_Status', Evolve.Sql.NVarChar, data.EvolveGSP_Status)
                .input('EvolveGSP_SFTP_HOST', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_HOST)

                .input('EvolveGSP_IRPUsername', Evolve.Sql.NVarChar, data.EvolveGSP_IRPUsername)
                .input('EvolveGSP_IRPPassword', Evolve.Sql.NVarChar, data.EvolveGSP_IRPPassword)
                .input('EvolveGSP_GSPUsername', Evolve.Sql.NVarChar, data.EvolveGSP_GSPUsername)
                .input('EvolveGSP_GSPPassword', Evolve.Sql.NVarChar, data.EvolveGSP_GSPPassword)
                .input('EvolveGSP_GSPSecrateKey', Evolve.Sql.NVarChar, data.EvolveGSP_GSPSecrateKey)
                .input('EvolveGSP_GSPPemFilePath', Evolve.Sql.NVarChar, data.EvolveGSP_GSPPemFilePath)
                .input('EvolveGSP_GSTIN', Evolve.Sql.NVarChar, data.EvolveGSP_GSTIN)
                .input('EvolveGSP_GSPOrganizationID', Evolve.Sql.NVarChar, data.EvolveGSP_GSPOrganizationID)

                .input('EvolveGSP_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSP_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSP_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSP_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveGSP (EvolveGSP_Code , EvolveGSP_Name ,EvolveGSP_Integration_Type , EvolveGSP_URL_Type,EvolveGSP_URL, EvolveGSP_OutPut_Drive,EvolveGSP_Input_Drive,EvolveGSP_SFTP_Server_PORT, EvolveGSP_SFTP_Output_Folder,EvolveGSP_SFTP_Input_Folder, EvolveGSP_SFTP_Username, EvolveGSP_SFTP_Password, EvolveGSP_Contact_Name, EvolveGSP_Contact_Email, EvolveGSP_Contact_Phone, EvolveGSP_Status, EvolveGSP_CreatedAt, EvolveGSP_CreatedUser, EvolveGSP_UpdatedAt, EvolveGSP_UpdatedUser, EvolveGSP_IRPUsername, EvolveGSP_IRPPassword, EvolveGSP_GSPUsername, EvolveGSP_GSPPassword, EvolveGSP_GSPSecrateKey, EvolveGSP_GSPPemFilePath, EvolveGSP_GSTIN, EvolveGSP_GSPOrganizationID, EvolveGSP_SFTP_HOST) VALUES(@EvolveGSP_Code , @EvolveGSP_Name, @EvolveGSP_Integration_Type ,@EvolveGSP_URL_Type,@EvolveGSP_URL, @EvolveGSP_OutPut_Drive,@EvolveGSP_Input_Drive,@EvolveGSP_SFTP_Server_PORT, @EvolveGSP_SFTP_Output_Folder,@EvolveGSP_SFTP_Input_Folder, @EvolveGSP_SFTP_Username, @EvolveGSP_SFTP_Password, @EvolveGSP_Contact_Name, @EvolveGSP_Contact_Email, @EvolveGSP_Contact_Phone, @EvolveGSP_Status, @EvolveGSP_CreatedAt, @EvolveGSP_CreatedUser, @EvolveGSP_UpdatedAt, @EvolveGSP_UpdatedUser, @EvolveGSP_IRPUsername, @EvolveGSP_IRPPassword, @EvolveGSP_GSPUsername, @EvolveGSP_GSPPassword, @EvolveGSP_GSPSecrateKey, @EvolveGSP_GSPPemFilePath, @EvolveGSP_GSTIN, @EvolveGSP_GSPOrganizationID, @EvolveGSP_SFTP_HOST)')
        } catch (error) {
            Evolve.Log.error(" EERR1228: Error while adding GSP " + error.message);
            return new Error(" EERR1228: Error while adding GSP " + error.message);
        }
    },


    getgetGspListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT count(EvolveGSP_ID) AS count FROM EvolveGSP WHERE EvolveGSP_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Gsp List Count " + error.message);
            return new Error(" EERR1229: Error while getting Gsp List Count " + error.message);
        }
    },

    getGspList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveGSP WHERE EvolveGSP_Name LIKE @search ORDER BY EvolveGSP_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting Gsp List " + error.message);
            return new Error(" EERR1230: Error while getting Gsp List " + error.message);
        }
    },

    getSingleGsp: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .query("SELECT * FROM EvolveGSP WHERE EvolveGSP_ID = @EvolveGSP_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single Gsp " + error.message);
            return new Error(" EERR1231: Error while getting Single Gsp " + error.message);
        }
    },

    updateGsp: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .input('EvolveGSP_Code', Evolve.Sql.NVarChar, data.EvolveGSP_Code)
                .input('EvolveGSP_Name', Evolve.Sql.NVarChar, data.EvolveGSP_Name)
                .input('EvolveGSP_Integration_Type', Evolve.Sql.NVarChar, data.EvolveGSP_Integration_Type)
                .input('EvolveGSP_URL_Type', Evolve.Sql.NVarChar, data.EvolveGSP_URL_Type)
                .input('EvolveGSP_URL', Evolve.Sql.NVarChar, data.EvolveGSP_URL)
                .input('EvolveGSP_OutPut_Drive', Evolve.Sql.NVarChar, data.EvolveGSP_OutPut_Drive)
                .input('EvolveGSP_Input_Drive', Evolve.Sql.NVarChar, data.EvolveGSP_Input_Drive)
                .input('EvolveGSP_SFTP_Server_PORT', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Server_PORT)
                .input('EvolveGSP_SFTP_Output_Folder', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Output_Folder)
                .input('EvolveGSP_SFTP_Input_Folder', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Input_Folder)
                .input('EvolveGSP_SFTP_Username', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Username)
                .input('EvolveGSP_SFTP_Password', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_Password)
                .input('EvolveGSP_Contact_Name', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Name)
                .input('EvolveGSP_Contact_Email', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Email)
                .input('EvolveGSP_Contact_Phone', Evolve.Sql.NVarChar, data.EvolveGSP_Contact_Phone)
                .input('EvolveGSP_Status', Evolve.Sql.NVarChar, data.EvolveGSP_Status)
                .input('EvolveGSP_SFTP_HOST', Evolve.Sql.NVarChar, data.EvolveGSP_SFTP_HOST)

                .input('EvolveGSP_IRPUsername', Evolve.Sql.NVarChar, data.EvolveGSP_IRPUsername)
                .input('EvolveGSP_IRPPassword', Evolve.Sql.NVarChar, data.EvolveGSP_IRPPassword)
                .input('EvolveGSP_GSPUsername', Evolve.Sql.NVarChar, data.EvolveGSP_GSPUsername)
                .input('EvolveGSP_GSPPassword', Evolve.Sql.NVarChar, data.EvolveGSP_GSPPassword)
                .input('EvolveGSP_GSPSecrateKey', Evolve.Sql.NVarChar, data.EvolveGSP_GSPSecrateKey)
                .input('EvolveGSP_GSPPemFilePath', Evolve.Sql.NVarChar, data.EvolveGSP_GSPPemFilePath)
                .input('EvolveGSP_GSTIN', Evolve.Sql.NVarChar, data.EvolveGSP_GSTIN)
                .input('EvolveGSP_GSPOrganizationID', Evolve.Sql.NVarChar, data.EvolveGSP_GSPOrganizationID)

                .input('EvolveGSP_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSP_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('UPDATE EvolveGSP SET EvolveGSP_Code = @EvolveGSP_Code , EvolveGSP_Name = @EvolveGSP_Name,EvolveGSP_Integration_Type = @EvolveGSP_Integration_Type , EvolveGSP_URL_Type = @EvolveGSP_URL_Type, EvolveGSP_URL = @EvolveGSP_URL, EvolveGSP_OutPut_Drive = @EvolveGSP_OutPut_Drive, EvolveGSP_Input_Drive = @EvolveGSP_Input_Drive, EvolveGSP_SFTP_Server_PORT = @EvolveGSP_SFTP_Server_PORT, EvolveGSP_SFTP_Output_Folder = @EvolveGSP_SFTP_Output_Folder,EvolveGSP_SFTP_Input_Folder = @EvolveGSP_SFTP_Input_Folder, EvolveGSP_SFTP_Username = @EvolveGSP_SFTP_Username, EvolveGSP_SFTP_Password = @EvolveGSP_SFTP_Password, EvolveGSP_Contact_Name = @EvolveGSP_Contact_Name, EvolveGSP_Contact_Email = @EvolveGSP_Contact_Email, EvolveGSP_Contact_Phone = @EvolveGSP_Contact_Phone, EvolveGSP_Status = @EvolveGSP_Status, EvolveGSP_UpdatedAt = @EvolveGSP_UpdatedAt, EvolveGSP_UpdatedUser = @EvolveGSP_UpdatedUser, EvolveGSP_IRPUsername = @EvolveGSP_IRPUsername, EvolveGSP_IRPPassword = @EvolveGSP_IRPPassword, EvolveGSP_GSPUsername = @EvolveGSP_GSPUsername, EvolveGSP_GSPPassword = @EvolveGSP_GSPPassword, EvolveGSP_GSPSecrateKey = @EvolveGSP_GSPSecrateKey, EvolveGSP_GSPPemFilePath = @EvolveGSP_GSPPemFilePath, EvolveGSP_GSTIN = @EvolveGSP_GSTIN, EvolveGSP_GSPOrganizationID = @EvolveGSP_GSPOrganizationID, EvolveGSP_SFTP_HOST = @EvolveGSP_SFTP_HOST  WHERE EvolveGSP_ID = @EvolveGSP_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1232: Error while updating Gsp " + error.message);
            return new Error(" EERR1232: Error while updating Gsp " + error.message);
        }
    },


}