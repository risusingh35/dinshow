const Evolve = require("../../../Boot/Evolve");

module.exports = {

  getLotNumber: async function (req, res) {
    try {
      let lotNumber = await Evolve.App.Services.Unit.UnitServices.getLotNumber();
      if (lotNumber instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: lotNumber.message, result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Production Booking List", result: lotNumber };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0945: Error while getting a lot number "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0945: Error while getting a lot number "+error.message, result: null };
      res.send(obj);
    }
  },

  getUnitConfigValue: async function (req, res) {
    try {
      let configValue = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue(req.body.EvolveUnitConfig_Key);
      if (configValue instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: configValue.message, result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Unit Config Value", result: configValue.recordset[0].EvolveUnitConfig_Value };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0946: Error while getting unit config value "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0946: Error while getting unit config value "+error.message, result: null };
      res.send(obj);
    }
  },


  updateUnitConfigValue: async function (req, res) {
    try {
      let configValue = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue(req.body.EvolveUnitConfig_Key, req.body.EvolveUnitConfig_Value);
      if (configValue instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: configValue.message, result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Unit Config Value", result: configValue.recordset[0].EvolveUnitConfig_Value };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0947: Error while updating unit config value "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0947: Error while updating unit config value "+error.message, result: null };
      res.send(obj);
    }
  },

  captureWeight: async function (req, res) {
    try {
      console.log("req.body. ::", req.body)
      let weight = 0;
      let weightScaleId = await Evolve.App.Services.Unit.UnitServices.getWeightScaleId(req.body.EvolveDevice_ID);
      if (weightScaleId instanceof Error || weightScaleId.rowsAffected < 1) {
        let obj = { statusCode: 200, status: "success", message: "done", result: weight };
        res.send(obj);
      } else {
        console.log("weightScaleId.recordsets[0].EvolveMachine_WeightScaleId ::", weightScaleId.recordset[0].EvolveDevice_Code)
        console.log("weightScaleId.recordsets[0].EvolveMachine_WeightScaleId ::", weightScaleId.recordset[0].EvolveDevice_Code)

        /** API code Start Here */

        // let url = 'http://'+weightScaleId.recordset[0].EvolveDevice_API+":5141/weight";
        // let jsonData = JSON.stringify({
        //   iKonnectId : weightScaleId.recordset[0].EvolveDevice_Code,
        //   action : 'weight'
        // });
        // console.log("url ::", url)
        // Evolve.Axios.get(url)
        // .then((response) => {
        //   console.log("response ::", response.data.KonnectID)
        //   console.log("response ::", response.data.Weight)
        //   Evolve.EvolveWsM[response.data.KonnectID] = response.data.Weight;
        // })


        /** API Code End Here */

        /** MQTT Code */
        let jsonData = JSON.stringify({
          KonnectID: weightScaleId.recordset[0].EvolveDevice_Code,
          action: 'weight'
        });
        console.log("Task Sent :", jsonData)
        if (Evolve.Config.mqtt == '1') {
          Evolve.MqttClient.publish('evolvewcs', jsonData);
        }
        /** MQTT Code End Here */




        if (Evolve.EvolveWsM[weightScaleId.recordset[0].EvolveDevice_Code] != undefined) {
          weight = Evolve.EvolveWsM[weightScaleId.recordset[0].EvolveDevice_Code];
        }
        let obj = { statusCode: 200, status: "success", message: "done", result: weight };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0948 Error while weight capturing "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0948 Error while weight capturing "+error.message, result: null };
      res.send(obj);
    }
  },

  getPrinterList: async function (req, res) {
    try {
      let printerList = await Evolve.App.Services.Unit.UnitServices.getPrinterList();
      if (printerList instanceof Error) {
        console.log("enter in error while getting printer list>>>>>>.")
        let obj = { statusCode: 400, status: "fail", message: printerList.message, result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Printer List", result: printerList.recordset };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0949: Error while getting printer list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0949: Error while getting printer list "+error.message, result: null };
      res.send(obj);
    }
  },

  getScaleList: async function (req, res) {
    try {
      let scaleList = await Evolve.App.Services.Unit.UnitServices.getScaleList();
      if (scaleList instanceof Error) {
        let obj = { statusCode: 400, status: "fail", message: scaleList.message, result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Scale List", result: scaleList.recordset };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR0950: Error in getting scale list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0950: Error in getting scale list "+error.message, result: null };
      res.send(obj);
    }
  },

  getDateTime: async function () {
    let date = new Date();
    return date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2) + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  },

  addTranstionHistory: async function (data) {
    return await Evolve.App.Services.Unit.UnitServices.addTranstionHistory(data);
  },

  addProdOrdersHistory: async function (data, userId) {
    return await Evolve.App.Services.Unit.UnitServices.addProdOrdersHistory(data, userId);
  },

  updateProdOrdersHistory: async function (data, userId) {
    return await Evolve.App.Services.Unit.UnitServices.updateProdOrdersHistory(data, userId);
  },

  addProdOrdersDetailHistory: async function (data) {
    return await Evolve.App.Services.Unit.UnitServices.addProdOrdersDetailHistory(data);
  },

  getExitGateNumber: async function () {
    try {
      let getExitGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateExitNumber');
      return (getExitGateNumber)
    } catch (error) {
      Evolve.Log.error(" EERR0951: Error while getting exit gate number "+error.message);
    }
  },

  updateExitGateNumber: async function () {
    try {
      let getExitGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateExitNumber');
      var lastExitGateNumber = getExitGateNumber.recordset[0].EvolveUnitConfig_Value;
      var dateObj = new Date();
      var month = dateObj.getMonth() + 1;
      var year = dateObj.getFullYear().toString().substr(-2);
      if (month > 4) {
        var oldCount = (parseInt(lastExitGateNumber.toString().substr(4, 8)) + 1).toString(); // Get Old Incremental Number from Old GateExit Number
        var pad = "0000";
        var newCount = pad.substring(0, pad.length - oldCount.length) + oldCount; //0001
        var newExitGateNumber = 'GX' + year + '' + newCount;
      } else {
        let lastYear = parseInt(year) - 1;
        let lastExitGateYear = lastExitGateNumber.toString().substr(2, 2)
        if (lastExitGateYear == lastYear) {
          var oldCount = (parseInt(lastExitGateNumber.toString().substr(4, 8)) + 1).toString(); // Get Old Incremental Number from Old GateExit Number
          var pad = "0000";
          var newCount = pad.substring(0, pad.length - oldCount.length) + oldCount; //0001
          var newExitGateNumber = 'GX' + lastYear + '' + newCount;
        } else {
          var newExitGateNumber = 'GX' + lastYear + '0001';
        }
      }
      let updateExitGateNumber = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue('gateExitNumber', newExitGateNumber); // Update New GateExit Number
      return (updateExitGateNumber)
    } catch (error) {
      Evolve.Log.error(" EERR0952: Error while updating exit gate number "+error.message);
    }
  },

  getDoNumber: async function () {
    try {
      let getDoNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('doNumber');
      return (getDoNumber)
    } catch (error) {
      Evolve.Log.error(" EERR0953: Error while getting Do Number "+error.message);
    }
  },

  updateDoNumber: async function () {
    try {
      let getDoNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('doNumber');
      var lastDoNumber = getDoNumber.recordset[0].EvolveUnitConfig_Value;
      var dateObj = new Date();
      var year = dateObj.getFullYear().toString().substr(-2);
      let lastDoYear = lastDoNumber.toString().substr(2, 2)
      if (lastDoYear == year) {
        var oldCount = (parseInt(lastDoNumber.toString().substr(4, 8)) + 1).toString(); // Get Old Incremental Number from Old GateExit Number
        var pad = "0000";
        var newCount = pad.substring(0, pad.length - oldCount.length) + oldCount; //0001
        var newDoNumber = 'DO' + year + '' + newCount;
      } else {
        var newDoNumber = 'DO' + year + '0001';
      }
      let updateDoNumber = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue('doNumber', newDoNumber); // Update New GateExit Number
      return (updateDoNumber)
    } catch (error) {
      Evolve.Log.error(" EERR0954: Error while updating Do Number "+error.message);
    }
  },


}
