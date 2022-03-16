'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getItemSearch(req.body.term);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Item search Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR3006: Error while getting Item search" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3006: Error while getting Item search" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getItemData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Get Item Data",
                    result: null
                };
                res.send(obj);
            }else{
                req.body.EvolveUom_ID = result.recordset[0].EvolveUom_ID;
                let getSecUomList = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getSecUomList(req.body);
                let obj = {
                statusCode: 200,
                status: "success",
                message: "Successfully",
                result: {
                   itemData : result.recordset,
                   secUomList : getSecUomList.recordset,
                }
            };
            res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR3007: Error while getting Item Data" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3007: Error while getting Item Data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    getLocationList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getLocationList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Get Location List",
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
            Evolve.Log.error("EERR3008: Error while getting Location List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3008: Error while getting Location List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },    
    getReasonList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getReasonList();
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
            Evolve.Log.error("EERR3009: Error while getting reason List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3009: Error while getting reason List" + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    addUnplannedReceipt: async function (req, res) {
        try {
            console.log(req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getTransTypeID = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.getTransTypeID('UNP-RCPT');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                Evolve.Log.error("EERR3010 :Error while get Trans Type")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3010: Trans Type Not Define",
                    result: null
                };
                res.send(obj);
            }else{
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                let palletNumber =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
                if (palletNumber == 0) {
                    Evolve.Log.error("EERR3011: Error while get pallet number")
                    let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3011: Error while get pallet number"   ,
                    result: null
                };
                res.send(obj);
                }else{
                    req.body.EvolveInventory_RefNumber = palletNumber;
                    let addUnplannedReceipt = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.addUnplannedReceipt(req.body);
                    if (addUnplannedReceipt instanceof Error || addUnplannedReceipt.rowsAffected < 1) {
                         Evolve.Log.error("EERR3012: Error while Inventory Unplanned Receipt")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR3012: Error while Inventory Unplanned Receipt",
                            result: null
                        };
                        res.send(obj);
                    }else{
                        req.body.EvolveInventory_ID = addUnplannedReceipt.recordset[0].inserted_id;
                        let addTranstionHistory = await Evolve.App.Services.SmartFactory.UnplannedReceipt.SrvList.addTranstionHistory(req.body);
                        console.log("addTranstionHistory",addTranstionHistory)
                        if (addTranstionHistory instanceof Error || addTranstionHistory.rowsAffected < 1) {
                            Evolve.Log.error("EERR3013: Error while Transtion History Unplanned Receipt")
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR3013: Error while Transtion History Unplanned Receipt",
                                result: null
                            };
                            res.send(obj);
                        }else{
                            let obj = {
                                statusCode: 200,
                                status: "success",
                                message: "Unplanned Receipt Successfully",
                                result: null,
                            };
                            res.send(obj);
                        }
                    }

                }
               
            }
            
        } catch (error) {
            Evolve.Log.error("EERR3014: Error while Add Unplanned Receipt " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3014: Error while Add Unplanned Receipt " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}