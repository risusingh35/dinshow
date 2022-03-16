'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
        // IP FoAMING  CONTROLLERS  

        getIpFoamingWoList: async function(req, res) {
            try {
              let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getIpFoamingWoList();
                if(woList instanceof Error){
                  let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Orders", result: null };
                  res.send(obj);
                } else if( woList.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                  res.send(obj);
      
                } {
                  let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordsets[0] };
                  res.send(obj);
                }
            } catch (error) {
                Evolve.Log.error(error.message);
                let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                res.send(obj);
            }
          },
          getIpFoamingChildList: async function(req, res) {
            try {
              let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getIpFoamingChildList(req.body.EvolveProdOrdersDetail_ID);
                if(woList instanceof Error || woList.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "Error while get child list", result: null };
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
          startIpFoaming: async function(req, res) {
            try {
                let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.startIpFoaming(req.body.EvolveProdOrdersDetail_Serial);
                if(woList instanceof Error || woList.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "Error While start Ip Foaming !", result: null };
                  res.send(obj);
                } else {
                  let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.printData(req.body.EvolveProdOrdersDetail_Serial);
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
                  }
                  let barcode = "0"+prefix+"0100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
                  let itemCode = printData.recordset[0].EvolveItem_Code
                  
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
                  // let itemDesc_sup = printData.recordset[0].EvolveItem_Desc+" "+printData.recordset[0].EvolveItem_CustPart
                  // var ZplData = "^XA\r\n^PW599"+
                  // "\r\n^LL0280"+
                  // "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA,"+barcode+"^FS"+
                  // "\r\n^FT189,169^A0N,28,28^FH^FD"+itemCode+"^FS"+
                  // "\r\n^FT170,121^A0N,28,28^FH^FD"+itemDesc_sup+"^FS"+
                  "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
             
                    Evolve.Fs.writeFile(Evolve.ConfigData.App.dirIpFoamingPrint+'/'+barcode+'.txt',ZplData,function(err){
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
          getIpFoamingCompletedTriggers: async function(req, res) {
            try {
              let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getIpFoamingCompletedTriggers();
                if(woList instanceof Error){
                  let obj = { statusCode: 400, status: "fail", message: "Error While get completed triggers!", result: null };
                  res.send(obj);
                } else {
                  let obj = { statusCode: 200, status: "success", message: "Completed trigger count", result: woList.recordset[0] };
                  res.send(obj);
                }
            } catch (error) {
                Evolve.Log.error(error.message);
                let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                res.send(obj);
            }
          },
          checkIpFoamingBarcodeOnLoad: async function(req, res) {
            try {
                let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkIpFoamingBarcode(req.body.EvolveProdOrdersDetail_Serial);
                if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){
                  let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
                  res.send(obj);
                } else {
                  let obj = { statusCode: 200, status: "fail", message: "Ip Foaming Barcode", result: itemDetail.recordset[0] };
                  res.send(obj);
                }
            } catch (error) {
                Evolve.Log.error(error.message);
                let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                res.send(obj);
            }
          },
          checkIpFoamingBarcode: async function(req, res) {
            try {
                req.body.EvolveUser_ID = req.EvolveUser_ID;
                let error = false ;
                let errorMessege = '';
                let isExpired = false;
              
                let flamingDays = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkIpFoamingBarcode(req.body.EvolveProdOrdersDetail_Serial);
                if(flamingDays instanceof Error ){
                  error = true ;
                  errorMessege = 'Error While Check foaming barcode'
    
                } else if(flamingDays.rowsAffected <1){
                  error = true ;
                  errorMessege = 'Invalid Parent Barcode'
      
                }else {
                  if(flamingDays.recordset[0].daysFromFlaming >= 15){
                    let refLaming   = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.partMoveToReFlaming(req.body);
                    if(refLaming instanceof Error || refLaming.rowsAffected < 1){
                      error = true ;
                      errorMessege = 'Error While Moving Part For Re-Flaming'
        
                    }else{  
                      error = false ;     
                      isExpired = true ;
               
              
                    }
                  }else{
                    error = false ;
                    errorMessege = 'Valid Parent Barcode'
            
                  }
                }
                if(error == true){
                   let obj = { statusCode: 400, status: "fail", message: errorMessege, result: null };
                   res.send(obj); 
      
                }else{                       
                  if(isExpired == true){
                    // await Evolve.Io.emit('checkIpFoamingS3', {
                    //   message : 'Part Moved For Re-Flaming',
                    //   barcode : req.body.EvolveProdOrdersDetail_Serial,
                    //   });
                    console.log("Entered in  true depart  ment ")
                    let obj = { statusCode: 300, status: "fail", message: 'Part Moved TO Re-Flaming', result: null };
                    res.send(obj);
                     
      
                  }else{

                    console.log("Entered in  false depart  ment ")

                    
                   let obj = { statusCode: 200, status: "Success", message: "Valid Barcode", result: flamingDays.recordset[0] };
                    res.send(obj);
      
                  
                  }
      
      
      
                }
            } catch (error) {
                Evolve.Log.error(error.message);
                // let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                // res.send(obj);
            }
          },
          ipFoamingChildBarcode: async function(req, res) {
            try {
                req.body.EvolveUser_ID = req.EvolveUser_ID;
                let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkParentScanQty(req.body);
                if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
                {
                  let checkInventory = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getInventory(req.body);
      
                  console.log("checkInventory>>>>" ,  checkInventory)
        
                  if(checkInventory instanceof Error){
                    let obj = { statusCode: 400, status: "fail", message: "Error While check inventory", result: null };
                    res.send(obj);
        
                  }else if(checkInventory.rowsAffected == 0){
        
                    let obj = { statusCode: 300, status: "fail", message: "Wrong Barcode Scan", result: null };
                    res.send(obj);
        
        
                  }else{
                    console.log("ENtered in  qty  to  update >>  ")
                    let qtyToUpdate ;
        
                    if(checkInventory.recordset[0].EvolveInventory_QtyAvailable >=  req.body.qty){
                      qtyToUpdate = req.body.qty ; 
                    }else{
                      qtyToUpdate = checkInventory.recordset[0].EvolveInventory_QtyAvailable ; 
        
                    }
                    req.body.qtyToUpdate = qtyToUpdate;
                    req.body.EvolveProdOrdersDetail_Serial = checkInventory.recordset[0].EvolveInventory_RefNumber;
                    req.body.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
      
                    let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateProdOrderDetailChildFoaming(req.body);
                    if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                      let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                      res.send(obj);
                    } else {
                      let insertIpFoamingBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.insertIpFoamingBarcode(req.body);
                      if(insertIpFoamingBarcode instanceof Error || insertIpFoamingBarcode.rowsAffected < 1){
                        let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                        res.send(obj);
                      } else {
                        let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateParentBarcodeFoaming(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
      
                        if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                          let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                          res.send(obj);  
                        } else {
        
        
                        let updateInv = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateInvDetails(req.body); 
      
                        if(updateInv instanceof Error || updateInv.rowsAffected < 1) 
                        {
                          let obj = { statusCode: 400, status: "fail", message: "Error While change inventory qty", result: null };
                          res.send(obj);  
        
                        }else{
                          
                          let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkParentScanQty(req.body);
                          if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                          {
                            let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getScrewParent(req.body);
                            let addIpFoamingAudit = '';
                            if(getScrewParent.recordset[0].EvolveItem_Type == 'FRRH'){
                              addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body,0,1);
                            } else if(getScrewParent.recordset[0].EvolveItem_Type == 'FRLH'){
                              addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body,1,0);
                            } else if(getScrewParent.recordset[0].EvolveItem_Type == 'RRLH' || getScrewParent.recordset[0].EvolveItem_Type == 'RRRH'){
                              addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body,1,1);
                            }else if(getScrewParent.recordset[0].EvolveItem_Type == 'IpAssy' ){
                              addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body,0,1);
                            }
                            if(addIpFoamingAudit instanceof Error || addIpFoamingAudit.rowsAffected < 1)
                            {
                              let obj = { statusCode: 400, status: "fail", message: "Error While Foaming Opretion", result: null };
                              res.send(obj); 
                            }
                            else
                            {
                              let msg = "Start Foaming Process";
                              let obj = { statusCode: 200, status: "success", message: msg, result: null };
                              res.send(obj); 
                            }
                            // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addDoorAssyAudit(req.body); 
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
                  // }
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
          ipFoamingChemberCheck: async function(req, res) {
            try {
                req.body.EvolveUser_ID = req.EvolveUser_ID;
                let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkParentScanQty(req.body);
                if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
                {
      
                  let getLastFoamedSerialNo = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getLastFoamedSerialNo() ;
                  console.log("getLastFoamedSerialNo>>" ,  getLastFoamedSerialNo)
                  if(getLastFoamedSerialNo instanceof Error){
      
                    let obj = { statusCode: 400, status: "fail", message: "Error While Get Last Foamed Serial No", result: null };
                    res.send(obj);
      
      
      
                  }else if(getLastFoamedSerialNo.rowsAffected == 0){
                    let obj = { statusCode: 300, status: "fail", message: "Scan Child Barcode", result: null };
                    res.send(obj);
                  }else{
                    req.body.EvolveProdOrdersDetail_ID = getLastFoamedSerialNo.recordset[0].EvolveProdOrdersDetail_ID
                  let checkInventory = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkInventory(req.body)
      
                  if(checkInventory instanceof Error){
                    
                    let obj = { statusCode: 400, status: "fail", message: "Error While Check Inventory", result: null };
                    res.send(obj);
                  }else if(checkInventory.rowsAffected == 0){
      
                    let obj = { statusCode: 300, status: "fail", message: "Scan Child Barcode", result: null };
                    res.send(obj);
      
      
                  }else{
                    let qtyToUpdate ;
      
                    if(checkInventory.recordset[0].EvolveInventory_QtyAvailable >=  req.body.qty){
                      qtyToUpdate = req.body.qty ; 
                    }else{
                      qtyToUpdate = checkInventory.recordset[0].EvolveInventory_QtyAvailable ; 
      
                    }
                    req.body.qtyToUpdate = qtyToUpdate;
                    req.body.EvolveProdOrdersDetail_Serial = checkInventory.recordset[0].EvolveInventory_RefNumber;
                    req.body.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
      
                    let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateProdOrderDetailChildFoaming(req.body);
                    if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                      let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                      res.send(obj);
                    } else {
                      let insertIpFoamingBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.insertIpFoamingBarcode(req.body);
                      if(insertIpFoamingBarcode instanceof Error || insertIpFoamingBarcode.rowsAffected < 1){
                        let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                        res.send(obj);
                      } else {
                        let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateParentBarcodeFoaming(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
                        if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                         let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                          res.send(obj);  
                        } else {
      
                        let updateInv = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.updateInvDetails(req.body); 
                        if(updateInv instanceof Error || updateInv.rowsAffected < 1) 
                        {
                          let obj = { statusCode: 400, status: "fail", message: "Error While change inventory qty", result: null };
                          res.send(obj);  
      
                        }else{
                          let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkParentScanQty(req.body);
                          if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                          {
                            let checkFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkBarcodeInFoamingAudit(req.body);
                            if(checkFoamingAudit instanceof Error)
                            {
                              let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In Foaming Audit", result: null };
                              res.send(obj); 
                
                            }else if(checkFoamingAudit.rowsAffected < 1){
                            let addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body);
                            if(addIpFoamingAudit instanceof Error || addIpFoamingAudit.rowsAffected < 1)
                            {
                              let obj = { statusCode: 400, status: "fail", message: "Error While Foaming Opretion", result: null };
                              res.send(obj); 
                            }
                            else
                            {
                              let msg = "Start Foaming Process";
                              let obj = { statusCode: 200, status: "success", message: msg, result: null };
                              res.send(obj); 
                            }
                          }else{
                            let msg = "Start Foaming Process";
                            let obj = { statusCode: 200, status: "success", message: msg, result: null };
                            res.send(obj); 
      
                          }
                          } 
                          else
                          {
                            let obj = { statusCode: 200, status: "success", message: "Scan Complete.Next Please", result: null };
                            res.send(obj); 
                          }
                        }
                        }
                      }
                    }
                  }
                }
                  // }
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
       
      
          startIpFoamingProcess: async function(req, res) {
            try {
                let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkParentScanQty(req.body);
                console.log('Step 1');
                if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
                {
                  console.log('Step 8');  
      
                  let checkFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.checkBarcodeInFoamingAudit(req.body);
                  if(checkFoamingAudit instanceof Error)
                  {
                    let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In Foaming Audit", result: null };
                    res.send(obj); 
      
                  }else if(checkFoamingAudit.rowsAffected < 1){
     
                  let addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addIpFoamingAudit(req.body);
              
                  if(addIpFoamingAudit instanceof Error || addIpFoamingAudit.rowsAffected < 1)
                  {
                    let obj = { statusCode: 400, status: "fail", message: "Error While Start Foaming Process", result: null };
                    res.send(obj); 
                  }
                  else
                  {
                    console.log('Step 9');  
                    let msg = "Start Foaming Process";
                    let obj = { statusCode: 200, status: "success", message: msg, result: null };
                    res.send(obj); 
                  }
                }else{
                  let msg = "Start Foaming Process";
                  let obj = { statusCode: 200, status: "success", message: msg, result: null };
                  res.send(obj); 
      
                }
                  // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addDoorAssyAudit(req.body);
                  
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
         
          ipFoamingCheckAudit: async function(req, res) {
            try {
                let auditDetails = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.ipFoamingCheckAudit();
                if(auditDetails instanceof Error){
                  // let obj = { statusCode: 400, status: "fail", message: "No Data Found", result: null };
                  // res.send(obj);
                  
                  await Evolve.Io.emit('checkIpFoamingS3', {
                    message : 'Error While Check Audit Data',
                    barcode : '',
                  });
                } else {
          
                  if(auditDetails.rowsAffected > 0) {
                    let  machineStatus = '-' ;
                    let  messegeStatus = 'Start Foaming Process' ;
      
                    if(auditDetails.recordset[0].EvolveIpFoamingAudit_MachineStatus == 0){
                      machineStatus = 'Machine off'
                      messegeStatus = 'Start Foaming Process'
      
                    }else if(auditDetails.recordset[0].EvolveIpFoamingAudit_MachineStatus == 1){
                      machineStatus = 'Machine in manual mode'
                      messegeStatus = 'Foaming Process Running' ;
      
      
                    }else if(auditDetails.recordset[0].EvolveIpFoamingAudit_MachineStatus == 2){
                      machineStatus = 'Machine in semi auto mode'
                      messegeStatus = 'Foaming Process Running' ;
      
      
                    }
                    else if(auditDetails.recordset[0].EvolveIpFoamingAudit_MachineStatus == 3){
                      machineStatus = 'Machine in ato mode'
                      messegeStatus = 'Foaming Process Running' ;
      
      
                    }
                    let  auditData = [
        
                      {
                        no : '1',
                        desc : 'Machine Status ',
                        value : machineStatus
                      } ,
                      {
                        no : '2',
                        desc : 'Poly Material level status ',
                        // value : auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus 
                        value : (auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == 1) ? 'OK' :(auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == 0) ? 'NOT OK' : '-' , 
                      } ,
                      {
                      no : '3',
                      desc : 'ISO Material level status',
                      value : (auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == 1) ? 'OK' :(auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == 0) ? 'NOT OK' : '-' , 
                      } ,                  
                    ]
                    await Evolve.Io.emit('checkIpFoamingS3', {
                      message : messegeStatus ,
                      barcode : auditDetails.recordset[0].EvolveIpFoamingAudit_Barcode,
                      tagList : auditData,
      
      
      
                    });
                    // console.log("auditDetails.recordset[0]>>>" ,  auditDetails.recordset[0])
                    if((auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == true && auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == false) || (auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == false && auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == true) || (auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == true && auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == true) || (auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == false && auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == false)  ){
                      let addHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.addFoamingAuditHistory(auditDetails.recordset[0]);
      
                      if(addHistory instanceof Error || addHistory.rowsAffected < 0){
      
                        await Evolve.Io.emit('checkIpFoamingS3', {
                          message : 'Error While add flaming  history',
                          barcode : '',
                        });
      
                      }else{  
                        
                            await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.TruncateipFoamingAudit();
                            // if(auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartOk == true){
                            let changeSequence = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.changeSequenceToAssembly(auditDetails.recordset[0].EvolveIpFoamingAudit_Barcode , auditDetails.recordset[0] );
                            if(changeSequence instanceof Error || changeSequence.rowsAffected < 0){
                              await Evolve.Io.emit('checkIpFoamingS3', {
                                message : 'Error While move to floaming',
                                barcode : auditDetails.recordset[0].EvolveIpFoamingAudit_Barcode,
                              });
                            } else {
                                if(auditDetails.recordset[0].EvolveIpFoamingAudit_PolyMaterialStatus == true && auditDetails.recordset[0].EvolveIpFoamingAudit_ISOMaterialStatus == true)
                                {
                                await Evolve.Io.emit('checkIpFoamingS3', {
                                  message : 'OK',
                                  barcode : auditDetails.recordset[0].EvolveIpFoamingAudit_Barcode,
                                  tagList : auditData,
                                  // partOk : true ,
      
                                });
                                }else{
                                  await Evolve.Io.emit('checkIpFoamingS3', {
                                    message : 'NOTOK',
                                    barcode : auditDetails.recordset[0].EvolveIpFoamingAudit_Barcode,
                                    tagList : auditData,
        
                                  });
      
                                }
                            }
                      }
                    }
                  }
                }
      
              setTimeout(function(){
                Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.ipFoamingCheckAudit();
              },1000);
      
            } catch (error) {
                Evolve.Log.error(error.message);

            }
          },
          checkAndPrintAutoBarcodeIpFoaming: async function(prvBarcode) {
            try {
              let nextBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.getIpFoamingNextBarcode(prvBarcode);
              if(nextBarcode instanceof Error || nextBarcode.rowsAffected < 1){ 
          
              } else {
                let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.printData(nextBarcode.recordset[0].EvolveProdOrdersDetail_Serial);
                let prefix = '';
                let barcode = "010100065"+printData.recordset[0].EvolveItem_CustPart+"00"+printData.recordset[0].EvolveProdOrdersDetail_Serial;
                let itemCode = printData.recordset[0].EvolveItem_Code
                
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
                // let itemDesc_sup = printData.recordset[0].EvolveItem_Desc+" "+printData.recordset[0].EvolveItem_CustPart
                // var ZplData = "^XA\r\n^PW599"+
                // "\r\n^LL0280"+
                // "\r\n^LS0^LS0^FT43,223^BQN,2,5^FDMA,"+barcode+"^FS"+
                // "\r\n^FT189,169^A0N,28,28^FH^FD"+itemCode+"^FS"+
                // "\r\n^FT170,121^A0N,28,28^FH^FD"+itemDesc_sup+"^FS"+
                // "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
                // console.log("Entering  for print  barcode >>>.")
      
                  Evolve.Fs.writeFile(Evolve.ConfigData.App.dirIpFoamingPrint+'/'+barcode+'.txt',ZplData,function(err){
                  if(err){
      
                    Evolve.Log.error("Entered in  error >>>>>>>" ,  err)
                    
                  } else {
                   Evolve.App.Services.SmartFactory.MfProcess.SrvIPFoaming.startIpFoaming(nextBarcode.recordset[0].EvolveProdOrdersDetail_Serial);
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