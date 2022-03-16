'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addDocumentType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentType.SrvList.addDocumentType(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Document Type!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Document Type Add Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding document Type "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding document Type"+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDocumentTypeList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.DocumentType.SrvList.getDocumentTypeListCount(search);
            let result = await Evolve.App.Services.Evolve.DocumentType.SrvList.getDocumentTypeList(start, length, search);
            console.log("result",result)
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document type list!",
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
                    message: "Document type list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0238: Error while getting document type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0238: Error while getting document type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleDocumentType: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentType.SrvList.getSingleDocumentType(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Document type list!",
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
    updateDocumentTypeData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentType.SrvList.updateDocumentTypeData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Document Type list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Document type Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while updating type document "+error.message);
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