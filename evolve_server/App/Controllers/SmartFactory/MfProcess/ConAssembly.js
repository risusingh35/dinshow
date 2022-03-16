'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getParentItems: async function (req, res) {
        try {
            let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getParentItems();
            if (response instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Parent items",
                    result: null
                };
                res.send(obj);
            } else if(response.rowsAffected < 1){
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "No Parent Item Found !",
                    result: null
                };
                res.send(obj);


            }else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Parent Items get successfully",
                    result: response.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0572: Error while getting Parent Items "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0572: Error while getting Parent Items "+error.message, result: null };
            res.send(obj);
        }
    },
    getAssemblyBarcodeList: async function (req, res) {
        try {
            let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getAssemblyBarcodeList();
            if (response instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Barcode details getted successfully", result: response.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0573: Error while getting Assemble barcode list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0573: Error while getting Assemble barcode list "+error.message, result: null };
            res.send(obj);
        }
    },
    getOnchangeParent: async function (req, res) {
        try {
            let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getOnchangeParent(req.body);
            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Parent Description Get Successfully", result: response.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0574: Error while getting on change parent "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0574: Error while getting on change parent "+error.message, result: null };
            res.send(obj);
        }
    },
    getParentSerial: async function (req, res) {
        try {
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID
            let child_barcode = req.body.child_barcode;
            let check_validbarcode = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.checkValidChildBarcode(req.body);
            if (check_validbarcode instanceof Error || check_validbarcode.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Invalid child barcode", result: null };
                res.send(obj);
            } else {
                if (check_validbarcode.recordset[0].is_valid_barcode == 'true') {
                    let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getParentSerial(req.body);
                    if (response instanceof Error || response.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Parent Work order does not exist", result: null };
                        res.send(obj);
                    } else {
                        let child_serial_id = check_validbarcode.recordset[0].EvolveProdOrdersDetail_ID;
                        let update_child = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.updateChildParentSerial(req.body, response.recordset[0]);
                        if (update_child.rowsAffected > 0) {
                            let updateChildWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.updateChildWo(req.body);
                            let updateParentWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.updateParentWo(response.recordset[0]);
                            let update_assembly = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.insertAssebmly(response.recordset[0], child_serial_id);

                            if (update_assembly.rowsAffected > 0) {
                                let getChildWoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getChildWoData(req.body);
                                let getParentWoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getParentWoData(response.recordset[0]);
                                let getMilling = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getMillingData(req.body);
                                let getVibrationData = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.getVibrationData(req.body);
                                let millingPartTOK = new Date(getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK_TIMESTAMP);
                                let millingPartTime = millingPartTOK.getFullYear() + "-" + (millingPartTOK.getMonth() + 1) + "-" + millingPartTOK.getDate() + " " + millingPartTOK.getHours() + ":" + millingPartTOK.getMinutes() + ":" + millingPartTOK.getSeconds() + "." + millingPartTOK.getMilliseconds();
                                let vibrationPartOK = new Date(getVibrationData.recordset[0].EvolveVibration_Machine_at_Home_TIMESTAMP);
                                let vibrationPartTime = vibrationPartOK.getFullYear() + "-" + (vibrationPartOK.getMonth() + 1) + "-" + vibrationPartOK.getDate() + " " + vibrationPartOK.getHours() + ":" + vibrationPartOK.getMinutes() + ":" + vibrationPartOK.getSeconds() + "." + vibrationPartOK.getMilliseconds();


                                // Insert One Record With For get index Number...

                                let dataInTrans = {
                                    'ITEMNO': getChildWoData.recordset[0].EvolveItem_Code,
                                    'CPART': req.body.child_barcode,
                                    'WONO': getChildWoData.recordset[0].EvolveProdOrders_Order,
                                    'PSERIAL': response.recordset[0].EvolveProdOrdersDetail_Serial,
                                    'FZ1862276_TIME': millingPartTime,
                                    'FZ1862276_PartOK': (getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK == true) ? 1 : 0,
                                    'K3220_InputParameter09': getVibrationData.recordset[0].EvolveVibration_Input_Parameter_09_VALUE.toFixed(3),
                                    'K3220_InputParameter10': getVibrationData.recordset[0].EvolveVibration_Input_Parameter_10_VALUE.toFixed(3),
                                    'K3220_InputParameter11': getVibrationData.recordset[0].EvolveVibration_Input_Parameter_11_VALUE.toFixed(3),
                                    'K3220_InputParameter12': getVibrationData.recordset[0].EvolveVibration_Input_Parameter_12_VALUE.toFixed(3),
                                    'K3220_TIME': vibrationPartTime,
                                    'PPART': response.recordset[0].EvolveProdOrdersDetail_Serial,
                                }

                                let inBoundResult = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.saveInTrans(req.body, dataInTrans);
                                if (inBoundResult instanceof Error) {
                                    console.log("Error in Insert Data into InBound Data :", inBoundResult)
                                    let obj = { statusCode: 400, status: "fail", message: "Error in XML", result: null };
                                    res.send(obj);
                                }
                                else {
                                    console.log("ID ::", inBoundResult)
                                    let xml = Evolve.Xml.create('DocumentElement', { version: "1.0", encoding: 'UTF-8' });
                                    xml.ele('CHLDBKFLSH')
                                        .ele('DANO', Math.floor((Math.random() * 100000) + 1)).up()
                                        .ele('ITEMNO', getChildWoData.recordset[0].EvolveItem_Code).up()
                                        .ele('CPART', req.body.child_barcode).up()
                                        .ele('WONO', getChildWoData.recordset[0].EvolveProdOrders_Order).up()
                                        .ele('PLINE', 'IMM15').up()
                                        .ele('INVQTY', 1).up()
                                        .ele('PSERIAL', response.recordset[0].EvolveProdOrdersDetail_Serial).up()
                                        .ele('FZ1862276_TIME', millingPartTime).up()
                                        .ele('FZ1862276_PartOK', (getMilling.recordset[0].Evolve_Milling_Cycle_Part_OK == true) ? 1 : 0).up()
                                        .ele('K3220_InputParameter09', getVibrationData.recordset[0].EvolveVibration_Input_Parameter_09_VALUE.toFixed(3)).up()
                                        .ele('K3220_InputParameter10', getVibrationData.recordset[0].EvolveVibration_Input_Parameter_10_VALUE.toFixed(3)).up()
                                        .ele('K3220_InputParameter11', getVibrationData.recordset[0].EvolveVibration_Input_Parameter_11_VALUE.toFixed(3)).up()
                                        .ele('K3220_InputParameter12', getVibrationData.recordset[0].EvolveVibration_Input_Parameter_12_VALUE.toFixed(3)).up()
                                        .ele('K3220_TIME', vibrationPartTime).up()
                                        .end();
                                    xml.ele('PRNTBKFLSH')
                                        .ele('DANO', Math.floor((Math.random() * 100000) + 1)).up()
                                        .ele('ITEMNO', getParentWoData.recordset[0].EvolveItem_Code).up()
                                        .ele('PPART', response.recordset[0].EvolveProdOrdersDetail_Serial).up()
                                        .ele('WONO', getParentWoData.recordset[0].EvolveProdOrders_Order).up()
                                        .ele('PLINE', 'IP2RH').up()
                                        .ele('INVQTY', 1).up()
                                        .end();
                                    let xmldoc = xml.end({ pretty: true });
                                    //console.log(xmldoc);
                                    //console.log("xmldoc::", xmldoc)
                                    let fileName = req.body.child_barcode + "_xml.xml";
                                    Evolve.Fs.writeFile(Evolve.Config.dirPath + '/' + fileName, xmldoc, function (err) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log("The file was saved!");
                                            // Update status of XML.
                                            Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.updateInTransStatus(inBoundResult, 'L');
                                            Evolve.Fs.writeFile(Evolve.Config.dirPath_mounted + '/' + fileName, xmldoc, function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("The file was saved to Mounted Folder! ");
                                                }
                                            })
                                        }
                                    });
                                    let obj = { statusCode: 200, status: "success", message: "Parent Barcode Get Successfully !", result: response.recordset };
                                    res.send(obj);
                                }
                            }
                            else {
                                let obj = { statusCode: 400, status: "fail", message: "Barcode not ready for reprint option", result: null };
                                res.send(obj);
                            }
                        }
                        else {
                            let obj = { statusCode: 400, status: "fail", message: "Barcodes not updated", result: null };
                            res.send(obj);
                        }
                    }
                }
                else {
                    let obj = { statusCode: 400, status: "fail", message: "Scanned Barcode not in assembly queue", result: null };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0575: Error while getting parent serial "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0575: Error while getting parent serial "+error.message, result: null };
            res.send(obj);
        }
    },
    printAssyBarcode: async function (req, res) {
        try {
            console.log("Entered  in  print barcode,<<<")
            let child_barcode = req.body.child_barcode;
            let parent_barcode = req.body.parent_barcode;
            let ZplData = "^XA^FO40,30^GB540,260,8^FS\r\n" +
                "^FO40,160^GB540,0,8^FS\r\n" +
                "^LL100,^PW900^LH0,0\r\n" +
                "^MD3\r\n" +
                "^CF0,30\r\n" +
                "^FO180,70^FDFG PART NO:^FS^FO70,180^FDCHILD PART NO:^FS\r\n" +
                "^CF0,30\r\n" +
                "^FO180,110^SN" + parent_barcode + ",1,Y^FS\r\n" +
                "^FO70,220^SN" + child_barcode + ",1,Y^FS\r\n" +
                "^FT80,150^BQN,2,4^SN###" + parent_barcode + ",1,Y^FS\r\n" +
                "^FT450,280^BQN,2,4^SN###" + child_barcode + ",1,Y^FS\r\n" +
                "^PQ1\r\n" +
                "^XZ";
            // let ZplData = "^XA^FO40,30^GB540,260,8^FS^FO40,160^GB540,0,8^FS^LL100,^PW900^LH0,0^MD3^CF0,30^FO180,70^FDFG PART NO:^FS^FO70,180^FDCHILD PART NO:^FS^CF0,30^FO180,110^SN"+parent_barcode+",1,Y^FS^FO70,220^SN"+child_barcode+",1,Y^FS^FT80,150^BQN,2,4^SN###"+parent_barcode+",1,Y^FS^FT450,280^BQN,2,4^SN###"+child_barcode+",1,Y^FS^PQ1^XZ";

            console.log("Entered  in  :?? /  " ,  Evolve.Config.dirAssemblyPrint)
            Evolve.Fs.writeFile(Evolve.Config.dirAssemblyPrint + '/' + parent_barcode + '.txt', ZplData, function (err) {
                if (err) {
                    let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
                    res.send(obj);
                }
            });
        } catch (error) {
            Evolve.Log.error(" EERR0576: Error while printing Assy Barcode "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0576: Error while printing Assy Barcode "+error.message, result: null };
            res.send(obj);
        }
    },
    checkBarcodePrinted: async function (req, res) {
        try {
            let response = await Evolve.App.Services.SmartFactory.MfProcess.SrvAssembly.checkBarcodePrinted(req.body);
            console.log("Check Print Barcode ", response.recordsets);
            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Reprint barcode is valid", result: response.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0577: Error while checking Barcode printed "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0577: Error while checking Barcode printed "+error.message, result: null };
            res.send(obj);
        }
    },

}