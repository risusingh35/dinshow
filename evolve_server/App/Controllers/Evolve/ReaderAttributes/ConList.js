'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttributesList: async function (req, res) {
        try {
            console.log("length>>>>>>>>>>>>>>>", req.body);
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.getReaderAttributesListCount(search); 

            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.getReaderAttributesList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Reader Attributes List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attributes List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader attributes List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting reader attributes List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getReaderCode : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.getReaderCode();

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get reader code !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Codes Get Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader codes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting reader codes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getParentReaderAttList : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.getParentReaderAttList();

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get reader attributes !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader attributes Get Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting reader attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addReaderAttributesData : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.addReaderAttributesData(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on add reader attributes !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attributes Added Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while adding reader attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while adding reader attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editReaderAttributesData : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.editReaderAttributesData(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on edit reader attributes !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader attributes edit Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while edit reader attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while edit reader attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteReaderAttributesData : async function (req, res) {
        try {

            let checkReaderAttributesId = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.checkReaderAttributesId(req.body.EvolveReaderAttributes_ID);

            if(checkReaderAttributesId instanceof Error){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on check reader attributes id !",
                    result: checkReaderAttributesId.message
                };
                res.send(obj);
            }
            else if(checkReaderAttributesId.rowsAffected > 0){
                let deleteReaderAttributesId = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.deleteReaderAttributesId(req.body.EvolveReaderAttributes_ID);
                if(deleteReaderAttributesId instanceof Error){
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on delete reader attributes id !",
                        result: deleteReaderAttributesId.message
                    };
                    res.send(obj);
                }
            }

            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.deleteReaderAttributesData(req.body.EvolveReaderAttributes_ID);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on delete reader attributes !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader attributes deleted Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete reader attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete reader attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleReaderAttributesData : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.getSingleReaderAttributesData(req.body.EvolveReaderAttributes_ID);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get single reader attributes !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single Reader attributes Successfuly",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single reader attributes " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single reader attributes " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    checkReaderAttrCode : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributes.SrvList.checkReaderAttrCode(req.body);
            if (result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Reader Attribute Code Not Matched !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Reader Code Is Already Defined ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while checking reader attribute code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while checking reader attribute code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}