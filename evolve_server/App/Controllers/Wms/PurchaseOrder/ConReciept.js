'use strict';
const { isError } = require('joi');
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    getPoRcptList: async function (req, res) {
        try {

            console.log("ENETRRED IN GET PO RCPT LISt")
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let EvolveUnit_ID = req.EvolveUnit_ID;
            let condition = '';
            if (req.body.postingstatus != null && req.body.postingstatus != '' && req.body.postingstatus != undefined) {
                condition += " AND EvolvePurchaseOrderRcpt_ErpPostedStatus = '" + req.body.postingstatus + "'"
            }
            let count = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.getPoRcptListCount(search, condition, EvolveUnit_ID);

            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.getPoRcptList(start, length, search, condition, EvolveUnit_ID);

            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get inventory list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get inventory list!",
                    result: result.message
                };
                res.send(obj);
            } else {

                result.recordset = result.recordset.map(v => {

                    if (v.EvolvePurchaseOrderDetails_Type == 'M') {

                        v.EvolveItem_Part = v.EvolvePurchaseOrderDetails_MemoItem;
                    }
                    return v
                })


                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset,
                    // settingList : settingList 
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get inventory list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get inventory list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    poRcptPostToErp: async function (req, res) {
        try {
            let errorMessage = 'No Pallet Selected For Post To ERP';

            let isPalletFound = false;

            let batchNumberArray = [];

            let error = false;


            for (let i = 0; i < req.body.palletToBePOst.length; i++) {

                if (req.body.palletToBePOst[i].isSelected == true && req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ErpPostedStatus != 'POSTED') {

                    console.log("req.body.palletToBePOst[i]", req.body.palletToBePOst[i]);
                    let shipperId = await Evolve.Generator.generate('SHIPPER').replace(" - ", "");
                    req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ShipperId = shipperId;

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
                                "wsa:ReferenceParameters": {
                                    "qcom:suppressResponseDetail": "true"
                                },
                                "wsa:ReplyTo": {
                                    "wsa:Address": "urn:services-qad-com:"
                                }
                            },
                            "soapenv:Body": {
                                "EvolveFiscal": {
                                    "qcom:dsSessionContext": {
                                        'qcom:ttContext': [
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "domain",
                                                'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "scopeTransaction",
                                                'qcom:propertyValue': "false"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "version",
                                                'qcom:propertyValue': "ERP_1"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "mnemonicsRaw",
                                                'qcom:propertyValue': "false"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "username",
                                                'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "password",
                                                'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "action",
                                                'qcom:propertyValue': [""]
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "entity",
                                                'qcom:propertyValue': "CFD01"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "email",
                                                'qcom:propertyValue': [""]
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "emailLevel",
                                                'qcom:propertyValue': [""]
                                            },
                                        ]
                                    },
                                    "dsEvolvePOFiscal": {
                                        "EvolvePOFiscal": {
                                            "operation": "A",
                                            "absShipfrom": req.body.palletToBePOst[i].EvolveSupplier_Code,
                                            "absId": shipperId,
                                            "absShipto": req.body.palletToBePOst[i].EvolveUnit_Code,
                                            "carrierRef": "123456789",
                                            "absShpDate": "",
                                            "absArrDate": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_CreatedAt,
                                            "absiDueDate": req.body.palletToBePOst[i].EvolvePurchaseOrderDetails_DueDate,
                                            "cmmts": "False",
                                            "taxEdit": "False",
                                            "PODetails": {
                                                "operation": "A",
                                                "scxPart": req.body.palletToBePOst[i].EvolveItem_Part,
                                                "scxPo": req.body.palletToBePOst[i].EvolvePurchaseOrder_Number,
                                                "scxLine": req.body.palletToBePOst[i].EvolvePurchaseOrderDetails_LineNo,
                                                "taxEnv": req.body.palletToBePOst[i].EvolveTaxEnvironment_Code,
                                                "taxIn": "False",
                                                "wsrQty": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_Qty,
                                                "transUm": req.body.palletToBePOst[i].EvolveUom_Uom,
                                                "wsrSite": req.body.palletToBePOst[i].EvolveUnit_Code,
                                                "wsrLoc": req.body.palletToBePOst[i].EvolveLocation_Code,
                                                "wsrLotser": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_SerialNo,
                                                "wsrRef": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_BatchNo,
                                                "lAbsVendLot": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_SupplierBatchNo,
                                                "multiEntry": "False",
                                                "hCmmt": "False",
                                                "lCmmt": "False",
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let xmldoc = Evolve.Xmlbuilder.create(xmlObj);
                    // console.log(xmldoc.end({ pretty: true }));
                    let xmlFileData = xmldoc.end({ pretty: true });
                    xmlFileData = xmlFileData.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
                    console.log("xmlFileData:::::::::::::::::::::::::", xmlFileData);

                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                            //'Content-Length': xmldoc.length 
                        }
                    }

                    let responce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileData, config).catch((e) => {
                        console.log("Error While Fire Qextend::::::::::::::", e.message);
                        error = true;
                        errorMessage = e.message
                    });
                    if (responce) {
                        Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileDataNew) {
                            if (err) {
                                console.log("issue in xml formate")
                            } else {
                                console.log("no issue XML Formate ", xmlFileDataNew);
                                // Check if is For PO LIst
                                try {

                                    console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns1:result'][0]);
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns1:result'][0] != 'error') {

                                    } else {
                                        console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns1:result'][0]);
                                        error = true;
                                        errorMessage = "Error While Update Data Via Qxtenxd";
                                        i = req.body.palletToBePOst.length;
                                    }
                                } catch (error) {
                                    console.log("error.message", error.message);
                                    error = true;
                                    errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                    i = req.body.palletToBePOst.length;
                                }

                            }
                        });
                    } else {
                        i = req.body.palletToBePOst.length;
                    }
                }
            }

            if (error == false) {
                for (let i = 0; i < req.body.palletToBePOst.length; i++) {

                    if (req.body.palletToBePOst[i].isSelected == true && req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ErpPostedStatus != 'POSTED') {
                        let xmlObjForConfirmShippper = {
                            "soapenv:Envelope": {
                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                "soapenv:Header": {
                                    "wsa:Action": "",
                                    "wsa:To": "urn:services-qad-com:QADERP",
                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                    "wsa:ReferenceParameters": {
                                        "qcom:suppressResponseDetail": "true"
                                    },
                                    "wsa:ReplyTo": {
                                        "wsa:Address": "urn:services-qad-com:"
                                    }
                                },
                                "soapenv:Body": {
                                    "Poshiprec": {
                                        "qcom:dsSessionContext": {
                                            'qcom:ttContext': [
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "domain",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "scopeTransaction",
                                                    'qcom:propertyValue': "true"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "version",
                                                    'qcom:propertyValue': "eB_1"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "mnemonicsRaw",
                                                    'qcom:propertyValue': "false"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "username",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "password",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "action",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "entity",
                                                    'qcom:propertyValue': "CFD01"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "email",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "emailLevel",
                                                    'qcom:propertyValue': [""]
                                                },
                                            ]
                                        },
                                        "dsDetail": {
                                            "detail": {
                                                "operation": "A",
                                                "absShipfrom": req.body.palletToBePOst[i].EvolveSupplier_Code,
                                                "absId": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ShipperId,
                                                "effDate": req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_CreatedAt,
                                                "yn": "true"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let xmldocForConfirmShippper = Evolve.Xmlbuilder.create(xmlObjForConfirmShippper);
                        // console.log(xmldoc.end({ pretty: true }));
                        let xmlFileDataForConfirmShippper = xmldocForConfirmShippper.end({ pretty: true });
                        console.log("xmlFileDataForConfirmShippper", xmlFileDataForConfirmShippper);
                        xmlFileDataForConfirmShippper = xmlFileDataForConfirmShippper.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)

                        let config = {
                            headers: {
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'SOAPAction': "",
                                'Host': Evolve.Config.QXTENHOST,
                                'Connection': 'Keep - Alive',
                                'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                //'Content-Length': xmldoc.length 
                            }
                        }

                        let responcexmldocForConfirmShippper = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileDataForConfirmShippper, config).catch((e) => {
                            console.log("Error While Fire Qextend::::::::::::::", e.message);
                            error = true;
                            errorMessage = e.message
                        });

                        if (responcexmldocForConfirmShippper) {
                            Evolve.Xml2JS.parseString(responcexmldocForConfirmShippper.data, async function (err, xmlFileDataNew) {
                                if (err) {
                                    console.log("issue in xml formate")
                                } else {
                                    console.log("no issue XML Formate ", xmlFileDataNew);
                                    try {
                                        console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0]);
                                        if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0] != 'error') {

                                        } else {
                                            console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0]);
                                            error = true;
                                            errorMessage = "Error While Update Data Via Qxtenxd";
                                            i = req.body.palletToBePOst.length;
                                        }
                                    } catch (error) {
                                        console.log("error.message", error.message);
                                        error = true;
                                        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                        i = req.body.palletToBePOst.length;
                                    }
                                };
                            });


                        } else {
                            console.log("error.message", error.message);
                            error = true;
                            errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                            i = req.body.palletToBePOst.length;
                        }
                    }
                }
            }


            console.log("error", error);

            if (error == false) {
                for (let i = 0; i < req.body.palletToBePOst.length; i++) {

                    console.log("req.body.palletToBePOst[i].ei.EvolveQCTemp_ID????", req.body.palletToBePOst[i].EvolveQCTemp_ID)

                    if (req.body.palletToBePOst[i].isSelected == true && req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ErpPostedStatus != 'POSTED') {
                        errorMessage = isPalletFound == false ? '' : errorMessage;
                        isPalletFound = true;
                        req.body.palletToBePOst[i].EvolveUser_ID = req.EvolveUser_ID;
                        req.body.palletToBePOst[i].EvolveInventory_Status = (req.body.palletToBePOst[i].EvolveQCTemp_ID == null || req.body.palletToBePOst[i].EvolveQCTemp_ID == undefined) ? 'AVAILABLE' : 'QCHOLD';

                        let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addInventory(req.body.palletToBePOst[i]);
                        if (addInventory instanceof Error || addInventory.rowsAffected < 1) {

                            errorMessage = "Error While Add Invenrory Data";

                        } else {
                            let updateUnpostedQty = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateUnpostedQty(req.body.palletToBePOst[i]);
                            if (updateUnpostedQty instanceof Error || updateUnpostedQty.rowsAffected < 1) {

                                errorMessage = "Error While Add Invenrory Data";

                            } else {
                                let changeStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.changePorcptStatus(req.body.palletToBePOst[i]);
                                if (changeStatus instanceof Error || changeStatus.rowsAffected < 1) {

                                    errorMessage = "Error While Change Po Rcpt  Status";

                                } else {
                                    if (req.body.palletToBePOst[i].EvolveQCTemp_ID != null && req.body.palletToBePOst[i].EvolveQCTemp_ID != undefined) {
                                        let indexOfCurrentBatch = batchNumberArray.findIndex(batchObj => batchObj.EvolvePurchaseOrderRcpt_BatchNo == req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_BatchNo)
                                        if (indexOfCurrentBatch == -1) {
                                            batchNumberArray.push({
                                                EvolvePurchaseOrderRcpt_BatchNo: req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_BatchNo,
                                                EvolveUnit_ID: req.body.palletToBePOst[i].EvolveUnit_ID,
                                                EvolveUser_ID: req.body.palletToBePOst[i].EvolveUser_ID,
                                                palletDetails: []
                                            });
                                            batchNumberArray[(batchNumberArray.length - 1)].palletDetails.push(req.body.palletToBePOst[i]);
                                        } else {
                                            batchNumberArray[indexOfCurrentBatch].palletDetails.push(req.body.palletToBePOst[i]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                let errorInQcAdd = false;
                let errorMessageForQcAdd = "";
                for (let i = 0; i < batchNumberArray.length; i++) {
                    if (batchNumberArray[i].palletDetails[0].EvolvePurchaseOrderDetails_Type != "M") {
                        let generatedQCOrderNumber = await Evolve.Generator.generate('QC');
                        batchNumberArray[i].EvolveQCOrder_Num = generatedQCOrderNumber.replace(" - ", "");
                        let addNewQcOrder = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrder(batchNumberArray[i]);
                        if (addNewQcOrder instanceof Error || addNewQcOrder.rowsAffected < 1) {
                            errorInQcAdd = true;
                            errorMessageForQcAdd = "Error While Add Record In QC!!"
                        } else {
                            batchNumberArray[i].EvolveQCOrder_ID = addNewQcOrder.recordset[0].inserted_id;
                            for (let j = 0; j < batchNumberArray[i].palletDetails.length; j++) {
                                batchNumberArray[i].palletDetails[j].EvolveQCOrder_ID = batchNumberArray[i].EvolveQCOrder_ID;
                                if (errorInQcAdd == false) {
                                    let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(batchNumberArray[i].palletDetails[j]);
                                    if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                        errorInQcAdd = true;
                                        errorMessageForQcAdd = "Error While Add Record In QC Details !!";
                                    }
                                }
                            }
                        }
                    }
                }
                errorMessage = errorMessageForQcAdd;
                let obj = {
                    statusCode: errorMessage == '' ? 200 : 400,
                    status: errorMessage == '' ? "success" : "fail",
                    message: errorMessage == '' ? 'Pallet Posted To Erp Successfully' : errorMessage,
                    result: null,
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get inventory list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get inventory list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    poRcptPostToErpNew: async function (req, res) {
        try {
            let selectedPalletDetails = [];
            let error = false;
            let errorMessage = "";
            console.log("req.body.palletToBePOst",req.body.palletToBePOst);
            for (let i = 0; i < req.body.palletToBePOst.length; i++) {
                if (req.body.palletToBePOst[i].isSelected == true && req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ErpPostedStatus != 'POSTED') {
                    let findIndex = selectedPalletDetails.findIndex(data => data.EvolvePurchaseOrder_Number == req.body.palletToBePOst[i].EvolvePurchaseOrder_Number && data.EvolvePurchaseOrderRcpt_InvoiceNumber == req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_InvoiceNumber && data.EvolvePurchaseOrderRcpt_LotSerialNo == req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_LotSerialNo)
                    if (findIndex == -1) {
                        selectedPalletDetails.push({
                            EvolvePurchaseOrder_Number: req.body.palletToBePOst[i].EvolvePurchaseOrder_Number,
                            EvolvePurchaseOrderRcpt_InvoiceNumber: req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_InvoiceNumber,
                            EvolvePurchaseOrderRcpt_LotSerialNo : req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_LotSerialNo,
                            EvolveSupplier_Code: req.body.palletToBePOst[i].EvolveSupplier_Code,
                            EvolveUnit_Code: req.body.palletToBePOst[i].EvolveUnit_Code,
                            EvolveUnit_ID: req.body.palletToBePOst[i].EvolveUnit_ID,
                            EvolveUser_ID: req.EvolveUser_ID,
                            EvolvePurchaseOrderRcpt_CreatedAt: req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_CreatedAt,
                            EvolvePurchaseOrderDetails_DueDate: req.body.palletToBePOst[i].EvolvePurchaseOrderDetails_DueDate,

                            lineDetials: [req.body.palletToBePOst[i]]
                        });
                    } else {
                        selectedPalletDetails[findIndex].lineDetials.push(req.body.palletToBePOst[i])
                    }
                }
            }

            console.log("selectedPalletDetails",selectedPalletDetails);

            if (selectedPalletDetails.length > 0) {

                for (let i = 0; i < selectedPalletDetails.length; i++) {
                    let PODetails = [];
                    for (let j = 0; j < selectedPalletDetails[i].lineDetials.length; j++) {
                        let objDetails = {
                            "operation": "A",
                            "scxPart": selectedPalletDetails[i].lineDetials[j].EvolveItem_Part,
                            "scxPo": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrder_Number,
                            "scxLine": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrderDetails_LineNo,
                            "taxEnv": selectedPalletDetails[i].lineDetials[j].EvolveTaxEnvironment_Code,
                            "taxIn": "False",
                            "wsrQty": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrderRcpt_Qty,
                            "transUm": selectedPalletDetails[i].lineDetials[j].EvolveUom_Uom,
                            "wsrSite": selectedPalletDetails[i].lineDetials[j].EvolveUnit_Code,
                            "wsrLoc": selectedPalletDetails[i].lineDetials[j].EvolveLocation_Code,
                            "wsrLotser": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrderRcpt_LotSerialNo,
                            "wsrRef": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrderRcpt_SerialNo,
                            "lAbsVendLot": selectedPalletDetails[i].lineDetials[j].EvolvePurchaseOrderRcpt_SupplierBatchNo,
                            "multiEntry": "False",
                            "hCmmt": "False",
                            "lCmmt": "False",
                        };
                        PODetails.push(objDetails);
                    }

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
                                "wsa:ReferenceParameters": {
                                    "qcom:suppressResponseDetail": "true"
                                },
                                "wsa:ReplyTo": {
                                    "wsa:Address": "urn:services-qad-com:"
                                }
                            },
                            "soapenv:Body": {
                                "EvolveFiscal": {
                                    "qcom:dsSessionContext": {
                                        'qcom:ttContext': [
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "domain",
                                                'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "scopeTransaction",
                                                'qcom:propertyValue': "false"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "version",
                                                'qcom:propertyValue': "ERP_1"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "mnemonicsRaw",
                                                'qcom:propertyValue': "false"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "username",
                                                'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "password",
                                                'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "action",
                                                'qcom:propertyValue': [""]
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "entity",
                                                'qcom:propertyValue': "CFD01"
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "email",
                                                'qcom:propertyValue': [""]
                                            },
                                            {
                                                'qcom:propertyQualifier': "QAD",
                                                'qcom:propertyName': "emailLevel",
                                                'qcom:propertyValue': [""]
                                            },
                                        ]
                                    },
                                    "dsEvolvePOFiscal": {
                                        "EvolvePOFiscal": {
                                            "operation": "A",
                                            "absShipfrom": selectedPalletDetails[i].EvolveSupplier_Code,
                                            "absId": selectedPalletDetails[i].EvolvePurchaseOrderRcpt_InvoiceNumber,
                                            "absShipto": selectedPalletDetails[i].EvolveUnit_Code,
                                            "carrierRef": "123456789",
                                            "absShpDate": "",
                                            "absArrDate": selectedPalletDetails[i].EvolvePurchaseOrderRcpt_CreatedAt,
                                            "absiDueDate": selectedPalletDetails[i].EvolvePurchaseOrderDetails_DueDate,
                                            "cmmts": "False",
                                            "taxEdit": "False",
                                            PODetails
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let xmldoc = Evolve.Xmlbuilder.create(xmlObj);
                    // console.log(xmldoc.end({ pretty: true }));
                    let xmlFileData = xmldoc.end({ pretty: true });
                    xmlFileData = xmlFileData.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
                    console.log("xmlFileData:::::::::::::::::::::::::", xmlFileData);

                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                            //'Content-Length': xmldoc.length 
                        }
                    }

                    let responce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileData, config).catch((e) => {
                        console.log("Error While Fire Qextend::::::::::::::", e.message);
                        error = true;
                        errorMessage = e.message
                    });
                    if (responce) {
                        Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileDataNew) {
                            if (err) {
                                console.log("issue in xml formate")
                            } else {
                                console.log("no issue XML Formate ", xmlFileDataNew);
                                // Check if is For PO LIst
                                try {

                                    console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns1:result'][0]);
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns1:result'][0] != 'error') {

                                    } else {
                                        console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]);
                                        error = true;
                                        errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveFiscalResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];
                                        i = req.body.palletToBePOst.length;
                                    }
                                } catch (error) {
                                    console.log("error.message", error.message);
                                    error = true;
                                    errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                    i = req.body.palletToBePOst.length;
                                }

                            }
                        });
                    } else {
                        i = req.body.palletToBePOst.length;
                    }
                };

                if (error == false) {
                    for (let i = 0; i < selectedPalletDetails.length; i++) {
                        selectedPalletDetails[i].EvolvePurchaseOrderRcpt_ShipperId = selectedPalletDetails[i].EvolvePurchaseOrderRcpt_InvoiceNumber;
                        let xmlObjForConfirmShippper = {
                            "soapenv:Envelope": {
                                "@xmlns": "urn:schemas-qad-com:xml-services",
                                "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                                "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                                "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                                "soapenv:Header": {
                                    "wsa:Action": "",
                                    "wsa:To": "urn:services-qad-com:QADERP",
                                    "wsa:MessageID": "urn:services-qad-com::QADERP",
                                    "wsa:ReferenceParameters": {
                                        "qcom:suppressResponseDetail": "true"
                                    },
                                    "wsa:ReplyTo": {
                                        "wsa:Address": "urn:services-qad-com:"
                                    }
                                },
                                "soapenv:Body": {
                                    "Poshiprec": {
                                        "qcom:dsSessionContext": {
                                            'qcom:ttContext': [
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "domain",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDDOMAIN
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "scopeTransaction",
                                                    'qcom:propertyValue': "true"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "version",
                                                    'qcom:propertyValue': "eB_1"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "mnemonicsRaw",
                                                    'qcom:propertyValue': "false"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "username",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDUSERNAME
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "password",
                                                    'qcom:propertyValue': Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "action",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "entity",
                                                    'qcom:propertyValue': "CFD01"
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "email",
                                                    'qcom:propertyValue': [""]
                                                },
                                                {
                                                    'qcom:propertyQualifier': "QAD",
                                                    'qcom:propertyName': "emailLevel",
                                                    'qcom:propertyValue': [""]
                                                },
                                            ]
                                        },
                                        "dsDetail": {
                                            "detail": {
                                                "operation": "A",
                                                "absShipfrom": selectedPalletDetails[i].EvolveSupplier_Code,
                                                "absId": selectedPalletDetails[i].EvolvePurchaseOrderRcpt_InvoiceNumber,
                                                "effDate": selectedPalletDetails[i].EvolvePurchaseOrderRcpt_CreatedAt,
                                                "yn": "true"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        let xmldocForConfirmShippper = Evolve.Xmlbuilder.create(xmlObjForConfirmShippper);
                        // console.log(xmldoc.end({ pretty: true }));
                        let xmlFileDataForConfirmShippper = xmldocForConfirmShippper.end({ pretty: true });
                        console.log("xmlFileDataForConfirmShippper", xmlFileDataForConfirmShippper);
                        xmlFileDataForConfirmShippper = xmlFileDataForConfirmShippper.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)

                        let config = {
                            headers: {
                                'Accept-Encoding': 'gzip, deflate',
                                'Content-Type': 'text/xml;charset=UTF-8',
                                'SOAPAction': "",
                                'Host': Evolve.Config.QXTENHOST,
                                'Connection': 'Keep - Alive',
                                'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                                //'Content-Length': xmldoc.length 
                            }
                        }

                        let responcexmldocForConfirmShippper = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileDataForConfirmShippper, config).catch((e) => {
                            console.log("Error While Fire Qextend::::::::::::::", e.message);
                            error = true;
                            errorMessage = e.message
                        });

                        if (responcexmldocForConfirmShippper) {
                            Evolve.Xml2JS.parseString(responcexmldocForConfirmShippper.data, async function (err, xmlFileDataNew) {
                                if (err) {
                                    console.log("issue in xml formate")
                                } else {
                                    console.log("no issue XML Formate ", xmlFileDataNew);
                                    try {
                                        console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0]);
                                        if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0] != 'error') {

                                        } else {
                                            console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns1:result'][0]);
                                            error = true;
                                            errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:PoshiprecResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];
                                            i = req.body.palletToBePOst.length;
                                        }
                                    } catch (error) {
                                        console.log("error.message", error.message);
                                        error = true;
                                        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                        i = req.body.palletToBePOst.length;
                                    }
                                };
                            });


                        } else {
                            console.log("error.message", error.message);
                            error = true;
                            errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                            i = req.body.palletToBePOst.length;
                        }
                    }
                };

                if(error == false) {
                    for (let i = 0; i < req.body.palletToBePOst.length; i++) {
    
                        if (req.body.palletToBePOst[i].isSelected == true && req.body.palletToBePOst[i].EvolvePurchaseOrderRcpt_ErpPostedStatus != 'POSTED') {
                            
                            
                            req.body.palletToBePOst[i].EvolveUser_ID = req.EvolveUser_ID;
                            req.body.palletToBePOst[i].EvolveInventory_Status = (req.body.palletToBePOst[i].EvolveQCTemp_ID == null || req.body.palletToBePOst[i].EvolveQCTemp_ID == undefined) ? 'AVAILABLE' : 'QCHOLD';
    
                            let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addInventory(req.body.palletToBePOst[i]);
                            if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                                error = true;
                                errorMessage = "Error While Add Invenrory Data";
    
                            } else {
                                let updateUnpostedQty = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateUnpostedQty(req.body.palletToBePOst[i]);
                                if (updateUnpostedQty instanceof Error || updateUnpostedQty.rowsAffected < 1) {
                                    error = true;
                                    errorMessage = "Error While Add Invenrory Data";
    
                                } else {
                                    let changeStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.changePorcptStatus(req.body.palletToBePOst[i]);
                                    if (changeStatus instanceof Error || changeStatus.rowsAffected < 1) {
                                        error = true;
                                        errorMessage = "Error While Change Po Rcpt  Status";
    
                                    }
                                }
                            }
                        }
                    }
                };

                if(error == false) {
                    for (let i = 0; i < selectedPalletDetails.length; i++) {
                        if(selectedPalletDetails[i].lineDetials[0].EvolveQCTemp_ID != null && selectedPalletDetails[i].lineDetials[0].EvolveQCTemp_ID != undefined) {
                            if (selectedPalletDetails[i].lineDetials[0].EvolvePurchaseOrderDetails_Type != "M") {
                                let generatedQCOrderNumber = await Evolve.Generator.generate('QC');
                                selectedPalletDetails[i].EvolveQCOrder_Num = generatedQCOrderNumber.replace(" - ", "");
                                let addNewQcOrder = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrder(selectedPalletDetails[i]);
                                if (addNewQcOrder instanceof Error || addNewQcOrder.rowsAffected < 1) {
                                    error = true;
                                    errorMessage = "Error While Add Record In QC!!"
                                } else {
                                    selectedPalletDetails[i].EvolveQCOrder_ID = addNewQcOrder.recordset[0].inserted_id;
                                    for (let j = 0; j < selectedPalletDetails[i].lineDetials.length; j++) {
                                        selectedPalletDetails[i].lineDetials[j].EvolveQCOrder_ID = selectedPalletDetails[i].EvolveQCOrder_ID;
                                        if (error == false) {
                                            let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(selectedPalletDetails[i].lineDetials[j]);
                                            if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                                error = true;
                                                errorMessage = "Error While Add Record In QC Details !!";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                if(error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: 'Pallet Posted To Erp Successfully',
                        result: null,
                    };
                    res.send(obj);
                }else{
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errorMessage,
                        result: null
                    };
                    res.send(obj);
                };

            }






        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Post To Erp !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Post To Erp !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },



    onUploadInventryCsv: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'INventory_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                csv.mv(Evolve.Config.WEBSHOPCSVPATH + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv({
                            trim: false,
                            ignoreEmpty: true,
                        }).fromFile(Evolve.Config.WEBSHOPCSVPATH + fileName);
                        let errorMessage = '';
                        for (let i = 0; i < csvDataArray.length; i++) {
                            if (csvDataArray[i]['Item Number'] == '' && csvDataArray[i]['Item Number'] == undefined && csvDataArray[i]['Item Number'] == null && csvDataArray[i]['Site'] == '' && csvDataArray[i]['Site'] == undefined && csvDataArray[i]['Site'] == null && csvDataArray[i]['Qty On Hand - Inv Mstr'] == '' && csvDataArray[i]['Qty On Hand - Inv Mstr'] == undefined && csvDataArray[i]['Qty On Hand - Inv Mstr'] == null && csvDataArray[i]['Location'] == '' && csvDataArray[i]['Location'] == undefined && csvDataArray[i]['Location'] == null && csvDataArray[i]['Lot/Serial'] == '' && csvDataArray[i]['Lot/Serial'] == undefined && csvDataArray[i]['Lot/Serial'] == null) {

                                errorMessage = 'Error In Upload Inventory !! File Is Not Proper !! '

                            }
                        }

                        if (errorMessage == '') {

                            for (let i = 0; i < csvDataArray.length; i++) {

                                if (errorMessage == '') {

                                    let checkLocation = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkInventoryLocation(csvDataArray[i]['Location']);


                                    if (checkLocation instanceof Error) {

                                        errorMessage = 'Error While Check Location ' + csvDataArray[i]['Location'];

                                    } else if (checkLocation.rowsAffected < 1) {

                                        errorMessage = 'Location ' + csvDataArray[i]['Location'] + ' Not Found ';


                                    } else {

                                        let createdDate = null
                                        if (csvDataArray[i]['Created'] != '' && csvDataArray[i]['Created'] != undefined && csvDataArray[i]['Created'] != null) {

                                            let dt = csvDataArray[i]['Created'].split("-")
                                            createdDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                                        }

                                        let data = {

                                            EvolveItem_Code: csvDataArray[i]['Item Number'].trimEnd(),
                                            EvolveUnit_Code: csvDataArray[i]['Site'],
                                            EvolveInventory_QtyOnHand: ((csvDataArray[i]['Qty On Hand - Inv Detail'] + '').replace(/,/g, '')),
                                            EvolveItem_ID: null,
                                            EvolveUnit_ID: null,
                                            EvolveUser_ID: req.EvolveUser_ID,
                                            EvolveLocation_ID: checkLocation.recordset[0].EvolveLocation_ID,
                                            EvolveInventory_LotNumber: csvDataArray[i]['Lot/Serial'],
                                            EvolveInventory_RefNumber: csvDataArray[i]['Ref'] == undefined ? '' : csvDataArray[i]['Ref'],
                                            EvolveInventory_CreatedAt: createdDate


                                        }

                                        let unitId = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkUnitCode(data.EvolveUnit_Code);
                                        if (unitId instanceof Error) {
                                            errorMessage = "Error while check unit code"
                                        } else if (unitId.rowsAffected > 0) {

                                            data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                                            let itemID = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkItemCode(data.EvolveItem_Code);
                                            if (itemID instanceof Error) {
                                                errorMessage = "Error While Check  Item Code";
                                            } else if (itemID.rowsAffected > 0) {

                                                data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                                                let checkInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkInventory(data);
                                                if (checkInventory instanceof Error) {
                                                    errorMessage = "Error While Check Inventory";
                                                } else if (checkInventory.rowsAffected > 0) {

                                                    data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                                                    let updateInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateInventory(data);
                                                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                                                        errorMessage = "Error While update inventory";
                                                    }
                                                } else {

                                                    let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addInventory(data);
                                                    if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                                                        errorMessage = 'Error While Add Inventory'
                                                    }
                                                }
                                            } else {
                                                errorMessage = "Item Code " + data.EvolveItem_Code + " Not Found";

                                            }
                                        } else {
                                            errorMessage = "Site Code " + data.EvolveUnit_Code + " Not Found";

                                        }

                                    }

                                }



                            }

                            //     // let uniqData = [];
                            //     // for (let i = 0; i < csvDataArray.length; i++) {

                            //     //     let isDuplicate = false;

                            //     //     for (let j = 0; j < uniqData.length; j++) {

                            //     //         if ((uniqData[j]['Item Number'] == csvDataArray[i]['Item Number']) && (uniqData[j]['Site'] == csvDataArray[i]['Site']) && (uniqData[j]['Qty On Hand - Inv Mstr'] == csvDataArray[i]['Qty On Hand - Inv Mstr'])) {

                            //     //             isDuplicate = true;

                            //     //         }
                            //     //     }
                            //     //     if (!isDuplicate) {
                            //     //         uniqData.push(csvDataArray[i])
                            //     //     }
                            //     // }

                            //     // for (let i = 0; i < uniqData.length; i++) {
                            //     //     if (uniqData[i]['Item Number'] != '' && uniqData[i]['Item Number'] != undefined && uniqData[i]['Item Number'] != null && uniqData[i]['Site'] != '' && uniqData[i]['Site'] != undefined && uniqData[i]['Site'] != null && uniqData[i]['Qty On Hand - Inv Mstr'] != '' && uniqData[i]['Qty On Hand - Inv Mstr'] != undefined && uniqData[i]['Qty On Hand - Inv Mstr'] != null) {
                            //     //         let data = {

                            //     //             EvolveItem_Code: uniqData[i]['Item Number'].trimEnd(),
                            //     //             EvolveUnit_Code: uniqData[i]['Site'],
                            //     //             EvolveInventory_QtyOnHand: ((uniqData[i]['Qty On Hand - Inv Mstr'] + '').replace(/,/g, '')),
                            //     //             EvolveItem_ID: null,
                            //     //             EvolveUnit_ID: null,
                            //     //             EvolveUser_ID: req.EvolveUser_ID
                            //     //         }
                            //     //         let unitId = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkUnitCode(data.EvolveUnit_Code);
                            //     //         if (unitId instanceof Error) {
                            //     //             errorMessage = "Error while check unit code"
                            //     //         } else if (unitId.rowsAffected > 0) {

                            //     //             data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                            //     //             let itemID = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkItemCode(data.EvolveItem_Code);
                            //     //             if (itemID instanceof Error) {
                            //     //                 errorMessage = "Error While Check  Item Code";
                            //     //             } else if (itemID.rowsAffected > 0) {

                            //     //                 data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                            //     //                 let checkInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.checkInventory(data);
                            //     //                 if (checkInventory instanceof Error) {
                            //     //                     errorMessage = "Error While Check Inventory";
                            //     //                 } else if (checkInventory.rowsAffected > 0) {

                            //     //                     data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                            //     //                     let updateInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateInventory(data);
                            //     //                     if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                            //     //                         errorMessage = "Error While update inventory";
                            //     //                     }
                            //     //                 } else {

                            //     //                     let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addInventory(data);
                            //     //                     if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                            //     //                         errorMessage = 'Error While Add Inventory'
                            //     //                     }
                            //     //                 }
                            //     //             }
                            //     //         }
                            //     //     }
                            //     // }







                        }
                        if (errorMessage != '') {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Inventory Updated Successfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading inventory csv " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading inventory csv ", result: null
            };
            res.send(obj);
        }
    },
    getItemList: async function (req, res) {
        try {
            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.getItemList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get item list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get item list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get item list " + error.message, result: null };
            res.send(obj);
        }
    },
    getUnitList: async function (req, res) {
        try {

            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.getUnitList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get unit list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get unit list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get unit list " + error.message, result: null };
            res.send(obj);
        }
    },



}