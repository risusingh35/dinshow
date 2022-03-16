'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getSerialChartData: async function (req, res) {
    try {
      let serialDataList = await Evolve.App.Services.Evolve.Dashboard.SrvDashboard.getSerialChartData(req.body);
      console.log(serialDataList);
      if (serialDataList instanceof Error) {
        Evolve.Log.error('Error on get chart data!');
        let obj = { statusCode: 400, status: "fail", message: "Error on get!", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: " Serial Data Successfully.", result: serialDataList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0234: Error while getting serial chart data "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0234: Error while getting serial chart data "+error.message, result: null };
      res.send(obj);
    }
  },

  getAllSerial: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.Dashboard.SrvDashboard.getAllSerial(req.body.term);
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item list",
        result: result.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0235: Error while getting all serial "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0235: Error while getting all serial "+error.message, result: null };
      res.send(obj);
    }
  },
  getAllCountData: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.Dashboard.SrvDashboard.getAllCountData();
      if (result instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: "Error on get total serial!", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: " Serial Data Successfully.", result: result.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0236: Error while getting all count data "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0236: Error while getting all count data "+error.message, result: null };
      res.send(obj);
    }
  },
}