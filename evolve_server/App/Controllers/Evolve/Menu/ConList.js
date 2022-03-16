'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllMenulist: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.Menu.SrvList.getAllMenulistCount(req.EvolveUser_ID, search);
            let menus = await Evolve.App.Services.Evolve.Menu.SrvList.getAllMenulist(req.EvolveUser_ID, start, length, search);
            if (menus instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get menu list !",
                    result: menus.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: menus.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0324: Error while getting all menu list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0324: Error while getting all menu list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMenusByAppId: async function(req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.getMenusByAppId(req.body.EvolveMenu_AppId);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get menu list",
                    result: null
                };
                res.send(obj);
            } else if (result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No menus found for selected application",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0325: Error while getting menus by appid " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0325: Error while getting menus by appid " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAppList: async function(req, res) {
        try {
            let apps = await Evolve.App.Services.Evolve.Menu.SrvList.getAppList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "App List",
                result: apps.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0326: Error while getting app list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0326: Error while getting app list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleMenu: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let menuData = await Evolve.App.Services.Evolve.Menu.SrvList.selectSingleMenu(req.body);
            if (menuData instanceof Error || menuData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get menu list !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu List",
                    result: menuData.recordsets[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0327: Error while selecting single menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0327: Error while selecting single menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    createMenu: async function(req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.createMenu(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while create  menu !",
                    result: null
                };
                res.send(obj);
            } else {
                let getRoleID = await Evolve.App.Services.Evolve.Menu.SrvList.getRoleIdByRoleCode('EVOLVEADMIN');
                if (getRoleID instanceof Error || getRoleID.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error Getting role id !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let data = {
                        'EvolveRole_ID': getRoleID.recordset[0].EvolveRole_ID,
                        'EvolveMenu_ID': result.recordset[0].inserted_id,
                        'EvolveUser_ID': req.EvolveUser_ID,
                        'EvolveApp_ID': req.body.EvolveMenu_AppId

                    }
                    let AssignRoleToMenu = await Evolve.App.Services.Evolve.Menu.SrvList.AssignRoleToMenu(data);

                    if (AssignRoleToMenu instanceof Error || AssignRoleToMenu.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while assign role to menu !",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Menu created succsessfully",
                            result: result.recordset
                        };
                        res.send(obj);

                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0328: Error while creating menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0328: Error while creating menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateMenu: async function(req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.updateMenu(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update menu!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu updated succsessfully ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0329: Error while updating menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0329: Error while updating menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteMenu: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.deleteMenu(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while deleting menu !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Menu deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0330: Error while deleting menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0330: Error while deleting menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getIconList: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.getIconList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Icon List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0330: Error while get Icon List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0330: Error while get Icon List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMenuTypeList: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Menu.SrvList.getMenuTypeList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Menu Type List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0330: Error while get Menu Type List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0330: Error while get Menu Type List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}