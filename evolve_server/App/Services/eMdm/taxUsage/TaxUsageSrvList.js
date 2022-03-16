'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getTaxUsageListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveTaxUsage_ID) as count FROM EvolveTaxUsage WHERE EvolveTaxUsage_Usage LIKE @search OR EvolveTaxUsage_Name LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get TaxUsage List "+error.message);
            return new Error(" EERR####: Error while get TaxUsage List "+error.message);
        }
    },

    getTaxUsageList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                // .query("SELECT * FROM EvolveTaxUsage")
                .query("SELECT EvolveTaxUsage_ID, EvolveTaxUsage_Usage , EvolveTaxUsage_Name  , EvolveTaxUsage_RevTax FROM EvolveTaxUsage WHERE EvolveTaxUsage_Usage LIKE @search OR EvolveTaxUsage_Name LIKE @search  ORDER BY EvolveTaxUsage_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get TaxUsage list"+error.message);
            return new Error(" EERR####: Error while get TaxUsage list"+error.message);
        }
    },
   
}