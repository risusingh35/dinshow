'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getAllRackListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(einv.EvolveInventory_ID) as count  FROM EvolveInventory einv, EvolveItem eitm, EvolveLocation el WHERE einv.EvolveItem_ID = eitm.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND EvolveInventory_IsTaskCompleted = 0 AND einv.EvolveInventory_RefNumber LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Rack List Count "+error.message);
            return new Error(" EERR####: Error while getting Rack List Count "+error.message);
        }
    },

    getAllTaskList : async function (start, length ,search) {
        try {
            
            return await Evolve.SqlPool.request()
            .input('start', Evolve.Sql.Int, start)
            .input('length', Evolve.Sql.Int, length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(" SELECT einv.*, eitm.EvolveItem_Desc, el.EvolveLocation_Code FROM EvolveInventory einv, EvolveItem eitm, EvolveLocation el WHERE einv.EvolveItem_ID = eitm.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID AND EvolveInventory_IsTaskCompleted = 0 AND einv.EvolveInventory_RefNumber LIKE @search ORDER BY einv.EvolveInventory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ");
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error in get task list "+error.message);
            return new Error(" EERR####: Error in get task list "+error.message);
        }
    },


}