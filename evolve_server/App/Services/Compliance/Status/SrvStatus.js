'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getInvoiceList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveInvoice_Number', Evolve.Sql.NVarChar, data.EvolveInvoice_Number)
            .query("SELECT TOP(1) ei.*, ed.EvolveDocument_Name, ed.EvolveDocument_IsEmail_Process, ed.EvolveDocument_SignatureSetting, ed.EvolveDocument_SignatureSettingDetails, ed.EvolveDocument_DS_Setting, DATEDIFF(mi, ei.EvolveInvoice_CreatedAt, ei.EvolveInvoice_UpdatedAt) AS TimeDuartion, eu.EvolveUnit_Name, es.EvolveSupplier_Name FROM EvolveDocument ed, EvolveInvoice ei LEFT JOIN EvolveUnit eu ON eu.EvolveUnit_ID = ei.EvolveUnit_ID LEFT JOIN EvolveSupplier es ON ei.EvolveSupplier_ID = es.EvolveSupplier_ID WHERE ei.EvolveDocument_ID = ed.EvolveDocument_ID AND ei.EvolveInvoice_Number = @EvolveInvoice_Number ORDER BY EvolveInvoice_ID DESC");
        } catch (error) {
            Evolve.Log.error("EERR32451: Error while getting Invoice List " + error.message);
            return new Error("EERR32451: Error while getting Invoice List " + error.message);
        }
    },
    getEInvoiceList: async function (data) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveEinvoice_Number', Evolve.Sql.NVarChar, data.EvolveInvoice_Number)
                .query("SELECT TOP(1) ei.*, ed.*, edt.EvolveDocumentType_Name, eg.EvolveGSP_Code FROM EvolveEinvoice ei, EvolveDocument ed, EvolveDocumentType edt, EvolveGSP eg WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID AND ed.EvolveDocumentType_ID = edt.EvolveDocumentType_ID AND eg.EvolveGSP_ID = ed.EvolveGSP_ID AND ei.EvolveEinvoice_Number = @EvolveEinvoice_Number ORDER BY ei.EvolveEinvoice_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Einvoice List " + error.message);
            return new Error(" EERR1063: Error while getting Einvoice List " + error.message);
        }
    },
}