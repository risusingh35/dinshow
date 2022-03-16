'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query('SELECT * FROM EvolveDocument');
        } catch (error) {
            Evolve.Log.error("Error While getting document list "+error.message);
            return new Error("Error While getting document list "+error.message);
        }
    },

    getDSTokenList: async function () {
        try {
            return await Evolve.SqlPool.request()
            .query('SELECT * FROM EvolveDSToken');
        } catch (error) {
            Evolve.Log.error("Error While getting DS Token list "+error.message);
            return new Error("Error While getting DS Token list "+error.message);
        }
    },

    getDocumentToTokenListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(edt.EvolveDocumentToToken_ID) as count FROM EvolveDocumentToToken edt INNER JOIN EvolveDocument ed ON ed.EvolveDocument_ID = edt.EvolveDocument_ID INNER JOIN EvolveDSToken et ON et.EvolveDSToken_ID = edt.EvolveDSToken_ID WHERE (ed.EvolveDocument_Name LIKE @search OR et.EvolveDSToken_Name LIKE @search)');
        } catch (error) {
            Evolve.Log.error("Error while getting document to token List Count "+error.message);
            return new Error("Error while getting document to token List Count "+error.message);
        }
    },

    getDocumentToTokenList : async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT edt.EvolveDocumentToToken_ID , ed.EvolveDocument_Name , et.EvolveDSToken_Name FROM EvolveDocumentToToken edt INNER JOIN EvolveDocument ed ON ed.EvolveDocument_ID = edt.EvolveDocument_ID INNER JOIN EvolveDSToken et ON et.EvolveDSToken_ID = edt.EvolveDSToken_ID WHERE (ed.EvolveDocument_Name LIKE @search OR et.EvolveDSToken_Name LIKE @search) ORDER BY edt.EvolveDocumentToToken_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error("Error while getting Document to token list "+error.message);
            return new Error("Error while getting Document to token list "+error.message);
        }
    },

    addDocumentToToken : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDSToken_ID', Evolve.Sql.Int, data.EvolveDSToken_ID)
                .input('EvolveDocumentToToken_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDocumentToToken_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveDocumentToToken_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDocumentToToken_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveDocumentToToken (EvolveDocument_ID,EvolveDSToken_ID,EvolveDocumentToToken_CreatedAt,EvolveDocumentToToken_CreatedUser,EvolveDocumentToToken_UpdatedAt,EvolveDocumentToToken_UpdatedUser) VALUES (@EvolveDocument_ID,@EvolveDSToken_ID,@EvolveDocumentToToken_CreatedAt,@EvolveDocumentToToken_CreatedUser,@EvolveDocumentToToken_UpdatedAt,@EvolveDocumentToToken_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" Error while linkup document to token "+error.message);
            return new Error(" Error while linkup document to token "+error.message);
        }
    },

    getSingleDocToTokenData : async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentToToken_ID', Evolve.Sql.Int, data.EvolveDocumentToToken_ID)
                .query('SELECT * FROM EvolveDocumentToToken WHERE EvolveDocumentToToken_ID = @EvolveDocumentToToken_ID');
        } catch (error) {
            Evolve.Log.error("Error while getting single document to token "+error.message);
            return new Error("Error while getting single document to token "+error.message);
        }
    },

    updateDocumentToToken: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveDocumentToToken_ID', Evolve.Sql.Int, data.EvolveDocumentToToken_ID)
                .input('EvolveDocument_ID', Evolve.Sql.Int, data.EvolveDocument_ID)
                .input('EvolveDSToken_ID', Evolve.Sql.Int, data.EvolveDSToken_ID)
                .input('EvolveDocumentToToken_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveDocumentToToken_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveDocumentToToken SET EvolveDocument_ID = @EvolveDocument_ID, EvolveDSToken_ID = @EvolveDSToken_ID,  EvolveDocumentToToken_UpdatedAt = @EvolveDocumentToToken_UpdatedAt, EvolveDocumentToToken_UpdatedUser = @EvolveDocumentToToken_UpdatedUser WHERE EvolveDocumentToToken_ID = @EvolveDocumentToToken_ID');
        } catch (error) {
            Evolve.Log.error(" Error on update document to token "+error.message);
            return new Error(" Error on update document to token "+error.message);
        }
    },
}