'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveDocument_ID, EvolveDocument_Name  FROM EvolveDocument");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting document List Count " + error.message);
            return new Error(" EERR1229: Error while getting document List Count " + error.message);
        }
    },

    getErpList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveERP_ID, EvolveERP_Name, EvolveERP_Code  FROM EvolveERP");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Erp List " + error.message);
            return new Error(" EERR1229: Error while getting Erp List " + error.message);
        }
    },

    getERPApiListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT count(ea.EvolveERPApi_ID) AS count FROM EvolveERPApi ea, EvolveERP erp, EvolveDocument ed WHERE ed.EvolveDocument_ID = ea.EvolveDocument_ID AND erp.EvolveERP_ID = ea.EvolveERP_ID AND (ea.EvolveERPApi_Code LIKE @search OR erp.EvolveERP_Code LIKE @search OR ed.EvolveDocument_Name LIKE @search)");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Erp Api List Count " + error.message);
            return new Error(" EERR1229: Error while getting Erp Api List Count " + error.message);
        }
    },
    getERPApiList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT ea.*, erp.EvolveERP_Name, erp.EvolveERP_Code, ed.EvolveDocument_Name FROM EvolveERPApi ea, EvolveERP erp, EvolveDocument ed WHERE erp.EvolveERP_ID = ea.EvolveERP_ID AND ed.EvolveDocument_ID = ea.EvolveDocument_ID AND (ea.EvolveERPApi_Code LIKE @search OR erp.EvolveERP_Code LIKE @search OR ed.EvolveDocument_Name LIKE @search) ORDER BY EvolveERPApi_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting Erp Api List " + error.message);
            return new Error(" EERR1230: Error while getting Erp Api List " + error.message);
        }
    },
    addErpApi: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERP_ID', Evolve.Sql.Int, data.EvolveERP_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveERPApi_Code', Evolve.Sql.NVarChar, data.EvolveERPApi_Code)
                .input('EvolveERPApi_URL', Evolve.Sql.NVarChar, data.EvolveERPApi_URL)
                .input('EvolveERPApi_Method', Evolve.Sql.NVarChar, data.EvolveERPApi_Method)
                .input('EvolveERPApi_Type', Evolve.Sql.NVarChar, data.EvolveERPApi_Type)
                .input('EvolveERPApi_Status', Evolve.Sql.Bit, data.EvolveERPApi_Status)

                .input('EvolveERPApi_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApi_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveERPApi_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApi_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveERPApi (EvolveERP_ID , EvolveERPApi_Code ,EvolveERPApi_URL , EvolveERPApi_Method,EvolveERPApi_Type, EvolveERPApi_Status, EvolveERPApi_CreatedAt, EvolveERPApi_CreatedUser, EvolveERPApi_UpdatedAt, EvolveERPApi_UpdatedUser, EvolveDocument_ID) VALUES(@EvolveERP_ID , @EvolveERPApi_Code, @EvolveERPApi_URL ,@EvolveERPApi_Method,@EvolveERPApi_Type, @EvolveERPApi_Status, @EvolveERPApi_CreatedAt, @EvolveERPApi_CreatedUser, @EvolveERPApi_UpdatedAt, @EvolveERPApi_UpdatedUser, @EvolveDocument_ID)')
        } catch (error) {
            Evolve.Log.error(" EERR1228: Error while adding Erp Api " + error.message);
            return new Error(" EERR1228: Error while adding Erp Api " + error.message);
        }
    },

    getSingleERPApiData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .query("SELECT * FROM EvolveERPApi WHERE EvolveERPApi_ID = @EvolveERPApi_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single Erp Api " + error.message);
            return new Error(" EERR1231: Error while getting Single Erp Api " + error.message);
        }
    },


    updateErpApi: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .input('EvolveERP_ID', Evolve.Sql.Int, data.EvolveERP_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveERPApi_Code', Evolve.Sql.NVarChar, data.EvolveERPApi_Code)
                .input('EvolveERPApi_URL', Evolve.Sql.NVarChar, data.EvolveERPApi_URL)
                .input('EvolveERPApi_Method', Evolve.Sql.NVarChar, data.EvolveERPApi_Method)
                .input('EvolveERPApi_Type', Evolve.Sql.NVarChar, data.EvolveERPApi_Type)
                .input('EvolveERPApi_Status', Evolve.Sql.Bit, data.EvolveERPApi_Status)

                .input('EvolveERPApi_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveERPApi_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('UPDATE EvolveERPApi SET EvolveERP_ID = @EvolveERP_ID , EvolveERPApi_Code = @EvolveERPApi_Code, EvolveERPApi_URL = @EvolveERPApi_URL, EvolveERPApi_Method = @EvolveERPApi_Method, EvolveERPApi_Type = @EvolveERPApi_Type, EvolveERPApi_Status = @EvolveERPApi_Status, EvolveERPApi_UpdatedAt = @EvolveERPApi_UpdatedAt, EvolveERPApi_UpdatedUser = @EvolveERPApi_UpdatedUser, EvolveDocument_ID = @EvolveDocument_ID WHERE EvolveERPApi_ID = @EvolveERPApi_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1232: Error while updating Erp Api " + error.message);
            return new Error(" EERR1232: Error while updating Erp Api " + error.message);
        }
    },

    checkAttributesCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveERPApi_ID', Evolve.Sql.Int, data.EvolveERPApi_ID)
                .query("SELECT EEA.EvolveERPApiAttributes_ID AS eGID,EEA.EvolveERPApiAttributes_Datatype AS eGDT,  EEA.EvolveERPApiAttributes_Default AS eGDV, EEA.EvolveERPApiAttributes_Parent AS eGP,EEA.EvolveERPApiAttributes_Code AS eCD,EvolveERPApiAttributes_Group AS eGRP FROM EvolveERPApiAttributes EEA WHERE  EEA.EvolveERPApi_ID =@EvolveERPApi_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Check Erp Attribute code" + error.message);
            return new Error(" EERR1231: Error while getting Check Erp Attribute code" + error.message);
        }
    },


    getEInvoiceApiAttrValue: async function (MatchId, EvolveGSPApiAttributes_ID) {
        try {
            console.log("EvolveGSPApiAttributes_ID", EvolveGSPApiAttributes_ID);
            let mappingData = await Evolve.SqlPool.request()
                .input('EvolveGSPApiAttributes_ID', Evolve.Sql.Int, EvolveGSPApiAttributes_ID)
                .query("SELECT EvolveGSPApiAttrMapping_Table,EvolveGSPApiAttrMapping_Feild,EvolveGSPApiAttrMapping_MatchFeild FROM EvolveGSPApiAttrMapping WHERE EvolveGSPApiAttributes_ID = @EvolveGSPApiAttributes_ID AND EvolveGSPApiAttrMapping_Status = 1");
            if (mappingData.rowsAffected > 0) {
                // lets Make Query 
                let query = "SELECT " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Feild + " AS value FROM " + mappingData.recordset[0].EvolveGSPApiAttrMapping_Table + " WHERE " + mappingData.recordset[0].EvolveGSPApiAttrMapping_MatchFeild + " = " + MatchId;

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