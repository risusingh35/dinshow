'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getDocumentTypeList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.getDocumentTypeList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Document Type!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while get document Type "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while get document Type"+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
    addDocumentSubType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.addDocumentSubType(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add Document Sub Type!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Document sub Type Add Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding document Sub Type "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding document Sub Type"+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDocumentSubTypeList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.getDocumentSubTypeListCount(search);
            let result = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.getDocumentSubTypeList(start, length, search);
            console.log("result",result)
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get document sub type list!",
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
                    message: "Document sub type  list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0238: Error while getting document sub type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0238: Error while getting document sub type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleDocumentSubType: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.getSingleDocumentSubType(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single Document sub type list!",
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
            Evolve.Log.error(" EERR0244: Error while getting single sub type document "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0244: Error while getting single sub type document "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateDocumentSubType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DocumentSubType.SrvList.updateDocumentSubType(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update Document sub Type list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Document type Update sub Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while updating sub type document "+error.message);
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