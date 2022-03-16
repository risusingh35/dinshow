'use strict';

const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    async getTaxClassListCount (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveTaxClass_ID) AS count FROM EvolveTaxClass WHERE  EvolveTaxClass_Code LIKE @search");
        }
        catch (err) {
            console.log(err);
            Evolve.Log.error("Error while get tax class list "+error.message);
            return new Error("Error while get tax class list "+error.message);
        }
    },

    
};