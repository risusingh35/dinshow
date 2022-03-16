'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getProductionHistoryReport: async function(req, res) {
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
              "cast(epodh.EvolveProdOrderHistory_CreatedAt as date) >=" +
              "'" +
              req.body.startDate +
              "'" +
              " and cast(epodh.EvolveProdOrderHistory_UpdatedAt as date) <=" +
              "'" +
              req.body.endDate +
              "'";
            andkey = true;
          }
    
          if (req.body.processId != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition +=
              " epodh.EvolveProcess_ID = " + parseInt(req.body.processId);
            andkey = true;
          }
    
          if (req.body.fromSerial != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition +=
              " epodh.EvolveProdOrdersDetail_Serial >= '" +
              req.body.fromSerial +
              "'";
            andkey = true;
          }
    
          if (req.body.itemId != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition += " epodh.EvolveItem_ID=" + parseInt(req.body.itemId);
            andkey = true;
          }
    
          let dataTblCount = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getProductionHistoryReportsCount(
            searchData,
            condition
          );
          if (length == -1) {
            length = dataTblCount.recordset[0].count;
          }
          let dataTblRecord = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getProductionHistoryReportsDatatableList(
            start,
            length,
            condition
          );
    
          var obj = {
            draw: req.body.draw,
            recordsTotal: dataTblCount.recordset[0].count,
            recordsFiltered: dataTblCount.recordset[0].count,
            data: dataTblRecord.recordset
          };
          // console.log(obj);
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0739: Error while getting production history report "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0739: Error while getting production history report "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getItem: async function(req, res) {
        // console.log("SEARCH TERM IS >>>>> " , req.body.term)
        try {
          let poList = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getItem(
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
          Evolve.Log.error(" EERR0740: Error while getting Item "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0740: Error while getting Item "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getMachineList: async function(req, res) {
        try {
          let getMachineList = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getMachineList();
          if (getMachineList instanceof Error || getMachineList.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on  Machine list",
              result: getMachineList.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: " Machine list successfully",
              result: getMachineList.recordsets[0]
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0741: Error while getting MachineList "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0741: Error while getting MachineList "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getProcessList: async function(req, res) {
        try {
          let start = parseInt(req.query.start);
          let length = parseInt(req.query.length);
          let getProcessListData = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getProcessList();
          if (
            getProcessListData instanceof Error ||
            getProcessListData.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on  Process List",
              result: getProcessListData.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: " Machine list successfully",
              result: getProcessListData.recordsets[0]
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0742: Error while getting process list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0742: Error while getting process list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getshiftList: async function(req, res) {
        try {
          let getshiftList = await  Evolve.App.Services.SmartFactory.Reports.SrvProdHistoryReport.getshiftList();
          if (getshiftList instanceof Error || getshiftList.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on  Shift List",
              result: getshiftList.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Shift list successfully",
              result: getshiftList.recordsets[0]
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0743: Error while getting shift list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0743: Error while getting shift list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
    
    



}