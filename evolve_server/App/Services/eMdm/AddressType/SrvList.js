'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAddressTypeListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveAddressType_ID) as count FROM EvolveAddressType WHERE EvolveAddressType_Code LIKE @search OR EvolveAddressType_Description LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Address Type List "+error.message);
            return new Error(" EERR####: Error while get Address Type List "+error.message);
        }
    },

    getAddressTypeList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveAddressType WHERE EvolveAddressType_Code LIKE @search OR EvolveAddressType_Description LIKE @search ORDER BY EvolveAddressType_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Address Type list"+error.message);
            return new Error(" EERR####: Error while get Address Type list"+error.message);
        }
    },
    
}