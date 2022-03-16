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


            // let dataTime = new Date();
            console.log("data>>>>>", data);
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
    getAllRoleCount: async function(search) {
        try {
            return await Evolve.SqlPool.request(search)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(EvolveRole_ID) as count FROM EvolveRole WHERE EvolveRole_Name LIKE @search")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },

    getAllRole: async function(start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT er.*, em.EvolveMenu_Name FROM EvolveRole er LEFT JOIN EvolveMenu em ON em.EvolveMenu_Id = er.EvolveRole_DefaultMenu_ID WHERE EvolveRole_Name LIKE @search ORDER BY EvolveRole_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1406: Error while getting All Role " + error.message);
            return new Error(" EERR1406: Error while getting All Role " + error.message);
        }
    },

    appListForRole: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp')
        } catch (error) {
            Evolve.Log.error(" EERR1407: Error while app List For Role " + error.message);
            return new Error(" EERR1407: Error while app List For Role " + error.message);
        }
    },

    // updateRoleToMenu: async function(data) {
    //     try {
    //         let date = new Date();
    //         let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    //         let error = false;
    //         let roleToMenu = await Evolve.SqlPool.request()
    //             .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //             .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //             .query('SELECT * FROM EvolveRoleToMenu WHERE EvolveRole_ID=@EvolveRole_ID AND EvolveApp_ID = @EvolveApp_ID ');

    //         let already_role = roleToMenu.recordset;
    //         let old_menus = [];
    //         let new_menus = [];
    //         for (let i = 0; i < already_role.length; i++) {
    //             old_menus[i] = parseInt(already_role[i].EvolveMenu_ID);
    //         }
    //         for (let i = 0; i < data.selectedMenuArray.length; i++) {
    //             new_menus[i] = parseInt(data.selectedMenuArray[i])
    //         }

    //         var removed_menus = old_menus.filter(function(obj) { return new_menus.indexOf(obj) == -1; });
    //         var added_menus = new_menus.filter(function(obj) { return old_menus.indexOf(obj) == -1; });

    //         if (removed_menus.length > 0 || added_menus.length > 0) {
    //             for (let i = 0; i < removed_menus.length; i++) {
    //                 let remove_unit = await Evolve.SqlPool.request()
    //                     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //                     .input('EvolveMenu_ID', Evolve.Sql.Int, removed_menus[i])
    //                     .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //                     .query('DELETE FROM EvolveRoleToMenu WHERE EvolveRole_ID = @EvolveRole_ID AND EvolveMenu_ID = @EvolveMenu_ID AND EvolveApp_ID = @EvolveApp_ID')
    //                 if (remove_unit instanceof Error || remove_unit.rowsAffected < 1) {
    //                     error = true;
    //                 }
    //             }
    //             for (let i = 0; i < added_menus.length; i++) {
    //                 let roleToMenuCreate = await Evolve.SqlPool.request()
    //                     .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
    //                     .input('EvolveMenu_ID', Evolve.Sql.Int, added_menus[i])
    //                     .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
    //                     .input('EvolveRoleToMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
    //                     .input('EvolveRoleToMenu_CreatedAt', Evolve.Sql.NVarChar, dataTime)
    //                     .query('INSERT INTO EvolveRoleToMenu(EvolveRole_ID,EvolveMenu_ID,EvolveApp_ID,EvolveRoleToMenu_CreatedUser,EvolveRoleToMenu_CreatedAt) VALUES (@EvolveRole_ID,@EvolveMenu_ID,@EvolveApp_ID,@EvolveRoleToMenu_CreatedUser,@EvolveRoleToMenu_CreatedAt)');
    //                 if (roleToMenuCreate instanceof Error || roleToMenuCreate.rowsAffected < 1) {
    //                     error = true;
    //                 }
    //             }
    //         }
    //         return true;
    //     } catch (error) {
    //         Evolve.Log.error(" EERR1408: Error while updating Role To Menu " + error.message);
    //         return new Error(" EERR1408: Error while updating Role To Menu " + error.message);
    //     }
    // },

    updateRoleToMenu: async function(data) {
        try {
            console.log("data????????????????", data);
            let date = new Date();
            let dataTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let error = false;
            let roleToMenu = await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
                .query('SELECT * FROM EvolveRoleToMenu WHERE EvolveRole_ID=@EvolveRole_ID AND EvolveApp_ID = @EvolveApp_ID ');

            let already_role = roleToMenu.recordset;
            let old_menus = [];
            let new_menus = [];
            for (let i = 0; i < already_role.length; i++) {
                old_menus[i] = parseInt(already_role[i].EvolveMenu_ID);
            }
            for (let i = 0; i < data.selectedMenuArray.length; i++) {
                new_menus[i] = parseInt(data.selectedMenuArray[i])
            }

            var removed_menus = old_menus.filter(function(obj) { return new_menus.indexOf(obj) == -1; });
            var added_menus = new_menus.filter(function(obj) { return old_menus.indexOf(obj) == -1; });

            if (removed_menus.length > 0 || added_menus.length > 0) {
                for (let i = 0; i < removed_menus.length; i++) {
                    let remove_unit = await Evolve.SqlPool.request()
                        .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                        .input('EvolveMenu_ID', Evolve.Sql.Int, removed_menus[i])
                        .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
                        .query('DELETE FROM EvolveRoleToMenu WHERE EvolveRole_ID = @EvolveRole_ID AND EvolveMenu_ID = @EvolveMenu_ID AND EvolveApp_ID = @EvolveApp_ID')
                    if (remove_unit instanceof Error || remove_unit.rowsAffected < 1) {
                        error = true;
                    }
                }
                for (let i = 0; i < added_menus.length; i++) {
                    let roleToMenuCreate = await Evolve.SqlPool.request()
                        .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                        .input('EvolveMenu_ID', Evolve.Sql.Int, added_menus[i])
                        .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
                        .input('EvolveRoleToMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                        .input('EvolveRoleToMenu_CreatedAt', Evolve.Sql.NVarChar, dataTime)
                        .query('INSERT INTO EvolveRoleToMenu(EvolveRole_ID,EvolveMenu_ID,EvolveApp_ID,EvolveRoleToMenu_CreatedUser,EvolveRoleToMenu_CreatedAt) VALUES (@EvolveRole_ID,@EvolveMenu_ID,@EvolveApp_ID,@EvolveRoleToMenu_CreatedUser,@EvolveRoleToMenu_CreatedAt)');
                    if (roleToMenuCreate instanceof Error || roleToMenuCreate.rowsAffected < 1) {
                        error = true;
                    }
                }
            }
            return true;
        } catch (error) {
            Evolve.Log.error(" EERR1408: Error while updating Role To Menu " + error.message);
            return new Error(" EERR1408: Error while updating Role To Menu " + error.message);
        }
    },

    createRole: async function(data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
                .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
                .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
                .input('EvolveRole_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveRole_DefaultMenu_ID)
                .input('EvolveRole_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveRole (EvolveRole_Name,EvolveRole_Description,EvolveRole_IsActive,EvolveRole_CreatedUser,EvolveRole_CreatedAt,EvolveRole_UpdatedUser,EvolveRole_UpdatedAt,EvolveRole_DefaultMenu_ID) VALUES (@EvolveRole_Name,@EvolveRole_Description,@EvolveRole_IsActive,@EvolveRole_CreatedUser,@EvolveRole_CreatedAt,@EvolveRole_UpdatedUser,@EvolveRole_UpdatedAt, @EvolveRole_DefaultMenu_ID);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR1409: Error while creating Role " + error.message);
            return new Error(" EERR1409: Error while creating Role " + error.message);
        }
    },

    selectSingleRole: async function(id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('SELECT er.*,em.EvolveMenu_AppId FROM EvolveRole er LEFT JOIN EvolveMenu em ON em.EvolveMenu_Id = er.EvolveRole_DefaultMenu_ID WHERE EvolveRole_ID = @id')
        } catch (error) {
            Evolve.Log.error(" EERR1410: Error while selecting Single Role " + error.message);
            return new Error(" EERR1410: Error while selecting Single Role " + error.message);
        }
    },

    updateRole: async function(data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.NVarChar, data.EvolveRole_ID)
                .input('EvolveRole_Name', Evolve.Sql.NVarChar, data.EvolveRole_Name)
                .input('EvolveRole_Description', Evolve.Sql.NVarChar, data.EvolveRole_Description)
                .input('EvolveRole_DefaultMenu_ID', Evolve.Sql.Int, data.EvolveRole_DefaultMenu_ID)
                .input('EvolveRole_IsActive', Evolve.Sql.Bit, data.EvolveRole_IsActive)
                .input('EvolveRole_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('UPDATE EvolveRole SET EvolveRole_Name = @EvolveRole_Name , EvolveRole_Description = @EvolveRole_Description , EvolveRole_IsActive = @EvolveRole_IsActive , EvolveRole_UpdatedUser = @EvolveRole_UpdatedUser , EvolveRole_UpdatedAt = @EvolveRole_UpdatedAt, EvolveRole_DefaultMenu_ID = @EvolveRole_DefaultMenu_ID WHERE EvolveRole_ID = @EvolveRole_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1411: Error while updating Role " + error.message);
            return new Error(" EERR1411: Error while updating Role " + error.message);
        }
    },

    deleteRole: async function(id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveRole WHERE EvolveRole_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1412: Error while deleting Role " + error.message);
            return new Error(" EERR1412: Error while deleting Role " + error.message);
        }
    },
    getDefaultMenuList: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
                .query("SELECT EvolveMenu_Id, EvolveMenu_Name FROM EvolveMenu WHERE EvolveMenu_AppId = @EvolveMenu_AppId AND EvolveMenu_IsActive = 'true'");
        } catch (error) {
            Evolve.Log.error(" EERR1413: Error while getting Default Menu List " + error.message);
            return new Error(" EERR1413: Error while getting Default Menu List " + error.message);
        }
    },


}