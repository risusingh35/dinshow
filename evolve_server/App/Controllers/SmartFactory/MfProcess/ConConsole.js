'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    checkConsoleAssyBarcode: async function (req, res) {
        try {
            let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkConsoleAssyBarcode(req.body.EvolveProdOrdersDetail_Serial);
            if (itemDetail instanceof Error || itemDetail.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "fail", message: "Console Assy Barcode", result: itemDetail.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0578: Error while checking console Assy barcode "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0578: Error while checking console Assy barcode "+error.message, result: null };
            res.send(obj);
        }
    },
    consoleChildBarcode: async function(req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkParentScanQty(req.body);
            if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
            {
              let checkUniqueItem = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkUniqueItem(req.body.childItem_id);
              let childBarcodeNxtStep = false;
              if(checkUniqueItem.recordset[0].EvolveItem_Unique == true){
                let checkUniqueChildBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkUniqueChildBarcode(req.body.EvolveProdOrdersDetail_Serial);
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
                let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.updateProdOrderDetailChild(req.body);
                if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                  res.send(obj);
                } else {
                  let insertDoorAssyBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.insertDoorAssyBarcode(req.body);
                  if(insertDoorAssyBarcode instanceof Error || insertDoorAssyBarcode.rowsAffected < 1){
                    let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                    res.send(obj);
                  } else {
                    let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.updateParentBarcode(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
                    if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                      let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                      res.send(obj); 
                    } else {
                      let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkParentScanQty(req.body);
                      if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                      {
                        let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getScrewParent(req.body);
                        let addConsoleAssyAudit = '';
                        if(getScrewParent.recordset[0].EvolveItem_Type == 'CONSOLE1'){
                          addConsoleAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addConsoleAssyAudit(req.body,1,0);
                        } else if(getScrewParent.recordset[0].EvolveItem_Type == 'CONSOLE2'){
                          addConsoleAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addConsoleAssyAudit(req.body,0,1);
                        }
                        if(addConsoleAssyAudit instanceof Error || addConsoleAssyAudit.rowsAffected < 1)
                        {
                          let obj = { statusCode: 400, status: "fail", message: "Error While Start Screw Opration", result: null };
                          res.send(obj); 
                        }
                        else
                        {
                          let msg = "Start Screw Opretion. "+getScrewParent.recordset[0].EvolveItem_Screw+" Screw(s)";
                          let obj = { statusCode: 200, status: "success", message: msg, result: null };
                          res.send(obj); 
                        }
                        // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addDoorAssyAudit(req.body);
                        
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
       
    startScrewOprationConsole: async function (req, res) {
        try {
            let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.checkParentScanQty(req.body);
            console.log('Step 1');
            if (checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned) {
                console.log('Step 8');
                let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getScrewParent(req.body);
                let addConsoleAssyAudit = '';
                if (getScrewParent.recordset[0].EvolveItem_Type == 'CONSOLE1') {
                    addConsoleAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addConsoleAssyAudit(req.body, 1, 0);
                } else if (getScrewParent.recordset[0].EvolveItem_Type == 'CONSOLE2') {
                    addConsoleAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addConsoleAssyAudit(req.body, 0, 1);
                }
                if (addConsoleAssyAudit instanceof Error || addConsoleAssyAudit.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error While Start Screw Opretion", result: null };
                    res.send(obj);
                }
                else {
                    console.log('Step 9');
                    let msg = "Start Screw Opretion. " + getScrewParent.recordset[0].EvolveItem_Screw + " Screw(s)";
                    let obj = { statusCode: 200, status: "success", message: msg, result: null };
                    res.send(obj);
                }
                // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.addDoorAssyAudit(req.body);

            }
            else {
                console.log('Step 10');
                let obj = { statusCode: 300, status: "success", message: "Scan Complete.Next Please", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0580: Error while starting screw operation console "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0580: Error while starting screw operation console "+error.message, result: null };
            res.send(obj);
        }
    },
    getConsoleAssyChildList: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getConsoleAssyChildList(req.body.EvolveProdOrdersDetail_ID);
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Child List Successfully", result: woList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0581: Error while getting Console Assy Child List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0581: Error while getting Console Assy Child List "+error.message, result: null };
            res.send(obj);
        }
    },
    startConsoleAssy: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.startConsoleAssy(req.body.EvolveProdOrdersDetail_Serial);
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.printData(req.body.EvolveProdOrdersDetail_Serial);
                let barcode = "010100065" + printData.recordset[0].EvolveItem_CustPart + "00" + printData.recordset[0].EvolveProdOrdersDetail_Serial;
                //let barcode = printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
                //let barcode = printData.recordset[0].EvolveProdOrdersDetail_Serial
                let itemCode = printData.recordset[0].EvolveItem_Code
                // let itemDesc_sup = printData.recordset[0].EvolveItem_Desc + " " + printData.recordset[0].EvolveItem_CustPart
                // var ZplData = "^XA\r\n^PW599" +
                //     "\r\n^LL0280" +
                //     "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA," + barcode + "^FS" +
                //     "\r\n^FT189,169^A0N,28,28^FH^FD" + itemCode + "^FS" +
                //     "\r\n^FT170,121^A0N,28,28^FH^FD" + itemDesc_sup + "^FS" +
                //     "\r\n^FT189,73^A0N,28,28^FH^FD" + barcode + "^FS^PQ1,0,1,Y^XZ";

                let  itemDesc = printData.recordset[0].EvolveItem_Desc;
                let custPart = printData.recordset[0].EvolveItem_CustPart;
                let  itemDescArray = [];
                if (itemDesc != null && itemDesc != '' && itemDesc != undefined  ) {
                    
                    itemDescArray= itemDesc.split(' ');

                }

                var ZplData = "^XA\r\n^PW599"+
                "\r\n^LL0280"+
                "\r\n^LS0^LS0^FT30,265^BQN,3,6^FDMA,"+barcode+"^FS"
                let  strAlignSize  = 141;
                let  desc = '';
                if(itemDescArray.length != 0){
                  for(let i = 0  ; i < itemDescArray.length ; i++){
                    if((desc+itemDescArray[i]).length >= 20){

                        ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+desc+"^FS" ;
                        strAlignSize += 48 ;
                        desc = itemDescArray[i]+' ';

                    }else{

                        desc += itemDescArray[i]+' ';
                    }
                  }
                }
                if(desc.trim() != ''){
                  ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+desc+"^FS" ;
                  strAlignSize += 48 ;
                }

                ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,50,50^FH^FD"+custPart+"^FS";
                strAlignSize += 36
                ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,28,28^FH^FD"+itemCode+"^FS";

                ZplData +=  "\r\n^FT189,93^A0N,25,25^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
                //Evolve.Fs.writeFile(Evolve.Config.dirPath+'/doorAssy.txt',ZplData,function(err){\
                Evolve.Fs.writeFile(Evolve.Config.dirConsoleAssemblyPrint + '/' + barcode + '.txt', ZplData, function (err) {
                    if (err) {
                        let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                        res.send(obj);
                    } else {
                        let obj = { statusCode: 200, status: "success", message: "Parent Barcode Printed", result: null };
                        res.send(obj);
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR0582: Error while starting Console Assy "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0582: Error while starting Console Assy "+error.message, result: null };
            res.send(obj);
        }
    },

    getConsoleAssyWoList: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getConsoleAssyWoList();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0583: Error while getting Console Assy Wo List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0583: Error while getting Console Assy Wo List "+error.message, result: null };
            res.send(obj);
        }
    },
    getConsoleAssyCompletedTriggers: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getConsoleAssyCompletedTriggers();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0584: Errror while getting console assy completed triggers "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0584: Errror while getting console assy completed triggers "+error.message, result: null };
            res.send(obj);
        }
    },
    consoleAssyCheckAudit: async function(req, res) {
      try {
          //console.log("consoleAssyCheckAudit Called");
          let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.consoleAssyCheckAudit();
          if(itemDetail instanceof Error){
            let obj = { statusCode: 400, status: "fail", message: "No Data Found", result: null };
            res.send(obj);
          } else {
            if(itemDetail.rowsAffected > 0) {
              if(itemDetail.recordset[0].EvolveConsoleAudit_S7 == true){
                await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.TruncateConsoleAudit();
                let ComplateDoorParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.ComplateDoorParentBarcode(itemDetail.recordset[0].EvolveConsoleAudit_Barcode);
                if(ComplateDoorParentBarcode instanceof Error || ComplateDoorParentBarcode.rowsAffected < 0){
                  await Evolve.Io.emit('checkConsoleAssyS7', {
                    message : 'Error While Update Parent Barcode',
                    barcode : itemDetail.recordset[0].EvolveConsoleAudit_Barcode,
                  });
                } else {
                  Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.checkAndPrintAutoBarcodeConsole(itemDetail.recordset[0].EvolveConsoleAudit_Barcode);
                  await Evolve.Io.emit('checkConsoleAssyS7', {
                    message : 'Screw Opretion Complete',
                    barcode : itemDetail.recordset[0].EvolveConsoleAudit_Barcode,
                  });
                }
              }
            } else {
    
            }
            // let obj = { statusCode: 200, status: "success", message: "Door Assy Barcode", result: itemDetail.recordset[0] };
            // res.send(obj);
          }
    
        setTimeout(function(){
          Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.consoleAssyCheckAudit();
        },1000);
    
      } catch (error) {
          Evolve.Log.error(error.message);
          let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
          res.send(obj);
      }
    },
    
    checkAndPrintAutoBarcodeConsole: async function(prvBarcode) {
      try {
        let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.getConsoleNextBarcode(prvBarcode);
        if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){ 
    
        } else {
          let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvConsole.printData(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
          let prefix = '';
            if(printData.recordset[0].EvolveItem_Type == 'FRRH') {
                prefix = '5';
            } else if(printData.recordset[0].EvolveItem_Type == 'FRLH') {
                prefix = '6';
            } else if(printData.recordset[0].EvolveItem_Type == 'RRRH') {
                prefix = '7';
            } else if(printData.recordset[0].EvolveItem_Type == 'RRLH') {
                prefix = '8';
            } else if(printData.recordset[0].EvolveItem_Type == 'CONSOLE1') {
                prefix = '1';
            } else if(printData.recordset[0].EvolveItem_Type == 'CONSOLE2') {
                prefix = '2';
            }
          let barcode = "0"+prefix+"0100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
          let itemCode = printData.recordset[0].EvolveItem_Code
          // let itemDesc_sup = printData.recordset[0].EvolveItem_Desc+" "+printData.recordset[0].EvolveItem_CustPart
          // var ZplData = "^XA\r\n^PW599"+
          // "\r\n^LL0280"+
          // "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA,"+barcode+"^FS"+
          // "\r\n^FT189,169^A0N,28,28^FH^FD"+itemCode+"^FS"+
          // "\r\n^FT170,121^A0N,28,28^FH^FD"+itemDesc_sup+"^FS"+
          // "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
          
          let  itemDesc = printData.recordset[0].EvolveItem_Desc;
          let custPart = printData.recordset[0].EvolveItem_CustPart;

          let  itemDescArray = [];


          if (itemDesc != null && itemDesc != '' && itemDesc != undefined  ) {
              
              itemDescArray= itemDesc.split(' ');

          }

          var ZplData = "^XA\r\n^PW599"+
          "\r\n^LL0280"+
          "\r\n^LS0^LS0^FT30,265^BQN,3,6^FDMA,"+barcode+"^FS"
          let  strAlignSize  = 141;
          let  desc = '';
          if(itemDescArray.length != 0){
            for(let i = 0  ; i < itemDescArray.length ; i++){
              if((desc+itemDescArray[i]).length >= 20){

                  ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+desc+"^FS" ;
                  strAlignSize += 48 ;
                  desc = itemDescArray[i]+' ';

              }else{

                  desc += itemDescArray[i]+' ';
              }
            }
          }
          if(desc.trim() != ''){


            ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+desc+"^FS" ;
            strAlignSize += 48 ;


          }

          ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,50,50^FH^FD"+custPart+"^FS";
          strAlignSize += 36
          ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,28,28^FH^FD"+itemCode+"^FS";

          ZplData +=  "\r\n^FT189,93^A0N,25,25^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirConsoleAssemblyPrint+'/'+barcode+'.txt',ZplData,function(err){
            if(err){
              
            } else {
              Evolve.App.Services.SmartFactory.EsmartFactoryServices.startConsoleAssy(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
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