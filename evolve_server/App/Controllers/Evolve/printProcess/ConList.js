'use strict';
const Evolve = require("../../../../Boot/Evolve");
const nodemailer = require('nodemailer');
module.exports = {

    getPrintProcessListOnline : async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessListOnlineCount(search);
            let result = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessListOnline(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Print Online Process List list!",
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
                    message: "Print Online Process List list",
                    result: resObj,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32731: Error while Get Print Online Process List list! "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32731: Error while Get Print Online Process List list! "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getPrintProcessListOffline : async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessListOfflineCount(search);
            let result = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessListOffline(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error while get Print Process List Offline!",
                    result: null
                };
                res.send(obj);
            } else {
                for(let i = 0 ; i < result.recordset.length ; i++){
                    result.recordset[i].EvolvePrintLabelSerial_Number = result.recordset[i].EvolvePrintLabelSerial_Number.split("~")[1]
                }
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Print Process List Offline",
                    result: resObj,
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32732: Error while Get Print Offline Process List list! "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32732: Error while Get Print Offline Process List list! "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onClickRePrint : async function (req,res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.printProcess.SrvList.onClickRePrint(req.body);
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
            let getAllPrinter = await Evolve.App.Services.Evolve.printProcess.SrvList.getAllPrinter();
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

    requeueAllErrorLabels : async function (req , res) {
        try {
            let error = false;
            for(let i = 0 ; i < req.body.rePrintList.length ; i++){
                req.body.rePrintList[i].EvolveUser_ID = req.EvolveUser_ID;
                let getAllPrinter = await Evolve.App.Services.Evolve.printProcess.SrvList.onClickRePrint(req.body.rePrintList[i]);
            if (getAllPrinter instanceof Error || getAllPrinter.rowsAffected < 1) {
                error = true;
                i = req.body.rePrintList.length;
            }
            }
            if(error == false){
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Requeue Successfully",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting Requeue Labels",
                    result: getAllPrinter.message
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while ReQueue Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while ReQueue Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}
