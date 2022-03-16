'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    // Milling Vibration Report
    getMillingVibrationReport: async function(req, res) {
      try {
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          // let search = req.query.search.value;
          let searchData = {
            machine : req.body.machine,
            SerialNo : req.body.SerialNo,
            startDate : req.body.startDate ,
            endDate : req.body.endDate
          }

          let getMillingVibrationReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvMillingVibrationReport.getMillingVibrationCountList(searchData);
          if (length == -1) {
            length = getMillingVibrationReportCount.recordset[0].count;
          }
          let getMillingVibrationReport = await Evolve.App.Services.SmartFactory.Reports.SrvMillingVibrationReport.getMillingVibrationDatatableList(start,length,searchData);
          if(getMillingVibrationReport instanceof Error) {
            let obj = { statusCode: 400, status: "fail", message: "Error While Get Milling Vibration Report!", result: null };
            res.send(obj)
          }else{
            let resObj = {
              noOfRecord : getMillingVibrationReportCount.recordset[0].count,
              records : getMillingVibrationReport.recordset
            }
            let obj = {
              statusCode : 200,
              status : "Success",
              message : "Milling Vibration Report!",
              result: resObj
            }
            res.send(obj)
          }
        } catch (error) {
          Evolve.Log.error(error.message);
          let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          res.send(obj);
        }
    },


}