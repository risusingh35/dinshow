'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDocumentList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.getDocumentList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Document Get Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" Error while getting document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error while getting document "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    
    getDSTokenList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.getDSTokenList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "DS Token Get Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" Error while getting DS Token "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error while getting DS Token "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    getDocumentToTokenList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getDocumentToTokenListCount = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.getDocumentToTokenListCount(search);
            let getDocumentToTokenList = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.getDocumentToTokenList(start, length,search);
            if (getDocumentToTokenList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting Document to token list !",
                    result: getDocumentToTokenList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getDocumentToTokenListCount.recordset[0].count,
                    records: getDocumentToTokenList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Document to token list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while getting Document to token list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while getting Document to token list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addDocumentToToken: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.addDocumentToToken(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while linkup document to token",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Document to Token Linkup successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while linkup document to token "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while linkup document to token "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleDocToTokenData: async function (req, res) {
        try {
            let getSingleDocToTokenData = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.getSingleDocToTokenData(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Single Document to Token Data",
                result: getSingleDocToTokenData.recordset[0]
            };

            res.send(obj);
        } catch (error) {
            Evolve.Log.error("Error while document to token fetch single data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while document to token fetch single data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateDocumentToToken: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentToToken.SrvList.updateDocumentToToken(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on update document to token !" ,
                    result: null 
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Document to token updated",
                    result: result.recordsets
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error on update document to token "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error on update document to token "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}