'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getComponentRejectionList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveCompScrap WHERE EvolveCompScrap_Status = 'Rejected'");
        } catch (error) {
            Evolve.Log.error(" EERR1617: Error while getting Component Rejection List "+error.message);
            return new Error(" EERR1617: Error while getting Component Rejection List "+error.message);
        }
    },

    addScrapItem: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveCompScrap_ID", Evolve.Sql.Int, data.EvolveCompScrap_ID)
                .input("EvolveCompScrap_SupCode", Evolve.Sql.NVarChar, data.EvolveCompScrap_SupCode)
                .input("EvolveCompScrap_ScrapQty", Evolve.Sql.NVarChar, data.EvolveCompScrap_ScrapQty)
                .input("EvolveCompScrap_Remark", Evolve.Sql.NVarChar, data.EvolveCompScrap_Remark)
                .input("EvolveCompScrap_Defect", Evolve.Sql.NVarChar, data.EvolveCompScrap_Defect)
                .input("EvolveCompScrap_Type", Evolve.Sql.NVarChar, data.EvolveCompScrap_Type)
                .query("UPDATE EvolveCompScrap SET EvolveCompScrap_SupCode = @EvolveCompScrap_SupCode, EvolveCompScrap_ScrapQty = @EvolveCompScrap_ScrapQty, EvolveCompScrap_Remark = @EvolveCompScrap_Remark, EvolveCompScrap_Type = @EvolveCompScrap_Type, EvolveCompScrap_Defect = @EvolveCompScrap_Defect, EvolveCompScrap_Status = 'Scrapped' WHERE EvolveCompScrap_ID = @EvolveCompScrap_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1618: Error while adding Scrap Item "+error.message);
            return new Error(" EERR1618: Error while adding Scrap Item "+error.message);
        }
    },

}