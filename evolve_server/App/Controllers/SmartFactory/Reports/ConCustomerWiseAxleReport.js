'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getCustomerWiseReport: async function (req, res) {
    try {
      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate
      };
      let andkey = false;
      let condition = "";
      // if (req.body.startDate != '' && req.body.endDate != '') {
      //   // condition = condition+" AND ";
      //   if (andkey == true) { condition = condition + " AND "; }
      //   condition = condition + " cast(ers.EvolveReworkSrNo_CreatedAt as date) >=" + "'" + req.body.startDate + "'" + " and cast(ers.EvolveReworkSrNo_UpdatedAt as date) <=" + "'" + req.body.endDate + "'";
      //   andkey = true;
      // }

      // if (req.body.serialNo != '') {
      //   if (andkey == true) { condition = condition + " AND "; }
      //   condition += " ers.EvolveProdOrdersDetail_Serial='" + req.body.serialNo + "'"
      //   andkey = true;
      // }
      let dataTblCount = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getCustomerWiseReportCount();
      // if (length == -1) {
      //   length = dataTblCount.recordset[0].count;
      // }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getCustomerWiseReportDatatableList(start,
        length);
      var obj = {
        draw: req.body.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0727: Error while getting Customer Wise Report "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0727: Error while getting Customer Wise Report "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItem: async function (req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getItem(
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
      Evolve.Log.error(" EERR0728 : Error while getting Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0728 : Error while getting Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getCustCode: async function (req, res) {
    // console.log("SEARCH TERM IS >>>>> " , req.body.term)
    try {
      let poList = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getCustCode(
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
      Evolve.Log.error(" EERR0729: Error while getting Cust Code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0729: Error while getting Cust Code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMachineList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getMachineList = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getMachineList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (getMachineList instanceof Error || getMachineList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on machine list",
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
      Evolve.Log.error(" EERR0730 : Error while getting MachineList "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0730 : Error while getting MachineList "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getshiftList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getshiftList = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getshiftList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (getshiftList instanceof Error || getshiftList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on shift list",
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
      Evolve.Log.error(" EERR0731: Error while getting getting shift List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0731: Error while getting getting shift List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getProcessList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getProcessListData = await Evolve.App.Services.SmartFactory.Reports.SrvCustomerWiseAxleReport.getProcessList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (
        getProcessListData instanceof Error ||
        getProcessListData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on process list",
          result: getProcessListData.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: " Process list successfully",
          result: getProcessListData.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0732: Error while getting process list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0732: Error while getting process list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },







}