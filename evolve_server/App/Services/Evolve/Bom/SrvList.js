'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getBomListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(epb.EvolvePartBom_ID) as count  FROM EvolvePartBom epb , EvolveItem ei  WHERE  epb.EvolvePartBom_ParentItem_ID = ei.EvolveItem_ID AND ei.EvolveItem_Code LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR1171: Error while getting Bom List Count "+error.message);
            return new Error(" EERR1171: Error while getting Bom List Count "+error.message);
        }
    },

    getBomList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT epb.EvolvePartBom_ID ,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_ParentItem_ID AND EvolveItem_Code  LIKE @search)  as parent_item,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_CompItem_ID) as child_item, epb.EvolvePartBom_QtyPer, epb.EvolvePartBom_DispSeq FROM EvolvePartBom epb ,EvolveItem ei WHERE  epb.EvolvePartBom_ParentItem_ID = ei.EvolveItem_ID AND ei.EvolveItem_Code LIKE @search ORDER BY epb.EvolvePartBom_ID  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1172: Error while getting Bom List "+error.message);
            return new Error(" EERR1172: Error while getting Bom List "+error.message);
        }
    },

    checkBomMaster: async function (data) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
                .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
                .query('select COUNT (EvolvePartBom_ID) as count from EvolvePartBom where  EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID AND  EvolvePartBom_CompItem_ID=@EvolvePartBom_CompItem_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1173: Error while checking Bom Master "+error.message);
            return new Error(" EERR1173: Error while checking Bom Master "+error.message);
        }
    },

    addBom: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
                .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
                .input('EvolvePartBom_QtyPer', Evolve.Sql.Int, data.EvolvePartBom_QtyPer)
                .input('EvolvePartBom_DispSeq', Evolve.Sql.Int, data.EvolvePartBom_DispSeq)
                .input('EvolvePartBom_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePartBom_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolvePartBom_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePartBom_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolvePartBom (EvolvePartBom_ParentItem_ID, EvolvePartBom_CompItem_ID, EvolvePartBom_QtyPer, EvolvePartBom_DispSeq, EvolvePartBom_CreatedAt, EvolvePartBom_CreatedUser, EvolvePartBom_UpdatedAt, EvolvePartBom_UpdatedUser) VALUES (@EvolvePartBom_ParentItem_ID, @EvolvePartBom_CompItem_ID, @EvolvePartBom_QtyPer, @EvolvePartBom_DispSeq, @EvolvePartBom_CreatedAt, @EvolvePartBom_CreatedUser, @EvolvePartBom_UpdatedAt, @EvolvePartBom_UpdatedUser)');

        } catch (error) {
            Evolve.Log.error(" EERR1174: Erorr while adding Bom "+error.message);
            return new Error(" EERR1174: Erorr while adding Bom "+error.message);
        }
    },

    getBomDisplaySeq: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT TOP(1) EvolvePartBom_DispSeq FROM EvolvePartBom WHERE EvolvePartBom_ParentItem_ID = @id ORDER BY EvolvePartBom_DispSeq DESC')
        } catch (error) {
            Evolve.Log.error(" EERR1175: Error while getting Bom Display Seq "+error.message);
            return new Error(" EERR1175: Error while getting Bom Display Seq "+error.message);
        }
    },

    getSingleBom: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT epb.EvolvePartBom_ID, epb.EvolvePartBom_ParentItem_ID, epb.EvolvePartBom_CompItem_ID,(SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_ParentItem_ID) as parent_item, (SELECT EvolveItem_Code FROM EvolveItem WHERE EvolveItem_ID = epb.EvolvePartBom_CompItem_ID) as child_item,epb.EvolvePartBom_QtyPer, epb.EvolvePartBom_DispSeq FROM EvolvePartBom epb WHERE epb.EvolvePartBom_ID = @id ');
        } catch (error) {
            Evolve.Log.error(" EERR1176: Error while getting Single Bom "+error.message);
            return new Error(" EERR1176: Error while getting Single Bom "+error.message);
        }
    },

    updateBom: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePartBom_ID', Evolve.Sql.Int, data.EvolvePartBom_ID)
                .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
                .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
                .input('EvolvePartBom_QtyPer', Evolve.Sql.Int, data.EvolvePartBom_QtyPer)
                .input('EvolvePartBom_DispSeq', Evolve.Sql.Int, data.EvolvePartBom_DispSeq)
                .input('EvolvePartBom_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolvePartBom_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolvePartBom SET EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID, EvolvePartBom_CompItem_ID = @EvolvePartBom_CompItem_ID,EvolvePartBom_QtyPer = @EvolvePartBom_QtyPer, EvolvePartBom_DispSeq = @EvolvePartBom_DispSeq, EvolvePartBom_UpdatedAt = @EvolvePartBom_UpdatedAt, EvolvePartBom_UpdatedUser = @EvolvePartBom_UpdatedUser WHERE EvolvePartBom_ID = @EvolvePartBom_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1177: Error while updating Bom "+error.message);
            return new Error(" EERR1177: Error while updating Bom "+error.message);
        }
    },

    checkBomMasterEdit: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolvePartBom_ID', Evolve.Sql.Int, data.EvolvePartBom_ID)
                .input('EvolvePartBom_ParentItem_ID', Evolve.Sql.Int, data.EvolvePartBom_ParentItem_ID)
                .input('EvolvePartBom_CompItem_ID', Evolve.Sql.Int, data.EvolvePartBom_CompItem_ID)
                .query('select COUNT (EvolvePartBom_ID) as count from EvolvePartBom where  EvolvePartBom_ParentItem_ID = @EvolvePartBom_ParentItem_ID AND  EvolvePartBom_CompItem_ID=@EvolvePartBom_CompItem_ID AND EvolvePartBom_ID!=@EvolvePartBom_ID');

        } catch (error) {
            Evolve.Log.error(" EERR1178: Error while checking Bom Master Edit "+error.message);
            return new Error(" EERR1178: Error while checking Bom Master Edit "+error.message);
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