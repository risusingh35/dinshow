'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(EvolveReader_ID) as count FROM EvolveReader WHERE EvolveReader_Name LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader Count "+error.message);
            return new Error(" EERR####: Error while getting Reader Count "+error.message);
        }
    },

    getReaderList : async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT * FROM EvolveReader WHERE EvolveReader_Name LIKE @search ORDER BY EvolveReader_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader List "+error.message);
            return new Error(" EERR####: Error while getting Reader List "+error.message);
        }
    },

    addReader : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReader_Name', Evolve.Sql.NVarChar, data.EvolveReader_Name)
            .input('EvolveReader_Code', Evolve.Sql.NVarChar, data.EvolveReader_Code)
            .input('EvolveReader_Type', Evolve.Sql.NVarChar, data.EvolveReader_Type)
            .input('EvolveReader_Status', Evolve.Sql.Bit, data.EvolveReader_Status)
            .input('EvolveReader_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReader_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveReader_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReader_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('INSERT INTO EvolveReader (EvolveReader_Name, EvolveReader_Code, EvolveReader_Type, EvolveReader_Status, EvolveReader_UpdatedAt, EvolveReader_UpdatedUser, EvolveReader_CreatedAt, EvolveReader_CreatedUser) VALUES (@EvolveReader_Name, @EvolveReader_Code, @EvolveReader_Type, @EvolveReader_Status, @EvolveReader_UpdatedAt, @EvolveReader_UpdatedUser, @EvolveReader_CreatedAt, @EvolveReader_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding reader "+error.message);
            return new Error(" EERR####: Error while adding reader "+error.message);
        }
    },

    editReader : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReader_Name', Evolve.Sql.NVarChar, data.EvolveReader_Name)
            .input('EvolveReader_Code', Evolve.Sql.NVarChar, data.EvolveReader_Code)
            .input('EvolveReader_Type', Evolve.Sql.NVarChar, data.EvolveReader_Type)
            .input('EvolveReader_Status', Evolve.Sql.Bit, data.EvolveReader_Status)
            .input('EvolveReader_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReader_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('UPDATE EvolveReader SET EvolveReader_Name = @EvolveReader_Name, EvolveReader_Code = @EvolveReader_Code, EvolveReader_Type = @EvolveReader_Type, EvolveReader_Status = @EvolveReader_Status WHERE EvolveReader_ID = @EvolveReader_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edit reader "+error.message);
            return new Error(" EERR####: Error while edit reader "+error.message);
        }
    },

    getReaderPreviewData : async function (EvolveReader_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, EvolveReader_ID)
            .query(' SELECT ERA.EvolveReaderAttributes_ID AS eraId, EvolveReaderAttributes_Parent AS eraParent, EvolveReaderAttributes_Code AS eraCode, EvolveReaderAttributes_Datatype AS eraDataType, EvolveReaderAttributes_Default AS eraDefault FROM EvolveReaderAttributes ERA WHERE ERA.EvolveReader_ID = @EvolveReader_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader preview data "+error.message);
            return new Error(" EERR####: Error while getting reader preview data "+error.message);
        }
    },


}