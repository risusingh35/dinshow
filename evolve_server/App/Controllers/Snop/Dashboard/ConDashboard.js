'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getSerialChartData: async function(req, res) {
      try {
          let serialDataList = await Evolve.App.Services.Evolve.Dashboard.SrvDashboard.getSerialChartData(req.body);
          if (serialDataList instanceof Error || serialDataList.rowsAffected < 1) {
              Evolve.Log.error('Error on get serial data!');
              let obj = { statusCode: 400, status: "fail", message: "Error on get serial data!", result: null }; 
              res.send(obj);
            } else {
              let obj = { statusCode: 200, status: "success",  message: " Serial Data Successfully.", result: serialDataList.recordsets[0] };
              res.send(obj);
            }
      } catch (error) {
          Evolve.Log.error(error.message);
          let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          res.send(obj);
      }
  },
}