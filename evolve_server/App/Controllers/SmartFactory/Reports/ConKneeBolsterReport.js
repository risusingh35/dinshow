'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


   // Knee Bolster Report
   getKneeBolsterReport: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
    // let search = req.body.search;
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      }

      let getKneeBolsterReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvKneeBolsterReport.getKneeBolsterReportCountList(searchData);
      if (length == -1) {
        length = getKneeBolsterReportCount.recordset[0].count;
      }
      let getKneeBolsterReport = await Evolve.App.Services.SmartFactory.Reports.SrvKneeBolsterReport.getKneeBolsterReportDatatableList(start, length, searchData);
      if (getKneeBolsterReport instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get Knee Bolster Report !",
          parselList: null
        };
        res.send(obj);
      }
      else{
        let resObj = {
          noOfRecord: getKneeBolsterReportCount.recordset[0].count,
          records: getKneeBolsterReport.recordset
        }

        let obj = {
          statusCode: 200,
          status: "success",
          message: "Knee Bolster Report",
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