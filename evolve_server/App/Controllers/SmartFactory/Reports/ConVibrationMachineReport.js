'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  getVibrationMachineReport: async function(req, res) {
    try {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
        let search = req.body.search;
        let searchData = {
          startDate : req.body.startDate,
          endDate : req.body.endDate,
        }

        let getVibrationMachineReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvVibrationMachineReport.getVibrationMachineReportCountList(searchData , search);
        if (length == -1) {
          length = getVibrationMachineReportCount.recordset[0].count;
        }
        let getVibrationMachineReport = await Evolve.App.Services.SmartFactory.Reports.SrvVibrationMachineReport.getVibrationMachineReportDatatableList(start,length,searchData,search);

        if(getVibrationMachineReport instanceof Error) {
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Vibrarion Machine Report!", result: null };
          res.send(obj)
        }else{
          let resObj = {
            noOfRecord : getVibrationMachineReportCount.recordset[0].count,
            records : getVibrationMachineReport.recordset
          }
          let obj = {
            statusCode : 200,
            status : "Success",
            message : "Vibration Machine Report!",
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