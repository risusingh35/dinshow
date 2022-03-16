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

    getGspList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT EvolveGSP_ID, EvolveGSP_Code, EvolveGSP_Name  FROM EvolveGSP");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Gsp List Count " + error.message);
            return new Error(" EERR1229: Error while getting Gsp List Count " + error.message);
        }
    },

    getGSPApiListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT count(ega.EvolveGSPApi_ID) AS count FROM EvolveGSPApi ega, EvolveGSP eg, EvolveDocument ed WHERE ega.EvolveGSP_ID = eg.EvolveGSP_ID AND ed.EvolveDocument_ID = ega.EvolveDocument_ID AND (ega.EvolveGSPApi_Code LIKE @search OR eg.EvolveGSP_Code LIKE @search OR  ed.EvolveDocument_Name LIKE @search ) ");
        } catch (error) {
            Evolve.Log.error(" EERR1229: Error while getting Gsp Api List Count " + error.message);
            return new Error(" EERR1229: Error while getting Gsp Api List Count " + error.message);
        }
    },
    getGSPApiList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT ega.*, eg.EvolveGSP_Code, eg.EvolveGSP_Name, ed.EvolveDocument_Name FROM EvolveGSPApi ega, EvolveGSP eg, EvolveDocument ed WHERE ega.EvolveGSP_ID = eg.EvolveGSP_ID AND ed.EvolveDocument_ID = ega.EvolveDocument_ID AND (ega.EvolveGSPApi_Code LIKE @search OR eg.EvolveGSP_Code LIKE @search OR  ed.EvolveDocument_Name LIKE @search) ORDER BY EvolveGSPApi_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");
        } catch (error) {
            Evolve.Log.error(" EERR1230: Error while getting Gsp Api List " + error.message);
            return new Error(" EERR1230: Error while getting Gsp Api List " + error.message);
        }
    },
    addGspApi: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveGSPApi_Code', Evolve.Sql.NVarChar, data.EvolveGSPApi_Code)
                .input('EvolveGSPApi_URL', Evolve.Sql.NVarChar, data.EvolveGSPApi_URL)
                .input('EvolveGSPApi_Method', Evolve.Sql.NVarChar, data.EvolveGSPApi_Method)
                .input('EvolveGSPApi_Type', Evolve.Sql.NVarChar, data.EvolveGSPApi_Type)
                .input('EvolveGSPApi_Status', Evolve.Sql.Bit, data.EvolveGSPApi_Status)

                .input('EvolveGSPApi_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApi_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveGSPApi_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApi_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('INSERT INTO EvolveGSPApi (EvolveGSP_ID , EvolveGSPApi_Code ,EvolveGSPApi_URL , EvolveGSPApi_Method,EvolveGSPApi_Type, EvolveGSPApi_Status, EvolveGSPApi_CreatedAt, EvolveGSPApi_CreatedUser, EvolveGSPApi_UpdatedAt, EvolveGSPApi_UpdatedUser, EvolveDocument_ID) VALUES(@EvolveGSP_ID , @EvolveGSPApi_Code, @EvolveGSPApi_URL ,@EvolveGSPApi_Method,@EvolveGSPApi_Type, @EvolveGSPApi_Status, @EvolveGSPApi_CreatedAt, @EvolveGSPApi_CreatedUser, @EvolveGSPApi_UpdatedAt, @EvolveGSPApi_UpdatedUser, @EvolveDocument_ID)')
        } catch (error) {
            Evolve.Log.error(" EERR1228: Error while adding GSP Api " + error.message);
            return new Error(" EERR1228: Error while adding GSP Api" + error.message);
        }
    },

    getSingleGSPApiData: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .query("SELECT * FROM EvolveGSPApi WHERE EvolveGSPApi_ID = @EvolveGSPApi_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while getting Single Gsp Api" + error.message);
            return new Error(" EERR1231: Error while getting Single Gsp Api" + error.message);
        }
    },


    updateGspApi: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .input('EvolveGSP_ID', Evolve.Sql.Int, data.EvolveGSP_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveGSPApi_Code', Evolve.Sql.NVarChar, data.EvolveGSPApi_Code)
                .input('EvolveGSPApi_URL', Evolve.Sql.NVarChar, data.EvolveGSPApi_URL)
                .input('EvolveGSPApi_Method', Evolve.Sql.NVarChar, data.EvolveGSPApi_Method)
                .input('EvolveGSPApi_Type', Evolve.Sql.NVarChar, data.EvolveGSPApi_Type)
                .input('EvolveGSPApi_Status', Evolve.Sql.Bit, data.EvolveGSPApi_Status)

                .input('EvolveGSPApi_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveGSPApi_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query('UPDATE EvolveGSPApi SET EvolveGSP_ID = @EvolveGSP_ID , EvolveGSPApi_Code = @EvolveGSPApi_Code, EvolveGSPApi_URL = @EvolveGSPApi_URL, EvolveGSPApi_Method = @EvolveGSPApi_Method, EvolveGSPApi_Type = @EvolveGSPApi_Type, EvolveGSPApi_Status = @EvolveGSPApi_Status, EvolveGSPApi_UpdatedAt = @EvolveGSPApi_UpdatedAt, EvolveGSPApi_UpdatedUser = @EvolveGSPApi_UpdatedUser, EvolveDocument_ID = @EvolveDocument_ID WHERE EvolveGSPApi_ID = @EvolveGSPApi_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1232: Error while updating Gsp Api" + error.message);
            return new Error(" EERR1232: Error while updating Gsp Api" + error.message);
        }
    },

    checkAttributesCode: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveGSPApi_ID', Evolve.Sql.Int, data.EvolveGSPApi_ID)
                .query("SELECT EGA.EvolveGSPApiAttributes_ID AS eGID,EGA.EvolveGSPApiAttributes_Datatype AS eGDT,  EGA.EvolveGSPApiAttributes_Default AS eGDV, EGA.EvolveGSPApiAttributes_Parent AS eGP,EGA.EvolveGSPApiAttributes_Code AS eCD,EvolveGSPApiAttributes_Group AS eGRP FROM EvolveGSPApiAttributes EGA WHERE  EGA.EvolveGSPApi_ID =@EvolveGSPApi_ID");
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while check attributes code" + error.message);
            return new Error(" EERR1231: Error while check attributes code" + error.message);
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