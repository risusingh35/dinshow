'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getApprovalMatrixList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.getApprovalMatrixListCount(search);
            let list = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.getApprovalMatrixList(start, length,search);
            if (list instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while get approval matrix list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval matrix list!",
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
                    message: "approval matrix list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get approval matrix list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get approval matrix list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addApprovalMatrix: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            // let checkStatusCode = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.checkStatusCode(req.body , 'INSERT');
            // if(checkStatusCode instanceof Error){
            // Evolve.Log.error(" EERR####: Error while check approval matrix ");

            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "EERR#### : Error while check approval matrix ",
            //         result: null
            //     };
            //     res.send(obj);

            // }
            // else if (checkStatusCode.rowsAffected > 0) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "approval matrix already exist !",
            //         result: null
            //     };
            //     res.send(obj);
            // } else {
                let result = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.addApprovalMatrix(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error while add approval matrix ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR#### : Error while add approval matrix",
                        result: null
                    };
                    res.send(obj);
                } else {
                                
				Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixList({

                    ACTION : 'ADDUPDATE',
                    EvolveApprovalMatrix_ID : result.recordset[0].inserted_id ,

                });
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "approval matrix added successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add approval matrix "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add approval matrix "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleMatrixDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.getSingleMatrixDetails(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error(" EERR####: Error while get approval matrix details ");

                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get approval matrix details !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "approval matrix details",
                    result: details.recordset[0]
                };
               res.send(obj);

             }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get single approval matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get single approval matrix details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateApprovalMatrixDetails: async function (req, res) {
        try {
            // let checkStatusCode = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.checkStatusCode(req.body,'UPDATE');
            // if(checkStatusCode instanceof Error){
            //     Evolve.Log.error(" EERR####: Error while check approval matrix ");

            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "EERR#### : Error while check approval matrix ",
            //         result: null
            //     };
            //     res.send(obj);

            // }
            // else if (checkStatusCode.rowsAffected > 0) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "approval matrix already exist !",
            //         result: null
            //     };
            //     res.send(obj);
            // } else {
                let result = await Evolve.App.Services.eDoa.ApprovalMatrix.SrvList.updateApprovalMatrixDetails(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    Evolve.Log.error(" EERR####: Error while update approval matrix details ");

                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR#### : Error while update approval matrix details " ,
                        result: null 
                    };
                    res.send(obj);
                } else {

                    Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixList({

                        ACTION : 'ADDUPDATE',
                        EvolveApprovalMatrix_ID : req.body.EvolveApprovalMatrix_ID ,
    
                    });

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "approval matrix updated successfully  ",
                        result: null
                    };
                    res.send(obj);
                }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update approval matrix details "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update approval matrix details "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}