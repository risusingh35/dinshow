'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getRejectionQcProcess: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT einv.EvolveInventory_ID, ei.EvolveItem_Code, el.EvolveLocation_Name,einv.EvolveInventory_RefNumber, einv.EvolveInventory_CreatedAt, einv.EvolveInventory_Status FROM EvolveInventory einv, EvolveItem ei, EvolveLocation el WHERE einv.EvolveInventory_Status = 'Rejected' AND einv.EvolveItem_ID = ei.EvolveItem_ID AND einv.EvolveLocation_ID = el.EvolveLocation_ID ");
        } catch (error) {
            Evolve.Log.error(" EERR1889: Error while getting Rejection Qc Process "+error.message);
            return new Error(" EERR1889: Error while getting Rejection Qc Process "+error.message);
        }
    },
    getReworkLocation: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveReworkSrNo_ID", Evolve.Sql.Int, data.EvolveReworkSrNo_ID)
                .query("SELECT * FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR1890: Error while getting Rework Location "+error.message);
            return new Error(" EERR1890: Error while getting Rework Location "+error.message);
        }
    },
    updateQcRework: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveLocation_ID", Evolve.Sql.Int, data.EvolveLocation_ID)
                .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                .input("Remarks", Evolve.Sql.NVarChar, data.Remarks)
                .query("UPDATE EvolveInventory SET EvolveLocation_ID = @EvolveLocation_ID, EvolveInventory_Status = 'Process' WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1891: Error while updating Qc Rework "+error.message);
            return new Error(" EERR1891: Error while updating Qc Rework "+error.message);
        }
    },
    updateQcScrap: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveInventory_ID", Evolve.Sql.Int, data.EvolveInventory_ID)
                .input("EvolveScrap_From", Evolve.Sql.NVarChar, data.EvolveScrap_From)
                .input("EvolveScrap_SupplierCode", Evolve.Sql.NVarChar, data.EvolveScrap_SupplierCode)
                .input("Remarks", Evolve.Sql.NVarChar, data.Remarks)
                .query("UPDATE EvolveInventory SET EvolveInventory_Status = 'Scrap' WHERE EvolveInventory_ID = @EvolveInventory_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1892: Error while updating Qc Scrap "+error.message);
            return new Error(" EERR1892: Error while updating Qc Scrap "+error.message);
        }
    },

}