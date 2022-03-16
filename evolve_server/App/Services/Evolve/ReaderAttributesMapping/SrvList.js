'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttMappingListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT COUNT(eram.EvolveReaderAttrMapping_ID) as count FROM EvolveReaderAttrMapping eram, EvolveReaderAttributes era, EvolveReader er WHERE eram.EvolveReader_ID = er.EvolveReader_ID AND eram.EvolveReaderAttributes_ID = era.EvolveReaderAttributes_ID AND era.EvolveReaderAttributes_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader Attributes Mapping Count "+error.message);
            return new Error(" EERR####: Error while getting Reader Attributes Mapping Count "+error.message);
        }
    },

    getReaderAttMappingList : async function (start, length, search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('length',Evolve.Sql.Int,length)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query(' SELECT eram.*, era.EvolveReaderAttributes_Code, er.EvolveReader_Code, (SELECT era1.EvolveReaderAttributes_Code FROM EvolveReaderAttributes era1 WHERE era.EvolveReaderAttributes_Parent = era1.EvolveReaderAttributes_ID) AS parentReaderAttribute FROM EvolveReaderAttrMapping eram, EvolveReaderAttributes era, EvolveReader er WHERE eram.EvolveReader_ID = er.EvolveReader_ID AND eram.EvolveReaderAttributes_ID = era.EvolveReaderAttributes_ID AND era.EvolveReaderAttributes_Code LIKE @search ORDER BY EvolveReaderAttrMapping_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader attributes mapping List "+error.message);
            return new Error(" EERR####: Error while getting Reader attributes mapping List "+error.message);
        }
    },

    getReaderAttCode : async function (EvolveReader_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID',Evolve.Sql.Int,EvolveReader_ID)
            .query('SELECT ea.*, (SELECT ea1.EvolveReaderAttributes_Code FROM EvolveReaderAttributes ea1 WHERE ea.EvolveReaderAttributes_Parent = ea1.EvolveReaderAttributes_ID) AS parentReaderAttribute  FROM EvolveReaderAttributes ea WHERE EvolveReader_ID = @EvolveReader_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Reader attributes code "+error.message);
            return new Error(" EERR####: Error while getting Reader attributes code "+error.message);
        }
    },

    addReaderAttMapping : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, data.EvolveReaderAttributes_ID)
            .input('EvolveReaderAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_Table)
            .input('EvolveReaderAttrMapping_Field', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_Field)
            .input('EvolveReaderAttrMapping_MatchField', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_MatchField)
            .input('EvolveReaderAttrMapping_Status', Evolve.Sql.Bit, data.EvolveReaderAttrMapping_Status)
            .input('EvolveReaderAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveReaderAttrMapping_CreatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttrMapping_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('INSERT INTO EvolveReaderAttrMapping (EvolveReader_ID, EvolveReaderAttributes_ID, EvolveReaderAttrMapping_Table, EvolveReaderAttrMapping_Field, EvolveReaderAttrMapping_MatchField, EvolveReaderAttrMapping_Status, EvolveReaderAttrMapping_UpdatedAt, EvolveReaderAttrMapping_UpdatedUser, EvolveReaderAttrMapping_CreatedAt, EvolveReaderAttrMapping_CreatedUser) VALUES (@EvolveReader_ID, @EvolveReaderAttributes_ID, @EvolveReaderAttrMapping_Table, @EvolveReaderAttrMapping_Field, @EvolveReaderAttrMapping_MatchField, @EvolveReaderAttrMapping_Status, @EvolveReaderAttrMapping_UpdatedAt, @EvolveReaderAttrMapping_UpdatedUser, @EvolveReaderAttrMapping_CreatedAt, @EvolveReaderAttrMapping_CreatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding reader attribute mapping "+error.message);
            return new Error(" EERR####: Error while adding reader attribute mapping "+error.message);
        }
    },

    editReaderAttMapping : async function (data) {
        try {
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttrMapping_ID', Evolve.Sql.Int, data.EvolveReaderAttrMapping_ID)
            .input('EvolveReader_ID', Evolve.Sql.Int, data.EvolveReader_ID)
            .input('EvolveReaderAttributes_ID', Evolve.Sql.Int, data.EvolveReaderAttributes_ID)
            .input('EvolveReaderAttrMapping_Table', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_Table)
            .input('EvolveReaderAttrMapping_Field', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_Field)
            .input('EvolveReaderAttrMapping_MatchField', Evolve.Sql.NVarChar, data.EvolveReaderAttrMapping_MatchField)
            .input('EvolveReaderAttrMapping_Status', Evolve.Sql.Bit, data.EvolveReaderAttrMapping_Status)
            .input('EvolveReaderAttrMapping_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveReaderAttrMapping_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .query('UPDATE EvolveReaderAttrMapping SET EvolveReader_ID = @EvolveReader_ID, EvolveReaderAttributes_ID = @EvolveReaderAttributes_ID, EvolveReaderAttrMapping_Table = @EvolveReaderAttrMapping_Table, EvolveReaderAttrMapping_Field = @EvolveReaderAttrMapping_Field, EvolveReaderAttrMapping_MatchField = @EvolveReaderAttrMapping_MatchField, EvolveReaderAttrMapping_Status = @EvolveReaderAttrMapping_Status, EvolveReaderAttrMapping_UpdatedAt = @EvolveReaderAttrMapping_UpdatedAt, EvolveReaderAttrMapping_UpdatedUser = @EvolveReaderAttrMapping_UpdatedUser WHERE EvolveReaderAttrMapping_ID = @EvolveReaderAttrMapping_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edit reader attribute mapping "+error.message);
            return new Error(" EERR####: Error while edit reader attribute mapping "+error.message);
        }
    },

    deleteReaderAttMappingData : async function (EvolveReaderAttrMapping_ID) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveReaderAttrMapping_ID', Evolve.Sql.Int, EvolveReaderAttrMapping_ID)
            .query('DELETE FROM EvolveReaderAttrMapping WHERE EvolveReaderAttrMapping_ID = @EvolveReaderAttrMapping_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete reader attribute mapping "+error.message);
            return new Error(" EERR####: Error while delete reader attribute mapping "+error.message);
        }
    },


}