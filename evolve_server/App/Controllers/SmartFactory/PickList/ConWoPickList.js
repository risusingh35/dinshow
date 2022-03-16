'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {



    getPickListNumber: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getPickListNumber(req.body.term);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get pick list  number")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get pick list  number", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: list.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get pick list  number " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get pick list  number " + error.message, result: null };
            res.send(obj);
        }
    },
    getLocationList: async function (req, res) {
        try {

            console.log("GET Location list")

            let locationList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getLocationList();
            if (locationList instanceof Error) {
                Evolve.Log.error(" EERR#### : Error while get location list ")
                let obj = { statusCode: 400, status: "fail", message: "EERR#### : Error while get location list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting location list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting location list " + error.message, result: null };
            res.send(obj);
        }
    },
    getPickListDetails: async function (req, res) {
        try {

            console.log("GET PICK  LIST ETAILS")

            let data = {};

            // let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getPickListDetails(req.body.EvolveProdOrders_ID);
            // if (details instanceof Error) {
            //     Evolve.Log.error("EERR2795: Error while  get wo details")
            //     let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo details", result: null };
            //     res.send(obj);
            // } else {

            // if (details.recordset[0].EvolveProdOrders_IsPicklistGenerated) {
            //     Evolve.Log.error("Pick list already generated")
            //     let obj = { statusCode: 400, status: "fail", message: "Pick list already generated", result: null };
            //     res.send(obj);
            // } else {
            // data.woDetails = details.recordset;
            let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getPickListDetails(req.body.EvolvePickList_ID);

            console.log("details????", details)
            if (details instanceof Error) {
                Evolve.Log.error("EERR2795: Error while get picklist details details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while get picklist details", result: null };
                res.send(obj);
            } else {
                data.pickListDetails = details.recordset;
                // let pickedInventory = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getPickedInventory(req.body.EvolvePickList_ID);
                // if (pickedInventory instanceof Error) {
                //     // Evolve.Log.error("EERR2795: Error while get picklist details details")
                //     // let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while get picklist details", result: null };
                //     // res.send(obj);
                // } else {

                // }

                let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                res.send(obj);
            }
            // }
            // }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while get picklist details details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while get picklist details details " + error.message, result: null };
            res.send(obj);
        }
    },
    generatePickList: async function (req, res) {
        try {
            let errorMessage = '';
            if (req.body.EvolvePickListDetail.length == 0) {

                errorMessage = 'Material To Pick Not Found';

            } else {
                let pickListNumber = Evolve.Generator.generate("PCL");

                if (pickListNumber == undefined || pickListNumber.length == 0) {

                    errorMessage = 'Material To Pick Not Found';


                } else {

                    req.body.EvolvePickList_Number = pickListNumber;

                    req.body.EvolvePickList_Number = (req.body.EvolvePickList_Number.toString()).replace(/ -/g, '')

                    req.body.EvolvePickList_Number = req.body.EvolvePickList_Number.split(" ").join("");
                    req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                    let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.generatePickList(req.body);

                    if (details instanceof Error || details.rowsAffected < 1) {

                        errorMessage = 'Error While Generate Pick list';


                    } else {

                        req.body.EvolvePickList_ID = details.recordset[0].inserted_id;

                        for (let i = 0; i < req.body.EvolvePickListDetail.length; i++) {
                            req.body.EvolvePickListDetail[i].EvolvePickList_ID = details.recordset[0].inserted_id

                            let pickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.addPickListDetails(req.body.EvolvePickListDetail[i]);

                            if (pickListDetails instanceof Error || pickListDetails.rowsAffected < 1) {

                                errorMessage = 'Error While Generate Pick list';
                            }
                        }
                        if (errorMessage == '') {
                            let updateWorkOrder = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updateWorkOrderPickListStatus(req.body);
                            if (updateWorkOrder instanceof Error || updateWorkOrder.rowsAffected < 1) {

                                errorMessage = 'Error while update Work order picklist status';
                            }
                        }

                    }
                }
            }

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Pick List Generated SuccessFully Pick list number is ' + req.body.EvolvePickList_Number : errorMessage, result: null };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },


    getInventoryDetails: async function (req, res) {
        try {
            let data = {};
            let pickedInv = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getPickedInventoryDetails(req.body);
            if (pickedInv instanceof Error) {
                Evolve.Log.error("EERR2795: Error while get picked inventory list")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while get picked inventory list", result: null };
                res.send(obj);
            } else {
                data.picked = pickedInv.recordset;
                let availableInv = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getAvailableInventory(req.body);
                if (availableInv instanceof Error) {
                    Evolve.Log.error("EERR2795: Error while get picklist details details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while get available inventory ", result: null };
                    res.send(obj);
                } else {

                    data.available = availableInv.recordset;
                    let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                    res.send(obj);

                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while get picklist details details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while get picklist details details " + error.message, result: null };
            res.send(obj);
        }
    },



    onPickInvnetory: async function (req, res) {
        try {
            let errorMessage = '';

            console.log("body ON PICK INVE .>>>>>>>>>", req.body)

            let itemDetail = [];
            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();

            // let getLocCode = 


            let getLocCode = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getLocationCodeFromID(req.body.pickedPallets[0].EvolveLocation_ID);
            if (getLocCode instanceof Error || getLocCode.rowsAffected < 1) {

                errorMessage = 'LOcation Code Not Found'


            } else {





                for (let i = 0; i < req.body.pickedPallets.length; i++) {

                    itemDetail.push({


                        "operation": "A",
                        "lotserialQty": req.body.pickedPallets[i].EvolveInventory_QtyAvailable,
                        "effDate": datetime,
                        "rmks": 'TEST',
                        "siteFrom": req.body.pickedPallets[i].EvolveUnit_Code,
                        "locFrom": req.body.pickedPallets[i].EvolveLocation_Code,
                        "lotserFrom": req.body.pickedPallets[i].EvolveInventory_BatchNo,
                        "lotrefFrom": req.body.pickedPallets[i].EvolveInventory_SerialNo,
                        "siteTo": req.body.pickedPallets[i].EvolveUnit_Code,
                        "locTo": getLocCode.recordset[0].EvolveLocation_Code,
                        "yn": 'true',
                        "yn1": 'true',
                        "yn2": 'true'


                    })




                }

                if (errorMessage == '') {
                    let data = req.body;
                    console.log("req.body::::::::::::::::::::::", req.body);
                    let xmlObjForsingleItemTransfer = {
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
                                "transferInvSingleItem": {
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
                                                'qcom:propertyValue': ["save"]
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
                                    "dsItem": {
                                        "item": {
                                            "operation": "A",
                                            "part": req.body.pickedPallets[0].EvolveItem_Part,
                                            itemDetail
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let xmldocForsingleItemTransfer = Evolve.Xmlbuilder.create(xmlObjForsingleItemTransfer);
                    // console.log(xmldoc.end({ pretty: true }));
                    let xmlFileDataForsingleItemTransfer = xmldocForsingleItemTransfer.end({ pretty: true });
                    console.log("xmlFileDataForsingleItemTransfer", xmlFileDataForsingleItemTransfer);
                    xmlFileDataForsingleItemTransfer = xmlFileDataForsingleItemTransfer.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)

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

                    let responcexmldocForsingleItemTransfer = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileDataForsingleItemTransfer, config).catch((e) => {
                        console.log("Error While Fire Qextend::::::::::::::", e.message);
                        //   error = true;
                        errorMessage = e.message
                    });

                    if (responcexmldocForsingleItemTransfer) {
                        Evolve.Xml2JS.parseString(responcexmldocForsingleItemTransfer.data, async function (err, xmlFileDataNew) {
                            if (err) {
                                console.log("issue in xml formate")
                            } else {
                                console.log("no issue XML Formate ", xmlFileDataNew);
                                try {
                                    console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]);
                                    if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:transferInvSingleItemResponse'][0]['ns1:result'][0] != 'error') {

                                    } else {
                                        console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:transferInvSingleItemResponse'][0]['ns1:result'][0]);
                                        //   error = true;
                                        errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:transferInvSingleItemResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];
                                    }
                                } catch (error) {
                                    console.log("error.message", error.message);
                                    // error = true;
                                    errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                                }
                            };
                        });
                    } else {
                        console.log("error.message", error.message);
                        error = true;
                        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
                    }
                }

                if (errorMessage == '') {








                    for (let i = 0; i < req.body.pickedPallets.length; i++) {

                        req.body.pickedPallets[i].EvolveUser_ID = req.EvolveUser_ID;
                        let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.changeInvStatus(req.body.pickedPallets[i]);
                        if (details instanceof Error || details.rowsAffected < 1) {

                            errorMessage = 'Error While Changge Inventory Status'

                        } else {

                            let addPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.addPicklistDetailsInv(req.body.pickedPallets[i]);
                            if (addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1) {

                                errorMessage = 'Error While Add Picklist Details'

                            } else {


                                let updatePickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePickListDetails(req.body.pickedPallets[i]);
                                if (updatePickListDetails instanceof Error || updatePickListDetails.rowsAffected < 1) {

                                    errorMessage = 'Error While Add Picklist Details'

                                }
                            }

                        }

                    }
                }
            }
            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Inventory Picked Successfully' : errorMessage, result: null };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while get pick inventory " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while get pick inventory " + error.message, result: null };
            res.send(obj);
        }
    },


    onUnPickInventory: async function (req, res) {
        try {

            console.log("req.body.unPickedPallets???", req.body.unPickedPallets)
            let errorMessage = '';
            for (let i = 0; i < req.body.unPickedPallets.length; i++) {

                req.body.unPickedPallets[i].EvolveUser_ID = req.EvolveUser_ID;
                let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.changeInvStatus(req.body.unPickedPallets[i]);
                if (details instanceof Error || details.rowsAffected < 1) {

                    errorMessage = 'Error While Changge Inventory Status'

                } else {

                    console.log("req.body.unPickedPallets[i]???", req.body.unPickedPallets[i].EvolvePickListDetailInv_ID)

                    let addPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.removePicklistDetailsInv(req.body.unPickedPallets[i]);
                    if (addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1) {

                        errorMessage = 'Error While Add Picklist Details'

                    } else {
                        let updatePickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePickListDetailsRemoveQty(req.body.unPickedPallets[i]);
                        if (updatePickListDetails instanceof Error || updatePickListDetails.rowsAffected < 1) {

                            errorMessage = 'Error While Add Picklist Details'

                        }
                    }
                }
            }
            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Inventory Unpicked Successfully' : errorMessage, result: null };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error While unpick Inventory " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error While unpick Inventory " + error.message, result: null };
            res.send(obj);
        }
    },





    getWoProduceDetails: async function (req, res) {
        try {
            let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getWoProduceDetails(req.body.EvolveWoSchedule_ID);
            if (details instanceof Error) {
                Evolve.Log.error("EERR2795: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "wo production details", result: details.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },


    getPalletDetails: async function (req, res) {
        try {

            let palletDetails = {}
            let availablePallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getAvailablePallets(req.body);
            if (availablePallets instanceof Error) {
                Evolve.Log.error("EERR2797 : Error while get wo available pallets details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2797 : Error while get wo pallets details", result: null };
                res.send(obj);
            } else {
                palletDetails.available = availablePallets.recordset
                let pickedPallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getpickedPallets(req.body);
                if (pickedPallets instanceof Error) {
                    Evolve.Log.error("EERR2798 : Error while get wo picked pallets details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2798 : Error while get wo pallets details", result: null };
                    res.send(obj);
                } else {
                    palletDetails.picked = pickedPallets.recordset
                    let obj = { statusCode: 200, status: "success", message: "wo pallets details", result: palletDetails };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2799: Error while  get Pallet Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2799: Error while  get  Pallet Details " + error.message, result: null };
            res.send(obj);
        }
    },
    pickPallets: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let woNumber = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getWoNumber(req.body.EvolveProdOrders_ID);
            if (woNumber instanceof Error) {
                Evolve.Log.error("EERR2800 : Error while get location status")
                let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                res.send(obj);
            } else {
                req.body.EvolveWoSchedule_OrderID = woNumber.recordset[0].EvolveWoSchedule_OrderID;
                let locStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getLocationStatus(req.body.pickToLoc);
                if (locStatus instanceof Error) {
                    Evolve.Log.error("EERR2800 : Error while get location status")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                    res.send(obj);
                } else {
                    req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                    let checkPickNumber = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.checkExistPick(req.body.EvolveProdOrders_ID);
                    if (checkPickNumber instanceof Error) {
                        Evolve.Log.error("EERR2800 : Error while check picklist exist or not")
                        let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while check picklist exist or not", result: null };
                        res.send(obj);
                    } else {
                        if (checkPickNumber.rowsAffected == 0) {
                            let pickListNumber = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PICKLISTNUMBER') // get po barcode details 
                            if (pickListNumber == 0) {
                                Evolve.Log.error("EERR2801 : Error while assign pallet number")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2801 :Error while assign pallet number", result: null };
                                res.send(obj);
                            } else {
                                req.body.EvolvePickList_Number = pickListNumber
                                let createPickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.createPickList(req.body) // get po barcode details 
                                if (createPickList instanceof Error || createPickList.rowsAffected < 1) {
                                    Evolve.Log.error("EERR2802 : Error while create picklist")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2802 :Error while create picklist", result: null };
                                    res.send(obj);
                                    // pickListNumber = {}
                                } else {
                                    req.body.EvolvePickList_ID = createPickList.recordset[0].inserted_id
                                }
                            }
                        } else {
                            req.body.EvolvePickList_ID = checkPickNumber.recordset[0].EvolvePickList_ID
                        }
                    }
                    let error = false
                    for (let i = 0; i < req.body.pickedPallets.length; i++) {
                        if (error == false) {
                            let changePalletStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.changePalletStatus(req.body.pickedPallets[i].EvolveInventory_ID, req.body);
                            if (changePalletStatus instanceof Error || changePalletStatus.rowsAffected < 1) {
                                error = true;
                                Evolve.Log.error("EERR2803 : Error while change pallets status")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2803 : Error while change pallets status", result: null };
                                res.send(obj);
                            } else {
                                let addPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.addPickListDetails(req.body.pickedPallets[i], req.body);
                                if (addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1) {
                                    error = true;
                                    Evolve.Log.error("EERR2804 : Error while add pick list details")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2804 : Error while add pick list details", result: null };
                                    res.send(obj);
                                } else {
                                    // if(req.body.isBom == false)
                                    // {
                                    //     let updatePickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePickList(req.body.EvolvePickList_ID,req.body.EvolveUser_ID ,req.body.pickedPallets[i].EvolveInventory_QtyOnHand);
                                    //     console.log("updatePickList" , updatePickList)
                                    //     if (updatePickList instanceof Error || updatePickList.rowsAffected < 1) {
                                    //         error = true;
                                    //         Evolve.Log.error("EERR0009 : Error while update picklist")
                                    //         let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update picklist", result: null };
                                    //         res.send(obj);
                                    //     }
                                    // }else
                                    // {
                                    let updatePickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updateBomPickList(req.body.selectedIssueLine, req.body.EvolveUser_ID, req.body.pickedPallets[i].EvolveInventory_QtyOnHand);
                                    if (updatePickList instanceof Error || updatePickList.rowsAffected < 1) {
                                        error = true;
                                        Evolve.Log.error("EERR2805 : Error while update picklist")
                                        let obj = { statusCode: 400, status: "fail", message: "EERR2805 : Error while update picklist", result: null };
                                        res.send(obj);
                                    }

                                    // }
                                }
                            }
                        }
                    }
                    if (error == false) {
                        let obj = { statusCode: 200, status: "success", message: "Pallets picked successfully", result: "" };
                        res.send(obj);
                    } else {
                        Evolve.Log.error("EERR2806 : Error While pick pallets")
                        let obj = { statusCode: 400, status: "success", message: "EERR2806 : Error While pick pallets", result: "" };
                        res.send(obj);

                    }
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR2807: Error While pick pallets " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2807: Error While pick pallets " + error.message, result: null };
            res.send(obj);
        }
    },

    unpickPallets: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let locStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                Evolve.Log.error("EERR2800 : Error while get location status")
                let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                res.send(obj);
            } else {
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let error = false;
                for (let i = 0; i < req.body.unPickedPallets.length; i++) {
                    if (error == false) {
                        let deletePicklist = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.deletePicklist(req.body.unPickedPallets[i]);
                        if (deletePicklist instanceof Error || deletePicklist.rowsAffected < 1) {
                            error = true
                            Evolve.Log.error("EERR2808 : Error while delete picklist")
                            let obj = { statusCode: 400, status: "fail", message: "EERR2808 : Error while delete picklist", result: null };
                            res.send(obj);
                        } else {
                            // if(req.body.isBom == false)
                            // {
                            //     let updatePickQty = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePickQty(req.body.unPickedPallets[i].EvolveInventory_QtyOnHand ,req.body.selectedIssueLine);
                            //     if (updatePickQty instanceof Error || updatePickQty.rowsAffected < 1) {
                            //             error = true
                            //             Evolve.Log.error("EERR0009 : Error while update pick qty")
                            //             let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update pick qty", result: null };
                            //             res.send(obj);
                            //     }else{
                            //     let updatePallet = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePallet(req.body.unPickedPallets[i] , req.body.EvolveLocation_ID ,req.body.EvolveUser_ID);
                            //     if (updatePallet instanceof Error || updatePallet.rowsAffected < 1) {
                            //         error = true
                            //         Evolve.Log.error("EERR0009 : Error while update pallet status")
                            //         let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update pallet status", result: null };
                            //         res.send(obj);
                            //     }

                            //     }
                            // }else{
                            let updatePickQty = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updateBomPickListOnUnpick(req.body.unPickedPallets[i].EvolveInventory_QtyOnHand, req.body.selectedIssueLine, req.body.EvolveUser_ID);
                            if (updatePickQty instanceof Error || updatePickQty.rowsAffected < 1) {
                                error = true
                                Evolve.Log.error("EERR2809 : Error while update pick qty")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2809 : Error while update pick qty", result: null };
                                res.send(obj);
                            } else {
                                let updatePallet = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.updatePallet(req.body.unPickedPallets[i], req.body.EvolveLocation_ID, req.body.EvolveUser_ID, req.body.EvolveInventory_Status);
                                if (updatePallet instanceof Error || updatePallet.rowsAffected < 1) {
                                    error = true
                                    Evolve.Log.error("EERR2810 : Error while update pallet status")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2810 : Error while update pallet status", result: null };
                                    res.send(obj);
                                }

                            }
                            // }
                        }
                    }
                }
                if (error == false) {
                    let obj = { statusCode: 200, status: "success", message: "Pallets unpicked successfully", result: "" };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2811: Error while unpick pallets " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2811: Error while unpick pallets " + error.message, result: null };
            res.send(obj);
        }
    },
    getSubItemList: async function (req, res) {
        try {
            let subItems = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getSubItemList(req.body.EvolveItem_ID);
            if (subItems instanceof Error) {
                Evolve.Log.error(" EERR2812 : Error while get sub item list ")
                let obj = { statusCode: 400, status: "fail", message: " EERR2812 : Error while get sub item list ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "sub item list", result: subItems.recordset };
                res.send(obj);
            }
        } catch (error) {
            EEERR2812olve.Log.error(" EERR2813: Error while  getting Pallet Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2813: Error while  getting Pallet Details " + error.message, result: null };
            res.send(obj);
        }
    },
    getSubItemAvailPallets: async function (req, res) {
        try {
            let pallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getAvailablePallets(req.body);
            if (pallets instanceof Error) {
                Evolve.Log.error(" EERR2814 : Error while get sub item available pallets ")
                let obj = { statusCode: 400, status: "fail", message: " EERR2814 : Error while get sub item available pallets ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "sub item available pallets", result: pallets.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2815: Error while get sub item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2815: Error while get sub item list " + error.message, result: null };
            res.send(obj);
        }
    },
    getWobomIssueDetails: async function (req, res) {
        try {
            // let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getWobomIssueDetails(req.body.EvolveWoSchedule_ID);
            // if (details instanceof Error) {
            //  Evolve.Log.error("EERR0007 : Error while get material to issue details")
            //  let obj = { statusCode: 400, status: "fail", message: "EERR0007 : while get material to issue details", result: null };
            //     res.send(obj);
            // } else if(details.rowsAffected<1)
            // {
            //     Evolve.Log.error("EERR0007 : No data found ! ")
            //     let obj = { statusCode: 400, status: "fail", message: "EERR0007 : No data found ! ", result: null };
            //        res.send(obj);
            // }else
            // {
            //     for(let i =0 ; i<details.recordset.length ;i++)
            //     {
            //       details.recordset[i].EvolvePickList_leftToPick= details.recordset[i].EvolvePickList_QtyReq -details.recordset[i].EvolvePickList_QtyPick  ;
            //     details.recordset[i].issueId= details.recordset[i].EvolveProdOrderBom_ID ;

            //     }
            //      let obj = { statusCode: 200, status: "success", message: "wo material to issue", result:details.recordset};
            //     res.send(obj);          
            // }
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let materialToIssue = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getWobomIssueDetails(req.body.EvolveWoSchedule_ID);
            if (materialToIssue instanceof Error) {
                error = true;
            } else {
                for (let i = 0; i < materialToIssue.recordset.length; i++) {
                    if (error == false) {
                        materialToIssue.recordset[i].EvolvePickList_leftToPick = materialToIssue.recordset[i].EvolveSchedulingBom_QtyReq - materialToIssue.recordset[i].EvolveSchedulingBom_QtyPick
                        if (materialToIssue.recordset[i].qtyHand == null) {
                            materialToIssue.recordset[i].qtyHand = 0;
                        }
                        let subItems = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                        if (subItems instanceof Error) {
                            error = true;
                        } else {
                            for (let j = 0; j < subItems.recordset.length; j++) {
                                if (error == false) {
                                    let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickList.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID, req.body.EvolveWoSchedule_ID)
                                    if (subItems instanceof Error) {
                                        error = true;
                                    } else {

                                        if (getQtyOnHAnd.qtyHand == '' || getQtyOnHAnd.qtyHand == null) {
                                            getQtyOnHAnd.qtyHand = 0
                                        }
                                        subItems.recordset[j].qtyHand = getQtyOnHAnd.qtyHand;

                                        if (getQtyOnHAnd.qtyPick == '' || getQtyOnHAnd.qtyPick == null) {
                                            getQtyOnHAnd.qtyPick = 0
                                        }
                                        subItems.recordset[j].qtyPick = getQtyOnHAnd.qtyPick;

                                        if (getQtyOnHAnd.qtyIssue == '' || getQtyOnHAnd.qtyIssue == null) {
                                            getQtyOnHAnd.qtyIssue = 0
                                        }
                                        subItems.recordset[j].qtyIssue = getQtyOnHAnd.qtyIssue;
                                    }
                                }
                            }
                        }
                        materialToIssue.recordset[i].subItems = subItems.recordset;
                        materialToIssue.recordset[i].showSubItem = false;
                    }

                }
                if (error == true) {
                    Evolve.Log.error(" EERR2816: Error while get material to issue details");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2816 : Error while get material to issue details",
                        result: null
                    };
                    res.send(obj);
                } else if (materialToIssue.recordset.length == 0) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Material to issue not found",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "wo material to issue", result: materialToIssue.recordset };
                    res.send(obj);
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR2817: Error while get material to issue details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2817: Error while get material to issue details " + error.message, result: null };
            res.send(obj);
        }
    },

















}