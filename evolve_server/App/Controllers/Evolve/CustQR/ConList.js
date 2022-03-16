'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCustQRList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.CustQR.SrvList.getCustQRListCount(search);
            let list = await Evolve.App.Services.Evolve.CustQR.SrvList.getCustQRListDatatable(start, length, search);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2583: Error while Cust QR list !",
                    result: list.message
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Cust QR list not found",
                    result: []
                };
                res.send(obj);
            }
            else{
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Cust QR list ",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2584: Error while Cust QR list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2584: Error while Cust QR list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCustQRTempList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.CustQR.SrvList.getCustQRTempList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Cust QR Template Not Found!",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2586: Error while get Cust QR Template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2586: Error while get Cust QR Template list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getEvolveTableList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.CustQR.SrvList.getEvolveTableList();
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2589: Error while get table list !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "tables not found",
                    result: []
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2590: Error while get table list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2590: Error while get tables "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTableFields: async function (req, res) {
        try {
            let list = await Evolve.App.Services.Evolve.CustQR.SrvList.getTableFields(req.body);
            if (list instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2591: Error while get table fields !",
                    result: null
                };
                res.send(obj);
            } else if(list.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "tables not found",
                    result: null
                };
                res.send(obj);

            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "tables",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2592: Error while get table fields "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2592: Error while get tables fields "+error.message,
                result: null
            };
            res.send(obj);
        }
    },   
    addCustQR: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
           let addMapping = await Evolve.App.Services.Evolve.CustQR.SrvList.addCustQR(req.body);
            if (addMapping instanceof Error || addMapping.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2593: Error while add Cust QR  !",
                    addMapping: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Cust QR added successfully ",
                    addMapping: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2595: Error while add Cust QR "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2595: Error while add gsp attribute mapping "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleCustQR: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Evolve.CustQR.SrvList.getSingleCustQR(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2596: Error while get Cust QR !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Cust QR ",
                    result: details.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2597: Error while get single Cust QR "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2597:Error while get single Cust QR "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateCustQR: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateDetails = await Evolve.App.Services.Evolve.CustQR.SrvList.updateCustQR(req.body);
            if (updateDetails instanceof Error || updateDetails.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2598: Error while update Cust QR!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Cust QR updated successfully ",
                    result: updateDetails.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2599: Error while update Cust QR"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2599: Error while update Cust QR"+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    
}