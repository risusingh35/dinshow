'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    // getAppMenuByAppId: async function(req, res) {
    //     req.body.EvolveUser_ID = req.EvolveUser_ID;
    //     try {
    //         let menus = await Evolve.App.Services.Evolve.Role.SrvList.getAppMenuByAppId(req.body);
    //         if (menus instanceof Error || menus.rowsAffected < 1) {
    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "No menu found !",
    //                 result: null
    //             };
    //             res.send(obj);
    //         } else {
    //             var obj = {
    //                 draw: req.query.draw,
    //                 result: [],
    //                 statusCode: 200,
    //                 message: "success"
    //             };
    //             let menuList = [];
    //             let records = menus.recordsets[0];

    //             for (let i = records.length - 1; i >= 0; i--) {
    //                 let assingned = false;
    //                 if (records[i].assigned >= 1) {
    //                     assingned = true;
    //                 } else {
    //                     assingned = false;
    //                 }
    //                 if (records[i].EvolveMenu_Parent == 0) {
    //                     menuList.push({
    //                         title: records[i].EvolveMenu_Name,
    //                         expanded: true,
    //                         folder: true,
    //                         selected: assingned,
    //                         menuIndex: records[i].EvolveMenu_Index,
    //                         menuParent: records[i].EvolveMenu_Parent,
    //                         icon: records[i].EvolveMenu_Icon,
    //                         key: records[i].EvolveMenu_Id
    //                     });
    //                     records.splice(i, 1);
    //                 }
    //             }
    //             for (let i = 0; i < records.length; i++) {
    //                 for (let j = 0; j < menuList.length; j++) {
    //                     if (records[i].EvolveMenu_Parent == menuList[j].menuIndex) {
    //                         if (menuList[j].children == undefined) {
    //                             menuList[j].children = [];
    //                         }
    //                         menuList[j].children.push({
    //                             title: records[i].EvolveMenu_Name,
    //                             expanded: true,
    //                             folder: true,
    //                             menuIndex: records[i].EvolveMenu_Index,
    //                             menuParent: records[i].EvolveMenu_Parent,
    //                             icon: records[i].EvolveMenu_Icon
    //                         });
    //                         records.splice(i, 1);
    //                     }
    //                 }
    //             }
    //             for (let i = 0; i < records.length; i++) {
    //                 for (let k = 0; k < menuList.length; k++) {
    //                     if (menuList[k].children !== undefined) {
    //                         for (let l = 0; l < menuList[k].children.length; l++) {
    //                             if (records[i].EvolveMenu_Parent == menuList[k].children[l].menuIndex) {
    //                                 if (menuList[k].children[l].children == undefined) {
    //                                     menuList[k].children[l].children = [];
    //                                 }
    //                                 menuList[k].children[l].children.push({ title: records[i].EvolveMenu_Name, expanded: true, folder: true, icon: records[i].EvolveMenu_Icon });
    //                                 records.splice(i, 1);
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             obj.result = menuList;
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0389: Error while getting app menu by app id " + error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: " EERR0389: Error while getting app menu by app id " + error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },

    getAppMenuByAppId: async function(req, res) {
        console.log("::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let menus = await Evolve.App.Services.Evolve.Role.SrvList.getAppMenuByAppId(req.body);
            if (menus instanceof Error || menus.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No menu found !",
                    result: null
                };
                res.send(obj);
            } else {
                var obj = {
                    draw: req.query.draw,
                    result: [],
                    statusCode: 200,
                    message: "success"
                };
                let menuList = [];
                let records = menus.recordsets[0];
                // console.log("records??????", records);

                for (let i = records.length - 1; i >= 0; i--) {
                    records[i].assingned = false
                    if (records[i].assigned >= 1) {
                        records[i].assingned = true;
                    } else {
                        records[i].assingned = false;
                    }
                    if (records[i].EvolveMenu_Parent == 0) {

                        menuList.push({
                            title: records[i].EvolveMenu_Name,
                            expanded: true,
                            folder: true,
                            selected: records[i].assingned,
                            menuIndex: records[i].EvolveMenu_Index,
                            menuParent: records[i].EvolveMenu_Parent,
                            icon: records[i].EvolveMenu_Icon,
                            key: records[i].EvolveMenu_Id
                        });
                        records.splice(i, 1);
                    }
                }
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", menuList);
                console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", records);
                if (records.length > 0) {
                    for (let i = 0; i < records.length; i++) {
                        console.log("???????????????", i);

                        for (let j = 0; j < menuList.length; j++) {
                            if (records[i].EvolveMenu_Parent == menuList[j].key) {
                                if (menuList[j].children == undefined) {
                                    menuList[j].children = [];
                                }

                                menuList[j].children.push({
                                    title: records[i].EvolveMenu_Name,
                                    expanded: true,
                                    folder: true,
                                    selected: records[i].assingned,
                                    menuIndex: records[i].EvolveMenu_Index,
                                    menuParent: records[i].EvolveMenu_Parent,
                                    icon: records[i].EvolveMenu_Icon,
                                    key: records[i].EvolveMenu_Id
                                });

                            }
                        }
                        // records.splice(i, 1);

                    }
                }
                console.log("???????????????????????????????", records);
                if (records.length > 0) {
                    for (let i = 0; i < records.length; i++) {
                        for (let k = 0; k < menuList.length; k++) {
                            if (menuList[k].children !== undefined) {
                                for (let l = 0; l < menuList[k].children.length; l++) {
                                    if (records[i].EvolveMenu_Parent == menuList[k].children[l].key) {
                                        if (menuList[k].children[l].children == undefined) {
                                            menuList[k].children[l].children = [];
                                        }
                                        menuList[k].children[l].children.push({
                                            title: records[i].EvolveMenu_Name,
                                            expanded: true,
                                            folder: true,
                                            selected: records[i].assingned,
                                            menuIndex: records[i].EvolveMenu_Index,
                                            menuParent: records[i].EvolveMenu_Parent,
                                            icon: records[i].EvolveMenu_Icon,
                                            key: records[i].EvolveMenu_Id
                                        });

                                    }
                                }
                            }
                        }
                        // records.splice(i, 1);
                    }
                }

                // console.log("menuList>>>>>>>>>>>>>>>>>>", menuList);
                obj.result = menuList;
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0389: Error while getting app menu by app id " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0389: Error while getting app menu by app id " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllRole: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.Role.SrvList.getAllRoleCount(search);
            let roles = await Evolve.App.Services.Evolve.Role.SrvList.getAllRole(start, length, search);
            if (roles instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get role list !",
                    result: roles.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: roles.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0390: Error while getting all role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0390: Error while getting all role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    appListForRole: async function(req, res) {
        try {
            let apps = await Evolve.App.Services.Evolve.Role.SrvList.appListForRole();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "App List",
                result: apps.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0391: Error while app Listing for role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0391: Error while app Listing for role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateRoleToMenu: async function(req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.Role.SrvList.updateRoleToMenu(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Rrle to menu !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "menu updated successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0392: Error while updating Role To Menu " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0392: Error while updating Role To Menu " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createRole: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Role.SrvList.createRole(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while create role !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role Created Successfully",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0393: Error while creating role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0393: Error while creating role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleRole: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Role.SrvList.selectSingleRole(req.body.EvolveRole_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while select role !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role Role",
                    result: result.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0394: Error while selecting single role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0394: Error while selecting single role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateRole: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Role.SrvList.updateRole(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update role !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0395: Error while updating role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0395: Error while updating role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteRole: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Role.SrvList.deleteRole(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete role !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0396: Error while deleting role " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0396: Error while deleting role " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDefaultMenuList: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Role.SrvList.getDefaultMenuList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get menu List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "succsessfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0397: Error while getting default menu list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0397: Error while getting default menu list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




}