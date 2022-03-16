'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getAppMenuByAppId: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
                .input('EvolveUser_ID', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .query('SELECT em.EvolveMenu_Id, em.EvolveMenu_Desc, em.EvolveMenu_Name , em.EvolveMenu_Index, em.EvolveMenu_Parent, em.EvolveMenu_Url, em.EvolveMenu_IsActive, em.EvolveMenu_AppId,em.EvolveMenu_Icon , (SELECT COUNT(erm.EvolveMenu_ID) FROM EvolveRoleToMenu erm WHERE erm.EvolveRole_ID = @EvolveRole_ID AND erm.EvolveApp_ID = @EvolveMenu_AppId AND erm.EvolveMenu_ID = em.EvolveMenu_Id) as assigned FROM EvolveMenu em WHERE em.EvolveMenu_AppId=@EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser=@EvolveUser_ID OR em.EvolveMenu_CreatedUser=0) AND em.EvolveMenu_IsActive = 1 ORDER BY em.EvolveMenu_Index asc')
        } catch (error) {
            Evolve.Log.error(" EERR1451: Error while getting App Menu By App Id "+error.message);
            return new Error(" EERR1451: Error while getting App Menu By App Id "+error.message);
        }
    },

    
    getAllConversationCount : async function () {
        try {
          return await Evolve.SqlPool.request()
            .query("SELECT COUNT(euc.EvolveUomConv_ID) as count FROM EvolveItem ei , EvolveUomConv euc , EvolveUom eom WHERE ei.EvolveItem_ID = euc.EvolveItem_ID AND eom.EvolveUom_ID = euc.EvolveUom_ID ")
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },
    getAllConversationList: async function (start ,length) {
        try {
            return await Evolve.SqlPool.request()
                .input('start',Evolve.Sql.Int,start)
                .input('length',Evolve.Sql.Int,length)
                .query('SELECT  euc.EvolveUomConv_ID ,ei.EvolveItem_Code , eom.EvolveUom_Uom AS Uom,(SELECT EvolveUom_Uom FROM EvolveUom WHERE  EvolveUom_ID = euc.EvolveUomConv_AlternateUom_ID) AS AlternateUom,euc.EvolveUomConv_Conversion  FROM EvolveItem ei , EvolveUomConv euc , EvolveUom eom WHERE ei.EvolveItem_ID = euc.EvolveItem_ID AND eom.EvolveUom_ID = euc.EvolveUom_ID ORDER BY euc.EvolveUomConv_ID DESC  OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
        } catch (error) {
            Evolve.Log.error(" EERR1452: Error while getting All Conversation List "+error.message);
            return new Error(" EERR1452: Error while getting All Conversation List "+error.message);
        }
    },

    getUomList: async function () {
        try {
            return await Evolve.SqlPool.request()

                .query('  SELECT EvolveUom_ID  , EvolveUom_Uom  FROM EvolveUom  ');
        } catch (error) {
            Evolve.Log.error(" EERR1453: Error while getting Uom List "+error.message);
            return new Error(" EERR1453: Error while getting Uom List "+error.message);
        }
    },


    appListForRole: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp')
        } catch (error) {
            Evolve.Log.error(" EERR1454: Error while app List For Role "+error.message);
            return new Error(" EERR1454: Error while app List For Role "+error.message);
        }
    },

    // updateRoleToMenu: async function (data) {
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

    //         var removed_menus = old_menus.filter(function (obj) { return new_menus.indexOf(obj) == -1; });
    //         var added_menus = new_menus.filter(function (obj) { return old_menus.indexOf(obj) == -1; });

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
    //         Evolve.Log.error("  "+error.message);
    //         return new Error("  "+error.message);
    //     }
    // },

    createUomConversation: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveUomConv_AlternateUom_ID', Evolve.Sql.Int, data.EvolveUomConv_AlternateUom_ID)

                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)

                .input('EvolveUomConv_Conversion', Evolve.Sql.NVarChar, data.EvolveUomConv_Conversion)

                .input('EvolveUomConv_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUomConv_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveUomConv_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUomConv_UpdateAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveUomConv (EvolveUom_ID,EvolveUomConv_AlternateUom_ID,EvolveItem_ID,EvolveUomConv_Conversion,EvolveUomConv_CreatedUser,EvolveUomConv_CreatedAt , EvolveUomConv_UpdateUser ,EvolveUomConv_UpdateAt) VALUES (@EvolveUom_ID,@EvolveUomConv_AlternateUom_ID,@EvolveItem_ID,@EvolveUomConv_Conversion,@EvolveUomConv_CreatedUser,@EvolveUomConv_CreatedAt ,@EvolveUomConv_UpdateUser ,@EvolveUomConv_UpdateAt)');
        } catch (error) {
            Evolve.Log.error(" EERR1455: Error while creating Uom Conversation "+error.message);
            return new Error(" EERR1455: Error while creating Uom Conversation "+error.message);
        }
    },

    checkExistingConversion: async function (data) {
        try {
            let dataTime = new Date();

            return await Evolve.SqlPool.request()
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveUomConv_AlternateUom_ID', Evolve.Sql.Int, data.EvolveUomConv_AlternateUom_ID)

                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)

                .query('SELECT * FROM  EvolveUomConv WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveUomConv_AlternateUom_ID=@EvolveUomConv_AlternateUom_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1456: Error while checking Existing Conversion "+error.message);
            return new Error(" EERR1456: Error while checking Existing Conversion "+error.message);
        }
    },

    checkExistingConversiononUpdate: async function (data) {
        try {
            let dataTime = new Date();

            return await Evolve.SqlPool.request()
                .input('EvolveUomConv_ID', Evolve.Sql.Int, data.EvolveUomConv_ID)
                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveUomConv_AlternateUom_ID', Evolve.Sql.Int, data.EvolveUomConv_AlternateUom_ID)

                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)

                .query('SELECT * FROM  EvolveUomConv WHERE EvolveItem_ID = @EvolveItem_ID AND EvolveUomConv_AlternateUom_ID=@EvolveUomConv_AlternateUom_ID AND EvolveUomConv_ID != @EvolveUomConv_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR1457: Error while checking Existing Conversion on Update "+error.message);
            return new Error(" EERR1457: Error while checking Existing Conversion on Update "+error.message);
        }
    },


    updateConversion: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveUomConv_ID', Evolve.Sql.Int, data.EvolveUomConv_ID)

                .input('EvolveUom_ID', Evolve.Sql.Int, data.EvolveUom_ID)
                .input('EvolveUomConv_AlternateUom_ID', Evolve.Sql.Int, data.EvolveUomConv_AlternateUom_ID)

                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)

                .input('EvolveUomConv_Conversion', Evolve.Sql.NVarChar, data.EvolveUomConv_Conversion)


                .input('EvolveUomConv_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUomConv_UpdateAt', Evolve.Sql.DateTime, dataTime)

                .query('UPDATE EvolveUomConv SET  EvolveUom_ID =@EvolveUom_ID ,EvolveUomConv_AlternateUom_ID=@EvolveUomConv_AlternateUom_ID , EvolveItem_ID =@EvolveItem_ID ,  EvolveUomConv_Conversion =@EvolveUomConv_Conversion,  EvolveUomConv_UpdateUser =@EvolveUomConv_UpdateUser ,  EvolveUomConv_UpdateAt =@EvolveUomConv_UpdateAt WHERE EvolveUomConv_ID =@EvolveUomConv_ID  ')
        } catch (error) {
            Evolve.Log.error(" EERR1458: Error while updating Conversion "+error.message);
            return new Error(" EERR1458: Error while updating Conversion "+error.message);
        }
    },



    selectSingleConversation: async function (EvolveUomConv_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUomConv_ID', Evolve.Sql.Int, EvolveUomConv_ID)
                .query('SELECT euomc.*, uom.EvolveUom_Uom as fromUom FROM EvolveUomConv euomc, EvolveUom uom WHERE euomc.EvolveUomConv_ID = @EvolveUomConv_ID AND euomc.EvolveUom_ID = uom.EvolveUom_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1459: Error while selecting Single Conversation "+error.message);
            return new Error(" EERR1459: Error while selecting Single Conversation "+error.message);
        }
    },



    deleteRole: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveRole WHERE EvolveRole_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1460: Error while deleting role "+error.message);
            return new Error(" EERR1460: Error while deleting role "+error.message);
        }
    },



    getdefaultUom: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_ID', Evolve.Sql.Int, data.EvolveItem_ID)


                .query(' SELECT euom.EvolveUom_Uom , ei.EvolveUom_ID  FROM EvolveUom euom ,EvolveItem ei WHERE EvolveItem_ID =@EvolveItem_ID AND ei.EvolveUom_ID = euom.EvolveUom_ID');
        } catch (error) {
            Evolve.Log.error(" EERR1461: Error getting getting default Uom "+error.message);
            return new Error(" EERR1461: Error getting getting default Uom "+error.message);
        }
    },

}