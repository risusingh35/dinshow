'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getPDISingleData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getPDISingleData(
        req.body
      );
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "not do found",
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
      Evolve.Log.error(" EERR0669:  Error while getting PDI Single Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0669:  Error while getting PDI Single Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getAllPdiTempDetail: async function (req, res) {
    // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
    try {
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getAllPdiTempDetail(
        req.body
      );
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
      Evolve.Log.error(" EERR0670: Error while getting All Pdi Temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0670: Error while getting All Pdi Temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addRejectSerialNo: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let ProdOrderDetailSerial = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getProdOrderSerialId(req.body);
      if (ProdOrderDetailSerial instanceof Error || ProdOrderDetailSerial.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Serial no not found",
          result: ProdOrderDetailSerial.message
        };
        res.send(obj);
      } else {
        console.log(ProdOrderDetailSerial.recordset[0]);
        let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.addRejectSerialNo(req.body,ProdOrderDetailSerial.recordset[0]);
        if (result instanceof Error || result.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Rework data not add",
            result: result.message
          };
          res.send(obj);
        } else {
          let podUpdateStatus = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.pdiPODUpdateStatus(
            req.body
          );
          if (
            podUpdateStatus instanceof Error ||
            podUpdateStatus.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "pod status not update",
              result: podUpdateStatus.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Successfully Add!",
              result: podUpdateStatus.recordsets[0]
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0671: Error while adding serial no. "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0671: Error while adding serial no. "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPDIData: async function (req, res) {
    try {
      // console.log("EvolveDOLine_ID_c", req.body.EvolveDOLine_ID);
      let result = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getPDIData(
        req.body.EvolveDOLine_ID
      );
      // console.log("result", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Do no found",
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
      Evolve.Log.error(" EERR0672: Error while getting PDI Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0672: Error while getting PDI Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  checkSerialNo: async function (req, res) {
    try {
      let checkSerialNoInPdiHistory = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.checkSerialNoInPdiHistory(req.body.EvolveProdOrdersDetail_Serial);
      if (checkSerialNoInPdiHistory.rowsAffected > 0) {
        let obj = {statusCode: 400, status: "fail", message: "Serial no already used !",result : null};
        res.send(obj);
      } else {
        let checkSerialNo = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.checkSerialNo(req.body);
        if (checkSerialNo.rowsAffected < 1) {
          let obj = {statusCode: 400, status: "fail", message: "Invalid serial number",result : null};
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "succsess", message: "Valid serial number", result: checkSerialNo.recordset};
          res.send(obj);
        } 
      }
    } catch (error) {
      Evolve.Log.error(" EERR0673: Error while checking Serial no. "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0673: Error while checking Serial no. "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addPdiHistory: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getDoId = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getDoId(req.body.EvolveDOLine_ID);
      if (getDoId instanceof Error || getDoId.rowsAffected < 1) 
      {
        let obj = { statusCode: 400, status: "fail", message: "Do id not found ", result: getDoId.message};
        res.send(obj);
      }
      // IF PDI History Have OLD Record So get OLD Serial Number
      let oldSerial = [];
      let getPdiHistorySerialNoData = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getPdiHistorySerialNo(req.body.EvolveDOLine_ID);
      if (getPdiHistorySerialNoData instanceof Error || getPdiHistorySerialNoData.rowsAffected < 1 )
       {
        // IT's for New Record.
      } 
      else 
      {
        // It's for Edit Request
        for (let i = 0; i < getPdiHistorySerialNoData.recordset.length; i++) 
        {
          oldSerial.push(getPdiHistorySerialNoData.recordset[i].EvolveProdOrdersDetail_Serial);
        }
      }

      // Remove All History Data.
      await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.deletePdiHistory(req.body.EvolveDOLine_ID);
      let countSerial = 0;
      let serialNo = "";
      for (let i = 0; i < req.body.pdiDataRecords.length; i++) 
      {
        if (req.body.pdiDataRecords[i].ParaLabel == "Axle Serial Number" && req.body.pdiDataRecords[i].ParaValue != "") 
        {
          countSerial++;
          serialNo = req.body.pdiDataRecords[i].ParaValue;
          // Save Production Order History PDI status 1
          await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.changePdiStatus(serialNo,1);
        }
        if (-1 != oldSerial.indexOf(serialNo)) 
        {
          oldSerial.splice(oldSerial.indexOf(serialNo), 1);
        }
        if (serialNo != "" || req.body.pdiDataRecords[i].EvolvePDILine_ID == 0)
        {
          let data = {
            EvolvePDIHistory_Key: req.body.pdiDataRecords[i].EvolvePDIHistory_Key,
            ParaLabel: req.body.pdiDataRecords[i].ParaLabel,
            ParaType: req.body.pdiDataRecords[i].ParaType,
            ParaValue: req.body.pdiDataRecords[i].ParaValue,
            EvolvePDILine_ID: req.body.pdiDataRecords[i].EvolvePDILine_ID,
            EvolveDOLine_ID: req.body.EvolveDOLine_ID,
            EvolvePDIHistory_Status: req.body.EvolvePDIHistory_Status,
            EvolveDO_ID: getDoId.recordset[0].EvolveDO_ID,
            EvolvePDITemplate_ID: getDoId.recordset[0].EvolvePDITemplate_ID,
            EvolveProdOrdersDetail_Serial:
              req.body.EvolveProdOrdersDetail_Serial
          };
          let addPdiHistoryData = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.addPdiHistoryData(data, req.body.EvolveUser_ID, serialNo);
          if (addPdiHistoryData instanceof Error || addPdiHistoryData.rowsAffected < 1)
          {
            let obj = {statusCode: 400,  status: "fail", message: "PDI data update failed", result: "Data Update failed" };
            res.send(obj);
          }
        }
      }

      // Remove Serial number Form PDI History
      for (let h = 0; h < oldSerial.length; h++) 
      {
        await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.changePdiStatus(oldSerial[h], 0);
      }
      let getDoNumberById = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getDoNumberById(getDoId.recordset[0]);
      if (getDoNumberById instanceof Error || getDoNumberById.rowsAffected < 1) 
      {
        let obj = { statusCode: 400, status: "fail", message: "do number not found", result: "do number not found" };
        res.send(obj);
      }

      let getCurrentQty = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.getCurrentQty(getDoNumberById.recordset[0].EvolveDO_Number, getDoId.recordset[0].EvolveDOLine_Number);
      if (getCurrentQty instanceof Error || getCurrentQty.rowsAffected < 1) {
        let obj = { statusCode: 400, status: "fail", message: "Cuurent qty not found", result: "Cuurent qty not found" };
        res.send(obj);
      }

      if (getCurrentQty.recordset[0].EvolveDoLine_DoQty >= countSerial) 
      {
        let updateDoHistoryPdiQty = await Evolve.App.Services.SmartFactory.PreDeliveryInspection.SrvInspection.updateDoHistoryPdiQty(
          getDoNumberById.recordset[0].EvolveDO_Number, getDoId.recordset[0].EvolveDOLine_Number, countSerial, getDoId.recordset[0].EvolvePDITemplate_ID, req.body);
        if (updateDoHistoryPdiQty instanceof Error || updateDoHistoryPdiQty.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Update do history failed",
            result: "Update do history failed"
          };
          res.send(obj);
        }
      }
      let obj = {
        statusCode: 200,
        status: "success",
        message: "PDI data add sucessfully",
        result: "PDI data add sucessfully"
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0674: Error while adding Pd History "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0674: Error while adding Pd History "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  pdiImageUpload: async function (req, res) {
    try {
      let d = new Date();
      let time = d.getTime();
      let extention = req.body.base64.substring(
        "data:image/".length,
        req.body.base64.indexOf(";base64")
      );
      let fileName = time + "_pdi." + extention;
      let base64Data = req.body.base64.replace(/^data:image\/png;base64,/, "");
      base64Data = req.body.base64.replace(/^data:image\/jpeg;base64,/, "");
      Evolve.Fs.writeFile(
        Evolve.Config.imageUploadPath + fileName,
        base64Data,
        "base64",
        function (err) {
          if (err) {
            console.log(err);
            res.json(0);
          } else {
            console.log("The file was saved!");
            res.json(fileName);
          }
        }
      );
    } catch (error) {
      Evolve.Log.error(" EERR0675: Error while pdi Image Upload "+error.message);
      res.json(0);
    }
  },





}