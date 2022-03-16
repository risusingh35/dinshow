'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getIoReportData: async function (req, res) {
        try {
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;

          let andkey = true;
          let condition = "";
          if (req.body.startDate != "" && req.body.endDate != "") {
            if (andkey == true) {
              condition = condition + " WHERE ";
            }
            condition =
              condition +"cast(EvolveIO_File_InTime as date) >=" +"'" +req.body.startDate +"'" +" and cast(EvolveIO_File_InTime as date) <=" +"'" +req.body.endDate +"'" + " AND EvolveIO_Code lIKE '%" + search + "%'" 
            andkey = true;
          }else{
            condition = " WHERE EvolveIO_Code lIKE '%" + search + "%'"
          }
    
          let ioDataCount = await Evolve.App.Services.Evolve.IoQueue.SrvIoQueue.getIoReportDataCountList(condition, search);
          let ioDataList = await Evolve.App.Services.Evolve.IoQueue.SrvIoQueue.getIoReportDataDatatableList(start, length, condition, search);
            if (ioDataList instanceof Error) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while get IO Data List !",
                result: ioDataList.message
              };
              res.send(obj);
            }
            else{
              let resObj = {
                noOfRecord: ioDataCount.recordset[0].count,
                records: ioDataList.recordset
              }
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Menu list",
                result: resObj
              };
              res.send(obj);
            }
        } catch (error) {
          Evolve.Log.error(" EERR0252: Error while getting Io report data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0252: Error while getting Io report data "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
      getSingleIoCodeData: async function (req, res) {
        try {
          let getSingleIoCodeData = await Evolve.App.Services.Evolve.IoQueue.SrvIoQueue.getSingleIoCodeData(req.body.id);
          if (getSingleIoCodeData instanceof Error || getSingleIoCodeData.rowsAffected < 1) {
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
          Evolve.Log.error(" EERR0253: Error while getting single Io Code Data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0253: Error while getting single Io Code Data "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
      changeIoCodeStatus: async function (req, res) {
        try {
          let changeIoCodeStatus = await Evolve.App.Services.Evolve.IoQueue.SrvIoQueue.changeIoCodeStatus(
            req.body.id
          );
          if (changeIoCodeStatus instanceof Error) {
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
              message: "Queue Updated Successfully.... ",
              result: ""
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0254: Error while changing Io Code Status "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0254: Error while changing Io Code Status "+error.message,
            result: null
          };
          res.send(obj);
        }
      },  
      reQueueProcess: async function (req, res) {
        try {
          let changeIoCodeStatus = await Evolve.App.Services.Evolve.IoQueue.SrvIoQueue.changeIoCodeStatus(req.body.id);
          if (changeIoCodeStatus instanceof Error) {
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
              result: ""
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0254: Error while changing Io Code Status "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0254: Error while changing Io Code Status "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

}