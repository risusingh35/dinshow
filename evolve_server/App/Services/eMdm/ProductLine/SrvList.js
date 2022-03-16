'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProductLineListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveProductLine_ID) as count FROM EvolveProductLine WHERE EvolveProductLine_Line LIKE @search OR EvolveProductLine_Line LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProductLine List "+error.message);
            return new Error(" EERR####: Error while get ProductLine List "+error.message);
        }
    },

    getProductLineList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                
                .query("SELECT * FROM EvolveProductLine WHERE EvolveProductLine_Line LIKE @search OR EvolveProductLine_Line LIKE @search ORDER BY EvolveProductLine_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProductLine list"+error.message);
            return new Error(" EERR####: Error while get ProductLine list"+error.message);
        }
    },
   
}