'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveItem_ID) as count FROM EvolveItem WHERE EvolveItem_Part LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Item List "+error.message);
            return new Error(" EERR####: Error while get Item List "+error.message);
        }
    },

    getItemList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')

                .query("  SELECT ei.EvolveItem_Part , ei.EvolveItem_Desc1 , ei.EvolveItem_Group , ei.EvolveItem_PartType , einv.EvolveInvStatus_Code , epi.EvolveProductLine_Name FROM EvolveItem ei LEFT JOIN EvolveProductLine epi ON  ei.EvolveProductLine_ID = epi.EvolveProductLine_ID LEFT JOIN EvolveInvStatus einv on ei.EvolveInvStatus_ID = einv.EvolveInvStatus_ID WHERE ei.EvolveItem_Part LIKE @search ORDER BY ei.EvolveItem_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Item list"+error.message);
            return new Error(" EERR####: Error while get Item list"+error.message);
        }
    },
   
}