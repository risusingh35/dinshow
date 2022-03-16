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

            console.log(`SELECT * , '${Evolve.Config.IOSERVERURL}' as IOSERVERURL  , convert(varchar, EvolveIO_CreatedAt, 13) as dateTime FROM EvolveIO   ${condition}  ORDER BY EvolveIO_ID DESC OFFSET  ${start} ROWS FETCH NEXT ${length} ROWS ONLY`)
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .query(`SELECT * , '${Evolve.Config.IOSERVERURL}' as IOSERVERURL  , convert(varchar, EvolveIO_CreatedAt, 13) as dateTime FROM EvolveIO   ${condition}  ORDER BY EvolveIO_ID DESC OFFSET  ${start} ROWS FETCH NEXT ${length} ROWS ONLY`);
        } catch (error) {
            Evolve.Log.error(" EERR1237: Error while getting Io Report Data Datatable List "+error.message);
            return new Error(" EERR1237: Error while getting Io Report Data Datatable List "+error.message);
        }
    },

    getSingleIoCodeData: async function (ioDataId) {

        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveIO WHERE EvolveIO_ID =" + ioDataId);
        } catch (error) {
            Evolve.Log.error(" EERR1238: Error while getting Single Io Code Data "+error.message);
            return new Error(" EERR1238: Error while getting Single Io Code Data "+error.message);
        }
    },
    changeIoCodeStatus: async function (ioDataId) {
        try {
            return await Evolve.SqlPool.request()
                .query("UPDATE EvolveIO SET EvolveIO_Status = 1 , EvolveIO_Error_Responce = '' , EvolveIO_Error_Responce_Code ='' , EvolveIO_Re_Queue = 0 WHERE EvolveIO_ID =" + ioDataId);
        } catch (error) {
            Evolve.Log.error(" EERR1239: Error while change Io Code Status "+error.message);
            return new Error(" EERR1239: Error while change Io Code Status "+error.message);
        }
    },




}