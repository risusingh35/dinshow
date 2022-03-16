'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getGateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eGateControl.Reports.SrvMaterial.getGateListCount(search);
            let List = await Evolve.App.Services.eGateControl.Reports.SrvMaterial.getGateList(start, length,search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Gate List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gate List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Gate list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Gate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    showGateDetailsData: async function (req, res) {
        try {
            let List = await Evolve.App.Services.eGateControl.Reports.SrvMaterial.showGateDetailsData(req.body.EvolveGateDetails_ID);
           
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Gate Details Data List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gate Details Data List",
                    result:  List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Gate Details Data list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Gate Details Data list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    printGateDocument : async function (req , res) {
        try {
            let doc = {
                EvolvePrintProcess_Data: `${Evolve.Config.SERVERURL}printFiles/${req.body.EvolveGate_RefNumber}.pdf`,
                EvolvePrintProcess_CreatedAt : new Date(),
                EvolvePrintProcess_CreatedUser : 1,
                EvolvePrintProcess_UpdatedAt : new Date(),
                EvolvePrintProcess_UpdatedUser : 1,
                EvolvePrintProcess_Status: 0,
                EvolvePrinter_ID : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                EvolvePrinter_Code : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                EvolvePrintProcess_ErrorCode : '',
                EvolvePrintProcess_ErrorMessage : ''
              }
              let result = await Evolve.Mongo.collection('EvolvePrintDetails').insertOne(doc);

              if(result.result.ok == 1) {
                let objForPrinter = {
                    EvolvePrintProcess_ID: result.insertedId,
                    EvolvePrintProcess_Data: `${Evolve.Config.SERVERURL}printFiles/${req.body.EvolveGate_RefNumber}.pdf`,
                    EvolvePrinter_Name: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Name,
                    EvolvePrinter_Code: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                    EvolvePrinter_ID: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                    EvolvePrinter_IP: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_IP,
                    EvolvePrinter_Port: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Port,
                    EvolvePrinter_pcName: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_pcName,
                    EvolvePrinter_Type: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Type,
                    EvolvePrinter_SubType: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_SubType,
                    EvolvePrinter_Copy : 1
                }
                Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.push(objForPrinter);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Print Command Send Successfully !! " + req.body.EvolveGate_RefNumber,
                    result: null
                };
                res.send(obj);
              }else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error While Send Print Command !! ",
                    result: null
                };
                res.send(obj);
              }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error While Send Print Command !! ",
                result: null
            };
            res.send(obj);
        }
    }

}