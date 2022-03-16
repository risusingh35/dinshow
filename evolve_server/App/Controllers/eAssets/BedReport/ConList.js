'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getBedHistoryReport: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let searchdate = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                bedCode: req.body.bedCode,
                inorouttime: req.body.inorouttime,
            }
            let search = req.body.search.value;
            let getBedHistoryReportCount = await Evolve.App.Services.eAssets.BedReport.SrvList.getBedHistoryReportCount(searchdate);
            if (length == -1) {
                length = getBedHistoryReportCount.recordset[0].count;
            }
            let getBedHistoryReport = await Evolve.App.Services.eAssets.BedReport.SrvList.getBedHistoryReportDatatableList(start, length, searchdate);
            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getBedHistoryReportCount.recordset[0].count,
                'recordsFiltered': getBedHistoryReportCount.recordset[0].count,
                'data': getBedHistoryReport.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0118: Error while getting Bed History Report "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0118: Error while getting Bed History Report "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}