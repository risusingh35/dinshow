'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getHistoryTrackReport: async function (req, res) {
    try {
      let condition = "WHERE";
      let andkey = false;
      if (req.body.fromSerialNo != "" && req.body.toSerialNo != "") {
        if (andkey == true) {
          condition = condition + " AND";
        }
        condition =
          condition +
          " epoh.EvolveProdOrdersDetail_Serial > = '" +
          req.body.fromSerialNo +
          "' AND epoh.EvolveProdOrdersDetail_Serial < = '" +
          req.body.toSerialNo +
          "'";
        andkey = true;
      } else if (req.body.fromdate != "" && req.body.todate != "") {
        if (andkey == true) {
          condition = condition + " AND";
        }
        condition =
          condition +
          " CAST(epoh.EvolveProdOrderHistory_CreatedAt AS date) > = '" +
          req.body.fromdate +
          "' AND CAST(epoh.EvolveProdOrderHistory_UpdatedAt AS date) < = '" +
          req.body.todate +
          "'";
        andkey = true;
      }
      let result = await Evolve.App.Services.SmartFactory.Reports.SrvHistoryTrackingReport.getHistoryTrackReport(
        condition
      );

      if (result.rowsAffected instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No History Found",
          result: null
        };
        res.send(obj);
      } else {
        let historydata = [];
        for (let i = 0; i < result.recordset.length; i++) {
          let processStartTime;
          if (result.recordset[i].start_time != null) {
            processStartTime = result.recordset[i].start_time;
          } else {
            processStartTime = "-";
          }
          let processEndTime;
          if (result.recordset[i].end_time != null) {
            processEndTime = result.recordset[i].end_time;
          } else {
            processEndTime = "-";
          }
          let status;
          if (result.recordset[i].prod_status != null) {
            status = result.recordset[i].prod_status;
          } else {
            status = "-";
          }

          historydata.push({
            "Serial Number": result.recordset[i].EvolveProdOrdersDetail_Serial,
            "Work Order Number": result.recordset[i].EvolveProdOrders_Order,
            "Item Code": result.recordset[i].EvolveItem_Code,
            "Template": result.recordset[i].EvolveProcessTemp_Name,
            "Status": status,
            "Section": result.recordset[i].EvolveSection_Name,
            "Machine": result.recordset[i].EvolveMachine_Name,
            "Process Name": result.recordset[i].EvolveProcess_Name,
            "Process Start Time": processStartTime,
            "Process End Time": processEndTime,
            "Process Action": result.recordset[i].EvolveProdOrderHistoryType_Code,
            "Validation Name": result.recordset[i].EvolveProcessVal_Desc,
            "Value": result.recordset[i].EvolveProcess_Value
          });
        }

        Evolve.CsvExport(historydata, function (err, csv) {
          if (err) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "CSV report failed",
              result: null
            };
            res.send(obj);
          } else {
            let d = new Date();
            let CsvName = "history_report_" + d.getTime() + ".csv";
            Evolve.Fs.writeFile(
              Evolve.Config.csvReportPath + "/" + CsvName,
              csv,
              function (err) {
                if (err) {
                  let obj = {
                    statusCode: 200,
                    status: "faild",
                    message: "CSV report generation fail",
                    result: ""
                  };
                  res.send(obj);
                } else {
                  let obj = {
                    statusCode: 200,
                    status: "succsess",
                    message: "CSV report",
                    result: "/csv/" + CsvName
                  };

                  res.send(obj);
                }
              }
            );
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(" EERR0735: Error while getting history track report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0735: Error while getting history track report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },




}