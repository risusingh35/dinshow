'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllReasonList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.Reason.SrvList.getAllReasonCount(search);
            let list = await Evolve.App.Services.Evolve.Reason.SrvList.getAllReasonList(start, length, search);
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get reason list !",
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
                    message: "Reason list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0384: Error while getting all reason list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0384: Error while getting all reason list " + error.message, result: null };
            res.send(obj);
        }
    },

    createReason: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkReason = await Evolve.App.Services.Evolve.Reason.SrvList.checkReason(req.body);
            if (checkReason instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while check reason code", result: null };
                res.send(obj);
            } else {
                if (checkReason.recordset[0].count > 0) {
                    let obj = { statusCode: 400, status: "fail", message: "Reason Code Already Exists", result: null };
                    res.send(obj);
                } else {
                    let result = await Evolve.App.Services.Evolve.Reason.SrvList.createReason(req.body);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Error while creating  reason ", result: null };
                        res.send(obj);
                    } else {
                        // if (req.body.EvolveReason_IsParent == true) {
                            req.body.EvolveReason_ID = result.recordset[0].inserted_id
                            let reasonRules = await Evolve.App.Services.Evolve.Reason.SrvList.reasonRules(req.body)
                            if (reasonRules instanceof Error || reasonRules.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: "Error while creating reason rules", result: null };
                                res.send(obj);
                            } else {
                                let obj = { statusCode: 200, status: "success", message: "Reason Created Successfully", result: null };
                                res.send(obj);
                            }
                        // } else {
                        //     let obj = { statusCode: 200, status: "success", message: "Reason Created Successfully", result: null };
                        //     res.send(obj);
                        // }
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0385: Error while creating reason " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0385: Error while creating reason " + error.message, result: null };
            res.send(obj);
        }
    },

    selectSingleReason: async function (req, res) {
        try {
            let getSinsleReason = await Evolve.App.Services.Evolve.Reason.SrvList.selectSingleReason(req.body);
            if (getSinsleReason instanceof Error || getSinsleReason.rowsAffected < 1) {
                console.log("getSinsleReason ",getSinsleReason);
                let obj = { statusCode: 400, status: "fail", message: "Error on select  reason data!" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Reason Created", result: getSinsleReason.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0386: Error while selecting reason " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0386: Error while selecting reason " + error.message, result: null };
            res.send(obj);
        }
    },

    updateReason: async function (req, res) {
        try {
            let checkUpdateReason = await Evolve.App.Services.Evolve.Reason.SrvList.checkUpdateReason(req.body);
            if (checkUpdateReason instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while check reason code", result: null };
                res.send(obj);
            } else {
                if (checkUpdateReason.recordset[0].count > 0) {
                    let obj = { statusCode: 400, status: "fail", message: "Reason Code Already Exists", result: null };
                    res.send(obj);
                } else {
                    let result = await Evolve.App.Services.Evolve.Reason.SrvList.updateReason(req.body);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Error while updating reason!", result: null };
                        res.send(obj);
                    }else {
                        let obj = { statusCode: 200, status: "success",  message: "Reason Updated successfully", result: null };
                        res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0387: Error while updating  reason " + error.message);
                let obj = { statusCode: 400, status: "fail", message: " EERR0387: Error while updating reason "+error.message, result: null };
                res.send(obj);
        }
        // try {
        //     let result = await Evolve.App.Services.Evolve.Reason.SrvList.updateReason(req.body);
        //     if (result instanceof Error || result.rowsAffected < 1) {
        //         let obj = { statusCode: 400, status: "fail" , message: "Error while updating reason!", result: null };
        //         res.send(obj);
            // } else {
            //     let obj = { statusCode: 200, status: "success",  message: "Reason Updated successfully", result: null };
            //     res.send(obj);
            // }
        // } catch (error) {
        //     Evolve.Log.error(" EERR0387: Error while updating  reason "+error.message);
        //     let obj = { statusCode: 400, status: "fail", message: " EERR0387: Error while updating reason "+error.message, result: null };
        //     res.send(obj);
        // }
    },

    changeReasonStatus: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Reason.SrvList.changeReasonStatus(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error on change reason status", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Reason status changed", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0388: Error while changing reason status " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0388: Error while changing reason status " + error.message, result: null };
            res.send(obj);
        }
    },
        reasonCodeList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Reason.SrvList.reasonCodeList();
            if (result instanceof Error ) {
                let obj = { statusCode: 400, status: "fail", message: "Error on get reason code list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Reason code list", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0388: Error while get reason code list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0388: Error while get reason code list " + error.message, result: null };
            res.send(obj);
        }
    },
}