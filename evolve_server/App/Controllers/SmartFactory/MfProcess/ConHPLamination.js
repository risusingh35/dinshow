'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getHPLaminationWoList: async function(req, res) {
        try {
          let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.getHPLaminationWoList();
            if(woList instanceof Error){
              let obj = { statusCode: 400, status: "fail", message: "Error While get work order list!", result: null };
              res.send(obj);
            }else if(woList.rowsAffected < 1){
    
              let obj = { statusCode: 400, status: "success", message: "No Work Order Found", result:[] };
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
      getHPLaminationChildList: async function(req, res) {
        try {
          let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.getHPLaminationChildList(req.body.EvolveProdOrdersDetail_ID);
          if(woList instanceof Error){
            let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Order Child List!", result: null };
            res.send(obj);
          }else if(woList.rowsAffected < 1){
    
            let obj = { statusCode: 200, status: "success", message: "No Work Order Child List Found", result:[] };
            res.send(obj);
    
          } else {
              let obj = { statusCode: 200, status: "success", message: "Child List", result: woList.recordsets[0] };
              res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
      },
      startHPLamination: async function(req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.startHPLamination(req.body.EvolveProdOrdersDetail_Serial);
            if(woList instanceof Error || woList.rowsAffected < 1){
              let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
              res.send(obj);
            } else {
              let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.printData(req.body.EvolveProdOrdersDetail_Serial);
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
              }else if(printData.recordset[0].EvolveItem_Type == 'IpAssy') {
                prefix = '1';
              }else{
                prefix = '1';
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
              //Evolve.Fs.writeFile(Evolve.Config.App.dirPath+'/doorAssy.txt',ZplData,function(err){\
      
                Evolve.Fs.writeFile(Evolve.ConfigData.App.dirHPLaminationPrint+'/'+barcode+'.txt',ZplData,function(err){
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
      getHPLaminationCompletedTriggers: async function(req, res) {
        try {
          let getTrigers = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.getHPLaminationCompletedTriggers();
            if(getTrigers instanceof Error ){
              let obj = { statusCode: 400, status: "fail", message: "Error While Get HP Lamination completed triggers!", result: null };
              res.send(obj);
            } else {
              let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: getTrigers.recordset[0] };
              res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
      },
      
      checkHPLaminationBarcode: async function(req, res) {
        try {
            let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkHPLaminationBarcode(req.body.EvolveProdOrdersDetail_Serial);
            if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){
              let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
              res.send(obj);
            } else if(itemDetail.rowsAffected < 1){
    
              let obj = { statusCode: 400, status: "fail", message: "No Barcode Found", result: null };
              res.send(obj);
            }
            
            else {
              let obj = { statusCode: 200, status: "fail", message: "Ip Flaming Barcode", result: itemDetail.recordset[0] };
              res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
      },
      HPLaminationChildBarcode: async function(req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkParentScanQty(req.body);
            if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
            {
              let checkUniqueItem = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkUniqueItem(req.body.childItem_id);
              let childBarcodeNxtStep = false;
         
              if(checkUniqueItem.recordset[0].EvolveItem_Unique == true){
                let checkUniqueChildBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkUniqueChildBarcode(req.body.EvolveProdOrdersDetail_Serial);
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
                let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.updateProdOrderDetailChild(req.body);
                if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                  res.send(obj);
                } else {
                  let insertHPLaminationBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.insertHPLaminationBarcode(req.body);
                  if(insertHPLaminationBarcode instanceof Error || insertHPLaminationBarcode.rowsAffected < 1){
                    let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                    res.send(obj);
                  } else {
                    let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.updateParentBarcode(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
                    if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                      let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                      res.send(obj); 
                    } else {
                      let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkHPLaminationParentScanQty(req.body);
                      if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                      {          let checkLamination = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkBarcodeInHPLaminationAudit(req.body);
                        if(checkLamination instanceof Error)
                        {
                          let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In HP Lamination Audit", result: null };
                          res.send(obj); 
              
                        }else if(checkLamination.rowsAffected < 1){
                        let addHPLaminationAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.addHPLaminationAudit(req.body);;
        
                        if(addHPLaminationAudit instanceof Error || addHPLaminationAudit.rowsAffected < 1)
                        {
                          let obj = { statusCode: 400, status: "fail", message: "Error While Add HP Lamination Audit Details", result: null };
                          res.send(obj); 
                        }
                        else
                        {
                          let msg = "Start Lamination Process";
                          let obj = { statusCode: 200, status: "success", message: msg, result: null };
                          res.send(obj); 
                        }
                      }else{
                        let msg = "Start Lamination Process";
                        let obj = { statusCode: 200, status: "success", message: msg, result: null };
                        res.send(obj); 
    
                      }
                        // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.addDoorAssyAudit(req.body); 
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
      startHPLaminationProcess: async function(req, res) {
        try {
            let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkHPLaminationParentScanQty(req.body);
            console.log('Step 1');
            if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
            {
              console.log('Step 8');  
              let checkLamination = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.checkBarcodeInHPLaminationAudit(req.body);
              if(checkLamination instanceof Error)
              {
                let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In HP Lamination Audit", result: null };
                res.send(obj); 
    
              }else if(checkLamination.rowsAffected < 1){
             
              let addHPLaminationAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.addHPLaminationAudit(req.body);;

              if(addHPLaminationAudit instanceof Error || addHPLaminationAudit.rowsAffected < 1)
              {
                let obj = { statusCode: 400, status: "fail", message: "Error While Add HP Lamination Audit Details", result: null };
                res.send(obj); 
              }
              else
              {
                console.log('Step 9');  
                let msg = "Start Lamination Process";
                let obj = { statusCode: 200, status: "success", message: msg, result: null };
                res.send(obj); 
              }
            }else{
              let msg = "Start Lamination Process";
              let obj = { statusCode: 200, status: "success", message: msg, result: null };
              res.send(obj); 
    
            }
  
            } 
            else
            {
              console.log('Step 10');  
              let obj = { statusCode: 300, status: "success", message: "Scan Complete.Next Please", result: null };
              res.send(obj); 
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
      },
      HPLaminationCheckAudit: async function(req, res) {
        try {
    
            let auditDetails = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.HPLaminationCheckAudit();
            // console.log("auditDetails>>" , auditDetails)
            if(auditDetails instanceof Error){
              // let obj = { statusCode: 400, status: "fail", message: "No Data Found", result: null };
              // res.send(obj);
              await Evolve.Io.emit('checkHPLamination', {
                message : 'Error While Check Audit Data',
                barcode : '',
              });
            } else {
              if(auditDetails.rowsAffected > 0) {
                let  machineStatus = '-' ;
                let  messegeStatus = 'Start Lamination Process' ;
    
    
                if(auditDetails.recordset[0].EvolveHPLaminationAudit_MachineStatus == 0){
                  machineStatus = 'Machine off'
                  messegeStatus = 'Start Lamination Process'
    
                }else if(auditDetails.recordset[0].EvolveHPLaminationAudit_MachineStatus == 1){
                  machineStatus = 'Machine in manual mode'
                  messegeStatus = 'Lamination Process Running' ;
    
    
                }else if(auditDetails.recordset[0].EvolveHPLaminationAudit_MachineStatus == 2){
                  machineStatus = 'Machine in semi auto mode'
                  messegeStatus = 'Lamination Process Running' ;
    
    
                }
                else if(auditDetails.recordset[0].EvolveHPLaminationAudit_MachineStatus == 3){
                  machineStatus = 'Machine in ato mode'
                  messegeStatus = 'Lamination Process Running' ;
    
    
                }
                let  auditData = [
                  {
                  no : '1',
                  desc : 'Barcode Number ',
                  value : auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode 
                  } ,
                  {
                    no : '2',
                    desc : 'Machine Status ',
                    value : machineStatus
                  } ,
                  {
                    no : '3',
                    desc : 'Tool No ',
                    value : auditDetails.recordset[0].EvolveHPLaminationAudit_ToolNo 
                  } ,
                  {
                  no : '4',
                  desc : 'Cycle started',
                  value : (auditDetails.recordset[0].EvolveHPLaminationAudit_CycleStarted == 1) ? 'True' : 'False', 
                  } ,
                  {
                  no : '5',
                  desc : 'MES Runnig ',
                  value : (auditDetails.recordset[0].EvolveHPLaminationAudit_MESRunning == 1) ? 'ON' : 'OFF',
                  } ,
                  {
                  no : '6',
                  desc : 'Cycle Reset ',
                  value :  (auditDetails.recordset[0].EvolveHPLaminationAudit_CycleReset == 1) ? 'True' : 'False', 
                  } ,
                  {
                  no : '7',
                  desc : 'Cycle Running ',
                  value :  (auditDetails.recordset[0].EvolveHPLaminationAudit_MESRunning == 1) ? 'True' : 'False', 
                  } ,
                  {
                  no : '8',
                  desc : 'Part Ok',
                  value :  (auditDetails.recordset[0].EvolveHPLaminationAudit_IsPartOk == 1) ? 'True' : '-' , 
                  } ,
                  {
                    no : '9',
                    desc : 'Part Not Ok  ',
                    value :  (auditDetails.recordset[0].EvolveHPLaminationAudit_IsPartNotOk == 1) ? 'True' : '-'
                    } ,
                  {
                  no : '10',
                  desc : 'Cycle Completed',
                  value : auditDetails.recordset[0].EvolveHPLaminationAudit_CycleCompleted == 1 ? 'True' : '-' 
                  } ,
                  {
                  no : '11',
                  desc : 'Part Finish',
                  value : auditDetails.recordset[0].EvolveHPLaminationAudit_PartFinish == 1 ? 'True' : '-' 
                  } ,
    
              
              
              
                ]
                await Evolve.Io.emit('checkHPLamination', {
                  message : messegeStatus ,
                  barcode : auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode,
                  tagList : auditData,
    
                });
                if(auditDetails.recordset[0].EvolveHPLaminationAudit_CycleCompleted == true){
                  console.log("Entered in  if condition>>>"   )
                  let addHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.addHPLaminationAuditHistory(auditDetails.recordset[0]);
    
                  if(addHistory instanceof Error || addHistory.rowsAffected < 0){
    
                    await Evolve.Io.emit('checkHPLamination', {
                      message : 'Error While add HP Lamination History',
                      barcode : '',
                    });
    
    
                  }else{  
                        await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.TruncateHPLaminationAudit();
                        // if(auditDetails.recordset[0].EvolveHPLaminationAudit_IsPartOk == true){
                        let changeSequence = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.changeSequenceToLaminationComplete(auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode , auditDetails.recordset[0].EvolveHPLaminationAudit_IsPartOk );
                        // console.log()
                        if(changeSequence instanceof Error || changeSequence.rowsAffected < 0){
                          await Evolve.Io.emit('checkHPLamination', {
                            message : 'Error While move Assembly',
                            barcode : auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode,
                          });
                        } else {
                            await Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.checkAndPrintAutoBarcodeHPLamination(auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode);
                            if(auditDetails.recordset[0].EvolveHPLaminationAudit_IsPartOk == true)
                            {
                            await Evolve.Io.emit('checkHPLamination', {
                              message : 'OK',
                              barcode : auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode,
                              tagList : auditData,
    
                            });
                            }else{
                              await Evolve.Io.emit('checkHPLamination', {
                                message : 'NOTOK',
                                barcode : auditDetails.recordset[0].EvolveHPLaminationAudit_Barcode,
                                tagList : auditData,
    
                              });
    
                            }
                        }
                  }
                }
              }
            }
    
          setTimeout(function(){
              Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.HPLaminationCheckAudit();
          },1000);
    
        } catch (error) {
            Evolve.Log.error(error.message);
            // let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            // res.send(obj);
        }
      },
      checkAndPrintAutoBarcodeHPLamination: async function(prvBarcode) {
        try {
          let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.getHPLaminationNextBarcode(prvBarcode);
          if(itemDetail instanceof Error ){
            // let obj = { statusCode: 400, status: "fail", message: "Error while got next barcode", result: null };
            // res.send(obj); 
            await Evolve.Io.emit('checkHPLamination', {
              message : 'Error while got next barcode',
              barcode :'',
            });
      
          } else if(itemDetail.rowsAffected == 0){
    
            // let obj = { statusCode: 400, status: "fail", message: "No more barcodes available", result: null };
            // res.send(obj); 
            await Evolve.Io.emit('checkIpFlamingS3', {
              message : 'No more barcodes available',
              barcode :'',
            });
    
    
          }else {
            let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.printData(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
            let prefix = '';
            let barcode = "010100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
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
              Evolve.Fs.writeFile(Evolve.ConfigData.App.dirHPLaminationPrint+'/'+barcode+'.txt',ZplData,function(err){
              if(err){
                
              } else {
                Evolve.App.Services.SmartFactory.MfProcess.SrvHPLamination.startHPLamination(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
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