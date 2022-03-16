'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getEdiListCount : async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(EvolveEDIHistory_ID) as count FROM EvolveEDIHistory WHERE EvolveEDIHistory_FileName LIKE @search")
        } catch (error) {
            Evolve.Log.error("Error While getting Edi List Count " + error.message);
            return new Error("Error While getting Edi List Count " + error.message);
        }
    },

    getEdiList : async function (start , length , search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT * , convert(varchar, EvolveEDIHistory_CreatedAt, 103)  as DateFormated , LTRIM(SUBSTRING(CONVERT(VARCHAR(20),  CONVERT(DATETIME, [EvolveEDIHistory_CreatedAt]), 22), 10, 5) + RIGHT(CONVERT(VARCHAR(20),   CONVERT(DATETIME, [EvolveEDIHistory_CreatedAt]), 22), 3)) as time   FROM EvolveEDIHistory WHERE EvolveEDIHistory_FileName LIKE @search ORDER BY EvolveEDIHistory_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error("Error While getting EDI List " + error.message);
            return new Error("Error While getting EDI List " + error.message);
        }
    },

    getGlobleVariableConfig: async function (EvolveConfig_Key) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveConfig_Key', Evolve.Sql.NVarChar, EvolveConfig_Key)
                .query("SELECT EvolveConfig_Value FROM EvolveConfig WHERE EvolveConfig_Key LIKE @EvolveConfig_Key");
        } catch (error) {
            Evolve.Log.error("Error While getting config variable " + error.message);
            return new Error("Error While getting config variable " + error.message);
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
}