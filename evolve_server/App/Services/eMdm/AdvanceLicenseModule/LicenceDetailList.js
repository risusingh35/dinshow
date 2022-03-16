'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getlicencelNumber: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query("select EvolveLicence_Number , EvolveLicence_ID  from EvolveLicence")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licencel Number list " + error.message);
            return new Error(" EERR####: Error while get licencel Number list " + error.message);
        }
    },

    getlicenceDetailListCount: async function(search, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("select COUNT(eld.EvolveLicenceDetail_ID) as count from EvolveLicenceDetail eld , EvolveLicence el , EvolveLicenceItemGroup elig Where " + condition + "  el.EvolveLicence_ID = eld.EvolveLicence_ID AND eld.EvolveLicenceItemGroup_ID = elig.EvolveLicenceItemGroup_ID AND el.EvolveLicence_Number LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getLicence Detalis List Count " + error.message);
            return new Error(" EERR####: Error while getLicence Detalis List Count " + error.message);
        }
    },

    getlicenceDetailList: async function(start, length, search, condition) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("select  eld.EvolveLicenceDetail_ID , el.EvolveLicence_Number ,  eld.EvolveLicenceDetail_ValueInINR , eld.EvolveLicenceDetail_ValueInForeign , elig.EvolveLicenceItemGroup_Code  from EvolveLicenceDetail eld , EvolveLicence el , EvolveLicenceItemGroup elig Where " + condition + "  el.EvolveLicence_ID = eld.EvolveLicence_ID AND eld.EvolveLicenceItemGroup_ID = elig.EvolveLicenceItemGroup_ID AND el.EvolveLicence_Number LIKE @search  ORDER BY eld.EvolveLicenceDetail_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Licence Detalis list " + error.message);
            return new Error(" EERR####: Error while get Licence Detalis list " + error.message);
        }
    },

}