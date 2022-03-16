'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getItemSearch(req.body.term);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Item search Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Item search" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Item search" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWorkOrderList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWorkOrderList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2564: error on get Work Order List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0756: Error while getting Work Order List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0756: Error while getting Work Order List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMachineShiftList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getMachineShiftList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2565: Error on Machine Shift List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0757: Error while getting Shift list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0757: Error while getting Shift list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMachineList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getMachineList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2566 : Error on get Machine List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0758: Error while getting machine list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0758: Error while getting machine list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDepartmentList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getDepartmentList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2567: Error on get Department List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0759: Error while getting department list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0759: Error while getting department list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getItemList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2568: Error on get Item List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0760: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0760: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWoSchedulingList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWoSchedulingList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2569: Error on get WoScheduling List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0761: Error while getting Wo Scheduling list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0761: Error while getting Wo Scheduling list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addWOScheduling: async function (req, res) {
        try {
            let error = false;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            for (let i = 0; i < req.body.tableData.length; i++) {

                let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
                if (get_barcode_details == 0) {
                    Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                    let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                    res.send(obj);
                    // get_barcode_details = {}
                } else {
                    req.body.EvolveWoSchedule_SEQ = get_barcode_details;
                }

                if (req.body.tableData[i].downtime == true) {
                    let downtime = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWOSchedulingDowntime(req.body, req.body.tableData[i]);
                    if (downtime instanceof Error || downtime.rowsAffected < 1) {
                        error = true;
                        Evolve.Log.error("EERR2570: Error on Add Wos DownTime")
                    }
                } else {
                    let POCount = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSOrderID(req.body.tableData[i]);
                    if (POCount instanceof Error || POCount.rowsAffected < 1) {
                        Evolve.Log.error("EERR2571: Error on get last workorder id")
                        error = true;
                    } else {
                        if (POCount.recordset[0].POCountNo == null) {
                            req.body.wosOrderID = req.body.tableData[i].EvolveWoSchedule_OrderID + '' + 1;
                        } else {
                            req.body.wosOrderID = POCount.recordset[0].POCountNo + 1;
                        }
                        let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWOScheduling(req.body, req.body.tableData[i]);
                        if (result instanceof Error || result.rowsAffected < 1) {
                            error = true;
                            Evolve.Log.error("EERR2572: Error on add wo scheduling")
                        } else {
                            let BomData = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getBomData(req.body.tableData[i]);
                            if (BomData instanceof Error || BomData.rowsAffected < 1) {
                                Evolve.Log.error("EERR2573: Error on get bom data")

                                error = true;
                            } else {
                                // console.log("BomData", BomData)
                                console.log("BomData.length=", BomData.recordset.length)
                                // for (let j = 0; j < BomData.recordset.length; j++) {
                                BomData.recordset.forEach(async function (data) {
                                    console.log("data.EvolveProdOrderBom_QtyPer==", data.EvolveProdOrderBom_QtyPer)
                                    console.log("EvolveWoSchedule_OrderQty==", req.body.tableData[i].EvolveWoSchedule_OrderQty)
                                    let QtyReq = parseFloat(data.EvolveProdOrderBom_QtyPer) * parseFloat(req.body.tableData[i].EvolveWoSchedule_OrderQty);
                                    let BomTableData = {
                                        'EvolveWoSchedule_ID': result.recordset[0].inserted_id,
                                        'EvolveProdOrders_ID': data.EvolveProdOrders_ID,
                                        'EvolveSchedulingBom_ParentItem_ID': data.EvolveProdOrderBom_ParentItem_ID,
                                        'EvolveSchedulingBom_CompItem_ID': data.EvolveProdOrderBom_CompItem_ID,
                                        'EvolveSchedulingBom_DispSeq': data.EvolveProdOrderBom_DispSeq,
                                        'EvolveSchedulingBom_QtyPer': data.EvolveProdOrderBom_QtyPer,
                                        'EvolveSchedulingBom_QtyReq': QtyReq,
                                        'EvolveSchedulingBom_QtyIss': data.EvolveProdOrderBom_QtyIss,
                                        'EvolveSchedulingBom_CycleTime': data.EvolveProdOrderBom_CycleTime,
                                        'EvolveSchedulingBom_SetupTime': data.EvolveProdOrderBom_SetupTime,
                                        'EvolveSchedulingBom_QtyPick': data.EvolveProdOrderBom_QtyPick,
                                        'EvolveSchedulingBom_QtyBom': data.EvolveProdOrderBom_QtyBom,
                                        'EvolveSchedulingBom_QtyAll': data.EvolveProdOrderBom_QtyAll,
                                        'EvolveSchedulingBom_WorkCenter': data.EvolveProdOrderBom_WorkCenter,
                                        'EvolveSchedulingBom_ScanType': data.EvolveProdOrderBom_ScanType,
                                        'EvolveSchedulingBom_Process_ID': data.EvolveProdOrderBom_Process_ID,
                                        'EvolveSchedulingBom_Type': data.EvolveProdOrderBom_Type,
                                        'EvolveSchedulingBom_Scrp_Pct': data.EvolveProdOrderBom_Scrp_Pct,
                                        'EvolveSchedulingBom_Start': data.EvolveProdOrderBom_Start,
                                        'EvolveSchedulingBom_End': data.EvolveProdOrderBom_End,
                                        'EvolveUom_ID': data.EvolveUom_ID,
                                        'EvolveProdOrders_IsBom': data.EvolveProdOrders_IsBom,
                                    }
                                    let addBomData = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addSchedulingBom(req.body, BomTableData);
                                    if (addBomData instanceof Error || addBomData.rowsAffected < 1) {
                                        error = true;
                                        Evolve.Log.error("EERR2574: Error on add Scheduling Bom Data")
                                    }
                                });
                            }
                        }
                    }
                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling add Success",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on add Wo Scheduling",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0762: Error while adding Wo Scheduling  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0762: Error while adding Wo Scheduling  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteWos: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.deleteWos(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2575: Error on delete WO Scheduling",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling delete Success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0763: Error while deleting Wos " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0763: Error while deleting Wos " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateWOSSqc: async function (req, res) {
        try {
            let errorMsg = false;
            let newSqc;
            for (let i = 0; i < req.body.WOSSqcList.length; i++) {
                newSqc = i + 1;
                let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.updateWOSSqc(req.body.WOSSqcList[i], newSqc);
                if (result instanceof Error || result.rowsAffected < 1) {
                    errorMsg = true;
                    Evolve.Log.error("EERR2576: Error on Update Wos")
                }
                else {
                    errorMsg = false;
                }
            }
            if (errorMsg == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling Sqc Updated",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Update WO Scheduling Sqc",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0764: Error while updating WOSSqc " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0764: Error while updating WOSSqc " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemWorkOrderList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getItemWorkOrderList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Work Order List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getListByWorkOrderID: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getListByWorkOrderID(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not define Work Order Data",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getPreviousShiftAvailableTime: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getPreviousShiftAvailableTime(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Previous Shift Data not Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Previous Shift Data Available",
                    result: result.recordset
                };
                res.send(obj);
            }



        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getShiftMinMaxTime: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getShiftMinMaxTime();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Shift Min Max Time",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMachineToItemList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getMachineToItemList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get MAchine To Item",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    workOrderSchedulingLock: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.workOrderSchedulingLock(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Lock Work Order",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Work Order Locked Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWOSDetails: async function (req, res) {
        try {
            let error = false;
            let Details = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSDetails(req.body);
            if (Details instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Work Order details",
                    result: null
                };
                res.send(obj);
            }
            else {
                let woDetails = {}
                let incommingWO = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.incommingWOID(req.body);
                let TimeSheetList = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getTimeSheetList(req.body);
                // let scheduleBomData = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getscheduleBomDataList(req.body);
                let materialToIssue = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getMaterialToIssue(req.body);
                if (materialToIssue instanceof Error) {
                    error = true;
                } else {
                    for (let i = 0; i < materialToIssue.recordset.length; i++) {
                        if (error == false) {
                            let subItems = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                            if (subItems instanceof Error) {
                                // || subItems.rowsAffected < 1
                                error = true;
                            }
                            else {
                                for (let j = 0; j < subItems.recordset.length; j++) {
                                    if (error == false) {
                                        let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID)
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
                                            subItems.recordset[j].qtyIssue = getQtyOnHAnd.qtyIssue
                                        }
                                    }
                                }
                            }
                            materialToIssue.recordset[i].subItems = subItems.recordset;
                            materialToIssue.recordset[i].showSubItem = false;

                        }
                    }


                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: {
                        wosDetails: Details.recordset,
                        IncommingWOID: incommingWO.recordset,
                        TimeSheet: TimeSheetList.recordset,
                        scheduleBom: materialToIssue.recordset,
                    }
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    AddWosPlannerComment: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.AddWosPlannerComment(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Save Comment",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Planner Add Comment Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWOSSingleData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSSingleData(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get single data",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateWOScheduling: async function (req, res) {
        try {
            let error = false;
            // console.log("tableData", req.body.tableData)
            for (let i = 0; i < req.body.tableData.length; i++) {
                let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.updateWOScheduling(req.body.tableData[i]);
                if (result instanceof Error) {
                    error = true;
                }
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on update data",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Update Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    wosPlanPause: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.wosPlanPause(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on update data",
                    result: null
                };
                res.send(obj);
            }
            else {
                let tableData = {
                    'EvolveProdOrders_ID': result.recordset[0].EvolveProdOrders_ID,
                    'EvolveWoSchedule_OrderID': result.recordset[0].EvolveProdOrders_OrderId,
                    'EvolveWoSchedule_OrderDate': result.recordset[0].EvolveWoSchedule_OrderDate,
                    'EvolveWoSchedule_OrderDueDate': result.recordset[0].EvolveWoSchedule_OrderDueDate,
                    'EvolveItem_ID': result.recordset[0].EvolveItem_ID,
                    'EvolveShift_ID': result.recordset[0].EvolveShift_ID,
                    'EvolveMachine_ID': result.recordset[0].EvolveMachine_ID,
                    'EvolveUOM_ID': result.recordset[0].EvolveUOM_ID,
                    'EvolveWoSchedule_Date': result.recordset[0].EvolveWoSchedule_Date,
                    'EvolveWoSchedule_SetupTime': result.recordset[0].EvolveWoSchedule_SetupTime,
                    'EvolveWoSchedule_CycleTime': result.recordset[0].EvolveWoSchedule_CycleTime,
                    'EvolveWoSchedule_ReleaseDate': result.recordset[0].EvolveWoSchedule_ReleaseDate,
                    'EvolveWoSchedule_StartDateTime': req.body.newStartDate,
                    'EvolveWoSchedule_EndDateTime': req.body.newEndDate,
                    'EvolveWoSchedule_OrderQty': req.body.newQty,
                }
                // console.log("tableData", tableData)
                let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
                if (get_barcode_details == 0) {
                    Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                    let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                    res.send(obj);
                    // get_barcode_details = {}
                } else {
                    req.body.EvolveWoSchedule_SEQ = get_barcode_details;
                }

                req.body.EvolveWoSchedule_IsSplit = false;
                let POCount = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSOrderID(tableData);
                if (POCount instanceof Error || POCount.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "error get Shedulind Order Id",
                        result: null
                    };
                    res.send(obj);
                } else {
                    req.body.wosOrderID = POCount.recordset[0].POCountNo + 1;

                    let AddWos = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWosRemaingPlan(req.body, tableData);
                    if (AddWos instanceof Error) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update data",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Plan Pause Success",
                            result: null
                        };
                        res.send(obj);
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWosSplitData: async function (req, res) {
        try {
            let Split = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWosSplitData(req.body);
            if (Split == false) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Split Data not Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: Split.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addSplitWOS: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getSingleWOSData(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get wos old data",
                    result: null
                };
                res.send(obj);
            }
            else {
                let tableData = {
                    'EvolveProdOrders_ID': result.recordset[0].EvolveProdOrders_ID,
                    'EvolveWoSchedule_OrderID': result.recordset[0].EvolveProdOrders_OrderId,
                    'EvolveWoSchedule_OrderDate': result.recordset[0].EvolveWoSchedule_OrderDate,
                    'EvolveWoSchedule_OrderDueDate': result.recordset[0].EvolveWoSchedule_OrderDueDate,
                    'EvolveItem_ID': result.recordset[0].EvolveItem_ID,
                    'EvolveShift_ID': req.body.EvolveShift_ID,
                    'EvolveMachine_ID': result.recordset[0].EvolveMachine_ID,
                    'EvolveUOM_ID': result.recordset[0].EvolveUOM_ID,
                    'EvolveWoSchedule_Date': result.recordset[0].EvolveWoSchedule_Date,
                    'EvolveWoSchedule_SetupTime': result.recordset[0].EvolveWoSchedule_SetupTime,
                    'EvolveWoSchedule_CycleTime': result.recordset[0].EvolveWoSchedule_CycleTime,
                    'EvolveWoSchedule_ReleaseDate': result.recordset[0].EvolveWoSchedule_ReleaseDate,
                    'EvolveWoSchedule_StartDateTime': req.body.EvolveWoSchedule_StartDateTime,
                    'EvolveWoSchedule_EndDateTime': req.body.EvolveWoSchedule_EndDateTime,
                    'EvolveWoSchedule_OrderQty': req.body.EvolveWoSchedule_OrderQty,
                }

                let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
                if (get_barcode_details == 0) {
                    Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                    let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                    res.send(obj);
                    // get_barcode_details = {}
                } else {
                    req.body.EvolveWoSchedule_SEQ = get_barcode_details;
                }

                let POCount = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSOrderID(tableData);
                if (POCount instanceof Error || POCount.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "error get Shedulind Order Id",
                        result: null
                    };
                    res.send(obj);
                } else {
                    req.body.wosOrderID = POCount.recordset[0].POCountNo + 1;

                    req.body.EvolveWoSchedule_IsSplit = true;
                    let AddWos = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWosRemaingPlan(req.body, tableData);
                    if (AddWos instanceof Error) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "error on update data",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "WO Split Success",
                            result: null
                        };
                        res.send(obj);
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMoveJobData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let MachineLastTime = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getLastWosMachineTime(req.body);
            if (MachineLastTime.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Last Machine Date Not found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: MachineLastTime.recordset
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // addNewMoveJob: async function (req, res) {
    //     try {
    //         let error = false;
    //         for (let i = 0; i < req.body.tableData.length; i++) {
    //             let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
    //             if (get_barcode_details == 0) {
    //                 Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
    //                 let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
    //                 res.send(obj);
    //                 // get_barcode_details = {}
    //             } else {
    //                 req.body.EvolveWoSchedule_SEQ = get_barcode_details;
    //             }
    //             let POCount = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSOrderID(req.body.tableData[i]);
    //             if (POCount instanceof Error || POCount.rowsAffected < 1) {
    //                 let obj = {
    //                     statusCode: 400,
    //                     status: "fail",
    //                     message: "error get Shedulind Order Id",
    //                     result: null
    //                 };
    //                 res.send(obj);
    //             } else {
    //                 req.body.wosOrderID = POCount.recordset[0].POCountNo + 1;
    //                 req.body.EvolveWoSchedule_IsSplit = false;
    //                 let AddWos = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWosRemaingPlan(req.body, req.body.tableData[i]);
    //                 if (AddWos instanceof Error) {
    //                     error = true
    //                 } else {
    //                     let deletewos = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.deleteWos(req.body);
    //                 }

    //             }
    //         }
    //         if (error == false) {
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "Job Move Success",
    //                 result: null
    //             };
    //             res.send(obj);
    //         } else {
    //             let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "error on Job Move Process",
    //                 result: null
    //             };
    //             res.send(obj);
    //         }


    //     } catch (error) {
    //         Evolve.Log.error(error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: error.message,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },
    getDepartmentToMachineList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getDepartmentToMachineList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "not found Department To Machine List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

    excelFileUploadWOScheduling: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            if (req.files.excelFile) {
                let xls = req.files.excelFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(xls.name)[1];
                let date = new Date();
                let fileName = date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate() + "_" + date.getHours() + "_" + date.getMinutes() + "_" + date.getSeconds() + "." + ext;
                let datetime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();

                xls.mv("./csv/" + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let workbook = await Evolve.Xlsx.readFile('./csv/' + fileName);
                        var sheet_name_list = workbook.SheetNames;
                        var data = [];
                        sheet_name_list.forEach(function (y) {
                            var worksheet = workbook.Sheets[y];
                            var headers = {};
                            // console.log("worksheet", worksheet)
                            for (let z in worksheet) {
                                if (z[0] === '!') continue;
                                //parse out the column, row, and value
                                var tt = 0;
                                for (var i = 0; i < z.length; i++) {
                                    if (!isNaN(z[i])) {
                                        tt = i;
                                        break;
                                    }
                                };
                                var col = z.substring(0, tt);
                                var row = parseInt(z.substring(tt));
                                var value = worksheet[z].w;

                                //store header names
                                if (row == 1 && value) {
                                    headers[col] = value;
                                    continue;
                                }

                                if (!data[row]) data[row] = {};
                                data[row][headers[col]] = value;
                            }
                            //drop those first two rows which are empty
                            data.shift();
                            data.shift();

                        });
                        let MachineName = "";
                        let wosDate = "";
                        let wosShift = "";
                        for (let i = 0; i < data.length; i++) {
                            if (i == 0) {
                                MachineName = data[i].Machine;
                                wosDate = data[i].Date;
                                wosShift = data[i].Shift;
                            }
                        }
                        console.log("data", data)
                        let MachineID = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getMachineID(MachineName);
                        if (MachineID.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Machine Name Not Found",
                                result: null
                            };
                            res.send(obj);
                        }

                        console.log("EvolveMachine_ID", MachineID.recordset[0].EvolveMachine_ID)
                        if (data != '' && MachineName != '' && wosDate != '' && wosShift != '') {
                            let obj = {
                                statusCode: 200,
                                status: "success",
                                message: 'File Upload Success',
                                result: {
                                    TableData: data,
                                    MachineId: MachineID.recordset[0].EvolveMachine_ID,
                                    wosDate: wosDate,
                                    wosShift: wosShift,
                                }
                            };
                            res.send(obj);
                        } else {
                            let obj = { statusCode: 400, status: "fail", message: "File Data Not Found", result: null };
                            res.send(obj);
                        }

                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }

    },

    getReaonCodeList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getReaonCodeList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "not found Reason Code",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);

            }

        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    AddWosDownTimeReasonCode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.AddWosDownTimeReasonCode(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Update Reason Code",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reason Code Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    publishPlan: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            for (let i = 0; i < req.body.tableData.length; i++) {
                let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.publishPlan(req.body.tableData[i]);
                if (result instanceof Error || result.rowsAffected < 1) {
                    error = true;
                }
            }
            let comment = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addSchedulingPubComment(req.body);
            if (comment instanceof Error || comment.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On add Publish Comments",
                    result: null
                };
                res.send(obj);
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Plan Publish",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Plan Publish Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    AddWosEditPlan: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.deleteOldPlanData(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                error = true;
            } else {
                for (let i = 0; i < req.body.tableData.length; i++) {
                    let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
                    if (get_barcode_details == 0) {
                        Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                        let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                        res.send(obj);
                        // get_barcode_details = {}
                    } else {
                        req.body.EvolveWoSchedule_SEQ = get_barcode_details;
                    }

                    if (req.body.tableData[i].downtime == true) {
                        let downtime = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWOSchedulingDowntime(req.body, req.body.tableData[i]);
                        if (downtime instanceof Error || downtime.rowsAffected < 1) {
                            error = true;
                            Evolve.Log.error("EERR2570: Error on Add Wos DownTime")
                        }
                    } else {
                        let POCount = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getWOSOrderID(req.body.tableData[i]);
                        if (POCount instanceof Error || POCount.rowsAffected < 1) {
                            Evolve.Log.error("EERR2571: Error on get last workorder id")
                            error = true;
                        } else {
                            if (POCount.recordset[0].POCountNo == null) {
                                req.body.wosOrderID = req.body.tableData[i].EvolveWoSchedule_OrderID + '' + 1;
                            } else {
                                req.body.wosOrderID = POCount.recordset[0].POCountNo + 1;
                            }
                            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addWOScheduling(req.body, req.body.tableData[i]);
                            if (result instanceof Error || result.rowsAffected < 1) {
                                error = true;
                                Evolve.Log.error("EERR2572: Error on add wo scheduling")
                            } else {
                                let BomData = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.getBomData(req.body.tableData[i]);
                                if (BomData instanceof Error || BomData.rowsAffected < 1) {
                                    Evolve.Log.error("EERR2573: Error on get bom data")

                                    error = true;
                                } else {
                                    // console.log("BomData", BomData)
                                    console.log("BomData.length=", BomData.recordset.length)
                                    // for (let j = 0; j < BomData.recordset.length; j++) {
                                    BomData.recordset.forEach(async function (data) {
                                        console.log("data.EvolveProdOrderBom_QtyPer==", data.EvolveProdOrderBom_QtyPer)
                                        console.log("EvolveWoSchedule_OrderQty==", req.body.tableData[i].EvolveWoSchedule_OrderQty)
                                        let QtyReq = parseInt(data.EvolveProdOrderBom_QtyPer) * parseInt(req.body.tableData[i].EvolveWoSchedule_OrderQty);
                                        console.log("QtyReq==", QtyReq)
                                        let BomTableData = {
                                            'EvolveWoSchedule_ID': result.recordset[0].inserted_id,
                                            'EvolveProdOrders_ID': data.EvolveProdOrders_ID,
                                            'EvolveSchedulingBom_ParentItem_ID': data.EvolveProdOrderBom_ParentItem_ID,
                                            'EvolveSchedulingBom_CompItem_ID': data.EvolveProdOrderBom_CompItem_ID,
                                            'EvolveSchedulingBom_DispSeq': data.EvolveProdOrderBom_DispSeq,
                                            'EvolveSchedulingBom_QtyPer': data.EvolveProdOrderBom_QtyPer,
                                            'EvolveSchedulingBom_QtyReq': QtyReq,
                                            'EvolveSchedulingBom_QtyIss': data.EvolveProdOrderBom_QtyIss,
                                            'EvolveSchedulingBom_CycleTime': data.EvolveProdOrderBom_CycleTime,
                                            'EvolveSchedulingBom_SetupTime': data.EvolveProdOrderBom_SetupTime,
                                            'EvolveSchedulingBom_QtyPick': data.EvolveProdOrderBom_QtyPick,
                                            'EvolveSchedulingBom_QtyBom': data.EvolveProdOrderBom_QtyBom,
                                            'EvolveSchedulingBom_QtyAll': data.EvolveProdOrderBom_QtyAll,
                                            'EvolveSchedulingBom_WorkCenter': data.EvolveProdOrderBom_WorkCenter,
                                            'EvolveSchedulingBom_ScanType': data.EvolveProdOrderBom_ScanType,
                                            'EvolveSchedulingBom_Process_ID': data.EvolveProdOrderBom_Process_ID,
                                            'EvolveSchedulingBom_Type': data.EvolveProdOrderBom_Type,
                                            'EvolveSchedulingBom_Scrp_Pct': data.EvolveProdOrderBom_Scrp_Pct,
                                            'EvolveSchedulingBom_Start': data.EvolveProdOrderBom_Start,
                                            'EvolveSchedulingBom_End': data.EvolveProdOrderBom_End,
                                            'EvolveUom_ID': data.EvolveUom_ID,
                                            'EvolveProdOrders_IsBom': data.EvolveProdOrders_IsBom,
                                        }
                                        let addBomData = await Evolve.App.Services.SmartFactory.WoScheduling.SrvIndex.addSchedulingBom(req.body, BomTableData);
                                        if (addBomData instanceof Error || addBomData.rowsAffected < 1) {
                                            error = true;
                                            Evolve.Log.error("EERR2574: Error on add Scheduling Bom Data")
                                        }
                                    });
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
                    message: "Wo Scheduling Move Job Success",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on add Wo Scheduling",
                    result: null
                };
                res.send(obj);
            }


        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
}
function pad(number, length) {
    var str = "" + number;
    while (str.length < length) {
        str = "0" + str;
    }
    return str;
}