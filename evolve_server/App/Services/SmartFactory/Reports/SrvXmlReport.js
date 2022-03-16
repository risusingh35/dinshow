'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getXmlReportCountList: async function (data , search) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, "%"+search+"%")
             .query("SELECT  COUNT(EvolveInTransQueue_ID) as count FROM EvolveInTransQueue WHERE EvolveInTransQueue_TransType LIKE @search");
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getXmlReportDatatableList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, "%"+search+"%")
                .query("SELECT * , convert(varchar,EvolveInTransQueue_CreatedAt , 120) as EvolveInTransQueue_CreatedAt_Convert FROM EvolveInTransQueue WHERE EvolveInTransQueue_TransType LIKE @search  ORDER BY EvolveInTransQueue_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");


        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },




}