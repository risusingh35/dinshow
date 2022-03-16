'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getAppMenuByAppId: async function(data) {
        try {
            console.log(" data.EvolveUser_ID>>> ", data.EvolveUser_ID);
            console.log("data.EvolveRole_ID", data.EvolveRole_ID);
            console.log("data.data.EvolveMenu_AppId", data.EvolveMenu_AppId);

            // let dataTime = new Date();
            // return await Evolve.SqlPool.request()
            //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
            //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            //     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
            //     .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon , (SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID = @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned FROM EvolveMenu em WHERE em.EvolveMenu_AppId=@EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser=@EvolveUser_ID OR em.EvolveMenu_CreatedUser=0) AND em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')


            // let dataTime = new Date();
            // return await Evolve.SqlPool.request()
            //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
            //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            //     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
            //     .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon  FROM EvolveMenu em  ,  EvolveRoleToMenu erm , EvolveUserRoleLink eul WHERE em.EvolveMenu_AppId=@EvolveMenu_AppId AND  erm.EvolveRole_ID = eul.EvolveRole_ID AND eul.EvolveUser_ID = @EvolveUser_ID AND em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')




            // let dataTime = new Date();
            // return await Evolve.SqlPool.request()
            //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
            //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            //     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
            //     .query(' SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon FROM EvolveUserRoleLink eul  ,  EvolveMenu em , EvolveRoleToMenu erm WHere eul.EvolveUser_ID = @EvolveUser_ID AND erm.EvolveRole_ID = eul.EvolveRole_ID AND   erm.EvolveMenu_ID  = em.EvolveMenu_Id AND erm.EvolveApp_ID = @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')


            // let dataTime = new Date();
            // return await Evolve.SqlPool.request()
            //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
            //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            //     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
            //     .query('  SELECT * FROM EvolveMenu em INNER JOIN  EvolveRoleToMenu erm ON  erm.EvolveMenu_ID  = em.EvolveMenu_Id INNER JOIN   EvolveUserRoleLink eul ON  erm.EvolveRole_ID = eul.EvolveRole_ID  WHERE   eul.EvolveUser_ID = @EvolveUser_ID AND  erm.EvolveApp_ID = @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')


            // let dataTime = new Date();
            // return await Evolve.SqlPool.request()
            //     .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
            //     .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
            //     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
            //     .query(' SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon ,   (SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE  erm.EvolveApp_ID = @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned  FROM EvolveMenu em INNER JOIN  EvolveRoleToMenu erm   ON  erm.EvolveMenu_ID  = em.EvolveMenu_Id INNER JOIN   EvolveUserRoleLink eul ON  erm.EvolveRole_ID = eul.EvolveRole_ID  WHERE   eul.EvolveUser_ID = @EvolveUser_ID AND  erm.EvolveApp_ID = @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc ')


            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                // .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon ,(SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID =  @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned FROM EvolveMenu em INNER JOIN  EvolveRoleToMenu erm ON  erm.EvolveMenu_ID  = em.EvolveMenu_Id INNER JOIN   EvolveUserRoleLink eul ON  erm.EvolveRole_ID = eul.EvolveRole_ID  WHERE   eul.EvolveUser_ID =  @EvolveUser_ID AND  erm.EvolveApp_ID=  @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')


            .query('SELECT  em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon ,(SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID =  @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned  FROM EvolveMenu em WHERE em.EvolveMenu_AppId = @EvolveMenu_AppId AND  em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')



        } catch (error) {
            Evolve.Log.error(" EERR1405: Error while getting App Menu By App Id " + error.message);
            return new Error(" EERR1405: Error while getting App Menu By App Id " + error.message);
        }
    },
    getAllRoleListCount: async function(search) {
        try {
            return await Evolve.SqlPool.request(search)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(EvolveRole_ID) as count FROM EvolveRole WHERE EvolveRole_Name LIKE @search")
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting all role create count - Service " + error.message);
            return new Error(" EERR####: Error while getting all role create count - Service " + error.message);
        }
    },

    getAllRoleList: async function(start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT * FROM EvolveRole WHERE EvolveRole_Name LIKE @search ORDER BY EvolveRole_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting all role create list - Service " + error.message);
            return new Error(" EERR####: Error while getting all role create list - Service " + error.message);
        }
    },

    saveRoleData: async function(data) {
        try {
            let date = new Date();
            let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            return await Evolve.SqlPool.request()
                .input('EvolveRole_Code', Evolve.Sql.NVarChar, data.EvolveRole_Code)
                .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
                .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
                .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
                .input('EvolveRole_CreatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveRole_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' INSERT INTO EvolveRole (EvolveRole_Code , EvolveRole_Name, EvolveRole_Description, EvolveRole_IsActive, EvolveRole_CreatedAt, EvolveRole_CreatedUser, EvolveRole_UpdatedAt, EvolveRole_UpdatedUser) VALUES (@EvolveRole_Code , @EvolveRole_Name, @EvolveRole_Description, @EvolveRole_IsActive, @EvolveRole_CreatedAt, @EvolveRole_CreatedUser, @EvolveRole_UpdatedAt, @EvolveRole_UpdatedUser) ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Role - Service " + error.message);
            return new Error(" EERR####: Error while Save Role - Service " + error.message);
        }
    },

    getSingelRoleData: async function(data) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .query(' SELECT * FROM EvolveRole WHERE EvolveRole_ID = @EvolveRole_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Modify Role - Service " + error.message);
            return new Error(" EERR####: Error while Get Modify Role - Service " + error.message);
        }
    },

    modifyRoleData: async function(data) {
        try {
            let date = new Date();
            let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
                .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
                .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
                .input('EvolveRole_UpdatedAt', Evolve.Sql.NVarChar, dateTime)
                .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query(' UPDATE EvolveRole SET EvolveRole_Description = @EvolveRole_Description, EvolveRole_IsActive = @EvolveRole_IsActive, EvolveRole_UpdatedAt = @EvolveRole_UpdatedAt, EvolveRole_UpdatedUser = @EvolveRole_UpdatedUser WHERE EvolveRole_ID = @EvolveRole_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Modify Role - Service " + error.message);
            return new Error(" EERR####: Error while Get Modify Role - Service " + error.message);
        }
    },
    checkRole: async function(data) {
        try {

            return await Evolve.SqlPool.request()
                .input('EvolveRole_Code', Evolve.Sql.NVarChar, data.EvolveRole_Code)
                .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)

            .query(' SELECT EvolveRole_ID FROM EvolveRole WHERE EvolveRole_Code = @EvolveRole_Code OR EvolveRole_Name = @EvolveRole_Name  ');
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Modify Role - Service " + error.message);
            return new Error(" EERR####: Error while Get Modify Role - Service " + error.message);
        }
    },




}