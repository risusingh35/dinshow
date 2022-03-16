'use strict';
const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getMachineStartList: async function(data) {
        try {
            console.log("getMachineStartList::::::::::::::::::", data);
            for (let index = 0; index < Evolve.MixingStartPODatils.length; index++) {

                if (Evolve.MixingStartPODatils[index].EvolveMachine_ID == data.EvolveMachine_ID) {
                    console.log(" Evolve.MixingStartPODatils[index]:::::::::::::", Evolve.MixingStartPODatils[index]);
                    await Evolve.Io.emit('MachineFlag' + data.topicName, {
                        list: Evolve.MixingStartPODatils[index]
                    });
                }

            }
            console.log("Evolve.MixingStartPODatils::::::::::::", Evolve.MixingStartPODatils);


        } catch (error) {
            console.log(error);
        }
    },
    getJobOrderList: async function(req, res) {
        try {
            let getJobOrderList = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.getJobOrderList(req.body.Machine_Code);
            if (getJobOrderList instanceof Error || getJobOrderList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get JobOrder ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "JobOrder List! ",
                    result: getJobOrderList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get JobOrder " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get JobOrder ",
                result: null
            };
            res.send(obj);
        }
    },

    getTransHistory: async function(req, res) {
        try {
            req.body.EvolveTransHistory_Type = 'MATERIALISSUED';
            let getTransHistory = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.getTransHistory(req.body);
            if (getTransHistory instanceof Error) {
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
                    result: getTransHistory.recordset
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

    getBomDatailsList: async function(req, res) {
        try {
            let getBomDatailsList = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.getBomDatailsList(req.body.EvolveProdOrders_ID);
            console.log("getBomDatailsList/? ", getBomDatailsList)
            if (getBomDatailsList instanceof Error || getBomDatailsList.rowsAffected < 1) {
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
                    message: "BOM Datils List! ",
                    result: getBomDatailsList.recordset
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

    updateIssuedQty: async function(req, res) {
        try {
            let errorMessage = '';
            req.body.EvolveUser_ID = req.body.EvolveUser_ID == undefined ? null : req.body.EvolveUser_ID;
            // let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.updateIssuedQty(req.body);
            // if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
            //     errorMessage = 'Error while UpDate IssuedQty'
            // } else {
            // if (req.body.EvolveInventory_SerialNo == undefined || req.body.EvolveInventory_SerialNo == '' || req.body.EvolveInventory_SerialNo == null) {

            //     console.log("ENTERED IN IFFFFFF")
            //     let qtyToIssued = req.body.qty;
            //     let invToIssued = [];
            //     let ttMultWOComponents = [];

            //     let invList = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.getInvList(req.body);

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

            //         let date = new Date()

            //         let month = (date.getMonth() + 1).toString();

            //         month = month.length < 2 ? '0' + `${month + ''}` : month;
            //         let currentDate = date.getFullYear() + '-' + (month) + '-' + date.getDate();

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
            //                 "machine": {},
            //                 "routing": req.body.parentPart,
            //                 "bomCode": {},
            //                 "operation": "10",
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
            //                                     "qcom:propertyValue": "CFD01"
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
            //         let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config).catch((e) => {
            //             console.log("Error While Fire Qextend::::::::::::::", e.message);

            //             errorMessage = e.message
            //         });


            //         if (comIssueResponse) {


            //             await Evolve.Xml2JS.parseString(comIssueResponse.data, async function(err, resPonsedXml) {
            //                 try {
            //                     if (err) {
            //                         // error = true;
            //                         errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING FILE TO ERP';

            //                     } else {
            //                         console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
            //                         let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns1:result'][0];
            //                         console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult", result)
            //                         if (result == 'error') {
            //                             // error = true;
            //                             // errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);

            //                             errorMessage = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]
            //                         } else {


            //                         }
            //                     }
            //                 } catch (error) {

            //                     errorMessage = " EERR2713: Error while Component Issue " + error.message;

            //                 }
            //             });
            //         } else {
            //             console.log("error.message", error.message);
            //             // error = true;
            //             errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
            //         }
            //     }

            //     if (errorMessage == '') {

            //         for (let i = 0; i < invToIssued.length; i++) {
            //             let updateInv = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.updateInventory(invToIssued[i]);
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

            //         let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.updateIssuedQty(req.body);
            //         if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
            //             errorMessage = 'Error while UpDate IssuedQty'
            //         }

            //     }

            // }
            //  else {



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
                                    "qtyToIssue": "None",
                                    "operation": "10",
                                    "ttMultWOComponents": {
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
                                        "operation": "10",
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
            let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config).catch((e) => {
                console.log("Error While Fire Qextend::::::::::::::", e.message);
                //   error = true;
                errorMessage = e.message
            });

            if (comIssueResponse) {

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
            } else {
                console.log("error.message", error.message);
                // error = true;
                errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
            }

            if (errorMessage == '') {


                let updateInv = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.updateInventory(req.body);
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
                    let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.updateIssuedQty(req.body);
                    if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
                        errorMessage = 'Error while UpDate IssuedQty'
                    }

                }
            }

            // }

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Material Consumed Successfully' : errorMessage, result: null };
            res.send(obj);
            // }
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


    checkInventory: async function(req, res) {
        try {
            let errorMessage = '';

            console.log("req.body/????", req.body)
            let checkInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.checkInventoryPallet(req.body);


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



    getMixingMachineList: async function(req, res) {
        try {

            let errMsg = await Evolve.App.Services.Common.SrvCommon.getTranslation(req.EvolveLanguage_ID,'EERR####');

            let getMixingMachineList = await Evolve.App.Services.SmartFactory.ProductionBooking.Mixing.getMixingMachineList();
            if (getMixingMachineList instanceof Error || getMixingMachineList.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errMsg,
                    result: null
                };
                res.send(obj);
            } else {
                console.log("getMixingMachineList.recordset?????????????", getMixingMachineList.recordset);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "JobOrder List! ",
                    result: getMixingMachineList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get JobOrder " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get JobOrder ",
                result: null
            };
            res.send(obj);
        }
    },

    getMachineStatus: async function() {
        try {
            console.log("getMachineStatus::::::::::::::::::");
            await Evolve.Io.emit('allMachineData', {
                list: Evolve.MixingStartPODatils
            });

        } catch (error) {
            console.log(error);
        }
    },





}