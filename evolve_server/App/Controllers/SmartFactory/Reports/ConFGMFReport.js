'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getFGManufacturingReport: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.SmartFactory.Reports.SrvFGMFReport.getFGManufacturingReportCount(search, req.body);
            let result = await Evolve.App.Services.SmartFactory.Reports.SrvFGMFReport.getFGManufacturingReport(start, length, search, req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Report Data !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
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
            Evolve.Log.error(" EERR0255: Error while getting Report Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Report Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}    