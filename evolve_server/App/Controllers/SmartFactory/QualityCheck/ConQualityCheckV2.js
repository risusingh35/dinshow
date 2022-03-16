'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    //qc

    getDepartmentList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getDepartmentList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Department",
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
            Evolve.Log.error(" EERR2638: Error while getting Department List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2638: Error while getting Department List " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    
    getQCMachineList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCMachineList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Machine List",
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
            Evolve.Log.error(" EERR2639: Error while getting Machine List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2639: Error while getting Machine List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },     
    getQCLotSerialList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCLotSerialList(req.body);
            console.log(result)
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Lot/Serial List Not Found",
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
            Evolve.Log.error(" EERR2640: Error while getting Lot/Serial List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2640: Error while getting Lot/Serial List " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getQCTabelData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCTabelData(req.body);
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
                    let qcTempData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getqcTempData(result.recordset[0].EvolveQCTemp_ID);
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
                        let getQCOrderNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCOrderNo(req.body);
                        if (getQCOrderNo.rowsAffected < 1) {
                            EvolveQCOrder_Num = "";
                        }
                        else {
                            EvolveQCOrder_Num = getQCOrderNo.recordset[0].EvolveQCOrder_Num;
                        }

                        let EvolveNCR_Num;
                        let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getNCR_Num(req.body);
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
                }else {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "QC Template not selected In Item",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2641: Error while getting QC table data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2641: Error while getting QC table data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


    getQCBADLocationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCBADLocationList();
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
            Evolve.Log.error(" EERR2642: Error while getting Bad Location List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2642: Error while getting getting Bad Location List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getQCGOODLocationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCGOODLocationList();
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
            Evolve.Log.error(" EERR2643: Error while getting Good Location List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2643: Error while getting Good Location List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // QC Table
  
    saveQCTableData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            req.body.holdLocation = null;
            // console.log("Data", req.body)
            let po_barcode = '';
            for (let i = 0; i < req.body.tableData.length; i++) {
                if (i == 0) {
                    let getQCOrderID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.checkQCOLotExists(req.body.tableData[i]);
                    if (getQCOrderID.rowsAffected < 1) {
                        let addQCOrder = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addQCOrder(req.body, req.body.tableData[i]);
                        req.body.EvovleQCOrder_ID = addQCOrder.recordset[0].inserted_id;
                    } else {
                        req.body.EvovleQCOrder_ID = getQCOrderID.recordset[0].EvovleQCOrder_ID;
                    }
                }
                if (req.body.tableData[i].InventoryStatus == 'REJECT') {
                    let addQCOrderDetailsReject = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addQCOrderDetailsReject(req.body, req.body.tableData[i]);
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

                        let getNCR_Num = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.CheckNCR_Num(req.body.tableData[i]);
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

                        let addNCRNo = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addNCRNo(req.body, req.body.tableData[i]);
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
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.updateInventory(req.body, req.body.tableData[i]);
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
                    let addQCOrderDetailsSample = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addQCOrderDetailsSample(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'QC-SAMPLE';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.updateInventory(req.body, req.body.tableData[i]);
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
                if (req.body.tableData[i].InventoryStatus == 'DESTROYED') {
                    let addQCOrderDetailsDestroyed = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addQCOrderDetailsDestroyed(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'UNP-ISS';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.updateDestroyedInventory(req.body, req.body.tableData[i]);
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
                            let InvUpdateData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getInvUpdateData(req.body.tableData[i]);
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
                                let addIOData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addIOData(ioData);
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
                if (req.body.tableData[i].InventoryStatus == 'ACCEPTED') {
                    let addQCOrderDetailsAccept = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addQCOrderDetailsAccept(req.body, req.body.tableData[i]);
                    req.body.EvolveTranstype_Code = 'QC-ACCEPT';
                    let getTransType_ID = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getTransType_ID(req.body);
                    req.body.EvolveTranstype_ID = getTransType_ID.recordset[0].EvolveTranstype_ID;
                    let updateInventory = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.updateInventory(req.body, req.body.tableData[i]);
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
            Evolve.Log.error(" EERR2644: Error while saving QC Table data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2644: Error while saving QC Table data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

  
    // Qc Location
    getQcLocationLotSerialList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQcLocationLotSerialList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Lot List Not found",
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
            Evolve.Log.error(" EERR2645: Error while getting QC Location Lot Serial list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2645: Error while getting QC Location Lot Serial list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCLocationTableList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.getQCLocationTableList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location Data Not found",
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
            Evolve.Log.error(" EERR2646: Error while getting QC Location Table list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2646: Error while getting QC Location Table list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    saveQCLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.saveQCLocation(req.body);
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
                let ioFields = {
                    'EvolveItem_Code': result.recordset[0].EvolveItem_Code,
                    'EvolveInventory_QtyOnHand': result.recordset[0].EvolveInventory_QtyOnHand,
                    'FromUnitCode': '10-100',
                    'ToUnitCode': '10-100',
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
                let addIOData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvQualityCheckV2.addIOData(ioData);
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

        } catch (error) {
            Evolve.Log.error(" EERR2647: Error while Saving QC Location " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2647: Error while Saving QC Location " + error.message,
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