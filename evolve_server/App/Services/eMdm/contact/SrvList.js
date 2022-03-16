'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getContactListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveContact_ID) as count FROM EvolveContact WHERE EvolveContact_Name LIKE @search OR EvolveContact_Gender LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Contact List Count"+error.message);
            return new Error(" EERR####: Error while get Contact List Count"+error.message);
        }
    },

    getContactList: async function (start, length ,search) {
        try {
            console.log("start :::::::", start);
            console.log("length :::::::", length);
            console.log("search :::::::", search);
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("  SELECT ec.* , ea.EvolveAddress_Code , el.EvolveLanguage_Code FROM EvolveContact ec , EvolveAddress ea , EvolveLanguage el   WHERE ea.EvolveAddress_ID = ec.EvolveAddress_ID AND el.EvolveLanguage_ID = ec.EvolveLanguage_ID AND EvolveContact_Name LIKE @search OR EvolveContact_Gender LIKE @search ORDER BY EvolveContact_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Contact list"+error.message);
            return new Error(" EERR####: Error while get Contact list"+error.message);
        }
    },
   
}