'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    //  Quote Header Api


    getSoDetails: async function (req, res) {
        try {
            let headDetails = await Evolve.App.Services.Wms.SoShipment.SrvOption.getSoHeadDetails(req.body);


            console.log("headDetails????", headDetails)

            if (headDetails instanceof Error) {
                Evolve.Log.error(" Error While Get SO Details ")
                let obj = { statusCode: 400, status: "fail", message: " Error While Get SO Details ", result: null };
                res.send(obj);
            }
            else {

                let SoLineData = await Evolve.App.Services.Wms.SoShipment.SrvOption.getSoLineData(req.body);

                console.log("SoLineData????", SoLineData)


                if (SoLineData instanceof Error) {
                    Evolve.Log.error(" Error While Get SO Details ")
                    let obj = { statusCode: 400, status: "fail", message: " Error While Get SO Details ", result: null };
                    res.send(obj);
                } else {
                    for (let i = 0; i < SoLineData.recordset.length; i++) {
                        SoLineData.recordset[i].selectedInvList = []
                    }

                    let obj = {
                        statusCode: 200, status: "success", message: "SO UPDATED TO SHIPMENT",
                        result: {
                            headDetails: headDetails.recordset[0],
                            SoLineData: SoLineData.recordset
                        }
                    };
                    res.send(obj);
                }

            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error While Get So Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While Get So Details " + error.message, result: null };
            res.send(obj);
        }
    },

    getInventoryList: async function (req, res) {
        try {

            req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;
            let result = await Evolve.App.Services.Wms.SoShipment.SrvOption.getInventoryList(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error While  Get Stock List")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error While  Get Stock List", result: null };
                res.send(obj);
            } else {
                let invList = result.recordset;


                for (let i = 0; i < invList.length; i++) {

                    invList[i].isPicked = false;

                }
                let obj = { statusCode: 200, status: "success", message: "Inventory List", result: invList };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error While  Get Stock List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Get Stock List " + error.message, result: null };
            res.send(obj);
        }
    },

    onPerformShipment: async function (req, res) {
        try {

            let date = new Date()
            let timeStamp = date.getTime();

            let month = (date.getMonth() + 1).toString();

            month = '0' + `${month + ''}`;

            let currentDate = date.getFullYear() + '/' + (month) + '/' + date.getDate();
            let error = false;
            let errorMessage = "";
            req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;

            let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
            <dsSalesOrderShipper xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
               <salesOrderShipper>
                  <operation>M</operation>
                  <absShipfrom>${req.body.headDetails.EvolveUnit_Code}</absShipfrom>
                  <absId />
                  <absShipto>${req.body.headDetails.shipToCode}</absShipto>
                  <vCont>true</vCont>
                  <vCont1>true</vCont1>
                  <vOk>true</vOk>
                  <lvcdtime>${timeStamp}</lvcdtime>`

            let innerLineString = '';

            for (let i = 0; i < req.body.lineDetailList.length; i++) {
                if (req.body.lineDetailList[i].selectedInvList.length >= 0) {

                    for (let j = 0; j < req.body.lineDetailList[i].selectedInvList.length; j++) {



                        innerLineString += ` <discreteOrderItemDetail>
                        <operation>M</operation>
                        <scxOrder>${req.body.headDetails.EvolveSalesOrder_Number}</scxOrder>
                        <scxLine>${req.body.lineDetailList[i].EvolveSalesOrderLine_Number}</scxLine>
                        <ioprmt>true</ioprmt>
                        <srQty>${req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_QtyPicked}</srQty>
                        <transUm>${req.body.lineDetailList[i].EvolveSalesOrderLine_UM}</transUm>
                        <srSite>${req.body.headDetails.EvolveUnit_Code}</srSite>
                        <srLoc>${req.body.lineDetailList[i].selectedInvList[j].EvolveLocation_Code}</srLoc>
                        <srLotser>${req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_LotSerialNo}</srLotser>
                        <srRef>${req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_SerialNo}</srRef>
                        <multiple>false</multiple>
                        <yn>true</yn>
                        <lvcdtime>${timeStamp}</lvcdtime>
                     </discreteOrderItemDetail>`
                    }
                }

            }
            xmlString += innerLineString;
            xmlString += `</salesOrderShipper>
            </dsSalesOrderShipper>`
            let obj = {
                "soapenv:Envelope": {
                    "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                    "@xmlns:urn": "urn:xxinvld:xxinvld",
                    "soapenv:Header": "",
                    "soapenv:Body": {
                        "urn:xxinvld": {
                            "urn:ip_domain": Evolve.Config.QXTENDDOMAIN,
                            "urn:ip_shipfrom": req.body.headDetails.EvolveUnit_Code,

                            "urn:ip_shp_date": currentDate,
                            "urn:etranscd": "?",
                            "urn:etransid": req.body.transporterDetails.gstIn,
                            "urn:evehno": req.body.transporterDetails.VehNo,
                            "urn:edocid": req.body.transporterDetails.TransDocNo,
                            "urn:edocdt": req.body.transporterDetails.TransDocDt,
                            "urn:etrname": req.body.transporterDetails.transName,
                            "urn:edistance": "0",
                            "urn:etransmode": req.body.transporterDetails.TransMode,
                            "urn:evhtype": req.body.transporterDetails.VehType,
                            "urn:eportstate": "?",
                            "urn:eportpin": "?",
                            "urn:eport": "?",
                            "urn:l_transmode": "?",
                            "urn:l_vhtype": "?",
                            "urn:l_xml": '',



                        }
                    }
                }
            }

            let xmldocForConfirmShippper = Evolve.Xmlbuilder.create(obj);
            let xmlFileDataForConfirmShippper = xmldocForConfirmShippper.end({ pretty: true });
            xmlFileDataForConfirmShippper = xmlFileDataForConfirmShippper.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
            xmlFileDataForConfirmShippper = xmlFileDataForConfirmShippper.replace(`<urn:l_xml/>`, `<urn:l_xml><![CDATA[${xmlString.toString()}]]></urn:l_xml>`)


            console.log("xmlFileDataForConfirmShippper?????", xmlFileDataForConfirmShippper)


            console.log("Evolve.Config.QXTENHOST?????", Evolve.Config.WSAHOST)
            console.log("Evolve.Config.WSAURL?????", Evolve.Config.WSAURL)




            let config = {
                headers: {
                    'Accept-Encoding': 'gzip, deflate',
                    'Content-Type': 'text/xml;charset=UTF-8',
                    'SOAPAction': "",
                    'Host': Evolve.Config.WSAHOST,
                    'Connection': 'Keep - Alive',
                    'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                }
            }
            let responcexmldocForConfirmShippper = await Evolve.Axios.post(Evolve.Config.WSAURL, xmlFileDataForConfirmShippper, config).catch((e) => {
                console.log("Error While Fire Qextend::::::::::::::", e);
                error = true;
                errorMessage = e.message

            });
            if (!error) {
                if (responcexmldocForConfirmShippper) {
                    Evolve.Xml2JS.parseString(responcexmldocForConfirmShippper.data, async function (err, xmlFileDataNew) {
                        if (err) {
                            errorMessage = 'Error While Check Erp Response';
                            error = true;



                        } else {

                            console.log('xmlFileDataNew???', JSON.stringify(xmlFileDataNew))

                            let responseMessage = xmlFileDataNew['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['xxinvldResponse'][0]['l_output'][0];

                            if (responseMessage.includes("Error")) {
                                error = true
                                errorMessage = responseMessage
                            }
                        };
                    });


                } else {
                    // console.log("error.message", error.message);
                    error = true;
                    errorMessage = "Error While Update Data Via Qxtenxd";
                }
            }

            console.log("AFTER RESPONSEs")
            if (!error) {
                for (let i = 0; i < req.body.lineDetailList.length; i++) {
                    if (req.body.lineDetailList[i].selectedInvList.length > 0) {
                        if (req.body.lineDetailList[i].qtyPicked) {
                            let updateSoLine = await Evolve.App.Services.Wms.SoShipment.SrvOption.updateSoLine(req.body.lineDetailList[i]);
                            if (updateSoLine instanceof Error || updateSoLine.rowsAffected < 1) {

                                error = true;
                                errorMessage = 'ERROR WHILE UPDATE SO LINE'

                            } else {
                                for (let j = 0; j < req.body.lineDetailList[i].selectedInvList.length; j++) {
                                    let datas = {
                                        EvolveSalesOrder_Number: req.body.headDetails.EvolveSalesOrder_Number,
                                        EvolveInventory_SerialNo: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_SerialNo,
                                        EvolveTransHistory_Type: 'SOSHIPMENT',
                                        EvolveTransHistory_LineNo: req.body.lineDetailList[i].EvolveSalesOrderLine_Number,
                                        EvolveItem_Part: req.body.lineDetailList[i].EvolveItem_Part,
                                        EvolveTransHistory_Qty: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_QtyPicked,
                                        EvolveInventory_BatchNo: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_BatchNo,
                                        EvolveInventory_LotSerialNo: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_LotSerialNo,

                                        EvolveLocation_Code: req.body.lineDetailList[i].selectedInvList[j].EvolveLocation_Code
                                    }
                                    let addTransHistory = await Evolve.App.Services.Wms.SoShipment.SrvOption.addTransHistory(datas, req.body.EvolveUser_ID);
                                    if (addTransHistory instanceof Error) {

                                        error = true;
                                        errorMessage = 'ERROR WHILE ADD Trans History'

                                    } else {
                                        let details = {
                                            EvolveInventory_ID: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_ID,
                                            EvolveInventory_QtyPicked: req.body.lineDetailList[i].selectedInvList[j].EvolveInventory_QtyPicked,
                                        }

                                        let updateInv = await Evolve.App.Services.Wms.SoShipment.SrvOption.onPerformShipment(details);
                                        if (updateInv instanceof Error || updateInv.rowsAffected < 1) {

                                            error = true;
                                            errorMessage = 'ERROR WHILE UPDATE INVENTORY STATUS'

                                        }
                                    }
                                }


                            }
                        }
                    }
                }
            }

            if (error) {

                let reseponseObj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                res.send(reseponseObj);


            } else {

                let reseponseObj = { statusCode: 200, status: "success", message: "SO UPDATED TO SHIPMENT", result: null };
                res.send(reseponseObj);
            }
        } catch (error) {

            console.log("error.message???????" ,  error)
            Evolve.Log.error(" EERR####: Error While  Perform Shipment " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Perform Shipment " + error.message, result: null };
            res.send(obj);
        }
    },

    getSOList: async function (req, res) {
        try {

            req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;
            let result = await Evolve.App.Services.Wms.SoShipment.SrvOption.getSOList(req.body);
            if (result instanceof Error) {
                Evolve.Log.error(" EERR####: Error While  Get So List ");
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Get So List ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "SO LIST GET SUCCESSFULLY", result: result.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error While  Get So List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Get So List " + error.message, result: null };
            res.send(obj);
        }
    },

    getTransHistoryData: async function (req, res) {
        try {

            let EvolveSalesOrder = await Evolve.App.Services.Wms.SoShipment.SrvOption.getSONumber(req.body.EvolveSalesOrder_ID);

            if (EvolveSalesOrder instanceof Error) {
                Evolve.Log.error(" EERR####: Error While  EvolveSalesOrder List ");
                let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  EvolveSalesOrder List ", result: null };
                res.send(obj);
            }
            else {
                let data = {
                    EvolveProdOrders_OrderNo: EvolveSalesOrder.recordset[0].EvolveSalesOrder_Number,
                    EvolveTransHistory_LineNo: req.body.EvolveTransHistory_LineNo
                }

                let result = await Evolve.App.Services.Wms.SoShipment.SrvOption.getTransHistoryData(data);

                if (result instanceof Error) {
                    Evolve.Log.error(" EERR####: Error While  Get So List ");
                    let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Get Trans History Data ", result: null };
                    res.send(obj);
                }
                else {
                    let obj = { statusCode: 200, status: "success", message: "Trans History Data LIST GET SUCCESSFULLY", result: result.recordset };
                    res.send(obj);
                }
            }



        } catch (error) {
            Evolve.Log.error(" EERR####: Error While  Get So List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error While  Get So List " + error.message, result: null };
            res.send(obj);
        }
    },
    checkInventory: async function (req, res) {
        try {
            let errorMessage = '';
            let checkInventory = await Evolve.App.Services.Wms.SoShipment.SrvOption.checkInventoryPallet(req.body);
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


}