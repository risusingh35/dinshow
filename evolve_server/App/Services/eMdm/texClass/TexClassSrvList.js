'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getTexClassListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveTaxClass_ID) as count FROM EvolveTaxClass WHERE EvolveTaxClass_Class LIKE @search OR EvolveTaxClass_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get TaxClass List "+error.message);
            return new Error(" EERR####: Error while get TaxClass List "+error.message);
        }
    },

    getTexClassList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                // .query("SELECT EvolveTaxClass_ID , EvolveTaxClass_Description FROM EvolveTaxClass")
                .query("SELECT EvolveTaxClass_ID , EvolveTaxClass_Class, EvolveTaxClass_Name FROM EvolveTaxClass WHERE EvolveTaxClass_Class LIKE @search OR EvolveTaxClass_Name LIKE @search ORDER BY EvolveTaxClass_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        
            } catch (error) {                

            Evolve.Log.error(" EERR####: Error while get TaxClass list"+error.message);
            return new Error(" EERR####: Error while get TaxClass list"+error.message);
        }
    },
   
}