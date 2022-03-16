'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDepartmentListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("select COUNT (ed.EvolveDepartment_ID) as count from EvolveDepartment ed LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = ed.EvolveUnit_ID where (ed.EvolveDepartment_Code LIKE @search or ed.EvolveDepartment_Name LIKE @search or ed.EvolveDepartment_Desc LIKE @search or  eu.EvolveUnit_Code LIKE @search) ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Department List Count"+error.message);
            return new Error(" EERR####: Error while get Department List Count"+error.message);
        }
    },

    getDepartmentList: async function (start, length ,search) {
        try {
            console.log("start :::::::", start);
            console.log("length :::::::", length);
            console.log("search :::::::", search);
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("select ed.* , eu.EvolveUnit_Code from EvolveDepartment ed LEFT JOIN EvolveUnit eu on eu.EvolveUnit_ID = ed.EvolveUnit_ID where (ed.EvolveDepartment_Code LIKE @search or ed.EvolveDepartment_Name LIKE @search or ed.EvolveDepartment_Desc LIKE @search or  eu.EvolveUnit_Code LIKE @search) ORDER BY ed.EvolveDepartment_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Department list"+error.message);
            return new Error(" EERR####: Error while get Department list"+error.message);
        }
    },
   
}