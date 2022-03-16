'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getComponentScrapReport: async function(req, res) {
        try {
         
          let start = parseInt(req.body.start);
          let length = parseInt(req.body.length);
          let searchData = {
            startDate: req.body.startDate,
            endDate: req.body.endDate
          };
          let andkey = false;
          let condition = "WHERE";
          if (req.body.startDate != "" && req.body.endDate != "") {
            // condition = condition+" AND ";
            if (andkey == true) {
              condition = condition + " AND ";
            }
            condition =
              condition +
              " cast(ecs.EvolveCompScrap_CreatedAt as date) >=" +
              "'" +
              req.body.startDate +
              "'" +
              " and cast(ecs.EvolveCompScrap_UpdatedAt as date) <=" +
              "'" +
              req.body.endDate +
              "'";
            andkey = true;
          }
          let dataTblCount = await  Evolve.App.Services.SmartFactory.Reports.SrvComponentScrapReport.getComponentScrapReportCount(
            condition
          );
          if (length == -1) {
            length = dataTblCount.recordset[0].count;
          }
          let dataTblRecord = await Evolve.App.Services.SmartFactory.Reports.SrvComponentScrapReport.getComponentScrapReportDatatableList(
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
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0726: Error while getting component scrap report "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0726: Error while getting component scrap report "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    



}