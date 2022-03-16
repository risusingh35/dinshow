'use strict';
const Evolve = require("../../../../Boot/Evolve");
const nodemailer = require('nodemailer');
module.exports = {

    getPrintProcessList : async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await Evolve.App.Services.Evolve.printProcess.SrvListV2.getPrintProcessListCount(search);
            let result = await Evolve.App.Services.Evolve.printProcess.SrvListV2.getPrintProcessList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while get Print Process List!",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Print Process List",
                    result: resObj,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32732: Error while Get Print Process List list! "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32732: Error while Get Print Process List list! "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onClickRePrint : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.printProcess.SrvListV2.onClickRePrint(req.body);
            if (result instanceof Error || result.rowsAffected <= 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while RePrint Label!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " RePrint Label SuccessFully!",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32737: Error while RePrint Label : "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32737: Error while RePrint Label ",
                result: null
            };
            res.send(obj);
        }
    },

    getAllPrinter : async function (req,res) {
        try {
            let getAllPrinter = await Evolve.App.Services.Evolve.printProcess.SrvListV2.getAllPrinter();
            if (getAllPrinter instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting online print history",
                    result: getAllPrinter.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Online Print Historyt",
                    result: getAllPrinter.recordset
                };
                res.send(obj);
            }
            // console.log("res>pr>>>>>>>>>", getAllPrinter);
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Reprint Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    rePrintAll : async function (req,res) {
        try {
            console.log(req.body.selectPrinter);
            let response = await Evolve.App.Services.Evolve.printProcess.SrvListV2.rePrintAll(req.body.selectPrinter);
            if (response instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting online print history",
                    result: response.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Online Print Historyt",
                    result: response.recordset
                };
                res.send(obj);
            }
            console.log("requeue<<<<", response);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Requeue All Error Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Requeue All Error Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
 
}
