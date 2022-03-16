'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGateListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
            .query("SELECT COUNT(EvolveGate_ID) as count FROM EvolveGate EG WHERE (EG.EvolveGate_ModuleType = 'EWAYBILL' OR EG.EvolveGate_ModuleType = 'PO' OR  EG.EvolveGate_ModuleType = 'OTHER') AND EvolveGate_RefNumber LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Gate List "+error.message);
            return new Error(" EERR####: Error while get Gate List "+error.message);
        }
    }, 

   
    getGateList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT EG.* FROM EvolveGate AS EG WHERE (EG.EvolveGate_ModuleType = 'EWAYBILL' OR EG.EvolveGate_ModuleType = 'PO' OR  EG.EvolveGate_ModuleType = 'OTHER')  AND (EG.EvolveGate_RefNumber LIKE @search) ORDER BY EG.EvolveGate_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get Gate List"+error.message);
            return new Error(" EERR####: Error while get Gate List"+error.message);
        }
    },

    showGateDetailsData: async function (EvolveGateDetails_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGateDetails_ID', Evolve.Sql.Int, EvolveGateDetails_ID)
                .query("SELECT EGD.EvolveGateDetails_Qty,EGD.EvolveItem_Desc,EGD.EvolveGateDetails_IsMaterialUnloaded,EU.EvolveUom_Uom FROM EvolveGateDetails AS EGD JOIN EvolveUom AS EU ON EU.EvolveUom_ID = EGD.EvolveUom_ID AND EGD.EvolveGate_ID = @EvolveGateDetails_ID ")
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get Gate Details Data List"+error.message);
            return new Error(" EERR####: Error while get Gate Details Data List"+error.message);
        }
    },
}