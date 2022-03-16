'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMdiIconList: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT DISTINCT EvolveMenu_Icon FROM EvolveMenu')
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while Assign Role To Menu " + error.message);
            return new Error(" EERR#### Error while Assign Role To Menu " + error.message);
        }
    },

    getAllMenuTypeListCount: async function (search) {
        try {
            return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query('  SELECT COUNT(EvolveMenuType_ID) as count  FROM EvolveMenuType WHERE EvolveMenuType_Type LIKE @search');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get menu type Count "+error.message);
            return new Error(" EERR####: Error while get menu type Count "+error.message);
        }
    },

    getAllMenuTypeList: async function (start, length ,search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
                .query('SELECT * FROM EvolveMenuType WHERE EvolveMenuType_Type LIKE @search ORDER BY EvolveMenuType_ID DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get menu type list"+error.message);
            return new Error(" EERR####: Error while get menu type list"+error.message);
        }
    },

    getSingleMenuTypeDetails: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('SELECT * FROM EvolveMenuType WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single menu type details "+error.message);
            return new Error(" EERR####: Error while get single menu type details "+error.message);
        }
    },
    
    getSeqenceId: async function () {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT  MAX(EvolveApp_SEQ)+1 as EvolveApp_SEQ FROM  EvolveApp');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting sequence id "+error.message);
            return new Error(" EERR####: Error while getting sequence id "+error.message);
        }
    },

    
    checkExistingMenuType: async function (data) {
        console.log("data.condition>>> " ,  data.condition)
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_Type', Evolve.Sql.NVarChar, data.EvolveMenuType_Type)
                .query('SELECT  EvolveMenuType_ID FROM EvolveMenuType  WHERE EvolveMenuType_Type=@EvolveMenuType_Type '+data.condition);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Check Existing Menu Type "+error.message);
            return new Error(" EERR####: Error while Check Existing Menu Type "+error.message);
        }
    },



    createMenuType: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {

            console.log('data????' ,  data)
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_Type', Evolve.Sql.NVarChar, data.EvolveMenuType_Type)
                .input('EvolveMenuType_Description', Evolve.Sql.NVarChar, data.EvolveMenuType_Description)
                .input('EvolveMenuType_Icon', Evolve.Sql.NVarChar, data.EvolveMenuType_Icon)
                .input('EvolveMenuType_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMenuType_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMenuType_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMenuType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('INSERT INTO EvolveMenuType (EvolveMenuType_Type, EvolveMenuType_Description, EvolveMenuType_Icon, EvolveMenuType_CreatedAt, EvolveMenuType_CreatedUser, EvolveMenuType_UpdatedAt, EvolveMenuType_UpdatedUser) VALUES (@EvolveMenuType_Type, @EvolveMenuType_Description, @EvolveMenuType_Icon, @EvolveMenuType_CreatedAt, @EvolveMenuType_CreatedUser, @EvolveMenuType_UpdatedAt, @EvolveMenuType_UpdatedUser)');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Create Menu Type "+error.message);
            return new Error(" EERR####: Error while Create Menu Type "+error.message);
        }
    },

    upateMenuType: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {

            console.log('data????' ,  data)
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.NVarChar, data.EvolveMenuType_ID)

                .input('EvolveMenuType_Type', Evolve.Sql.NVarChar, data.EvolveMenuType_Type)
                .input('EvolveMenuType_Description', Evolve.Sql.NVarChar, data.EvolveMenuType_Description)
                .input('EvolveMenuType_Icon', Evolve.Sql.NVarChar, data.EvolveMenuType_Icon)
                .input('EvolveMenuType_UpdatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveMenuType_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveMenuType SET EvolveMenuType_Type=@EvolveMenuType_Type , EvolveMenuType_Description=@EvolveMenuType_Description , EvolveMenuType_Icon=@EvolveMenuType_Icon , EvolveMenuType_UpdatedAt =@EvolveMenuType_UpdatedAt , EvolveMenuType_UpdatedUser=@EvolveMenuType_UpdatedUser  WHERE EvolveMenuType_ID=@EvolveMenuType_ID  ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Update Menu Type "+error.message);
            return new Error(" EERR####: Error while Update Menu Type "+error.message);
        }
    },



    checkSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.Int, EvolveApp_SEQ)
                .query(' SELECT * FROM EvolveApp WHERE EvolveApp_SEQ = @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while checking sequence number "+error.message);
            return new Error(" EERR####: Error while checking sequence number "+error.message);
        }
    },

    updateSeqNumber : async function (EvolveApp_SEQ) {
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_SEQ', Evolve.Sql.NVarChar, EvolveApp_SEQ)
            .query(' UPDATE EvolveApp set EvolveApp_SEQ = EvolveApp_SEQ+1 WHERE EvolveApp_SEQ >= @EvolveApp_SEQ ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating seq number "+error.message);
            return new Error(" EERR####: Error while updating seq number "+error.message);
        }
    },

    updateApp: async function (data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
            .input('EvolveApp_ID', Evolve.Sql.NVarChar, data.EvolveApp_ID)
            .input('EvolveApp_Code', Evolve.Sql.NVarChar, data.EvolveApp_Code)
            .input('EvolveApp_Name', Evolve.Sql.NVarChar, data.EvolveApp_Name)
            .input('EvolveApp_Description', Evolve.Sql.NVarChar, data.EvolveApp_Description)
            .input('EvolveApp_Url', Evolve.Sql.NVarChar, data.EvolveApp_Url)
            .input('EvolveApp_SEQ', Evolve.Sql.Int, data.EvolveApp_SEQ)
            .input('EvolveApp_Status', Evolve.Sql.NVarChar, data.EvolveApp_Status)
            .input('EvolveApp_Icon', Evolve.Sql.NVarChar, data.EvolveApp_Icon)
            .input('EvolveApp_UpdatedAt', Evolve.Sql.NVarChar, datetime)
            .input('EvolveApp_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('UPDATE EvolveApp SET EvolveApp_Code = @EvolveApp_Code, EvolveApp_Name = @EvolveApp_Name, EvolveApp_Description = @EvolveApp_Description, EvolveApp_Url = @EvolveApp_Url, EvolveApp_SEQ = @EvolveApp_SEQ, EvolveApp_Status = @EvolveApp_Status, EvolveApp_Icon = @EvolveApp_Icon, EvolveApp_UpdatedAt = @EvolveApp_UpdatedAt, EvolveApp_UpdatedUser = @EvolveApp_UpdatedUser WHERE EvolveApp_ID = @EvolveApp_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while updating App "+error.message);
            return new Error(" EERR####: Error while updating App "+error.message);
        }
    },
    deleteMenuType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('DELETE FROM EvolveMenuType WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete  menu type details "+error.message);
            return new Error(" EERR####: Error while delete  menu type details "+error.message);
        }
    },

    checkMenuLinkedToType: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .query('SELECT  EvolveMenu_Id  FROM EvolveMenu  WHERE EvolveMenuType_ID = @EvolveMenuType_ID');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check menu  linked with  the item type "+error.message);
            return new Error(" EERR####: Error while check menu  linked with  the item type "+error.message);
        }
    },


}