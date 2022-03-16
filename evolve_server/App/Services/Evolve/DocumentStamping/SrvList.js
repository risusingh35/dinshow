'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("SELECT * FROM EvolveDocument");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document List "+error.message);
            return new Error(" EERR1219: Error while getting Document List "+error.message);
        }
    },
    getDocumentStampingListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT COUNT(EvolveDocumentStamping_ID) AS count FROM EvolveDocumentStamping WHERE EvolveDocumentStamping_Code LIKE @search");
        } catch (error) {
            Evolve.Log.error(" EERR1219: Error while getting Document Stamping List Count "+error.message);
            return new Error(" EERR1219: Error while getting Document Stamping List Count "+error.message);
        }
    },    

    getDocumentStampingList: async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT eds.*, ed.EvolveDocument_Name FROM EvolveDocumentStamping eds, EvolveDocument ed WHERE eds.EvolveDocument_ID = ed.EvolveDocument_ID AND eds.EvolveDocumentStamping_Code LIKE @search ORDER BY eds.EvolveDocumentStamping_ID desc OFFSET @start ROWS FETCH NEXT @length ROWS ONLY");

        } catch (error) {
            Evolve.Log.error(" EERR1220: Error while getting document Stamping list "+error.message);
            return new Error(" EERR1220: Error while getting document Stamping list "+error.message);
        }
    },

    addDocumentStamping: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDocumentStamping_Code', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_Code)
                .input('EvolveDocumentStamping_StartX', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_StartX)
                .input('EvolveDocumentStamping_StartY', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_StartY)
                .input('EvolveDocumentStamping_EndX', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_EndX)
                .input('EvolveDocumentStamping_EndY', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_EndY)
                .input('EvolveDocumentStamping_ExtraText', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_ExtraText)
                .input('EvolveDocumentStamping_Status', Evolve.Sql.Bit, data.EvolveDocumentStamping_Status)

                .input('EvolveDocumentStamping_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentStamping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentStamping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentStamping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("INSERT INTO EvolveDocumentStamping (EvolveDocument_ID, EvolveDocumentStamping_Code, EvolveDocumentStamping_StartX, EvolveDocumentStamping_StartY, EvolveDocumentStamping_EndX, EvolveDocumentStamping_EndY, EvolveDocumentStamping_Status, EvolveDocumentStamping_CreatedAt, EvolveDocumentStamping_CreatedUser, EvolveDocumentStamping_UpdatedAt, EvolveDocumentStamping_UpdatedUser, EvolveDocumentStamping_ExtraText) VALUES (@EvolveDocument_ID, @EvolveDocumentStamping_Code, @EvolveDocumentStamping_StartX, @EvolveDocumentStamping_StartY, @EvolveDocumentStamping_EndX, @EvolveDocumentStamping_EndY, @EvolveDocumentStamping_Status, @EvolveDocumentStamping_CreatedAt, @EvolveDocumentStamping_CreatedUser, @EvolveDocumentStamping_UpdatedAt, @EvolveDocumentStamping_UpdatedUser, @EvolveDocumentStamping_ExtraText)");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while ADD Document stamping "+error.message);
            return new Error(" EERR1227: Error while ADD Document stamping"+error.message);
        }
    },
    getSingleDocumentStamping: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentStamping_ID', Evolve.Sql.Int, data.EvolveDocumentStamping_ID)
                .query("SELECT * FROM EvolveDocumentStamping WHERE EvolveDocumentStamping_ID = @EvolveDocumentStamping_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1226: Error while getting Single Document Stamping "+error.message);
            return new Error(" EERR1226: Error while getting Single Document Stamping "+error.message);
        }
    },
    updateDocumentStamping: async function (data) {
        try {
            let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentStamping_ID', Evolve.Sql.Int, data.EvolveDocumentStamping_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDocumentStamping_Code', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_Code)
                .input('EvolveDocumentStamping_StartX', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_StartX)
                .input('EvolveDocumentStamping_StartY', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_StartY)
                .input('EvolveDocumentStamping_EndX', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_EndX)
                .input('EvolveDocumentStamping_EndY', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_EndY)
                .input('EvolveDocumentStamping_ExtraText', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_ExtraText)
                .input('EvolveDocumentStamping_Status', Evolve.Sql.Bit, data.EvolveDocumentStamping_Status)

                .input('EvolveDocumentStamping_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveDocumentStamping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)

                .query("UPDATE EvolveDocumentStamping SET EvolveDocument_ID = @EvolveDocument_ID, EvolveDocumentStamping_Code = @EvolveDocumentStamping_Code, EvolveDocumentStamping_StartX = @EvolveDocumentStamping_StartX, EvolveDocumentStamping_StartY = @EvolveDocumentStamping_StartY, EvolveDocumentStamping_EndX = @EvolveDocumentStamping_EndX, EvolveDocumentStamping_EndY = @EvolveDocumentStamping_EndY, EvolveDocumentStamping_Status =@EvolveDocumentStamping_Status, EvolveDocumentStamping_UpdatedAt = @EvolveDocumentStamping_UpdatedAt, EvolveDocumentStamping_UpdatedUser = @EvolveDocumentStamping_UpdatedUser, EvolveDocumentStamping_ExtraText = @EvolveDocumentStamping_ExtraText WHERE EvolveDocumentStamping_ID = @EvolveDocumentStamping_ID");

        } catch (error) {
            Evolve.Log.error(" EERR1227: Error while updating Document Stamping "+error.message);
            return new Error(" EERR1227: Error while updating Document Stamping "+error.message);
        }
    },    

     checkDocumentStampingCode: async function (data) {
        try {
            
            if(data.EvolveDocumentStamping_ID != ''){
                 return await Evolve.SqlPool.request()
                .input('EvolveDocumentStamping_ID', Evolve.Sql.Int, data.EvolveDocumentStamping_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDocumentStamping_Code', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_Code)
                .query("SELECT EvolveDocumentStamping_Code FROM EvolveDocumentStamping WHERE EvolveDocumentStamping_Code = @EvolveDocumentStamping_Code  AND EvolveDocument_ID = @EvolveDocument_ID AND EvolveDocumentStamping_ID != @EvolveDocumentStamping_ID");
            }else{
                 return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDocumentStamping_Code', Evolve.Sql.NVarChar, data.EvolveDocumentStamping_Code)
                .query("SELECT EvolveDocumentStamping_Code FROM EvolveDocumentStamping WHERE EvolveDocumentStamping_Code = @EvolveDocumentStamping_Code  AND EvolveDocument_ID = @EvolveDocument_ID");
            }
        } catch (error) {
            Evolve.Log.error(" EERR1231: Error while check code " + error.message);
            return new Error(" EERR1231: Error while check code " + error.message);
        }
    },   



}