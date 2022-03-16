'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //Rejection Report
    getRejectionReport: async function (req, res) {
      try {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
        // let search = req.query.search.value;
        let searchData = {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        }

        let getRejectionReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvRejectionReport.getRejectionReportCountList(searchData);
        if (length == -1) {
          length = getRejectionReportCount.recordset[0].count;
        }
        let getRejectionReport = await Evolve.App.Services.SmartFactory.Reports.SrvRejectionReport.getRejectionReportDatatableList(start, length, searchData);

        if(getRejectionReport instanceof Error) {
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Rejection Report!", result: null };
          res.send(obj)
        }else{
          let resObj = {
            noOfRecord : getRejectionReportCount.recordset[0].count,
            records : getRejectionReport.recordset
          }
          let obj = {
            statusCode : 200,
            status : "Success",
            message : "Rejection Report!",
            result: resObj
          }
          res.send(obj)
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