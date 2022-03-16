'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    // getAppMenuByAppId: async function (req, res) {
    //     req.body.EvolveUser_ID = req.EvolveUser_ID;
    //     try {
    //         let menus = await Evolve.App.Services.Evolve.RoleCreate.SrvList.getAppMenuByAppId(req.body);
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
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let menus = await Evolve.App.Services.Evolve.RoleCreate.SrvList.getAppMenuByAppId(req.body);
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

    getAllRoleList: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.RoleCreate.SrvList.getAllRoleListCount(search);
            let result = await Evolve.App.Services.Evolve.RoleCreate.SrvList.getAllRoleList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get role list !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
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
            Evolve.Log.error(" EERR####: Error while getting all role create list - Controller " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting all role create list - Controller " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    saveRoleData: async function(req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.RoleCreate.SrvList.checkRole(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While ChecK Role",
                    result: result.message
                };
                res.send(obj);
            } else if (result.rowsAffected > 1) {

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Role Code Alreaddy Exist Please Enter Different Code",
                    result: result.message
                };
                res.send(obj);

            } else {
                let result = await Evolve.App.Services.Evolve.RoleCreate.SrvList.saveRoleData(req.body);
                if (result instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while Save Role !",
                        result: result.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Role Save Successfully",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Role - Controller " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Save Role - Controller " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingelRoleDataEdit: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.RoleCreate.SrvList.getSingelRoleData(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Singel Role !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role Get Singel Role Successfully",
                    result: result.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Singel Role - Controller " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get Singel Role - Controller " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    modifyRoleData: async function(req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.RoleCreate.SrvList.modifyRoleData(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Modify Role !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Role Get Modify Role Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Modify Singel Role - Controller " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Modify Singel Role - Controller " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}