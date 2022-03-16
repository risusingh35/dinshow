'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getQCTabelData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("rafNumOrLotNum", Evolve.Sql.NVarChar, data.rafNumOrLotNum)
                .query("SELECT einv.EvolveInventory_ID, ei.EvolveItem_Code, el.EvolveLocation_Code, einv.EvolveInventory_QtyOnHand, einv.EvolveInventory_QtyAllocated, einv.EvolveInventory_RefNumber, einv.EvolveInventory_LotNumber FROM EvolveInventory einv, EvolveItem ei, EvolveLocation el WHERE (einv.EvolveInventory_RefNumber = @rafNumOrLotNum OR einv.EvolveInventory_LotNumber = @rafNumOrLotNum) AND einv.EvolveInventory_Status = 'QCHold' AND einv.EvolveItem_ID = ei.EvolveItem_ID AND el.EvolveLocation_ID = einv.EvolveLocation_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1948: Error while getting QC Tabel Data "+error.message);
            return new Error(" EERR1948: Error while getting QC Tabel Data "+error.message);
        }
    },
    getQCBarcodeData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("rafNumOrLotNum", Evolve.Sql.NVarChar, data.rafNumOrLotNum)
                .query("SELECT ei.EvolveItem_ID, einv.EvolveInventory_RefNumber, eqcv.* FROM EvolveInventory einv, EvolveItem ei, EvolveQCTemp eqct, EvolveQCVal eqcv WHERE einv.EvolveInventory_RefNumber = @rafNumOrLotNum AND einv.EvolveInventory_Status = 'QCHold' AND einv.EvolveItem_ID = ei.EvolveItem_ID AND ei.EvolveQCTemp_ID = eqct.EvolveQCTemp_ID AND ei.EvolveQCTemp_ID = eqcv.EvolveQCTemp_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1949: Error while getting QC Barcode Data "+error.message);
            return new Error(" EERR1949: Error while getting QC Barcode Data "+error.message);
        }
    },
    QcProcessOky: async function (data) {
        console.log("OkyData--", data)
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                // .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.history_status)
                .query("UPDATE EvolveInventory SET EvolveInventory_Status = 'Active' WHERE EvolveInventory_RefNumber = @EvolveInventory_RefNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1950: Error while Qc Process Oky "+error.message);
            return new Error(" EERR1950: Error while Qc Process Oky "+error.message);
        }
    },
    getAllLocationList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveLocation_ID, EvolveLocation_Name FROM EvolveLocation");
        } catch (error) {
            Evolve.Log.error(" EERR1951: Error while getting All Location List "+error.message);
            return new Error(" EERR1951: Error while getting All Location List "+error.message);
        }
    },
    QcProcessReject: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input("EvolveUser_ID", Evolve.Sql.Int, data.EvolveUser_ID)
                .input("EvolveInventory_RefNumber", Evolve.Sql.NVarChar, data.EvolveInventory_RefNumber)
                .input("EvolveInventory_Status", Evolve.Sql.NVarChar, data.history_status)
                .query("UPDATE EvolveInventory SET EvolveInventory_Status = 'Rejected' WHERE EvolveInventory_RefNumber = @EvolveInventory_RefNumber");
        } catch (error) {
            Evolve.Log.error(" EERR1952: Error in Qc Process Reject "+error.message);
            return new Error(" EERR1952: Error in Qc Process Reject "+error.message);
        }
    },
}
