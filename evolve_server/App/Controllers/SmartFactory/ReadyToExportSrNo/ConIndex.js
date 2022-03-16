'use strict';
const Evolve = require("../../../../Boot/Evolve");
const { Console } = require("winston/lib/winston/transports");
module.exports = {
    getCompletedWoList: async function (req, res) {
        try {
            let workOrderList = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.getCompletedWoList();
            let obj = {
            statusCode: 200,
            status: "success",
            message: "Work order list",
            result: workOrderList.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR2612 : Error while getting completed Work Order List "+error.message);
            let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR2612 : Error while getting completed Work Order List "+error.message,
            result: null
            };
            res.send(obj);
        }
    },

    getAllItem: async function (req, res) {
        try {
            let itemList = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.getAllItem();
            let obj = {
            statusCode: 200,
            status: "success",
            message: "Work order list",
            result: itemList.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR2613 : Error while getting item List "+error.message);
            let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR2613 : Error while getting item List "+error.message,
            result: null
            };
            res.send(obj);
        }
    },

    getReadySerialNumberList: async function (req, res) {
        try {
            let condition = "";
            // console.log(req.body);
            if(req.body.EvolveItem_ID == '' && req.body.EvolveProdOrders_ID == "" && req.body.EvolveProdOrdersDetail_Serial == "") {
                condition = condition + " AND Convert(varchar,epod.EvolveProdOrdersDetail_CreatedAt,23) BETWEEN '"+req.body.startDate+"' AND '"+req.body.endDate+"'";
            }

            if(req.body.EvolveItem_ID != '') {
                condition = condition + " AND epo.EvolveItem_ID = "+req.body.EvolveItem_ID;
            }

            if(req.body.EvolveProdOrders_ID != ""){
                condition = condition + " AND epo.EvolveProdOrders_ID = "+req.body.EvolveProdOrders_ID;
            }

            if(req.body.EvolveProdOrdersDetail_Serial != "") {
                condition = condition + " AND epod.EvolveProdOrdersDetail_Serial LIKE '"+req.body.EvolveProdOrdersDetail_Serial+"'";
            }

            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let count = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.getReadySerialNumberListCount(condition);
            let serialNumbers = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.getReadySerialNumberList(condition , start, length);
            if (serialNumbers instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2614 : Error while get Export serial number list",
                    result: serialNumbers.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: serialNumbers.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Ready to Export serial number list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2614 : Error while get Export serial number list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2614 : Error while get Export serial number list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    exportSerialNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let exportSrNo = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.exportSerialNumber(req.body);
            if(exportSrNo instanceof Error || exportSrNo.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "EERR2615 : Error while export serial number", result: null};
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Serial number exported", result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2615 : Error while export serial number "+error.message);
            let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR2615 : Error while export serial number "+error.message,
            result: null
            };
            res.send(obj);
        }
    },

    exportSerialBulkNumber: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let exportSrNo = await Evolve.App.Services.SmartFactory.ReadyToExportSrNo.SrvIndex.exportSerialBulkNumber(req.body);
            if(exportSrNo instanceof Error || exportSrNo.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "EERR2616 : Error while export bulk serial number", result: null};
                res.send(obj);
            }
            else
            {
                let obj = { statusCode: 200, status: "success", message: "Serial numbers exported", result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2616 : Error while export bulk serial number "+error.message);
            let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR2616 : Error while export bulk serial number "+error.message,
            result: null
            };
            res.send(obj);
        }
    },
}
