'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProjectListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveProject_ID) as count FROM EvolveProject WHERE EvolveProject_Code LIKE @search OR EvolveProject_Description LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Project List Count "+error.message);
            return new Error(" EERR####: Error While Project List Count "+error.message);
        }
    },

    getProjectList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("  select ep.* , ec.EvolveCurrency_Code , eco.EvolveCompany_Code , eu.EvolveUnit_Code from EvolveProject ep left join EvolveUnit eu on eu.EvolveUnit_ID = ep.EvolveUnit_ID LEFT JOIN EvolveCurrency ec on ec.EvolveCurrency_ID = ep.EvolveCurrency_ID left join EvolveCompany eco on eco.EvolveCompany_ID = ep.EvolveCompany_ID WHERE EvolveProject_Code LIKE @search OR EvolveProject_Description LIKE @search ORDER BY EvolveProject_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Project List"+error.message);
            return new Error(" EERR####: Error While Project List"+error.message);
        }
    },
   
}