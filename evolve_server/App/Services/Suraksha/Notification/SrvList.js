'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getNotifCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('  SELECT COUNT(EvolveNotif_ID) as count  FROM EvolveNotif WHERE EvolveNotif_Msg LIKE @search OR EvolveNotif_Code LIKE @search ');
        } catch (error) {
            Evolve.Log.error(" Error while get notification count " + error.message);
            return new Error(" Error while get notification count " + error.message);
        }
        
    },
    getNotifList: async function (start, length, search) {
        try {

            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT * FROM EvolveNotif WHERE EvolveNotif_Msg LIKE @search OR EvolveNotif_Code LIKE @search ORDER BY EvolveNotif_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error("  Error while getting All Reason List " + error.message);
            return new Error("  Error while getting All Reason List " + error.message);
        }
    },

    checkNotif: async function (data) {
        try {
            
            return await Evolve.SqlPool.request()
                .input('EvolveNotif_Code', Evolve.Sql.NVarChar, data.EvolveNotif_Code)
                .input('EvolveNotif_Type', Evolve.Sql.NVarChar, data.EvolveNotif_Type)
                .query("SELECT COUNT(EvolveNotif_ID) as count from EvolveNotif WHERE EvolveNotif_Code = @EvolveNotif_Code AND EvolveNotif_Type = @EvolveNotif_Type")
        } catch (error) {
            Evolve.Log.error("  Error while check existing notification " + error.message);
            return new Error("  Error while check existing notification " + error.message);
        }
    },

    createNotif: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveNotif_Msg', Evolve.Sql.NVarChar, data.EvolveNotif_Msg)
                .input('EvolveNotif_Code', Evolve.Sql.NVarChar, data.EvolveNotif_Code)
                // .input('EvolveNotif_Desc', Evolve.Sql.NVarChar, data.EvolveNotif_Desc)
                .input('EvolveNotif_Type', Evolve.Sql.NVarChar, data.EvolveNotif_Type)
                .input('EvolveNotif_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveNotif_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveNotif_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveNotif_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    
                .query("INSERT INTO EvolveNotif (EvolveNotif_Msg,EvolveNotif_Code,EvolveNotif_Type ,EvolveNotif_CreatedAt,EvolveNotif_CreatedUser,EvolveNotif_UpdatedAt,EvolveNotif_UpdatedUser) VALUES (@EvolveNotif_Msg,@EvolveNotif_Code,@EvolveNotif_Type , @EvolveNotif_CreatedAt ,@EvolveNotif_CreatedUser,@EvolveNotif_UpdatedAt,@EvolveNotif_UpdatedUser)");
        } catch (error) {
            Evolve.Log.error("  Error while create Notification " + error.message);
            return new Error("  Error while create Notification " + error.message);
        }
    },
    selectSinglNotif: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveNotif_ID', Evolve.Sql.Int, data.EvolveNotif_ID)
                .query('SELECT  * FROM  EvolveNotif WHERE EvolveNotif_ID =@EvolveNotif_ID');
        } catch (error) {
            Evolve.Log.error("  Error while selecting Single Reason " + error.message);
            return new Error("  Error while selecting Single Reason " + error.message);
        }
    },

    checkUpdateNotif: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveNotif_Code', Evolve.Sql.NVarChar, data.EvolveNotif_Code)
                .input('EvolveNotif_Type', Evolve.Sql.NVarChar, data.EvolveNotif_Type)

                .input('EvolveNotif_ID', Evolve.Sql.Int, data.EvolveNotif_ID)
                .query("SELECT COUNT(EvolveNotif_ID) as count from EvolveNotif WHERE EvolveNotif_Code = @EvolveNotif_Code AND EvolveNotif_Type=@EvolveNotif_Type and EvolveNotif_ID != @EvolveNotif_ID")
        } catch (error) {
            Evolve.Log.error("  Error while check notification " + error.message);
            return new Error("  Error while check notification " + error.message);
        }
    },
    updateNotif: async function (data) {
        try {
			let dataTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            return await Evolve.SqlPool.request()
                .input('EvolveNotif_ID', Evolve.Sql.Int, data.EvolveNotif_ID)
                .input('EvolveNotif_Msg', Evolve.Sql.NVarChar, data.EvolveNotif_Msg)
                .input('EvolveNotif_Code', Evolve.Sql.NVarChar, data.EvolveNotif_Code)
                // .input('EvolveNotif_Desc', Evolve.Sql.NVarChar, data.EvolveNotif_Desc)
                .input('EvolveNotif_Type', Evolve.Sql.NVarChar, data.EvolveNotif_Type)
                .input('EvolveNotif_UpdatedAt', Evolve.Sql.NVarChar, dataTime)
                .input('EvolveNotif_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query("UPDATE EvolveNotif SET EvolveNotif_Msg=@EvolveNotif_Msg  ,EvolveNotif_Code=@EvolveNotif_Code ,  EvolveNotif_Type=@EvolveNotif_Type ,EvolveNotif_UpdatedAt=@EvolveNotif_UpdatedAt ,  EvolveNotif_UpdatedUser=@EvolveNotif_UpdatedUser WHERE EvolveNotif_ID=@EvolveNotif_ID   ")
      
   
        } catch (error) {
            Evolve.Log.error("  Error while updating Reason " + error.message);
            return new Error("  Error while updating Reason " + error.message);
        }
    },
}























