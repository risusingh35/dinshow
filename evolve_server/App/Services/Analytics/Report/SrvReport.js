'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getReportData: async function (EvolveMenu_Url) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveMenu_Url", Evolve.Sql.NVarChar, EvolveMenu_Url)
                .query("SELECT * FROM EvolveMenu WHERE EvolveMenu_Url = @EvolveMenu_Url AND EvolveMenu_IsReportPage = 1");
        } catch (error) {
            Evolve.Log.error(" EERR1031: Error while getting Report Data "+error.message);
            return new Error(" EERR1031: Error while getting Report Data "+error.message);
        }
    },

}