'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getNotifList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Suraksha.Notification.SrvList.getNotifCount(search);
            let list = await Evolve.App.Services.Suraksha.Notification.SrvList.getNotifList(start, length, search);
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
            Evolve.Log.error(" Error while getting all reason list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while getting all reason list " + error.message, result: null };
            res.send(obj);
        }
    },

    createNotif: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkNotif = await Evolve.App.Services.Suraksha.Notification.SrvList.checkNotif(req.body);
            if (checkNotif instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while check existing notification", result: null };
                res.send(obj);
            } else {
                if (checkNotif.recordset[0].count > 0) {
                    let obj = { statusCode: 400, status: "fail", message: "Notification Already Exists", result: null };
                    res.send(obj);
                } else {
                    let result = await Evolve.App.Services.Suraksha.Notification.SrvList.createNotif(req.body);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Error while creating  reason ", result: null };
                        res.send(obj);
                    } else {
                                let obj = { statusCode: 200, status: "success", message: "Notification Created Successfully", result: null };
                                res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" Error while creating notification " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while creating notification " + error.message, result: null };
            res.send(obj);
        }
    },

    selectSinglNotif: async function (req, res) {
        try {
            let details = await Evolve.App.Services.Suraksha.Notification.SrvList.selectSinglNotif(req.body);
            if (details instanceof Error || details.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error while get  notification details!" };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "", result: details.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error while get  notification details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while get  notification details " + error.message, result: null };
            res.send(obj);
        }
    },

    updateNotif: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let checkUpdateReason = await Evolve.App.Services.Suraksha.Notification.SrvList.checkUpdateNotif(req.body);
            if (checkUpdateReason instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while check reason code", result: null };
                res.send(obj);
            } else {
                if (checkUpdateReason.recordset[0].count > 0) {
                    let obj = { statusCode: 400, status: "fail", message: "Reason Code Already Exists", result: null };
                    res.send(obj);
                } else {
                    let result = await Evolve.App.Services.Suraksha.Notification.SrvList.updateNotif(req.body);
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
            Evolve.Log.error(" Error while updating  reason " + error.message);
                let obj = { statusCode: 400, status: "fail", message: " Error while updating reason "+error.message, result: null };
                res.send(obj);
        }
    },


}