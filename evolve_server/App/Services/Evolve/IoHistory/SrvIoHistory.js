'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getIoReportDataCountList: async function (condition) {
        try {

            return await Evolve.SqlPool.request()
                // .input('startDate', Evolve.Sql.NVarChar, startDate)
                // .input('endDate', Evolve.Sql.NVarChar, endDate)
                .query("SELECT COUNT(EvolveIOHistory_ID) AS count from EvolveIOHistory " + condition);
        } catch (error) {
            Evolve.Log.error(" EERR1233: Error while getting Io Report data count list "+error.message);
            return new Error(" EERR1233: Error while getting Io Report data count list "+error.message);
        }
    },

    
    getIoReportDataDatatableList: async function (start, length, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .query("SELECT * FROM EvolveIOHistory  " + condition + "  ORDER BY [EvolveIOHistory_ID] DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1234: Error while getting Io Report Data Data table List "+error.message);
            return new Error(" EERR1234: Error while getting Io Report Data Data table List "+error.message);
        }
    },

    getSingleIoCodeData: async function (ioDataId) {

        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveIOHistory WHERE EvolveIOHistory_ID =" + ioDataId);
        } catch (error) {
            Evolve.Log.error(" EERR1235: Error while getting Single Io Code Data "+error.message);
            return new Error(" EERR1235: Error while getting Single Io Code Data "+error.message);
        }
    },



}