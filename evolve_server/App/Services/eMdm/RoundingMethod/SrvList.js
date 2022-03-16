'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getRoundingMethodListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveRoundingMethod_ID) as count FROM EvolveRoundingMethod WHERE EvolveRoundingMethod_Code LIKE @search OR EvolveRoundingMethod_Description LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country List "+error.message);
            return new Error(" EERR####: Error while get Country List "+error.message);
        }
    },

    getRoundingMethodList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveRoundingMethod WHERE EvolveRoundingMethod_Code LIKE @search OR EvolveRoundingMethod_Description LIKE @search ORDER BY EvolveRoundingMethod_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country list"+error.message);
            return new Error(" EERR####: Error while get Country list"+error.message);
        }
    },
   
}