'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentTypeList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveDocumentType");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document Type List Count "+error.message);
            return new Error(" EERR1219: Error while getting Document Type List Count "+error.message);
        }
    },
    addDocumentSubType: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .input('EvolveDocumentSubType_Name', Evolve.Sql.NVarChar, data.EvolveDocumentSubType_Name)
                .input('EvolveDocumentSubType_Code', Evolve.Sql.NVarChar, data.EvolveDocumentSubType_Code)
                .input('EvolveDocumentSubType_Status', Evolve.Sql.Bit, data.EvolveDocumentSubType_Status)

                .input('EvolveDocumentSubType_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentSubType_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentSubType_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentSubType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocumentSubType (EvolveDocumentType_ID, EvolveDocumentSubType_Name, EvolveDocumentSubType_Code, EvolveDocumentSubType_Status, EvolveDocumentSubType_CreatedAt, EvolveDocumentSubType_CreatedUser, EvolveDocumentSubType_UpdatedAt, EvolveDocumentSubType_UpdatedUser)VALUES(@EvolveDocumentType_ID, @EvolveDocumentSubType_Name, @EvolveDocumentSubType_Code, @EvolveDocumentSubType_Status, @EvolveDocumentSubType_CreatedAt, @EvolveDocumentSubType_CreatedUser, @EvolveDocumentSubType_UpdatedAt, @EvolveDocumentSubType_UpdatedUser)");

        } catch (error) {
            Evolve.Log.error(" EERR1218: Error while adding document Type"+error.message);
            return new Error(" EERR1218: Error while adding document Type "+error.message);
        }
    },


    getDocumentSubTypeListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(EvolveDocumentSubType_ID) AS count FROM EvolveDocumentSubType WHERE EvolveDocumentSubType_Name LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document sub Type List Count "+error.message);
            return new Error(" EERR1219: Error while getting Document sub Type List Count "+error.message);
        }
    },    

    getDocumentSubTypeList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT dst.*, dt.EvolveDocumentType_Name FROM EvolveDocumentSubType dst, EvolveDocumentType dt WHERE dst.EvolveDocumentType_ID = dt.EvolveDocumentType_ID AND dst.EvolveDocumentSubType_Name LIKE @search ORDER BY EvolveDocumentSubType_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1220: Error while getting document Sub Type list "+error.message);
            return new Error(" EERR1220: Error while getting document Sub Type list "+error.message);
        }
    },

  
    getSingleDocumentSubType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentSubType_ID', Evolve.Sql.Int, data.EvolveDocumentSubType_ID)
                .query("SELECT * FROM EvolveDocumentSubType WHERE EvolveDocumentSubType_ID = @EvolveDocumentSubType_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1226: Error while getting Single Document Sub Type "+error.message);
            return new Error(" EERR1226: Error while getting Single Document Sub Type "+error.message);
        }
    },
    updateDocumentSubType: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentSubType_ID', Evolve.Sql.Int, data.EvolveDocumentSubType_ID)
                .input('EvolveDocumentType_ID', Evolve.Sql.Int, data.EvolveDocumentType_ID)
                .input('EvolveDocumentSubType_Name', Evolve.Sql.NVarChar, data.EvolveDocumentSubType_Name)
                .input('EvolveDocumentSubType_Code', Evolve.Sql.NVarChar, data.EvolveDocumentSubType_Code)
                .input('EvolveDocumentSubType_Status', Evolve.Sql.Bit, data.EvolveDocumentSubType_Status)

                .input('EvolveDocumentSubType_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentSubType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveDocumentSubType SET EvolveDocumentType_ID = @EvolveDocumentType_ID, EvolveDocumentSubType_Name = @EvolveDocumentSubType_Name, EvolveDocumentSubType_Code = @EvolveDocumentSubType_Code, EvolveDocumentSubType_Status = @EvolveDocumentSubType_Status, EvolveDocumentSubType_UpdatedAt = @EvolveDocumentSubType_UpdatedAt, EvolveDocumentSubType_UpdatedUser = @EvolveDocumentSubType_UpdatedUser WHERE EvolveDocumentSubType_ID = @EvolveDocumentSubType_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while updating Document sub Type "+error.message);
            return new Error(" EERR1227: Error while updating Document sub Type "+error.message);
        }
    },



}