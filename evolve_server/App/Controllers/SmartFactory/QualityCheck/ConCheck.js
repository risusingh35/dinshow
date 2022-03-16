'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getAllLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getAllLocation();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Location",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0078: Error while getting all the location "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0078: Error while getting all the location "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCLotSerialList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getQCLotSerialList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Lot No Not Found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0079: Error while getting QC Lot Serial List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0079: Error while getting QC Lot Serial List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getLotTabelData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getLotTabelData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Lot/Pallet Data Not Found",
                    result: null
                };
                res.send(obj);
            } else {
                if (result.recordset[0].EvolveQc_IsRequired == true) {
                    let qcTempData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getqcTempData(result.recordset[0].EvolveQCTemp_ID);
                    if (qcTempData instanceof Error || qcTempData.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on get QCTemp Data",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let QCResultData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCResultData(req.body);

                        let EvolveQCOrder_Num;
                        let getQCOrderNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getQCOrderNo(req.body);
                        if (getQCOrderNo.rowsAffected < 1) {
                            // start new QCOrder Num
                            let getQCOSettingPalletNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getQCOSettingPalletNo();  // get po barcode details 
                            if (getQCOSettingPalletNo instanceof Error || getQCOSettingPalletNo.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: getQCOSettingPalletNo.message, result: null };
                                res.send(obj);
                                getQCOSettingPalletNo = {}
                            }
                            else {
                                let settings = getQCOSettingPalletNo.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                let QCOrder_No = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_QCO_No = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.updateNextQCOPalletNum(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_QCO_No instanceof Error || update_QCO_No.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_QCO_No.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    EvolveQCOrder_Num = QCOrder_No;
                                }
                            }
                            // end new QCOrder Num
                        }
                        else {
                            EvolveQCOrder_Num = getQCOrderNo.recordset[0].EvolveQCOrder_Num;
                        }



                        let EvolveNCR_Num;
                        let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getNCR_Num(req.body);
                        if (getNCR_Num.rowsAffected < 1) {
                            EvolveNCR_Num = "";
                        }
                        else {
                            EvolveNCR_Num = getNCR_Num.recordset[0].EvolveNCR_No;
                        }

                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Success",
                            result: {
                                tebleData: result.recordset,
                                QcTempData: qcTempData.recordset,
                                tableResultData: QCResultData.recordset,
                                QCOrder_Num: EvolveQCOrder_Num,
                                NCR_Num: EvolveNCR_Num
                            }
                        };
                        res.send(obj);
                    }
                }
                else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "QC Template not selected",
                        result: null
                    };
                    res.send(obj);
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0083: Error while get Lot Table Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0083: Error while get Lot Table Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    saveQCData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            if (req.body.holdLocation == '') {
                req.body.holdLocation = null;
            }
            // console.log("Data", req.body)
            let po_barcode = '';

            for (let i = 0; i < req.body.tableData.length; i++) {

                let totalQty = parseInt(req.body.tableData[i].EvolveInventory_QtyOnHand)
                let acceptQty = parseInt(req.body.tableData[i].accepted_Qty)
                let rejectQty = parseInt(req.body.tableData[i].reject_Qty)
                let sample_Qty = parseInt(req.body.tableData[i].sample_Qty)
                let destroyed_Qty = parseInt(req.body.tableData[i].destroyed_Qty)

                req.body.Reject_Location_ID = req.body.tableData[i].rejected_location_ID;
                req.body.Sample_location_ID = req.body.tableData[i].sample_location_ID;
                req.body.Destroyed_location_ID = req.body.tableData[i].destroyed_location_ID;
                req.body.Accept_Location_ID = req.body.tableData[i].accepted_location_ID;

                if (i == 0) {
                    let getQCOrderID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.checkQCOLotExists(req.body.tableData[i]);
                    if (getQCOrderID.rowsAffected < 1) {
                        let addQCOrder = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCOrder(req.body, req.body.tableData[i]);
                        req.body.EvovleQCOrder_ID = addQCOrder.recordset[0].inserted_id;
                    } else {
                        req.body.EvovleQCOrder_ID = getQCOrderID.recordset[0].EvovleQCOrder_ID;
                    }
                }

                let addQCOrderDetails = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCOrderDetails(req.body, req.body.tableData[i]);
                if (addQCOrderDetails instanceof Error || addQCOrderDetails.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: 'Error On add Qc Order Details',
                        result: null
                    };
                    res.send(obj);
                } else {
                    error = false;
                }

                let QtySum = acceptQty + rejectQty + sample_Qty + destroyed_Qty;
                if (totalQty == QtySum) {
                    let InvPalletData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.InvPalletCleared(req.body.tableData[i]);
                    if (InvPalletData instanceof Error || InvPalletData.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on Inv Pallet Cleared",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        if (rejectQty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = rejectQty;
                            req.body.newPalletStatus = 'REJECT';
                            req.body.EvolveTranstype_Code = 'QC-REJECT';
                            req.body.QcLocation = req.body.tableData[i].rejected_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On add New Inv Reject',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-REJECT',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "REJECT",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On add Qc Clear Reject',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                            for (let j = 0; j < req.body.paramRejectData.length; j++) {
                                if (req.body.paramRejectData[j].param_type == 'Image') {
                                    if (req.body.paramRejectData[j].param_value != '') {
                                        let d = new Date();
                                        let time = d.getTime();
                                        let extention = req.body.paramRejectData[j].param_value.substring("data:image/".length, req.body.paramRejectData[j].param_value.indexOf(";base64"));
                                        let fileName = time + "_QcTemplate." + extention;
                                        let base64Data = req.body.paramRejectData[j].param_value.replace(/^data:image\/png;base64,/, "");
                                        base64Data = req.body.paramRejectData[j].param_value.replace(/^data:image\/jpeg;base64,/, "");
                                        Evolve.Fs.writeFile(
                                            Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                                            function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("The file was saved!");
                                                }
                                            }
                                        );
                                        req.body.paramRejectData[j].param_value = fileName;
                                    }
                                }
                                let addQCHistory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCHistory(req.body, req.body.tableData[i], req.body.paramRejectData[j]);
                                if (addQCHistory instanceof Error || addQCHistory.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: 'Error On add Qc Clear Reject',
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    error = false;
                                }
                            }
                            // NCR Satrt

                            let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.CheckNCR_Num(req.body.tableData[i]);
                            if (getNCR_Num.rowsAffected < 1) {
                                // start new QCOrder Num
                                let getNCRSettingPalletNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getNCRSettingPalletNo();  // get po barcode details 
                                if (getNCRSettingPalletNo instanceof Error || getNCRSettingPalletNo.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: getNCRSettingPalletNo.message, result: null };
                                    res.send(obj);
                                    getNCRSettingPalletNo = {}
                                }
                                else {
                                    let settings = getNCRSettingPalletNo.recordsets[0];
                                    let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                    let NCR_No = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                    let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                    let update_NCR_No = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.updateNextNCRPalletNum(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                    if (update_NCR_No instanceof Error || update_NCR_No.rowsAffected < 1) {
                                        let obj = { statusCode: 400, status: "fail", message: update_NCR_No.message, result: null };
                                        res.send(obj);
                                    }
                                    else {
                                        req.body.EvolveNCR_No = NCR_No;
                                    }
                                }
                                // end new QCOrder Num
                            }
                            else {
                                req.body.EvolveNCR_No = getNCR_Num.recordset[0].EvolveNCR_No;
                            }
                            let addNCRNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addNCRNo(req.body, req.body.tableData[i]);
                            if (addNCRNo instanceof Error || addNCRNo.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error On Add NCR",
                                    result: null
                                };
                                res.send(obj);
                            }
                            // NCR End
                        }
                        if (sample_Qty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = sample_Qty;
                            req.body.newPalletStatus = 'SAMPLE';
                            req.body.EvolveTranstype_Code = 'QC-SAMPLE';
                            req.body.QcLocation = req.body.tableData[i].sample_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Sample',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-SAMPLE',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "SAMPLE",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add QC Clear Sample',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                        }
                        if (destroyed_Qty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = destroyed_Qty;
                            req.body.newPalletStatus = 'DESTROYED';
                            req.body.EvolveTranstype_Code = 'UNP-ISS';
                            req.body.QcLocation = req.body.tableData[i].destroyed_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Destroyed',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'UNP-ISS',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "DESTROYED",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add QC Clear Destroyed',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                        }
                        if (acceptQty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = acceptQty;
                            req.body.newPalletStatus = 'ACCEPTED';
                            req.body.EvolveTranstype_Code = 'QC-ACCEPT';
                            req.body.QcLocation = req.body.tableData[i].accepted_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Accept',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-ACCEPT',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "ACCEPTED",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Qc Clear Accept',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                            for (let j = 0; j < req.body.paramAcceptData.length; j++) {
                                if (req.body.paramAcceptData[j].param_type == 'Image') {
                                    if (req.body.paramAcceptData[j].param_value != '') {
                                        let d = new Date();
                                        let time = d.getTime();
                                        let extention = req.body.paramAcceptData[j].param_value.substring("data:image/".length, req.body.paramAcceptData[j].param_value.indexOf(";base64"));
                                        let fileName = time + "_QcTemplate." + extention;
                                        let base64Data = req.body.paramAcceptData[j].param_value.replace(/^data:image\/png;base64,/, "");
                                        base64Data = req.body.paramAcceptData[j].param_value.replace(/^data:image\/jpeg;base64,/, "");
                                        Evolve.Fs.writeFile(
                                            Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                                            function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("The file was saved!");
                                                }
                                            }
                                        );
                                        req.body.paramAcceptData[j].param_value = fileName;
                                    }
                                }
                                let addQCHistory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCHistory(req.body, req.body.tableData[i], req.body.paramAcceptData[j]);
                                if (addQCHistory instanceof Error || addQCHistory.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: 'Error On Add Qc History Accept',
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    error = false;
                                }
                            }
                        }
                    }
                }
                else {
                    let remainingQty = totalQty - QtySum;
                    let InvPalletData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.remainingQtyUpdate(req.body.tableData[i], remainingQty);
                    if (InvPalletData instanceof Error || InvPalletData.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on Inv Remaining Qty Update",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        if (rejectQty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = rejectQty;
                            req.body.newPalletStatus = 'REJECT';
                            req.body.EvolveTranstype_Code = 'QC-REJECT';
                            req.body.QcLocation = req.body.tableData[i].rejected_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Reject',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-REJECT',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "REJECT",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Qc Clear Reject',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                            for (let j = 0; j < req.body.paramRejectData.length; j++) {
                                if (req.body.paramRejectData[j].param_type == 'Image') {
                                    if (req.body.paramRejectData[j].param_value != '') {
                                        let d = new Date();
                                        let time = d.getTime();
                                        let extention = req.body.paramRejectData[j].param_value.substring("data:image/".length, req.body.paramRejectData[j].param_value.indexOf(";base64"));
                                        let fileName = time + "_QcTemplate." + extention;
                                        let base64Data = req.body.paramRejectData[j].param_value.replace(/^data:image\/png;base64,/, "");
                                        base64Data = req.body.paramRejectData[j].param_value.replace(/^data:image\/jpeg;base64,/, "");
                                        Evolve.Fs.writeFile(
                                            Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                                            function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("The file was saved!");
                                                }
                                            }
                                        );
                                        req.body.paramRejectData[j].param_value = fileName;
                                    }
                                }
                                let addQCHistory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCHistory(req.body, req.body.tableData[i], req.body.paramRejectData[j]);
                                if (addQCHistory instanceof Error || addQCHistory.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: 'Error On Add Qc History Reject',
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    error = false;
                                }
                            }
                            // NCR Satrt
                            let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.CheckNCR_Num(req.body.tableData[i]);
                            if (getNCR_Num.rowsAffected < 1) {
                                // start new QCOrder Num
                                let getNCRSettingPalletNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getNCRSettingPalletNo();  // get po barcode details 
                                if (getNCRSettingPalletNo instanceof Error || getNCRSettingPalletNo.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: getNCRSettingPalletNo.message, result: null };
                                    res.send(obj);
                                    getNCRSettingPalletNo = {}
                                }
                                else {
                                    let settings = getNCRSettingPalletNo.recordsets[0];
                                    let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                    let NCR_No = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                    let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                    let update_NCR_No = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.updateNextNCRPalletNum(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                    if (update_NCR_No instanceof Error || update_NCR_No.rowsAffected < 1) {
                                        let obj = { statusCode: 400, status: "fail", message: update_NCR_No.message, result: null };
                                        res.send(obj);
                                    }
                                    else {
                                        req.body.EvolveNCR_No = NCR_No;
                                    }
                                }
                                // end new QCOrder Num
                            }
                            else {
                                req.body.EvolveNCR_No = getNCR_Num.recordset[0].EvolveNCR_No;
                            }
                            let addNCRNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addNCRNo(req.body, req.body.tableData[i]);
                            if (addNCRNo instanceof Error || addNCRNo.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error On Add NCR",
                                    result: null
                                };
                                res.send(obj);
                            }
                            // NCR End
                        }
                        if (sample_Qty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = sample_Qty;
                            req.body.newPalletStatus = 'SAMPLE';
                            req.body.EvolveTranstype_Code = 'QC-SAMPLE';
                            req.body.QcLocation = req.body.tableData[i].sample_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Sample',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-SAMPLE',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "SAMPLE",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Qc Clear Sample',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                        }
                        if (destroyed_Qty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = destroyed_Qty;
                            req.body.newPalletStatus = 'DESTROYED';
                            req.body.EvolveTranstype_Code = 'UNP-ISS';
                            req.body.QcLocation = req.body.tableData[i].destroyed_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Destroyed',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'UNP-ISS',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "DESTROYED",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Qc Clear Destroyed',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                        }
                        if (acceptQty > 0) {
                            // start new barcode
                            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.getBarcodeDetails();  // get po barcode details 
                            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                                res.send(obj);
                                get_barcode_details = {}
                            }
                            else {
                                let settings = get_barcode_details.recordsets[0];
                                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvRecieveCooper.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                                    res.send(obj);
                                }
                                else {
                                    req.body.NewRefNumber = po_barcode;
                                }
                            }
                            // end new barcode
                            req.body.newPalletQty = acceptQty;
                            req.body.newPalletStatus = 'ACCEPTED';
                            req.body.EvolveTranstype_Code = 'QC-ACCEPT';
                            req.body.QcLocation = req.body.tableData[i].accepted_location_ID;
                            let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getTransType_ID(req.body);
                            req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                            let QCInvNewId = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.QCInvCreateNewPallet(req.body, InvPalletData.recordset[0]);
                            if (QCInvNewId instanceof Error || QCInvNewId.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Inv Accept',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                let history_Data = {
                                    'EvolveCompany_ID': InvPalletData.recordset[0].EvolveCompany_ID,
                                    'EvolveUnit_ID': InvPalletData.recordset[0].EvolveUnit_ID,
                                    'EvolveTranstype_code': 'QC-ACCEPT',
                                    'EvolveItem_ID': InvPalletData.recordset[0].EvolveItem_ID,
                                    'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    'EvolveInventoryTransHistory_LotSerial': InvPalletData.recordset[0].EvolveInventory_LotNumber,
                                    'EvolveInventoryTransHistory_RefNumber': req.body.NewRefNumber,
                                    'EvolveInventoryTransHistory_FromRefNumber': InvPalletData.recordset[0].EvolveInventory_RefNumber,
                                    'EvolveInventoryTransHistory_QtyRequire': 0,
                                    'EvolveInventoryTransHistory_Qty': req.body.newPalletQty,
                                    'EvolveUom_ID': InvPalletData.recordset[0].EvolveUom_ID,
                                    'EvolveLocation_FromID': InvPalletData.recordset[0].EvolveLocation_ID,
                                    'EvolveLocation_ToID': req.body.QcLocation,
                                    'EvolveReason_ID': null,
                                    'EvolveInventoryTransHistory_InventoryStatus': "ACCEPTED",
                                    'EvolveInventoryTransHistory_PostingStatus': InvPalletData.recordset[0].EvolveInventory_PostingStatus,
                                    'EvolveInventoryTransHistory_Remark': null,
                                    'EvolveUser_ID': InvPalletData.recordset[0].EvolveInventory_CreatedUser,
                                };
                                let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    Evolve.Log.error("Error On Add Inventory History");
                                    Evolve.Log.error(add_history.message);
                                }
                                else {
                                    error = true
                                }
                            }

                            req.body.EvolveInventoryTo_ID = QCInvNewId.recordset[0].inserted_id;
                            let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCClear(req.body, req.body.tableData[i]);
                            if (addQCClear instanceof Error || addQCClear.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: 'Error On Add Qc Clear Accept',
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                error = false;
                            }
                            for (let j = 0; j < req.body.paramAcceptData.length; j++) {
                                if (req.body.paramAcceptData[j].param_type == 'Image') {
                                    if (req.body.paramAcceptData[j].param_value != '') {
                                        let d = new Date();
                                        let time = d.getTime();
                                        let extention = req.body.paramAcceptData[j].param_value.substring("data:image/".length, req.body.paramAcceptData[j].param_value.indexOf(";base64"));
                                        let fileName = time + "_QcTemplate." + extention;
                                        let base64Data = req.body.paramAcceptData[j].param_value.replace(/^data:image\/png;base64,/, "");
                                        base64Data = req.body.paramAcceptData[j].param_value.replace(/^data:image\/jpeg;base64,/, "");
                                        Evolve.Fs.writeFile(
                                            Evolve.Config.imageUploadPath + fileName, base64Data, "base64",
                                            function (err) {
                                                if (err) {
                                                    console.log(err);
                                                } else {
                                                    console.log("The file was saved!");
                                                }
                                            }
                                        );
                                        req.body.paramAcceptData[j].param_value = fileName;
                                    }
                                }
                                let addQCHistory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.addQCHistory(req.body, req.body.tableData[i], req.body.paramAcceptData[j]);
                                if (addQCHistory instanceof Error || addQCHistory.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: 'Error On Add Qc history Accept',
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    error = false;
                                }
                            }
                        }
                    }
                }

            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Add Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0084: Error while saving QC Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0084: Error while saving QC Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCPalletParamData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheck.getQCPalletParamData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Get Param Data",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0085: Error while getting QC Pallet ParamData "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0085: Error while getting QC Pallet ParamData "+error.message,
                result: null
            };
            res.send(obj);
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