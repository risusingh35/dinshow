'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCurrencyCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveCurrency_ID) as count FROM EvolveCurrency WHERE EvolveCurrency_Code LIKE @search OR EvolveCurrency_Description LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency List "+error.message);
            return new Error(" EERR####: Error while get Currency List "+error.message);
        }
    },

    getCurrencyList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query(" SELECT ec.* , er.EvolveRoundingMethod_Code FROM EvolveCurrency  ec LEFT JOIN EvolveRoundingMethod er ON  ec.EvolveRoundingMethod_ID = er.EvolveRoundingMethod_ID WHERE EvolveCurrency_Code LIKE @search OR EvolveCurrency_Description LIKE @search ORDER BY EvolveCurrency_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list"+error.message);
            return new Error(" EERR####: Error while get Currency list"+error.message);
        }
    },
   
}