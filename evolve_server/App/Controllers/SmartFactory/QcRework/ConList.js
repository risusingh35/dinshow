'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getRejectionQcProcess: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QcRework.SrvList.getRejectionQcProcess();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Qc Rework process",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0715: Error while getting Rejection Qc Process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0715: Error while getting Rejection Qc Process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getReworkLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QcRework.SrvList.getReworkLocation(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Location",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0716: Error while getting Rework Location "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0716: Error while getting Rework Location "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateQcRework: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QcRework.SrvList.updateQcRework(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on update QC Rework",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Rework update success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0717: Error while updating Qc Rework "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0717: Error while updating Qc Rework "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateQcScrap: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QcRework.SrvList.updateQcScrap(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on update QC Scrap",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Scrap update success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0718: Error while updating Qc Scrap "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0718: Error while updating Qc Scrap "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}