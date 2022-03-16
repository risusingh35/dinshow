'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getReasonList: async function (req, res) {
    try {
      let reasonList = await Evolve.App.Services.Wms.MovePallet.SrvV1.getReasonList();
      if (reasonList instanceof Error || reasonList.rowsAffected < 1) {
        Evolve.Log.error("EERR3128: Error while getting reason list ");
        let obj = { statusCode: 400, status: "fail", message: "EERR3128 : Error while getting reason list ", result: null };
        res.send(obj);
      }
      else {
        let obj = { statusCode: 200, status: "success", message: "Reason List", result: reasonList.recordsets[0] };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error("EERR3129: Error while getting reason list " + error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR3129: Error while getting reason list " + error.message, result: null };
      res.send(obj);
    }
  },
  onMovePallet: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let error = false;
      let errorMessage = "";
      let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
      let data = req.body;
      console.log("req.body::::::::::::::::::::::",req.body);
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
                    'qcom:propertyValue': data.EvolveUnit_Code
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
                  "part": data.EvolveItem_Part,
                  "itemDetail": {
                    "operation": "A",
                    "lotserialQty": data.EvolveInventory_QtyAvailable,
                    "effDate": datetime,
                    "rmks": 'TEST',
                    "siteFrom": data.EvolveUnit_Code,
                    "locFrom": data.EvolveLocation_Code,
                    "lotserFrom": data.EvolveInventory_BatchNo,
                    "lotrefFrom": data.EvolveInventory_SerialNo,
                    "siteTo": data.EvolveUnit_Code,
                    "locTo": data.EvolveTransferLocation_Code,
                    "yn": 'true',
                    "yn1": 'true',
                    "yn2": 'true'
                  },
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
        error = true;
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
                error = true;
                errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:transferInvSingleItemResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];
              }
            } catch (error) {
              console.log("error.message", error.message);
              error = true;
              errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
            }
          };
        });


      } else {
        console.log("error.message", error.message);
        error = true;
        errorMessage = "Error While Update Data Via Qxtenxd" + error.message;
      }

      if (error == false) {
        let updateLocation = await Evolve.App.Services.Wms.MovePallet.SrvV1.updateInventory(req.body);
        if (updateLocation instanceof Error || updateLocation.rowsAffected < 1) {
          let obj = { statusCode: 400, status: "fail", message: "EERR####: Error While Update Location", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Pallet moved successfully", result: null };
          res.send(obj);
        }
      } else {
        let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
        res.send(obj);
      }






















      // let getTransTypeID = await Evolve.App.Services.Wms.MovePallet.SrvV1.getTransTypeID('RCPT-MV-PLT');
      // if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
      //   Evolve.Log.error("EERR3130 : Error while get EvolveTranstype_ID ");
      //   let obj = { statusCode: 400, status: "fail", message: "EERR3130 : Error while get EvolveTranstype_ID", result: null };
      //   res.send(obj);
      // }
      // else {
      //   req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
      //   let locationStatus = await Evolve.App.Services.Wms.MovePallet.SrvV1.getLocationStatus(req.body.EvolveToLocation_ID);
      //   if (locationStatus instanceof Error || locationStatus.rowsAffected < 1) {
      //     Evolve.Log.error("EERR3131: Error while get location status ");
      //     let obj = { statusCode: 400, status: "fail", message: "EERR3131 : Error while get location status ", result: null };
      //     res.send(obj);
      //   }
      //   else {
      //     req.body.EvolveUser_ID = req.EvolveUser_ID;
      //     req.body.EvolveInventory_Status = locationStatus.recordset[0].EvolveStatusCodeMstr_Code;
      //     let updateLocation = await Evolve.App.Services.Wms.MovePallet.SrvV1.updateLocation(req.body);
      //     if (updateLocation instanceof Error || updateLocation.rowsAffected < 1) {
      //       Evolve.Log.error("EERR3132: Error while change location ");
      //       let obj = { statusCode: 400, status: "fail", message: "EERR3132 : Error while change location", result: null };
      //       res.send(obj);
      //     } else {
      //       let error = false;
      //       if (req.body.EvolveInventory_IsPicked == true) {
      //         let updatePickPalletLoc = await Evolve.App.Services.Wms.MovePallet.SrvV1.updatePickPalletLoc(req.body);
      //         if (updatePickPalletLoc instanceof Error || updatePickPalletLoc.rowsAffected < 1) {
      //           error = true;
      //           Evolve.Log.error("EERR3133: Error while update picklist details ");
      //           let obj = { statusCode: 400, status: "fail", message: "EERR3133 : Error while update picklist details", result: null };
      //           res.send(obj);
      //         }
      //       }
      //       if (error == false) {
      //         let history_Data = {
      //           'EvolveCompany_ID': req.EvolveCompany_ID,
      //           'EvolveUnit_ID': req.EvolveUnit_ID,
      //           'EvolveTranstype_code': 'RCPT-MV-PLT',
      //           'EvolveItem_ID': req.body.EvolveItem_ID,
      //           'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
      //           'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
      //           'EvolveInventoryTransHistory_LotSerial': req.body.EvolveInventory_LotNumber,
      //           'EvolveInventoryTransHistory_RefNumber': req.body.EvolveInventory_RefNumber,
      //           'EvolveInventoryTransHistory_FromRefNumber': null,
      //           'EvolveInventoryTransHistory_QtyRequire': null,
      //           'EvolveInventoryTransHistory_Qty': req.body.EvolveInventory_QtyOnHand,
      //           'EvolveUom_ID': null,
      //           'EvolveLocation_FromID': req.body.EvolveLocation_FromID,
      //           'EvolveLocation_ToID': req.body.EvolveToLocation_ID,
      //           'EvolveReason_ID': req.body.EvolveReason_ID,
      //           'EvolveInventoryTransHistory_InventoryStatus': req.body.EvolveInventory_Status,
      //           'EvolveInventoryTransHistory_PostingStatus': req.body.EvolveInventory_PostingStatus,
      //           'EvolveInventoryTransHistory_Remark': null,
      //           'EvolveUser_ID': req.EvolveUser_ID
      //         };
      //         let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
      //         if (add_history instanceof Error || add_history.rowsAffected < 1) {
      //           Evolve.Log.error("EERR3134: Error while adding  history");
      //           let obj = { statusCode: 400, status: "fail", message: "EERR3134 : Error while adding  history", result: null };
      //           res.send(obj);
      //         }
      //         else {
      //           let ioFields = {
      //             'EvolveItem_Code': req.body.EvolveItem_Code,
      //             'EvolveInventory_QtyOnHand': req.body.EvolveInventory_QtyOnHand,
      //             'FromUnitCode': '10-100',
      //             'ToUnitCode': '10-100',
      //             'FromLocation': req.body.FromLocName,
      //             'ToLOcation': req.body.locName,
      //             'EvolveInventory_LotNumber': req.body.EvolveInventory_LotNumber,
      //             'EvolveInventory_RefNumber': req.body.EvolveInventory_RefNumber,
      //           };
      //           let ioData = {
      //             EvolveIO_Data: ioFields,
      //             EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
      //             EvolveIO_Code: "EVOLVEMOVEOB", // EVOLVEPOOB = po receive
      //             EvolveIO_Data_Formate: "XML",
      //             EvolveIO_ERP_Type: "QAD",
      //             EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
      //             EvolveIO_File_Data: ''
      //           }

      //           let addIoData = await Evolve.App.Services.Wms.MovePallet.SrvV1.addIOData(ioData);
      //           if (addIoData instanceof Error || addIoData.rowsAffected < 1) {
      //             Evolve.Log.error("EERR3135: Error while adding io data");
      //             let obj = { statusCode: 400, status: "fail", message: "EERR3135 : Error while adding io data", result: null };
      //             res.send(obj);
      //           }
      //           else {
      //             let details = await Evolve.App.Services.Wms.MovePallet.SrvV1.getPalletDetails(req.body.EvolveInventory_ID);
      //             if (details instanceof Error || details.rowsAffected < 1) {
      //               Evolve.Log.error("EERR3136: Error while get updated pallet details ");
      //               let obj = { statusCode: 400, status: "fail", message: "EERR3136 : Error while get updated pallet details", result: null };
      //               res.send(obj);
      //             } else {
      //               let obj = { statusCode: 200, status: "success", message: "Pallet moved successfully", result: details.recordset[0] };
      //               res.send(obj);
      //             }

      //           }
      //         }
      //       }
      //     }

      //   }
      // }
    } catch (error) {
      Evolve.Log.error("EERR3137: Error while getting reason list " + error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR3137: Error while getting reason list " + error.message, result: null };
      res.send(obj);
    }
  },
  getLocationList: async function (req, res) {
    try {
      let locationList = await Evolve.App.Services.Wms.MovePallet.SrvV1.getLocationList();
      if (locationList instanceof Error) {
        Evolve.Log.error("EERR3138: Error while getting location list ");
        let obj = { statusCode: 400, status: "fail", message: "EERR3138 : Error while getting location list ", result: null };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Location List",
          result: locationList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR3139: Error while getting location list " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR3139: Error while getting location list " + error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getscannedPallet: async function (req, res) {
    try {
      let pallet = await Evolve.App.Services.Wms.MovePallet.SrvV1.getscannedPallet(req.body);
      if (pallet instanceof Error) {
        Evolve.Log.error("EERR3140: Error while get pallet details ");
        let obj = { statusCode: 400, status: "fail", message: "EERR3140 : Error while get pallet details", result: null };
        res.send(obj);
      }
      else if (pallet.rowsAffected < 1) {
        let obj = { statusCode: 400, status: "fail", message: "Invalid pallet id. Please re-enter correct pallet id !", result: null };
        res.send(obj);
      } else {

        pallet.recordset = pallet.recordset.map(v => {

          if (v.EvolveItem_ID == null || v.EvolveItem_ID == undefined || v.EvolveItem_ID == '') {

            v.EvolveItem_Part = v.EvolveInventory_MemoItem;
          }
          return v
        })

        let obj = { statusCode: 200, status: "success", message: "Pallet details", result: pallet.recordset[0] };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error("EERR3141 : Error while get pallet details " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "EERR3141 : Error while get pallet details " + error.message,
        result: null
      };
      res.send(obj);
    }
  },
  rePrintPallet: async function (req, res) {
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

      // console.log("Xpl data >> " ,ZplData )

      // const data = Evolve.Config.printer['url']+"?KonnectID="+Evolve.Config.printer['KonnectID']+"&data="+ZplData;
      //             Evolve.Axios.get(data)
      //             .then((response) => {
      //               if(response.status == 200){
      let pallet = await Evolve.App.Services.Wms.MovePallet.SrvV1.printPallet(req.body);
      if (pallet instanceof Error) {
        Evolve.Log.error("EERR3231: Error while  print pallet ");
        let obj = { statusCode: 400, status: "fail", message: "EERR3231 : Error while  print pallet", result: null };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Barcode printed successfully",
          result: null
        };
        res.send(obj);
      }

    } catch (error) {
      Evolve.Log.error(" EERR3152: Error while re-print pallet " + error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR3152: Error while re-print pallet " + error.message, result: null };
      res.send(obj);
    }
  },

}