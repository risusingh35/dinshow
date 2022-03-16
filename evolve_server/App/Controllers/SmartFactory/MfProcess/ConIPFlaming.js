'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getIpFlamingWoList: async function(req, res) {
        try {
          let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.getIpFlamingWoList();
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
    getIpFlamingChildList: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.getIpFlamingChildList(req.body.EvolveProdOrdersDetail_ID);
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
    startIpFlaming: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.startIpFlaming(req.body.EvolveProdOrdersDetail_Serial);
        if(woList instanceof Error || woList.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
            res.send(obj);
        } else {
            let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.printData(req.body.EvolveProdOrdersDetail_Serial);
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
            }else if(printData.recordset[0].EvolveItem_Type == 'HPLAMINATION'){
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
            // "\r\n^FT189,73^A0N,28,28^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";
            //Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPath+'/doorAssy.txt',ZplData,function(err){\
    
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirIpFlamingPrint+'/'+barcode+'.txt',ZplData,function(err){
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
    getIpFlamingCompletedTriggers: async function(req, res) {
    try {
        let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.getIpFlamingCompletedTriggers();
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
    
    checkIpFlamingBarcode: async function(req, res) {
    try {
        let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkIpFlamingBarcode(req.body.EvolveProdOrdersDetail_Serial);
        if(itemDetail instanceof Error || itemDetail.rowsAffected < 1){
            let obj = { statusCode: 400, status: "fail", message: "Error While Get Barcode Details", result: null };
            res.send(obj);
        } else {
            let obj = { statusCode: 200, status: "fail", message: "Ip Flaming Barcode", result: itemDetail.recordset[0] };
            res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
    },
    ipFlamingChildBarcode: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkParentScanQty(req.body);
        if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired != checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
        {
            let checkUniqueItem = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkUniqueItem(req.body.childItem_id);
            let childBarcodeNxtStep = false;
            console.log("heckUniqueItem.recordset[0].EvolveItem_Unique == true>>" ,checkUniqueItem.recordset[0].EvolveItem_Unique == true   )
            if(checkUniqueItem.recordset[0].EvolveItem_Unique == true){
            let checkUniqueChildBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkUniqueChildBarcode(req.body.EvolveProdOrdersDetail_Serial);
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
            let updateProdOrderDetailChild = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.updateProdOrderDetailChild(req.body);
            if(updateProdOrderDetailChild instanceof Error || updateProdOrderDetailChild.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: "Error While Update Barcode Details", result: null };
                res.send(obj);
            } else {
                let insertIpFlamingBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.insertIpFlamingBarcode(req.body);
                if(insertIpFlamingBarcode instanceof Error || insertIpFlamingBarcode.rowsAffected < 1){
                let obj = { statusCode: 400, status: "fail", message: "Error While Insert Barcode Details", result: null };
                res.send(obj);
                } else {
                let updateParentBarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.updateParentBarcode(req.body,checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned);
                if(updateParentBarcode instanceof Error || updateParentBarcode.rowsAffected < 1){
                    let obj = { statusCode: 400, status: "fail", message: "Error While Update Parent Barcode Details", result: null };
                    res.send(obj); 
                } else {
                    let checkParentScanQtyNew = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkFlamingParentScanQty(req.body);
                    if(checkParentScanQtyNew.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQtyNew.recordset[0].EvolveProdOrders_TotalScanned)
                    {
                    let checkFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkBarcodeInFlamingAudit(req.body);
                    if(checkFlamingAudit instanceof Error)
                    {
                        let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In Flaming Audit", result: null };
                        res.send(obj); 
        
                    }else if(checkFlamingAudit.rowsAffected < 1){
                    let addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body);
                    // let getScrewParent = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.getScrewParent(req.body);
                    // let addIpFlamingAudit = '';
                    // if(getScrewParent.recordset[0].EvolveItem_Type == 'FRRH'){
                    //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,0,1);
                    // } else if(getScrewParent.recordset[0].EvolveItem_Type == 'FRLH'){
                    //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,1,0);
                    // } else if(getScrewParent.recordset[0].EvolveItem_Type == 'RRLH' || getScrewParent.recordset[0].EvolveItem_Type == 'RRRH'){
                    //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,1,1);
                    // }
                    if(addIpFlamingAudit instanceof Error || addIpFlamingAudit.rowsAffected < 1)
                    {
                        let obj = { statusCode: 400, status: "fail", message: "Error While Start Flaming Process", result: null };
                        res.send(obj); 
                    }
                    else
                    {
                        let msg = "Start Flaming Process.";
                        let obj = { statusCode: 200, status: "success", message: msg, result: null };
                        res.send(obj); 
                    }
                    }else{
                    let msg = "Start Flaming Process.";
                    let obj = { statusCode: 200, status: "success", message: msg, result: null };
                    res.send(obj); 

                    }
                    // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addDoorAssyAudit(req.body); 
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
    startFlamingProcess: async function(req, res) {
    try {
        let checkParentScanQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkFlamingParentScanQty(req.body);
        console.log('Step 1');
        if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == null){
            checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired = 0;
        }
        if(checkParentScanQty.recordset[0].EvolveProdOrders_ScannedRequired == checkParentScanQty.recordset[0].EvolveProdOrders_TotalScanned)
        {
            console.log('Step 8');  
            let checkFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.checkBarcodeInFlamingAudit(req.body);
            if(checkFlamingAudit instanceof Error)
            {
            let obj = { statusCode: 400, status: "fail", message: "Error While Check Barcode In Flaming Audit", result: null };
            res.send(obj); 

            }else if(checkFlamingAudit.rowsAffected < 1){
            let addIpFlamingAudit  = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body);
            // if(getScrewParent.recordset[0].EvolveItem_Type == 'FRRH'){
            //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,0,1);
            // } else if(getScrewParent.recordset[0].EvolveItem_Type == 'FRLH'){
            //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,1,0);
            // } else if(getScrewParent.recordset[0].EvolveItem_Type == 'RRLH' || getScrewParent.recordset[0].EvolveItem_Type == 'RRRH'){
            //   addIpFlamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,1,1);
            // }else if(getScrewParent.recordset[0].EvolveItem_Type == 'IpAssy'){
            //   addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,0,1);
            // }else if(getScrewParent.recordset[0].EvolveItem_Type == 'HPLAMINATION'){
            //   addIpFoamingAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addIpFlamingAudit(req.body,0,1);
            // }
            if(addIpFlamingAudit instanceof Error || addIpFlamingAudit.rowsAffected < 1)
            {
            let obj = { statusCode: 400, status: "fail", message: "Error While Start Flaming Process", result: null };
            res.send(obj); 
            }
            else
            {
            console.log('Step 9');  
            let msg = "Start Flaming Process";
            let obj = { statusCode: 200, status: "success", message: msg, result: null };
            res.send(obj); 
            }
        }else{
            let msg = "Start Flaming Process";
            let obj = { statusCode: 200, status: "success", message: msg, result: null };
            res.send(obj); 
        }
            // let addDoorAssyAudit = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addDoorAssyAudit(req.body);
            
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
    ipFlamingCheckAudit: async function(req, res) {
    try {

        // console.log("req.EvolveUser_ID>>" ,  req.EvolveUser_ID)
        // req.body.EvolveUser_ID = req.EvolveUser_ID;

        let auditDetails = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.ipFlamingCheckAudit();
        // console.log("auditDetails>>" , auditDetails)
        if(auditDetails instanceof Error){
            // let obj = { statusCode: 400, status: "fail", message: "No Data Found", result: null };
            // res.send(obj);
            await Evolve.Io.emit('checkIpFlamingS3', {
            message : 'Error While Check Audit Data',
            barcode : '',
            });
        } else {
            // auditDetails.recordset[0].EvolveUser_ID = 1;
            if(auditDetails.rowsAffected > 0) {
            let  machineStatus = '-' ;
            let  messegeStatus = 'Start Flaming Process' ;


            if(auditDetails.recordset[0].EvolveIpFlamingAudit_MachineStatus == 0){
                machineStatus = 'Machine off'
                messegeStatus = 'Start Flaming Process'

            }else if(auditDetails.recordset[0].EvolveIpFlamingAudit_MachineStatus == 1){
                machineStatus = 'Machine in manual mode'
                messegeStatus = 'Flaming Process Running' ;


            }else if(auditDetails.recordset[0].EvolveIpFlamingAudit_MachineStatus == 2){
                machineStatus = 'Machine in semi auto mode'
                messegeStatus = 'Flaming Process Running' ;


            }
            else if(auditDetails.recordset[0].EvolveIpFlamingAudit_MachineStatus == 3){
                machineStatus = 'Machine in ato mode'
                messegeStatus = 'Flaming Process Running' ;


            }
            let  auditData = [
                {
                no : '1',
                desc : 'Barcode Number ',
                value : auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode 
                } ,
                {
                no : '2',
                desc : 'Machine Status ',
                value : machineStatus
                } ,
                {
                no : '3',
                desc : 'Tool No ',
                value : auditDetails.recordset[0].EvolveIpFlamingAudit_ToolNo 
                } ,
                {
                no : '4',
                desc : 'Cycle started',
                value : (auditDetails.recordset[0].EvolveIpFlamingAudit_CycleStarted == 1) ? 'True' : 'False', 
                } ,
                {
                no : '5',
                desc : 'MES Runnig ',
                value : (auditDetails.recordset[0].EvolveIpFlamingAudit_MESRunning == 1) ? 'ON' : 'OFF',
                } ,
                {
                no : '6',
                desc : 'Cycle Reset ',
                value :  (auditDetails.recordset[0].EvolveIpFlamingAudit_CycleReset == 1) ? 'True' : 'False', 
                } ,
                {
                no : '7',
                desc : 'Cycle Running ',
                value :  (auditDetails.recordset[0].EvolveIpFlamingAudit_MESRunning == 1) ? 'True' : 'False', 
                } ,
                {
                no : '8',
                desc : 'Part Ok',
                value :  (auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartOk == 1) ? 'True' : '-' , 
                } ,
                {
                no : '9',
                desc : 'Part Not Ok  ',
                value :  (auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartNotOk == 1) ? 'True' : '-'
                } ,
                {
                no : '10',
                desc : 'Cycle Completed',
                value : auditDetails.recordset[0].EvolveIpFlamingAudit_CycleCompleted == 1 ? 'True' : '-' 
                } ,
                {
                no : '11',
                desc : 'Part Finish',
                value : auditDetails.recordset[0].EvolveIpFlamingAudit_PartFinish == 1 ? 'True' : '-' 
                } ,

            
            
            
            ]
            await Evolve.Io.emit('checkIpFlamingS3', {
                message : messegeStatus ,
                barcode : auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode,
                tagList : auditData,

            });
            if(auditDetails.recordset[0].EvolveIpFlamingAudit_CycleCompleted == true){
                let addHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.addFlamingAuditHistory(auditDetails.recordset[0]);

                if(addHistory instanceof Error || addHistory.rowsAffected < 0){

                await Evolve.Io.emit('checkIpFlamingS3', {
                    message : 'Error While add flaming  history',
                    barcode : '',
                });

                }else{  
                    await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.TruncateipFlamingAudit();
                    // if(auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartOk == true){
                    let changeSequence = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.changeSequenceToFoaming(auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode , auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartOk );
                    if(changeSequence instanceof Error || changeSequence.rowsAffected < 0){
                        await Evolve.Io.emit('checkIpFlamingS3', {
                        message : 'Error While move to floaming',
                        barcode : auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode,
                        });
                    } else {
                        // await Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.checkAndPrintAutoBarcodeIpFlaming(auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode);
                        if(auditDetails.recordset[0].EvolveIpFlamingAudit_IsPartOk == true)
                        {
                        await Evolve.Io.emit('checkIpFlamingS3', {
                            message : 'OK',
                            barcode : auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode,
                            tagList : auditData,

                        });
                        }else{
                            await Evolve.Io.emit('checkIpFlamingS3', {
                            message : 'NOTOK',
                            barcode : auditDetails.recordset[0].EvolveIpFlamingAudit_Barcode,
                            tagList : auditData,

                            });

                        }
                    }
                }   
            }
            }
        }

        setTimeout(function(){
            Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.ipFlamingCheckAudit();
        },1000);

    } catch (error) {
        Evolve.Log.error(error.message);
        // let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        // res.send(obj);
    }
    },
    checkAndPrintAutoBarcodeIpFlaming: async function(prvBarcode) {
    try {
        let itemDetail = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.getIpFlamingNextBarcode(prvBarcode);
        if(itemDetail instanceof Error ){
        // let obj = { statusCode: 400, status: "fail", message: "Error while got next barcode", result: null };
        // res.send(obj); 
        await Evolve.Io.emit('checkIpFlamingS3', {
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
        let printData = await Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.printData(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
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
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirIpFlamingPrint+'/'+barcode+'.txt',ZplData,function(err){
            if(err){
            
            } else {
            Evolve.App.Services.SmartFactory.MfProcess.SrvIPFlaming.startIpFlaming(itemDetail.recordset[0].EvolveProdOrdersDetail_Serial);
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