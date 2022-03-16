'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

      // Report Dump
      getReportDump: async function(req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            // let search = req.body.search;
            let searchData = {
              SerialNo: req.body.SerialNo,
              
            }
  
            let getReportDumpCount = await Evolve.App.Services.SmartFactory.Reports.SrvReportDump.getReportDumpCountList(searchData);
            let getReportDump = await Evolve.App.Services.SmartFactory.Reports.SrvReportDump.getReportDumpDatatableList(start,length,searchData);
            
            if(getReportDump instanceof Error) {
              let obj = { statusCode: 400, status: "fail", message: "Error While Get Report Dump!", result: null };
              res.send(obj)
            }else{
              let resObj = {
                noOfRecord : getReportDumpCount.recordset[0].count,
                records : getReportDump.recordset
              }
              let obj = {
                statusCode : 200,
                status : "Success",
                message : "Report Dump!",
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