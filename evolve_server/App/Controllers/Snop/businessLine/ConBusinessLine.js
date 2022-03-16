'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    addBusinessLine: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let addLineData = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.addBusinessLine(req.body);
            if (addLineData instanceof Error || addLineData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Business Line ",
                    addLineData: addLineData.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Line  Added Successfully !",
                    addLineData: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0929: Error while adding Business Line "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0929: Error while adding Business Line "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getbusinessLineList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getBusinessLineListCount = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.getbusinessLineListCount(search);
            let getBusinessLineList = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.getbusinessLineList(start,length,search);
            if (getBusinessLineList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Business Line ",
                    getBusinessLineList: getBusinessLineList.message
                };
                res.send(obj);
            }
            else {
                let resObj = {
                    noOfRecord: getBusinessLineListCount.recordset[0].count,
                    records: getBusinessLineList.recordset
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Line List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0930: Error while getting business Line List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0930: Error while getting business Line List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleBusinessLine: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getSingleLineData = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.getSingleBusinessLine(req.body);
            if (getSingleLineData instanceof Error || getSingleLineData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Line data ",
                    getSingleLineData: getSingleLineData.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    result: getSingleLineData.recordset[0],


                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0931: Error while getting Single Business Line "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0931: Error while getting Single Business Line "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBusinessLine: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateLineData = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.updateBusinessLine(req.body);
            if (updateLineData instanceof Error || updateLineData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on update Business Line ",
                    updateLineData: updateLineData.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Line  Updated Successfully !",
                    updateLineData: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0932: Error while updating business line  "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0932: Error while updating business line  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteBusinessLine: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let deleteLineData = await Evolve.App.Services.Snop.businessLine.SrvBusinessLine.deleteBusinessLine(req.body);
            if (deleteLineData instanceof Error || deleteLineData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on delete Business Line ",
                    deleteLineData: deleteLineData.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Line  deleted Successfully !",
                    deleteLineData: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0933: Error while delete Business Line "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0933: Error while delete Business Line "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}