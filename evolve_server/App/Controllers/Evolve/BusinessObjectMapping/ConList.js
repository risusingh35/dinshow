'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getBusinessObjectMappingList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.businessObjectMappingCount(search); 

            let getBusinessObjectMappingList = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.getBusinessObjectMappingList(start, length, search);

            if (getBusinessObjectMappingList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Business Object Mapping List !",
                    result: getBusinessObjectMappingList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getBusinessObjectMappingList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Object Mapping List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32523: Error while getting business object mapping list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32523: Error while getting business object mapping list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    createBusinessObject: async function (req, res) {
        try {
            let checkBusinessObjectName = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.checkBusinessObjectName(req.body);
            if (checkBusinessObjectName instanceof Error || checkBusinessObjectName.rowsAffected > 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Business Object Already Exists !",
                    result: checkBusinessObjectName.message
                };
                res.send(obj);
            }
            else {
                let createBusinessObject = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.createBusinessObject(req.body);
                if (createBusinessObject instanceof Error || createBusinessObject.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error Create Business Object !",
                        result: createBusinessObject.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Business Object Created",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32524: Error while creating business object mapping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32524: Error while creating business object mapping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBusinessObject: async function (req, res) {
        try {
                let updateBusinessObject = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.updateBusinessObject(req.body);
                if (updateBusinessObject instanceof Error || updateBusinessObject.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error Create Business Object !",
                        result: updateBusinessObject.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Business Object Updated",
                        result: null
                    };
                    res.send(obj);
                }
        } catch (error) {
            Evolve.Log.error(" EERR32525: Error while updating business object mapping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32525: Error while updating business object mapping lg " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleBusinessObjectMapping: async function (req, res) {
        try {
            let getSingleBusinessObjectMapping = await Evolve.App.Services.Evolve.BusinessObjectMapping.SrvList.getSingleBusinessObjectMapping(req.body);

            if (getSingleBusinessObjectMapping instanceof Error || getSingleBusinessObjectMapping.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Get Business Object Mapping List !",
                    result: getSingleBusinessObjectMapping.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Object Mapping List",
                    result: getSingleBusinessObjectMapping.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32526: Error while getting single business object mapping " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32526: Error while getting single business object mapping " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}