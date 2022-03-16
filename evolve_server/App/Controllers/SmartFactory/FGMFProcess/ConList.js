'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProdOrderDetailsList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.getProdOrderDetailsList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Production Order Data Not found",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while getting Production Order Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Production Order Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getBarcodeData: async function (req, res) {
        try {
            console.log("req.body.Barcode ===",req.body.Barcode);
            let checkFirstBarcode = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.checkFirstBarcode(req.body);
            if (checkFirstBarcode instanceof Error || checkFirstBarcode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Check Barcode!",
                    result: null
                };
                res.send(obj);
            } else {
                console.log("First Barcode ===",checkFirstBarcode.recordset[0].EvolveProdOrdersDetail_Serial);
                if(req.body.Barcode == checkFirstBarcode.recordset[0].EvolveProdOrdersDetail_Serial){
                    let result = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.getBarcodeData(req.body);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Barcode Data Not Found !",
                            result: result.message
                        };
                        res.send(obj);
                    } else {
                        let getProcessValData = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.getProcessValData(req.body);
                        if (result instanceof Error || result.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Process Val Data Not Found !",
                                result: result.message
                            };
                            res.send(obj);
                        }else{
                            let obj = {
                                statusCode: 200,
                                status: "success",
                                message: "success",
                                result: { 
                                    ProdOrder : result.recordset,
                                    ProcessVal : getProcessValData.recordset
                                }
                            };
                            res.send(obj);
                        }
                        
                    }
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Please Clear First Barcode!",
                        result: null
                    };
                    res.send(obj);
                }    
            }    
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while getting Barcode Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Barcode Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    MoveBarcode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.BinNumber = req.body.param[0].param_value;
            console.log("req.body.", req.body)
            let checkBinNo = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.checkBinNo(req.body);
            if (checkBinNo instanceof Error || checkBinNo.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Bin Number Not Found!",
                    result: checkBinNo.message
                };
                res.send(obj);
            }else{
                let getProdOrderHistory = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.getProdOrderHistory(req.body);
                if (getProdOrderHistory instanceof Error || getProdOrderHistory.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error On Get Prod Order Details Data!",
                        result: getProdOrderHistory.message
                    };
                    res.send(obj);
                }else{
                    let ProdOrderHistoryData = {
                        EvolveProdOrders_ID : getProdOrderHistory.recordset[0].EvolveProdOrders_ID,
                        EvolveProdOrders_Order : getProdOrderHistory.recordset[0].EvolveProdOrders_Order,
                        EvolveProdOrderDetails_ID : getProdOrderHistory.recordset[0].EvolveProdOrdersDetail_ID,
                        EvolveProdOrdersDetail_Serial : getProdOrderHistory.recordset[0].EvolveProdOrdersDetail_Serial,
                        EvolveItem_ID : getProdOrderHistory.recordset[0].EvolveItem_ID,
                        EvolveItem_Code : getProdOrderHistory.recordset[0].EvolveItem_Code,
                        EvolveProcessTemp_ID : getProdOrderHistory.recordset[0].EvolveProcessTemp_Id,
                        EvolveProcess_ID : req.body.param[0].EvolveProcess_ID,
                        EvolveProcess_Value : req.body.param[0].param_value,
                        EvolveProdOrderHistory_NextSeq :  getProdOrderHistory.recordset[0].EvolveProdOrdersDetail_NxtSeq,
                        EvolveProdOrderHistory_PrvSeq :  getProdOrderHistory.recordset[0].EvolveProdOrdersDetail_PrvSeq,
                        EvolveMachine_ID : req.body.param[0].EvolveMachine_ID,
                        EvolveProcessVal_ID : req.body.param[0].EvolveProcessVal_ID,
                    }
                    console.log("ProdOrderHistoryData===",ProdOrderHistoryData)
                    let getPrinterID = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.getPrinterID(req.body);
                    if (getPrinterID instanceof Error || getPrinterID.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "ERROR On Get Printer!",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        req.body.EvolvePrinter_ID = getPrinterID.recordset[0].EvolvePrinter_ID;

                        let InsertProdOrderHistory = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.InsertProdOrderHistory(req.body, ProdOrderHistoryData);
                        if (InsertProdOrderHistory instanceof Error || InsertProdOrderHistory.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error On Insert Prod Order History!",
                                result: InsertProdOrderHistory.message
                            };
                            res.send(obj);
                        }else{
                        let updateProdOrder = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.updateProdOrder(req.body);
                        if (updateProdOrder instanceof Error || updateProdOrder.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error On Update Prod Order!",
                                result: updateProdOrder.message
                            };
                            res.send(obj);
                        }else{
                            let updateProdOrderDetails = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.updateProdOrderDetails(req.body);
                            if (updateProdOrderDetails instanceof Error || updateProdOrderDetails.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error On Update Prod Order Details !",
                                    result: updateProdOrderDetails.message
                                };
                                res.send(obj);
                            }else{
                                    let newDate = new Date();
                                    let date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                                    let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
        
                                    req.body.EvolvePrintProcess_Data = "^XA^MD25^FO10,20^GB700,1,3^FS^CF0,25^FO10,40^FDBarcode Serial : "+req.body.Barcode+
                                    "^FS^FO10,70^FDBin No : "+req.body.BinNumber+
                                    "^FS^FO10,100^FDDate|Time : "+date+ " | "+time+
                                    "^FS^FO10,130^FDCEIL,MODHERA^FS^FO10,170^GB700,1,3^FS^XZ";
    
                                    let addPrinterProccess = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.addPrinterProccess(req.body);
                                    if (addPrinterProccess instanceof Error || addPrinterProccess.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "ERROR On add Printer Process!",
                                            result: null
                                        };
                                        res.send(obj);
                                    } else {
                                        req.body.EvolvePrintProcess_ID = addPrinterProccess.recordset[0].inserted_id;
                                        req.body.EvolvePrintHistoryDetails_Key = 'FGMF';
                                        req.body.EvolvePrintHistoryDetails_Value = req.body.Barcode;
                                        let addPrinterProcessDetails = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.addPrinterProcessDetails(req.body);
                                        if (addPrinterProcessDetails instanceof Error || addPrinterProcessDetails.rowsAffected < 1) {
                                            let obj = {
                                                statusCode: 400,
                                                status: "fail",
                                                message: "ERROR On add Printer Process Details!",
                                                result: null
                                            };
                                            res.send(obj);
                                        } else {
                                            let obj = { statusCode: 200, status: "success", message: "Barcode Move Success", result: null };
                                            res.send(obj);
                                        }
                                    }
                                }
                            }
                        }    
                    }
                }
            }    
            
        } catch (error) {
            Evolve.Log.error(" EERR0089: Error while Move Barcode data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0089: Error while Move Barcode data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    DeleteBarcode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.FGMFProcess.SrvList.DeleteBarcode(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Delete Barcode",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Barcode Delete Successfully!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while Deleteing Barcode "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while Deleteing Barcode "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}