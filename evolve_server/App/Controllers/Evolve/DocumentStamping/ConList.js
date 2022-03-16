'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.getDocumentList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Document list !",
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
            Evolve.Log.error(" EERR0247: Error while getting document List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting document List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDocumentStampingList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.getDocumentStampingListCount(search);
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.getDocumentStampingList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Document Stamping List !",
                    result: result.message
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
            Evolve.Log.error(" EERR0247: Error while getting Document Stamping List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0247: Error while getting Document Stamping List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addDocumentStamping: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.addDocumentStamping(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Document Stamping",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Document Stamping Added Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0246: Error while adding Document Stamping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0246: Error while adding Document Stamping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleDocumentStamping: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.getSingleDocumentStamping(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Single Document Stamping",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully !",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0248: Error while getting single Document Stamping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0248: Error while getting single Document Stamping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateDocumentStamping: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.updateDocumentStamping(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on update Document Stamping",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Document Stamping update Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while updating Document Stamping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while updating Document Stamping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    checkDocumentStampingCode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentStamping.SrvList.checkDocumentStampingCode(req.body);
            if (result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "success",
                    message: "success",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Code Allready Define",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0249: Error while Check Code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0249: Error while Check Code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}