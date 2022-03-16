'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getKeyValueListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveKeyValue_ID) as count FROM EvolveKeyValue WHERE EvolveKeyValue_Key LIKE @search OR EvolveKeyValue_Value LIKE @search  OR EvolveKeyValue_Desc LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Key Value List "+error.message);
            return new Error(" EERR####: Error while get Key Value List "+error.message);
        }
    },

    getKeyValueList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT EvolveKeyValue_Key ,  EvolveKeyValue_Value , EvolveKeyValue_Desc ,  EvolveKeyValue_IsActive  FROM EvolveKeyValue WHERE EvolveKeyValue_Key LIKE @search OR EvolveKeyValue_Value LIKE @search OR EvolveKeyValue_Desc LIKE @search  ORDER BY EvolveKeyValue_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Key Value list"+error.message);
            return new Error(" EERR####: Error while get Key Value list"+error.message);
        }
    },
   
}