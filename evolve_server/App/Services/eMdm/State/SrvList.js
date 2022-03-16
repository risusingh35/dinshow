'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveState_ID) as count FROM EvolveState WHERE EvolveState_Code LIKE @search OR EvolveState_Description LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country List "+error.message);
            return new Error(" EERR####: Error while get Country List "+error.message);
        }
    },

    getStateList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveState WHERE EvolveState_Code LIKE @search OR EvolveState_Description LIKE @search ORDER BY EvolveState_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Country list"+error.message);
            return new Error(" EERR####: Error while get Country list"+error.message);
        }
    },
   
}