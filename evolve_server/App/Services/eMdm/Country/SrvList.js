'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCountryListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveCountry_ID) as count FROM EvolveCountry WHERE EvolveCountry_Code LIKE @search OR EvolveCountry_Description LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country List "+error.message);
            return new Error(" EERR####: Error while get Country List "+error.message);
        }
    },

    getCountryList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveCountry WHERE EvolveCountry_Code LIKE @search OR EvolveCountry_Description LIKE @search ORDER BY EvolveCountry_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country list"+error.message);
            return new Error(" EERR####: Error while get Country list"+error.message);
        }
    },
   
}