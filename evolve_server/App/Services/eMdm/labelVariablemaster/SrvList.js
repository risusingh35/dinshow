'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStickerVarListCount: async function (search, condition) {

        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("  SELECT COUNT(esv.EvolveStickerVar_ID) as count FROM EvolveStickerVar esv , EvolveSticker es where esv.EvolveSticker_ID = es.EvolveSticker_ID and (esv.EvolveStickerVar_Key like @search or esv.EvolveStickerVar_Value like @search or es.EvolveSticker_Name like @search)");
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get StickerVar List Count"+error.message);
            return new Error(" EERR####: Error while get StickerVar List Count"+error.message);
        }
    },

    getStickerVarList: async function (start, length ,search, condition) {
        try {
        // console.log("condition???" , condition)

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query("select esv.* , es.EvolveSticker_Name from EvolveStickerVar esv , EvolveSticker es  where esv.EvolveSticker_ID = es.EvolveSticker_ID AND (esv.EvolveStickerVar_Key like @search  or esv.EvolveStickerVar_Value like @search or es.EvolveSticker_Name like @search)  ORDER BY esv.EvolveStickerVar_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get StickerVar list"+error.message);
            return new Error(" EERR####: Error while get StickerVar list"+error.message);
        }
    },

    getSticker: async function (search) {
        try {
        // console.log("condition???" , condition)

            return await Evolve.SqlPool.request()
                .query("SELECT TOP(20) EvolveSticker_Name as title , EvolveSticker_ID as id FROM EvolveSticker WHERE EvolveSticker_Name LIKE  '%"+search+"%'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Sticker list"+error.message);
            return new Error(" EERR####: Error while get Sticker list"+error.message);
        }
    },

    getUnit: async function (search) {
        try {
        // console.log("condition???" , condition)

            return await Evolve.SqlPool.request()
                .query("SELECT TOP(20) EvolveUnit_Code as title , EvolveUnit_ID as id FROM EvolveUnit WHERE EvolveUnit_Code LIKE  '%"+search+"%'")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Unit list"+error.message);
            return new Error(" EERR####: Error while get Unit list"+error.message);
        }
    },

    careatStickerVar : async function (data){
        try {
            let date = new Date();
            let datetime =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveSticker_ID', Evolve.Sql.Int, data.EvolveSticker_ID)
                .input('EvolveStickerVar_Key', Evolve.Sql.NVarChar, data.EvolveStickerVar_Key)
                .input('EvolveStickerVar_Value', Evolve.Sql.NVarChar, data.EvolveStickerVar_Value)
                .input('EvolveStickerVar_DummyValue', Evolve.Sql.NVarChar, data.EvolveStickerVar_DummyValue)
                .input('EvolveStickerVar_CustomFunction', Evolve.Sql.NVarChar, data.EvolveStickerVar_CustomFunction)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveStickerVar_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStickerVar_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveStickerVar_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStickerVar_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("INSERT INTO EvolveStickerVar (EvolveSticker_ID , EvolveStickerVar_Key , EvolveStickerVar_Value , EvolveStickerVar_DummyValue , EvolveStickerVar_CustomFunction , EvolveUnit_ID , EvolveStickerVar_CreatedAt , EvolveStickerVar_CreatedUser , EvolveStickerVar_UpdatedAt , EvolveStickerVar_UpdatedUser) VALUES  (@EvolveSticker_ID , @EvolveStickerVar_Key , @EvolveStickerVar_Value , @EvolveStickerVar_DummyValue , @EvolveStickerVar_CustomFunction , @EvolveUnit_ID , @EvolveStickerVar_CreatedAt , @EvolveStickerVar_CreatedUser , @EvolveStickerVar_UpdatedAt , @EvolveStickerVar_UpdatedUser)")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while careat Sticker Variable"+error.message);                
            return new Error(" EERR####: Error while careat Sticker Variable"+error.message);
        }
    },

    getSinglestickerVarDetails : async function (data){
        try {
                return await Evolve.SqlPool.request()
                    .input('EvolveStickerVar_ID', Evolve.Sql.Int, data.EvolveStickerVar_ID)
                    .query("select * from EvolveStickerVar where EvolveStickerVar_ID = @EvolveStickerVar_ID")
            } catch (error) {
                Evolve.Log.error(" EERR####: Error while get StickerVar list "+error.message);
                return new Error(" EERR####: Error while get StickerVar list "+error.message);
            }
    },

    updateStickerVar : async function (data){
        try {
            console.log("data???????????/", data);
            let date = new Date();
            let datetime =  date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveStickerVar_ID', Evolve.Sql.Int, data.EvolveStickerVar_ID)
                .input('EvolveSticker_ID', Evolve.Sql.Int, parseInt(data.EvolveSticker_ID))
                .input('EvolveStickerVar_Key', Evolve.Sql.NVarChar, data.EvolveStickerVar_Key)
                .input('EvolveStickerVar_Value', Evolve.Sql.NVarChar, data.EvolveStickerVar_Value)
                .input('EvolveStickerVar_DummyValue', Evolve.Sql.NVarChar, data.EvolveStickerVar_DummyValue)
                .input('EvolveStickerVar_CustomFunction', Evolve.Sql.NVarChar, data.EvolveStickerVar_CustomFunction)
                .input('EvolveUnit_ID', Evolve.Sql.Int, data.EvolveUnit_ID)
                .input('EvolveStickerVar_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveStickerVar_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveStickerVar SET EvolveSticker_ID = @EvolveSticker_ID , EvolveStickerVar_Key = @EvolveStickerVar_Key , EvolveStickerVar_Value = @EvolveStickerVar_Value , EvolveStickerVar_DummyValue = @EvolveStickerVar_DummyValue , EvolveStickerVar_CustomFunction = @EvolveStickerVar_CustomFunction , EvolveUnit_ID = @EvolveUnit_ID , EvolveStickerVar_UpdatedAt = @EvolveStickerVar_UpdatedAt ,  EvolveStickerVar_UpdatedUser = @EvolveStickerVar_UpdatedUser where EvolveStickerVar_ID = @EvolveStickerVar_ID")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update Sticker Variable "+error.message);                
            return new Error(" EERR####: Error while update Sticker Variable "+error.message);
        }
    },
     

}