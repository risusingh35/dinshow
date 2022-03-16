'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMachinetoUserList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.MachineToUser.SrvList.MachinetoUserListCount(search);
            let result = await Evolve.App.Services.Evolve.MachineToUser.SrvList.getMachinetoUserList(start, length,search);
            if (result instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get machine to user !",
                    result: null
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
                    message: "Machine to user assign list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0316: Error while getting machine to user list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0316: Error while getting machine to user list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUsers: async function (req, res) {
        try {
            let UserList = await Evolve.App.Services.Evolve.MachineToUser.SrvList.getUsers();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "User List",
                result: UserList.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0317: Error while getting users "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0317: Error while getting users "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMachines: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToUser.SrvList.getMachines();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Machine List",
                result: result.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0318: Error while getting machines "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0318: Error while getting machines "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMenuList: async function (req, res) {
        try {
            let MenuList = await Evolve.App.Services.Evolve.MachineToUser.SrvList.getMenuList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu List",
                result: MenuList.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0319: Error while getting menu list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0319: Error while getting menu list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addMachineToUser: async function (req, res) {
        try {
            req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
            let checkMachineToUser = await Evolve.App.Services.Evolve.MachineToUser.SrvList.checkMachineToUser(req.body);
            if (checkMachineToUser.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Machine to user already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let proPlan = await Evolve.App.Services.Evolve.MachineToUser.SrvList.addMachineToUser(req.body);
                if (proPlan instanceof Error || proPlan.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while assign machine to user !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Machine to user assigned succsessfully",
                        result: proPlan.recordsets[0]
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0320: Error while adding machine to user "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0320: Error while adding machine to user "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMachineToUser: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToUser.SrvList.getSingleMachineToUser(req.body.EvolveMachineToUser_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while select single machine to user !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single machine to user ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0321: Error while getting single machine to user "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0321: Error while getting single machine to user "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateMachineToUser: async function (req, res) {
        req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
        try {
            let checkMachineToUser = await Evolve.App.Services.Evolve.MachineToUser.SrvList.checkMachineToUserUpdate(req.body);
            if (checkMachineToUser.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "machine to user already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let updateMAchinetoUser = await Evolve.App.Services.Evolve.MachineToUser.SrvList.updateMachineToUser(req.body);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Machine to user updated succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0322: Error while updating Machine To User "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0322: Error while updating Machine To User "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteMachineToUser: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToUser.SrvList.deleteMachineToUser(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete Machine to User asignment !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Machine to User asignment deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0323: Error while deleeting machine to user "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },



}