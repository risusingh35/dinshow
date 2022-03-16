'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getEInvoiceList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.getEInvoiceListCount(search);
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.getEInvoiceList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Invoice list!",
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
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while getting E-Invoice List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while getting E-Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleEinvoiceList: async function (req, res) {
        try {
            let EInvoice = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.getSingleEinvoiceList(req.body);
            if (EInvoice instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Invoice list!",
                    result: null
                };
                res.send(obj);
            } else {
                let EInvoiceItem = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.getEinvoiceItemList(req.body);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: {
                        Einvoice : EInvoice.recordset,
                        EinvoiceItem : EInvoiceItem.recordset,
                    }
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while getting E-Invoice List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while getting E-Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateEinvoiceColumn: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.updateEinvoiceColumn(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update EInvoice Column value!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EInvoice Data Update Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while Update EInvoice Column value " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while Update EInvoice Column value " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    
    getSingleEinvoiceLineID: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.getSingleEinvoiceLineID(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Einvoice Line!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while get Single Einvoice Line " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while get Single Einvoice Line " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateEinvoiceLineColumn: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvItemList.updateEinvoiceLineColumn(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update EInvoice Line Column value!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EInvoice Line Data Update Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0097: Error while Update EInvoice Line Column value " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0097: Error while Update EInvoice Line Column value " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
   

}