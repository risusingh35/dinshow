'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getReportData: async function (req, res) {
        try {
            let reportMenuUrl = req.body.reportMenuUrl;

            console.log("reportMenuUrl >>>", reportMenuUrl);


            // let start = parseInt(req.body.start);
            // let length = parseInt(req.body.length);
            // let searchdate = {
            //     startDate: req.body.startDate,
            //     endDate: req.body.endDate,
            //     bedCode: req.body.bedCode,
            //     inorouttime: req.body.inorouttime,
            // }
            // let search = req.body.search.value;
            // let getBedHistoryReportCount = await Evolve.App.Services.eAssets.BedReport.SrvList.getBedHistoryReportCount(searchdate);
            // if (length == -1) {
            //     length = getBedHistoryReportCount.recordset[0].count;
            // }
            // let getBedHistoryReport = await Evolve.App.Services.eAssets.BedReport.SrvList.getBedHistoryReportDatatableList(start, length, searchdate);
            var obj = {
                // 'draw': req.body.draw,
                // 'recordsTotal': getBedHistoryReportCount.recordset[0].count,
                // 'recordsFiltered': getBedHistoryReportCount.recordset[0].count,
                // 'data': getBedHistoryReport.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0062: Error while getting report data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0062: Error while getting report data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getReportData: async function (req, res) {
        try {
            let reportMenuUrl = req.body.reportMenuUrl;

            console.log("reportMenuUrl >>>", reportMenuUrl);

            let getData = await Evolve.App.Services.Analytics.Report.SrvReport.getReportData(reportMenuUrl);
            if (getData instanceof Error || getData.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Report not found ! ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Report ", result: getData.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0063: Error while getting report data "+error.message);
        }
    },


}