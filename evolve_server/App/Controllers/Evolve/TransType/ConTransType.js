'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addTransType: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let addTransType = await Evolve.App.Services.Evolve.TransType.SrvTransType.addTransType(req.body);
            if (addTransType instanceof Error || addTransType.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Add Transaction Type ",
                    addTransType: addTransType.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Transaction Type Added Successfully !",
                    addTransType: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0420: Error while adding trans type "+error.message);
           
        }
    },
    //getTransTypeListCount

    getTransTypeList:  async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let getTransTypeListCount = await Evolve.App.Services.Evolve.TransType.SrvTransType.getTransTypeListCount(search);
            let getTransTypeList = await Evolve.App.Services.Evolve.TransType.SrvTransType.getTransTypeList(start, length,search);
            if (getTransTypeList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get trans type list !",
                    result: getTransTypeList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getTransTypeListCount.recordset[0].count,
                    records: getTransTypeList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "trans type list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0408: Error while getting trans type list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0408: Error while getting trans type list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleTransTypeData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getSingleLineData = await Evolve.App.Services.Evolve.TransType.SrvTransType.getSingleTransTypeData(req.body);
            if (getSingleLineData instanceof Error || getSingleLineData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Transaction Type Data ",
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
            Evolve.Log.error(" EERR0422: Error while getting single trans type data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0422: Error while getting single trans type data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateTransType: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let updateTransType = await Evolve.App.Services.Evolve.TransType.SrvTransType.updateTransType(req.body);
            if (updateTransType instanceof Error || updateTransType.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on update Transaction Type ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Transaction Type Updated Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0423: Error while updating trans type "+error.message);
    
        }
    },

    deleteTransType: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let deleteTransType = await Evolve.App.Services.Evolve.TransType.SrvTransType.deleteTransType(req.body);
            if (deleteTransType instanceof Error || deleteTransType.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on delete Business Line ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Transaction Type Deleted Successfully !",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0424: Error while delete trans type "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0424: Error while delete trans type "+error.message,
                result: null
            };
            res.send(obj);
        }
    },





}