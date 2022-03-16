'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMachines: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getMachines();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Machine List not found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0309: Error while getting machines "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0309: Error while getting machines "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItems: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getItems();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Item List not found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0310: Error while getting items "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0310: Error while getting items "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getuoms: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getuoms();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Uom list not found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0311: Error while getting Uoms "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0311: Error while getting Uoms "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addMachineToItem: async function (req, res) {
        try {
            req.body.EvolveCreatedUser_ID = req.EvolveUser_ID;
            let checkMachineToItem = await Evolve.App.Services.Evolve.MachineToItem.SrvList.checkMachineToItem(req.body);
            if (checkMachineToItem.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Machine to item already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.addMachineToItem(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while assign machine to item !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Machine to item add succsessfully",
                        result: result.recordsets[0]
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0312: Error while adding machine to Item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0312: Error while adding machine to Item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMachineToItemList: async function (req, res) {
        try {

            let start = parseInt(req.query.startFrom);
            let length = parseInt(req.query.displayRecord);
            let search = req.query.search;
            let count = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getMachineToItemListCount(search);
            let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getMachineToItemList(start, length, search);
            // console.log(count);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get machine to item !",
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
                    message: "Machine To Item list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0313: Error while getting machine to item list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0313: Error while getting machine to item list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMachineToItem: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.getSingleMachineToItem(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while select single machine to item !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single machine to item",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0314: Error while getting single machine to item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0314: Error while getting single machine to item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateMachineToItem: async function (req, res) {
        req.body.EvolveUpdatedUser_ID = req.EvolveUser_ID;
        try {
            let checkMachineToItem = await Evolve.App.Services.Evolve.MachineToItem.SrvList.checkUpdateMachineToItem(req.body);
        
            if (checkMachineToItem.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Machine to item already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.MachineToItem.SrvList.updateMachineToItem(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on update machine to item !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Machine to item Update succsessfully",
                        result: result.recordsets[0]
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0315: Error while updating machine to item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0315: Error while updating machine to item "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}