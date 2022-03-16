'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getTravelMedReqDetails: async function (req, res) {
        try {
             let result = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.getTravelMedReqDetails();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error While get Travel Request Medical Details  !",
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
            Evolve.Log.error(" Error while get Travel Request Medical Details  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error while get Travel Request Medical Details  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addTravelReqMedDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
                let addres = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.addTravelReqMedDetails(req.body.EvolveTravelReqMedDetails_MedDetails , req.body.EvolveTravelReq_id )
                if (addres instanceof Error || addres.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " Error While Add Travel Request Medical Details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Request Medical Details Added Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
    
        } catch (error) {
            Evolve.Log.error(" Error While Add Travel Request Medical Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " Error While Add Travel Request Medical Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTravelReqMedDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let details = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.getTravelReqMedDetails(req.body)
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get Travel Request Medical Details details ",
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
            Evolve.Log.error(" Error While get Travel Request Medical Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While get Travel Request Medical Details details',
                result: null
            };
            res.send(obj);
        }
    },
    updatTravelReqMedDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
                let details = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.updatTravelReqMedDetails(req.body)
                if (details instanceof Error || details.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While update Travel Request Medical Details details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Request Medical Details Updated Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
        } catch (error) {
            Evolve.Log.error(" Error While update Travel Request Medical Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While update Travel Request Medical Details details',
                result: null
            };
            res.send(obj);
        }
    },

    deleteTravelReqMedDetails: async function (req, res) {
        try {
            let deleteMode = await Evolve.App.Services.Suraksha.TravelReqMedDetails.SrvList.deleteTravelReqMedDetails(req.body)
           
            if (deleteMode instanceof Error || deleteMode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Delete Travel Request Medical Details",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Request Medical Details Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error While delete Travel Request Medical Details details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: ' Error While delete Travel Request Medical Details details',
                result: null
            };
            res.send(obj);
        }
    },    
 
}