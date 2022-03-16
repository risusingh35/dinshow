'use strict';
const Evolve = require("../../../Boot/Evolve");
module.exports = {
getSerialChartData: async function(req, res) {
    try {
      console.log("correct controller called >> ")
        let serialDataList = await Evolve.App.Services.Evolve.EvolveDashboardServices.getSerialChartData(req.body);
        if (serialDataList instanceof Error || serialDataList.rowsAffected < 1) {
            Evolve.Log.error('Error on get Serial Data');
            let obj = { statusCode: 400, status: "fail", message: "Error on get Serial Data", result: serialDataList.message }; 
            res.send(obj);
          } else {
            let obj = { statusCode: 200, status: "success",  message: " Serial Data Successfully", result: serialDataList.recordset };
            res.send(obj);
          }
    } catch (error) {
        Evolve.Log.error(" EERR0537: Error while getting Serial Chart Data "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0537: Error while getting Serial Chart Data "+error.message, result: null };
        res.send(obj);
    }
},
}