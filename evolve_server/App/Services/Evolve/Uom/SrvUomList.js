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
            Evolve.Log.error(" EERR1462: Error while getting App Menu By App Id "+error.message);
            return new Error(" EERR1462: Error while getting App Menu By App Id "+error.message);
        }
    },
    getAllUomListCount : async function (search) {
        try {
          return await Evolve.SqlPool.request()
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .query("SELECT COUNT(EvolveUom_ID) as count FROM EvolveUom WHERE EvolveUom_Uom LIKE @search OR  EvolveUom_Type LIKE @search" )
        } catch (error) {
          Evolve.Log.error(error.message);
          return new Error(error.message);
        }
      },

    getAllUomList: async function (start ,length,search) {
        try {
            return await Evolve.SqlPool.request()
            .input('start',Evolve.Sql.Int,start)
            .input('search', Evolve.Sql.NVarChar, '%'+search+'%')
            .input('length',Evolve.Sql.Int,length)
             .query('SELECT *  FROM EvolveUom WHERE EvolveUom_Uom LIKE @search OR  EvolveUom_Type LIKE @search ORDER BY  EvolveUom_ID OFFSET @start ROWS FETCH NEXT @length ROWS ONLY ');
        } catch (error) {
            Evolve.Log.error(" EERR1463: Error while getting All Uom List "+error.message);
            return new Error(" EERR1463: Error while getting All Uom List "+error.message);
        }
    },

    appListForRole: async function (data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp')
        } catch (error) {
            Evolve.Log.error(" EERR1464: Error in app List For Role "+error.message);
            return new Error(" EERR1464: Error in app List For Role "+error.message);
        }
    },

    updateRoleToMenu: async function (data) {
        try {
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

            var removed_menus = old_menus.filter(function (obj) { return new_menus.indexOf(obj) == -1; });
            var added_menus = new_menus.filter(function (obj) { return old_menus.indexOf(obj) == -1; });

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
            Evolve.Log.error(" EERR1465: Error while updating Role To Menu "+error.message);
            return new Error(" EERR1465: Error while updating Role To Menu "+error.message);
        }
    },

    createUom: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveUom_Type', Evolve.Sql.NVarChar, data.EvolveUom_Type)
                .input('EvolveUom_Uom', Evolve.Sql.NVarChar, data.EvolveUom_Uom)
                .input('EvolveUom_Domain', Evolve.Sql.NVarChar, data.EvolveUom_Domain)
                .input('EvolveUom_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUom_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveUom_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveUom_UpdateAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveUom (EvolveUom_Type,EvolveUom_Uom,EvolveUom_Domain,EvolveUom_CreatedUser,EvolveUom_CreatedAt,EvolveUom_UpdateUser,EvolveUom_UpdateAt) VALUES (@EvolveUom_Type,@EvolveUom_Uom,@EvolveUom_Domain,@EvolveUom_CreatedUser,@EvolveUom_CreatedAt,@EvolveUom_UpdateUser,@EvolveUom_UpdateAt);select @@IDENTITY AS \'inserted_id\'');
        } catch (error) {
            Evolve.Log.error(" EERR1466: Error while creating Uom "+error.message);
            return new Error(" EERR1466: Error while creating Uom "+error.message);
        }
    },

    selectSingleUom: async function (EvolveUom_ID) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUom_ID', Evolve.Sql.Int, EvolveUom_ID)
                .query('SELECT * FROM EvolveUom WHERE EvolveUom_ID = @EvolveUom_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1467: Error while select Single Uom "+error.message);
            return new Error(" EERR1467: Error while select Single Uom "+error.message);
        }
    },

    updateUom: async function (data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
            .input('EvolveUom_Type', Evolve.Sql.NVarChar, data.EvolveUom_Type)
            .input('EvolveUom_Uom', Evolve.Sql.NVarChar, data.EvolveUom_Uom)
            .input('EvolveUom_Domain', Evolve.Sql.NVarChar, data.EvolveUom_Domain)
            .input('EvolveUom_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveUom_UpdateAt', Evolve.Sql.DateTime, dataTime)
                .query('UPDATE EvolveUom SET EvolveUom_Type = @EvolveUom_Type , EvolveUom_Uom = @EvolveUom_Uom ,EvolveUom_Domain=@EvolveUom_Domain, EvolveUom_UpdateUser = @EvolveUom_UpdateUser , EvolveUom_UpdateAt = @EvolveUom_UpdateAt  WHERE EvolveUom_ID = '+data.EvolveUom_ID);
        } catch (error) {
            Evolve.Log.error(" EERR1468: Error while update Uom "+error.message);
            return new Error(" EERR1468: Error while update Uom "+error.message);
        }
    },

    deleteRole: async function (id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveRole WHERE EvolveRole_ID =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1469: Error while deleting Role "+error.message);
            return new Error(" EERR1469: Error while deleting Role "+error.message);
        }
    },

    // DOA UOM CSV Upload -- start
    
    getItemId : async function (EvolveItem_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveItem_Code', Evolve.Sql.NVarChar, EvolveItem_Code)
                .query(' SELECT * FROM EvolveItem WHERE EvolveItem_Code = @EvolveItem_Code ')
        } catch (error) {
            Evolve.Log.error(" EERR1469: Error while checking item code "+error.message);
            return new Error(" EERR1469: Error while checking item code "+error.message);
        }
    },

    checkUomExist : async function (EvolveUom_Uom) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUom_Uom', Evolve.Sql.NVarChar, EvolveUom_Uom)
                .query(' SELECT * FROM EvolveUom WHERE EvolveUom_Uom = @EvolveUom_Uom ')
        } catch (error) {
            Evolve.Log.error(" EERR1469: Error while checking uom exist "+error.message);
            return new Error(" EERR1469: Error while checking uom exist "+error.message);
        }
    },

    addUom : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUom_Uom', Evolve.Sql.NVarChar, data['UM'])
                .input('EvolveUom_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUom_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUom_CreatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .input('EvolveUom_UpdateUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .query(' INSERT INTO EvolveUom (EvolveUom_Uom, EvolveUom_CreatedAt, EvolveUom_UpdateAt, EvolveUom_CreatedUser, EvolveUom_UpdateUser) VALUES (@EvolveUom_Uom, @EvolveUom_CreatedAt, @EvolveUom_UpdateAt, @EvolveUom_CreatedUser,@EvolveUom_UpdateUser) ; select @@IDENTITY AS \'inserted_id\'')
        } catch (error) {
            Evolve.Log.error(" EERR1469: Error while adding uom "+error.message);
            return new Error(" EERR1469: Error while adding uom "+error.message);
        }
    },

    addUomConv : async function (EvolveUser_ID, data) {
        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUom_ID', Evolve.Sql.NVarChar, data['EvolveUom_ID'])
                .input('EvolveItem_ID', Evolve.Sql.NVarChar, data['EvolveItem_ID'])
                .input('EvolveUomConv_Conversion', Evolve.Sql.NVarChar, data['UM Conversion'])
                .input('EvolveUomConv_CreatedAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUomConv_UpdateAt', Evolve.Sql.NVarChar, datetime)
                .input('EvolveUomConv_CreatedUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .input('EvolveUomConv_UpdateUser', Evolve.Sql.NVarChar, EvolveUser_ID)
                .query(' INSERT INTO EvolveUomConv (EvolveUom_ID, EvolveItem_ID, EvolveUomConv_Conversion, EvolveUomConv_CreatedAt, EvolveUomConv_UpdateAt, EvolveUomConv_CreatedUser, EvolveUomConv_UpdateUser) VALUES (@EvolveUom_ID, @EvolveItem_ID, @EvolveUomConv_Conversion, @EvolveUomConv_CreatedAt, @EvolveUomConv_UpdateAt, @EvolveUomConv_CreatedUser, @EvolveUomConv_UpdateUser) ')
        } catch (error) {
            Evolve.Log.error(" EERR1469: Error while adding uom convrsion "+error.message);
            return new Error(" EERR1469: Error while adding uom convrsion "+error.message);
        }
    },

    updateUomCsv : async function (data) {
        console.log("data>>>>>", data);
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
            .input('EvolveUom_ID', Evolve.Sql.NVarChar, data['EvolveUom_ID'])
            .input('EvolveUom_Uom', Evolve.Sql.NVarChar, data['UM'])
            .input('EvolveUom_UpdateUser', Evolve.Sql.Int, data.EvolveUser_ID)
            .input('EvolveUom_UpdateAt', Evolve.Sql.DateTime, dataTime)
                .query(' UPDATE EvolveUom SET EvolveUom_Uom = @EvolveUom_Uom, EvolveUom_UpdateUser = @EvolveUom_UpdateUser , EvolveUom_UpdateAt = @EvolveUom_UpdateAt  WHERE EvolveUom_ID = @EvolveUom_ID ');
        } catch (error) {
            Evolve.Log.error(" EERR1468: Error while update Uom "+error.message);
            return new Error(" EERR1468: Error while update Uom "+error.message);
        }
    },

    // DOA UOM CSV Upload -- start


}