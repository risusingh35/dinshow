'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getAllProdOrderList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            req.body.EvolveUnit_ID = req.EvolveUnit_ID  == undefined ? null : req.EvolveUnit_ID ;

            let Count = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getAllProdOrderListCount(search ,  req.body.EvolveUnit_ID);
            let List = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getAllProdOrderList(start, length, search ,req.body.EvolveUnit_ID);

            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get ProdOrder List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ProdOrder List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProdOrder list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get ProdOrder list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateProdOrderStatus: async function (req, res) {
        try {
            let error = false
            let errmsg = ""
            let List = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.updateProdOrderStatus(req.body);

            if (List instanceof Error) {
                error = true
                errmsg = "Error While Update ProdOrder Status !"
            } else {
                let getPublishedorderDatils = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getPublishedorderDatils(req.body)
                if (getPublishedorderDatils instanceof Error || getPublishedorderDatils.rowsAffected < 1) {
                    error = true
                    errmsg = "Error While Get Published Order Datils !"
                } else {

                    console.log('getPublishedorderDatils?????' ,  getPublishedorderDatils)
                    let ProdOrderDatils = getPublishedorderDatils.recordset[0]
                    console.log("ProdOrderDatils???", getPublishedorderDatils);
                    if (getPublishedorderDatils.recordset[0].EvolveSection_Code == 'MIXING') {
                    Evolve.MixingStartPODatils.push(getPublishedorderDatils.recordset[0])

                        let addMixingPeramiter = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.addMixingPeramiter(ProdOrderDatils);
                        if (addMixingPeramiter instanceof Error || addMixingPeramiter.rowsAffected < 1) {
                            error = true
                            errmsg = "Error While add In MixingPeramiter !"
                        }
                    }
                    else if (getPublishedorderDatils.recordset[0].EvolveSection_Code == 'CFD') {
                        console.log("getPublishedorderDatils.recordset[0]???", getPublishedorderDatils.recordset[0]);
                        Evolve.CFDStartPODatils.push(getPublishedorderDatils.recordset[0])
                        console.log("Evolve.CFDStartPODatils????", Evolve.CFDStartPODatils);
                    }
                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "ProdOrder Status Updated",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errmsg,
                        result: null
                    };
                    res.send(obj);
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Update ProdOrder Status " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error While Update ProdOrder Status " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getWoDetails: async function (req, res) {
        try {
            let data = {};
            let details = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getWoDetails(req.body.EvolveProdOrders_ID);
            if (details instanceof Error || details.rowsAffected < 1) {
                Evolve.Log.error("EERR2795: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo details", result: null };
                res.send(obj);
            } else {

                // if (details.recordset[0].EvolveProdOrders_IsPicklistGenerated) {
                //     Evolve.Log.error("Pick list already generated")
                //     let obj = { statusCode: 400, status: "fail", message: "Pick list already generated", result: null };
                //     res.send(obj);
                // } else {
                data.woDetails = details.recordset;
                let bomDetails = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getWoBomDetails(req.body.EvolveProdOrders_ID);
                if (bomDetails instanceof Error) {
                    Evolve.Log.error("EERR2795: Error while  get wo details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo bom details", result: null };
                    res.send(obj);
                } else {
                    data.woBomDetails = bomDetails.recordset;
                    data.woDetails[0].EvolveTransHistory_Type = 'MATERIALISSUED'

                    console.log("data.woDetails[0].EvolveTransHistory_Type????" , data.woDetails[0].EvolveTransHistory_Type)
                    let materialIssued = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getTransHistory(data.woDetails[0]);
                    if (materialIssued instanceof Error) {
                        Evolve.Log.error("EERR####: Error while  get wo details")
                        let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                        res.send(obj);
                    } else {
                        data.materialIssued = materialIssued.recordset;
                        data.woDetails[0].EvolveTransHistory_Type = 'MATERIALPRODUCED'
                        let materialProduced = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getTransHistory(data.woDetails[0]);
                        if (materialProduced instanceof Error) {
                            Evolve.Log.error("EERR####: Error while  get wo details")
                            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                            res.send(obj);
                        } else {
                            data.materialProduced = materialProduced.recordset;
                            console.log("data????" ,  data)
                            let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                            res.send(obj);
                        }
                    }
                }
                // }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },

    getWoList: async function (req, res) {
        try {
            let woDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoList(req.body.term);
            if (woDetails instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get wo id")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get wo id", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: woDetails.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get wo id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get wo id " + error.message, result: null };
            res.send(obj);
        }
    },

    updateWoStatus: async function (req, res) {
        try {
            let err = false
            let errmsg = ""
            let List = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.updateWoStatus(req.body);

            if (List instanceof Error) {
                 err = true
                 errmsg = "Error While Update ProdOrder Status !"
            } else {
                let getcloseOrderDatils = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getcloseOrderDatils(req.body)
                if (getcloseOrderDatils instanceof Error) {
                    err = true
                 errmsg = "Error While get close ProdOrder Datils !"
                } else {
                    
                    if (getcloseOrderDatils.recordset[0].EvolveSection_Code == 'MIXING') {
                        for (let i = 0; i < Evolve.MixingStartPODatils.length; i++) {
                            if (Evolve.MixingStartPODatils[i].EvolveProdOrders_ID == req.body.EvolveProdOrders_ID) {
                                Evolve.MixingStartPODatils.splice(i , 1)
                            }
                        }
                        console.log("Evolve.MixingStartPODatils>>>>>", Evolve.MixingStartPODatils);
                        let updateorderCloseTime = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.updateorderCloseTime(req.body);
                        if (updateorderCloseTime instanceof Error) {
                            err = true
                            errmsg = "Error While Update close time !"
                        } else {
                            err = false
                            errmsg = " ProdOrder Status Update Successfully!"
                        }
                    }else if (getcloseOrderDatils.recordset[0].EvolveSection_Code == 'CFD') {
                        for (let i = 0; i < Evolve.CFDStartPODatils.length; i++) {
                            if (Evolve.CFDStartPODatils[i].EvolveProdOrders_ID == req.body.EvolveProdOrders_ID) {
                                Evolve.CFDStartPODatils.splice(i , 1)
                            }
                        }
                        console.log("Evolve.CFDStartPODatils:::::", Evolve.CFDStartPODatils);
                    }
                }
                if (err == true) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: errmsg,
                        result: List.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "ProdOrder Status Updated",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Update ProdOrder Status " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error While Update ProdOrder Status " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSalesOrderData: async function (req, res) {
        try {
            let salesOrderData = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getSalesOrderData(req.body);
            if (salesOrderData instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get salesOrder Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get salesOrder Data id", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "salesOrder Data List", result: salesOrderData.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get salesOrder Data id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get salesOrder Data id " + error.message, result: null };
            res.send(obj);
        }
    },

    getMachineList: async function (req, res) {
        try {
            let MachineData = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getMachineList();
            if (MachineData instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get Machine Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get Machine Data ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Machine Data List", result: MachineData.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get Machine Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get Machine Data " + error.message, result: null };
            res.send(obj);
        }
    },

    getToolList: async function (req, res) {
        try {
            let ToolList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getToolList();
            if (ToolList instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get Tool Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get Tool Data ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Tool Data List", result: ToolList.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get Tool Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get Tool Data " + error.message, result: null };
            res.send(obj);
        }
    },

    getCoreList: async function (req, res) {
        try {
            let coreList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getCoreList();
            if (coreList instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get Core Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get Core Data ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Core Data List", result: coreList.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get Core Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get Core Data " + error.message, result: null };
            res.send(obj);
        }
    },

    getLdpList: async function (req, res) {
        try {
            let ldpList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getLdpList();
            if (ldpList instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get Ldp Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get Ldp Data ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Ldp Data List", result: ldpList.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get Ldp Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get Ldp Data " + error.message, result: null };
            res.send(obj);
        }
    },

    getPaperList: async function (req, res) {
        try {
            let papaerList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.getPaperList();
            if (papaerList instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get Paper Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get Paper Data ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Paper Data List", result: papaerList.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get Paper Data " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get Paper Data " + error.message, result: null };
            res.send(obj);
        }
    },

    updateProOrder: async function (req, res) {
        try {
        let error = false;
        let errorMessage = "";    
        let type = req.body.EvolveProdOrders_ItemType
        let query = "";
        let today = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
        today = today.split(' ')[0]
        console.log("req.body>>>>>>>>>>>>>",req.body);

        if(req.body.QextendFire){
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
                        "maintainProductionOrderRouting": {
                            "qcom:dsSessionContext": {
                                'qcom:dsSessionContext': [
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
                                        'qcom:propertyValue': "ERP3_1"
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
                                        'qcom:propertyValue': req.body.EvolveUnit_Code
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
                            "dsProductionOrderRoutingMaster": {
                                "productionOrderRoutingMaster" : {
                                    "operation" : "A",
                                    "wrNbr":req.body.EvolveProdOrders_OrderNo,
                                    "wrLot":req.body.EvolveProdOrders_OrderID,
                                    "productionOrderRoutingDetail":{
                                        "operation":"M",
                                        "wrOp":"10",
                                        "wrStdOp":"",
                                        "wrDesc":"",
                                        "wrWkctr":req.body.EvolveSection_Code,
                                        "wrMch":req.body.EvolveMachine_Code,
                                        "wrStart":today,
                                    }
                                    
                                }
                            }
                        }
                    }
                }
            }
            let xmldoc = Evolve.Xmlbuilder.create(xmlObj);
            let xmlFileData = xmldoc.end({ pretty: true });
            xmlFileData = xmlFileData.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
           
                    console.log("xmlFileData",xmlFileData);
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
                    console.log("Error While Fire Qextend::::::::::::::" , e.message);
                    errorMessage = e.message
                    error = true;
                    er = true;
                });
                if(responce) {
             
                    Evolve.Xml2JS.parseString(responce.data, async function (err, xmlFileDataNew) {
                        if (err) {
                            errorMessage = err.errorMessage;
                            error = true;
                            console.log("issue in xml formate")
                        } else {
                        
                            try {
                                console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]);
                                if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainProductionOrderRoutingResponse'][0]['ns1:result'][0] != 'error') {
                                    console.log("sucessfully Create");
                                                    
                                } else {
                                    
                                    errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainProductionOrderRoutingResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];

                                    console.log("maintainProductionOrderRoutingResponse::::::::::::",xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:maintainProductionOrderRoutingResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]);
                                    error = true;
                                }
                            } catch (error) {
                                console.log("error.message",error.message);
                                errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                error = true;
                            }

                        }
                    });
                }else{
                    console.log("error.message",error.message);
                    errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                    error = true;

                }           
                       
        }
        
        if (type != "WIP") {
            query = `UPDATE EvolveProdOrders SET EvolveProdOrders_Tool = '${req.body.EvolveProdOrders_Tool}', EvolveProdOrders_Core = '${req.body.EvolveProdOrders_Core}', EvolveProdOrders_Ldp = '${req.body.EvolveProdOrders_Ldp}', EvolveProdOrders_Paper = '${req.body.EvolveProdOrders_Paper}', EvolveMachine_ID = ${req.body.EvolveMachine_ID} , EvolveSalesOrderLine_ID = '${req.body.EvolveSalesOrderLine_ID}' WHERE EvolveProdOrders_ID = ${req.body.EvolveProdOrders_ID}`
           
        }
        else {
            query = `UPDATE EvolveProdOrders SET EvolveSalesOrderLine_ID = '${req.body.EvolveSalesOrderLine_ID}', EvolveMachine_ID = ${req.body.EvolveMachine_ID} WHERE EvolveProdOrders_ID = ${req.body.EvolveProdOrders_ID}`
        }
        if(error==false){
            let proOrderData = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvList.updateProOrder(query);
            if (proOrderData instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while Update proOrder Data List")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while Update proOrder Data id", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Update ProdOrder Sucessfully", result: proOrderData.recordset };
                res.send(obj);
            }
        }else{
            let obj = {statusCode: 400, status: "fail", message: errorMessage, result: null };
            res.send(obj)
        }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while Update proOrder Data id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while Update proOrder Data id " + error.message, result: null };
            res.send(obj);
        }
    },


}