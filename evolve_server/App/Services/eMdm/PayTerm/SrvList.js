'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPayTermListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolvePayTerms_ID) as count FROM EvolvePayTerms WHERE EvolvePayTerms_Code LIKE @search OR EvolvePayTerms_PaymentType LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get PayTerm List Count"+error.message);
            return new Error(" EERR####: Error while get PayTerm List Count"+error.message);
        }
    },

    getPayTermList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolvePayTerms WHERE EvolvePayTerms_Code LIKE @search OR EvolvePayTerms_PaymentType LIKE @search ORDER BY EvolvePayTerms_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get PayTerm list"+error.message);
            return new Error(" EERR####: Error while get PayTerm list"+error.message);
        }
    },
   
}