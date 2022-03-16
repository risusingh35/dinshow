'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    gateEntryNoList: async function (req, res) {
        try {

            let result = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.gateEntryNoList(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Gate Entry Number List", result: result.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting gate Entry no. list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting gate Entry no. list ", result: null };
            res.send(obj);
        }
    },

    getDetailsByGateNo: async function (req, res) {
        try {


            let poData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getDetailsByGateNo(req.body);
            if (poData instanceof Error) {
               Evolve.Log.error("EERR0020 : Error while get details by gate no")

                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get details by gate no", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po data", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####6: Error while getting details by gate no "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting details by gate no", result: null };
            res.send(obj);

        }
    },

    getSuppliersList: async function (req, res) {
        try {
            let suppliers = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getSuppliersList(req.body);
            if (suppliers instanceof Error) {
                 Evolve.Log.error("EERR0009 : Error while get supplier list")
                  let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get supplier list", result: null };
                  res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "supplier list", result: suppliers.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0979: Error while getting supplier list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0979: Error while getting supplier list "+error.message, result: null };
            res.send(obj);
        }
    },
    getLocationList: async function (req, res) {
        try {

            let locationList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getLocationList();
            if (locationList instanceof Error) {
             Evolve.Log.error(" EERR0007 : Error while get location list ")
             let obj = { statusCode: 400, status: "fail", message: "EERR0007 : Error while get location list", result: null };
                res.send(obj);
            } else
            {
            let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0] };
            res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0980: Error while getting location list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0980: Error while getting location list "+error.message, result: null };
            res.send(obj);
        }
    },

    getPoListBySupplier: async function (req, res) {
        try {
            let poList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPoListBySupplier(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error("EERR0010 : Eroor While get po list of supplier")
                let obj = { statusCode: 400, status: "fail", message: "EERR0010 : Eroor While get po list of supplier", result: null };
                res.send(obj);
            } else if (poList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No po found !", result: poList.recordset };
                res.send(obj);


            } else {
                let obj = { statusCode: 200, status: "success", message: "Po List", result: poList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0981: Error while getting Po List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0981: Error while getting Po List "+error.message, result: null };
            res.send(obj);


        }
    },
    getSinglePoDetails: async function (req, res) {
        try {
            let poDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getSinglePoDetails(req.body);
            if (poDetails instanceof Error) {
                 Evolve.Log.error(" EERR0011 : Error while getting po line details of  po ")
                let obj = { statusCode: 400, status: "fail", message: " EERR0011 : Error while getting po line details of  po ", result: null };
                res.send(obj);
            }else if(poDetails.rowsAffected <1 ){
                let obj = { statusCode: 400, status: "fail", message: "No open po line found", result: null };
                res.send(obj);

            } else {
                let obj = { statusCode: 200, status: "success", message: "Po line details", result: poDetails.recordset };
                res.send(obj);
            }
            //  }
        } catch (error) {
            Evolve.Log.error(" EERR0982: Error while getting Single Po Details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0982: Error while getting Single Po Details "+error.message, result: null };
            res.send(obj);
       
        }
    },

    getAllPoDetails: async function (req, res) {
        try {
            let allPo = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getAllPoDetails(req.body);
            if (allPo instanceof Error) {
                Evolve.Log.error(" EERR3219 : No po data  Found!")
                let obj = { statusCode: 400, status: "fail", message: "EERR3219 : No po data  Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po details", result: allPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0983: Error while getting all Po Details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0983: Error while getting all Po Details "+error.message, result: null };
            res.send(obj);
        }
    },
    getPodetails: async function (req, res) {
        try {

            let condition = ''
            let and = true;
            for (let i = 0; i < req.body.searchArray.length; i++) {
                if (and == true) {

                    condition = condition + " AND " + "(epod.EvolvePurchaseOrderDetail_ID =" + req.body.searchArray[i].EvolvePurchaseOrderDetail_ID;
                    and = false;
                }
                else {
                    condition = condition + " OR " + "epod.EvolvePurchaseOrderDetail_ID =" + req.body.searchArray[i].EvolvePurchaseOrderDetail_ID

                }

            }
            condition = condition + ")"
            let allPo = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPodetails(condition);
            if (allPo instanceof Error) {
              Evolve.Log.error(" EERR0012 : Error while get line details ")
              let obj = { statusCode: 400, status: "fail", message: " EERR0012 : Error while get line details ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Line details", result: allPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0984: Error while getting Po details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR0984: Error while getting Po details', result: null };
            res.send(obj);
        }
    },

    getPalletDetails: async function (req, res) {
        try {

            let palletDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPalletDetails(req.body);
            if (palletDetails instanceof Error) {
               Evolve.Log.error("EERR0013 : Error while get pallet details")
               let obj = { statusCode: 400, status: "fail", message: "EERR0013 : Error while get pallet details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet Details", result: palletDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3226: Error while get pallet"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR3226: Error while get pallet", result: null };
            res.send(obj);

        }
    },


    getUomList: async function (req, res) {
        try {
            let uomList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getUomList(req.body);
            if (uomList instanceof Error) {
             Evolve.Log.error("EERR0008 : Error while get uom  list")
             let obj = { statusCode: 400, status: "fail", message: "EERR0008 : Error while get uom  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Uom list", result: uomList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0985: Error while getting pallet details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0985: Error while getting pallet details", result: null };
            res.send(obj);

        }
    },

    // receivePurchaseOrderV2: async function (req, res) {
    //     try {

    //         console.log("req.body>>>>>>>>>>>> 22222222222222> , " , req.body)

    //         let error = false ;
    //         let errorMessage = '' ; 
    //         let palletList = [] ;
    //         req.body.EvolveUser_ID = req.EvolveUser_ID;
    //         req.body.EvolveCompany_ID = req.EvolveCompany_ID;
    //         req.body.EvolveUnit_ID = req.EvolveUnit_ID;

    //         // let defaultQty = parseFloat(Evolve.Config.PODEFAULTQTY);

    //         // if(defaultQty  != null){
    //         //     if(req.body.EvolvePurchaseOrderDetail_QuantityReceived % defaultQty !=0 ){

    //         //         error = true
    //         //     }else{
    //         //         for(let i=0 ; i<req.body.EvolvePurchaseOrderDetail_QuantityReceived / defaultQty ; i++){
                        
    //                     palletList.push(
    //                         {
    //                             EvolvePurchaseOrderDetail_QuantityReceived  : req.body.EvolvePurchaseOrderDetail_QuantityReceived  ,
    //                         }
    //                     )
    //         //         }
    //         //     }

    //         // }else{
    //         //     palletList.push(
    //         //         {
    //         //             EvolvePurchaseOrderDetail_QuantityReceived  : req.body.EvolvePurchaseOrderDetail_QuantityReceived ,
    //         //         }
    //         //     )

    //         // }
            
    //         // if(error == true){
                
    //         //     errorMessage = "Enter Qty In Multiple of "+defaultQty ; 

    //         // }else{
    //             // if(error == false){

    //             let attr = [];
    //             for(let i=0 ; i< req.body.storedAttrName.length ; i++){
    //                 attr.push({

    //                     'key' :  req.body.storedAttrName[i] ,
    //                     'value' : req.body.storedAttrValue[i],
    //                 })
    //             }
    //             req.body.attr  = JSON.stringify(attr);
    //             req.body.EvolveInventory_Status  = 'HOLD'
    //             let getTransTypeID = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getTransTypeID('PO-RCPT');
    //             console.log("getTransTypeID????" ,  getTransTypeID)
    //             if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
    //             Evolve.Log.error(" EERR0014 :Error while get EvolveTranstype_ID ")
    //             error = true

    //             errorMessage = "Error while get EvolveTranstype_ID" ;
    //             }
    //             else {
    //                 req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
    //                 for(let i=0 ; i<palletList.length ; i++){
    //                     if(error == false){
    //                         req.body.EvolvePurchaseOrderDetail_QuantityReceived = palletList[i].EvolvePurchaseOrderDetail_QuantityReceived
    //                         let po_detail_id = req.body.EvolvePurchaseOrderDetail_ID;
    //                         let po_receive_qty = req.body.EvolvePurchaseOrderDetail_QuantityReceived;

    //                         let getNextSerial = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getNextSerial('PO_RECIEVE');

    //                         console.log("getNextSerial>>>>" ,  getNextSerial)
                         
    //                         if (getNextSerial instanceof Error || getNextSerial.rowsAffected < 1) {
                                
    //                             error = true

    //                             errorMessage = "Error while get EvolveTranstype_ID" ;
    //                         }else{
    //                         var str = "" + getNextSerial.recordset[0].EvolveSerial_Next;
    //                         var pad = "00000";
    //                         var sr_end = pad.substring(0, pad.length - str.length) + str; //0001
    //                         let sr_nbr = getNextSerial.recordset[0].EvolveSerial_Prefix + sr_end; 

                    
    //                             req.body.EvolveInventory_Refnumber = sr_nbr;

    //                             console.log("sr_nbr>>>>>" ,  sr_nbr)
                                
    //                             let add_inventory = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.receivePurchaseOrderV2(req.body);

    //                             console.log("add_inventory>>>>" , add_inventory)
    //                             if (add_inventory instanceof Error) {

    //                                 error = true

    //                                 Evolve.Log.error(" EERR0016 :Error while recieve po ")

    //                                 errorMessage = "Error while recieve po" ;
    //                             }
    //                             else {
    //                                 let update_poDetail = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updatePurchaseOrderV2(po_detail_id, po_receive_qty, req.body); // Update Purchase Order Receive QTY 
    //                                 if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

    //                                     error = true

    //                                     Evolve.Log.error(" EERR0017 :Error while update po details ")
            
    //                                     errorMessage = "Error while update po details" ;

    //                                 } else {
    //                                     // let ZplData =
    //                                     //     "^XA\r\n" +
    //                                     //     "^MMT^PW360\r\n" +
    //                                     //     "^LL0160^LS10\r\n" +
    //                                     //     "^FX\r\n" +
    //                                     //     "^BY2,2,100\r\n" +
    //                                     //     "^FO50,50^BC^FD" +
    //                                     //     req.body.EvolveInventory_Refnumber +
    //                                     //     "^FS\r\n" +
    //                                     //     "^CFA,14 \r\n" +

    //                                     //     "^XZ";

    //                                     let barcode =  req.body.EvolveInventory_Refnumber ;
    //                                     let  batchNo = req.body.EvolveInventory_CustLotRef;
    //                                     let expDate = req.body.EvolvePOTransExpriryDate;
                                
    //                                     let  batchNoArray = [];
                                        
                                
    //                                     if (batchNo != null && batchNo != '' && batchNo != undefined  ) {
                                            
    //                                         batchNoArray= batchNo.split(' ');
                                        
    //                                     }
                                
    //                                     var ZplData = "^XA\r\n^PW599"+
    //                                     "\r\n^LL0280"+
    //                                     "\r\n^LS0^LS0^FT30,265^BQN,3,6^FDMA,"+barcode+"^FS"
    //                                     let  strAlignSize  = 141;
    //                                     let  batch = '';
    //                                     if(batchNoArray.length != 0){
    //                                     for(let i = 0  ; i < batchNoArray.length ; i++){
    //                                         if((batch+batchNoArray[i]).length >= 20){
                                
    //                                             ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+batch+"^FS" ;
    //                                             strAlignSize += 48 ;
    //                                             batch = batchNoArray[i]+' ';
                                
    //                                         }else{
                                
    //                                             batch += batchNoArray[i]+' ';
    //                                         }
    //                                     }
    //                                     }
    //                                     if(batch.trim() != ''){
                                
                                
    //                                     ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+expDate+"^FS" ;
    //                                     strAlignSize += 48 ;
                                
                                        
    //                                     }
                                
    //                                     // ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,50,50^FH^FD"+custPart+"^FS";
                        
                                
    //                                     ZplData +=  "\r\n^FT189,93^A0N,25,25^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";



    //                                 let updateNextSerial = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updateNextSerial('PO_RECIEVE');
    //                                 if (updateNextSerial instanceof Error || updateNextSerial.rowsAffected < 1) {
                     

    //                                     error = true
    //                                     errorMessage = "Error While Update Next Serial Number" ;
    //                                 }else{
    //                                         Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint+'/'+req.body.EvolveInventory_Refnumber+'.txt',ZplData,function(err){
    //                                             if(err){
    //                                             Evolve.Log.error(" Error In Print Barcode ")
    //                                             } 
    //                                         })
    //                                 }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             // }
               
            
    //         // }

    //         if(error == false){

    //             let obj = { statusCode: 200, status: "success", message: "Purchase Ordder Recieved Successfully ", result: null };
    //             res.send(obj);
                

    //         }else{
                
    //         let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
    //         res.send(obj);
    //         }

    //     } catch (error) {
    //         Evolve.Log.error(" EERR0040: Error while recieving Purchase order "+error.message);

    //         let obj = { statusCode: 400, status: "fail", message: " EERR0040: Error while recieving Purchase order ", result: null };
    //         res.send(obj);
    //     }
    // },

    receivePurchaseOrderV2: async function (req, res) {
        try {

            // console.log("req.body>>>>>>>>>>>> 22222222222222> , " , req.body)

            let error = false ;
            let errorMessage = '' ; 
            let palletList = [] ;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            // let defaultQty = parseFloat(Evolve.Config.PODEFAULTQTY);

            // if(defaultQty  != null){
            //     if(req.body.EvolvePurchaseOrderDetail_QuantityReceived % defaultQty !=0 ){

            //         error = true
            //     }else{
            //         for(let i=0 ; i<req.body.EvolvePurchaseOrderDetail_QuantityReceived / defaultQty ; i++){
                        
                        palletList.push(
                            {
                                EvolvePurchaseOrderDetail_QuantityReceived  : req.body.EvolvePurchaseOrderDetail_QuantityReceived  ,
                            }
                        )
            //         }
            //     }

            // }else{
            //     palletList.push(
            //         {
            //             EvolvePurchaseOrderDetail_QuantityReceived  : req.body.EvolvePurchaseOrderDetail_QuantityReceived ,
            //         }
            //     )

            // }
            
            // if(error == true){
                
            //     errorMessage = "Enter Qty In Multiple of "+defaultQty ; 

            // }else{
                // if(error == false){
                
                // ------------------------------------
                let attr = [];
                for(let i=0 ; i< req.body.storedAttrName.length ; i++){
                    attr.push({

                        'key' :  req.body.storedAttrName[i] ,
                        'value' : req.body.storedAttrValue[i],
                    })
                }
                req.body.attr  = JSON.stringify(attr);
                req.body.EvolveInventory_Status  = 'HOLD'
                let getTransTypeID = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getTransTypeID('PO-RCPT');
                // console.log("getTransTypeID????" ,  getTransTypeID)
                if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                Evolve.Log.error(" EERR0014 :Error while get EvolveTranstype_ID ")
                error = true

                errorMessage = "Error while get EvolveTranstype_ID" ;
                }
                else {
                    req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                    for(let i=0 ; i<palletList.length ; i++){
                        if(error == false){
                            req.body.EvolvePurchaseOrderDetail_QuantityReceived = palletList[i].EvolvePurchaseOrderDetail_QuantityReceived
                            let po_detail_id = req.body.EvolvePurchaseOrderDetail_ID;
                            let po_receive_qty = req.body.EvolvePurchaseOrderDetail_QuantityReceived;

                            let getNextSerial = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getNextSerial('PO_RECIEVE');

                            // console.log("getNextSerial>>>>" ,  getNextSerial)
                         
                            if (getNextSerial instanceof Error || getNextSerial.rowsAffected < 1) {
                                
                                error = true

                                errorMessage = "Error while get EvolveTranstype_ID" ;
                            }else{
                            var str = "" + getNextSerial.recordset[0].EvolveSerial_Next;
                            var pad = "00000";
                            var sr_end = pad.substring(0, pad.length - str.length) + str; //0001
                            let sr_nbr = getNextSerial.recordset[0].EvolveSerial_Prefix + sr_end; 
                                
                    
                                req.body.EvolveInventory_Refnumber = sr_nbr;

                                // console.log("sr_nbr>>>>>" ,  sr_nbr)
                                
                                console.log("req.body in >===>>>>>>>>", req.body);
                                let getUnitCode = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getUnitCode(req.body.EvolveUnit_ID);
                                if (getUnitCode instanceof Error || getUnitCode.rowAffected < 1) {
                                    error = true

                                        Evolve.Log.error(" EERR#### :Erorr in get unit code while receiving po ")
    
                                        errorMessage = "Erorr in get unit code while receiving po" ;
                                }
                                else{

                                    let getLocationCode = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getLocationCode(req.body.EvolveLocation_ID);
                                    if (getLocationCode instanceof Error || getLocationCode.rowAffected < 1 ) {
                                        error = true

                                        Evolve.Log.error(" EERR#### :Erorr in get location code while receiving po ")
    
                                        errorMessage = "Erorr in get location code while receiving po" ;
                                    }
                                    else{
                                        req.body.EvolveLocation_Code = getLocationCode.recordset[0].EvolveLocation_Code;
                                        req.body.EvolveUnit_Code = getUnitCode.recordset[0].EvolveUnit_Code;
                                        let date = new Date();
                                        req.body.Effective_Date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate()
                                        // ('0' + x).slice(-2)
                                        let ShipDate = req.body.EvolvePOHead_ShipDate.split("-");
                                        let ReceiptDate = req.body.EvolvePOTransReceiptDate.split("-");
                                        req.body.ShipDate = ShipDate[2] + '-' + ShipDate[1] + '-' + ShipDate[0]
                                        req.body.ReceiptDate = ReceiptDate[2] + '-' + ReceiptDate[1] + '-' + ReceiptDate[0]
                                        let EvolvePO_Number = req.body.EvolveInventory_LotNumber.split("-");
                                        req.body.EvolvePO_Number = EvolvePO_Number[0];
                                        req.body.EvolvePO_LineNo = EvolvePO_Number[1];
                                        console.log("req.body in >===>>>>>>>>", req.body);

                                        // qxstand : start
                                        let xmlObj = {
                                            "soapenv:Envelope": {
                                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                                "soapenv:Header": {
                                                    "wsa:Action": "",
                                                    "wsa:To": "urn:services-qad-com:QADERP",
                                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                                    "wsa:ReferenceParameters": { "qcom:suppressResponseDetail": "true" },
                                                    "wsa:ReplyTo": { "wsa:Address": "urn:services-qad-com:" }
                                                },
                                                "soapenv:Body": {
                                                    "receivePurchaseOrder": {
                                                        "qcom:dsSessionContext": {
                                                            "qcom:ttContext": [
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "domain",
                                                                    "qcom:propertyValue": Evolve.EvolveIOConfig.DOAQXTENDDOAMIN
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "scopeTransaction",
                                                                    "qcom:propertyValue": "true"
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "version",
                                                                    "qcom:propertyValue": "ERP3_3"
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "mnemonicsRaw",
                                                                    "qcom:propertyValue": "false"
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "username",
                                                                    "qcom:propertyValue": Evolve.EvolveIOConfig.QADUSERNAME
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "password",
                                                                    "qcom:propertyValue": ""
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "action",
                                                                    "qcom:propertyValue": ""
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "entity",
                                                                    "qcom:propertyValue": Evolve.EvolveIOConfig.QADENTITY
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "email",
                                                                    "qcom:propertyValue": ""
                                                                },
                                                                {
                                                                    "qcom:propertyQualifier": "QAD",
                                                                    "qcom:propertyName": "emailLevel",
                                                                    "qcom:propertyValue": ""
                                                                }
                                                            ]
                                                        },
                                                        "dsPurchaseOrderReceive": {
                                                            "purchaseOrderReceive": {
                                                                "operation": "A",
                                                                "ordernum":req.body.EvolvePO_Number,
                                                                "psNbr":"",
                                                                "receivernbr":"",
                                                                "effDate":req.body.Effective_Date,
                                                                "move":"true",
                                                                "fillAll":"false",
                                                                "shipDate":req.body.ShipDate,
                                                                "receiptDate":req.body.ReceiptDate,
                                                                "yn":"true",
                                                                "yn1":"true",
                                                                "recalc":"false",
                                                                "yn1":"true",
                                                                "yn1":"true",
                                                                "yn1":"true",
                                                                "yn1":"true",
                                                                // "purchaseOrderReceiveTransComment": {
                                                                //     "operation": "A",
                                                                //     "cmtSeq": "",
                                                                //     "cdRef": "",
                                                                //     "cdType": "",
                                                                //     "cdLang": "us",
                                                                //     "cdSeq": "",
                                                                //     "cmtCmmt": "",
                                                                // },
                                                                "lineDetail":{
                                                                    "operation": "A",
                                                                    "line": req.body.EvolvePO_LineNo,
                                                                    "site": req.body.EvolveUnit_Code,
                                                                    "multiEntry": "true",
                                                                    "cmmtYn": "true",
                                                                    "receiptDetail":{
                                                                        "operation": "A",
                                                                        "location": req.body.EvolveLocation_Code,
                                                                        "lotserial": req.body.EvolveInventory_LotNumber,
                                                                        "lotref": req.body.EvolveInventory_Refnumber,
                                                                        "vendlot": req.body.EvolveInventory_CustLotRef,
                                                                        "lotserialQty": req.body.EvolvePurchaseOrderDetail_QuantityReceived,
                                                                        "serialsYn": "true",
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        var xmldoc = Evolve.Xmlbuilder.create(xmlObj, { version: '1.0', encoding: 'utf-8' })
                                        let xmlFileData = xmldoc.end({ pretty: true });
                                        console.log("xmlFileData>>>>>", xmlFileData)
                                        let config = {
                                            headers: {
                                                'Accept-Encoding': 'gzip, deflate',
                                                'Content-Type': 'text/xml;charset=UTF-8',
                                                'SOAPAction': "",
                                                'Host': Evolve.EvolveIOConfig.DOAHOST,
                                                'Connection': 'Keep - Alive',
                                                'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                                //'Content-Length': xmldoc.length 
                                            }
                                        }
            
            
                                        let responce = await Evolve.Axios.post(Evolve.EvolveIOConfig.DOAQXTENDURL, xmlFileData, config);
                                        Evolve.Xml2JS.parseString(responce.data, async function (err, resPonsedXml) {
                                            console.log("resPonsedXml>>>>>>", JSON.stringify(resPonsedXml));
                                            if (err) {
                                                
                                                console.log("err.>>>", err)
                                                console.log("issue in xml formate")
                                                Evolve.Log.error("Error while upload file to out folder" + err);

                                            } else {
                
                
                                                let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:receivePurchaseOrderResponse'][0]['ns1:result'][0];
                
                
                                                if (result == 'error') {
                                                    error = true
                                                    Evolve.Log.error("Error while submit po to ERP" + result);
                
                                                    // let updateSalesQuoteStatus = Evolve.App.Services.Doa.DoaServices.updateSalesQuoteStatus(dataObj);
                
                                                } else {
                                                    // qxstand : end
                                                    console.log("come success>>>>>>>>>>>>>>");

                                                    let add_inventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.receivePurchaseOrderV2(req.body);

                                                    console.log("add_inventory>>>>" , add_inventory)
                                                    if (add_inventory instanceof Error) {

                                                        error = true

                                                        Evolve.Log.error(" EERR0016 :Error while recieve po ")

                                                        errorMessage = "Error while recieve po" ;
                                                    }
                                                    else {
                                                        let update_poDetail = await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updatePurchaseOrderV2(po_detail_id, po_receive_qty, req.body); // Update Purchase Order Receive QTY 
                                                        
                                                        console.log("update_poDetail>>>>", update_poDetail);
                                                        if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

                                                            error = true

                                                            Evolve.Log.error(" EERR0017 :Error while update po details ")
                                
                                                            errorMessage = "Error while update po details" ;

                                                        } else {
                                                            // let ZplData =
                                                            //     "^XA\r\n" +
                                                            //     "^MMT^PW360\r\n" +
                                                            //     "^LL0160^LS10\r\n" +
                                                            //     "^FX\r\n" +
                                                            //     "^BY2,2,100\r\n" +
                                                            //     "^FO50,50^BC^FD" +
                                                            //     req.body.EvolveInventory_Refnumber +
                                                            //     "^FS\r\n" +
                                                            //     "^CFA,14 \r\n" +

                                                            //     "^XZ";

                                                            let barcode =  req.body.EvolveInventory_Refnumber ;
                                                            let  batchNo = req.body.EvolveInventory_CustLotRef;
                                                            let expDate = req.body.EvolvePOTransExpriryDate;
                                                    
                                                            let  batchNoArray = [];
                                                            
                                                    
                                                            if (batchNo != null && batchNo != '' && batchNo != undefined  ) {
                                                                
                                                                batchNoArray= batchNo.split(' ');
                                                            
                                                            }
                                                    
                                                            var ZplData = "^XA\r\n^PW599"+
                                                            "\r\n^LL0280"+
                                                            "\r\n^LS0^LS0^FT30,265^BQN,3,6^FDMA,"+barcode+"^FS"
                                                            let  strAlignSize  = 141;
                                                            let  batch = '';
                                                            if(batchNoArray.length != 0){
                                                            for(let i = 0  ; i < batchNoArray.length ; i++){
                                                                if((batch+batchNoArray[i]).length >= 20){
                                                    
                                                                    ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+batch+"^FS" ;
                                                                    strAlignSize += 48 ;
                                                                    batch = batchNoArray[i]+' ';
                                                    
                                                                }else{
                                                    
                                                                    batch += batchNoArray[i]+' ';
                                                                }
                                                            }
                                                            }
                                                            if(batch.trim() != ''){
                                                    
                                                    
                                                            ZplData += "\r\n^FT189,"+strAlignSize+"^A0N,40,40^FH^FD"+expDate+"^FS" ;
                                                            strAlignSize += 48 ;
                                                    
                                                            
                                                            }
                                                    
                                                            // ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,50,50^FH^FD"+custPart+"^FS";
                                            
                                                    
                                                            ZplData +=  "\r\n^FT189,93^A0N,25,25^FH^FD"+barcode+"^FS^PQ1,0,1,Y^XZ";



                                                        let updateNextSerial = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updateNextSerial('PO_RECIEVE');
                                                        console.log("updateNextSerial>>>>>", updateNextSerial);
                                                        if (updateNextSerial instanceof Error || updateNextSerial.rowsAffected < 1) {
                                        

                                                            error = true
                                                            errorMessage = "Error While Update Next Serial Number" ;
                                                        }else{
                                                                Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint+'/'+req.body.EvolveInventory_Refnumber+'.txt',ZplData,function(err){
                                                                    if(err){
                                                                    Evolve.Log.error(" Error In Print Barcode ")
                                                                    } 
                                                                })
                                                        }
                                                        }
                                                    }
                
                                                }
                
                                                // }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                    }
                }


                // -------------------------
                // }
               
            
            // }
            if(error == false){
                
                let obj = { statusCode: 200, status: "success", message: "Purchase Ordder Recieved Successfully ", result: null };
                res.send(obj);
                

            }else{
                
                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0040: Error while recieving Purchase order "+error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR0040: Error while recieving Purchase order ", result: null };
            res.send(obj);
        }
    },

    printPallet: async function (req, res) {
        try {
            let ZplData =
                "^XA\r\n" +
                "^MMT^PW360\r\n" +
                "^LL0160^LS10\r\n" +
                "^FX\r\n" +
                "^BY2,2,100\r\n" +
                "^FO50,50^BC^FD" +
                req.body.EvolveInventory_RefNumber +
                "^FS\r\n" +
                "^CFA,14 \r\n" +

                "^XZ";
                Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint+'/'+req.body.EvolveInventory_Refnumber+'.txt',ZplData,function(err){
                    if(err){
                      let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                      res.send(obj);
                    } else {
                      let obj = { statusCode: 200, status: "success", message: "Barcode Printed Successfully", result: null };
                      res.send(obj);
                    }
                })
        } catch (error) {
            Evolve.Log.error(" EERR0042: Error while printing pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0042: Error while printing pallet ", result: null };
            res.send(obj);
        }
    },

    getPalletCount: async function (req, res) {
        try {
            let condition = ' WHERE ';

            let first = true;

            for (let i = 0; i < req.body.searchPallet.length; i++) {
                if (first == true) {
                    condition += " (EvolveInventory_LotNumber LIKE '" + req.body.searchPallet[i].EvolveInventory_LotNumber + "' AND " + " EvolveItem_ID='" + req.body.searchPallet[i].EvolveItem_ID + "' )";

                    first = false;

                }
                else {

                    condition += " OR  (EvolveInventory_LotNumber LIKE '" + req.body.searchPallet[i].EvolveInventory_LotNumber + "' AND " + " EvolveItem_ID='" + req.body.searchPallet[i].EvolveItem_ID + "')";
                }
            }

            let palletCount = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPalletCount(condition);
            if (palletCount instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while getting total pallets !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet List", result: palletCount.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0043: Error while getting Pallet Count "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0043: Error while getting Pallet Count ", result: null };
            res.send(obj);

        }
    },

    getSummary: async function (req, res) {
        try {
            req.body.EvolveInventory_LotNumber = req.body.EvolveInventory_LotNumber.trim()
            let summary = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getSummary(req.body);
            if (summary instanceof Error) {
                 Evolve.Log.error(" EERR0977 : Error while get summary ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0977 : Error while get summary ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Summary", result: summary.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0044: Error while getting summary "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0044: Error while getting summary", result: null };
            res.send(obj);


        }
    },

    updateSinglePalletData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let palletData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getpoDetailId(req.body);
            if (palletData instanceof Error) {
               Evolve.Log.error("EERR0027 : Error while get pallet id ")
              let obj = { statusCode: 400, status: "fail", message: "EERR0027 : Error while get pallet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let updateInventory = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updateInventory(req.body);
                if (updateInventory instanceof Error) {
                    Evolve.Log.error("EERR0028 : Error while update inventory ")

                    let obj = { statusCode: 400, status: "fail", message: "EERR0028 : Error while update inventory", result: null };
                    res.send(obj);
                }
                else {
                    let updatePoTrans = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updatePalletPoTrans(req.body);
                    if (updatePoTrans instanceof Error) {
                         Evolve.Log.error("EERR0029 : Error while update pallet detail ")

                        let obj = { statusCode: 400, status: "fail", message: "EERR0029 : Error while update pallet detail ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updatePoDetails(req.body);
                        if (updatePoDetails instanceof Error) {
                            Evolve.Log.error("EERR0030 : Error while update po detail ")

                            let obj = { statusCode: 400, status: "fail", message: "EERR0030 : Error while update po detail", result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: "Pallet updated successfully ", result: palletData.recordsets[0] };
                            res.send(obj);
                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0045: Error while updating single pallet data"+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0045: Error while updating single pallet data", result: null };
            res.send(obj);
        }
    },

    deletePallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("body  data >>>" ,  req.body)
            let palletData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getpoDetailId(req.body);
            console.log("palletData>>>>" ,  palletData)
            if (palletData instanceof Error) {
                Evolve.Log.error(" EERR0031 : Error while get palet id ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0031 : Error while get palet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let deletePallet = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.deletePallet(req.body);

                if (deletePallet instanceof Error || deletePallet.rowsAffected < 1) {
                    Evolve.Log.error("EERR0032 : Error while delete pallet ")

                    let obj = { statusCode: 400, status: "fail", message: " EERR0032 : Error while delete pallet ", result: null };
                    res.send(obj);
                }
                else {

                    let deletePoTrans = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.deletePoTrans(req.body);

                    if (deletePoTrans instanceof Error || deletePoTrans.rowsAffected < 1) {
                         Evolve.Log.error(" EERR0033 : Error while delete po transaction ")
                          let obj = { statusCode: 400, status: "fail", message: " ERR0033 : Error while delete po transaction ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoQty = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.updatePoQty(req.body);

                        if (updatePoQty instanceof Error || updatePoQty.rowsAffected < 1) {
                            Evolve.Log.error(" EERR0034 : Error while update po qty ")

                            let obj = { statusCode: 400, status: "fail", message: " EERR0034 : Error while update po qty ", result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: "Pallet deleted successfully ", result: palletData.recordsets[0] };
                            res.send(obj);

                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0978: Error while deleting pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0978: Error while deleting pallet"+error.message, result: null };
            res.send(obj);

        }
    },

    getPoByGateNumber: async function (req, res) {
        try {


            let poData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPoByGateNumber(req.body);
            if (poData instanceof Error) {
               Evolve.Log.error("EERR0020 : Error while get po by gate Number")

                let obj = { statusCode: 400, status: "fail", message: "EERR0020 : Error while get po by gate Number", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po data", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0046: Error while getting po by gate Number "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0046: Error while getting po by gate Number", result: null };
            res.send(obj);

        }
    },
    getPodetailsbyGate: async function (req, res) {
        try {
            let poData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPodetailsbyGate(req.body.EvolvePurchaseOrder_Number);
            if (poData instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "error while getting po data !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po list", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0047: Error while getting po details by gate "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0047: Error while getting po details by gate", result: null };
            res.send(obj);

        }
    },

    getUnpostedTransaction: async function (req, res) {
        try {

            let tranData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getUnpostedTransaction(req.body);
            if (tranData instanceof Error) {
                Evolve.Log.error("EERR0022 : Erro while get unposted transactions")

                let obj = { statusCode: 400, status: "fail", message: "EERR0022 : Erro while get unposted transactions", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted transactions", result: tranData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0048: Error while getting unposted transaction  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0048: Error while getting unposted transaction", result: null };
            res.send(obj);

        }
    },
    getPreviosdatTranCount: async function (req, res) {
        try {

            let count = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPreviosdatTranCount();
            if (count instanceof Error) {
                Evolve.Log.error(" EERR0026 : Error while get  previous unposted transactions count ")
                 let obj = { statusCode: 400, status: "fail", message: " EERR0026 : Error while get  previous unposted transactions count   ", result: null };
                res.send(obj);
            } else {

                let obj = { statusCode: 200, status: "success", message: "count", result: count.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0050: Error while getting previous transaction count "+error.message)
            let obj = { statusCode: 400, status: "fail", message: "EERR0050: Error while getting previous transaction count ", result: null };
            res.send(obj);

        }
    },
    closePO: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID; 
            let closePo = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.closePO(req.body);
            if (closePo instanceof Error || closePo.rowsAffected<1) {
               Evolve.Log.error(" EERR0019 : Error while closing po ")

                let obj = { statusCode: 400, status: "fail", message: "EERR0019 : Error while closing po", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Purchase order closed successfully", result: closePo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0051: Error while closing po "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0051: Error while closing po ", result: null };
            res.send(obj);

        }
    },
    getUnpostedPoList: async function (req, res) {
        try {
            let poList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getUnpostedPoList(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error(" EERR0004 : Error while getting unposted po list ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0004 : Error while get unposted po list ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted Po ", result: poList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0052: Error while getting unposted po list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0052: Error while getting unposted po list", result: null };
            res.send(obj);

        }
    },
    getPoLineList: async function (req, res) {
        try {
            let lineList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getPoLineList(req.body.EvolvePurchaseOrder_ID);
            if (lineList instanceof Error) {
                Evolve.Log.error(" EERR0005 : Error while get unposted lines for po ")
                let obj = { statusCode: 400, status: "fail", message: "EERR0005 : Error while get unposted lines for po ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Po lines", result: lineList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0052: Error while getting unposted po list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0052: Error while getting unposted po list ", result: null };
            res.send(obj);

        }
    },
    printAllPallets: async function (req, res) {
        try {
            let error = false;
            for(let i=0 ; i<req.body.printArray.length ;i++){
                if(error == false){        
                    let barcode = req.body.printArray[i].EvolveInventory_RefNumber;
                    
                    let ZplData =
                        "^XA\r\n" +
                        "^MMT^PW360\r\n" +
                        "^LL0160^LS10\r\n" +
                        "^FX\r\n" +
                        "^BY2,2,100\r\n" +
                        "^FO50,50^BC^FD" +
                        barcode +
                        "^FS\r\n" +
                        "^CFA,14 \r\n" +
                        "^XZ";
                        Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint+'/'+barcode+'.txt',ZplData,function(err){
                            if(err){
                                error = true
                            }
                        })       
                    }
                    if(error == true){
                        let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                        res.send(obj);

                    }else{
                        let obj = { statusCode: 200, status: "success", message: "Barcodes Printed Successfully", result: null };
                        res.send(obj);

                    }




           }
           if(error == true){
            Evolve.Log.error("EERR3223 : Error while print all pallets ")

            let obj = { statusCode: 200, status: "success", message: "EERR3223 : Error while print all pallets", result: lineList.recordset };
            res.send(obj);

           }else{
            let obj = {
            statusCode: 200,
            status: "success",
            message: "Barcodes printed",
            result: null
            };
            res.send(obj);

           }
        } catch (error) {
            Evolve.Log.error("EERR2628: Error while print all pallets"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2628: Error while print all pallets", result: null };
            res.send(obj);
        }
    },
    checkPoStatus: async function (req, res) {
        try {
            let status = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.checkPoStatus(req.body.EvolvePurchaseOrder_ID);
            if (status instanceof Error) {
                Evolve.Log.error("EERR2629: Error while check po status "+error.message)
                let obj = { statusCode: 400, status: "fail", message: "EERR2629 : Error while check po status", result: null };
                res.send(obj);
            } else if(status.recordset[0].EvolvePurchaseOrder_Status != 'open') {
                let obj = { statusCode: 400, status: "fail", message: " Po closed already please refresh the screen", result: null };
                res.send(obj);
            }else{
                let obj = { statusCode: 200, status: "success", message: "Po is open", result: null };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("EERR2630 : Error while check po status "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2630 : Error while check po status ", result: null };
            res.send(obj);

        }
    },

    onWeightCapture : async function (req, res) {
        try{
            let apiUrl = 'http://192.168.1.249:5141/?weight'
            let response = await Evolve.Axios.post(apiUrl);
            if (response.status == 200) {
                console.log("data>>>>", response.data);
                let obj = { statusCode: 200, status: "success", message: "Weight Captured Successfully ", result: response.data };
                res.send(obj);
            }
            else{
                let obj = { statusCode: 400, status: "fail", message: "EER####: Error On Weight Capture ", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####: Error On Weight Capture ");
            let obj = { statusCode: 400, status: "fail", message: "EER####: Error On Weight Capture ", result: null };
        res.send(obj);
        }
    },

      /*** Serial Number Generate : START */
    getSerialNumber: async function (code) {
        try {
        let SerialDetails = await Evolve.App.Services.Common.SrvCommon.getSerialDetails(code);
        if (SerialDetails instanceof Error || SerialDetails.rowsAffected < 1) {
            Evolve.Log.error(" EERR0003 : Serial Details Not Found! ")
            return 0;
        } else {

            let SerialNumber = await Evolve.App.Services.Common.SrvCommon.getSerialNumber(code);
            if (SerialNumber instanceof Error || SerialNumber.rowsAffected < 1) {
            Evolve.Log.error(" EERR0002 : Serial Number Not Created ")
            return 0;
            } else {

            let incNumber = SerialNumber.recordset[0].inserted_id;
            let width = SerialDetails.recordset[0].EvolveSerial_Width; // Width of Serial Number
            
            incNumber = incNumber + '';
            let newSerialNumber = incNumber.length >= width ? incNumber : new Array(width - incNumber.length + 1).join(0) + incNumber;

            if (code == 'PALLET') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'PORECIEVEPALLET') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'WOSSEQUENCE') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'PICKLISTNUMBER') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'WOSORDERID') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'QCORDER') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            if (code == 'QCNCR') {
                newSerialNumber = SerialDetails.recordset[0].EvolveSerial_Prefix + newSerialNumber
            }
            return newSerialNumber;
            }
        }



        } catch (error) {
        Evolve.Log.error(' EERR0001: When Serial Number Not Found ' + error.message);
        return 0;
        }
    },
  /*** Serial Number Generate  : END  */

    addInvTransHistory: async function (data) {
        let getTransType_ID = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.getTransTypeID(data.EvolveTranstype_code);
        if (getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1) {
        Evolve.Log.error(getTransType_ID.message);
        Evolve.Log.error(" EERR0077: Transaction type not found for " + data.EvolveTranstype_Code)
        return getTransType_ID;
        }
        else {
        data.EvolveTransType_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
        return await await Evolve.App.Services.Wms.PurchaseOrder.SrvV3.addInvTransHistory(data);
        }
    },

    onWeightCapture : async function (req, res) {
        try{
            let apiUrl = 'http://192.168.1.249:5141/?weight'
            let response = await Evolve.Axios.post(apiUrl);
            if (response.status == 200) {
                console.log("data>>>>", response.data.Weight);
                let obj = { statusCode: 200, status: "success", message: "Weight Captured Successfully ", result: response.data.Weight };
                res.send(obj);
            }
            else{
                let obj = { statusCode: 400, status: "fail", message: "EER####: Error On Weight Capture ", result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EER####: Error On Weight Capture ");
            let obj = { statusCode: 400, status: "fail", message: "EER####: Error On Weight Capture ", result: null };
        res.send(obj);
        }
    },

}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}