'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getAllDoSup: async function (req, res) {
    try {
      let getAllDoSup = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getAllDoSup();
      if (getAllDoSup instanceof Error || getAllDoSup.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "DO and sup not found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getAllDoSup.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0676: Error while getting all do sup "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0676: Error while getting all do sup "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSingleDOSOData: async function (req, res) {
    try {
      // console.log(req.body.EvolveDO_ID);
      let getSingleDOSOData = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getSingleDOSOData(req.body);
      if (getSingleDOSOData instanceof Error || getSingleDOSOData.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "single do so not found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getSingleDOSOData.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0677: Error while getting single DO SO data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0677: Error while getting single DO SO data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getDoLine: async function (req, res) {
    try {
      // console.log(req.body.EvolveDO_ID);
      let getDoLine = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getDoLine(req.body);
      if (getDoLine instanceof Error || getDoLine.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "DO line not found",
          result: null
        };
        res.send(obj);
      } else {
        let arrayLength = getDoLine.recordset.length;
        // console.log("array length  >>> " , arrayLength)
        for (let i = 0; i < getDoLine.recordset.length; i++) {

          let checkPdiAvailibility = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.checkPdiAvailibility(
            getDoLine.recordset[i].EvolveDOLine_Part
          );
          if (checkPdiAvailibility.rowsAffected == 0 || checkPdiAvailibility.rowsAffected < 1) {

            getDoLine.recordset.splice(i, 1);

            for (let i = 0; i < getDoLine.recordset.length; i++) {

              let checkPdiAvailibility = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.checkPdiAvailibility(
                getDoLine.recordset[i].EvolveDOLine_Part
              );
              if (checkPdiAvailibility.rowsAffected == 0 || checkPdiAvailibility.rowsAffected < 1) {
                getDoLine.recordset.splice(i, 1);

              }

            }
          }
        }

        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getDoLine.recordset
        };

        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0678: Error while getting Do Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0678: Error while getting Do Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPDISingleData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getPDISingleData(req.body);
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "pdi single data not found",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0679: Error while getting PDI Single Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0679: Error while getting PDI Single Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getAllPdiTempDetail: async function (req, res) {
    // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
    try {
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getAllPdiTempDetail(req.body);
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Pdi temp detail not found",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0680: Error while getting All Pdi Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0680: Error while getting All Pdi Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPDIData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvList.getPDIData(
        req.body.EvolveDOLine_ID
      );
      // console.log("result", result);

      for (let i = 0; i < result.recordsets[0].length; i++) {
        if (result.recordsets[0][i].EvolvePDIHistory_ParaLabel == 'Image') {

          if (Evolve.Fs.existsSync(Evolve.Config.imageUploadPath + result.recordsets[0][i].EvolvePDIHistory_ParaValue)) {
            let imgbase64 = Evolve.Fs.readFileSync(Evolve.Config.imageUploadPath + result.recordsets[0][i].EvolvePDIHistory_ParaValue, 'base64');

            var extension = result.recordsets[0][i].EvolvePDIHistory_ParaValue.split(".");

            // console.log("imgbase64 >>", result.recordsets[0][i].EvolvePDIHistory_ParaValue)
            result.recordsets[0][i].EvolvePDIHistory_ParaValue = 'data:image/' + extension[1] + ';base64,' + imgbase64;
          }
        }

      }
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "pdi data not found",
          result: result.message
        };
        res.send(obj);
      } else {

        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0681: Error while getting PDI Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0681: Error while getting PDI Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },



}