'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

	getAllActiveGsp: async function () {
		return await Evolve.SqlPool.request()
			.query("SELECT * FROM EvolveGSP WHERE EvolveGSP_Status = 'Active' ");
	},
	getEInvoiceGSPApi: async function (EvolveGSP_ID, EvolveGSPApi_Code) {
		try {
			return await Evolve.SqlPool.request()
				.input('EvolveGSP_ID', Evolve.Sql.Int, EvolveGSP_ID)
				.input('EvolveGSPApi_Code', Evolve.Sql.NVarChar, EvolveGSPApi_Code)
				.query("SELECT * FROM EvolveGSPApi WHERE EvolveGSP_ID = @EvolveGSP_ID AND EvolveGSPApi_Code = @EvolveGSPApi_Code");

		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
    getEInvoiceGSPApiData: async function (EvolveGSPApi_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_Code', Evolve.Sql.NVarChar, EvolveGSPApi_Code)
                .query("SELECT  EGA.EvolveGSPApiAttributes_Datatype AS eGDT,EGA.EvolveGSPApiAttributes_ID AS eGID,EGA.EvolveGSPApiAttributes_Default AS eGDV, EGA.EvolveGSPApiAttributes_Parent AS eGP,EGA.EvolveGSPApiAttributes_Code AS eCD,EA.EvolveGSPApi_URL,EA.EvolveGSPApi_Method,EGA.EvolveGSPApiAttributes_Group AS eGRP ,EGA.EvolveGSPApiAttributes_IsDefault AS eGD FROM EvolveGSPApi EA,EvolveGSPApiAttributes EGA WHERE EA.EvolveGSPApi_Code = @EvolveGSPApi_Code AND EGA.EvolveGSPApi_ID = EA.EvolveGSPApi_ID");

        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    getEInvoiceHeaderValueFromUnit: async function (EvolveUnit_ID, Feild_Key) {
		try {
			let unitData = await Evolve.SqlPool.request()
				.input('EvolveUnit_ID', Evolve.Sql.Int, EvolveUnit_ID)
				.query("SELECT * FROM EvolveUnit WHERE EvolveUnit_ID = @EvolveUnit_ID");
			if (unitData.rowsAffected > 0) {
				if (Feild_Key == 'EvolveUnit_Gstin') {
					return unitData.recordset[0].EvolveUnit_Gstin;
				}
				if (Feild_Key == 'EvolveUnit_GstnUser') {
					return unitData.recordset[0].EvolveUnit_GstnUser;
				}
				if (Feild_Key == 'EvolveUnit_GstnPassEnc') {
					return unitData.recordset[0].EvolveUnit_GstnPassEnc;
				}
				if (Feild_Key == 'EvolveUnit_Rek') {
					return unitData.recordset[0].EvolveUnit_Rek;
				}
			} else {
				return "";
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return "";
		}
	},

    getEInvoiceApiAttrValue: async function (EvolveEinvoice_ID, EvolveGSPApiAttributes_ID, EvolveEinvoiceLine_ID) {
		try {
			// console.log("EvolveGSPApiAttributes_ID", EvolveGSPApiAttributes_ID);
			let mappingData = await Evolve.SqlPool.request()
				.input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, EvolveGSPApiAttributes_ID)
				.query("SELECT EvolveGSPApiAttrMapping_Table,EvolveGSPApiAttrMapping_Feild,EvolveGSPApiAttrMapping_MatchFeild FROM EvolveGSPApiAttrMapping WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID AND EvolveGSPApiAttrMapping_Status = 1");
			if (mappingData.rowsAffected > 0) {
				// lets Make Query 
				let query = "";
				if (mappingData.recordset[0].EvolveGSPApiAttrMapping_Table == 'EvolveEinvoiceItemList') {
					query = "SELECT " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Feild + " AS value FROM " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Table + " WHERE " + mappingData.recordset[0].EvolveGSPApiAttrMapping_MatchFeild + " = " + EvolveEinvoiceLine_ID + " AND EvolveEinvoice_ID = " + EvolveEinvoice_ID;
				} else {
					query = "SELECT " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Feild + " AS value FROM " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Table + " WHERE " + mappingData.recordset[0].EvolveGSPApiAttrMapping_MatchFeild + " = " + EvolveEinvoice_ID;
				}

				//console.log("query ,", query);
				let valueOfFeild = await Evolve.SqlPool.request().query(query);

				if (valueOfFeild.rowsAffected > 0) {
					if (valueOfFeild.recordset[0].value == null) {
						return "";
					} else {
						return valueOfFeild.recordset[0].value;
					}

				} else {
					return new Error("set Default Value");
				}
			} else {
				return new Error("No Record Found!");
			}
		} catch (error) {
			Evolve.Log.error(error.message);
			return new Error(error.message);
		}
	},
}    
