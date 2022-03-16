'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getShiftList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let getShiftListCount = await Evolve.App.Services.Evolve.Shift.SrvList.getShiftListCount(search);
            let getShiftList = await Evolve.App.Services.Evolve.Shift.SrvList.getShiftList(start, length,search);
            if (getShiftList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get shift list !",
                    result: getShiftList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getShiftListCount.recordset[0].count,
                    records: getShiftList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Shift list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0408: Error while getting shift list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0408: Error while getting shift list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addShift: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Shift.SrvList.addShift(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add shift",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Shift created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0409: Error while adding shift "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0409: Error while adding shift "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleShift: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.Shift.SrvList.getSingleShift(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Shift single list",
                result: processData.recordset
            };

            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0410: Error while getting single shift "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0410: Error while getting single shift "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateShift: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Shift.SrvList.updateShift(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while shift update !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Shift updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0411: Error while updating shift "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0411: Error while updating shift "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteShift: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Shift.SrvList.deleteShift(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete Shift !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Shift deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0412: Error while deelting shift "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0412: Error while deelting shift "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}