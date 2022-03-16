'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getScanningItemData : async function (req,res){
        try {
            req.body.EvolvePrintHistory_DSN = req.body.EvolvePrintHistory_DSN.replace(/^0+/, '');
            let data = await Evolve.App.Services.Evolve.Scanning.SrvList.getScanningItemData(req.body);
            if (data instanceof Error || data.rowsAffected <= 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Scaning Item Data !",
                    result: data.message
                };
                res.send(obj);
            } else {
                let error = false
                let errorMessage = ""
                for(let i = 0 ; i < data.recordset.length ; i++){
                    if(data.recordset[i].EvolvePrintHistory_Flag == 0){
                        error = true;
                        errorMessage = `Label Not Printed For Item : ${data.recordset[i].EvolveItem_Code}`;
                        i = data.recordset.length
                    }
                }
                if(error == true){
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errorMessage,
                        result: null
                    };
                    res.send(obj);
                }else{
                    let upadteScanningFlag = await Evolve.App.Services.Evolve.Scanning.SrvList.upadteScanningFlag(data.recordset[0].EvolvePrintLabelSerial_ID)
                    let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Scaning Item Data Get Successfully",
                    result: data.recordset
                     };
                     res.send(obj);
                } 
            }
        } catch {
            Evolve.Log.error(" EERR32596: Error while get Scaning Item Data ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR32596: Error while get Scaning Item Data ! "+error.message,
              result: null
            };
            res.send(obj);
        }
    },

    moveScannedItems : async function (req,res){
        try {
            let updateMoveFlag = await Evolve.App.Services.Evolve.Scanning.SrvList.updateMoveFlag(req.body.itemsArray[0].EvolvePrintLabelSerial_ID,req.body.itemsArray[0].EvolvePrintHistory_ScanDateTime);
            if (updateMoveFlag instanceof Error || updateMoveFlag.rowsAffected <= 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update Move Flag !",
                    result: updateMoveFlag.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Move Flag Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR32597: Error while Move Scanned Items ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR32597: Error while Move Scanned Items ! "+error.message,
              result: null
            };
            res.send(obj);
        }
    },

    updateScanFlag : async function (req,res){
        try {
            let errorInUpdate = false
            for (let i = 0 ; i < req.body.itemsArray.length ; i++){
                    let updateScanFlag = await Evolve.App.Services.Evolve.Scanning.SrvList.updateScanFlag(req.body.itemsArray[i]);
                    if (updateScanFlag instanceof Error || updateScanFlag.rowsAffected <= 0){
                            errorInUpdate = true
                    }   
            }
            
            if (errorInUpdate == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update Move Flag !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Scan Flag Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR32598: Error while Update Scanned Items ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR32598: Error while Update Scanned Items ! "+error.message,
              result: null
            };
            res.send(obj);
        }
    },

    getAutoMoveConfigVariable : async function (req,res){
        try {
            let getAutoMoveConfigVariable = await Evolve.App.Services.Evolve.Scanning.SrvList.getAutoMoveConfigVariable();
            if(getAutoMoveConfigVariable instanceof Error || getAutoMoveConfigVariable.rowsAffected <1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####:  Error while Get Auto Move Config Variable ! ",
                    result: null
                  };
                  res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "AutoMove Config Variable!" ,
                    result: getAutoMoveConfigVariable.recordset
                  };
                  res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Auto Move Config Variable ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR####:  Error while Get Auto Move Config Variable ! "+error.message,
              result: null
            };
            res.send(obj);
        }
    },

    getScanAltConfigVariable : async function (req,res) {
        try {
            let getScanAltConfigVariable = await Evolve.App.Services.Evolve.Scanning.SrvList.getScanAltConfigVariable();
            if(getScanAltConfigVariable instanceof Error || getScanAltConfigVariable.rowsAffected <1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR####:  Error while Get Scan Alt Config Variable ! ",
                    result: null
                  };
                  res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ScanAlt Config Variable!" ,
                    result: getScanAltConfigVariable.recordset
                  };
                  res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Scan Alt Config Variable ! "+error.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR####:  Error while Get Scan Alt Config Variable ! "+error.message,
              result: null
            };
            res.send(obj);
        }
    }
}
