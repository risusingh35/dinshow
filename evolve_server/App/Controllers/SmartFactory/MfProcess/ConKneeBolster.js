'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkKneeBolsterBarcode: async function(req, res) {
        try {
            let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkKneeBolsterBarcode(req.body.EvolveProdOrdersDetail_Serial);
            if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){
              let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
              res.send(obj);
            } else {
              let obj = { statusCode: 200, status: "fail", message: "Door Assy Barcode", result: itemDetail.recordset[0] };
              res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
    },
    startScrewOprationKnee: async function(req, res) {
    try {
        let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkParentScanQty(req.body);
        if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
        {
            let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getScrewParent(req.body);
            let addKneeAudit = '';
            if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee1'){
            addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,1,0);
            } else if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee2'){
            addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,0,1);
            } else if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee3'){
            addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,1,1);
            }
            if(addKneeAudit instanceof Error || addKneeAudit.rowsAffected < 1)
            {
            let obj = { statusCode: 400, status: "fail", message: "Error While Start Screw Opretion", result: null };
            res.send(obj); 
            }
            else
            {  
            let msg = "Start Screw Opretion. "+getScrewParent.recordset[0].EvolveItem_Screw+" Screw(s)";
            let obj = { statusCode: 200, status: "success", message: msg, result: null };
            res.send(obj); 
            }
            // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addDoorAssyAudit(req.body);
            
        } 
        else
        {
            let obj = { statusCode: 300, status: "success", message: "Scan Complete.Next Please", result: null };
            res.send(obj); 
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    kneeBolsterChildBarcode: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkParentScanQty(req.body);
        if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
        {
            let checkUniqueItem = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkUniqueItem(req.body.childItem_id);
            let childBarcodeNxtStep = false;
            if(checkUniqueItem.recordset[0].EvolveItem_Unique == true){
            let checkUniqueChildBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkUniqueChildBarcode(req.body.EvolveProdOrdersDetail_Serial);
            if(checkUniqueChildBarcode.rowsAffected < 1)
            {
                childBarcodeNxtStep = true;
            }
            else {
                let obj = { statusCode: 300, status: "fail", message: "Duplicate Barcode Scanned", result: null };
                res.send(obj);
            }
            } else {
            childBarcodeNxtStep = true;
            }
            if(childBarcodeNxtStep == true)
            {
            let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.updateProdOrderDetailChild(req.body);
            if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                res.send(obj);
            } else {
                let insertDoorAssyBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.insertDoorAssyBarcode(req.body);
                if(insertDoorAssyBarcode instanceof Error || insertDoorAssyBarcode.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                res.send(obj);
                } else {
                let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.updateParentBarcode(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
                if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                    let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                    res.send(obj); 
                } else {
                    let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.checkParentScanQty(req.body);
                    if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                    {
                    let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getScrewParent(req.body);
                    let addKneeAudit = '';
                    console.log("getScrewParent.recordset[0].EvolveItem_Type :",getScrewParent.recordset[0].EvolveItem_Type);
                    if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee1'){
                        addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,1,0);
                    } else if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee2'){
                        addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,0,1);
                    } else if(getScrewParent.recordset[0].EvolveItem_Type == 'Knee3'){
                        addKneeAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.addKneeAudit(req.body,1,1);
                    }
                    if(addKneeAudit instanceof Error || addKneeAudit.rowsAffected < 1)
                    {
                        let obj = { statusCode: 400, status: "fail", message: "Error While Start Screw Opretion", result: null };
                        res.send(obj); 
                    }
                    else
                    {
                        let msg = "Start Screw Opretion. "+getScrewParent.recordset[0].EvolveItem_Screw+" Screw(s)";
                        let obj = { statusCode: 200, status: "success", message: msg, result: null };
                        res.send(obj); 
                    }
                    } 
                    else
                    {
                    let obj = { statusCode: 300, status: "success", message: "Scan Complete.Next Please", result: null };
                    res.send(obj); 
                    }
                }
                }
            }
            }
        }
        else
        {
            let obj = { statusCode: 400, status: "fail", message: "Part Already Scanned", result: null };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    getKneeBolsterChildList: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getKneeBolsterChildList(req.body.EvolveProdOrdersDetail_ID);
        if(woList instanceof Error || woList.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
            res.send(obj);
        } else {
            let obj = { statusCode: 200, status: "success", message: "Child List Successfully", result: woList.recordsets[0] };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    startKneeBolster: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.startKneeBolster(req.body.EvolveProdOrdersDetail_Serial);
        if(woList instanceof Error || woList.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
            res.send(obj);
        } else {
            let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.printData(req.body.EvolveProdOrdersDetail_Serial);
            let barcode = "010100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
            let itemCode = printData.recordset[0].EvolveItem_Code
            let itemDesc_sup = printData.recordset[0].EvolveItem_Desc+" "+printData.recordset[0].EvolveItem_CustPart
            var ZplData = "^XA\r\n^PW599"+
            "\r\n^LL0280"+
            "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA,"+barcode+"^FS"+
            "\r\n^FT189,169^A0N,28,28^FH^FD"+itemCode+"^FS"+
            "\r\n^FT170,121^A0N,28,28^FH^FD"+itemDesc_sup+"^FS"+
            "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
            //Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPath+'/doorAssy.txt',ZplData,function(err){\
    
            Evolve.Fs.writeFile(Evolve.Config.dirPrintLabel+'/'+barcode+'.txt',ZplData,function(err){
            if(err){
                let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Parent Barcode Printed", result: null };
                res.send(obj);
            }
            });
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    getKneeBolsterWoList: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getKneeBolsterWoList();
        if(woList instanceof Error || woList.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
            res.send(obj);
        } else {
            let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordsets[0] };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    getKneeBolsterCompletedTriggers: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getKneeBolsterCompletedTriggers();
        if(woList instanceof Error || woList.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
            res.send(obj);
        } else {
            let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    kneeBolsterCheckAudit: async function(req, res) {
        try {
            //console.log("doorAssyCheckAudit Called");
            let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.kneeBolsterCheckAudit();
            if(itemDetail instanceof Error){
              let obj = { statusCode: 400, status: "fail", message: "No Data Found", result: null };
              res.send(obj);
            } else {
              if(itemDetail.rowsAffected > 0) {
                if(itemDetail.recordset[0].EvolveKneeAudit_S3 == true){
                  await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.TruncateKneeAudit();
                  let ComplateDoorParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.ComplateKneeParentBarcode(itemDetail.recordset[0].EvolveKneeAudit_Barcode);
                  if(ComplateDoorParentBarcode instanceof Error || ComplateDoorParentBarcode.rowsAffected < 0){
                    await Evolve.Io.emit('checkKneeAssyS3', {
                      message : 'Error While Update Parent Barcode',
                      barcode : itemDetail.recordset[0].EvolveKneeAudit_Barcode,
                    });
                  } else {
                    Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.checkAndPrintAutoBarcodeKnee(itemDetail.recordset[0].EvolveKneeAudit_Barcode);
                    await Evolve.Io.emit('checkKneeAssyS3', {
                      message : 'Screw Opretion Complete',
                      barcode : itemDetail.recordset[0].EvolveKneeAudit_Barcode,
                    });
                  }
                }
              } else {
      
              }
            }
      
          setTimeout(function(){
            Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.kneeBolsterCheckAudit();
          },1000);
      
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
    },
    checkAndPrintAutoBarcodeKnee: async function(prvBarcode) {
        try {
          let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.getKneeNextBarcode(prvBarcode);
          if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){ 
      
          } else {
            let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.printData(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
            let prefix = '';
            let barcode = "010100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
            let itemCode = printData.recordset[0].EvolveItem_Code
            let itemDesc_sup = printData.recordset[0].EvolveItem_Desc+" "+printData.recordset[0].EvolveItem_CustPart
            var ZplData = "^XA\r\n^PW599"+
            "\r\n^LL0280"+
            "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA,"+barcode+"^FS"+
            "\r\n^FT189,169^A0N,28,28^FH^FD"+itemCode+"^FS"+
            "\r\n^FT170,121^A0N,28,28^FH^FD"+itemDesc_sup+"^FS"+
            "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
              Evolve.Fs.writeFile(Evolve.ConfigData.App.dirKneeAssemblyPrint+'/'+barcode+'.txt',ZplData,function(err){
              if(err){
                
              } else {
                Evolve.App.Services.SmartFactory.MfProcess.SrvKneeBolster.startKneeBolster(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
              }
            });
          }
      
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj); 
        }
    },
      

}