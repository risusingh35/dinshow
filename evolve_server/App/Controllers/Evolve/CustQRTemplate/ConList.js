'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addCustQRTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.CustQRTemplate.SrvList.addCustQRTemplate(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Cust QR Template!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Cust QR Template Add Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding Cust QR Template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding Cust QR Template"+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getCustQRTemplateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.CustQRTemplate.SrvList.getCustQRTemplateListCount(search);
            let result = await Evolve.App.Services.Evolve.CustQRTemplate.SrvList.getCustQRTemplateList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Cust QR Template list!",
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
                    message: "Cust QR Template list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0238: Error while getting Cust QR Template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0238: Error while getting Cust QR Template list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleCustQRTemplate: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.CustQRTemplate.SrvList.getSingleCustQRTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Cust QR Template list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0244: Error while getting single type document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0244: Error while getting single type document "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateCustQRTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.CustQRTemplate.SrvList.updateCustQRTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Cust QR Template list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Cust QR Template Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while updating Cust QR Template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },


}