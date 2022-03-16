'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPriceMasterListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('SELECT COUNT(EvolvePriceList_ID) as count  FROM EvolvePriceList  WHERE (EvolvePriceList_ItemCode LIKE @search OR EvolvePriceList_Code LIKE @search)');
        } catch (error) {
            Evolve.Log.error("Error while getting price master list Count "+error.message);
            return new Error("Error while getting price master list Count "+error.message);
        }
    },

    getPriceMasterList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT *  FROM EvolvePriceList  WHERE (EvolvePriceList_ItemCode LIKE @search OR EvolvePriceList_Code LIKE @search) ORDER BY EvolvePriceList_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error("Error while getting price master list "+error.message);
            return new Error("Error while getting price master list "+error.message);
        }
    },

    checkPriceMaster: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)
                .input('EvolvePriceList_ItemCode', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemCode)              
                .input('EvolvePriceList_StartDate', Evolve.Sql.NVarChar, data.EvolvePriceList_StartDate)              
                .query('select EvolvePriceList_ID from EvolvePriceList where  EvolvePriceList_Code = @EvolvePriceList_Code AND  EvolvePriceList_ItemCode = @EvolvePriceList_ItemCode AND EvolvePriceList_StartDate = @EvolvePriceList_StartDate');

        } catch (error) {
            Evolve.Log.error("Error while checking price Master "+error.message);
            return new Error("Error while checking price Master "+error.message);
        }
    },

    addPriceMaster : async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)
                .input('EvolvePriceList_ItemCode', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemCode)
                .input('EvolvePriceList_ItemDesc', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemDesc)
                .input('EvolvePriceList_StdPktSize', Evolve.Sql.NVarChar, data.EvolvePriceList_StdPktSize)
                .input('EvolvePriceList_MinimumSize', Evolve.Sql.NVarChar, data.EvolvePriceList_MinimumSize)
                .input('EvolvePriceList_StartDate', Evolve.Sql.NVarChar, data.EvolvePriceList_StartDate)
                .input('EvolvePriceList_ExpriryDate', Evolve.Sql.NVarChar, data.EvolvePriceList_ExpriryDate)
                .input('EvolvePriceList_MRPPrice', Evolve.Sql.NVarChar, data.EvolvePriceList_MRPPrice)
                .input('EvolvePriceList_CouponOf', Evolve.Sql.NVarChar, data.EvolvePriceList_CouponOf)
                .input('EvolvePriceList_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePriceList_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePriceList_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePriceList_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolvePriceList (EvolvePriceList_Code,EvolvePriceList_ItemCode,EvolvePriceList_ItemDesc,EvolvePriceList_StdPktSize,EvolvePriceList_MinimumSize,EvolvePriceList_StartDate,EvolvePriceList_ExpriryDate,EvolvePriceList_MRPPrice,EvolvePriceList_CouponOf,EvolvePriceList_CreatedAt,EvolvePriceList_CreatedUser,EvolvePriceList_UpdateAt,EvolvePriceList_UpdatedUser) VALUES (@EvolvePriceList_Code,@EvolvePriceList_ItemCode,@EvolvePriceList_ItemDesc,@EvolvePriceList_StdPktSize,@EvolvePriceList_MinimumSize,@EvolvePriceList_StartDate,@EvolvePriceList_ExpriryDate,@EvolvePriceList_MRPPrice,@EvolvePriceList_CouponOf,@EvolvePriceList_CreatedAt,@EvolvePriceList_CreatedUser,@EvolvePriceList_UpdateAt,@EvolvePriceList_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error("Erorr while adding price list "+error.message);
            return new Error("Erorr while adding price list "+error.message);
        }
    },

    getSinglePriceMaster: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolvePriceList WHERE EvolvePriceList_ID = @id');
        } catch (error) {
            Evolve.Log.error("Error while getting single price list "+error.message);
            return new Error("Error while getting single price list "+error.message);
        }
    },

    updatePriceList: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_ID', Evolve.Sql.Int, data.EvolvePriceList_ID)
                .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)
                .input('EvolvePriceList_ItemCode', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemCode)
                .input('EvolvePriceList_ItemDesc', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemDesc)
                .input('EvolvePriceList_StdPktSize', Evolve.Sql.NVarChar, data.EvolvePriceList_StdPktSize)
                .input('EvolvePriceList_MinimumSize', Evolve.Sql.NVarChar, data.EvolvePriceList_MinimumSize)
                .input('EvolvePriceList_StartDate', Evolve.Sql.NVarChar, data.EvolvePriceList_StartDate)
                .input('EvolvePriceList_ExpriryDate', Evolve.Sql.NVarChar, data.EvolvePriceList_ExpriryDate)
                .input('EvolvePriceList_MRPPrice', Evolve.Sql.NVarChar, data.EvolvePriceList_MRPPrice)
                .input('EvolvePriceList_CouponOf', Evolve.Sql.NVarChar, data.EvolvePriceList_CouponOf)
                .input('EvolvePriceList_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePriceList_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolvePriceList SET EvolvePriceList_Code = @EvolvePriceList_Code,EvolvePriceList_ItemCode = @EvolvePriceList_ItemCode,EvolvePriceList_ItemDesc = @EvolvePriceList_ItemDesc,EvolvePriceList_StdPktSize = @EvolvePriceList_StdPktSize,EvolvePriceList_MinimumSize = @EvolvePriceList_MinimumSize,EvolvePriceList_StartDate = @EvolvePriceList_StartDate,EvolvePriceList_ExpriryDate = @EvolvePriceList_ExpriryDate,EvolvePriceList_MRPPrice = @EvolvePriceList_MRPPrice,EvolvePriceList_CouponOf = @EvolvePriceList_CouponOf,EvolvePriceList_UpdateAt = @EvolvePriceList_UpdateAt,EvolvePriceList_UpdatedUser=@EvolvePriceList_UpdatedUser WHERE EvolvePriceList_ID = @EvolvePriceList_ID ');
        } catch (error) {
            Evolve.Log.error("Error while updating price list "+error.message);
            return new Error("Error while updating price list "+error.message);
        }
    },

    checkPriceMasterEdit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePriceList_ID', Evolve.Sql.Int, data.EvolvePriceList_ID)
                .input('EvolvePriceList_Code', Evolve.Sql.NVarChar, data.EvolvePriceList_Code)
                .input('EvolvePriceList_ItemCode', Evolve.Sql.NVarChar, data.EvolvePriceList_ItemCode)              
                .input('EvolvePriceList_StartDate', Evolve.Sql.NVarChar, data.EvolvePriceList_StartDate)              
                .query('select COUNT (EvolvePriceList_ID) as count from EvolvePriceList where  EvolvePriceList_Code = @EvolvePriceList_Code AND  EvolvePriceList_ItemCode = @EvolvePriceList_ItemCode AND EvolvePriceList_StartDate = @EvolvePriceList_StartDate AND EvolvePriceList_ID != @EvolvePriceList_ID');

        } catch (error) {
            Evolve.Log.error("Error while checking price Master "+error.message);
            return new Error("Error while checking price Master "+error.message);
        }
    },

    deleteBom: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolvePartBom WHERE EvolvePartBom_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1179: Error while deleting Bom "+error.message);
            return new Error(" EERR1179: Error while deleting Bom "+error.message);
        }
    },

    getItemSearch: async function (search) {
        try {
            let query = "SELECT EvolveItem_Code as title , EvolveItem_ID as id FROM EvolveItem WHERE EvolveItem_Code LIKE '%" + search + "%' "
            return await Evolve.SqlPool.request().query(query);
        } catch (error) {
            Evolve.Log.error(" EERR1180: Error while getting Item Search "+error.message);
            return new Error(" EERR1180: Error while getting Item Search "+error.message);
        }
    },


}