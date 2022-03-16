'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getIoReportDataCountList: async function (condition) {
        try {
            return await Evolve.SqlPool.request()
                // .input('startDate', Evolve.Sql.NVarChar, startDate)
                // .input('endDate', Evolve.Sql.NVarChar, endDate)
                .query("SELECT COUNT(EvolveIO_ID) AS count from EvolveIO " + condition );
        } catch (error) {
            Evolve.Log.error(" EERR1236: Error while getting Io Report Data Count List "+error.message);
            return new Error(" EERR1236: Error while getting Io Report Data Count List "+error.message);
        }
    },

    getIoReportDataDatatableList: async function (start, length, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query("SELECT * FROM EvolveIO  " + condition + " ORDER BY EvolveIO_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1237: Error while getting Io Report Data Datatable List "+error.message);
            return new Error(" EERR1237: Error while getting Io Report Data Datatable List "+error.message);
        }
    },

    getGlobleVariableEInv: async function (EvolveEinvoiceConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, EvolveEinvoiceConfig_Key)
                .query("SELECT EvolveEinvoiceConfig_Value FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting E Invoice globle variable " + error.message);
            return new Error("Error While getting E Invoice globle variable " + error.message);
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
    ioQueueDelete: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIO_ID', Evolve.Sql.NVarChar, data.EvolveIO_ID)
                .query("DELETE FROM EvolveIO WHERE EvolveIO_ID = @EvolveIO_ID");
        } catch (error) {
            Evolve.Log.error("Error While Deleteing IO Queue " + error.message);
            return new Error("Error While Deleteing IO Queue " + error.message);
        }
    },
    deleteIOQueue: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIO_ID', Evolve.Sql.NVarChar, data.EvolveIO_ID)
                .query("DELETE FROM EvolveIO WHERE EvolveIO_ID = @EvolveIO_ID");
        } catch (error) {
            Evolve.Log.error("Error While Deleteing IO Queue " + error.message);
            return new Error("Error While Deleteing IO Queue " + error.message);
        }
    },

    


}