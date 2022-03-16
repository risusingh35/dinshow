'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSerialNumberList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count =await Evolve.App.Services.Evolve.SerialNo.SrvListV2.getSerialNumberCount(search);
            let getSerialNumberData = await Evolve.App.Services.Evolve.SerialNo.SrvListV2.getSerialNumberList(start, length,search);
            if (getSerialNumberData instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get serial number list !",
                    result: getSerialNumberData.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getSerialNumberData.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial number list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32599: Error while getting serial number list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32599: Error while getting serial number list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addSerialNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvListV2.addSerialNumber(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial no created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32600: Error while adding serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32600: Error while adding serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editSerialNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvListV2.editSerialNumber(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial no updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32601: Error while updating serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32601: Error while updating serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleSerialNumber: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvListV2.getSingleSerialNumber(req.body.EvolveSerial_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single serial no !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial Single List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32602: Error while getting single serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32602: Error while getting single serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSerialNumber: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.SerialNo.SrvListV1.deleteSerialNumber(req.body.EvolveSerial_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete serial number !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Serial deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32603: Error while deleting serial number "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32603: Error while deleting serial number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getItemList: async function (req, res) {
        try {
            let modelList = await Evolve.App.Services.Evolve.SerialNo.SrvListV2.getItemList();

            if (modelList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
                    result: modelList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: modelList.recordset
                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32604: Error while getting model list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32604: Error while getting model list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnitList: async function (req, res) {
        try {
            let unitList = await Evolve.App.Services.Evolve.SerialNo.SrvListV1.getUnitList();

            if (unitList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
                    result: unitList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: unitList.recordset
                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32605: Error while getting unit list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32605: Error while getting unit list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}