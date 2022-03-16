'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  getConsoleAssyReport: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
    // let search = req.body.search;
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      }

      let getConsoleAssyReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvConsoleAssemblyReport.getConsoleAssyReportCountList(searchData);
      if (length == -1) {
        length = getConsoleAssyReportCount.recordset[0].count;
      }
      let getConsoleAssyReport = await Evolve.App.Services.SmartFactory.Reports.SrvConsoleAssemblyReport.getConsoleAssyReportDatatableList(start, length, searchData);

      if (getConsoleAssyReport instanceof Error) {
        let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while get Console Assembly Report !",
            parselList: null
        };
        res.send(obj);
    }
    else{
        let resObj = {
            noOfRecord: getConsoleAssyReportCount.recordset[0].count,
            records: getConsoleAssyReport.recordset
        }

        let obj = {
            statusCode: 200,
            status: "success",
            message: "Console Assembly Report List",
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