'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getIoReportData: async function (req, res) {
        try {
          // let start = parseInt(req.query.start);
          // let length = parseInt(req.query.length);
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;
          
          let andkey = true;
          let condition = "";
          if (req.body.startDate != "" && req.body.endDate != "") {
            if (andkey == true) {
              condition = condition + " WHERE  ";
            }
            condition =
              condition +
              "cast(EvolveIOHistory_File_InTime as date) >=" +
              "'" +
              req.body.startDate +
              "'" +
              " and cast(EvolveIOHistory_File_InTime as date) <=" +
              "'" +
              req.body.endDate +
              "'"+
              " and EvolveIOHistory_Code LIKE '%"+
              req.body.search + "%'"

            andkey = true;
          }
          else{
            condition = condition + " WHERE EvolveIOHistory_Code LIKE '%" + req.body.search + "%'"
          }
    
          let count = await Evolve.App.Services.Evolve.IoHistory.SrvIoHistory.getIoReportDataCountList(
            condition
          );
          let ioDataList = await Evolve.App.Services.Evolve.IoHistory.SrvIoHistory.getIoReportDataDatatableList(
            start,
            length,
            condition
          );
          if (ioDataList instanceof Error ) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while getting IO Data List !"   ,
                result: ioDataList.message
            };
            res.send(obj);
        } else {
          let resObj = {
            noOfRecord: count.recordset[0].count,
            records: ioDataList.recordset
        }
        let obj = {
            statusCode: 200,
            status: "success",
            message: "IO Data list",
            result: resObj
        };
        res.send(obj);
        }
        } catch (error) {
          Evolve.Log.error(" EERR0250: Error while getting IO report data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0250: Error while getting IO report data "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getSingleIoCodeData: async function (req, res) {
        try {
          let getSingleIoCodeData = await Evolve.App.Services.Evolve.IoHistory.SrvIoHistory.getSingleIoCodeData(
            req.body.id
          );
          if (
            getSingleIoCodeData instanceof Error ||
            getSingleIoCodeData.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "IO data not found ! ",
              result: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Successfully !",
              result: getSingleIoCodeData.recordset[0]
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0251: Error while getting single Io Code Data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0251: Error while getting single Io Code Data "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    



}