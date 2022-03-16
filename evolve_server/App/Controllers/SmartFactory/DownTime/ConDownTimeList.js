'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    
// Andon Report


getAndonReportList: async function(req , res) {
    try {
        let start = parseInt(req.body.start);
        let length = parseInt(req.body.length);
        let search = req.body.search.value;
   
        let searchData = {
          startDate : req.body.startDate,
          endDate : req.body.endDate,
        }
        let proPlanCount = await  Evolve.App.Services.SmartFactory.DownTime.SrvDownTimeList.getAndonReportListCountList(searchData);
        let proPlan = await Evolve.App.Services.SmartFactory.DownTime.SrvDownTimeList.getAndonReportListDatatableList(start,length,searchData);
  
        // console.log("proPlanCount>>", proPlanCount.recordset[0].count)
  
        var obj = {
          'draw': req.body.draw,
          'recordsTotal': proPlanCount.recordset[0].count,
          'recordsFiltered': proPlanCount.recordset[0].count,
          'data':proPlan.recordset
        };
        res.send(obj);
      } catch (error) {
        Evolve.Log.error(" EERR0571: Error while getting Andon Report List "+error.message);
        let obj = { statusCode: 400, status: "fail", message: "EERR0571: Error while getting Andon Report List "+error.message, result: null };
        res.send(obj);
      }
  },
  



}