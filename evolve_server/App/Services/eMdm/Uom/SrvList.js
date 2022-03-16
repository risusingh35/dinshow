'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getUomListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveUom_ID) as count FROM EvolveUom WHERE EvolveUom_Group LIKE @search OR EvolveUom_Uom LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get uom List "+error.message);
            return new Error(" EERR####: Error while get uom List "+error.message);
        }
    },

    getUomList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT euom.*  ,  ebg.EvolveBusinessGroup_Domain FROM EvolveUom euom LEFT JOIN  EvolveBusinessGroup ebg ON  euom.EvolveBusinessGroup_ID = ebg.EvolveBusinessGroup_ID WHERE EvolveUom_Group LIKE @search OR EvolveUom_Uom LIKE @search ORDER BY EvolveUom_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get uom list"+error.message);
            return new Error(" EERR####: Error while get uom list"+error.message);
        }
    },
   
}