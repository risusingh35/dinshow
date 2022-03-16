'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    // Door Assembly Report
    getDoorAssyReport: async function (req, res) {
      try {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
      // let search = req.body.search;
        let searchData = {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        }

        let getDoorAssyReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvDoorAssemblyReport.getDoorAssyReportCountList(searchData);
        if (length == -1) {
          length = getDoorAssyReportCount.recordset[0].count;
        }

        console.log("getDoorAssyReportCount>>>" , getDoorAssyReportCount)
        let getDoorAssyReport = await Evolve.App.Services.SmartFactory.Reports.SrvDoorAssemblyReport.getDoorAssyReportDatatableList(start, length, searchData);

        console.log("getDoorAssyReport>>>" , getDoorAssyReport)


        if (getDoorAssyReport instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Door Assembly Report !",
                    parselList: null
                };
                res.send(obj);
            }
            else{
                let resObj = {
                    noOfRecord: getDoorAssyReportCount.recordset[0].count,
                    records: getDoorAssyReport.recordset
                }

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Door Assembly Report List",
                    result: resObj,
                };
                res.send(obj);
            }

      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = {
          statusCode: 400,
          status: "fail",
          message: error.message,
          result: null
        };
        res.send(obj);
      }
    },


}