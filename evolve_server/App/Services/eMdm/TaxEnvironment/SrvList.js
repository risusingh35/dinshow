'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getTaxEnvListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveTaxEnvironment_ID) as count FROM EvolveTaxEnvironment WHERE EvolveTaxEnvironment_Code LIKE @search OR EvolveTaxEnvironment_Name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Tax Environment List "+error.message);
            return new Error(" EERR####: Error while get Tax Environment List "+error.message);
        }
    },

    getTaxEnvList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                // .query("SELECT * FROM EvolveTaxEnvironment")
                .query("SELECT EvolveTaxEnvironment_ID, EvolveTaxEnvironment_Code , EvolveTaxEnvironment_Name  , EvolveTaxEnvironment_ISOutCtry FROM    EvolveTaxEnvironment WHERE EvolveTaxEnvironment_Code LIKE @search OR EvolveTaxEnvironment_Name LIKE @search  ORDER BY EvolveTaxEnvironment_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get Tax Environment list"+error.message);
            return new Error(" EERR####: Error while get Tax Environment list"+error.message);
        }
    },
   
}