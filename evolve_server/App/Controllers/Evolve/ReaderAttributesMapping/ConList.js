'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getReaderAttMappingList: async function (req, res) {
        try {
            
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.getReaderAttMappingListCount(search); 

            let result = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.getReaderAttMappingList(start, length, search);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Reader Attributes Mapping List !",
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
                    message: "Reader List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting reader attributes mapping list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting reader attributes ampping list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getReaderAttCode : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.getReaderAttCode(req.body.EvolveReader_ID);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Reader Attribute Code !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attribute Code Added Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader Attribute Code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Adding Reader Attribute Code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addReaderAttMapping : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.addReaderAttMapping(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Reader Attribute Mapping !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attribute Mapping Added Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Adding Reader " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Adding Reader Attribute Mapping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editReaderAttMapping : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let result = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.editReaderAttMapping(req.body);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Edit Reader Attribute Mapping !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attribute Mapping Edit Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Edit Reader Attribute Mapping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Edit Reader Attribute Mapping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteReaderAttMappingData : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ReaderAttributesMapping.SrvList.deleteReaderAttMappingData(req.body.EvolveReaderAttrMapping_ID);

            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Delete Reader Attribute Mapping !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reader Attribute Mapping Deleted Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Delete Reader Attribute Mapping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Delete Reader Attribute Mapping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}