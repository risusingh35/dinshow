'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getMachineWiseProdReports: async function(req, res) {
        try {
          let start = parseInt(req.body.start);
          let length = parseInt(req.body.length);
    
          let search = req.body.search.value;
          let searchData = {
            startDate: req.body.startDate,
            endDate: req.body.endDate
          };
    
          let andkey = false;
          let condition = "AND ";
          if (req.body.startDate != "" && req.body.endDate != "") {
            // condition = condition+" AND ";
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition =
              condition +
              "cast(epoh.EvolveProdOrderHistory_CreatedAt as date) >=" +
              "'" +
              req.body.startDate +
              "'" +
              " and cast(epoh.EvolveProdOrderHistory_CreatedAt as date) <=" +
              "'" +
              req.body.endDate +
              "'";
            andkey = true;
          }
    
          if (req.body.itemId != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition += " epoh.EvolveItem_ID = " + parseInt(req.body.itemId);
            andkey = true;
          }
    
          if (req.body.machineId != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition +=
              " epoh.EvolveMachine_ID = " + parseInt(req.body.machineId);
            andkey = true;
          }
    
          let dataTblCount = await Evolve.App.Services.SmartFactory.Reports.SrvMachineWiseProductionReport.getMachineWiseProdReportsCount(
            searchData,
            condition
          );
          if (length == -1) {
            length = dataTblCount.recordset.length;
          }
          let dataTblRecord = await Evolve.App.Services.SmartFactory.Reports.SrvMachineWiseProductionReport.getMachineWiseProdReportsDatatableList(
            start,
            length,
            condition
          );
    
          var obj = {
            draw: req.body.draw,
            recordsTotal: dataTblCount.recordset.length,
            recordsFiltered: dataTblCount.recordset.length,
            data: dataTblRecord.recordset
          };
          // console.log(obj);
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0736: Error while getting Machine Wise Prod Reports "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0736: Error while getting Machine Wise Prod Reports "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
      
  getItem: async function(req, res) {
    // console.log("SEARCH TERM IS >>>>> " ,req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.Reports.SrvMachineWiseProductionReport.getItem(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item list",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0737: Error while getting Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0737: Error while getting Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  
  getMachine: async function(req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.Reports.SrvMachineWiseProductionReport.getMachine(
        req.body.term
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Machine list",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0738: Error while getting Machine "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0738: Error while getting Machine "+error.message,
        result: null
      };
      res.send(obj);
    }
  },




}