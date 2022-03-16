'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getTravelReqDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.getTravelReqDetails();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error While get Travel Request Details List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error while get Travel Request Details List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error while get Travel Request Details List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addTravelReqDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
                let addres = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.addTravelReqDetails(req.body)
                if (addres instanceof Error || addres.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " Error While Add Travel Request Details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Request Details Added Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
        } catch (error) {
            Evolve.Log.error(" Error While Add Travel Request Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error While Add Travel Request Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleTravelReqDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let details = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.getSingleTravelReqDetails(req.body)
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Travel Request Details details ",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: details.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error While get Travel Request Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While get Travel Request Details details',
                result: null
            };
            res.send(obj);
        }
    },
    updateTravelReqDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
                let details = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.updateTravelReqDetails(req.body)
                if (details instanceof Error || details.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While update Travel Request Details details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Request Details Updated Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            // }
        } catch (error) {
            Evolve.Log.error(" Error While update Travel Request Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While update Travel Request Details details',
                result: null
            };
            res.send(obj);
        }
    },

    deleteTravelReqDetails: async function (req, res) {
        try {
            let deleteMode = await Evolve.App.Services.Suraksha.TravelReqDetails.SrvList.deleteTravelReqDetails(req.body)
           
            if (deleteMode instanceof Error || deleteMode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Delete Travel Request Details",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Request Details Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error While delete Travel Request Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While delete Travel Request Details details',
                result: null
            };
            res.send(obj);
        }
    },    
 
}