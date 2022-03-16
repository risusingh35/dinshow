'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getIpTraceReport: async function (req, res) {
      try {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
      // let search = req.body.search;
        let searchdate = {
          startDate: req.body.startDate,
          endDate: req.body.endDate,
        }
        let searchSerialNo = {
          SerialNo: req.query.SerialNo,
        }
   
        if (req.query.startDate != "" && req.query.endDate != ""){
          let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvIpTraceReport.getIpTraceReportCountListDateWise(searchdate);
          if (length == -1) {
            length = getIpTraceReportCount.recordset[0].count;
          }
          let getIpTraceReport = await Evolve.App.Services.SmartFactory.Reports.SrvIpTraceReport.getIpTraceReportDatatableListDateWise(start, length, searchdate);
          
          if (getIpTraceReport instanceof Error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while get IP Trace Report !",
                parselList: null
            };
            res.send(obj);
        }
        else{
            let resObj = {
                noOfRecord: getIpTraceReportCount.recordset[0].count,
                records: getIpTraceReport.recordset
            }
  
            let obj = {
                statusCode: 200,
                status: "success",
                message: "IP Trace Report List",
                result: resObj,
            };
            res.send(obj);
        }
        
        }
        else{
          let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvIpTraceReport.getIpTraceReportCountListSerialWise(searchSerialNo);
          if (length == -1) {
            length = getIpTraceReportCount.recordset[0].count;
          }
          let getIpTraceReport = await Evolve.App.Services.SmartFactory.Reports.SrvIpTraceReport.getIpTraceReportDatatableListSerialWise(start, length, searchSerialNo);
      
          if (getIpTraceReport instanceof Error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while get IP Trace Report !",
                parselList: null
            };
            res.send(obj);
        }
        else{
            let resObj = {
                noOfRecord: getIpTraceReportCount.recordset[0].count,
                records: getIpTraceReport.recordset
            }
  
            let obj = {
                statusCode: 200,
                status: "success",
                message: "IP Trace Report List",
                result: resObj,
            };
            res.send(obj);
        }

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