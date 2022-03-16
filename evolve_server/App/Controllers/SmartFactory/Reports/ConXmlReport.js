'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getXmlReport: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      // let searchdate = {
      //   startDate: req.query.startDate,
      //   endDate: req.query.endDate,
      // }
      // let searchSerialNo = {
      //   SerialNo: req.query.SerialNo,
      // }
 
       
        let getIpTraceReportCount = await Evolve.App.Services.SmartFactory.Reports.SrvXmlReport.getXmlReportCountList(search);
        if (length == -1) {
          length = getIpTraceReportCount.recordset[0].count;
        }
        let getIpTraceReport = await Evolve.App.Services.SmartFactory.Reports.SrvXmlReport.getXmlReportDatatableList(start, length , search);
    
        if(getIpTraceReport instanceof Error) {
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Xml Report!", result: null };
          res.send(obj)
        }else{
          let resObj = {
            noOfRecord : getIpTraceReportCount.recordset[0].count,
            records : getIpTraceReport.recordset
          }
          let obj = {
            statusCode : 200,
            status : "Success",
            message : "XML Report!",
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