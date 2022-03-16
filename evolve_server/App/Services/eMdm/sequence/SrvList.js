'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSequenceListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveSequence_ID) as count FROM EvolveSequence WHERE EvolveSequence_Sequence LIKE @search OR EvolveSequence_Desc LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Sequence List Count"+error.message);
            return new Error(" EERR####: Error while get Sequence List Count"+error.message);
        }
    },

    getSequenceList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveSequence WHERE EvolveSequence_Sequence LIKE @search OR EvolveSequence_Desc LIKE @search ORDER BY EvolveSequence_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Sequence list"+error.message);
            return new Error(" EERR####: Error while get Sequence list"+error.message);
        }
    },
   
}