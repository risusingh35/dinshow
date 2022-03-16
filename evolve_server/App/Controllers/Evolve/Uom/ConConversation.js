'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getAppMenuByAppId: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let menus = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.getAppMenuByAppId(req.body);
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

                for (let i = records.length - 1; i >= 0; i--) {
                    let assingned = false;
                    if (records[i].assigned >= 1) {
                        assingned = true;
                    } else {
                        assingned = false;
                    }
                    if (records[i].EvolveMenu_Parent == 0) {
                        menuList.push({
                            title: records[i].EvolveMenu_Name,
                            expanded: true,
                            folder: true,
                            selected: assingned,
                            menuIndex: records[i].EvolveMenu_Index,
                            menuParent: records[i].EvolveMenu_Parent,
                            icon: records[i].EvolveMenu_Icon,
                            key: records[i].EvolveMenu_Id
                        });
                        records.splice(i, 1);
                    }
                }
                for (let i = 0; i < records.length; i++) {
                    for (let j = 0; j < menuList.length; j++) {
                        if (records[i].EvolveMenu_Parent == menuList[j].menuIndex) {
                            if (menuList[j].children == undefined) {
                                menuList[j].children = [];
                            }
                            menuList[j].children.push({
                                title: records[i].EvolveMenu_Name,
                                expanded: true,
                                folder: true,
                                menuIndex: records[i].EvolveMenu_Index,
                                menuParent: records[i].EvolveMenu_Parent,
                                icon: records[i].EvolveMenu_Icon
                            });
                            records.splice(i, 1);
                        }
                    }
                }
                for (let i = 0; i < records.length; i++) {
                    for (let k = 0; k < menuList.length; k++) {
                        if (menuList[k].children !== undefined) {
                            for (l = 0; l < menuList[k].children.length; l++) {
                                if (records[i].EvolveMenu_Parent == menuList[k].children[l].menuIndex) {
                                    if (menuList[k].children[l].children == undefined) {
                                        menuList[k].children[l].children = [];
                                    }
                                    menuList[k].children[l].children.push({ title: records[i].EvolveMenu_Name, expanded: true, folder: true, icon: records[i].EvolveMenu_Icon });
                                    records.splice(i, 1);
                                }
                            }
                        }
                    }
                }
                obj.result = menuList;
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0431: Error while getting app menu by app id "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0431: Error while getting app menu by app id "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllConversationList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let count = await Evolve.App.Services.Evolve.Uom.SrvUomConversation.getAllConversationCount();
            let uomList = await Evolve.App.Services.Evolve.Uom.SrvUomConversation.getAllConversationList(start , length);
            if (uomList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Conversation list !",
                    result: uomList.message
                };
                res.send(obj);
            }
            if ( uomList.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "no uom available",
                    message: " ",
                    result: []
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: uomList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom conversation list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0432: Error while getting all conversation list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0432: Error while getting all conversation list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
        
            let uomList = await Evolve.App.Services.Evolve.Uom.SrvUomConversation.getUomList();
            if (uomList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Uom list !",
                    result: uomList.message
                };
                res.send(obj);
            }
            if ( uomList.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "no uom available",
                    message: " ",
                    result: []
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom list geted successfully ",
                    result: uomList.recordsets[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0433: Error while getting all Uom list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0433: Error while getting all Uom list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    updateRoleToMenu: async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.updateRoleToMenu(req.body);
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
            Evolve.Log.error(" EERR0434: Error while updating role to menu "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0434: Error while updating role to menu "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createUomConversation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let createConversation = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.createUomConversation(req.body);
            if (createConversation instanceof Error || createConversation.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while create uom !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom Created Successfully",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0435: Error while creating Uom Conversation "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0435: Error while creating Uom Conversation "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



    checkExistingConversion: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkConversation = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.checkExistingConversion(req.body);
            if (checkConversation instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while check conversion existance !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: checkConversation.rowsAffected
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0436: Error while checking existing Conversion "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0436: Error while checking existing Conversion "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
    checkExistingConversiononUpdate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkConversation = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.checkExistingConversiononUpdate(req.body);
            if (checkConversation instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while check conversion existance !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "",
                    result: checkConversation.rowsAffected
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0437: Error while checking existing Conversion Updating "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0437: Error while checking existing Conversion Updating "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    selectSingleConversation: async function (req, res) {
        try {
            let uomData = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.selectSingleConversation(req.body.EvolveUomConv_ID);
            if (uomData instanceof Error || uomData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get validation data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "validation data",
                    result: uomData.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0438: Error while selecting single conversation "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0438: Error while selecting single conversation "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateConversion: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateConversion = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.updateConversion(req.body);
            if (updateConversion instanceof Error || updateConversion.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update conversion !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "conversion updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0439: Error while updating conversation "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0439: Error while updating conversation "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteRole: async function (req, res) {
        try {
            let result = await  Evolve.App.Services.Evolve.Uom.SrvUomConversation.deleteRole(req.body.id);
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
            Evolve.Log.error(" EERR0440: Error while deleting role "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0440: Error while deleting role "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

//conversation

    
    getdefaultUom: async function (req, res) {
        try {
        
            let uomList = await Evolve.App.Services.Evolve.Uom.SrvUomConversation.getdefaultUom(req.body);
            if (uomList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get defult uom for item !",
                    result: uomList.message
                };
                res.send(obj);
            }
            if ( uomList.rowsAffected < 1) {
                let obj = {
                    statusCode: 200,
                    status: "no defult uom available",
                    message: " ",
                    result: []
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Uom geted successfully ",
                    result: uomList.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0441: Error while getting default Uom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0441: Error while getting default Uom "+error.message,
                result: null
            };
            res.send(obj);
        }
    },






}