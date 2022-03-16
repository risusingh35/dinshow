'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getItemList: async function (req, res) {
        try {
            let getItemList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getItemList();

            
            let obj = { statusCode: 200, status: "success", message: "Item List", result: getItemList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0140: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR0140: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let getUomList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getUomList();
            let obj = { statusCode: 200, status: "success", message: "UOM List", result: getUomList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0141: Error while getting Uom list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0141: Error while getting Uom list " + error.message, result: null };
            res.send(obj);
        }
    },

    getSupplierList: async function (req, res) {
        try {
            let getSupplierList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getSupplierList();
            let obj = { statusCode: 200, status: "success", message: "Supplier List", result: getSupplierList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0142: Error while getting Uom list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0142: Error while getting Uom list " + error.message, result: null };
            res.send(obj);
        }
    },

    getDocument: async function (req, res) {
        try {
            let getDocument = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getDocument();
            let obj = { statusCode: 200, status: "success", message: "Document List", result: getDocument.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0143: Error while getting document " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0143: Error while getting document " + error.message, result: null };
            res.send(obj);
        }
    },

    // new
    addMaterialIn: async function (req, res) {
        try {
            let errorMessage = '';
            let gateDetailError = false;
            for (let i = 0; i < req.body.allParcelDetails.length; i++) {
                let allParcelDetails = req.body.allParcelDetails[i];
                let isImage = true;
                allParcelDetails.EvolveGate_ModuleType = "MATRL";
                if (allParcelDetails.image != '') {
                    isImage = false;
                    let imageData = allParcelDetails.image;
                    let extention = imageData.substring("data:image/".length, imageData.indexOf(";base64"));
                    let fileName = allParcelDetails.docNo + "." + extention;
                    allParcelDetails.imageName = fileName;
                    let base64Data = imageData.replace(/^data:image\/png;base64,/, "");
                    base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
                    Evolve.Fs.writeFile(
                        Evolve.Config.imageUploadPath + fileName,
                        base64Data, "base64", function (err) {
                            if (err) {
                                Evolve.Log.error("Error while save image");
                                // res.json(0);
                            } else {
                                Evolve.Log.info("Image Saved Successfully");
                            }
                        }
                    );
                    allParcelDetails.EvolveGate_Image = allParcelDetails.imageName;
                    isImage = true;
                }
                else {
                    req.body.EvolveGate_Image = "";
                    isImage = true;
                }
                if (isImage == true) {
                    allParcelDetails.EvolveUser_ID = req.EvolveUser_ID;

                    // check ewaybill number
                    let checkEwayBillNoExist = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkEwayBillNoExist(allParcelDetails);
                    if (checkEwayBillNoExist instanceof Error) {
                        gateDetailError = true;
                        errorMessage = "ERROR WHILE CHCEK EWAY BILL EXIST";
                    }
                    else if (checkEwayBillNoExist.rowsAffected < 1) { // IF EWAY BILL NOT EXIST
                        let addGateDataMaterialIn = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.addGateDataMaterialIn(allParcelDetails);
                        if (addGateDataMaterialIn instanceof Error || addGateDataMaterialIn.rowsAffected < 1) {
                            gateDetailError = true;
                            errorMessage = "Error while in material";
                            Error.Log.error(addGateDataMaterialIn.message);
                        }
                        else {
                            allParcelDetails.EvolveGate_ID = addGateDataMaterialIn.recordset[0].inserted_id;
                            let getDocumentTypeId = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getDocumentTypeId(allParcelDetails);

                            if (getDocumentTypeId instanceof Error || getDocumentTypeId.rowsAffected < 1) {

                                gateDetailError = true;
                                errorMessage = "Document Not Found";
                            }
                            else {
                                allParcelDetails.EvolveDocument_ID = getDocumentTypeId.recordset[0].EvolveDocumentType_ID;
                            }
                            let ietmListArray = allParcelDetails.itemList;
                            for (let i = 0; i < ietmListArray.length; i++) {
                                gateDetailError = false;
                                let getItemId = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkItemNameDesc(ietmListArray[i].productDesc);

                                if (getItemId instanceof Error || getItemId.rowsAffected < 1) {
                                    gateDetailError = true;
                                    errorMessage = "Item Not Found";
                                }
                                else {
                                    ietmListArray[i].EvolveItem_ID = getItemId.recordset[0].EvolveItem_ID
                                    let checkUom = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkUom(ietmListArray[i].qtyUnit);

                                    if (checkUom instanceof Error) {
                                        gateDetailError = true;
                                        errorMessage = "Error While Check UOM";
                                    }
                                    else if (checkUom.rowsAffected > 0) {
                                        ietmListArray[i].EvolveUom_ID = checkUom.recordset[0].EvolveUom_ID
                                    }
                                    else {
                                        let addUom = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.addUom(ietmListArray[i].qtyUnit, req.EvolveUser_ID);

                                        if (addUom instanceof Error || addUom.rowsAffected < 1) {
                                            gateDetailError = true;
                                            errorMessage = "Error While Add UOM";
                                        }
                                        else {
                                            ietmListArray[i].EvolveUom_ID = addUom.recordset[0].inserted_id;
                                        }
                                    }

                                    if (gateDetailError == false) {
                                        let addGateDataDetailMaterialIn = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.addGateDataDetailMaterialIn(allParcelDetails, ietmListArray[i]);

                                        if (addGateDataDetailMaterialIn instanceof Error || addGateDataMaterialIn.rowsAffected < 1) {
                                            Evolve.Log.error(addGateDataDetailMaterialIn.message);
                                            gateDetailError = true;
                                            errorMessage = "Error While Add Gate Data Details Data";
                                        }
                                    }
                                }

                            }
                        }
                    }
                    else {
                        gateDetailError = true;
                        errorMessage = "EWAY BILL IS ALREADY EXIST";
                        Error.Log.error("EWAY BILL IS ALREADY EXIST");
                    }
                }
            }
            if (gateDetailError == false) {
                let obj = { statusCode: 200, status: "success", message: "Material In Successfully ", result: null };
                res.send(obj);
                await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.updateEntryGateNumber();
            }
            else {
                let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null }; //"ERROR WHILE ADD MATERIAL - " + 
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0144: Error while add Gate Data Material in " + error.message);
            let obj = { statusCode: 400, status: "fail", message: "Error while add Gate Data Material in ", result: null };
            res.send(obj);
        }
    },

    getEntryGateNumber: async function (req, res) {
        try {
            // let getEntryGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateEntryNumber');
            let barcode;
            let date = new Date();
            let day = date.getDate();
            if (day < 10) {
                day = '0' + day
            }
            let mm = date.getMonth() + 1;
            if (mm < 10) {
                mm = '0' + mm
            }
            let yy = date.getFullYear() + "";
            yy = yy.substring(1);
            yy = yy.substring(1);

            let getEntryGateNumber = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getLastReference();


            if (getEntryGateNumber instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error While Get Gate Entry number not found ! ", result: null };
                res.send(obj);
            }
            else {
                if (getEntryGateNumber.rowsAffected == 1) {


                    let count = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getIdCount();
                    count = count.recordset[0].count
                    let lastCode = getEntryGateNumber.recordset[0].EvolveGate_RefNumber;
                    lastCode = lastCode.substring(1)
                    lastCode = lastCode.substring(1)
                    console.log("last code >>>>>", lastCode);
                    let num = parseInt(count) + 1;
                    var str = "" + num;
                    var pad = "0000";
                    var codeString = pad.substring(0, pad.length - str.length) + str; //0001
                    barcode = "GN" + day + mm + yy + codeString;
                }
                else {
                    barcode = "GN" + day + mm + yy + "0001";

                }
                let obj = { statusCode: 200, status: "success", message: "Gate entry number ", result: barcode };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0145: Error while getting Entry Gate Number " + error.message);
        }
    },

    updateEntryGateNumber: async function () {
        try {
            let getExitGateNumber = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('gateEntryNumber');
            var lastExitGateNumber = getExitGateNumber.recordset[0].EvolveUnitConfig_Value;
            var dateObj = new Date();
            var month = dateObj.getMonth() + 1;
            var year = dateObj.getFullYear().toString().substr(-2);
            var newExitGateNumber = ''
            if (lastExitGateNumber.includes(month + "" + year)) {
                var padMonth = "00";
                var newMonth = padMonth.substring(0, padMonth.length - (month.toString()).length) + month;
                var oldCount = (parseInt(lastExitGateNumber.toString().substr(6, 9)) + 1).toString(); // Get Old Incremental Number from Old 
                var pad = "0000";
                var newCount = pad.substring(0, pad.length - oldCount.length) + oldCount; //0001
                newExitGateNumber = 'GN' + newMonth + '' + year + '' + newCount;
            }
            else {
                var padMonth = "00";
                var newMonth = padMonth.substring(0, padMonth.length - (month.toString()).length) + month;
                newExitGateNumber = 'GN' + newMonth + '' + year + '0001';
            }
            let updateExitGateNumber = await Evolve.App.Services.Unit.UnitServices.updateUnitConfigValue('gateEntryNumber', newExitGateNumber);
            Evolve.Log.info("New gate entry number updated :" + newExitGateNumber);

        } catch (error) {
            Evolve.Log.error(" EERR0146: Error while updating Entry Gate Number " + error.message);
        }
    },

    getSupplierPo: async function (req, res) {
        try {
            let getSupplierPo = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getSupplierPo(req.body.EvolveSupplier_Code);;
            if (getSupplierPo instanceof Error || getSupplierPo.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Supplier Purchase Order Not Found ! ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Supplier Purchase Order ", result: getSupplierPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0147: Error while getting supplier Po " + error.message);
        }
    },

    getPoDetails: async function (req, res) {
        try {
            let getPoDetails = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getPoDetails(req.body.EvolvePurchaseOrder_Number);;
            if (getPoDetails instanceof Error || getPoDetails.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "PO detail not found ! ", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Purchase Order detail ", result: getPoDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0148: Error while getting Po Details " + error.message);
        }
    },

    checkDeliveryChallan: async function (req, res) {
        try {
            if (req.body.documentType == 'PO' ) {
                let List = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkDeliveryChallan(req.body.EvolvePurchaseOrder_Number);
                if (List instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Get check Delivery Challan !",
                        result: List.message
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Selected check Delivery Challan",
                        result: List.recordset
                    };
                    res.send(obj);
                    console.log("List.recordset>>>>>>>>>>>>>>>>.......", List.recordset);
                }
            }else if(req.body.documentType == 'EWAYBILL'){


            //     let checkEwayBillExist = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkEwayBillExist(req.body.EvolvePurchaseOrder_Number);
            // console.log("checkEwayBillExist",checkEwayBillExist);
            // if(checkEwayBillExist instanceof Error) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: "Error While Check EwayBill Number Exist Or Not!!!",
            //         result: null
            //     };
            //     res.send(obj);
            // }
            // else if(checkEwayBillExist.rowsAffected > 0) {
            //     let obj = {
            //         statusCode: 400,
            //         status: "fail",
            //         message: `EwayBill Number : ${req.body.EvolvePurchaseOrder_Number} Allready Exist!!`,
            //         result: null
            //     };
            //     res.send(obj);
            // }
            // else{
                let apiObjectData = await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.generateGSPJSON('EWAYBILLDETAILSBYEWAYBILLNUMBER', req.EvolveUser_ID , req.EvolveUnit_ID);
                // console.log("apiObjectData>>>>>", apiObjectData);

                if (apiObjectData instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "JSON not found!",
                        result: null
                    };
                    res.send(obj);
                } else {
                    apiObjectData.url = apiObjectData.url + req.body.EvolvePurchaseOrder_Number;
                    let config = {
                        headers: apiObjectData.config.headers,
                    }

                    console.log("url>>>>>>>", apiObjectData.url);
                    console.log("config>>>>>>>>>>>>>>>", config);

                    let responce = await Evolve.Axios.get(apiObjectData.url, config);
                    let jsonParseResponse = JSON.parse(responce.data.data);
                    console.log("jsonParseResponse>>>>>>>>>>>>>>>>", jsonParseResponse);
                    let itemData = [];
                    for (let i = 0; i < jsonParseResponse.itemList.length; i++) {
                        let itemArray = jsonParseResponse.itemList[i];
                        // let checkItemName = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkItemName(itemArray.productDesc);
                        // if (checkItemName instanceof Error) {
                        //     let obj = {
                        //         statusCode: 400,
                        //         status: "fail",
                        //         message: "Item Not Found",
                        //         result: null
                        //     };
                        //     res.send(obj);
                        // }
                        // else if(checkItemName.rowsAffected == 1){
                        //     itemData.push({
                        //         EvolveItem_ID : checkItemName.recordset[0].EvolveItem_ID,
                        //         EvolveItem_Desc1 : checkItemName.recordset[0].EvolveItem_Desc1,
                        //         incomingQty : itemArray.quantity,
                        //     });
                        // }else {
                            itemData.push({
                                EvolveItem_Desc1 : itemArray.productDesc,
                                incomingQty : itemArray.quantity,
                            });
                        // }
                    }
                    let objToSend = {};
                    let getSupplierDetails = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getSupplierDetails(jsonParseResponse.fromGstin);
                    if(getSupplierDetails.rowsAffected == 1) {
                        objToSend.EvolveSupplier_ID = getSupplierDetails.recordset[0].EvolveSupplier_ID;
                    }
                    objToSend.transporterName = jsonParseResponse.transporterName;
                    objToSend.totInvValue = jsonParseResponse.totInvValue;
                    objToSend.chalanNo = jsonParseResponse.docNo;
                    objToSend.vehicleNo = jsonParseResponse.VehiclListDetails[0].vehicleNo;
                    objToSend.itemDetails = itemData
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: " Gate In Details !! ",
                        result: objToSend
                    };
                    res.send(obj);
                }
            // }
            } else { 
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Gate In Details !! ",
                    result: ''
                };
                res.send(obj);
            }
        } catch (error) {
            console.log("Error In API :::::::::",error.response.data);
            Evolve.Log.error(" EERR####: Error while get check Delivery Challan " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get check Delivery Challan " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    checkEwayBillNo: async function (req, res) {
        try {

            console.log("user id>>>>", req.EvolveUser_ID);
            console.log("Unit id>>>>", req.EvolveUnit_ID);
            Evolve.Log.info("EWAY Bill No. " + req.body.eWayBillNo);

            let checkEwayBillExist = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkEwayBillExist(req.body.eWayBillNo);
            console.log("checkEwayBillExist",checkEwayBillExist);
            console.log("checkEwayBillExist.recordset.length",checkEwayBillExist.recordset.length);
            if(checkEwayBillExist instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check EwayBill Number Exist Or Not!!!",
                    result: null
                };
                res.send(obj);
            }else if(checkEwayBillExist.recordset.length > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: `EwayBill Number : ${req.body.eWayBillNo} Allready Exist!!`,
                    result: null
                };
                res.send(obj);
            }else{
                let apiObjectData = await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.generateGSPJSON('EWAYBILLDETAILSBYEWAYBILLNUMBER', req.EvolveUser_ID);
            // console.log("apiObjectData>>>>>", apiObjectData);

            if (apiObjectData instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "JSON not found!",
                    result: null
                };
                res.send(obj);
            } else {
                apiObjectData.url = apiObjectData.url + req.body.eWayBillNo;
                let config = {
                    headers: apiObjectData.config.headers,
                }

                console.log("url>>>>>>>", apiObjectData.url);
                console.log("config>>>>>>>>>>>>>>>", config);

                let responce = await Evolve.Axios.get(apiObjectData.url, config);
                let jsonParseResponse = JSON.parse(responce.data.data);
                console.log("jsonParseResponse>>>>>>>>>>>>>>>>", jsonParseResponse);

                for (let i = 0; i < jsonParseResponse.itemList.length; i++) {
                    const itemArray = jsonParseResponse.itemList[i];
                    let checkItemName = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkItemName(itemArray.productName);
                    if (checkItemName instanceof Error || checkItemName.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Item Not Found",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let jsonParseResponse = JSON.parse(responce.data.data);

                        jsonParseResponse.EvolveItem_ID = checkItemName.recordset[0].EvolveItem_ID;

                        // console.log("jsonParseResponse>>>>", jsonParseResponse);
                        let obj = { statusCode: 200, status: "success", message: "Item Get Successfully By EwayBill Number", result: jsonParseResponse };
                        res.send(obj);
                    }
                }
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0149: Error while checking E-way Bill No " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0149: Error while checking E-way Bill No ", result: null };
            res.send(obj);
        }
    },

    // checkEwayBillNo: async function (req, res) {
    //     try {
    //         let error = false;
    //         console.log("user id>>>>", req.EvolveUser_ID);
    //         Evolve.Log.info("EWAY Bill No. " + req.body.eWayBillNo);

    //         let apiObjectData = await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.generateGSPJSON('EWAYBILLDETAILSBYEWAYBILLNUMBER', req.EvolveUser_ID);
    //         // console.log("apiObjectData>>>>>", apiObjectData);

    //         if (apiObjectData instanceof Error) {
    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "JSON not found!",
    //                 result: null
    //             };
    //             res.send(obj);
    //         } else {
    //             apiObjectData.url = apiObjectData.url + req.body.eWayBillNo;
    //             let config = {
    //                 headers: apiObjectData.config.headers,
    //             }

    //             console.log("url>>>>>>>", apiObjectData.url);
    //             console.log("config>>>>>>>>>>>>>>>", config);

    //             let responce = await Evolve.Axios.get(apiObjectData.url, config);
    //             let jsonParseResponse = JSON.parse(responce.data.data);
    //             console.log("jsonParseResponse>>>>>>>>>>>>>>>>", jsonParseResponse);

    //             for (let i = 0; i < jsonParseResponse.itemList.length; i++) {
    //                 const itemArray = jsonParseResponse.itemList[i];
    //                 if (itemArray.productName.toLowerCase().includes("freight") || itemArray.productDesc.toLowerCase().includes("freight")) {

    //                 }
    //                 else{
    //                     if (itemArray.productName == "") {
    //                         let checkItemNameDesc = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkItemNameDesc(itemArray.productDesc);

    //                         if (checkItemNameDesc instanceof Error || checkItemNameDesc.rowsAffected < 1) {
    //                             error = true;
    //                         }
    //                     }
    //                     else{
    //                         let checkItemName = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkItemName(itemArray.productName);

    //                         if (checkItemName instanceof Error || checkItemName.rowsAffected < 1) {
    //                         error = true;
    //                         }
    //                     }
    //                 }

    //             }
    //             let obj = { statusCode: 200, status: "success", message: "Item Get Successfully By EwayBill Number", result: jsonParseResponse };
    //                 res.send(obj);
    //             // if (error == false) {
    //             //     // let jsonParseResponse = JSON.parse(responce.data.data);
    //             //     // jsonParseResponse.EvolveItem_ID = checkItemName.recordset[0].EvolveItem_ID;

    //             //     // console.log("jsonParseResponse>>>>", jsonParseResponse);
    //             //     let obj = { statusCode: 200, status: "success", message: "Item Get Successfully By EwayBill Number", result: jsonParseResponse };
    //             //     res.send(obj);
    //             // }
    //             // else{
    //             //     let obj = {
    //             //         statusCode: 400,
    //             //         status: "fail",
    //             //         message: "Item Not Found",
    //             //         result: null
    //             //     };
    //             //     res.send(obj);
    //             // }
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0149: Error while checking E-way Bill No " + error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR0149: Error while checking E-way Bill No ", result: null };
    //         res.send(obj);
    //     }
    // },

    // GSP Data Fun


    generateGSPJSON: async function (EvolveGSPApi_Code, EvolveUser_ID , EvolveUnit_ID) {
        try {

            let EvolveDocument_Code = Evolve.Config.DOCUMENTCODE;
            let getDocumentDetails = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getDocumentDetails(EvolveDocument_Code);
            console.log("getDocumentDetails",getDocumentDetails);
            if (getDocumentDetails.rowsAffected > 0) {
                let eInvGD = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getEInvoiceGSPApiData(getDocumentDetails.recordset[0].EvolveGSP_ID, getDocumentDetails.recordset[0].EvolveDocument_ID, EvolveGSPApi_Code);
                if (eInvGD.rowsAffected > 0) {
                    let headersOBJ = {};
                    let apiBodyObj = {};
                    for (let eGspAPIObj of eInvGD.recordset) {
                        if (eGspAPIObj.eGP == 0 && eGspAPIObj.eGRP == 'HEADERS') {
                            headersOBJ[eGspAPIObj.eCD] = await Evolve.App.Controllers.eGateControl.GateIn.ConMaterialInv2.getTypeAsperDatatype(eGspAPIObj.eCD, eGspAPIObj.eGDT, eGspAPIObj.eGDV, eGspAPIObj.eGD, eGspAPIObj.eGID, 0, EvolveUser_ID , EvolveUnit_ID);
                        }
                    }
                    return {
                        config: { headers: headersOBJ },
                        body: apiBodyObj,
                        url: eInvGD.recordset[0].EvolveGSPApi_URL
                    }

                } else {
                    return new Error("Invalid Document ID")
                }
            } else {
                return new Error("Invalid DOcument ID")
            }


            // } else {
            // 	return new Error("Invalid Invoice ID")
            // }


        } catch (error) {
            Evolve.Log.error('Error in egenerateGSPJSON : ' + error);
            return error;
        }

    },

    getTypeAsperDatatype: async function (code, datatype, defaultValue, isDefault, EvolveGSPApiAttributes_ID, EvolveInvoiceLine_ID, EvolveUser_ID , EvolveUnit_ID) {
        try {

            if (isDefault == true) {
                if (datatype == 'NUMBER') {
                    console.log("NUMBER ::", defaultValue);
                    return parseFloat(defaultValue).toFixed(2);
                } else {
                    if (defaultValue == 'NULL' || defaultValue == 'null') {
                        return null;
                    } else {
                        return defaultValue;
                    }
                }
            }
            if (defaultValue == 'X-FLYNN-S-REK') {
                // return Evolve.REKKey;
                return await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getInvoiceHeaderValueFromUnit('EvolveUnit_Rek', EvolveUnit_ID);
            }
            if (defaultValue == 'X-FLYNN-N-IRP-GSTIN' || defaultValue == 'X-FLYNN-N-EWB-GSTIN') {
                //return Evolve.EvolveEinvoiceConfig.IRPGSTIN;
                return await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getInvoiceHeaderValueFromUnit('EvolveUnit_Gstin', EvolveUnit_ID);
            }
            if (defaultValue == 'X-FLYNN-N-IRP-USERNAME' || defaultValue == 'X-FLYNN-N-EWB-USERNAME') {
                //return Evolve.EvolveEinvoiceConfig.IRPUSERNAME;
                return await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getInvoiceHeaderValueFromUnit('EvolveUnit_GstnUser', EvolveUnit_ID);
            }
            if (defaultValue == 'X-FLYNN-N-IRP-PWD' || defaultValue == 'X-FLYNN-S-IRP-PWD' || defaultValue == 'X-FLYNN-S-EWB-PWD') { // X-FLYNN-S-IRP-PWD
                // return Evolve.AESKey;
                return await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getInvoiceHeaderValueFromUnit('EvolveUnit_GstnPassEnc', EvolveUnit_ID);
            }
            if (defaultValue == 'X-FLYNN-N-ORG-ID') {
                return Evolve.EvolveEinvoiceConfig.ORGANIZATIONID;
            }

            // Auth Token for VAYANA

            if (defaultValue == 'X-FLYNN-N-USER-TOKEN') {
                // 
                console.log("IOSERVERURL>>>", Evolve.Config.IOSERVERURL);

                let tokenUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/getTokenInServer';
                let getTokenFromIo = await Evolve.Axios.get(tokenUrl);
                // console.log("getTokenFromIo>>>>>>>", getTokenFromIo.data);

                return getTokenFromIo.data;
            }

            // Auth Token for CYGNET
            // if (defaultValue == 'auth-token') {
            //     return Evolve.AuthToken['CYGNET'];
            // }

            // Auth Token for KPMG
            // if (defaultValue == 'Authorization') {
            //     return "Bearer " + Evolve.AuthToken['KPMG'];
            // }

            if (defaultValue == 'OBJECT') {
                return {};
            }
            else if (defaultValue == 'ARRAY') {
                return [];
            }
            // else {
            // 	let mappingValue = await Evolve.App.Services.Einvoice.EinvoiceServices.getInvoiceApiAttrValue(EvolveGSPApiAttributes_ID, EvolveInvoiceLine_ID);
            // 	if (mappingValue instanceof Error) {

            // 		if (datatype == 'NUMBER') {
            // 			return parseFloat(defaultValue).toFixed(2);
            // 		} else {
            // 			if (defaultValue == 'NULL' || defaultValue == 'null') {
            // 				return null;
            // 			} else {
            // 				if (isNaN(defaultValue)) {
            // 					defaultValue = defaultValue.replace(new RegExp("'", 'g'), "").trim(); // Remove ' from String.
            // 					defaultValue = defaultValue.replace(new RegExp(",", 'g'), "").trim(); // Remove , from String.
            // 				}
            // 				return defaultValue;
            // 			}
            // 		}

            // 	} else {
            // 		//console.log("code $$$$$$$$$$$$$$$$$$$$$$$$$$$", code);
            // 		//console.log("defaultValue $$$$$$$$$$$$$$$$$$$$$$$$$$$", mappingValue);
            // 		if (isNaN(mappingValue)) {
            // 			mappingValue = mappingValue.replace(new RegExp("'", 'g'), "").trim(); // Remove ' from String.
            // 			mappingValue = mappingValue.replace(new RegExp(",", 'g'), "").trim(); // Remove , from String.
            // 		}

            // 		if (datatype == 'NUMBER') {
            // 			if (!isNaN(parseFloat(mappingValue)) && isFinite(mappingValue)) {
            // 				//console.log("it's number")
            // 				return parseFloat(mappingValue).toFixed(2);
            // 			} else {
            // 				//console.log("is not namber")
            // 				return 0;
            // 			}

            // 		} else {
            // 			// Unit
            // 			if (code == 'Unit' || code == 'uqc') {
            // 				//console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$ UNIT");
            // 				let unitData = await Evolve.App.Services.Einvoice.EinvoiceServices.getEinvoiceUnit(mappingValue);
            // 				if (unitData instanceof Error || unitData.rowsAffected < 1) {
            // 					// return mappingValue;
            // 					return 'UNT'; // For Default
            // 				} else {
            // 					return unitData.recordset[0].EvolveItemUnitMaster_GSPCODE;
            // 				}
            // 			} else {
            // 				return mappingValue;
            // 			}
            // 		}
            // 	}
            // }
        } catch (error) {
            Evolve.Log.error('Error in filter Request Data : ' + error);
            return "";
        }
    },

    createOrUpateGateIn: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let proccedFurther = true;
            if(req.body.EvolveGate_ModuleType == 'EWAYBILL') {
                let checkDuplicateEntry = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.checkDuplicateEntry(req.body);
            if(checkDuplicateEntry instanceof Error) {
                proccedFurther = false;
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Check Duplicate Entry!!",
                    result: null
                };
                res.send(obj);
            }else if(checkDuplicateEntry.rowsAffected > 0) {
                proccedFurther = false;
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Gate Entry Allready Created With Given Document ",
                    result: null
                };
                res.send(obj);
            }
            }

            if(proccedFurther == true) {
                req.body.EvolveGate_RefNumber = Evolve.Generator.generate("GATE")

            if (req.body.EvolveGate_RefNumber == undefined || req.body.EvolveGate_RefNumber.length == 0) {
                Evolve.Log.error(" EERR#### : Error while assign Gate RefNumber ")

                errorMessage = 'Error while assign Gate RefNumber'
            } else {

                req.body.EvolveGate_RefNumber = (req.body.EvolveGate_RefNumber.toString()).replace(/ -/g, '')
                req.body.EvolveGate_RefNumber = req.body.EvolveGate_RefNumber.split(" ").join("");


                if(Evolve.Config.IsUnloadRequire == 1) {
                    let  itemIndex = (req.body.EvolveGateDetails).findIndex(v => v.EvolveItem_IsUnloadingReq  == 1)

                if(itemIndex == -1){
                    req.body.EvolveGate_IsMaterialUnload = 1 ;
                }else{

                    req.body.EvolveGate_IsMaterialUnload = 0 ;
                }
                }else{
                    req.body.EvolveGate_IsMaterialUnload = 1 ;
                }

                


                let result = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.createGateIn(req.body);

                // console.log("result???", result)
                if (result instanceof Error) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on Create GateIn",
                        result: null
                    };
                    res.send(obj);
                }
                else {

                    let errorMessage = '';
                    let error = false;
                    let EvolveGate_ID = result.recordset[0].EvolveGate_ID;
                    console.log("req.body.EvolveGateDetails.length",req.body.EvolveGateDetails.length);
                    for (let i = 0; i < req.body.EvolveGateDetails.length; i++) {
                        if(req.body.EvolveGateDetails.EvolveItem_ID == '' || req.body.EvolveGateDetails.EvolveItem_ID == undefined || req.body.EvolveGateDetails.EvolveItem_ID == 'undefined') {
                            req.body.EvolveGateDetails.EvolveItem_ID = null
                        }
                        let results = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.createGateInDetails(req.body.EvolveGateDetails[i], EvolveGate_ID, req.body.EvolveUser_ID);

                        if (results instanceof Error) {
                            errorMessage = 'Error While Insert Gate Entry Details'
                        }
                    }


                    if(Evolve.Config.GATEENTRYLABELCODE == undefined || Evolve.Config.GATEENTRYLABELCODE == null || Evolve.Config.GATEENTRYLABELCODE == 'NOLABEL' || Evolve.Config.GATEENTRYLABELCODE == 'null') {

                    }else{
                        let getStickerId = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getStickerId(Evolve.Config.GATEENTRYLABELCODE);
                        if(getStickerId instanceof Error || getStickerId.rowsAffected < 1) {

                        }else {
                            req.body.EvolveSticker_ID = getStickerId.recordset[0].EvolveSticker_ID;
                            let getZplCodeForLabel = await Evolve.App.Controllers.Common.ConCommon.getZplCode(req.body);
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

                    if (req.body.EvolveGate_ModuleType == 'OTHER') {

                        
                        req.body.EvolveApprovalProcess_PrimaryID = EvolveGate_ID;
                        req.body.EvolveApprovalMatrix_Type = "GATEIN";
                        req.body.EvolveApprovalMatrix_ID = await Evolve.App.Controllers.Common.ConCommon.assignApprovalMatrix({

                            EvolveApprovalMatrix_Type: 'GATEIN',

                            details: result.recordset[0]


                        });
                        if (req.body.EvolveApprovalMatrix_ID != 0) {

                            let checkProcess = await Evolve.App.Services.Common.SrvCommon.checkApprovalProcess(req.body);

                            if (checkProcess instanceof Error) {


                                error = true;

                            } else if (checkProcess.rowsAffected > 0) {
                                req.body.EvolveApprovalProcess_ID = checkProcess.recordset[0].EvolveApprovalProcess_ID
                                let updateSeq = await Evolve.App.Services.Common.SrvCommon.updateApprovalProcessSeq(req.body);
                                if (updateSeq instanceof Error || updateSeq.rowsAffected < 1) {
                                    error = true;
                                } else {

                                    req.body.EvolveApprovalProcess_ID = req.body.EvolveApprovalProcess_ID;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'RESUBMITED'

                                    let addProcessDetails = await Evolve.App.Services.Common.SrvCommon.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            } else {

                                let result = await Evolve.App.Services.Common.SrvCommon.submitToApprovelProcess(req.body);
                                if (result instanceof Error || result.rowsAffected < 1) {
                                    error = true;
                                } else {


                                    req.body.EvolveApprovalProcess_ID = result.recordset[0].inserted_id;
                                    req.body.EvolveUser_ID = req.EvolveUser_ID;
                                    req.body.EvolveApprovalProcessDetails_Status = 'SUBMITED'


                                    let addProcessDetails = await Evolve.App.Services.Common.SrvCommon.addApprovalProcessetails(req.body);
                                    if (addProcessDetails instanceof Error || addProcessDetails.rowsAffected < 1) {
                                        error = true;
                                    }


                                }
                            }
                        } else {
                            error = true;
                            errorMessage = "Error While Get Approval Matrix !!"
                        }
                        ;

                    }

                    if (errorMessage == '') {

                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: `GateIn Created !! Gate Number : ${req.body.EvolveGate_RefNumber}`,
                            result: "Gate Added"
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


                }
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0212: Error while creating GateIn " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0212: Error while creating IOT Location " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMaterialIn: async function (req, res) {
        try {

            let values = (Evolve.Generator.keys.GATE.numbers + 1).toString()
            let gateInNumbe = ""
            for (let i = 0; i < (Evolve.Generator.keys.GATE.options.digits - values.length); i++) {
                gateInNumbe += "0"
            }
            gateInNumbe += values
            let vals = Evolve.Generator.keys.GATE.letters + gateInNumbe
            let obj = { statusCode: 200, status: "success", message: "Item List", result: vals };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0140: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR0140: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onPdfData: async function (req, res) {
        try {
            console.log("Called OnPDF Data");
            let bufferData = req.body.bufferData
            let bufferDataCon = Buffer.from(bufferData, 'hex');
            let doc = await Evolve.PdfLib.PDFDocument.create();
            // let doc1 = doc.addPage([190, 110]);
           
            Evolve.Fs.writeFileSync(`./public/printFiles/${req.body.EvolveGate_RefNumber}.pdf`, await doc.save());
    
            Evolve.Fs.writeFile(`./public/printFiles/${req.body.EvolveGate_RefNumber}.pdf`, bufferDataCon, async function (err) {
                if (err) {
                    console.log("Enter In FIle Crearte Error");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: " Error While Store PDF for Print !! ",
                        result: null
                    };
                    res.send(obj);
                }
                else{

                    let doc = {
                EvolvePrintProcess_Data: `${Evolve.Config.SERVERURL}printFiles/${req.body.EvolveGate_RefNumber}.pdf`,
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
                    EvolvePrintProcess_Data: `${Evolve.Config.SERVERURL}printFiles/${req.body.EvolveGate_RefNumber}.pdf`,
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
                console.log("Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList",Evolve.PrinterList[req.body.EvolvePrinter_Code].EvolvePrinter_JobList);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: " Print PDF Successfully !! " + req.body.EvolveGate_RefNumber,
                    result: null
                };
                res.send(obj);
              }else{
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " Error While Store PDF for Print !! ",
                    result: null
                };
                res.send(obj);
              }
                    
                }
            });
            }
         catch (error) {
           
        }
    },

    getPruchaseOrderList : async function (req , res) {
        try {
            let query = "";
            if(req.body.EvolveSupplier_ID == null || req.body.EvolveSupplier_ID == 'null' || req.body.EvolveSupplier_ID == '' || req.body.EvolveSupplier_ID == undefined || req.body.EvolveSupplier_ID == 'undefined') {

            }else {
                query = `WHERE EvolveSupplier_ID = ${req.body.EvolveSupplier_ID}`
            }
            let getPruchaseOrderList = await Evolve.App.Services.eGateControl.GateIn.SrvMaterialInv2.getPruchaseOrderList(query);
            if(getPruchaseOrderList instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error While Get Purchase Order List!!", result: null };
                res.send(obj);
            }else {
                let obj = { statusCode: 200, status: "success", message: "Purchase Order List!!", result: getPruchaseOrderList.recordset };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting Purchase Order List " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while getting Purchase Order List " + error.message, result: null };
            res.send(obj);
        }
    }

}
