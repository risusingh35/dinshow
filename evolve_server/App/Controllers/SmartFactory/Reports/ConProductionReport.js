'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


  getProductionReports: async function (req, res) {
    try {
      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate
      };
      let andkey = true;
      let condition = "";
      if (req.body.startDate != "" && req.body.endDate != "") {
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
        condition += " epodh.EvolveProcess_ID=" + parseInt(req.body.processId);
        andkey = true;
      }

      if (req.body.machineId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveMachine_ID=" + parseInt(req.body.machineId);
        andkey = true;
      }
      if (req.body.fromSerial != '' && req.body.toSerial != '') {
        if (andkey == true) { condition = condition + " AND "; }
        condition += " epodh.EvolveProdOrdersDetail_Serial BETWEEN  " + "'" + req.body.fromSerial + "'" + " AND " + "'" + req.body.toSerial + "'";
        andkey = true;
      }
      if (req.body.itemId != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epodh.EvolveItem_ID=" + parseInt(req.body.itemId);
        andkey = true;
      }
      if (
        req.body.radioValue != "" &&
        req.body.radioValue == "Completed OR Rejected"
      ) {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProdOrdersDetails_Status=" +
          "'" +
          req.body.radioValue.slice(0, 9) +
          "'" +
          "  OR  epodh.EvolveProdOrdersDetails_Status=" +
          "'" +
          req.body.radioValue.slice(13, 21) +
          "'";
        andkey = true;
      }
      if (req.body.radioValue != "" && req.body.radioValue == "In Process") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition +=
          " epodh.EvolveProdOrdersDetails_Status= '" +
          req.body.radioValue +
          "'";
        andkey = true;
      }

      let dataTblCount = await Evolve.App.Services.SmartFactory.Reports.SrvProductionReport.getProductionReportsCount(
        searchData,
        condition,
        req.body.radioValue
      );
      if (length == -1) {
        length = dataTblCount.recordset[0].count;
      }
      let dataTblRecord = await Evolve.App.Services.SmartFactory.Reports.SrvProductionReport.getProductionReportsDatatableList(
        start,
        length,
        condition,
        req.body.radioValue
      );

      var obj = {
        draw: req.body.draw,
        recordsTotal: dataTblCount.recordset[0].count,
        recordsFiltered: dataTblCount.recordset[0].count,
        data: dataTblRecord.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0744: Error while get Production Reports "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0744: Error while get Production Reports "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItem: async function (req, res) {
    try {
      let poList = await Evolve.App.Services.SmartFactory.Reports.SrvProductionReport.getItem(req.body.term);
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item List",
        result: poList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0745: Error while getting Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0745: Error while getting Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getProcessList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getProcessListData = await Evolve.App.Services.SmartFactory.Reports.SrvProductionReport.getProcessList(
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
          message: "Error on get process list",
          result: getProcessListData.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getProcessListData.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0746: Error while getting process list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0746: Error while getting process list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getMachineList: async function (req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let getMachineList = await Evolve.App.Services.SmartFactory.Reports.SrvProductionReport.getMachineList(
        req.EvolveUser_ID,
        start,
        length
      );
      if (getMachineList instanceof Error || getMachineList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get maachine list",
          result: getMachineList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Machine list get Successfully !",
          result: getMachineList.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0747: Error while getting machine list  "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0747: Error while getting machine list  "+error.message,
        result: null
      };
      res.send(obj);
    }
  },








}