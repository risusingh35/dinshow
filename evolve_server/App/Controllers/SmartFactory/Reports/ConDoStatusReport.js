'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDoStatusReport: async function(req, res) {
        try {
          let start = parseInt(req.body.start);
          let length = parseInt(req.body.length);
          let searchData = {
            startDate: req.body.startDate,
            endDate: req.body.endDate
          };
    
          let andkey = false;
          let condition = "";
    
          if (req.body.radioValue != "") {
            condition = condition + " AND ";
            if (req.body.radioValue == "All") {
              condition +=
                "(edoh.EvolveDoLine_Status= 'close'  OR  edoh.EvolveDoLine_Status = 'open')";
            } else {
              condition +=
                "edoh.EvolveDoLine_Status= '" + req.body.radioValue + "'";
            }
    
            andkey = true;
          } else {
            andkey = true;
          }
    
          if (req.body.doNumber != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition += " edoh.EvolveDo_Number LIKE '" + req.body.doNumber + "'";
            andkey = true;
          }
    
          if (req.body.soNumber != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition += " edoh.EvolveSo_Number LIKE '" + req.body.soNumber + "'";
            andkey = true;
          }
          if (req.body.custId != "") {
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition +=
              " ( (SELECT es.EvolveSupplier_ID FROM EvolveSupplier es WHERE es.EvolveSupplier_Code LIKE  eso.EvolveSalesOrder_Billto) = " +
              req.body.custId +
              ")";
            andkey = true;
          }
    
          let dataTblCount = await Evolve.App.Services.SmartFactory.Reports.SrvDoStatusReport.getDoStatusReportCount(
            condition
          );
          if (length == -1) {
            length = dataTblCount.recordset[0].count;
          }
          let dataTblRecord = await Evolve.App.Services.SmartFactory.Reports.SrvDoStatusReport.getDoStatusReportDatatableList(
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
          Evolve.Log.error(" EERR0733: Error while getting Do Status Report  "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0733: Error while getting Do Status Report  "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getCustCode: async function(req, res) {
        // console.log("SEARCH TERM IS >>>>> " , req.body.term)
        try {
          let poList = await Evolve.App.Services.SmartFactory.Reports.SrvDoStatusReport.getCustCode(
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
          Evolve.Log.error(" EERR0734: Error while getting Cust Code "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0734: Error while getting Cust Code "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      



}