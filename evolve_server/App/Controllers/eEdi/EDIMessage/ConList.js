'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getMessageList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.eEdi.EDIMessage.SrvList.getMessageListCount(search);
            let list = await Evolve.App.Services.eEdi.EDIMessage.SrvList.getMessageList(start, length,search);
            if (list instanceof Error) {
            Evolve.Log.error(" EERR####: Error while get EDI message list ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get EDI message list!",
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
                    message: "EDI message list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EDI message list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get EDI message list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addmessage: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
         
                let result = await Evolve.App.Services.eEdi.EDIMessage.SrvList.addmessage(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error while add EDI message ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR#### : Error while add EDI message",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "EDI message added successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add EDI message "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add EDI message "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getEDITemplateList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
         
                let list = await Evolve.App.Services.eEdi.EDIMessage.SrvList.getEDITemplateList(req.body);
                if (list instanceof Error) {
                    Evolve.Log.error(" EERR####: Error while get EDI template list ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR#### : Error while get EDI template list",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: " ",
                        result: list.recordset
                    };
                    res.send(obj);
                }
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get EDI template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add EDI message "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMessageDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.eEdi.EDIMessage.SrvList.getSingleMessageDetails(req.body);
        
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while get EDI message details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get EDI message details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EDI message details",
                    result: details.recordset[0]
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single EDI message details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single EDI message details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteMessageDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.eEdi.EDIMessage.SrvList.deleteMessageDetails(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while delete EDI message details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while delete EDI message details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "EDI message delete successfully",
                    result: null
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete message details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete message details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


    updateMessageDetails: async function (req, res) {
        try {
            // let checkStatusCode = await Evolve.App.Services.eEdi.EDIMessage.SrvList.checkStatusCode(req.body,'UPDATE');
            // if(checkStatusCode instanceof Error){
            //     Evolve.Log.error(" EERR####: Error while check EDI message ");

            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "EERR#### : Error while check EDI message ",
            //         result: null
            //     };
            //     res.send(obj);

            // }
            // else if (checkStatusCode.rowsAffected > 0) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "EDI message already exist !",
            //         result: null
            //     };
            //     res.send(obj);
            // } else {
                let result = await Evolve.App.Services.eEdi.EDIMessage.SrvList.updateMessageDetails(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error while update EDI message details ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR#### : Error while update EDI message details " ,
                        result: null 
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "EDI message updated successfully  ",
                        result: null
                    };
                    res.send(obj);
                }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update EDI message details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update EDI message details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}