'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    
    getSerialNumberCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
          .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
          .query("SELECT COUNT(EvolveSerial_ID) as count FROM EvolveSerial WHERE EvolveSerial_Prefix LIKE @search OR EvolveSerial_Code LIKE @search")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getSerialNumberList: async function (start, length,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT * from EvolveSerial WHERE EvolveSerial_Prefix LIKE @search OR EvolveSerial_Code LIKE @search ORDER BY EvolveSerial_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1419: Error while getting Serial Number List "+error.message);
            return new Error(" EERR1419: Error while getting Serial Number List "+error.message);
        }
    },

    addSerialNumber: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        console.log("data.EvolveSerial_LastGeneratedCode???" ,  data.EvolveSerial_LastGeneratedCode)
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_Code', Evolve.Sql.NVarChar, data.EvolveSerial_Code)
                .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
                .input('EvolveSerial_Active', Evolve.Sql.Int, data.EvolveSerial_Active)
                .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
                .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
                .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
                .input('EvolveSerial_LastGeneratedCode', Evolve.Sql.NVarChar, data.EvolveSerial_LastGeneratedCode)
                .input('EvolveSerial_Width', Evolve.Sql.Int, data.EvolveSerial_Width)
                .input('EvolveSerial_Reset', Evolve.Sql.Int, data.EvolveSerial_Reset)
                .input('EvolveSerial_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveSerial (EvolveSerial_LastGeneratedCode , EvolveSerial_Code, EvolveSerial_Desc, EvolveSerial_Active, EvolveSerial_Prefix, EvolveSerial_Start, EvolveSerial_Next , EvolveSerial_CreatedAt, EvolveSerial_CreatedUser, EvolveSerial_Width, EvolveSerial_Reset) VALUES (@EvolveSerial_LastGeneratedCode ,@EvolveSerial_Code, @EvolveSerial_Desc, @EvolveSerial_Active, @EvolveSerial_Prefix, @EvolveSerial_Start, @EvolveSerial_Next  , @EvolveSerial_CreatedAt, @EvolveSerial_CreatedUser, @EvolveSerial_Width, @EvolveSerial_Reset)');
        } catch (error) {
            Evolve.Log.error(" EERR1420: Error while adding Serial Number "+error.message);
            return new Error(" EERR1420: Error while adding Serial Number "+error.message);
        }
    },

    updateSerialNumber: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_ID', Evolve.Sql.NVarChar, data.EvolveSerial_ID)
                .input('EvolveSerial_Code', Evolve.Sql.NVarChar, data.EvolveSerial_Code)
                .input('EvolveSerial_Desc', Evolve.Sql.NVarChar, data.EvolveSerial_Desc)
                .input('EvolveSerial_Active', Evolve.Sql.Int, data.EvolveSerial_Active)
                .input('EvolveSerial_Prefix', Evolve.Sql.NVarChar, data.EvolveSerial_Prefix)
                .input('EvolveSerial_Start', Evolve.Sql.Int, data.EvolveSerial_Start)
                .input('EvolveSerial_Next', Evolve.Sql.Int, data.EvolveSerial_Next)
                // .input('EvolveSerial_WoLimit', Evolve.Sql.Int, data.EvolveSerial_WoLimit)
                .input('EvolveSerial_Width', Evolve.Sql.Int, data.EvolveSerial_Width)
                .input('EvolveSerial_Reset', Evolve.Sql.Int, data.EvolveSerial_Reset)
                .input('EvolveSerial_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveSerial SET EvolveSerial_Code = @EvolveSerial_Code, EvolveSerial_Desc = @EvolveSerial_Desc, EvolveSerial_Active = @EvolveSerial_Active, EvolveSerial_Prefix = @EvolveSerial_Prefix, EvolveSerial_Start = @EvolveSerial_Start, EvolveSerial_Next = @EvolveSerial_Next , EvolveSerial_Width = @EvolveSerial_Width, EvolveSerial_Reset = @EvolveSerial_Reset  WHERE EvolveSerial_ID = @EvolveSerial_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1421: Error while updating Serial Number "+error.message);
            return new Error(" EERR1421: Error while updating Serial Number "+error.message);
        }
    },

    getSingleSerialNumber: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, data.id)
                .query('SELECT * FROM EvolveSerial WHERE EvolveSerial_ID = @id');
        } catch (error) {
            Evolve.Log.error(" EERR1422: Error while getting Single Serial Number "+error.message);
            return new Error(" EERR1422: Error while getting Single Serial Number "+error.message);
        }
    },

    deleteSerialNumber: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveSerial_ID', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveSerial WHERE EvolveSerial_ID =@EvolveSerial_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1423: Error while deleting Serial Number "+error.message);
            return new Error(" EERR1423: Error while deleting Serial Number "+error.message);
        }
    },

}