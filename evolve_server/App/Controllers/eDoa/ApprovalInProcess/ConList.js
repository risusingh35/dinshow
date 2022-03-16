'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getApprovalInProcessList: async function (req, res) {
        try {
            // let start = parseInt(req.body.startFrom);
            // let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;

            // let count = await Evolve.App.Services.Evolve.StatusCode.SrvList.getStausCodeListCount(search);
            let list = await Evolve.App.Services.Evolve.StatusCode.SrvList.getApprovalInProcessList();
            if (list instanceof Error) {
            Evolve.Log.error(" EERR3027: Error while get status code list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3027 : Error while get status code list!",
                    result: list.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Status code list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3028: Error while get status code list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3028: Error while get status code list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addStatusCode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkStatusCode = await Evolve.App.Services.Evolve.StatusCode.SrvList.checkStatusCode(req.body , 'INSERT');
            if(checkStatusCode instanceof Error){
            Evolve.Log.error(" EERR3029: Error while check status code ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3029 : Error while check status code ",
                    result: null
                };
                res.send(obj);

            }
            else if (checkStatusCode.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Status code already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.StatusCode.SrvList.addStatusCode(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR3030: Error while add status code ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR3030 : Error while add status code",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Status code added successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR3031: Error while add status code "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3031: Error while add status code "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleCodeDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Evolve.StatusCode.SrvList.getSingleCodeDetails(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error(" EERR3032: Error while get status code details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3032 : Error while get status code details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "status code details",
                    result: details.recordset[0]
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR3033: Error while get single status code details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3033: Error while get single status code details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateCodeDetails: async function (req, res) {
        try {
            let checkStatusCode = await Evolve.App.Services.Evolve.StatusCode.SrvList.checkStatusCode(req.body,'UPDATE');
            if(checkStatusCode instanceof Error){
                Evolve.Log.error(" EERR3034: Error while check status code ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3034 : Error while check status code ",
                    result: null
                };
                res.send(obj);

            }
            else if (checkStatusCode.rowsAffected > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Status code already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.StatusCode.SrvList.updateCodeDetails(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR3035: Error while update status code details ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR3035 : Error while update status code details " ,
                        result: null 
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Status code updated successfully  ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR3036: Error while update status code details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3036: Error while update status code details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}