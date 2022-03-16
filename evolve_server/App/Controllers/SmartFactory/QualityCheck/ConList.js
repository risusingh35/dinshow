'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getQCLocationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCLocationList();
            console.log(result, 'Location List <<<<<<<<<<<<<<<');
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
            Evolve.Log.error(" EERR0086: Error while getting getting QC Location List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0086: Error while getting getting QC Location List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // QC Table
    getQCTableLotSerialList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCTableLotSerialList();
            if (result instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Table Lot/Serial List Not Found",
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
            Evolve.Log.error(" EERR0087: Error while getting QC Table Lot Serial List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0087: Error while getting QC Table Lot Serial List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCTabelData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCTabelData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Lot/Serial Data Not Found",
                    result: null
                };
                res.send(obj);
            } else {
                if (result.recordset[0].EvolveQc_IsRequired == true) {
                    let qcTempData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getqcTempData(result.recordset[0].EvolveQCTemp_ID);
                    if (qcTempData instanceof Error || qcTempData.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on get QCTemp Data",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let EvolveQCOrder_Num;
                        let getQCOrderNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCOrderNo(req.body);
                        if (getQCOrderNo.rowsAffected < 1) {
                            EvolveQCOrder_Num = "";
                        }
                        else {
                            EvolveQCOrder_Num = getQCOrderNo.recordset[0].EvolveQCOrder_Num;
                        }

                        let EvolveNCR_Num;
                        let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getNCR_Num(req.body);
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
                        message: "QC Template not Selected In Item",
                        result: null
                    };
                    res.send(obj);
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0088: Error while getting QC table data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0088: Error while getting QC table data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    saveQCTableData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            req.body.holdLocation = null;
            // console.log("Data", req.body)
            let po_barcode = '';
            for (let i = 0; i < req.body.tableData.length; i++) {
                if (i == 0) {
                    let getQCOrderID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.checkQCOLotExists(req.body.tableData[i]);
                    if (getQCOrderID.rowsAffected < 1) {
                        let addQCOrder = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCOrder(req.body, req.body.tableData[i]);
                        req.body.EvolveQCOrder_ID = addQCOrder.recordset[0].inserted_id;
                    } else {
                        req.body.EvolveQCOrder_ID = getQCOrderID.recordset[0].EvolveQCOrder_ID;
                    }
                }
                if (req.body.tableData[i].InventoryStatus == 'REJECT') {
                    let addQCOrderDetailsReject = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCOrderDetailsReject(req.body, req.body.tableData[i]);
                    if (addQCOrderDetailsReject instanceof Error || addQCOrderDetailsReject.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error On add QC Order Details",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.CheckNCR_Num(req.body.tableData[i]);
                        if (getNCR_Num.rowsAffected < 1) {
                            // start new NCR Num
                            let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('QCNCR') // get po barcode details 
                            if (get_barcode_details == 0) {
                                Evolve.Log.error("EERR0082 :Error while assign NCR number")
                                let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                                res.send(obj);
                                // get_barcode_details = {}
                            } else {
                                req.body.EvolveNCR_No = get_barcode_details;
                            }
                            // end new NCR Num
                        }
                        else {
                            req.body.EvolveNCR_No = getNCR_Num.recordset[0].EvolveNCR_No;
                        }

                        let addNCRNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addNCRNo(req.body, req.body.tableData[i]);
                        if (addNCRNo instanceof Error || addNCRNo.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error On Add NCR",
                                result: null
                            };
                            res.send(obj);
                        }


                    }
                    req.body.EvolveTranstype_Code = 'QC-REJECT';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.updateInventory(req.body, req.body.tableData[i]);
                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update Inventory",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {

                        let history_Data = {
                            'EvolveCompany_ID': updateInventory.recordset[0].EvolveCompany_ID,
                            'EvolveUnit_ID': updateInventory.recordset[0].EvolveUnit_ID,
                            'EvolveTranstype_code': 'QC-REJECT',
                            'EvolveItem_ID': updateInventory.recordset[0].EvolveItem_ID,
                            'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                            'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                            'EvolveInventoryTransHistory_LotSerial': updateInventory.recordset[0].EvolveInventory_LotNumber,
                            'EvolveInventoryTransHistory_RefNumber': null,
                            'EvolveInventoryTransHistory_FromRefNumber': updateInventory.recordset[0].EvolveInventory_RefNumber,
                            'EvolveInventoryTransHistory_QtyRequire': 0,
                            'EvolveInventoryTransHistory_Qty': updateInventory.recordset[0].EvolveInventory_QtyOnHand,
                            'EvolveUom_ID': updateInventory.recordset[0].EvolveUom_ID,
                            'EvolveLocation_FromID': updateInventory.recordset[0].EvolveLocation_ID,
                            'EvolveLocation_ToID': null,
                            'EvolveReason_ID': null,
                            'EvolveInventoryTransHistory_InventoryStatus': "REJECT",
                            'EvolveInventoryTransHistory_PostingStatus': updateInventory.recordset[0].EvolveInventory_PostingStatus,
                            'EvolveInventoryTransHistory_Remark': null,
                            'EvolveUser_ID': updateInventory.recordset[0].EvolveInventory_CreatedUser,
                        };
                        let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                        if (add_history instanceof Error || add_history.rowsAffected < 1) {
                            Evolve.Log.error(" EERR0719: Error On Add Inventory History ");
                            Evolve.Log.error(" " + add_history.message);
                        }
                        else {
                            error = true
                        }


                    }
                }
                if (req.body.tableData[i].InventoryStatus == 'SAMPLE') {
                    let addQCOrderDetailsSample = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCOrderDetailsSample(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'QC-SAMPLE';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.updateInventory(req.body, req.body.tableData[i]);
                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update Inventory",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let history_Data = {
                            'EvolveCompany_ID': updateInventory.recordset[0].EvolveCompany_ID,
                            'EvolveUnit_ID': updateInventory.recordset[0].EvolveUnit_ID,
                            'EvolveTranstype_code': 'QC-SAMPLE',
                            'EvolveItem_ID': updateInventory.recordset[0].EvolveItem_ID,
                            'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                            'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                            'EvolveInventoryTransHistory_LotSerial': updateInventory.recordset[0].EvolveInventory_LotNumber,
                            'EvolveInventoryTransHistory_RefNumber': null,
                            'EvolveInventoryTransHistory_FromRefNumber': updateInventory.recordset[0].EvolveInventory_RefNumber,
                            'EvolveInventoryTransHistory_QtyRequire': 0,
                            'EvolveInventoryTransHistory_Qty': updateInventory.recordset[0].EvolveInventory_QtyOnHand,
                            'EvolveUom_ID': updateInventory.recordset[0].EvolveUom_ID,
                            'EvolveLocation_FromID': updateInventory.recordset[0].EvolveLocation_ID,
                            'EvolveLocation_ToID': null,
                            'EvolveReason_ID': null,
                            'EvolveInventoryTransHistory_InventoryStatus': "SAMPLE",
                            'EvolveInventoryTransHistory_PostingStatus': updateInventory.recordset[0].EvolveInventory_PostingStatus,
                            'EvolveInventoryTransHistory_Remark': null,
                            'EvolveUser_ID': updateInventory.recordset[0].EvolveInventory_CreatedUser,
                        };
                        let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                        if (add_history instanceof Error || add_history.rowsAffected < 1) {
                            Evolve.Log.error(" EERR0720: Error On Add Inventory History ");
                            Evolve.Log.error(" " + add_history.message);
                        }
                        else {
                            error = true
                        }
                    }
                }
                if (req.body.tableData[i].InventoryStatus == 'DESTROY') {
                    let addQCOrderDetailsDestroyed = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCOrderDetailsDestroyed(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'UNP-ISS';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.updateDestroyedInventory(req.body, req.body.tableData[i]);
                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update Inventory",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let history_Data = {
                            'EvolveCompany_ID': updateInventory.recordset[0].EvolveCompany_ID,
                            'EvolveUnit_ID': updateInventory.recordset[0].EvolveUnit_ID,
                            'EvolveTranstype_code': 'UNP-ISS',
                            'EvolveItem_ID': updateInventory.recordset[0].EvolveItem_ID,
                            'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                            'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                            'EvolveInventoryTransHistory_LotSerial': updateInventory.recordset[0].EvolveInventory_LotNumber,
                            'EvolveInventoryTransHistory_RefNumber': null,
                            'EvolveInventoryTransHistory_FromRefNumber': updateInventory.recordset[0].EvolveInventory_RefNumber,
                            'EvolveInventoryTransHistory_QtyRequire': 0,
                            'EvolveInventoryTransHistory_Qty': updateInventory.recordset[0].EvolveInventory_QtyOnHand,
                            'EvolveUom_ID': updateInventory.recordset[0].EvolveUom_ID,
                            'EvolveLocation_FromID': updateInventory.recordset[0].EvolveLocation_ID,
                            'EvolveLocation_ToID': null,
                            'EvolveReason_ID': null,
                            'EvolveInventoryTransHistory_InventoryStatus': "DESTROYED",
                            'EvolveInventoryTransHistory_PostingStatus': updateInventory.recordset[0].EvolveInventory_PostingStatus,
                            'EvolveInventoryTransHistory_Remark': null,
                            'EvolveUser_ID': updateInventory.recordset[0].EvolveInventory_CreatedUser,
                        };
                        let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                        if (add_history instanceof Error || add_history.rowsAffected < 1) {
                            Evolve.Log.error("Error On Add Inventory History");
                            Evolve.Log.error(add_history.message);
                        }
                        else {
                            // IO Data Start
                            let InvUpdateData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getInvUpdateData(req.body.tableData[i]);
                            if (InvUpdateData instanceof Error || InvUpdateData.rowsAffected < 1) {
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "error on get Inventory Data",
                                    result: null
                                };
                                res.send(obj);
                            }
                            else {
                                let ioData = {
                                    EvolveIO_Data: InvUpdateData.recordset[0],
                                    EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
                                    EvolveIO_Code: "EVOLVEQCOB", // EVOLVEQCOB = Quality Check
                                    EvolveIO_Data_Formate: "XML",
                                    EvolveIO_ERP_Type: "QAD",
                                    EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                                    EvolveIO_File_Data: ''
                                }
                                let addIOData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addIOData(ioData);
                                if (addIOData instanceof Error) {
                                    let obj = { statusCode: 400, status: "fail", message: 'Error while add IO data', result: null };
                                    res.send(obj);
                                }
                                else {
                                    error = true;
                                }
                            }
                            // IO Data End
                        }
                    }
                }
                if (req.body.tableData[i].InventoryStatus == 'GOOD') {
                    let addQCOrderDetailsAccept = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCOrderDetailsAccept(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'QC-ACCEPT';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.updateInventory(req.body, req.body.tableData[i]);
                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update Inventory",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let history_Data = {
                            'EvolveCompany_ID': updateInventory.recordset[0].EvolveCompany_ID,
                            'EvolveUnit_ID': updateInventory.recordset[0].EvolveUnit_ID,
                            'EvolveTranstype_code': 'QC-ACCEPT',
                            'EvolveItem_ID': updateInventory.recordset[0].EvolveItem_ID,
                            'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                            'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                            'EvolveInventoryTransHistory_LotSerial': updateInventory.recordset[0].EvolveInventory_LotNumber,
                            'EvolveInventoryTransHistory_RefNumber': null,
                            'EvolveInventoryTransHistory_FromRefNumber': updateInventory.recordset[0].EvolveInventory_RefNumber,
                            'EvolveInventoryTransHistory_QtyRequire': 0,
                            'EvolveInventoryTransHistory_Qty': updateInventory.recordset[0].EvolveInventory_QtyOnHand,
                            'EvolveUom_ID': updateInventory.recordset[0].EvolveUom_ID,
                            'EvolveLocation_FromID': updateInventory.recordset[0].EvolveLocation_ID,
                            'EvolveLocation_ToID': null,
                            'EvolveReason_ID': null,
                            'EvolveInventoryTransHistory_InventoryStatus': "ACCEPTED",
                            'EvolveInventoryTransHistory_PostingStatus': updateInventory.recordset[0].EvolveInventory_PostingStatus,
                            'EvolveInventoryTransHistory_Remark': null,
                            'EvolveUser_ID': updateInventory.recordset[0].EvolveInventory_CreatedUser,
                        };
                        let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                        if (add_history instanceof Error || add_history.rowsAffected < 1) {
                            Evolve.Log.error(" EERR0721: Error On Add Inventory History");
                            Evolve.Log.error(add_history.message);
                        }
                        else {
                            error = true
                        }
                    }
                }

                let addQCClear = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCClear(req.body, req.body.tableData[i]);
                for (let j = 0; j < req.body.param.length; j++) {
                    if (req.body.param[j].param_type == 'Image') {
                        if (req.body.param[j].param_value != '') {
                            let d = new Date();
                            let time = d.getTime();
                            let extention = req.body.param[j].param_value.substring("data:image/".length, req.body.param[j].param_value.indexOf(";base64"));
                            let fileName = time + "_QcTemplate." + extention;
                            let base64Data = req.body.param[j].param_value.replace(/^data:image\/png;base64,/, "");
                            base64Data = req.body.param[j].param_value.replace(/^data:image\/jpeg;base64,/, "");
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
                            req.body.param[j].param_value = fileName;
                        }
                    }
                    req.body.EvolvePallet_ID = req.body.tableData[i].EvolveInventory_ID;
                    let addQCHistory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addQCHistory(req.body, req.body.tableData[i], req.body.param[j]);
                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on save QCData",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Add Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0089: Error while saving QC Table data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0089: Error while saving QC Table data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


    // Qc Location

    getQCTableReceiptList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQCTableReceiptList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Transfer Lot/Serial List Not found",
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
            Evolve.Log.error(" EERR0094: Error while getting QC Location Lot Serial list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0094: Error while getting QC Location Lot Serial list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQcLotSerialList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQcLotSerialList(req.body.EvolveInventory_ReceiptNumber);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Transfer Lot/Serial List Not found",
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
            Evolve.Log.error(" EERR0094: Error while getting QC Location Lot Serial list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0094: Error while getting QC Location Lot Serial list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCLocationTableList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCLocationTableList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Transfer Data Not found",
                    result: null
                };
                res.send(obj);
            } else {
                let EvolveNCR_Num;
                let EvolveQCOrder_Num;
                let getQCOrderNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getQCOrderNo(req.body);
                if (getQCOrderNo.rowsAffected < 1) {
                    EvolveQCOrder_Num = "";
                }
                else {
                    EvolveQCOrder_Num = getQCOrderNo.recordset[0].EvolveQCOrder_Num;
                }
                let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getNCR_Num(req.body);
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
                        qcLocationTableData: result.recordset,
                        qcLocationOrderNo: EvolveQCOrder_Num,
                        qcLocationNCRNum: EvolveNCR_Num
                    }
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0095: Error while getting QC Location Table list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0095: Error while getting QC Location Table list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    saveQCLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.saveQCLocation(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Save Location",
                    result: null
                };
                res.send(obj);
            }
            else {
                let unitcode = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.getUnitCode(req.body.EvolveInventory_ID);
                if (unitcode instanceof Error || unitcode.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "error on get Unit",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    let ioFields = {
                        'EvolveItem_Code': result.recordset[0].EvolveItem_Code,
                        'EvolveInventory_QtyOnHand': result.recordset[0].EvolveInventory_QtyOnHand,
                        'FromUnitCode': unitcode.recordset[0].EvolveUnit_Code,
                        'ToUnitCode': unitcode.recordset[0].EvolveUnit_Code,
                        'FromLocation': req.body.EvolveOldLocationName,
                        'ToLOcation': result.recordset[0].EvolveLocation_Name,
                        'EvolveInventory_LotNumber': result.recordset[0].EvolveInventory_LotNumber,
                        'EvolveInventory_RefNumber': result.recordset[0].EvolveInventory_RefNumber,
                    };
                    let ioData = {
                        EvolveIO_Data: ioFields,
                        EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
                        EvolveIO_Code: "EVOLVEQCOB", // EVOLVEQCOB = Quality Check
                        EvolveIO_Data_Formate: "XML",
                        EvolveIO_ERP_Type: "QAD",
                        EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                        EvolveIO_File_Data: ''
                    }
                    let addIOData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvCheckCooper.addIOData(ioData);
                    if (addIOData instanceof Error) {
                        let obj = { statusCode: 400, status: "fail", message: 'Error while add IO data', result: null };
                        res.send(obj);
                    }
                    else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Location Move Success",
                            result: null
                        };
                        res.send(obj);
                    }
                }

            }

        } catch (error) {
            Evolve.Log.error(" EERR0096: Error while Saving QC Location " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0096: Error while Saving QC Location " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getQcOrderList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQcOrderList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get QC Order List!!",
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
            Evolve.Log.error(" EERR0087: Error while getting QC Table Lot Serial List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0087: Error while getting QC Table Lot Serial List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getQcOrderDetailsList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQcOrderDetailsList(req.body.EvolveQCOrder_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get QC Order Details List!!",
                    result: null
                };
                res.send(obj);
            } else {
                let resultForTempData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQcTempDetailsList(result.recordset[0].EvolveItem_ID);
                if (resultForTempData instanceof Error || resultForTempData.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error While Get QC Order Details List!!",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let resultObj = {
                        QcDetailsList: result.recordset,
                        QcTempData: resultForTempData.recordset
                    }
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Success",
                        result: resultObj
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0087: Error while getting QC Order Details List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0087: Error while getting QC Order Details List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SaveQCTableDataNew: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID ;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID ;
            let allPalletSeleted = true;
            let error = false;
            let errorMessage = "";
            for (let i = 0; i < req.body.QcOrderDetailsList.length; i++) {
                if (error == false) {

                    console.log("ETERED IN :PP{???" ,  i)
                    req.body.QcOrderDetailsList[i].EvolveUser_ID = req.body.EvolveUser_ID;
                    // let data = req.body.QcOrderDetailsList[i];
                    let data = req.body.QcOrderDetailsList[i];
                    data.EvolveUnit_Code = req.body.EvolveUnit_Code;
                    console.log("data>>>" ,  data)
                    if (data.IsSelected == 1 || data.IsSelected == true || data.IsSelected == 'true') {
                        console.log("data.IsSelected?????" ,  data.IsSelected);
                        if(data.IsAccepted == false) {
                            data.EvolveQCOrderDetails_RejectedQty = data.EvolveQCOrderDetails_AcceptedQty;
                            data.EvolveQCOrderDetails_AcceptedQty = data.EvolveQCOrderDetails_RejectedQty - data.EvolveQCOrderDetails_AcceptedQty;
                        }
                        let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
                        if(data.EvolveQCOrderDetails_DestroyedQty != 0) {
                            let xmlObjForIssueUnPlanned = {
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
                                        "issueInventory": {
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
                                            "dsInventoryIssue": {
                                                "inventoryIssue": {
                                                    "ptPart": data.EvolveItem_Part,
                                                    "lotSerialQty": data.EvolveQCOrderDetails_DestroyedQty,
                                                    "um": data.EvolveUom_Uom,
                                                    "site": data.EvolveUnit_Code,
                                                    "location": data.EvolveLocation_Code,
                                                    "lotSerial": data.EvolveInventory_BatchNo,
                                                    "lotRef": data.EvolveInventory_SerialNo,
                                                    "multiEntry": "false",
                                                    "rmks": "text",
                                                    "effDate": datetime.split(" ")[0],
                                                    "issueDetail": {
                                                        "ptPart": data.EvolveItem_Part,
                                                        "site": data.EvolveUnit_Code,
                                                        "location": data.EvolveLocation_Code,
                                                        "lotserial": data.EvolveInventory_BatchNo,
                                                        "lotref": data.EvolveInventory_SerialNo,
                                                        "lotserialQty": data.EvolveQCOrderDetails_DestroyedQty
                                                    },
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            let xmldocForIssueUnPlanned = Evolve.Xmlbuilder.create(xmlObjForIssueUnPlanned);
                            // console.log(xmldoc.end({ pretty: true }));
                            let xmlFileDataForIssueUnPlanned = xmldocForIssueUnPlanned.end({ pretty: true });
                            console.log("xmlFileDataForIssueUnPlanned", xmlFileDataForIssueUnPlanned);
                            xmlFileDataForIssueUnPlanned = xmlFileDataForIssueUnPlanned.replace(`<?xml version="1.0"?>`, `<?xml version="1.0" encoding="UTF-8"?>`)
    
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
    
                            let responcexmldocForIssueUnPlanned = await Evolve.Axios.post(Evolve.Config.QXTENDURL, xmlFileDataForIssueUnPlanned, config).catch((e) => {
                                console.log("Error While Fire Qextend::::::::::::::", e.message);
                                error = true;
                                errorMessage = e.message
                            });
    
                            if (responcexmldocForIssueUnPlanned) {
                                Evolve.Xml2JS.parseString(responcexmldocForIssueUnPlanned.data, async function (err, xmlFileDataNew) {
                                    if (err) {
                                        console.log("issue in xml formate")
                                    } else {
                                        console.log("no issue XML Formate ", xmlFileDataNew);
                                        try {
                                            console.log("Qextend Statues &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&>>>>>>>", xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]);
                                            if (xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:issueInventoryResponse'][0]['ns1:result'][0] != 'error') {
    
                                            } else {
                                                console.log(xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:issueInventoryResponse'][0]['ns1:result'][0]);
                                                error = true;
                                                errorMessage = xmlFileDataNew['soapenv:Envelope']['soapenv:Body'][0]['ns1:issueInventoryResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0];
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
                                i = req.body.palletToBePOst.length;
                            }
                        }

                        console.log("data.EvolveQCOrderDetails_IsQcPerformed" ,data.EvolveQCOrderDetails_IsQcPerformed)

                        if(error == false) {
                            if (data.EvolveQCOrderDetails_IsQcPerformed == 0 || data.EvolveQCOrderDetails_IsQcPerformed == false || data.EvolveQCOrderDetails_IsQcPerformed == 'false') {

                                console.log("ENTERED IN QC PERFORMED")
        
                                    let updateQcOrderDetails = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.updateQcOrderDetails(data);
        
                                    console.log("updateQcOrderDetails??" ,  updateQcOrderDetails)
                                    if (updateQcOrderDetails instanceof Error || updateQcOrderDetails.rowsAffected < 1) {
                                        error = true;
                                        errorMessage = "Error While Update QC Order Detials!!";
                                    } else {
                                        let updateInventoryDetails = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.updateInventoryDetails(data);
                                    console.log("updateInventoryDetails??" ,  updateInventoryDetails)
        
                                        if(updateInventoryDetails instanceof Error || updateInventoryDetails.rowsAffected < 1) {
                                            error = true;
                                            errorMessage = " Error While Update Inventory Details!! ";
                                        }else{
                                            for (let j = 0; j < req.body.QCTempVal.length; j++) {
                                                if (error == false) {
                                                    req.body.QCTempVal[j].EvolveQCOrderDetails_ID = data.EvolveQCOrderDetails_ID;
                                                    req.body.QCTempVal[j].EvolveUser_ID = req.body.EvolveUser_ID;
                                                    let addTempValueDetails = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.addTempValueDetails(req.body.QCTempVal[j]);
                                                    console.log("addTempValueDetails??" , addTempValueDetails)
                                                    if (addTempValueDetails instanceof Error || addTempValueDetails.rowsAffected < 1) {
                                                        error = true;
                                                        errorMessage = "Error While Add Temp !!";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                        }
                    } else {
                        allPalletSeleted = false;
                    }
                }
            }

            if(error == false && allPalletSeleted == true) {
                let updateQcOrderStatus = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.updateQcOrderStatus(req.body.QcOrderDetailsList[0].EvolveQCOrder_ID , req.body.EvolveUser_ID);

                console.log('updateQcOrderStatus????' ,  updateQcOrderStatus)
                if(updateQcOrderStatus instanceof Error || updateQcOrderStatus.rowsAffected < 1) {
                    error = true;
                    errorMessage = " Error While Update QC Order Status !!"
                }
            }

            if(error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Perform Successfully.. Data has been Updated!!",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0087: Error while Save QC Table Data !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0087: Error while Save QC Table Data !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLocationList : async function (req , res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getLocationList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Location List!!",
                    result: null
                };
                res.send(obj);
            }else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location List!!",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Location List !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get Location List !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    SaveQCTransferLocation : async function (req , res) {
        try {
            let error = false;
            let errorMessage = "";
            for (let i = 0; i < req.body.QcOrderDetailsList.length; i++) {
                console.log("req.body.QcOrderDetailsList",req.body.QcOrderDetailsList[i]);
                req.body.QcOrderDetailsList[i].EvolveUser_ID = req.body.EvolveUser_ID;
                let data = req.body.QcOrderDetailsList[i];
                let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
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
                                        "part": data.EvolveItem_Part,
                                        "itemDetail": {
                                            "operation": "A",
                                            "lotserialQty": data.IsAccepted == true ? data.EvolveQCOrderDetails_AcceptedQty : data.EvolveQCOrderDetails_RejectedQty,
                                            "effDate": datetime,
                                            "rmks": 'TEST',
                                            "siteFrom": data.EvolveUnit_Code,
                                            "locFrom": data.EvolveLocation_Code,
                                            "lotserFrom": data.EvolveInventory_SerialNo,
                                            "lotrefFrom": data.EvolveInventory_BatchNo,
                                            "siteTo": data.EvolveUnit_Code,
                                            "locTo": data.EvolveTransferedLocation_Code,
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


                let updateInventoryLocation = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.updateInventoryLocation(data);
                if(updateInventoryLocation instanceof Error || updateInventoryLocation.rowsAffected < 1) {
                    error = true;
                    errorMessage = "Error While Update Transfer Location !!";
                }
            }

            if(error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location Transfered Successfully !!",
                    result: null
                };
                res.send(obj);
            }else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save QC Transfer Location !! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Save QC Transfer Location !! " + error.message,
                result: null
            };
            res.send(obj);
        }
    }




}