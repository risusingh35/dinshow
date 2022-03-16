'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGlobleVariableEInv: async function (EvolveEinvoiceConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveEinvoiceConfig_Key', Evolve.Sql.NVarChar, EvolveEinvoiceConfig_Key)
                .query("SELECT EvolveEinvoiceConfig_Value FROM EvolveEinvoiceConfig WHERE EvolveEinvoiceConfig_Key LIKE @EvolveEinvoiceConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting E Invoice globle variable " + error.message);
            return new Error("Error While getting E Invoice globle variable " + error.message);
        }
    },

    getGlobleVariableIo: async function (EvolveIOConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveIOConfig_Key', Evolve.Sql.NVarChar, EvolveIOConfig_Key)
                .query("SELECT EvolveIOConfig_Value FROM EvolveIOConfig WHERE EvolveIOConfig_Key LIKE @EvolveIOConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting IO globle variable " + error.message);
            return new Error("Error While getting IO globle variable " + error.message);
        }
    },
    getEInvoiceList: async function (EvolveUser_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_ID',Evolve.Sql.Int,EvolveUser_ID)
                .query("SELECT ei.*, ed.*,eu.EvolveUnit_Code, edt.EvolveDocumentType_Name, eg.EvolveGSP_Code FROM EvolveEinvoice ei, EvolveDocument ed, EvolveDocumentType edt, EvolveGSP eg, EvolveUnit eu , EvolveUserUnitLink eul WHERE ed.EvolveDocument_ID = ei.EvolveDocument_ID AND ed.EvolveDocumentType_ID = edt.EvolveDocumentType_ID AND eg.EvolveGSP_ID = ed.EvolveGSP_ID AND eu.EvolveUnit_ID = ei.EvolveUnit_ID AND eul.EvolveUnit_ID = eu.EvolveUnit_ID AND  eul.EvolveUser_ID = @EvolveUser_ID ORDER BY ei.EvolveEinvoice_ID DESC");
        } catch (error) {
            Evolve.Log.error(" EERR1063: Error while getting Single Gst " + error.message);
            return new Error(" EERR1063: Error while getting Single Gst " + error.message);
        }
    },



    

}