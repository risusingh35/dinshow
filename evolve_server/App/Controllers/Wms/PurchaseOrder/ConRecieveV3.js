'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    // PO RECIEVE V2

    getLocationList: async function (req, res) {
        try {

            let locationList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getLocationList();
            if (locationList instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get location list ")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get location list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting location list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting location list " + error.message, result: null };
            res.send(obj);
        }
    },

    getpoNumberList: async function (req, res) {
        try {

            let poNumberList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getpoNumberList();
            if (poNumberList instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get PO Number list ")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get PO Number list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "PO Number List", result: poNumberList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting PO Number list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting PO Number list " + error.message, result: null };
            res.send(obj);
        }
    },

    getPodetails: async function (req, res) {
        try {
            req.body.EvolveUnit_ID = req.EvolveUnit_ID
            let poDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPodetails(req.body);
            if (poDetails instanceof Error) {
                Evolve.Log.error(" EERR#### : Error Get Po Details ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error Get Po Details ", result: null };
                res.send(obj);
            } else if (poDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Po Details Found", result: [] };
                res.send(obj);
            }
            else {
                
                poDetails.recordset = poDetails.recordset.map(v => {

                    if (v.EvolvePurchaseOrderDetails_Type == 'M') {

                        v.EvolveItem_Part = v.EvolvePurchaseOrderDetails_MemoItem;
                    }
                    return v
                })
                let obj = { statusCode: 200, status: "success", message: "Line details", result: poDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Po details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR####: Error while getting Po details', result: null };
            res.send(obj);
        }
    },


    getAsnDetails: async function (req, res) {
        try {
            let poDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getAsnDetails(req.body);
            if (poDetails instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get line details ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get line details ", result: null };
                res.send(obj);
            } else if (poDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No details Found", result: [] };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Line details", result: poDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Po details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR####: Error while getting Po details', result: null };
            res.send(obj);
        }
    },

    getGateDetails: async function (req, res) {
        try {
            let poDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getGateDetails(req.body);
            if (poDetails instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get line details ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get line details ", result: null };
                res.send(obj);
            } else if (poDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No details Found", result: [] };
                res.send(obj);
            } else {
                if(poDetails.recordset[0].EvolveGate_ModuleType == "PO") {
                    let getGateEntryByPo = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getGateEntryByPo(req.body);
                    if(getGateEntryByPo instanceof Error) {
                        Evolve.Log.error(" EERR#### : Error while get line details ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get line details ", result: null };
                res.send(obj);
                    }else if(getGateEntryByPo.rowAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "No details Found", result: [] };
                res.send(obj);
                    }else{
                        let obj = { statusCode: 200, status: "success", message: "Line details", result: getGateEntryByPo.recordset };
                res.send(obj);
                    }
                }else{
                    let obj = { statusCode: 200, status: "success", message: "Line details", result: poDetails.recordset };
                res.send(obj);
                }
                
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Gate Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR####: Error while getting Gate Details', result: null };
            res.send(obj);
        }
    },

    poNumberData: async function (req, res) {
        try {
            let poDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.poNumberData(req.body);
            if (poDetails instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get PO Number Details ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get PO Number Details ", result: null };
                res.send(obj);
            } else if (poDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No details Found", result: [] };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "PO Number Details", result: poDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting PO Number Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR####: Error while getting PO Number Details', result: null };
            res.send(obj);
        }
    },

    getSuppliersList: async function (req, res) {
        try {
            let suppliers = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getSuppliersList(req.body);
            if (suppliers instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get supplier list")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get supplier list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "supplier list", result: suppliers.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting supplier list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting supplier list " + error.message, result: null };
            res.send(obj);
        }
    },



    recievePurchaseOrder: async function (req, res) {
        try {
            console.log("req.body1>>>>>>>>>>>>>>>>.", req.body);
            let error = false;
            let errorMessage = '';

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.EvolvePurchaseOrderRcpt_SerialNo = Evolve.Generator.generate("PLT");


            let url = 'http://103.207.171.202:8021/sap/opu/odata/sap/ZOP_API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader';
            let config = {};
            let responce = "";
            let csrfToken = "";

            let enbTok = 1;
            let BF = 1;

            if (req.body.EvolvePurchaseOrder_Number == '4500000109') {

                // /*
                if (enbTok == 1) {
                    config = {
                        headers: {
                            'x-csrf-token': 'fetch',
                            // 'Authorization': 'Basic QUxJVEVSOndlbGNvbWUxMjM=' 
                            // 'Cookie': 'SAP_SESSIONID_CFN_800=Xn_AS-K7MxQ7Y4DBc-6NudAy2M9tOxHsnAJ0hnrSAOU%3d; path=/',
                            'User-Agent': 'PostmanRuntime/7.28.4',
                            'Accept': '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Connection': 'keep-alive',
                        },
                        auth: {
                            username: 'ALITER',
                            password: 'welcome123'
                        }
                    }

                    responce = await Evolve.Axios.get(url, config);

                    // console.log("responce GET >>>>", responce) 
                    // console.log("responce GET >>>>", responce.headers)
                    // console.log("responce GET >>>>", responce.headers['x-csrf-token'])

                    csrfToken = responce.headers['x-csrf-token'];

                }

                let Cookie = responce.headers['set-cookie'][2];

                // console.log("Cokkieeess>>>>" ,   responce.headers['set-cookie'][2])

                // console.log('responce????' ,  responce.headers['set-cookie'][2])

                // console.log("csrfToken???" ,  responce.headers.set-cookie)

                // */




                if (BF == 1) {

                    config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-csrf-token': csrfToken, // 'zdTlznybwzWKj7vObCj8bw==',
                            'Cookie': Cookie,

                            'User-Agent': 'PostmanRuntime/7.28.4',
                            'Accept': 'application/json',
                            // 'Accept-Encoding': 'gzip, deflate, br',
                            'Connection': 'keep-alive',


                        },
                        // auth: {
                        // username: 'ALITER',
                        // password: 'welcome123'
                        //   }
                    }

                    let data = {
                        "PostingDate": "2021-09-29T00:00:00.000",
                        "MaterialDocumentHeaderText": "ravat",
                        "GoodsMovementCode": "01",
                        "to_MaterialDocumentItem": {
                            "results": [
                                {
                                    "Material": "RM18",
                                    "Plant": "1710",
                                    "PurchaseOrder": req.body.EvolvePurchaseOrder_Number,
                                    "PurchaseOrderItem": req.body.EvolveItem_Part,
                                    "GoodsMovementType": "101",
                                    "QuantityInBaseUnit": req.body.EvolvePurchaseOrderRcpt_Qty,
                                    "EntryUnit": "PC"
                                }
                            ]
                        }
                    }

                    // console.log("DATA >>>" ,  data)


                    // console.log("config ::::::::::::::::::;", config);
                    // console.log("Data ::::::::::::::::::;", data);
                    // console.log("results ::::::::::::::::::;", data.to_MaterialDocumentItemresults.results);

                    responce = await Evolve.Axios.post(url, data, config);

                    // console.log("Entered after qexten>>>>>>>>>>>>")
                    // console.log("responce>>>>", responce)
                    // console.log("MaterialDocument >>>>", responce.data.d.MaterialDocument)

                    req.body.EvolvePurchaseOrderRcpt_SerialNo = responce.data.d.MaterialDocument + '';

                }
            }



            if (req.body.EvolvePurchaseOrderRcpt_SerialNo == undefined || req.body.EvolvePurchaseOrderRcpt_SerialNo.length == 0) {
                Evolve.Log.error(" EERR0015 :Error while assign pallet number ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0015 :Error while assign pallet number ", result: null };
                res.send(obj);
            } else {

                req.body.EvolvePurchaseOrderRcpt_SerialNo = (req.body.EvolvePurchaseOrderRcpt_SerialNo.toString()).replace(/ -/g, '')
                req.body.EvolvePurchaseOrderRcpt_SerialNo = req.body.EvolvePurchaseOrderRcpt_SerialNo.split(" ").join("");

                // req.body.EvolvePurchaseOrderRcpt_SerialNo = (req.body.EvolvePurchaseOrderRcpt_SerialNo.toString()).replace(/ -/g, '')

                console.log("req.body2>>>>>>>>>>>>>>>>.", req.body);


                let zplString = `^XA 
                ^MD50 
                ^CF0,25
                ^FO50,50^FDLot Reference     :   ${req.body.EvolvePurchaseOrderRcpt_SerialNo}           ^FS 
                ^FO50,85^FDLot Batch           : ${req.body.EvolvePurchaseOrderRcpt_LotSerialNo}             ^FS
                ^FO50,120^FDItem Code          : ${req.body.EvolveItem_Part}         ^FS
                ^FO50,155^FDItem UOM          :  ${req.body.EvolveUom_Uom}        ^FS
                ^FO50,190^FDItem Discription. :  ${req.body.EvolveItem_Desc1}         ^FS
                ^FO375,30^BQ,5,5^FDQA,${req.body.EvolvePurchaseOrderRcpt_SerialNo}^FS
                
                
                ^XZ`

                console.log("zplString>????" , zplString)


                // if(Evolve.Config.PORECEIVELABEL == undefined || Evolve.Config.PORECEIVELABEL == null || Evolve.Config.PORECEIVELABEL == 'null') {


                    
                    // let getStickerId = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getStickerId(Evolve.Config.PORECEIVELABEL);
                    //     if(getStickerId instanceof Error || getStickerId.rowsAffected < 1) {

                    //     }else {
                    //         req.body.EvolveSticker_ID = getStickerId.recordset[0].EvolveSticker_ID;
                    //         let getZplCodeForLabel = await Evolve.App.Controllers.Common.ConCommon.getZplCode(req.body);
                    //         console.log("getZplCodeForLabel:::::::::::::;",getZplCodeForLabel);
                    //         if(getZplCodeForLabel instanceof Error) {

                    //         }else{
                    //             let doc = {
                    //                 EvolvePrintProcess_Data: getZplCodeForLabel,
                    //                 EvolvePrintProcess_CreatedAt : new Date(),
                    //                 EvolvePrintProcess_CreatedUser : 1,
                    //                 EvolvePrintProcess_UpdatedAt : new Date(),
                    //                 EvolvePrintProcess_UpdatedUser : 1,
                    //                 EvolvePrintProcess_Status: 0,
                    //                 EvolvePrinter_ID : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                    //                 EvolvePrinter_Code : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                    //                 EvolvePrintProcess_ErrorCode : '',
                    //                 EvolvePrintProcess_ErrorMessage : ''
                    //               }
                    //               let result = await Evolve.Mongo.collection('EvolvePrintDetails').insertOne(doc);
                    
                    //               if(result.result.ok == 1) {
                    //                 let objForPrinter = {
                    //                     EvolvePrintProcess_ID: result.insertedId,
                    //                     EvolvePrintProcess_Data: getZplCodeForLabel,
                    //                     EvolvePrinter_Name: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Name,
                    //                     EvolvePrinter_Code: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                    //                     EvolvePrinter_ID: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                    //                     EvolvePrinter_IP: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_IP,
                    //                     EvolvePrinter_Port: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Port,
                    //                     EvolvePrinter_pcName: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_pcName,
                    //                     EvolvePrinter_Type: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Type,
                    //                     EvolvePrinter_SubType: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_SubType,
                    //                     EvolvePrinter_Copy : 1
                    //                 }
                    //                 Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.push(objForPrinter);
                    //             }
                    //         }
                    //     }
                // }
                let addPoRcpt = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.addPoRcptDetails(req.body);
                
                if (addPoRcpt instanceof Error) {

                    error = true

                    Evolve.Log.error(" EERR#### :Error while add po rcpt details ")

                    errorMessage = "Error while recieve po";
                }
                else {
                    let update_poDetail = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePoDetails(req.body); // Update Purchase Order Receive QTY 
                    if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

                        error = true

                        Evolve.Log.error(" EERR#### :Error while update po details ")

                        errorMessage = "Error while update po details";

                    }
                }
            }

            if (!error) {

                let obj = { statusCode: 200, status: "success", message: "Purchase Ordder Recieved Successfully ", result: null };
                res.send(obj);


            } else {

                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }




        } catch (error) {

            // console.log("error???" , error)
            Evolve.Log.error(" EERR####: Error while recieving Purchase order " + error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while recieving Purchase order ", result: null };
            res.send(obj);
        }
    },

    purchaseOrderRecieve1: async function (req, res) {
        try {
            console.log("req.body1>>>>>>>>>>>>>>>>.", req.body);
            let error = false;
            let errorMessage = '';

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            req.body.EvolvePurchaseOrderRcpt_SerialNo = Evolve.Generator.generate("PLT");


            let url = 'http://103.207.171.202:8021/sap/opu/odata/sap/ZOP_API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader';
            let config = {};
            let responce = "";
            let csrfToken = "";

            let enbTok = 1;
            let BF = 1;

            if (req.body.EvolvePurchaseOrder_Number == '4500000109') {

                // /*
                if (enbTok == 1) {
                    config = {
                        headers: {
                            'x-csrf-token': 'fetch',
                            // 'Authorization': 'Basic QUxJVEVSOndlbGNvbWUxMjM=' 
                            // 'Cookie': 'SAP_SESSIONID_CFN_800=Xn_AS-K7MxQ7Y4DBc-6NudAy2M9tOxHsnAJ0hnrSAOU%3d; path=/',
                            'User-Agent': 'PostmanRuntime/7.28.4',
                            'Accept': '*/*',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Connection': 'keep-alive',
                        },
                        auth: {
                            username: 'ALITER',
                            password: 'welcome123'
                        }
                    }

                    responce = await Evolve.Axios.get(url, config);

                    // console.log("responce GET >>>>", responce) 
                    // console.log("responce GET >>>>", responce.headers)
                    // console.log("responce GET >>>>", responce.headers['x-csrf-token'])

                    csrfToken = responce.headers['x-csrf-token'];

                }

                let Cookie = responce.headers['set-cookie'][2];

                // console.log("Cokkieeess>>>>" ,   responce.headers['set-cookie'][2])

                // console.log('responce????' ,  responce.headers['set-cookie'][2])

                // console.log("csrfToken???" ,  responce.headers.set-cookie)

                // */




                if (BF == 1) {

                    config = {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-csrf-token': csrfToken, // 'zdTlznybwzWKj7vObCj8bw==',
                            'Cookie': Cookie,

                            'User-Agent': 'PostmanRuntime/7.28.4',
                            'Accept': 'application/json',
                            // 'Accept-Encoding': 'gzip, deflate, br',
                            'Connection': 'keep-alive',


                        },
                        // auth: {
                        // username: 'ALITER',
                        // password: 'welcome123'
                        //   }
                    }

                    let data = {
                        "PostingDate": "2021-09-29T00:00:00.000",
                        "MaterialDocumentHeaderText": "ravat",
                        "GoodsMovementCode": "01",
                        "to_MaterialDocumentItem": {
                            "results": [
                                {
                                    "Material": "RM18",
                                    "Plant": "1710",
                                    "PurchaseOrder": req.body.EvolvePurchaseOrder_Number,
                                    "PurchaseOrderItem": req.body.EvolveItem_Part,
                                    "GoodsMovementType": "101",
                                    "QuantityInBaseUnit": req.body.EvolvePurchaseOrderRcpt_Qty,
                                    "EntryUnit": "PC"
                                }
                            ]
                        }
                    }

                    // console.log("DATA >>>" ,  data)


                    // console.log("config ::::::::::::::::::;", config);
                    // console.log("Data ::::::::::::::::::;", data);
                    // console.log("results ::::::::::::::::::;", data.to_MaterialDocumentItemresults.results);

                    responce = await Evolve.Axios.post(url, data, config);

                    // console.log("Entered after qexten>>>>>>>>>>>>")
                    // console.log("responce>>>>", responce)
                    // console.log("MaterialDocument >>>>", responce.data.d.MaterialDocument)

                    req.body.EvolvePurchaseOrderRcpt_SerialNo = responce.data.d.MaterialDocument + '';

                }
            }



            if (req.body.EvolvePurchaseOrderRcpt_SerialNo == undefined || req.body.EvolvePurchaseOrderRcpt_SerialNo.length == 0) {
                Evolve.Log.error(" EERR0015 :Error while assign pallet number ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0015 :Error while assign pallet number ", result: null };
                res.send(obj);
            } else {

                req.body.EvolvePurchaseOrderRcpt_SerialNo = (req.body.EvolvePurchaseOrderRcpt_SerialNo.toString()).replace(/ -/g, '')
                req.body.EvolvePurchaseOrderRcpt_SerialNo = req.body.EvolvePurchaseOrderRcpt_SerialNo.split(" ").join("");

                // req.body.EvolvePurchaseOrderRcpt_SerialNo = (req.body.EvolvePurchaseOrderRcpt_SerialNo.toString()).replace(/ -/g, '')

                console.log("req.body2>>>>>>>>>>>>>>>>.", req.body);

                if(Evolve.Config.PORECEIVELABEL == undefined || Evolve.Config.PORECEIVELABEL == null || Evolve.Config.PORECEIVELABEL == 'null') {
                    let getStickerId = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getStickerId(Evolve.Config.PORECEIVELABEL);
                        if(getStickerId instanceof Error || getStickerId.rowsAffected < 1) {

                        }else {
                            req.body.EvolveSticker_ID = getStickerId.recordset[0].EvolveSticker_ID;
                            let getZplCodeForLabel = await Evolve.App.Controllers.Common.ConCommon.getZplCode(req.body);
                            console.log("getZplCodeForLabel:::::::::::::;",getZplCodeForLabel);
                            if(getZplCodeForLabel instanceof Error) {

                            }else{
                                let doc = {
                                    EvolvePrintProcess_Data: getZplCodeForLabel,
                                    EvolvePrintProcess_CreatedAt : new Date(),
                                    EvolvePrintProcess_CreatedUser : 1,
                                    EvolvePrintProcess_UpdatedAt : new Date(),
                                    EvolvePrintProcess_UpdatedUser : 1,
                                    EvolvePrintProcess_Status: 0,
                                    EvolvePrinter_ID : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                                    EvolvePrinter_Code : Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                                    EvolvePrintProcess_ErrorCode : '',
                                    EvolvePrintProcess_ErrorMessage : ''
                                  }
                                  let result = await Evolve.Mongo.collection('EvolvePrintDetails').insertOne(doc);
                    
                                  if(result.result.ok == 1) {
                                    let objForPrinter = {
                                        EvolvePrintProcess_ID: result.insertedId,
                                        EvolvePrintProcess_Data: getZplCodeForLabel,
                                        EvolvePrinter_Name: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Name,
                                        EvolvePrinter_Code: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Code,
                                        EvolvePrinter_ID: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_ID,
                                        EvolvePrinter_IP: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_IP,
                                        EvolvePrinter_Port: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Port,
                                        EvolvePrinter_pcName: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_pcName,
                                        EvolvePrinter_Type: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_Type,
                                        EvolvePrinter_SubType: Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_SubType,
                                        EvolvePrinter_Copy : 1
                                    }
                                    Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList.push(objForPrinter);
                                }
                            }
                        }
                }



                let addPoRcpt = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.addPoRcptDetails1(req.body,req.body.EvolveGateDetails_ID);
                
                if (addPoRcpt instanceof Error) {

                    error = true

                    Evolve.Log.error(" EERR#### :Error while add po rcpt details ")

                    errorMessage = "Error while recieve po";
                }
                else {
                    let update_poDetail = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePoDetails(req.body); // Update Purchase Order Receive QTY 
                    if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

                        error = true

                        Evolve.Log.error(" EERR#### :Error while update po details ")

                        errorMessage = "Error while update po details";

                    }
                }
            }

            if (!error) {

                let obj = { statusCode: 200, status: "success", message: "Purchase Ordder Recieved Successfully ", result: null };
                res.send(obj);


            } else {

                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }




        } catch (error) {

            // console.log("error???" , error)
            Evolve.Log.error(" EERR####: Error while recieving Purchase order " + error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while recieving Purchase order ", result: null };
            res.send(obj);
        }
    },



    recieveAsn: async function (req, res) {
        try {
            let error = false;
            let errorMessage = '';

            req.body.EvolveAsn_ID = req.body.poLineList[0].EvolveAsn_ID;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            for (let i = 0; i < req.body.poLineList.length; i++) {
                req.body.poLineList[i].EvolveUser_ID = req.EvolveUser_ID;

                let addPoRcpt = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.addPoRcptDetails(req.body.poLineList[i]);
                if (addPoRcpt instanceof Error) {

                    error = true

                    Evolve.Log.error(" EERR#### :Error while add po rcpt details ")

                    errorMessage = "Error while recieve po";
                }
                else {
                    let update_poDetail = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePoDetails(req.body.poLineList[i]); // Update Purchase Order Receive QTY 
                    if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

                        error = true

                        Evolve.Log.error(" EERR#### :Error while update po details ")

                        errorMessage = "Error while update po details";

                    }
                }
            }

            if (error == false) {
                let updateAsnStatus = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updateAsnStatus(req.body);

                console.log("updateAsnStatus>>>", updateAsnStatus)
                if (updateAsnStatus instanceof Error || updateAsnStatus.rowsAffected < 1) {

                    error = true

                    Evolve.Log.error(" EERR#### :Error while update Asn Status ")

                    errorMessage = "Error while update Asn Status";

                }
            }
            if (!error) {

                let obj = { statusCode: 200, status: "success", message: "Asn Recieved Successfully", result: null };
                res.send(obj);


            } else {
                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while recieving Purchase order " + error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while recieving Purchase order ", result: null };
            res.send(obj);
        }
    },






    getPoListBySupplier: async function (req, res) {
        try {
            let poList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPoListBySupplier(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error("EERR#### : Eroor While get po list of supplier")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Eroor While get po list of supplier", result: null };
                res.send(obj);
            } else if (poList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No po found !", result: poList.recordset };
                res.send(obj);


            } else {
                let obj = { statusCode: 200, status: "success", message: "Po List", result: poList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR####: Error while getting Po List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting Po List " + error.message, result: null };
            res.send(obj);


        }
    },
    getSinglePoDetails: async function (req, res) {
        try {
            let poDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getSinglePoDetails(req.body);
            if (poDetails instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while getting po line details of  po ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while getting po line details of  po ", result: null };
                res.send(obj);
            } else if (poDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No open po line found", result: null };
                res.send(obj);

            } else {
                let obj = { statusCode: 200, status: "success", message: "Po line details", result: poDetails.recordset };
                res.send(obj);
            }
            //  }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Single Po Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting Single Po Details " + error.message, result: null };
            res.send(obj);

        }
    },

    getAllPoDetails: async function (req, res) {
        try {
            let allPo = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getAllPoDetails(req.body);
            if (allPo instanceof Error) {
                Evolve.Log.error(" EERR#### : No po data  Found!")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : No po data  Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po details", result: allPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting all Po Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting all Po Details " + error.message, result: null };
            res.send(obj);
        }
    },

    getPalletDetails: async function (req, res) {
        try {

            let palletDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPalletDetails(req.body);
            if (palletDetails instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get pallet details")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get pallet details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet Details", result: palletDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR####: Error while get pallet" + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get pallet", result: null };
            res.send(obj);

        }
    },


    getUomList: async function (req, res) {
        try {
            let uomList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getUomList(req.body);
            if (uomList instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get uom  list")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get uom  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Uom list", result: uomList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting pallet details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting pallet details", result: null };
            res.send(obj);

        }
    },

    gateEntryNoList: async function (req, res) {
        try {

            let result = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.gateEntryNoList(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Gate Entry Number List", result: result.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting gate Entry no. list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting gate Entry no. list ", result: null };
            res.send(obj);
        }
    },

    receivePurchaseOrderV2: async function (req, res) {
        try {
            console.log("req.body>>>>>>>>>>>> 1111111111> , ", req.body)
            let error = false;
            let errorMessage = '';
            let palletList = [];
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            // let defaultQty = parseFloat(Evolve.Config.PODEFAULTQTY)

            // if(defaultQty  != null){
            //     if(req.body.EvolvePurchaseOrderDetail_QuantityReceived % defaultQty !=0 ){

            //         error = true
            //     }else{
            //         for(let i=0 ; i<req.body.EvolvePurchaseOrderDetail_QuantityReceived / defaultQty ; i++){

            //             palletList.push(
            //                 {
            //                     EvolvePurchaseOrderDetail_QuantityReceived  : defaultQty ,
            //                 }
            //             )
            //         }


            //     }

            // }else{
            palletList.push(
                {
                    EvolvePurchaseOrderDetail_QuantityReceived: req.body.EvolvePurchaseOrderDetail_QuantityReceived,
                }
            )

            // }

            if (error == true) {

                errorMessage = "Enter Qty In Multiple of " + defaultQty;

            } else {
                if (error == false) {

                    let attr = [];
                    for (let i = 0; i < req.body.storedAttrName.length; i++) {
                        attr.push({

                            'key': req.body.storedAttrName[i],
                            'value': req.body.storedAttrValue[i],
                        })
                    }
                    req.body.attr = JSON.stringify(attr);
                    req.body.EvolveInventory_Status = 'ACCEPTED'
                    let getTransTypeID = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getTransTypeID('PO-RCPT');

                    if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                        Evolve.Log.error(" EERR#### :Error while get EvolveTranstype_ID ")
                        error = true

                        errorMessage = "Error while get EvolveTranstype_ID";
                    }
                    else {
                        req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                        for (let i = 0; i < palletList.length; i++) {
                            if (error == false) {
                                req.body.EvolvePurchaseOrderDetail_QuantityReceived = palletList[i].EvolvePurchaseOrderDetail_QuantityReceived
                                let po_detail_id = req.body.EvolvePurchaseOrderDetail_ID;
                                let po_receive_qty = req.body.EvolvePurchaseOrderDetail_QuantityReceived;

                                let getNextSerial = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getNextSerial('PO_RECIEVE');
                                if (getNextSerial instanceof Error || getNextSerial.rowsAffected < 1) {

                                    error = true

                                    errorMessage = "Error while get EvolveTranstype_ID";
                                } else {
                                    var str = "" + getNextSerial.recordset[0].EvolveSerial_Next;
                                    var pad = "00000";
                                    var sr_end = pad.substring(0, pad.length - str.length) + str; //0001
                                    let sr_nbr = getNextSerial.recordset[0].EvolveSerial_Prefix + sr_end;


                                    req.body.EvolveInventory_Refnumber = sr_nbr;

                                    let add_inventory = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.receivePurchaseOrderV2(req.body);
                                    if (add_inventory instanceof Error) {

                                        error = true

                                        Evolve.Log.error(" EERR#### :Error while recieve po ")

                                        errorMessage = "Error while recieve po";
                                    }
                                    else {
                                        let update_poDetail = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePurchaseOrderV2(po_detail_id, po_receive_qty, req.body); // Update Purchase Order Receive QTY 
                                        if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {

                                            error = true

                                            Evolve.Log.error(" EERR#### :Error while update po details ")

                                            errorMessage = "Error while update po details";

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

                                            let barcode = req.body.EvolveInventory_Refnumber;
                                            let batchNo = req.body.EvolveInventory_CustLotRef;
                                            let expDate = req.body.EvolvePOTransExpriryDate;

                                            let batchNoArray = [];


                                            if (batchNo != null && batchNo != '' && batchNo != undefined) {

                                                batchNoArray = batchNo.split(' ');

                                            }

                                            var ZplData = "^XA\r\n^PW599" +
                                                "\r\n^LL0280" +
                                                "\r\n^LS0^LS0^FT30,265^BQN,3,6^FDMA," + barcode + "^FS"
                                            let strAlignSize = 141;
                                            let batch = '';
                                            if (batchNoArray.length != 0) {
                                                for (let i = 0; i < batchNoArray.length; i++) {
                                                    if ((batch + batchNoArray[i]).length >= 20) {

                                                        ZplData += "\r\n^FT189," + strAlignSize + "^A0N,40,40^FH^FD" + batch + "^FS";
                                                        strAlignSize += 48;
                                                        batch = batchNoArray[i] + ' ';

                                                    } else {

                                                        batch += batchNoArray[i] + ' ';
                                                    }
                                                }
                                            }
                                            if (batch.trim() != '') {


                                                ZplData += "\r\n^FT189," + strAlignSize + "^A0N,40,40^FH^FD" + expDate + "^FS";
                                                strAlignSize += 48;


                                            }

                                            // ZplData +=  "\r\n^FT189,"+strAlignSize+"^A0N,50,50^FH^FD"+custPart+"^FS";


                                            ZplData += "\r\n^FT189,93^A0N,25,25^FH^FD" + barcode + "^FS^PQ1,0,1,Y^XZ";



                                            let updateNextSerial = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updateNextSerial('PO_RECIEVE');
                                            if (updateNextSerial instanceof Error || updateNextSerial.rowsAffected < 1) {


                                                error = true
                                                errorMessage = "Error While Update Next Serial Number";
                                            } else {
                                                Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint + '/' + req.body.EvolveInventory_Refnumber + '.txt', ZplData, function (err) {
                                                    if (err) {
                                                        Evolve.Log.error(" Error In Print Barcode ")
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            }

            if (error == false) {

                let obj = { statusCode: 200, status: "success", message: "Purchase Ordder Recieved Successfully ", result: null };
                res.send(obj);


            } else {

                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while recieving Purchase order " + error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while recieving Purchase order ", result: null };
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
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint + '/' + req.body.EvolveInventory_Refnumber + '.txt', ZplData, function (err) {
                if (err) {
                    let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "Barcode Printed Successfully", result: null };
                    res.send(obj);
                }
            })
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while printing pallet " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while printing pallet ", result: null };
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

            let palletCount = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPalletCount(condition);
            if (palletCount instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while getting total pallets !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet List", result: palletCount.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Pallet Count " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting Pallet Count ", result: null };
            res.send(obj);

        }
    },

    getSummary: async function (req, res) {
        try {
            req.body.EvolveInventory_LotNumber = req.body.EvolveInventory_LotNumber.trim()
            let summary = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getSummary(req.body);
            if (summary instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get summary ")

                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get summary ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Summary", result: summary.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting summary " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting summary", result: null };
            res.send(obj);


        }
    },

    updateSinglePalletData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let palletData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getpoDetailId(req.body);
            if (palletData instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get pallet id ")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get pallet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let updateInventory = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updateInventory(req.body);
                if (updateInventory instanceof Error) {
                    Evolve.Log.error("EERR#### : Error while update inventory ")

                    let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while update inventory", result: null };
                    res.send(obj);
                }
                else {
                    let updatePoTrans = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePalletPoTrans(req.body);
                    if (updatePoTrans instanceof Error) {
                        Evolve.Log.error("EERR#### : Error while update pallet detail ")

                        let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while update pallet detail ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoDetails = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePoDetails(req.body);
                        if (updatePoDetails instanceof Error) {
                            Evolve.Log.error("EERR#### : Error while update po detail ")

                            let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while update po detail", result: null };
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
            Evolve.Log.error(" EERR####: Error while updating single pallet data" + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while updating single pallet data", result: null };
            res.send(obj);
        }
    },

    deletePallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("body  data >>>", req.body)
            let palletData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getpoDetailId(req.body);
            console.log("palletData>>>>", palletData)
            if (palletData instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get palet id ")

                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get palet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let deletePallet = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.deletePallet(req.body);

                if (deletePallet instanceof Error || deletePallet.rowsAffected < 1) {
                    Evolve.Log.error("EERR#### : Error while delete pallet ")

                    let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while delete pallet ", result: null };
                    res.send(obj);
                }
                else {

                    let deletePoTrans = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.deletePoTrans(req.body);

                    if (deletePoTrans instanceof Error || deletePoTrans.rowsAffected < 1) {
                        Evolve.Log.error(" EERR#### : Error while delete po transaction ")
                        let obj = { statusCode: 400, status: "fail", message: " ERR0033 : Error while delete po transaction ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoQty = await await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.updatePoQty(req.body);

                        if (updatePoQty instanceof Error || updatePoQty.rowsAffected < 1) {
                            Evolve.Log.error(" EERR#### : Error while update po qty ")

                            let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while update po qty ", result: null };
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
            Evolve.Log.error(" EERR####: Error while deleting pallet " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while deleting pallet" + error.message, result: null };
            res.send(obj);

        }
    },

    getPoByGateNumber: async function (req, res) {
        try {


            let poData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPoByGateNumber(req.body);
            if (poData instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get po by gate Number")

                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get po by gate Number", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po data", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting po by gate Number " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting po by gate Number", result: null };
            res.send(obj);

        }
    },
    getPodetailsbyGate: async function (req, res) {
        try {
            let poData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPodetailsbyGate(req.body.EvolvePurchaseOrder_Number);
            if (poData instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "error while getting po data !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po list", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting po details by gate " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting po details by gate", result: null };
            res.send(obj);

        }
    },

    getUnpostedTransaction: async function (req, res) {
        try {

            let tranData = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getUnpostedTransaction(req.body);
            if (tranData instanceof Error) {
                Evolve.Log.error("EERR#### : Erro while get unposted transactions")

                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Erro while get unposted transactions", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted transactions", result: tranData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting unposted transaction  " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting unposted transaction", result: null };
            res.send(obj);

        }
    },
    getPreviosdatTranCount: async function (req, res) {
        try {

            let count = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPreviosdatTranCount();
            if (count instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get  previous unposted transactions count ")
                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get  previous unposted transactions count   ", result: null };
                res.send(obj);
            } else {

                let obj = { statusCode: 200, status: "success", message: "count", result: count.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting previous transaction count " + error.message)
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting previous transaction count ", result: null };
            res.send(obj);

        }
    },
    closePO: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let closePo = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.closePO(req.body);
            if (closePo instanceof Error || closePo.rowsAffected < 1) {
                Evolve.Log.error(" EERR#### : Error while closing po ")

                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while closing po", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Purchase order closed successfully", result: closePo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while closing po " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while closing po ", result: null };
            res.send(obj);

        }
    },
    getUnpostedPoList: async function (req, res) {
        try {
            let poList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getUnpostedPoList(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while getting unposted po list ")

                let obj = { statusCode: 400, status: "fail", message: " EERR#### : Error while get unposted po list ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted Po ", result: poList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting unposted po list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting unposted po list", result: null };
            res.send(obj);

        }
    },
    getPoLineList: async function (req, res) {
        try {
            let lineList = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getPoLineList(req.body.EvolvePurchaseOrder_ID);
            if (lineList instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get unposted lines for po ")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get unposted lines for po ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Po lines", result: lineList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting unposted po list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while getting unposted po list ", result: null };
            res.send(obj);

        }
    },
    printAllPallets: async function (req, res) {
        try {
            let error = false;
            for (let i = 0; i < req.body.printArray.length; i++) {
                if (error == false) {
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
                    Evolve.Fs.writeFile(Evolve.ConfigData.App.dirPoRecievePrint + '/' + barcode + '.txt', ZplData, function (err) {
                        if (err) {
                            error = true
                        }
                    })
                }
                if (error == true) {
                    let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                    res.send(obj);

                } else {
                    let obj = { statusCode: 200, status: "success", message: "Barcodes Printed Successfully", result: null };
                    res.send(obj);

                }




            }
            if (error == true) {
                Evolve.Log.error("EERR#### : Error while print all pallets ")

                let obj = { statusCode: 200, status: "success", message: "EERR#### : Error while print all pallets", result: lineList.recordset };
                res.send(obj);

            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Barcodes printed",
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("EERR####: Error while print all pallets" + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while print all pallets", result: null };
            res.send(obj);
        }
    },
    checkPoStatus: async function (req, res) {
        try {
            let status = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.checkPoStatus(req.body.EvolvePurchaseOrder_ID);
            if (status instanceof Error) {
                Evolve.Log.error("EERR####: Error while check po status " + error.message)
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while check po status", result: null };
                res.send(obj);
            } else if (status.recordset[0].EvolvePurchaseOrder_Status != 'open') {
                let obj = { statusCode: 400, status: "fail", message: " Po closed already please refresh the screen", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Po is open", result: null };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("EERR#### : Error while check po status " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while check po status ", result: null };
            res.send(obj);

        }
    },

    /*** Serial Number Generate : START */
    getSerialNumber: async function (code) {
        try {
            let SerialDetails = await Evolve.App.Services.Common.SrvCommon.getSerialDetails(code);
            if (SerialDetails instanceof Error || SerialDetails.rowsAffected < 1) {
                Evolve.Log.error(" EERR#### : Serial Details Not Found! ")
                return 0;
            } else {

                let SerialNumber = await Evolve.App.Services.Common.SrvCommon.getSerialNumber(code);
                if (SerialNumber instanceof Error || SerialNumber.rowsAffected < 1) {
                    Evolve.Log.error(" EERR#### : Serial Number Not Created ")
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
            Evolve.Log.error(' EERR####: When Serial Number Not Found ' + error.message);
            return 0;
        }
    },
    /*** Serial Number Generate  : END  */

    addInvTransHistory: async function (data) {
        let getTransType_ID = await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.getTransTypeID(data.EvolveTranstype_code);
        if (getTransType_ID instanceof Error || getTransType_ID.rowAffected < 1) {
            Evolve.Log.error(getTransType_ID.message);
            Evolve.Log.error(" EERR####: Transaction type not found for " + data.EvolveTranstype_Code)
            return getTransType_ID;
        }
        else {
            data.EvolveTransType_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
            return await await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveV3.addInvTransHistory(data);
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