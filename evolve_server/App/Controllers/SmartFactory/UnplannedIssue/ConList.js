'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

   
    getPalletData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedIssue.SrvList.getPalletData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Pallet ID Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Pallet Id Data" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Pallet Id Data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },      
   
    getReasonList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedIssue.SrvList.getReasonList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Get Reason List",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Location List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Location List" + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    addUnplannedIssue: async function (req, res) {
        try {
            console.log(req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getTransTypeID = await Evolve.App.Services.SmartFactory.UnplannedIssue.SrvList.getTransTypeID('UNP-ISS');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Trans Type Not Define",
                    result: null
                };
                res.send(obj);
            }else{
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                req.body.RemaingQty = req.body.TotalQty - req.body.IssueQty;
                let result = await Evolve.App.Services.SmartFactory.UnplannedIssue.SrvList.addUnplannedIssue(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error In Add Unplanned Issue",
                        result: null
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Unplanned Issue Successfully",
                        result: null,
                    };
                    res.send(obj);
                }
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while add unplanned Issue List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while add unplanned Issue List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}