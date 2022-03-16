'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllMenulistCount: async function(id, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_id', Evolve.Sql.Int, id)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query("SELECT COUNT(em.EvolveMenu_Id) as count  FROM EvolveMenu em , EvolveApp ea WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser =@EvolveUser_id OR em.EvolveMenu_CreatedUser IS NULL ) AND EvolveMenu_Name LIKE @search")
        } catch (error) {
            Evolve.Log.error(error.message);
            return new Error(error.message);
        }
    },
    // getAllMenulist: async function (id, start, length, search) {
    //     try {
    //         return await Evolve.SqlPool.request()
    //             .input('EvolveUser_id', Evolve.Sql.Int, id)
    //             .input('start', Evolve.Sql.Int, start)
    //             .input('length', Evolve.Sql.Int, length)
    //             .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
    //             .query('SELECT ea.EvolveApp_Name, em.*, (SELECT emj.EvolveMenu_Name FROM EvolveMenu emj WHERE em.EvolveMenu_Parent = emj.EvolveMenu_Id) as parent FROM EvolveMenu em , EvolveApp ea WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId AND (em.EvolveMenu_CreatedUser =@EvolveUser_id OR em.EvolveMenu_CreatedUser IS NULL ) AND  em.EvolveMenu_Name LIKE @search ORDER BY em.EvolveMenu_Id OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
    //     } catch (error) {
    //         Evolve.Log.error(" EERR1329: Error while getting All Menu list " + error.message);
    //         return new Error(" EERR1329: Error while getting All Menu list " + error.message);
    //     }
    // },

    getAllMenulist: async function(id, start, length, search) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveUser_id', Evolve.Sql.Int, id)
                .input('start', Evolve.Sql.Int, start)
                .input('length', Evolve.Sql.Int, length)
                .input('search', Evolve.Sql.NVarChar, '%' + search + '%')
                .query('SELECT emt.EvolveMenuType_Icon  ,   ea.EvolveApp_Name, em.*, (SELECT emj.EvolveMenu_Name FROM EvolveMenu emj WHERE em.EvolveMenu_Parent = emj.EvolveMenu_Id) as parent FROM EvolveMenu em LEFT JOIN EvolveMenuType  emt ON em.EvolveMenuType_ID = emt.EvolveMenuType_ID , EvolveApp ea   WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId  AND   em.EvolveMenu_Name LIKE @search ORDER BY em.EvolveMenu_Id DESC OFFSET @start ROWS FETCH NEXT @length ROWS ONLY');
        } catch (error) {
            Evolve.Log.error(" EERR1329: Error while getting All Menu list " + error.message);
            return new Error(" EERR1329: Error while getting All Menu list " + error.message);
        }
    },


    getMenusByAppId: async function(id) {
        try {
            return await Evolve.SqlPool.request()
                .input('Menu_AppID', Evolve.Sql.Int, id)
                .query('SELECT em.EvolveMenu_Id,em.EvolveMenu_Name,em.EvolveMenu_Desc,em.EvolveMenu_Url,em.EvolveMenu_IsActive,em.EvolveMenu_Index,em.EvolveMenu_Parent,em.EvolveMenu_AppId , ea.EvolveApp_Name ,(SELECT emj.EvolveMenu_Name FROM EvolveMenu emj WHERE em.EvolveMenu_Parent = emj.EvolveMenu_Id) as parent  FROM EvolveMenu em , EvolveApp ea WHERE ea.EvolveApp_ID = em.EvolveMenu_AppId AND em.EvolveMenu_AppId = @Menu_AppID ORDER BY em.EvolveMenu_Index ');
        } catch (error) {
            Evolve.Log.error(" EERR1330: Error while getting Menus By App Id " + error.message);
            return new Error(" EERR1330: Error while getting Menus By App Id " + error.message);
        }
    },
    getAppList: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .query('select * from EvolveApp')
        } catch (error) {
            Evolve.Log.error(" EERR1331: Error while getting App List " + error.message);
            return new Error(" EERR1331: Error while getting App List " + error.message);
        }
    },
    selectSingleMenu: async function(data) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMenu_ID)
                .input('EvolveMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .query('SELECT em.* FROM EvolveMenu em WHERE em.EvolveMenu_Id= @EvolveMenu_ID')
        } catch (error) {
            Evolve.Log.error(" EERR1332: Error while selecting Single Menu " + error.message);
            return new Error(" EERR1332: Error while selecting Single Menu " + error.message);
        }
    },

    createMenu: async function(data) {
        try {
            console.log("data >>>>", data);
            let dataTime = new Date();
            let parent = '';
            let newIndex = '';
            if (data.EvolveMenu_Parent == 0) {
                parent = '0'
                let getLastIndex = await Evolve.SqlPool.request()
                    .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = '0' ORDER BY EvolveMenu_Id Desc")
                if (getLastIndex.rowsAffected >= 1) {
                    newIndex = parseInt(getLastIndex.recordset[0].EvolveMenu_Index) + 1
                } else {
                    newIndex = 1
                }
            } else {
                parent = data.EvolveMenu_Parent
                let getLastIndex = await Evolve.SqlPool.request()
                    .input('EvolveMenu_Parent', Evolve.Sql.Int, data.EvolveMenu_Parent)
                    .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = @EvolveMenu_Parent ORDER BY EvolveMenu_Id Desc")
                console.log("getLastIndex >>>>", getLastIndex);
                if (getLastIndex.rowsAffected[0] >= 1) {
                    newIndex = getLastIndex.recordset[0].EvolveMenu_Index.split(".")
                    newIndex = parseInt(newIndex[newIndex.length - 1]) + 1
                    newIndex = data.EvolveMenu_Parent + '.' + newIndex
                } else {
                    newIndex = data.EvolveMenu_Parent + '.' + 1
                }
            }
            console.log("newIndex >>>>", newIndex);

            let createMenu = await Evolve.SqlPool.request()
                .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
                .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
                .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
                .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
                .input('EvolveMenu_Index', Evolve.Sql.NVarChar, newIndex)
                .input('EvolveMenu_Parent', Evolve.Sql.Int, data.EvolveMenu_Parent)
                .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
                // .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
                .input('EvolveMenu_IsReportPage', Evolve.Sql.Bit, data.EvolveMenu_IsReportPage)
                .input('EvolveUser_IframeUrl', Evolve.Sql.NVarChar, data.EvolveUser_IframeUrl)
                .input('EvolveMenu_IsUpdateExtData', Evolve.Sql.Bit, data.EvolveMenu_IsUpdateExtData)
                .input('EvolveMenu_AuditEnable', Evolve.Sql.Bit, data.EvolveMenu_AuditEnable)
                .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                .input('EvolveMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMenu_CreatedAt', Evolve.Sql.DateTime, dataTime)
                .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                .query('INSERT INTO EvolveMenu (EvolveMenu_Name,EvolveMenu_Desc,EvolveMenu_Url,EvolveMenu_IsActive,EvolveMenu_Index,EvolveMenu_Parent,EvolveMenu_AppId,EvolveMenu_CreatedUser,EvolveMenu_CreatedAt,EvolveMenu_UpdatedUser,EvolveMenu_UpdatedAt,EvolveMenu_IsReportPage, EvolveUser_IframeUrl , EvolveMenu_IsUpdateExtData , EvolveMenu_AuditEnable , EvolveMenuType_ID) VALUES (@EvolveMenu_Name,@EvolveMenu_Desc,@EvolveMenu_Url,@EvolveMenu_IsActive,@EvolveMenu_Index,@EvolveMenu_Parent,@EvolveMenu_AppId,@EvolveMenu_CreatedUser,@EvolveMenu_CreatedAt,@EvolveMenu_UpdatedUser,@EvolveMenu_UpdatedAt, @EvolveMenu_IsReportPage, @EvolveUser_IframeUrl , @EvolveMenu_IsUpdateExtData , @EvolveMenu_AuditEnable , @EvolveMenuType_ID) ; select @@IDENTITY AS \'inserted_id\'')
            if (createMenu instanceof Error || createMenu.rowsAffected < 1) {
                Evolve.Log.Error(" EERR1340: Error on Create Menu ", createMenu);
                return new Error(" EERR1340: Error on Create Menu ")
            } else {
                return createMenu;
            }
        } catch (error) {
            Evolve.Log.error(" EERR1333: Error while creating Menu " + error.message);
            return new Error(" EERR1333: Error while creating Menu " + error.message);
        }
    },
    updateMenu: async function(data) {
        try {
            console.log("data >>>>>", data);
            let dataTime = new Date();
            let parent = '';
            let newIndex = '';
            let old_parent = '';
            let getParet = await Evolve.SqlPool.request()
                .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
                .query("SELECT EvolveMenu_Parent FROM EvolveMenu WHERE EvolveMenu_Id = @EvolveMenu_Id")
            if (getParet.recordset[0].EvolveMenu_Parent == '') {
                old_parent = 0
            } else {
                old_parent = getParet.recordset[0].EvolveMenu_Parent
            }
            if (old_parent != data.EvolveMenu_Parent) {
                if (data.EvolveMenu_Parent == 0) {
                    parent = ''
                    let getLastIndex = await Evolve.SqlPool.request()
                        .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE (EvolveMenu_Parent = '' OR EvolveMenu_Parent IS NULL) ORDER BY EvolveMenu_Id Desc")
                    if (getLastIndex.rowsAffected >= 1) {
                        newIndex = parseInt(getLastIndex.recordset[0].EvolveMenu_Index) + 1
                    } else {
                        newIndex = 1
                    }
                } else {
                    parent = data.EvolveMenu_Parent
                    let getLastIndex = await Evolve.SqlPool.request()
                        .input('EvolveMenu_Parent', Evolve.Sql.NVarChar, data.EvolveMenu_Parent)
                        .query("SELECT TOP(1) EvolveMenu_Index FROM EvolveMenu WHERE EvolveMenu_Parent = @EvolveMenu_Parent ORDER BY EvolveMenu_Id Desc")
                    if (getLastIndex.rowsAffected[0] >= 1) {
                        newIndex = getLastIndex.recordset[0].EvolveMenu_Index.split(".")
                        newIndex = parseInt(newIndex[newIndex.length - 1]) + 1
                        newIndex = data.EvolveMenu_Parent + '.' + newIndex
                    } else {
                        newIndex = data.EvolveMenu_Parent + '.' + 1
                    }
                }
                console.log("data", data);
                let updateMenu = await Evolve.SqlPool.request()
                    .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
                    .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
                    .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
                    .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
                    .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
                    .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)
                    .input('EvolveMenu_Parent', Evolve.Sql.Int, data.EvolveMenu_Parent)
                    .input('EvolveMenu_Index', Evolve.Sql.NVarChar, newIndex)
                    // .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
                    .input('EvolveMenu_IsReportPage', Evolve.Sql.Bit, data.EvolveMenu_IsReportPage)
                    .input('EvolveUser_IframeUrl', Evolve.Sql.NVarChar, data.EvolveUser_IframeUrl)
                    .input('EvolveMenu_IsUpdateExtData', Evolve.Sql.Bit, data.EvolveMenu_IsUpdateExtData)
                    .input('EvolveMenu_AuditEnable', Evolve.Sql.Bit, data.EvolveMenu_AuditEnable)
                    .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                    .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                    .query('UPDATE evolveMenu SET EvolveMenu_Name = @EvolveMenu_Name , EvolveMenu_Desc = @EvolveMenu_Desc , EvolveMenu_Url = @EvolveMenu_Url , EvolveMenu_IsActive = @EvolveMenu_IsActive , EvolveMenu_Parent = @EvolveMenu_Parent , EvolveMenu_Index = @EvolveMenu_Index  , EvolveMenu_UpdatedUser = @EvolveMenu_UpdatedUser , EvolveMenu_UpdatedAt = @EvolveMenu_UpdatedAt, EvolveMenu_IsReportPage = @EvolveMenu_IsReportPage, EvolveUser_IframeUrl = @EvolveUser_IframeUrl ,EvolveMenu_AppId =@EvolveMenu_AppId , EvolveMenu_IsUpdateExtData = @EvolveMenu_IsUpdateExtData , EvolveMenu_AuditEnable = @EvolveMenu_AuditEnable , EvolveMenuType_ID = @EvolveMenuType_ID WHERE EvolveMenu_Id = @EvolveMenu_Id')

                if (updateMenu instanceof Error || updateMenu.rowsAffected < 1) {
                    Evolve.Log.Error(" EERR1334: Error on Update Menu ", createMenu);
                    return new Error(" EERR1334: Error on Update Menu ")
                } else {
                    return updateMenu;
                }
            } else {
                let updateMenu = await Evolve.SqlPool.request()
                    .input('EvolveMenu_Id', Evolve.Sql.Int, data.EvolveMenu_Id)
                    .input('EvolveMenu_AppId', Evolve.Sql.Int, data.EvolveMenu_AppId)

                .input('EvolveMenu_Name', Evolve.Sql.NVarChar, data.EvolveMenu_Name)
                    .input('EvolveMenu_Desc', Evolve.Sql.NVarChar, data.EvolveMenu_Desc)
                    .input('EvolveMenu_Url', Evolve.Sql.NVarChar, data.EvolveMenu_Url)
                    .input('EvolveMenu_IsActive', Evolve.Sql.Bit, data.EvolveMenu_IsActive)
                    // .input('EvolveMenu_Icon', Evolve.Sql.NVarChar, data.EvolveMenu_Icon)
                    .input('EvolveMenu_IsReportPage', Evolve.Sql.Bit, data.EvolveMenu_IsReportPage)
                    .input('EvolveUser_IframeUrl', Evolve.Sql.NVarChar, data.EvolveUser_IframeUrl)
                    .input('EvolveMenu_IsUpdateExtData', Evolve.Sql.Bit, data.EvolveMenu_IsUpdateExtData)
                    .input('EvolveMenu_AuditEnable', Evolve.Sql.Bit, data.EvolveMenu_AuditEnable)
                    .input('EvolveMenuType_ID', Evolve.Sql.Int, data.EvolveMenuType_ID)
                    .input('EvolveMenu_UpdatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                    .input('EvolveMenu_UpdatedAt', Evolve.Sql.DateTime, dataTime)
                    .query('UPDATE evolveMenu SET EvolveMenu_Name = @EvolveMenu_Name , EvolveMenu_Desc = @EvolveMenu_Desc , EvolveMenu_Url = @EvolveMenu_Url , EvolveMenu_IsActive = @EvolveMenu_IsActive , EvolveMenu_UpdatedUser = @EvolveMenu_UpdatedUser , EvolveMenu_UpdatedAt = @EvolveMenu_UpdatedAt, EvolveMenu_IsReportPage = @EvolveMenu_IsReportPage, EvolveUser_IframeUrl = @EvolveUser_IframeUrl , EvolveMenu_AppId=@EvolveMenu_AppId , EvolveMenu_IsUpdateExtData = @EvolveMenu_IsUpdateExtData , EvolveMenu_AuditEnable = @EvolveMenu_AuditEnable , EvolveMenuType_ID = @EvolveMenuType_ID WHERE EvolveMenu_Id = @EvolveMenu_Id')
                if (updateMenu instanceof Error || updateMenu.rowsAffected < 1) {
                    Evolve.Log.Error(" EERR1335: Error on Update Menu ", updateMenu);
                    return new Error(" EERR1335: Error on Update Menu ")
                } else {
                    return updateMenu;
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR1336: Error while updating menu " + error.message);
            return new Error(" EERR1336: Error while updating menu " + error.message);
        }
    },
    deleteMenu: async function(id) {
        try {
            return await Evolve.SqlPool.request()
                .input('id', Evolve.Sql.Int, id)
                .query('DELETE FROM EvolveMenu WHERE EvolveMenu_Id =@id')
        } catch (error) {
            Evolve.Log.error(" EERR1337: Error while deleting menu " + error.message);
            return new Error(" EERR1337: Error while deleting menu " + error.message);
        }
    },

    getRoleIdByRoleCode: async function(EvolveRole_Code) {
        try {
            return await Evolve.SqlPool.request()
                .input('EvolveRole_Code', Evolve.Sql.NVarChar, EvolveRole_Code)
                .query('SELECT EvolveRole_ID FROM EvolveRole WHERE EvolveRole_Code =@EvolveRole_Code')
        } catch (error) {
            Evolve.Log.error(" EERR1338: Error while getting Role ID " + error.message);
            return new Error(" EERR1338: Error while getting Role ID " + error.message);
        }
    },

    AssignRoleToMenu: async function(data) {
        try {
            let dataTime = new Date();
            return await Evolve.SqlPool.request()
                .input('EvolveRole_ID', Evolve.Sql.Int, data.EvolveRole_ID)
                .input('EvolveMenu_ID', Evolve.Sql.Int, data.EvolveMenu_ID)
                .input('EvolveApp_ID', Evolve.Sql.Int, data.EvolveApp_ID)
                .input('EvolveRoleToMenu_CreatedUser', Evolve.Sql.Int, data.EvolveUser_ID)
                .input('EvolveRoleToMenu_CreatedAt', Evolve.Sql.DateTime, dataTime)

            .query('INSERT INTO EvolveRoleToMenu (EvolveRole_ID ,EvolveMenu_ID,  EvolveRoleToMenu_CreatedUser ,EvolveRoleToMenu_CreatedAt , EvolveApp_ID ) VALUES (@EvolveRole_ID ,@EvolveMenu_ID , @EvolveRoleToMenu_CreatedUser ,@EvolveRoleToMenu_CreatedAt , @EvolveApp_ID ) ')
        } catch (error) {
            Evolve.Log.error(" EERR1339: Error while Assign Role To Menu " + error.message);
            return new Error(" EERR1339: Error while Assign Role To Menu " + error.message);
        }
    },
    getIconList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT DISTINCT EvolveMenu_Icon FROM EvolveMenu')
        } catch (error) {
            Evolve.Log.error(" EERR1339: Error while Assign Role To Menu " + error.message);
            return new Error(" EERR1339: Error while Assign Role To Menu " + error.message);
        }
    },

    getMenuTypeList: async function() {
        try {
            return await Evolve.SqlPool.request()
                .query('SELECT * FROM EvolveMenuType')
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Menu Type List " + error.message);
            return new Error(" EERR####: Error while Get Menu Type List " + error.message);
        }
    }

}