'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getTravelModeList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Suraksha.TravelMode.SrvList.getTravelModeCount(search);

            let result = await Evolve.App.Services.Suraksha.TravelMode.SrvList.getTravelModeList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32799 : Error While get Travel Mode List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
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
            Evolve.Log.error("EERR32800 : Error while get Travel Mode List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32800 : Error while get Travel Mode List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addTravelMode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let checkMode = await Evolve.App.Services.Suraksha.TravelMode.SrvList.checkTravelMode(req.body)
            if(checkMode instanceof Error){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR32802 : Error While Check Travel Mode",
                    result: '',
                };
                res.send(obj);

            }else if(checkMode.rowsAffected >0){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Travel Mode Already Exist",
                    result: '',
                };
                res.send(obj);

            }else{
                let addres = await Evolve.App.Services.Suraksha.TravelMode.SrvList.addTravelMode(req.body)
                if (addres instanceof Error || addres.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR32801 : Error While Add Travel Mode ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Mode Added Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
             }
        } catch (error) {
            Evolve.Log.error("EERR32803 : Error While Add Travel Mode " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32803 : Error While Add Travel Mode " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleModeDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let details = await Evolve.App.Services.Suraksha.TravelMode.SrvList.getSingleModeDetails(req.body)
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get travel mode details ",
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
            Evolve.Log.error("EERR32804 : Error While get travel mode details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32804 : Error While get travel mode details',
                result: null
            };
            res.send(obj);
        }
    },
    updatTravelModeDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let checkMode = await Evolve.App.Services.Suraksha.TravelMode.SrvList.checkTravelModeOnUpdate(req.body)
            if(checkMode instanceof Error){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check Travel Mode",
                    result: '',
                };
                res.send(obj);

            }else if(checkMode.rowsAffected >0){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Travel Mode Already Exist",
                    result: '',
                };
                res.send(obj);

            }else{
                let details = await Evolve.App.Services.Suraksha.TravelMode.SrvList.updatTravelModeDetails(req.body)
                if (details instanceof Error || details.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While update travel mode details ",
                        result: '',
                    };
                    res.send(obj);
                } else {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Travel Mode Updated Successfully !",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error("EERR32805 : Error While update travel mode details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32805 : Error While update travel mode details',
                result: null
            };
            res.send(obj);
        }
    },

    deleteTravelMode: async function (req, res) {
        try {
            let deleteMode = await Evolve.App.Services.Suraksha.TravelMode.SrvList.deleteTravelMode(req.body)
           
            if (deleteMode instanceof Error || deleteMode.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Delete Travel Mode",
                    result: '',
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Travel Mode Deleted Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR32806 : Error While delete travel mode details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: 'EERR32806 : Error While delete travel mode details',
                result: null
            };
            res.send(obj);
        }
    },    
 
}