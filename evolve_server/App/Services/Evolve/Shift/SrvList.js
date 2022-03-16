'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getShiftListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request(search)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
            .query("SELECT COUNT(EvolveShift_ID) as count FROM EvolveShift WHERE EvolveShift_Name LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getShiftList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%') 
                .query('SELECT * from EvolveShift WHERE EvolveShift_Name LIKE @search ORDER BY EvolveShift_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1424: Error while getting Shift List "+error.message);
            return new Error(" EERR1424: Error while getting Shift List "+error.message);
        }
    },

    addShift: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveShift_Name', Evolve.Sql.NVarChar, data.EvolveShift_Name)
                .input('EvolveShift_Desc', Evolve.Sql.NVarChar, data.EvolveShift_Desc)
                .input('EvolveShift_Code', Evolve.Sql.NVarChar, data.EvolveShift_Code)
                .input('EvolveShift_Start', Evolve.Sql.NVarChar, data.EvolveShift_Start)
                .input('EvolveShift_End', Evolve.Sql.NVarChar, data.EvolveShift_End)
                .input('EvolveShift_Type', Evolve.Sql.NVarChar, data.EvolveShift_Type)
                .input('EvolveShift_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveShift_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveShift_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveShift_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveShift (EvolveShift_Name, EvolveShift_Desc,EvolveShift_Code, EvolveShift_Start, EvolveShift_End,EvolveShift_Type, EvolveShift_CreatedUser, EvolveShift_CreatedAt, EvolveShift_UpdatedAt, EvolveShift_UpdatedUser) VALUES (@EvolveShift_Name, @EvolveShift_Desc,@EvolveShift_Code, @EvolveShift_Start, @EvolveShift_End,@EvolveShift_Type, @EvolveShift_CreatedUser, @EvolveShift_CreatedAt, @EvolveShift_UpdatedAt, @EvolveShift_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR1425: Error while adding Shift "+error.message);
            return new Error(" EERR1425: Error while adding Shift "+error.message);
        }
    },

    getSingleShift: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolveShift WHERE EvolveShift_ID = @id');
        } catch (error) {
            Evolve.Log.error(" EERR1426: Error while getting Single Shift "+error.message);
            return new Error(" EERR1426: Error while getting Single Shift "+error.message);
        }
    },

    updateShift: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveShift_ID', Evolve.Sql.NVarChar, data.EvolveShift_ID)
                .input('EvolveShift_Name', Evolve.Sql.NVarChar, data.EvolveShift_Name)
                .input('EvolveShift_Code', Evolve.Sql.NVarChar, data.EvolveShift_Code)
                .input('EvolveShift_Desc', Evolve.Sql.NVarChar, data.EvolveShift_Desc)
                .input('EvolveShift_Start', Evolve.Sql.NVarChar, data.EvolveShift_Start)
                .input('EvolveShift_End', Evolve.Sql.NVarChar, data.EvolveShift_End)
                .input('EvolveShift_Type', Evolve.Sql.NVarChar, data.EvolveShift_Type)
                .input('EvolveShift_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveShift_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .query('UPDATE EvolveShift SET EvolveShift_Name = @EvolveShift_Name, EvolveShift_Code = @EvolveShift_Code, EvolveShift_Desc = @EvolveShift_Desc, EvolveShift_Start = @EvolveShift_Start, EvolveShift_End = @EvolveShift_End,EvolveShift_Type = @EvolveShift_Type, EvolveShift_UpdatedAt = @EvolveShift_UpdatedAt WHERE EvolveShift_ID = @EvolveShift_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1427: Error while updating Shift "+error.message);
            return new Error(" EERR1427: Error while updating Shift "+error.message);
        }
    },

    deleteShift: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveShift_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveShift WHERE EvolveShift_ID =@EvolveShift_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1428: Error while deleting Shift "+error.message);
            return new Error(" EERR1428: Error while deleting Shift "+error.message);
        }
    },




}