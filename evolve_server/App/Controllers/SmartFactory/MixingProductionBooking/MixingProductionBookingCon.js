'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getSectionANdPrinterDetailByMachinCode: async function(req, res) {
        try {
            let List = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getSectionANdPrinterDetailByMachinCode(req.body.EvolveMachine_Code);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Section Code By Machine Code !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Get Section Code By Machine Code",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Section Code By Machine Code " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get Section Code By Machine Code " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getWoList: async function(req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getWoList(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2684 :Error while get WO list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2684 : Error while get WO list ",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "WO List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2685: Error while get WO list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2685 : Error while get WO list",
                result: null
            };
            res.send(obj);
        }
    },

    getWoDetails: async function(req, res) {
        try {
            let data = {};
            let details = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getWoDetails(req.body.EvolveProdOrders_ID);
            if (details instanceof Error) {
                Evolve.Log.error("EERR####: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get wo details", result: null };
                res.send(obj);
            } else {
                data.materialToProduce = details.recordset;
                let bomDetails = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getWoBomDetails(req.body.EvolveProdOrders_ID);
                if (bomDetails instanceof Error) {
                    Evolve.Log.error("EERR####: Error while  get wo details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get wo bom details", result: null };
                    res.send(obj);
                } else {
                    data.materialToIssue = bomDetails.recordset;
                    data.materialToProduce[0].EvolveTransHistory_Type = 'MATERIALISSUED'
                    let materialIssued = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getTransHistory(data.materialToProduce[0]);
                    if (materialIssued instanceof Error) {
                        Evolve.Log.error("EERR####: Error while  get wo details")
                        let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                        res.send(obj);
                    } else {
                        data.materialIssued = materialIssued.recordset;
                        data.materialToProduce[0].EvolveTransHistory_Type = 'MATERIALPRODUCED'
                        let materialProduced = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getTransHistory(data.materialToProduce[0]);
                        if (materialProduced instanceof Error) {
                            Evolve.Log.error("EERR####: Error while  get wo details")
                            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                            res.send(obj);
                        } else {

                            console.log("= materialProduced????", materialProduced)
                            data.materialProduced = materialProduced.recordset;
                            console.log("data>>>>>>>>", data);
                            let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                            console.log("obj???", obj)
                            res.send(obj);
                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },

    getDeviceList: async function(req, res) {
        try {
            let List = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getDeviceList();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Device List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Get Device List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Device List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get Device List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProductDesignList: async function(req, res) {
        try {
            let List = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getProductDesignList();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get ProductDesign List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Get ProductDesign List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get ProductDesign List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get ProductDesign List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProductColourList: async function(req, res) {
        try {
            let List = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getProductColourList();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get ProductColour List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Get ProductColour List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get ProductColour List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get ProductColour List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    completeProductionBooking: async function(req, res) {
        try {
            console.log("come in my function??????????????");
            console.log("On BOOKINNF??", req.body)

            let errorMessage = '';

            if (req.body.EvolveLocation_Code == null) {

                // let  findMachineLocation  = 

                let findMachineLocation = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.findMachineLocation(req.body.EvolveMachine_Code);
                if (findMachineLocation instanceof Error) {

                    errorMessage = 'Error While Find Machine Location';

                } else if (findMachineLocation.rowsAffected < 1) {

                    let itemDefLacation = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getItemDefaultLocation(req.body.EvolveItem_ID);
                    if (itemDefLacation instanceof Error) {

                        errorMessage = 'Error While Item efault Location';

                    } else if (itemDefLacation.rowsAffected < 1) {

                        errorMessage = 'Item Defaullt Location Not Found';

                    } else {

                        req.body.EvolveLocation_Code = itemDefLacation.recordset[0].EvolveLocation_Code;
                        req.body.EvolveLocation_ID = itemDefLacation.recordset[0].EvolveLocation_ID;

                    }
                } else {
                    req.body.EvolveLocation_Code = findMachineLocation.recordset[0].EvolveLocation_Code;
                    req.body.EvolveLocation_ID = findMachineLocation.recordset[0].EvolveLocation_ID;
                }



            }




            if (errorMessage == '') {


                // req.body.EvolveSection_Code == 
                if (req.body.EvolveSection_Code == 'SLITTING') {

                    if (req.body.productQuality != 'Fresh') {


                        let splittedArray = req.body.EvolveItem_Part.split('-');


                        let itemPart = splittedArray[0] + '-' + req.body.productQuality;

                        console.log("itemPart?????????????????????????????????????", itemPart)

                        req.body.EvolveItem_Part = itemPart;

                    }
                }


                console.log("req.body.EvolveItem_Part????", req.body.EvolveItem_Part)

                let date = new Date();
                let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


                req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;

                // req.body.EvolveCompany_ID = req.EvolveCompany_ID;
                // req.body.EvolveUnit_ID = req.EvolveUnit_ID;
                // let locStatus = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getLocationStatus(req.body.EvolveLocation_ID);
                // if (locStatus instanceof Error) {
                //     Evolve.Log.error("EERR3087 : Error while get location status ")
                //     let obj = { statusCode: 400, status: "fail", message: "EERR3087 : Error while get location status ", result: null };
                //     res.send(obj);
                // } else {
                // req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                // let error = false;
                // let getTransTypeID = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getTransTypeID('WO-RCPT');
                // if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                //     error = true;
                // }
                // else {
                // req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID
                let palletNumber = Evolve.Generator.generate("PCL");

                if (palletNumber == undefined || palletNumber.length == 0) {

                    errorMessage = 'Error While Generate New pallet Id';


                } else {

                    palletNumber = (palletNumber.toString()).replace(/ -/g, '')
                    palletNumber = palletNumber.split(" ").join("");
                    // let receiptDetail = [];
                    // receiptDetail.push({
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     "site": req.body.EvolveUnit_Code,
                    //     "location": req.body.EvolveLocation_Code,
                    //     "lotserial": req.body.EvolveInventory_LotSerialNo,
                    //     "lotref": palletNumber,
                    //     "lotserialQty": req.body.EvolveInventory_QtyAvailable
                    // });

                    // console.log('receiptDetail????' , receiptDetail)


                    // let WorkOrderInfo = {
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     "um": req.body.EvolveUom_Uom,
                    //     "conv": "1",
                    //     "site": req.body.EvolveUnit_Code,
                    //     "multiEntry": true,
                    //     receiptDetail
                    // };
                    // console.log('WorkOrderInfo????' , WorkOrderInfo)

                    // let WorkOrderTail = {
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     WorkOrderInfo
                    // };

                    // console.log('WorkOrderTail????' , WorkOrderTail)

                    let pendingInvXmlObj = {
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
                                "EvolveProdRct": {
                                    "qcom:dsSessionContext": {
                                        "qcom:ttContext": [{
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "domain",
                                                "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "scopeTransaction",
                                                "qcom:propertyValue": "false"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "version",
                                                "qcom:propertyValue": 'ERP_1'
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "mnemonicsRaw",
                                                "qcom:propertyValue": "false"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "username",
                                                "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "password",
                                                "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "action",
                                                "qcom:propertyValue": ""
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "entity",
                                                "qcom:propertyValue": req.body.EvolveUnit_Code
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
                                    "dsProductionOrderRct": {
                                        "ProductionOrderRct": {

                                            "operation": "A",
                                            "veffectivedate": dateTime,
                                            "vsite": req.body.EvolveUnit_Code,
                                            "vworkordernumber": req.body.EvolveProdOrders_OrderNo,
                                            "vlotid": req.body.EvolveProdOrders_OrderID,
                                            "part": req.body.EvolveItem_Part,
                                            "qtyTotProc": req.body.EvolveInventory_QtyAvailable,
                                            "vum": req.body.EvolveUom_Uom,
                                            "lotserialQty": req.body.EvolveInventory_QtyAvailable,
                                            "site": req.body.EvolveUnit_Code,
                                            "location": req.body.EvolveLocation_Code,
                                            "lotserial": req.body.EvolveInventory_BatchNo,
                                            "lotref": palletNumber,
                                            "multiEntry": false,
                                            "chgAttr": false,
                                            "yn": true,
                                            "yn1": true,
                                            "vconfirmupdate": true,
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var woRcptXmldoc = Evolve.Xmlbuilder.create(pendingInvXmlObj, { version: '1.0', encoding: 'utf-8' })
                    let woRcptXmlFile = woRcptXmldoc.end({ pretty: true });
                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                //'Content-Length': pendingInvXmldoc.length 
                        }
                    }

                    console.log('JSON STRINGIFY>>', (woRcptXmlFile))
                    let pendingInvResponce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, woRcptXmlFile, config);
                    await Evolve.Xml2JS.parseString(pendingInvResponce.data, async function(err, resPonsedXml) {
                        try {
                            if (err) {
                                // error = true;
                                errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING PENDING INVOICE  DATA';

                            } else {

                                console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
                                let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveProdRctResponse'][0]['ns1:result'][0];
                                if (result == 'error') {
                                    // error = true;
                                    errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);
                                } else {

                                    if (req.body.EvolveQCTemp_ID == null || req.body.EvolveQCTemp_ID == 'null' || req.body.EvolveQCTemp_ID == '') {
                                        req.body.EvolveInventory_Status = 'AVAILABLE'
                                    } else {
                                        req.body.EvolveInventory_Status = 'QCHOLD'
                                    }

                                    req.body.EvolveInventory_SerialNo = palletNumber;
                                    req.body.EvolveInventory_SerialNo = (req.body.EvolveInventory_SerialNo.toString()).replace(/ -/g, '')
                                    req.body.EvolveInventory_SerialNo = req.body.EvolveInventory_SerialNo.split(" ").join("");
                                    req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                                    req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;
                                    let addInventory = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.addInventory(req.body);
                                    if (addInventory instanceof Error || addInventory.rowsAffected < 1) {

                                        errorMessage = 'Error While Add Inventory';

                                    } else {
                                        let id = addInventory.recordset[0].inserted_id
                                        let addInventoryDetail = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.addInventoryDetail(id, req.body.productColour, req.body.productDesign);
                                        if (addInventoryDetail instanceof Error || addInventoryDetail.rowsAffected < 1) {
                                            errorMessage = 'Error While Add Inventory Detail';
                                        } else {
                                            let updateProdOrderDetails = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.updateProdOrderCompletedQty(req.body);
                                            if (updateProdOrderDetails instanceof Error || updateProdOrderDetails.rowsAffected < 1) {

                                                errorMessage = 'Error While update Prod Order';

                                            } else {
                                                let transDetails = {
                                                    EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
                                                    EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
                                                    EvolveItem_Part: req.body.EvolveItem_Part,
                                                    EvolveLocation_Code: req.body.EvolveLocation_Code,
                                                    EvolveTransHistory_Qty: req.body.EvolveInventory_QtyAvailable,
                                                    EvolveInventory_SerialNo: req.body.EvolveInventory_SerialNo,
                                                    EvolveTransHistory_LotSerialNo: req.body.EvolveInventory_LotSerialNo,
                                                    EvolveTransHistory_BatchNo: req.body.EvolveInventory_BatchNo,
                                                    EvolveTransHistory_Type: 'MATERIALPRODUCED',
                                                }
                                                await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);

                                                if (Evolve.Config.MIXINGLABELCODE == null || Evolve.Config.MIXINGLABELCODE == '' || Evolve.Config.MIXINGLABELCODE == undefined || Evolve.Config.MIXINGLABELCODE == 'NOTLABLE') {
                                                    errorMessage = '   ';
                                                } else {
                                                    let printerCode = req.body.printerCode
                                                    let sticketcode = Evolve.Config.MIXINGLABELCODE
                                                    let prindata = {
                                                        EvolveInventory_QtyAvailable: req.body.EvolveInventory_QtyAvailable,
                                                        EvolveLocation_ID: req.body.EvolveLocation_ID,
                                                        EvolveInventory_BatchNo: req.body.EvolveInventory_BatchNo,
                                                        EvolveInventory_LotSerialNo: req.body.EvolveInventory_LotSerialNo,
                                                        productQuality: req.body.productQuality,
                                                        productColour: req.body.productColour,
                                                        productDesign: req.body.productDesign,
                                                    }
                                                    let sendPrintCommandForMixingLable = await Evolve.App.Controllers.Common.ConCommon.AddNewPrintQuee(printerCode, sticketcode, prindata)

                                                    console.log("sendPrintCommandForMixingLable::::::::::", sendPrintCommandForMixingLable);
                                                }


                                                // Quality Order Logic - Start

                                                // if (req.body.EvolveInventory_Status == 'QCHOLD') {
                                                //     let checkSameBatchQCExits = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.checkSameBatchQCExits(req.body);
                                                //     if (checkSameBatchQCExits instanceof Error) {
                                                //         errorMessage = 'Error While Check Same Batch QC Exits Or Not!!'
                                                //     } else if (checkSameBatchQCExits.rowsAffected < 1) {
                                                //         let generatedQCOrderNumber = await Evolve.Generator.generate('QC');
                                                //         req.body.EvolveQCOrder_Num = generatedQCOrderNumber.replace(" - ", "");
                                                //         let addNewQcOrder = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.addNewQcOrder(req.body);
                                                //         if (addNewQcOrder instanceof Error || addNewQcOrder.rowsAffected < 1) {
                                                //             errorMessage = "Error While Add Record In QC!!"
                                                //         } else {
                                                //             req.body.EvolveQCOrder_ID = addNewQcOrder.recordset[0].inserted_id;
                                                //             let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(req.body);
                                                //             if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                                //                 errorMessage = "Error While Add Record In QC Details !!";
                                                //             }
                                                //         }
                                                //     } else {
                                                //         req.body.EvolveQCOrder_ID = checkSameBatchQCExits.recordset[0].EvolveQCOrder_ID;
                                                //         let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(req.body);
                                                //         if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                                //             errorMessage = "Error While Add Record In QC Details !!";
                                                //         } else {
                                                //             if (checkSameBatchQCExits.recordset[0].EvolveQCOrder_Status == 'QCDONE') {
                                                //                 let updateQcOrderStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateQcOrderStatus(req.body);
                                                //                 if (updateQcOrderStatus instanceof Error || updateQcOrderStatus.rowsAffected < 1) {
                                                //                     errorMessage = "Error While Update QC Order Status !!";
                                                //                 }
                                                //             }
                                                //         }
                                                //     }
                                                // }
                                            }
                                        }



                                    }
                                }
                            }
                        } catch (error) {

                            errorMessage = " EERR2713: Error while confirm booking  " + error.message;
                            // Evolve.Log.error(" EERR2713: Error while confirm booking  " + error.message);
                            // let obj = {
                            //     statusCode: 400,
                            //     status: "fail",
                            //     message: "EERR2713 : Error while confirm booking",
                            //     result: null
                            // };
                            // res.send(obj);
                        }
                    });
                }
            }

            console.log("ENTERED????? laats")

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Production Booked Successfully' : errorMessage, result: null };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR2709 : Error while complete booking " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2709 : Error while complete booking " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    reprintData: async function(req, res) {
        try {
            if (Evolve.Config.MIXINGLABELCODE == null || Evolve.Config.MIXINGLABELCODE == '' || Evolve.Config.MIXINGLABELCODE == undefined || Evolve.Config.MIXINGLABELCODE == 'NOTLABLE') {
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while  reprint Label", result: null };
                res.send(obj);
            } else {
                let printerCode = req.body.printerCode
                let sticketcode = Evolve.Config.MIXINGLABELCOD
                let prindata = {
                    EvolveInventory_QtyAvailable: req.body.EvolveInventory_QtyAvailable,
                    EvolveLocation_ID: req.body.EvolveLocation_ID,
                    EvolveInventory_BatchNo: req.body.EvolveInventory_BatchNo,
                    EvolveInventory_LotSerialNo: req.body.EvolveInventory_LotSerialNo,
                    productQuality: req.body.productQuality,
                    productColour: req.body.productColour,
                    productDesign: req.body.productDesign,
                }
                let sendPrintCommandForMixingLable = await Evolve.App.Controllers.Common.ConCommon.AddNewPrintQuee(printerCode, sticketcode, prindata)
                if (sendPrintCommandForMixingLable instanceof Error) {
                    let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while  reprint " + sendPrintCommandForMixingLable.message, result: null };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 400, status: "fail", message: " Label Reprint Successfully ", result: null };
                    res.send(obj)
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  reprint " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while  reprint " + error.message, result: null };
            res.send(obj);
        }
    },


    getWeight: async function(req, res) {
        try {
            console.log("req.body.DeviceCode>>>>.", req.body.DeviceCode + '/cmd');
            let publishTopic = req.body.DeviceCode + '/cmd'
            let data = "GET_WEIGHT"
            Evolve.MqttClient.publish(publishTopic, data);
            console.log("calll>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
            let obj = {
                statusCode: 200,
            };
            res.send(obj)
        } catch (error) {
            Evolve.Log.error(" EERR####: Error Get Weight " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error Get Weight " + error.message,
                result: null
            };
            res.send(obj)
        }
    },

    getConsumedPallet: async function(req, res) {
        try {

            console.log("TRANSACTION  HISTORY>>>>>>>> ,  ", req.body)
            req.body.EvolveTransHistory_Type = 'MATERIALISSUED';
            let getConsumedPallet = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getConsumedPallet(req.body);
            if (getConsumedPallet instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get BOM Datils ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Issued Material ",
                    result: getConsumedPallet.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get BOM Datils " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get BOM Datils ",
                result: null
            };
            res.send(obj);
        }
    },

    checkInventory: async function(req, res) {
        try {
            let errorMessage = '';
            let checkInventory = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.checkInventoryPallet(req.body);


            if (checkInventory instanceof Error) {
                errorMessage = 'Error while Check Inventory';

            } else if (checkInventory.rowsAffected < 1) {
                errorMessage = 'Pallet Not Found'
            }
            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Valid Inventory' : errorMessage, result: checkInventory.recordset[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check inventory " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while check inventory ",
                result: null
            };
            res.send(obj);
        }
    },


    updateIssuedQty: async function(req, res) {
        try {
            let errorMessage = '';
            req.body.EvolveUser_ID = req.body.EvolveUser_ID == undefined ? null : req.body.EvolveUser_ID;
            // if (req.body.EvolveInventory_SerialNo == undefined || req.body.EvolveInventory_SerialNo == '' || req.body.EvolveInventory_SerialNo == null) {

            //     console.log("ENTERED IN IFFFFFF")
            //     let qtyToIssued = req.body.qty;
            //     let invToIssued = [];

            //     let invList = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.getInvList(req.body);

            //     if (invList instanceof Error) {

            //         errorMessage = "ERROR WHILE CONSUME INVENTORY"
            //     } else if (invList.rowsAffected < 1) {
            //         errorMessage = "NO AVAIALBE INVENTORY FOUND"


            //     } else {

            //         for (let i = 0; i < invList.recordset.length; i++) {

            //             if (qtyToIssued != 0) {
            //                 if (qtyToIssued <= invList.recordset[i].EvolveInventory_QtyAvailable) {
            //                     invToIssued.push(invList.recordset[i]);
            //                     invToIssued[invToIssued.length - 1].qty = qtyToIssued;
            //                     qtyToIssued = 0;

            //                 } else {
            //                     invToIssued.push(invList.recordset[i]);
            //                     invToIssued[invToIssued.length - 1].qty = invList.recordset[i].EvolveInventory_QtyAvailable;
            //                     qtyToIssued = qtyToIssued - invList.recordset[i].EvolveInventory_QtyAvailable;
            //                 }
            //             } else {
            //                 break;
            //             }
            //         }

            //         if (qtyToIssued != 0) {
            //             errorMessage = 'Enough Inventory Not Available'
            //         }
            //     }

            //     if (errorMessage == '') {

            //         for (let i = 0; i < invToIssued.length; i++) {

            //             ttMultWOComponents.push({


            //                 "site": req.body.EvolveUnit_Code,
            //                 "effDate": currentDate,
            //                 "orderNumber": req.body.EvolveProdOrders_OrderNo,
            //                 "woLot": req.body.EvolveProdOrders_OrderID,
            //                 "part": req.body.parentPart,
            //                 "prodLine": {},
            //                 "shift": {},
            //                 "workCenter": {},
            //                 "operation": "10",

            //                 "machine": {},
            //                 "routing": req.body.parentPart,
            //                 "bomCode": {},
            //                 "operation": "",
            //                 "compPart": req.body.EvolveItem_Part,
            //                 "location": invToIssued[i].EvolveLocation_Code,
            //                 "lot": invToIssued[i].EvolveInventory_LotSerialNo,
            //                 "ref": invToIssued[i].EvolveInventory_SerialNo,
            //                 "qty": invToIssued[i].qty



            //             })

            //         }
            //     }




            //     if (errorMessage == '') {


            //         let date = new Date()

            //         let month = (date.getMonth() + 1).toString();

            //         month = month.length < 2 ? '0' + `${month + ''}` : month;

            //         let currentDate = date.getFullYear() + '-' + (month) + '-' + date.getDate();
            //         let comPissueObj = {
            //             "soapenv:Envelope": {
            //                 "@xmlns": "urn:schemas-qad-com:xml-services",
            //                 "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
            //                 "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
            //                 "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
            //                 "soapenv:Header": {
            //                     "wsa:Action": "",
            //                     "wsa:To": "urn:services-qad-com:QADERP",
            //                     "wsa:MessageID": "urn:services-qad-com::QADERP",
            //                     "wsa:ReferenceParameters": { "qcom:suppressResponseDetail": "true" },
            //                     "wsa:ReplyTo": { "wsa:Address": "urn:services-qad-com:" }
            //                 },
            //                 "soapenv:Body": {
            //                     "recordIssueComponentForOrders": {
            //                         "qcom:dsSessionContext": {
            //                             "qcom:ttContext": [{
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "domain",
            //                                     "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "scopeTransaction",
            //                                     "qcom:propertyValue": "true"
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "version",
            //                                     "qcom:propertyValue": "ERP3_1"
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "mnemonicsRaw",
            //                                     "qcom:propertyValue": "false"
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "username",
            //                                     "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "password",
            //                                     "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "action",
            //                                     "qcom:propertyValue": "Save"
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "entity",
            //                                     "qcom:propertyValue": 'CFD01'
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "email",
            //                                     "qcom:propertyValue": ""
            //                                 },
            //                                 {
            //                                     "qcom:propertyQualifier": "QAD",
            //                                     "qcom:propertyName": "emailLevel",
            //                                     "qcom:propertyValue": ""
            //                                 }
            //                             ]
            //                         },
            //                         "dsMultWOIssue": {
            //                             "ttMultWOIssue": {
            //                                 "site": req.body.EvolveUnit_Code,
            //                                 "effDate": currentDate,
            //                                 "orderNumber": req.body.EvolveProdOrders_OrderNo,
            //                                 "woLot": req.body.EvolveProdOrders_OrderID,
            //                                 "part": req.body.parentPart,
            //                                 "prodLine": {},
            //                                 "shift": {},
            //                                 "workCenter": {},
            //                                 "machine": {},
            //                                 "routing": req.body.parentPart,
            //                                 "bomCode": {},
            //                                 "qtyToIssue": "None",
            //                                 "operation": "10",
            //                                 ttMultWOComponents
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //         let parseObj = Evolve.Xmlbuilder.create(comPissueObj, { version: '1.0', encoding: 'utf-8' })
            //         let comIssueXml = parseObj.end({ pretty: true });


            //         let config = {
            //             headers: {
            //                 'Accept-Encoding': 'gzip, deflate',
            //                 'Content-Type': 'text/xml;charset=UTF-8',
            //                 'SOAPAction': "",
            //                 'Host': Evolve.Config.QXTENHOST,
            //                 'Connection': 'Keep - Alive',
            //                 'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
            //                     //'Content-Length': pendingInvXmldoc.length 
            //             }
            //         }

            //         console.log('JSON STRINGIFY>>', (comIssueXml))
            //         let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config);
            //         await Evolve.Xml2JS.parseString(comIssueResponse.data, async function(err, resPonsedXml) {
            //             try {
            //                 if (err) {
            //                     // error = true;
            //                     errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING FILE TO ERP';



            //                 } else {
            //                     console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
            //                     let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns1:result'][0];
            //                     console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult", result)
            //                     if (result == 'error') {
            //                         // error = true;
            //                         // errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);


            //                         errorMessage = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]
            //                     } else {


            //                     }
            //                 }
            //             } catch (error) {

            //                 errorMessage = " EERR2713: Error while Component Issue " + error.message;

            //             }
            //         });
            //     }

            //     if (errorMessage == '') {

            //         for (let i = 0; i < invToIssued.length; i++) {
            //             let updateInv = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.updateInventory(invToIssued[i]);
            //             if (updateInv instanceof Error || updateInv.rowsAffected < 1) {
            //                 errorMessage = 'Error While Update Inventory Status'
            //             } else {
            //                 let transDetails = {
            //                     EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
            //                     EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
            //                     EvolveItem_Part: req.body.EvolveItem_Part,
            //                     EvolveLocation_Code: '',
            //                     EvolveTransHistory_Qty: invToIssued[i].qty,
            //                     EvolveInventory_SerialNo: invToIssued[i].EvolveInventory_SerialNo,
            //                     EvolveTransHistory_Type: 'MATERIALISSUED',
            //                     EvolveTransHistory_BatchNo: invToIssued[i].EvolveInventory_BatchNo,
            //                     EvolveTransHistory_LotSerialNo: invToIssued[i].EvolveInventory_LotSerialNo,

            //                 }
            //                 console.log('transDetails???', transDetails)
            //                 await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);
            //             }
            //         }
            //     }

            //     if (errorMessage == '') {

            //         let updateIssuedQty = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.updateIssuedQty(req.body);
            //         if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
            //             errorMessage = 'Error while UpDate IssuedQty'
            //         }

            //     }

            // } 
            // else {



            let date = new Date()

            let month = (date.getMonth() + 1).toString();

            month = month.length < 2 ? '0' + `${month + ''}` : month;

            let currentDate = date.getFullYear() + '-' + (month) + '-' + date.getDate();
            let comPissueObj = {
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
                        "recordIssueComponentForOrders": {
                            "qcom:dsSessionContext": {
                                "qcom:ttContext": [{
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "domain",
                                        "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "scopeTransaction",
                                        "qcom:propertyValue": "true"
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "version",
                                        "qcom:propertyValue": "ERP3_1"
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "mnemonicsRaw",
                                        "qcom:propertyValue": "false"
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "username",
                                        "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "password",
                                        "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "action",
                                        "qcom:propertyValue": "Save"
                                    },
                                    {
                                        "qcom:propertyQualifier": "QAD",
                                        "qcom:propertyName": "entity",
                                        "qcom:propertyValue": req.body.EvolveUnit_Code
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
                            "dsMultWOIssue": {
                                "ttMultWOIssue": {
                                    "site": req.body.EvolveUnit_Code,
                                    "effDate": currentDate,
                                    "orderNumber": req.body.EvolveProdOrders_OrderNo,
                                    "woLot": req.body.EvolveProdOrders_OrderID,
                                    "part": req.body.parentPart,
                                    "prodLine": {},
                                    "shift": {},
                                    "workCenter": {},
                                    "machine": {},
                                    "routing": req.body.parentPart,
                                    "bomCode": {},
                                    "qtyToIssue": "3",
                                    "operation": "10",
                                    "ttMultWOComponents": {
                                        "site": req.body.EvolveUnit_Code,
                                        "effDate": currentDate,
                                        "orderNumber": req.body.EvolveProdOrders_OrderNo,
                                        "woLot": req.body.EvolveProdOrders_OrderID,
                                        "part": req.body.parentPart,
                                        "prodLine": {},
                                        "operation": "10",
                                        "shift": {},
                                        "workCenter": {},
                                        "machine": {},
                                        "routing": req.body.parentPart,
                                        "bomCode": {},
                                        "operation": "",
                                        "compPart": req.body.EvolveItem_Part,
                                        "location": req.body.invDetails.EvolveLocation_Code,
                                        "lot": req.body.invDetails.EvolveInventory_LotSerialNo,
                                        "ref": req.body.invDetails.EvolveInventory_SerialNo,
                                        "qty": req.body.qty
                                    }
                                }
                            }
                        }
                    }
                }
            }
            let parseObj = Evolve.Xmlbuilder.create(comPissueObj, { version: '1.0', encoding: 'utf-8' })
            let comIssueXml = parseObj.end({ pretty: true });


            let config = {
                headers: {
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'SOAPAction': "",
                    'Host': Evolve.Config.QXTENHOST,
                    'Connection': 'Keep - Alive',
                    'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                        //'Content-Length': pendingInvXmldoc.length 
                }
            }

            console.log('JSON STRINGIFY>>', (comIssueXml))
            let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config);
            await Evolve.Xml2JS.parseString(comIssueResponse.data, async function(err, resPonsedXml) {
                try {
                    if (err) {
                        // error = true;
                        errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING FILE TO ERP';

                    } else {
                        console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
                        let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns1:result'][0];
                        console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult", result)
                        if (result == 'error') {
                            // error = true;
                            // errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);

                            errorMessage = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]
                        } else {


                        }
                    }
                } catch (error) {

                    errorMessage = " EERR2713: Error while Component Issue " + error.message;

                }
            });

            if (errorMessage == '') {

                let updateInv = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.updateInventory(req.body);
                if (updateInv instanceof Error || updateInv.rowsAffected < 1) {
                    errorMessage = 'Error While Update Inventory Status'
                } else {


                    let transDetails = {

                        EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
                        EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
                        EvolveItem_Part: req.body.EvolveItem_Part,
                        EvolveLocation_Code: '',
                        EvolveTransHistory_Qty: req.body.qty,
                        EvolveInventory_SerialNo: req.body.EvolveInventory_SerialNo,
                        EvolveTransHistory_Type: 'MATERIALISSUED',
                        EvolveTransHistory_BatchNo: req.body.invDetails.EvolveInventory_BatchNo,
                        EvolveTransHistory_LotSerialNo: req.body.invDetails.EvolveInventory_LotSerialNo,

                    }
                    console.log("transDetails?? ", transDetails)
                    await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);
                    let updateIssuedQty = await Evolve.App.Services.SmartFactory.MixingProductionBooking.MixingProductionBookingSrv.updateIssuedQty(req.body);
                    if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
                        errorMessage = 'Error while UpDate IssuedQty'
                    }

                }
            }

            // }

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Material Consumed Successfully' : errorMessage, result: null };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Consume Ineventory" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while Consume Ineventory",
                result: null
            };
            res.send(obj);
        }
    },



}