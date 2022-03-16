'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocumentType: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentType_Name', Evolve.Sql.NVarChar, data.EvolveDocumentType_Name)
                .input('EvolveDocumentType_Code', Evolve.Sql.NVarChar, data.EvolveDocumentType_Code)
                .input('EvolveDocument_Group', Evolve.Sql.NVarChar, data.EvolveDocument_Group)
                .input('EvolveDocumentType_Status', Evolve.Sql.Bit, data.EvolveDocumentType_Status)

                .input('EvolveDocumentType_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentType_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentType_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocumentType (EvolveDocumentType_Name, EvolveDocumentType_Code, EvolveDocument_Group, EvolveDocumentType_Status, EvolveDocumentType_CreatedAt, EvolveDocumentType_CreatedUser, EvolveDocumentType_UpdatedAt, EvolveDocumentType_UpdatedUser)VALUES(@EvolveDocumentType_Name, @EvolveDocumentType_Code, @EvolveDocument_Group, @EvolveDocumentType_Status, @EvolveDocumentType_CreatedAt, @EvolveDocumentType_CreatedUser, @EvolveDocumentType_UpdatedAt, @EvolveDocumentType_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1218: Error while adding document Type"+error.message);
            return new Error(" EERR1218: Error while adding document Type "+error.message);
        }
    },


    getDocumentTypeListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(EvolveDocumentType_ID) AS count FROM EvolveDocumentType WHERE EvolveDocumentType_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document Type List Count "+error.message);
            return new Error(" EERR1219: Error while getting Document Type List Count "+error.message);
        }
    },

    getDocumentTypeList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT * FROM EvolveDocumentType WHERE EvolveDocumentType_Name LIKE @search ORDER BY EvolveDocumentType_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1220: Error while getting document Type list "+error.message);
            return new Error(" EERR1220: Error while getting document Type list "+error.message);
        }
    },

  
    getSingleDocumentType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .query("SELECT * FROM EvolveDocumentType WHERE EvolveDocumentType_ID = @EvolveDocumentType_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1226: Error while getting Single Document Type "+error.message);
            return new Error(" EERR1226: Error while getting Single Document Type "+error.message);
        }
    },
    updateDocumentTypeData: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .input('EvolveDocumentType_Name', Evolve.Sql.NVarChar, data.EvolveDocumentType_Name)
                .input('EvolveDocumentType_Code', Evolve.Sql.NVarChar, data.EvolveDocumentType_Code)
                .input('EvolveDocument_Group', Evolve.Sql.NVarChar, data.EvolveDocument_Group)
                .input('EvolveDocumentType_Status', Evolve.Sql.Bit, data.EvolveDocumentType_Status)
                
                .input('EvolveDocumentType_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveDocumentType SET EvolveDocumentType_Name = @EvolveDocumentType_Name, EvolveDocumentType_Code = @EvolveDocumentType_Code, EvolveDocument_Group = @EvolveDocument_Group, EvolveDocumentType_Status = @EvolveDocumentType_Status, EvolveDocumentType_UpdatedAt = @EvolveDocumentType_UpdatedAt, EvolveDocumentType_UpdatedUser = @EvolveDocumentType_UpdatedUser WHERE EvolveDocumentType_ID = @EvolveDocumentType_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while updating Document Type "+error.message);
            return new Error(" EERR1227: Error while updating Document Type "+error.message);
        }
    },



}