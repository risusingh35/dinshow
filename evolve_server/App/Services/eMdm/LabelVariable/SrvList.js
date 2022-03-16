'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    GetStickerDetailCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveSticker_ID) as count FROM EvolveSticker WHERE EvolveSticker_Name LIKE @search ");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency List "+error.message);
            return new Error(" EERR####: Error while get Currency List "+error.message);
        }
    },

    GetStickerDetailList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("SELECT es.EvolveSticker_Name , es.EvolveSticker_Desc , es.EvolveSticker_Code ,esr.EvolveStickerVar_DummyValue , esr.EvolveStickerVar_Key , esr.EvolveStickerVar_CustomFunction from EvolveSticker es  join EvolveStickerVar esr on es.EvolveSticker_ID = esr.EvolveSticker_ID  WHERE es.EvolveSticker_Name LIKE @search order by esr.EvolveStickerVar_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list"+error.message);
            return new Error(" EERR####: Error while get Currency list"+error.message);
        }
    },

    GetStickerCode: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query("select EvolveSticker_ID,EvolveSticker_Code from EvolveSticker")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get StickerCode list"+error.message);
            return new Error(" EERR####: Error while get StickerCode list"+error.message);
        }
    },

    setStickerDetail: async function (data) {
        console.log('my data',data);
        try {
            return await Evolve.SqlPool.request()
                .input('Var_Key', Evolve.Sql.NVarChar, data.menuName)
                .input('Var_value', Evolve.Sql.NVarChar, data.menuDesc)
                .input('DummyValue', Evolve.Sql.NVarChar, data.DummyValue)
                .input('CustomFunction', Evolve.Sql.NVarChar, data.menuUrl)
                .input('EvolveSticker_ID', Evolve.Sql.Int, data.menuType)
                .query("insert into EvolveStickerVar (EvolveStickerVar_Key,EvolveStickerVar_Value,EvolveStickerVar_DummyValue,EvolveStickerVar_CustomFunction,EvolveSticker_ID) values (@Var_Key ,@Var_value ,@DummyValue ,@CustomFunction ,@EvolveSticker_ID); ")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list"+error.message);
            return new Error(" EERR####: Error while get Currency list"+error.message);
        }
    },
  
}