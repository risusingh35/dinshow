'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkPlcSetupBarcode: async function(req, res)
    {
      try {
        let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.checkPlcSetupBarcode(req.body);
        if(response instanceof Error || response.rowsAffected < 1)
        {
          let obj = { statusCode: 400, status: "fail", message: 'Invalid Barcode Scan', result: null };
          res.send(obj);
        }
        else
        {
          let obj = { statusCode: 200, status: "success", message: "Barcoode Data", result: response.recordset[0] };
          res.send(obj);
        }
    
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
    },
    moveMillingBarcodePlcSetup: async function(req, res)
    {
      try {
        let addMillingData = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.insertMillingDataPlcSetup(req.body);
        if(addMillingData instanceof Error || addMillingData.rowsAffected < 1)
        {
          let obj = { statusCode: 400, status: "fail", message: 'Error while move barcode', result: null };
          res.send(obj);
        }
        else
        {
          let newSeq = '';
          let status = '';
          if(req.body.Evolve_Milling_Cycle_Part_OK == "1")
          {
            newSeq = 1;
            status = 'In Process';
          }
          else
          {
            newSeq = 0;
            status = 'Rejected';
          }
          let updateIpTreshBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.updateIpTreshBarcode(req.body.Evolve_Milling_Barcode,newSeq,status);
          if(updateIpTreshBarcode instanceof Error || updateIpTreshBarcode.rowsAffected < 1)
          {
            let obj = { statusCode: 400, status: "fail", message: 'Error while update barcode', result: null };
            res.send(obj);
          }
          else
          {
            let obj = { statusCode: 200, status: "success", message: req.body.Evolve_Milling_Barcode+" moved successfully", result: null };
            res.send(obj);
          }
        }
    
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
    },
    moveVibrationBarcodePlcSetup: async function(req, res)
    {
      try {
        let addMillingData = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.insertVibrationDataPlcSetup(req.body);
        if(addMillingData instanceof Error || addMillingData.rowsAffected < 1)
        {
          let obj = { statusCode: 400, status: "fail", message: 'Error while move barcode', result: null };
          res.send(obj);
        }
        else
        {
          let newSeq = '';
          let status = '';
          if(req.body.EvolveVibration_Part_Ok_VALUE == "1")
          {
            newSeq = 1;
            status = 'Completed';
          }
          else
          {
            newSeq = 0;
            status = 'Rejected';
          }
          let updateIpTreshBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.updateIpTreshBarcode(req.body.EvolveVibration_K3220_Barcode_VALUE,newSeq,status);
          if(updateIpTreshBarcode instanceof Error || updateIpTreshBarcode.rowsAffected < 1)
          {
            let obj = { statusCode: 400, status: "fail", message: 'Error while update barcode', result: null };
            res.send(obj);
          }
          else
          {
            let getCompletedWoCount = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.getCompletedWoCount(req.body.EvolveVibration_K3220_Barcode_VALUE);
            let updateWoError = "false";
            if(getCompletedWoCount.recordset[0].EvolveProdOrders_Quantity == getCompletedWoCount.recordset[0].cmp_qty)
            {   
                let completeWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvPlcSignalSetup.completeWo(getCompletedWoCount.recordset[0].EvolveProdOrders_ID);
                if(completeWo instanceof Error || completeWo.rowsAffected < 1)
                {
                  updateWoError = "true";
                }
            }
            else
            {
              updateWoError = "false";
            }
            if(updateWoError == "true")
            {
              let obj = { statusCode: 400, status: "fail", message: "Error while complete work order", result: null };
              res.send(obj);
            }
            else
            {
              if(status == 'Rejected')
              {
                let obj = { statusCode: 200, status: "success", message: req.body.EvolveVibration_K3220_Barcode_VALUE+" rejected successfully", result: null };
                res.send(obj);
              }
              else
              {
                let obj = { statusCode: 200, status: "success", message: req.body.EvolveVibration_K3220_Barcode_VALUE+" completed successfully", result: null };
                res.send(obj);
              }
            }
          }
        }
    
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
    },


}