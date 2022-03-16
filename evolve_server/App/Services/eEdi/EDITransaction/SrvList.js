'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEDITransactionList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query('SELECT ee.* , eem.EvolveEDIMessage_Code FROM EvolveEDI ee , EvolveEDIMessage eem WHERE ee.EvolveEDIMessage_ID = eem.EvolveEDIMessage_ID ORDER BY EvolveEDI_ID DESC');
        } catch (error) {
            Evolve.Log.error(" EERR32527: Error while getting EDI Transaction List  "+error.message);
            return new Error(" EERR32527: Error while getting EDI Transaction List  "+error.message);
        }
    },

    getGlobleVariableConfig: async function (EvolveConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, EvolveConfig_Key)
                .query("SELECT EvolveConfig_Value FROM EvolveConfig WHERE EvolveConfig_Key LIKE @EvolveConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting config variable " + error.message);
            return new Error("Error While getting config variable " + error.message);
        }
    },
    getGlobleVariableIo: async function (EvolveIOConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, EvolveIOConfig_Key)
                .query("SELECT EvolveIOConfig_Value FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting IO globle variable " + error.message);
            return new Error("Error While getting IO globle variable " + error.message);
        }
    },

    updateEdi : async function (data) {
        let date = new Date();
		let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEDI_ID', Evolve.Sql.Int, data.EvolveEDI_ID)
                .input('EvolveEDI_CurrentAction', Evolve.Sql.NVarChar, data.EvolveEDI_CurrentAction)
                .input('EvolveEDI_ErrorCode', Evolve.Sql.NVarChar, null)
                .input('EvolveEDI_ErrorMessage', Evolve.Sql.NVarChar, null)
                .input('EvolveEDI_Status', Evolve.Sql.NVarChar, 'PROCESS')
                .input('EvolveEDI_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveEDI_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .query("UPDATE EvolveEDI SET EvolveEDI_CurrentAction = @EvolveEDI_CurrentAction , EvolveEDI_ErrorCode = @EvolveEDI_ErrorCode , EvolveEDI_ErrorMessage = @EvolveEDI_ErrorMessage , EvolveEDI_Status = @EvolveEDI_Status , EvolveEDI_UpdatedUser = @EvolveEDI_UpdatedUser , EvolveEDI_UpdatedAt  = @EvolveEDI_UpdatedAt WHERE EvolveEDI_ID = @EvolveEDI_ID");
        } catch (error) {
            Evolve.Log.error("Error While Re_Process EDI Data " + error.message);
            return new Error("Error While Re_Process EDI Data " + error.message);
        }
    },

    addRecordInEdiHistory : async function (data) {
		try {
			let date = new Date();
			let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
			return await Evolve.SqlPool.request()
			.input('EvolveEDIMessage_ID', Evolve.Sql.Int, data.EvolveEDIMessage_ID)
			.input('EvolveEDIHistory_FileName', Evolve.Sql.NVarChar, data.EvolveEDI_FileName)
			.input('EvolveEDIHistory_OutFileName', Evolve.Sql.NVarChar, data.EvolveEDI_OutFileName)
			.input('EvolveEDIHistory_CreatedUser', Evolve.Sql.Int, 1)
			.input('EvolveEDIHistory_CreatedAt', Evolve.Sql.NVarChar, dateTime)
			.input('EvolveEDIHistory_UpdatedUser', Evolve.Sql.Int, 1)
			.input('EvolveEDIHistory_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
				.query("INSERT INTO EvolveEDIHistory (EvolveEDIMessage_ID , EvolveEDIHistory_FileName , EvolveEDIHistory_OutFileName , EvolveEDIHistory_CreatedUser , EvolveEDIHistory_CreatedAt , EvolveEDIHistory_UpdatedUser , EvolveEDIHistory_UpdatedAt) VALUES (@EvolveEDIMessage_ID , @EvolveEDIHistory_FileName , @EvolveEDIHistory_OutFileName , @EvolveEDIHistory_CreatedUser , @EvolveEDIHistory_CreatedAt , @EvolveEDIHistory_UpdatedUser , @EvolveEDIHistory_UpdatedAt)");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

    deleteRecordInPrintProcess: async function (id) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveEDI_ID', Evolve.Sql.Int, id)
				.query("DELETE FROM EvolveEDI WHERE EvolveEDI_ID = @EvolveEDI_ID ");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},

    getEDIDetailsTable : async function (id) {
        try {
			return await Evolve.SqlPool.request()
				.input('EvolveEDI_ID', Evolve.Sql.Int, id)
				.query("SELECT * FROM EvolveEDIDetails WHERE EvolveEDI_ID = @EvolveEDI_ID AND EvolveEDIDetails_Key = 'PONUMBER'");
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
    }
}