'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getPrinterList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count =await Evolve.App.Services.Evolve.printerMaster.SrvList.getPrinterListCount(search);
            let getPrinterList = await Evolve.App.Services.Evolve.printerMaster.SrvList.getPrinterList(start, length,search);
            if (getPrinterList instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get printer list !",
                    result: getPrinterList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getPrinterList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Printer Data list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32579: Error while getting peinter list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32579: Error while getting peinter list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addPrinter: async function (req, res) {
        try {
            console.log("add printer", req.body);
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getUnitId = await Evolve.App.Services.Evolve.printerMaster.SrvList.getUnitId(req.body.EvolveUnit_Code);
            req.body.EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID
            let result = await Evolve.App.Services.Evolve.printerMaster.SrvList.addPrinter(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add printer !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Printer Added Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32580: Error while adding printer "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32580: Error while adding printer "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editPrinter: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getUnitId = await Evolve.App.Services.Evolve.printerMaster.SrvList.getUnitId(req.body.EvolveUnit_Code);
            req.body.EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID
            let result = await Evolve.App.Services.Evolve.printerMaster.SrvList.editPrinter(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update printer !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Printer updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32581: Error while updating printer "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32581: Error while updating printer "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingelPrinterData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.printerMaster.SrvList.getSingelPrinterData(req.body.EvolvePrinter_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single printer data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single Printer Data",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32582: Error while getting single printer data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32582: Error while getting single printer data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deletePrinter: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.printerMaster.SrvList.deletePrinter(req.body.EvolvePrinter_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete printer !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Printer deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32583: Error while deleting printer "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32583: Error while deleting printer "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnitList: async function (req, res) {
        try {
            let unitList = await Evolve.App.Services.Evolve.printerMaster.SrvList.getUnitList();

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
            Evolve.Log.error(" EERR32584: Error while getting unit list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32584: Error while getting unit list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}