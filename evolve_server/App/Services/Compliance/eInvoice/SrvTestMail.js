'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getMailConfigData: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveEinvoiceConfig");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting DS Token List " + error.message);
            return new Error(" EERR1063: Error while getting DS Token List " + error.message);
        }
    },

}