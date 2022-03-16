'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLicenceListCount: async function(search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(el.EvolveLicence_ID) as count FROM EvolveLicence el Where EvolveLicence_Number LIKE @search  ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getLicence List Count " + error.message);
            return new Error(" EERR####: Error while getLicence List Count " + error.message);
        }
    },

    getLicenceList: async function(start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT el.EvolveLicence_ID ,  el.EvolveLicence_Number ,  el.EvolveLicence_Desc , el.EvolveLicence_ValueInINR ,  el.EvolveLicence_ValueInForeign , el.EvolveLicence_RemaingValueInINR , el.EvolveLicence_RemaingValueInForeign , el.EvolveLicence_ExpiryDate   FROM EvolveLicence el  WHERE el.EvolveLicence_Number LIKE @search  ORDER BY el.EvolveLicence_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Licence list" + error.message);
            return new Error(" EERR####: Error while get Licence list" + error.message);
        }
    },

}