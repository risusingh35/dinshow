'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    createVarianceGroup : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let createVarianceGroup = await Evolve.App.Services.Evolve.Variance.SrvList.createVarianceGroup(req.body);
            if (createVarianceGroup instanceof Error || createVarianceGroup.rowsAffected < 1) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2546 : Error while create variance group",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Variance group created successfully",result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2546 : Error while create variance group "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2546 : Error while create variance group",result: null};
            res.send(obj);
        }
    },

    getVarianceGroupAll : async function (req, res) {
        try {
            let getVarianceGroupAll = await Evolve.App.Services.Evolve.Variance.SrvList.getVarianceGroupAll();
            if (getVarianceGroupAll instanceof Error) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2547 : Error while get variance group",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Variance group gotted successfully",result: getVarianceGroupAll.recordset};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2547 : Error while get variance group "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2547 : Error while get variance group",result: null};
            res.send(obj);
        }
    },

    getSingleVarianceGroup : async function (req, res) {
        try {
            let getSingleVarianceGroup = await Evolve.App.Services.Evolve.Variance.SrvList.getSingleVarianceGroup(req.body);
            if (getSingleVarianceGroup instanceof Error) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2548 : Error while get single variance group",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Single Variance group gotted successfully",result: getSingleVarianceGroup.recordset[0]};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2548 : Error while get single variance group"+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2548 : Error while get single variance group",result: null};
            res.send(obj);
        }
    },

    updateVarianceGroup : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateVarianceGroup = await Evolve.App.Services.Evolve.Variance.SrvList.updateVarianceGroup(req.body);
            if (updateVarianceGroup instanceof Error || updateVarianceGroup.rowsAffected < 1) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2549 : Error while update variance group",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Variance group update successfully",result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2549 : Error while update variance group "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2549 : Error while update variance group",result: null};
            res.send(obj);
        }
    },

    createVariance : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let createVariance = await Evolve.App.Services.Evolve.Variance.SrvList.createVariance(req.body);
            if (createVariance instanceof Error || createVariance.rowsAffected < 1) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2550 : Error while create variance",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Variance group created successfully",result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2550 : Error while create variance"+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2550 : Error while create variance",result: null};
            res.send(obj);
        }
    },

    getVarianceAll: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let getVarianceAllCount = await Evolve.App.Services.Evolve.Variance.SrvList.getVarianceAllCount();
            let getVarianceAll = await Evolve.App.Services.Evolve.Variance.SrvList.getVarianceAll(start, length);
            if (getVarianceAll instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2551 : Error on get variance",
                    result: getVarianceAll.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getVarianceAllCount.recordset[0].count,
                    records: getVarianceAll.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Variance List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2551 : Error on get variance "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2551 : Error on get variance "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleVariance : async function (req, res) {
        try {
            let getSingleVariance = await Evolve.App.Services.Evolve.Variance.SrvList.getSingleVariance(req.body);
            if (getSingleVariance instanceof Error) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2552 : Error while get single variance",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Single Variance gotted successfully",result: getSingleVariance.recordset[0]};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2552 : Error while get single variance "+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2552 : Error while get single variance ",result: null};
            res.send(obj);
        }
    },

    updateVariance : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateVariance = await Evolve.App.Services.Evolve.Variance.SrvList.updateVariance(req.body);
            if (updateVariance instanceof Error || updateVariance.rowsAffected < 1) {
                let obj = {statusCode: 400,status: "fail",message: "EERR2553 : Error while update variance",result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success",message: "Variance updated successfully",result: null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2553 : Error while update variance"+error.message);
            let obj = {statusCode: 400,status: "fail",message: "EERR2553 : Error while update variance",result: null};
            res.send(obj);
        }
    },
}