'use strict';
const Evolve = require("../../../../Boot/Evolve");
const { changePalletStatus } = require("../../../Services/SmartFactory/PickList/SrvWoPickList");
module.exports = {
    getSectionList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getSectionList();
            if (list instanceof Error) {
                Evolve.Log.error("EERR2680: Error while get department list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2680: Error while get department list ",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2681: Error while get department list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2681: Error while get department list ",
                result: null
            };
            res.send(obj);
        }
    },
    getMachineList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getMachineList(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2682 : Error while get machine list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2682 : Error while get machine list ",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "machine List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2683: Error while getting machine list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2683: Error while getting machine list",
                result: null
            };
            res.send(obj);
        }
    },
    getWoList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoList(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2684 :Error while get WO list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2684 : Error while get WO list ",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "WO List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2685: Error while get WO list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2685 : Error while get WO list",
                result: null
            };
            res.send(obj);
        }
    },

    getWoDetails: async function (req, res) {
        try {
            let data = {};
            let details = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoDetails(req.body.EvolveProdOrders_ID);
            if (details instanceof Error) {
                Evolve.Log.error("EERR####: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get wo details", result: null };
                res.send(obj);
            } else {
                data.materialToProduce = details.recordset;
                let bomDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoBomDetails(req.body.EvolveProdOrders_ID);
                if (bomDetails instanceof Error) {
                    Evolve.Log.error("EERR####: Error while  get wo details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get wo bom details", result: null };
                    res.send(obj);
                } else {
                    data.materialToIssue = bomDetails.recordset;
                    data.materialToProduce[0].EvolveTransHistory_Type = 'MATERIALISSUED'
                    let materialIssued = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTransHistory(data.materialToProduce[0]);
                    if (materialIssued instanceof Error) {
                        Evolve.Log.error("EERR####: Error while  get wo details")
                        let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                        res.send(obj);
                    } else {
                        data.materialIssued = materialIssued.recordset;
                        data.materialToProduce[0].EvolveTransHistory_Type = 'MATERIALPRODUCED'
                        let materialProduced = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTransHistory(data.materialToProduce[0]);
                        if (materialProduced instanceof Error) {
                            Evolve.Log.error("EERR####: Error while  get wo details")
                            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while  get material issued again work order", result: null };
                            res.send(obj);
                        } else {

                            console.log("= materialProduced????", materialProduced)
                            data.materialProduced = materialProduced.recordset;

                            let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                            console.log("obj???", obj)
                            res.send(obj);
                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },
    onInventoryIssue: async function (req, res) {
        try {
            let errorMessage = '';
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.checkInventory(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR#### :Error while check inventory ")
                errorMessage = 'Error While Check Inventory'
            } else if (list.rowsAffected < 1) {
                errorMessage = 'Inventory Not Found'
            } else {

                list.recordset[0].EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID




                if (list.recordset[0].EvolveLocation_ID != req.body.EvolveLocation_ID) {

                    errorMessage = 'Machine Location And Pallet location not matched'

                } else if (list.recordset[0].EvolveInventory_Status == 'ISSUED') {

                    errorMessage = 'Pallet Already Issued'


                } else {
                    let isItemMatched = false;
                    let EvolveProdOrdersDetail_ID = null;

                    req.body.materialToIssue = req.body.materialToIssue.map(v => {

                        if (v.EvolveItem_ID == list.recordset[0].EvolveItem_ID) {
                            isItemMatched = true;
                            EvolveProdOrdersDetail_ID = v.EvolveProdOrdersDetail_ID;
                        }
                        return v
                    })


                    if (isItemMatched) {

                        list.recordset[0].EvolveInventory_Status = 'ISSUED'

                        let changeInvStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.changeInventoryStatus(list.recordset[0]);
                        if (changeInvStatus instanceof Error || changeInvStatus.rowsAffected < 1) {
                            errorMessage = 'Error While Update Inventory Status'
                        } else {

                            list.recordset[0].EvolveProdOrdersDetail_ID = EvolveProdOrdersDetail_ID;
                            let updateProdOrderDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateProdOrderDetails(list.recordset[0]);
                            if (updateProdOrderDetails instanceof Error || updateProdOrderDetails.rowsAffected < 1) {
                                errorMessage = 'Error While Inventory Issue'
                            } else {

                                let transDetails = {

                                    EvolveProdOrders_OrderNo: req.body.materialToProduce.EvolveProdOrders_OrderNo,
                                    EvolveProdOrders_OrderID: req.body.materialToProduce.EvolveProdOrders_OrderID,
                                    EvolveItem_Part: list.recordset[0].EvolveItem_Part,
                                    EvolveLocation_Code: list.recordset[0].EvolveLocation_Code,
                                    EvolveTransHistory_Qty: list.recordset[0].EvolveInventory_QtyAvailable,
                                    EvolveInventory_SerialNo: list.recordset[0].EvolveInventory_SerialNo,
                                    EvolveTransHistory_Type: 'MATERIALISSUED',
                                    EvolveTransHistory_BatchNo: list.recordset[0].EvolveInventory_BatchNo,
                                    EvolveTransHistory_LotSerialNo: list.recordset[0].EvolveInventory_LotSerialNo,

                                }
                                await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);

                            }
                        }

                    } else {
                        errorMessage = 'Item Not Macthed For Issueing'
                    }
                }

            }
            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Inventory Issued Successfully' : errorMessage, result: null };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while check inventory " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR#### : Error while check inventory",
                result: null
            };
            res.send(obj);
        }
    },

    // view only plan details 
    getMachinePlanDetails: async function (req, res) {
        try {
            let vpDetails = {};
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let details = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getMachinePlanDetails(req.body);
            if (details instanceof Error) {
                Evolve.Log.error(" EERR2688: Error while get WO details  ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2688 : Error while get plan details",
                    result: null
                };
                res.send(obj);
            } else {
                for (let i = 0; i < details.recordset.length; i++) {
                    if (details.recordset[i].EvolveWoSchedule_RejectedQty == null) {
                        details.recordset[i].EvolveWoSchedule_RejectedQty = 0;

                    }
                    let hours = (details.recordset[i].EvolveWoSchedule_SetupTime / 60);
                    let rhours = ('0' + Math.floor(hours)).slice(-2);
                    let minutes = (hours - rhours) * 60;
                    let rminutes = ('0' + Math.round(minutes)).slice(-2);
                    details.recordset[i].EvolveWoSchedule_SetupTime = rhours + ':' + rminutes;
                    hours = (details.recordset[i].EvolveWoSchedule_CycleTime / 60);
                    rhours = ('0' + Math.floor(hours)).slice(-2);
                    minutes = (hours - rhours) * 60;
                    rminutes = ('0' + Math.round(minutes)).slice(-2);
                    details.recordset[i].EvolveWoSchedule_CycleTime = rhours + ':' + rminutes;
                }
                vpDetails.currentPlans = details.recordset;

                //    let upcomingPlans = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getUpcomingPlansDetails(req.body);
                //    if (upcomingPlans instanceof Error ) {
                //     let obj = {
                //        statusCode: 400,
                //        status: "fail",
                //        message: "Error while get plan details",
                //        result: null       
                //       };
                //        res.send(obj);
                //    }else {
                //    vpDetails.upcomingPlans = upcomingPlans.recordset;
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Plan details",
                    result: vpDetails
                };
                res.send(obj);
                //   }
            }
        } catch (error) {
            Evolve.Log.error("EERR2689: Error while get plan details " + error.message);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "EERR2689 : Error while get plan details",
                result: null,
            };
            res.send(obj);
        }
    },
    getPlanMtIssueDetails: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let planDetails = {};
            let error = false;
            let materialToIssue = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getMaterialToIssue(req.body);
            if (materialToIssue instanceof Error) {
                error = true;
            } else {
                for (let i = 0; i < materialToIssue.recordset.length; i++) {
                    if (error == false) {
                        if (materialToIssue.recordset[i].qtyHand == null) {
                            materialToIssue.recordset[i].qtyHand = 0;
                        }
                        let subItems = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                        if (subItems instanceof Error) {
                            error = true;
                        } else {
                            for (let j = 0; j < subItems.recordset.length; j++) {
                                if (error == false) {
                                    let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID, req.body.EvolveWoSchedule_ID)
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
                planDetails.materialToIssue = materialToIssue.recordset;
                let inComPlans = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getInComingPLans(req.body);
                if (inComPlans instanceof Error) {
                    error = true;
                } else {
                    planDetails.inComPlans = inComPlans.recordset;

                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "plan details",
                        result: planDetails
                    };
                    res.send(obj);
                } else {
                    Evolve.Log.error("EERR2690: Error while get plan details ");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2690 : Error while get plan details",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2691: Error while get plan details  " + error.message);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "EERR2691 : Error while get plan details",
                result: null
            };
            res.send(obj);
        }
    },

    addProdComments: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let addComments = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addProdComments(req.body);
            if (addComments instanceof Error) {
                Evolve.Log.error("EERR2692 : Error while add prod comments")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2692 : Error while add prod comments",
                    result: addComments.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Prod comments updated successfully",
                    result: addComments.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR2693 : Error while add prod comments " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2693 : Error while add prod comments " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    issuePallet: async function (req, res) {
        try {
            let error = false;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            if (req.body.EvolveSubItem_SubItem_ID == null) {
                req.body.EvolveSubItem_SubItem_ID = req.body.EvolveItem_ID
            }
            let woNumber = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoNumber(req.body.EvolveWoSchedule_ID);
            if (woNumber instanceof Error) {
                Evolve.Log.error("EERR3088 : Error while get wo number ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3088: Error while get wo number ", result: null };
                res.send(obj);
            } else {
                req.body.EvolveWoSchedule_OrderID = woNumber.recordset[0].EvolveWoSchedule_OrderID;
                let changePalletStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.changeInvPalletStatus(req.body);
                if (changePalletStatus instanceof Error || changePalletStatus.rowsAffected < 1) {
                    error = true;
                } else {
                    let addIssuedPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addIssuedPallet(req.body);
                    if (addIssuedPallet instanceof Error || addIssuedPallet.rowsAffected < 1) {
                        error = true;
                    } else {
                        let updateProdOrd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateProdOrderBom(req.body);
                        if (updateProdOrd instanceof Error || updateProdOrd.rowsAffected < 1) {
                            error = true;

                            // }else{
                            //  
                        }
                    }
                    if (error == true) {
                        Evolve.Log.error("EERR2696 : Error while issue pallet")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2696 : Error while issue pallet ",
                            result: check.message
                        };
                        res.send(obj);
                    } else {
                        let obj = {
                            statusCode: 200,
                            status: "Success",
                            message: "Pallet issued successfully",
                            result: "Success"
                        };
                        res.send(obj);
                    }
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2697 : Error while issue pallet " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2697 : Error while issue pallet ",
                result: null
            };
            res.send(obj);
        }
    },
    getRtsLocationList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getRtsLocationList(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2698 : Error while get location list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2698 : Error while get location list ",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "location List",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2699 : Error while get location list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2699 : Error while get location list",
                result: null
            };
            res.send(obj);
        }
    },

    rtsQty: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            if (req.body.rtsSecUom == '') {
                req.body.rtsSecUom = null;
            }
            let locStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                Evolve.Log.error("EERR3086  : Error while get location status ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3086 : Error while get location status ", result: null };
                res.send(obj);
            } else {
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateIssuedQty(req.body);
                if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
                    Evolve.Log.error("EERR2700 : Error while update issue qty")
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2700 : Error while update issue qty",
                        result: ''
                    };
                    res.send(obj);
                } else {
                    let updateProdOrder = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateProdOrderIssueQty(req.body);
                    if (updateProdOrder instanceof Error || updateProdOrder.rowsAffected < 1) {
                        Evolve.Log.error("EERR2701 : Error while update prod order issue qty")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2701 : Error while update prod order issue qty",
                            result: ''
                        };
                        res.send(obj);
                    } else {
                        let updateInventoryPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateInventoryPallet(req.body);
                        if (updateInventoryPallet instanceof Error || updateInventoryPallet.rowsAffected < 1) {
                            Evolve.Log.error("EERR2702 : Error while update inventory")
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2702 : Error while update inventory",
                                result: ''
                            };
                            res.send(obj);
                        } else {
                            let changePalletRtsStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.changePalletRtsStatus(req.body);

                            //  let newPalletId =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get pallet barcode  
                            //     if (newPalletId == 0  ) {
                            //         Evolve.Log.error(" Error while create new pallet ")
                            //           let obj = { statusCode: 400, status: "fail", message: " Error while create new pallet ", result: null };
                            //          res.send(obj);
                            //    }
                            //    else {
                            //         let newPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.createNewPallet(newPalletId , req.body);
                            if (changePalletRtsStatus instanceof Error || changePalletRtsStatus.rowsAffected < 1) {
                                Evolve.Log.error("EERR2703 : Error while update inventory")
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "EERR2703 : Error while update inventory",
                                    result: ''
                                };
                                res.send(obj);
                            } else {
                                let obj = {
                                    statusCode: 200,
                                    status: "success",
                                    message: "Return to inventory successfully ",
                                    result: ''
                                };
                                res.send(obj);
                            }

                            // }
                        }

                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR2704: Error while return to inventory " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2704: Error while return to inventory",
                result: null
            };
            res.send(obj);
        }
    },
    getProdBookingDetails: async function (req, res) {
        try {

            let poBookingDetails = {}
            let uomList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoItemSecUomList(req.body);
            if (uomList instanceof Error) {
                Evolve.Log.error("EERR2705 : Error while get secondary uom ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2705 : Error while get secondary uom ",
                    result: uomList.message
                };
                res.send(obj);
            } else {
                poBookingDetails.uomList = uomList.recordset;
                let bookedList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoBookedList(req.body.EvolveWoSchedule_ID);
                if (bookedList instanceof Error) {
                    Evolve.Log.error("EERR2706 : Error while get booked pallets ")
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2706 : Error while get booked pallets ",
                        result: null
                    };
                    res.send(obj);
                } else {
                    poBookingDetails.bookedList = bookedList.recordset;
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "machine List",
                        result: poBookingDetails
                    };
                    res.send(obj);
                }


            }
        } catch (error) {
            Evolve.Log.error(" EERR2707: Error while get production booking details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2707: Error while get production booking details ",
                result: null
            };
            res.send(obj);
        }
    },

    completeProductionBooking: async function (req, res) {
        try {

            console.log("On BOOKINNF??" ,  req.body)

            let errorMessage = '';

            if (req.body.EvolveLocation_Code == null) {

                // let  findMachineLocation  = 

                let findMachineLocation = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.findMachineLocation(req.body.EvolveMachine_Code);
                if (findMachineLocation instanceof Error) {

                    errorMessage = 'Error While Find Machine Location';

                } else if (findMachineLocation.rowsAffected < 1) {

                    let itemDefLacation = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getItemDefaultLocation(req.body.EvolveItem_ID);
                    if (itemDefLacation instanceof Error) {

                        errorMessage = 'Error While Item efault Location';

                    } else if (itemDefLacation.rowsAffected < 1) {

                        errorMessage = 'Item Defaullt Location Not Found';

                    } else {

                        req.body.EvolveLocation_Code = itemDefLacation.recordset[0].EvolveLocation_Code;
                        req.body.EvolveLocation_ID = itemDefLacation.recordset[0].EvolveLocation_ID;

                    }
                } else {
                    req.body.EvolveLocation_Code = findMachineLocation.recordset[0].EvolveLocation_Code;
                    req.body.EvolveLocation_ID = findMachineLocation.recordset[0].EvolveLocation_ID;
                }



            }




            if (errorMessage == '') {


                // req.body.EvolveSection_Code == 
                if(req.body.EvolveSection_Code == 'SLITTING'){

                    if(req.body.productQuality != 'Fresh'){


                        let  splittedArray = req.body.EvolveItem_Part.split('-') ;


                        let  itemPart = splittedArray[0] +'-'+ req.body.productQuality ;

                        console.log("itemPart?????????????????????????????????????" ,  itemPart)

                        req.body.EvolveItem_Part = itemPart ;

                    }
                }


                console.log("req.body.EvolveItem_Part????"    ,  req.body.EvolveItem_Part)

                let date = new Date();
                let dateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


                req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;

                // req.body.EvolveCompany_ID = req.EvolveCompany_ID;
                // req.body.EvolveUnit_ID = req.EvolveUnit_ID;
                // let locStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getLocationStatus(req.body.EvolveLocation_ID);
                // if (locStatus instanceof Error) {
                //     Evolve.Log.error("EERR3087 : Error while get location status ")
                //     let obj = { statusCode: 400, status: "fail", message: "EERR3087 : Error while get location status ", result: null };
                //     res.send(obj);
                // } else {
                // req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                // let error = false;
                // let getTransTypeID = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getTransTypeID('WO-RCPT');
                // if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                //     error = true;
                // }
                // else {
                // req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID
                let palletNumber = Evolve.Generator.generate("PCL");

                if (palletNumber == undefined || palletNumber.length == 0) {

                    errorMessage = 'Error While Generate New pallet Id';


                } else {

                    palletNumber = (palletNumber.toString()).replace(/ -/g, '')
                    palletNumber = palletNumber.split(" ").join("");
                    // let receiptDetail = [];
                    // receiptDetail.push({
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     "site": req.body.EvolveUnit_Code,
                    //     "location": req.body.EvolveLocation_Code,
                    //     "lotserial": req.body.EvolveInventory_LotSerialNo,
                    //     "lotref": palletNumber,
                    //     "lotserialQty": req.body.EvolveInventory_QtyAvailable
                    // });

                    // console.log('receiptDetail????' , receiptDetail)


                    // let WorkOrderInfo = {
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     "um": req.body.EvolveUom_Uom,
                    //     "conv": "1",
                    //     "site": req.body.EvolveUnit_Code,
                    //     "multiEntry": true,
                    //     receiptDetail
                    // };
                    // console.log('WorkOrderInfo????' , WorkOrderInfo)

                    // let WorkOrderTail = {
                    //     "woNbr": req.body.EvolveProdOrders_OrderID,
                    //     "woLot": '',
                    //     WorkOrderInfo
                    // };

                    // console.log('WorkOrderTail????' , WorkOrderTail)

                    let pendingInvXmlObj = {
                        "soapenv:Envelope": {
                            "@xmlns": "urn:schemas-qad-com:xml-services",
                            "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                            "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                            "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                            "soapenv:Header": {
                                "wsa:Action": "",
                                "wsa:To": "urn:services-qad-com:QADERP",
                                "wsa:MessageID": "urn:services-qad-com::QADERP",
                                "wsa:ReferenceParameters": { "qcom:suppressResponseDetail": "true" },
                                "wsa:ReplyTo": { "wsa:Address": "urn:services-qad-com:" }
                            },
                            "soapenv:Body": {
                                "EvolveProdRct": {
                                    "qcom:dsSessionContext": {
                                        "qcom:ttContext": [
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "domain",
                                                "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "scopeTransaction",
                                                "qcom:propertyValue": "false"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "version",
                                                "qcom:propertyValue": 'ERP_1'
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "mnemonicsRaw",
                                                "qcom:propertyValue": "false"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "username",
                                                "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "password",
                                                "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "action",
                                                "qcom:propertyValue": ""
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "entity",
                                                "qcom:propertyValue": 'CFD01'
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "email",
                                                "qcom:propertyValue": ""
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "emailLevel",
                                                "qcom:propertyValue": ""
                                            }
                                        ]
                                    },
                                    "dsProductionOrderRct": {
                                        "ProductionOrderRct": {

                                            "operation": "A",
                                            "veffectivedate": dateTime,
                                            "vsite": req.body.EvolveUnit_Code,
                                            "vworkordernumber": req.body.EvolveProdOrders_OrderNo,
                                            "vlotid": req.body.EvolveProdOrders_OrderID,
                                            "part": req.body.EvolveItem_Part,
                                            "qtyTotProc": req.body.EvolveInventory_QtyAvailable,
                                            "vum": req.body.EvolveUom_Uom,
                                            "lotserialQty": req.body.EvolveInventory_QtyAvailable,
                                            "site": req.body.EvolveUnit_Code,
                                            "location": req.body.EvolveLocation_Code,
                                            "lotserial": req.body.EvolveInventory_LotSerialNo,
                                            "lotref": palletNumber,
                                            "multiEntry": false,
                                            "chgAttr": false,
                                            "yn": true,
                                            "yn1": true,
                                            "vconfirmupdate": true,
                                        }
                                    }
                                }
                            }
                        }
                    }

                    var woRcptXmldoc = Evolve.Xmlbuilder.create(pendingInvXmlObj, { version: '1.0', encoding: 'utf-8' })
                    let woRcptXmlFile = woRcptXmldoc.end({ pretty: true });
                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                            //'Content-Length': pendingInvXmldoc.length 
                        }
                    }

                    console.log('JSON STRINGIFY>>', (woRcptXmlFile))
                    let pendingInvResponce = await Evolve.Axios.post(Evolve.Config.QXTENDURL, woRcptXmlFile, config);
                    await Evolve.Xml2JS.parseString(pendingInvResponce.data, async function (err, resPonsedXml) {
                        try {
                            if (err) {
                                // error = true;
                                errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING PENDING INVOICE  DATA';

                            }
                            else {

                                console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
                                let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:EvolveProdRctResponse'][0]['ns1:result'][0];
                                if (result == 'error') {
                                    // error = true;
                                    errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);
                                } else {

                                    if (req.body.EvolveQCTemp_ID == null || req.body.EvolveQCTemp_ID == 'null' || req.body.EvolveQCTemp_ID == '') {
                                        req.body.EvolveInventory_Status = 'AVAILABLE'
                                    } else {
                                        req.body.EvolveInventory_Status = 'QCHOLD'
                                    }

                                    req.body.EvolveInventory_SerialNo = palletNumber;
                                    req.body.EvolveInventory_SerialNo = (req.body.EvolveInventory_SerialNo.toString()).replace(/ -/g, '')
                                    req.body.EvolveInventory_SerialNo = req.body.EvolveInventory_SerialNo.split(" ").join("");
                                    req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                                    req.body.EvolveUnit_ID = req.EvolveUnit_ID == undefined ? null : req.EvolveUnit_ID;
                                    let addInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addInventory(req.body);
                                    if (addInventory instanceof Error || addInventory.rowsAffected < 1) {

                                        errorMessage = 'Error While Add Inventory';

                                    } else {
                                        let updateProdOrderDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateProdOrderCompletedQty(req.body);
                                        if (updateProdOrderDetails instanceof Error || updateProdOrderDetails.rowsAffected < 1) {

                                            errorMessage = 'Error While update Prod Order';

                                        } else {
                                            let transDetails = {
                                                EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
                                                EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
                                                EvolveItem_Part: req.body.EvolveItem_Part,
                                                EvolveLocation_Code: req.body.EvolveLocation_Code,
                                                EvolveTransHistory_Qty: req.body.EvolveInventory_QtyAvailable,
                                                EvolveInventory_SerialNo: req.body.EvolveInventory_SerialNo,
                                                EvolveTransHistory_LotSerialNo: req.body.EvolveInventory_LotSerialNo,
                                                EvolveTransHistory_BatchNo: req.body.EvolveInventory_BatchNo,
                                                EvolveTransHistory_Type: 'MATERIALPRODUCED',
                                            }
                                            await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);


                                            // Quality Order Logic - Start

                                            // if (req.body.EvolveInventory_Status == 'QCHOLD') {
                                            //     let checkSameBatchQCExits = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.checkSameBatchQCExits(req.body);
                                            //     if (checkSameBatchQCExits instanceof Error) {
                                            //         errorMessage = 'Error While Check Same Batch QC Exits Or Not!!'
                                            //     } else if (checkSameBatchQCExits.rowsAffected < 1) {
                                            //         let generatedQCOrderNumber = await Evolve.Generator.generate('QC');
                                            //         req.body.EvolveQCOrder_Num = generatedQCOrderNumber.replace(" - ", "");
                                            //         let addNewQcOrder = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addNewQcOrder(req.body);
                                            //         if (addNewQcOrder instanceof Error || addNewQcOrder.rowsAffected < 1) {
                                            //             errorMessage = "Error While Add Record In QC!!"
                                            //         } else {
                                            //             req.body.EvolveQCOrder_ID = addNewQcOrder.recordset[0].inserted_id;
                                            //             let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(req.body);
                                            //             if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                            //                 errorMessage = "Error While Add Record In QC Details !!";
                                            //             }
                                            //         }
                                            //     } else {
                                            //         req.body.EvolveQCOrder_ID = checkSameBatchQCExits.recordset[0].EvolveQCOrder_ID;
                                            //         let addNewQcOrderDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.addNewQcOrderDetails(req.body);
                                            //         if (addNewQcOrderDetails instanceof Error || addNewQcOrderDetails.rowsAffected < 1) {
                                            //             errorMessage = "Error While Add Record In QC Details !!";
                                            //         } else {
                                            //             if (checkSameBatchQCExits.recordset[0].EvolveQCOrder_Status == 'QCDONE') {
                                            //                 let updateQcOrderStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvReciept.updateQcOrderStatus(req.body);
                                            //                 if (updateQcOrderStatus instanceof Error || updateQcOrderStatus.rowsAffected < 1) {
                                            //                     errorMessage = "Error While Update QC Order Status !!";
                                            //                 }
                                            //             }
                                            //         }
                                            //     }
                                            // }
                                        }
                                    }
                                }
                            }
                        } catch (error) {

                            errorMessage = " EERR2713: Error while confirm booking  " + error.message;
                            // Evolve.Log.error(" EERR2713: Error while confirm booking  " + error.message);
                            // let obj = {
                            //     statusCode: 400,
                            //     status: "fail",
                            //     message: "EERR2713 : Error while confirm booking",
                            //     result: null
                            // };
                            // res.send(obj);
                        }
                    });
                }
            }

            console.log("ENTERED????? laats" )

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Production Booked Successfully' : errorMessage, result: null };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR2709 : Error while complete booking " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2709 : Error while complete booking "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteBookedPallet: async function (req, res) {
        try {
            let error = false;
            let updateQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateWoOrderQty(req.body, 'DELETEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected < 1) {
                error = true;
            } else {
                let deletePallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.deleteProdOrderPallet(req.body.EvolveProdOrdersDetail_ID);
                if (deletePallet instanceof Error || deletePallet.rowsAffected < 1) {
                    error = true;
                } else {
                    let deleteInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.deleteInventory(req.body.EvolveInventory_ID);
                    if (deleteInventory instanceof Error || deleteInventory.rowsAffected < 1) {
                        error = true;
                    }
                }
            }
            if (error == true) {
                Evolve.Log.error("EERR2710 : Error while delete pallet")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2710 : Error while delete pallet",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "PALLET DELETED SUCCESSFULLY",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2711: Error while delete pallet " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2711: Error while delete pallet ",
                result: null
            };
            res.send(obj);
        }
    },


    updateBookedPallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let error = false;
            let updateQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateWoOrderQty(req.body, 'UPDATEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected < 1) {
                error = true;
            }
            else {
                let uodateDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updatePbPalletDetails(req.body);
                if (uodateDetails instanceof Error || uodateDetails.rowsAffected < 1) {
                    error = true;
                } else {
                    let updateInvPbPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateInvPbPallet(req.body);
                    if (updateInvPbPallet instanceof Error || updateInvPbPallet.rowsAffected < 1) {
                        error = true;
                    }
                }
            }
            if (error == true) {
                Evolve.Log.error("EERR2714 : Error while update pallet  ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2714 : Error while update pallet  ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "PALLET UPDATED",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2715 : Error while update pallet  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2715: Error while update pallet",
                result: null
            };
            res.send(obj);
        }
    },
    getRtsUomList: async function (req, res) {
        try {
            let uomList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoItemSecUomList(req.body);
            if (uomList instanceof Error) {
                Evolve.Log.error("EERR2716 : Error while get secondary uom list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2716 : Error while get secondary uom list",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "UOM LIST",
                    result: uomList.recordset
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2717: Error while get secondary uom list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2717: Error while get secondary uom list ",
                result: null
            };
            res.send(obj);
        }
    },
    getSlittingItemList: async function (req, res) {
        try {
            console.log("GET SLITTING LIST:>>?>>>>>")
            let productQuality = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getProductQuality();
            if (productQuality instanceof Error) {
                Evolve.Log.error("EERR2716 : Error while get slitting sub item ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2716 : Error while get slitting sub item",
                    result: null
                };
                res.send(obj);
            } else {

                productQuality.recordset = (productQuality.recordset).reverse() ;

                productQuality.recordset.push({
                    EvolveProductQuality_Name : 'Fresh' ,
                    EvolveProductQuality_Code : 'Fresh' ,
                    EvolveProductQuality_Sequence : 'Fresh' ,

                })

                productQuality.recordset = (productQuality.recordset).reverse() ;

                console.log(" productQuality.recordset????" ,  productQuality.recordset)
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "product quality",
                    result: productQuality.recordset
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2717: Error while get product quality " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2717: Error while get product quality ",
                result: null
            };
            res.send(obj);
        }
    },

    // getTsShiftList: async function (req, res) {
    //     try {
    //        let shiftList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTsShiftList(req.body);
    //        let shifts = [];
    //        let count = 0;
    //         if (shiftList instanceof Error ) {
    //             Evolve.Log.error("EERR2718 : Error while get shift list ")
    //               let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "EERR2718 : Error while get shift list"   ,
    //                 result: null
    //             };
    //             res.send(obj);
    //         } else {
    //             let dateTime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime(); 
    //             for(let i=0 ; i<shiftList.recordset.length ; i++){
    //               if(count != 5){
    //                     // console.log("entered in  3rd shift >>>>");
    //                     let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);

    //                     Evolve.Log.error("EERR2719 : Error while get shift name ")
    //                     if (getShifTName instanceof Error || getShifTName.rowsAffected<1) {
    //                         let obj = {
    //                             statusCode: 400,
    //                             status: "fail",
    //                             message: "EERR2719 : Error while get shift name"   ,
    //                             result: null
    //                         };
    //                         res.send(obj)
    //                      }else{

    //                 //     let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z');
    //                 //     let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift3))
    //                 //     let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;

    //                 //     let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                 //     let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)

    //                 //      let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime;
    //                 //      let endTime  =new Date(endDateTime)

    //                 //     let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                 //     let currentTime =dateTime.slice(11 ,21) 



    //                 //     if(cureentDate == startDate || cureentDate == endDate  ){
    //                 //     if(currentTime>=startTime && currentTime<=endedTime){
    //                 //          shifts = [] ;
    //                 //         shifts.push({

    //                 //             startTime : startTime ,
    //                 //             endedTime : endedTime,
    //                 //             date : shiftList.recordset[i].calendarDate,
    //                 //             dateTime : {
    //                 //                 startDateTime : startDateTime,
    //                 //                 endDateTime : endDateTime,
    //                 //             },
    //                 //           shiftNo :3,
    //                 //           currentShift : true , 
    //                 //           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                 //           shiftName : getShifTName.recordset[0].EvolveShift_Name
    //                 //           });
    //                 //           count=1 ;
    //                 //    }else{
    //                 //          shifts.push({

    //                 //             startTime : startTime ,
    //                 //             endedTime : endedTime,
    //                 //             date : shiftList.recordset[i].calendarDate,
    //                 //             dateTime : {
    //                 //                 startDateTime : startDateTime,
    //                 //                 endDateTime : endDateTime,
    //                 //             },
    //                 //           shiftNo :3,
    //                 //           currentShift : false , 
    //                 //           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                 //           shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                 //           });
    //                 //           count+=1 ;
    //                 //      }


    //                 //     }else{
    //                 //         shifts.push({

    //                 //             startTime : startTime ,
    //                 //             endedTime : endedTime,
    //                 //             date : shiftList.recordset[i].calendarDate,
    //                 //             dateTime : {
    //                 //                 startDateTime : startDateTime,
    //                 //                 endDateTime : endDateTime,
    //                 //             },
    //                 //         shiftNo :3,
    //                 //         currentShift : false , 
    //                 //         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                 //         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                 //         });
    //                 //         count+=1 ;
    //                 //     }

    //                 let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z');
    //                 let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift3))

    //                 let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                 let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                 let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)
    //                 let currentTime =dateTime.slice(11 ,21) 
    //                 let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime;
    //                 let endTime  =new Date(endDateTime)
    //                 let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                 if(cureentDate == startDate || cureentDate == endDate  ){
    //                       if(currentTime>=startTime && currentTime<=endedTime){
    //                     shifts = [] ;
    //                     shifts.push({
    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                       shiftNo :3,
    //                       currentShift : true ,
    //                       EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                       shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                       });
    //                       count=0 ;
    //                }else{
    //                     shifts.push({

    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                       shiftNo :3,
    //                       currentShift : false , 
    //                       EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                       shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                       });
    //                       count+=1 ;
    //                  }


    //                 }else{
    //                     shifts.push({

    //                         startTime : startTime ,
    //                         endedTime : endedTime,
    //                         date : shiftList.recordset[i].calendarDate,
    //                         dateTime : {
    //                             startDateTime : startDateTime,
    //                             endDateTime : endDateTime,
    //                         },
    //                     shiftNo :3,
    //                     EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                     currentShift : false ,
    //                     shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                     });
    //                     count+=1 ;
    //                 }
    //                 }
    //               }

    //               if(count != 5){
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
    //                 if (getShifTName instanceof Error ||  getShifTName.rowsAffected<1 ) {
    //                     Evolve.Log.error("EERR2720 : Error while get shift name ")

    //                     let obj = {
    //                         statusCode: 400,
    //                         status: "fail",
    //                         message: "EERR2720 : Error while get shift name"   ,
    //                         result: null
    //                     };
    //                     res.send(obj)

    //                  }else{


    //                     let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z');
    //                     let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift2))

    //                     let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                     let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                     let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)
    //                     let currentTime =dateTime.slice(11 ,21) 
    //                     let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime;
    //                     let endTime  =new Date(endDateTime)
    //                     let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);

    //                     // console.log("enterd in  2 and  >>. ,  currentTime  " ,  currentTime)
    //                     if(cureentDate == startDate || cureentDate == endDate  ){
    //                           if(currentTime>=startTime && currentTime<=endedTime){
    //                         shifts = [] ;
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                           shiftNo :2,
    //                           currentShift : true ,
    //                           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                           shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                           });
    //                           count=0 ;
    //                    }else{
    //                         shifts.push({

    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                           shiftNo :2,
    //                           currentShift : false , 
    //                           EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                           shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                           });
    //                           count+=1 ;
    //                      }


    //                     }else{
    //                         shifts.push({

    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :2,
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID, 
    //                         currentShift : false ,
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }
    //                 }
    //               }
    //               if(count != 5){
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
    //                 if (getShifTName instanceof Error ||  getShifTName.rowsAffected<1 ) {
    //                     Evolve.Log.error("EERR2721 : Error while get shift name ")

    //                     let obj = {
    //                         statusCode: 400,
    //                         status: "fail",
    //                         message: "EERR2721 : Error while get shift name"   ,
    //                         result: null
    //                     };
    //                     res.send(obj)

    //                  }else{


    //                     let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z');
    //                     let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date+'T'+shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime+'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift1))
    //                     let startDate = shiftList.recordset[i].EvolveMachineCalendar_Date;
    //                     let endDate  = endDateTime.getUTCFullYear()+'-'+('0' + (endDateTime.getUTCMonth()+1)).slice(-2)+'-'+('0' + endDateTime.getUTCDate()).slice(-2);
    //                     let cureentDate = new Date().getUTCFullYear()+'-'+('0' + (new Date().getUTCMonth()+1)).slice(-2)+'-'+('0' + new Date().getUTCDate()).slice(-2)

    //                     let startTime  = shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime;
    //                     let endTime  =new Date(endDateTime)

    //                     let endedTime = ('0' + (endTime.getUTCHours())).slice(-2)+':'+('0' + (endTime.getUTCMinutes())).slice(-2)+':'+('0' + (endTime.getSeconds())).slice(-2);
    //                     // console
    //                     let currentTime =dateTime.slice(11 ,22) 

    //                     // let curTime  =new Date(dateTime)

    //                     //  let  currentTime= ('0' + (curTime.getUTCHours())).slice(-2)+':'+('0' + (curTime.getUTCMinutes())).slice(-2)+':'+('0' + (curTime.getSeconds())).slice(-2);

    //                     // console.log("currentTime>>> " ,  currentTime)

    //                     // console.log("dateTime>>>> 1111" ,  dateTime)
    //                     if(cureentDate == startDate || cureentDate == endDate  ){

    //                         //var currentD = new Date();
    //                         // let  ct  = new Date();
    //                         // let st  = new Date();
    //                         // let et  = new Date();
    //                         // ct.setHours(09,48,16); 
    //                         // st.setHours(07,00,00); 
    //                         // et.setHours(15,00,0); 

    //                         // var d = new Date();
    //                         // d.setHours(10,4,1);

    //                         // console.log("ct" , ct )
    //                         // console.log("st" , st )
    //                         // console.log("et" , et )


    //                         // if(ct >= st ){
    //                         //     console.log("yes 11111!");
    //                         // }
    //                         // if(ct <= et ){
    //                         //     console.log("yes 2222!");
    //                         // }
    //                         // if(ct == et ){
    //                         //     console.log("yes 3333!");
    //                         // }


    //                         /*
    //                         var startHappyHourD = new Date();
    //                         startHappyHourD.setHours(17,30,0); // 5.30 pm
    //                         var endHappyHourD = new Date();
    //                         endHappyHourD.setHours(18,30,0); // 6.30 pm


    //                         if(currentD >= startHappyHourD && currentD < endHappyHourD ){
    //                             console.log("yes!");
    //                         }else{
    //                             console.log("no, sorry! between 5.30pm and 6.30pm");
    //                         }

    //                         */
    //                         // console.log("enterd in  currentt  date shift  1 >> ")
    //                         // console.log("currentTime " ,  currentTime)

    //                         // console.log("startTime >> " ,  startTime)

    //                         // console.log("endedTime >> " ,  endedTime)

    //                         // console.log("currentTime>=startTime>>>>"  , currentTime>=startTime)
    //                         // console.log("currentTime<=endedTime>>>>"  , currentTime<=endedTime)




    //                         if((currentTime>=startTime) && (currentTime<=endedTime)){
    //                             // console.log('ebtered in  date time  between >>> ')
    //                             shifts = [] ;
    //                             shifts.push({

    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                                 date : shiftList.recordset[i].calendarDate,
    //                                 dateTime : {
    //                                     startDateTime : startDateTime,
    //                                     endDateTime : endDateTime,
    //                                 },
    //                             shiftNo :1,
    //                             currentShift : true , 
    //                             EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                             shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                             });
    //                             count=1 ;
    //                         }else{
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :1,
    //                         currentShift : false , 
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }
    //                 }else{
    //                         shifts.push({
    //                             startTime : startTime ,
    //                             endedTime : endedTime,
    //                             date : shiftList.recordset[i].calendarDate,
    //                             dateTime : {
    //                                 startDateTime : startDateTime,
    //                                 endDateTime : endDateTime,
    //                             },
    //                         shiftNo :1,
    //                         EvolveShift_ID :getShifTName.recordset[0].EvolveShift_ID,
    //                         currentShift : false , 
    //                         shiftName : getShifTName.recordset[0].EvolveShift_Name

    //                         });
    //                         count+=1 ;
    //                     }     
    //                  }
    //             }
    //             }

    //             // console.log("shifts>> ",  shifts)
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "SHIFT LIST", 
    //                 result: shifts};
    //             res.send(obj);

    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR2722: Error while get shift list "+error.message);
    //         let obj = {
    //             statusCode: 400,
    //             status: "fail",
    //             message: "EERR2722: Error while get shift list "   ,
    //             result: null
    //         };
    //         res.send(obj);
    //     }
    // },
    // getCurrentShiftQty: async function (req, res) {
    //     try {
    //          let qty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getCurrentShiftQty(req.body);
    //          console.log("qty>>>>" , qty);
    //         if (qty instanceof Error ) {
    //             Evolve.Log.error("Error while get shift Qty ")
    //               let obj = {
    //                 statusCode: 400,
    //                 status: "fail",
    //                 message: "  Error while get shift Qty "   ,
    //                 result: qty.message
    //             };
    //             res.send(obj);
    //         } else {
    //             let obj = {
    //                 statusCode: 200,
    //                 status: "success",
    //                 message: "shift qty",
    //                 result: qty.recordset[0]            };
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR1027: Error while get shift qty "+error.message);
    //     }
    // },
    getRtsReasonCodeList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getRtsReasonCodeList();
            if (list instanceof Error) {
                Evolve.Log.error("EERR2723 : Error while get reason code list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2723 : Error while get reason code list",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reason list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2724: Error while get reason code list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2724: Error while get reason code list ",
                result: null
            };
            res.send(obj);
        }
    },
    getSubReasonCodeList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getSubReasonCodeList(req.body);
            if (list instanceof Error) {
                Evolve.Log.error("EERR2725 : Error while get sub reason code list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2725 : Error while get sub reason code list",
                    result: list.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Reason list",
                    result: list.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2726 : Error while get sub reason code list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2726 : Error while get sub reason code list ",
                result: null
            };
            res.send(obj);
        }
    },
    getOperatorData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let userData = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getOperatorData(req.body);
            if (userData instanceof Error) {
                Evolve.Log.error("EERR2727 : Error while get operator data ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2727 : Error while get operator data",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Operator data",
                    result: userData.recordset[0]
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2728: Error while get operator data" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2728 : Error while get operator data ",
                result: null
            };
            res.send(obj);
        }
    },
    addTimeSheet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveTimesheet_StartDateTime = req.body.EvolveTimesheet_StartDateTime.slice(6, 10) + '-' + req.body.EvolveTimesheet_StartDateTime.slice(3, 5) + '-' + req.body.EvolveTimesheet_StartDateTime.slice(0, 2) + ' ' + req.body.EvolveTimesheet_StartDateTime.slice(11, 16) + ':00';
            req.body.EvolveTimesheet_StopDateTime = req.body.EvolveTimesheet_StopDateTime.slice(6, 10) + '-' + req.body.EvolveTimesheet_StopDateTime.slice(3, 5) + '-' + req.body.EvolveTimesheet_StopDateTime.slice(0, 2) + ' ' + req.body.EvolveTimesheet_StopDateTime.slice(11, 16) + ':00';
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addTimeSheet(req.body);
            if (addTs instanceof Error) {
                Evolve.Log.error("EERR2729 : Error while add timesheet ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2729 : Error while add timesheet",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet added successfully ",
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2730: Error while add timesheet" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2730 : Error while add timesheet ",
                result: null
            };
            res.send(obj);
        }
    },
    getTimesheetList: async function (req, res) {
        try {
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTimesheetList(req.body);

            if (addTs instanceof Error) {
                Evolve.Log.error("EERR2731: Error while get time sheets ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2731 : Error while get time sheets",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet getted successfully ",
                    result: addTs.recordset
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2732: Error while get time sheets " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2732: Error while get time sheets ",
                result: null
            };
            res.send(obj);
        }
    },

    getItemSecUomList: async function (req, res) {
        try {
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getWoItemSecUomList(req.body);
            if (addTs instanceof Error) {
                Evolve.Log.error("EERR2733 : Error while get item secondary uom list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2733 : Error while get item secondary uom list",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "secondary uoms ",
                    result: addTs.recordset
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2734: Error while get item secondary uom list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2734 : Error while get item secondary uom list ",
                result: null
            };
            res.send(obj);
        }
    },

    deleteTimeSheet: async function (req, res) {
        try {
            let error = false;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let deleteSheet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.deleteTimeSheet(req.body.deleteSheetId);
            if (deleteSheet instanceof Error || deleteSheet.rowsAffected < 1) {
                error = true;
            } else {

                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateSheetOnDelete(req.body.updateArray[i], req.body.EvolveUser_ID);
                        if (updateSheetOnDelete instanceof Error || updateSheetOnDelete.rowsAffected < 1) {
                            error = true;
                        }
                    }


                }
            }

            if (error == true) {
                Evolve.Log.error("EERR2735 : Error while delete timesheet ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2735 : Error while delete timesheet",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet deleted successfully ",
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2736: Error while delete timesheet " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2736 : Error while delete timesheet " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addSubTimeSheet: async function (req, res) {
        try {
            let error = false;
            req.body.tsData.EvolveUser_ID = req.EvolveUser_ID;
            req.body.tsData.EvolveTimesheet_StartDateTime = req.body.tsData.EvolveTimesheet_StartDateTime.slice(6, 10) + '-' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(3, 5) + '-' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(0, 2) + ' ' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(11, 16) + ':00';
            req.body.tsData.EvolveTimesheet_StopDateTime = req.body.tsData.EvolveTimesheet_StopDateTime.slice(6, 10) + '-' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(3, 5) + '-' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(0, 2) + ' ' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(11, 16) + ':00';
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addTimeSheet(req.body.tsData);


            if (addTs instanceof Error) {
                Evolve.Log.error("EERR2737  : Error while add timesheet ");
                error = true;

            } else {
                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        let updateSheetOnAdd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateSheetOnDelete(req.body.updateArray[i], req.EvolveUser_ID);
                        if (updateSheetOnAdd instanceof Error || updateSheetOnAdd.rowsAffected < 1) {
                            error = true;
                        }
                    }


                }

            }
            if (error == true) {
                Evolve.Log.error("EERR2738 : Error while add timesheet ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2738 : Error while add timesheet",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet added successfully ",
                    result: null
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2739: Error while add timesheet" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR2739: Error while add timesheet" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    completeJob: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let compJob = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.completeJob(req.body);
            if (compJob instanceof Error) {
                Evolve.Log.error("EERR2740 : Error while complete job")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2740 : Error while complete job",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Job completed successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2741: Error while complete job " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2741: Error while complete job ",
                result: null
            };
            res.send(obj);
        }
    },
    addEditedTimeSheet: async function (req, res) {
        try {
            let error = false;
            req.body.tsData.EvolveTimesheet_StartDateTime = req.body.tsData.EvolveTimesheet_StartDateTime.slice(6, 10) + '-' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(3, 5) + '-' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(0, 2) + ' ' + req.body.tsData.EvolveTimesheet_StartDateTime.slice(11, 16) + ':00';
            req.body.tsData.EvolveTimesheet_StopDateTime = req.body.tsData.EvolveTimesheet_StopDateTime.slice(6, 10) + '-' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(3, 5) + '-' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(0, 2) + ' ' + req.body.tsData.EvolveTimesheet_StopDateTime.slice(11, 16) + ':00';
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.addEditedTimeSheet(req.body.tsData, req.EvolveUser_ID);
            if (addTs instanceof Error || addTs.rowsAffected < 1) {

                error = true;
            } else {
                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        req.body.updateArray[i].EvolveTimesheet_StartDateTime = req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(6, 10) + '-' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(3, 5) + '-' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(0, 2) + ' ' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(11, 16) + ':00';
                        req.body.updateArray[i].EvolveTimesheet_StopDateTime = req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(6, 10) + '-' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(3, 5) + '-' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(0, 2) + ' ' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(11, 16) + ':00';

                        let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateSheetOnDelete(req.body.updateArray[i], req.EvolveUser_ID);
                        if (updateSheetOnDelete instanceof Error || updateSheetOnDelete.rowsAffected < 1) {
                            error = true;
                        }
                    }


                }

            }
            if (error == true) {
                Evolve.Log.error("EERR2742 : Error while update timesheet ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2742 : Error while update timesheet",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Timesheet updated successfully ",
                    result: null
                };
                res.send(obj);


            }
        } catch (error) {
            Evolve.Log.error(" EERR2743: Error while update timesheet " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2743: Error while update timesheet " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getMachineSheduleComments: async function (req, res) {
        try {
            let comments = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getMachineSheduleComments(req.body);
            if (comments instanceof Error) {
                Evolve.Log.error("EERR2744 : Error while get publish comments ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2744 : Error while get publish comments ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "publish comments",
                    result: comments.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2745: Error while get publish comments " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2745: Error while get publish comments ",
                result: null
            };
            res.send(obj);
        }
    },
    getTsShiftList: async function (req, res) {
        try {
            console.log("req.body  getTsShiftList", req.body);
            let shiftList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTsShiftList(req.body);
            let shifts = [];
            let count = 0;
            console.log("shiftList", shiftList);
            if (shiftList instanceof Error) {
                Evolve.Log.error("EERR2718 : Error while get shift list ")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2718 : Error while get shift list",
                    result: null
                };
                res.send(obj);
            } else {
                for (let i = 0; i < shiftList.recordset.length; i++) {
                    if (count != 5) {
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);
                        if (getShifTName instanceof Error || getShifTName.rowsAffected < 1) {
                            Evolve.Log.error("EERR2719 : Error while get shift name ")
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2719 : Error while get shift name",
                                result: null
                            };
                            res.send(obj)
                        } else {
                            let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime + 'Z');
                            let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime + 'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift3))
                            let currentTime = new Date();
                            currentTime = new Date(currentTime.getTime() + parseFloat(330) * 60000);
                            console.log("Evening::::::::::::::::::::::::::::::::::::");
                            console.log("currentTime", currentTime);
                            console.log("endDateTime", endDateTime);
                            console.log("startDateTime", startDateTime);
                            let startTime = shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime;
                            let endTime = new Date(endDateTime)
                            let endedTime = ('0' + (endTime.getUTCHours())).slice(-2) + ':' + ('0' + (endTime.getUTCMinutes())).slice(-2) + ':' + ('0' + (endTime.getSeconds())).slice(-2);

                            if (currentTime >= startDateTime && currentTime <= endDateTime) {
                                shifts = [];
                                shifts.push({
                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 3,
                                    currentShift: true,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count = 0;

                            } else {
                                shifts.push({

                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 3,
                                    currentShift: false,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count += 1;

                            }
                        }
                    }
                    if (count != 5) {
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
                        if (getShifTName instanceof Error || getShifTName.rowsAffected < 1) {
                            Evolve.Log.error("EERR2720 : Error while get shift name ")

                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2720 : Error while get shift name",
                                result: null
                            };
                            res.send(obj)

                        } else {
                            let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime + 'Z');
                            let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime + 'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift2))
                            let currentTime = new Date();
                            currentTime = new Date(currentTime.getTime() + parseFloat(330) * 60000);
                            console.log("Afternoon::::::::::::::::::::::::::::::::::::");
                            console.log("currentTime", currentTime);
                            console.log("endDateTime", endDateTime);
                            console.log("startDateTime", startDateTime);
                            let startTime = shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime;
                            let endTime = new Date(endDateTime)
                            let endedTime = ('0' + (endTime.getUTCHours())).slice(-2) + ':' + ('0' + (endTime.getUTCMinutes())).slice(-2) + ':' + ('0' + (endTime.getSeconds())).slice(-2);



                            if (currentTime >= startDateTime && currentTime <= endDateTime) {
                                console.log("Enter in Match Condition:::::::::::::::::::::::");
                                shifts = [];
                                shifts.push({
                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 2,
                                    currentShift: true,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count = 0;

                            } else {
                                shifts.push({

                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 2,
                                    currentShift: false,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count += 1;

                            }
                        }
                    }
                    if (count != 5) {
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
                        if (getShifTName instanceof Error || getShifTName.rowsAffected < 1) {
                            Evolve.Log.error("EERR2721 : Error while get shift name ")

                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "EERR2721 : Error while get shift name",
                                result: null
                            };
                            res.send(obj)

                        } else {
                            let startDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime + 'Z');
                            let endDateTime = new Date(shiftList.recordset[i].EvolveMachineCalendar_Date + 'T' + shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime + 'Z').addHours(parseFloat(shiftList.recordset[i].EvolveMachineCalendar_Shift1))
                            let currentTime = new Date();
                            currentTime = new Date(currentTime.getTime() + parseFloat(330) * 60000);
                            console.log("Morning::::::::::::::::::::::::::::::::::::");
                            console.log("currentTime", currentTime);
                            console.log("endDateTime", endDateTime);
                            console.log("startDateTime", startDateTime);
                            let startTime = shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime;
                            let endTime = new Date(endDateTime)
                            let endedTime = ('0' + (endTime.getUTCHours())).slice(-2) + ':' + ('0' + (endTime.getUTCMinutes())).slice(-2) + ':' + ('0' + (endTime.getSeconds())).slice(-2);

                            console.log("currentTime >= startDateTime", currentTime >= startDateTime);
                            console.log("currentTime >= startDateTime", currentTime <= endDateTime);

                            if (currentTime >= startDateTime && currentTime <= endDateTime) {
                                console.log("MAtchd In Success::::::::::::::::::::");
                                shifts = [];
                                shifts.push({
                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 1,
                                    currentShift: true,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count = 0;

                            } else {
                                shifts.push({

                                    startTime: startTime,
                                    endedTime: endedTime,
                                    date: shiftList.recordset[i].calendarDate,
                                    dateTime: {
                                        startDateTime: startDateTime,
                                        endDateTime: endDateTime,
                                    },
                                    shiftNo: 1,
                                    currentShift: false,
                                    EvolveShift_ID: getShifTName.recordset[0].EvolveShift_ID,
                                    shiftName: getShifTName.recordset[0].EvolveShift_Name

                                });
                                count += 1;

                            }
                        }
                    }
                }
                console.log("shifts", shifts);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "SHIFT LIST",
                    result: shifts
                };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR2722: Error while get shift list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2722: Error while get shift list ",
                result: null
            };
            res.send(obj);
        }
    },
    getPlcDevice: async function (req, res) {
        try {
            let getPlcDevice = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getPlcDevice(req.body.EvolveMachine_ID);
            console.log();
            if (getPlcDevice instanceof Error || getPlcDevice.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get Plc Device ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "PLC Devices List! ",
                    result: getPlcDevice.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Plc Device " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get Plc Device ",
                result: null
            };
            res.send(obj);
        }
    },

    checkInventory: async function (req, res) {
        try {
            let errorMessage = '';
            let checkInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.checkInventoryPallet(req.body);


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

    updateIssuedQty: async function (req, res) {
        try {
            let errorMessage = '';
            req.body.EvolveUser_ID = req.body.EvolveUser_ID == undefined ? null : req.body.EvolveUser_ID;
            if (req.body.EvolveInventory_SerialNo == undefined || req.body.EvolveInventory_SerialNo == '' || req.body.EvolveInventory_SerialNo == null) {

                console.log("ENTERED IN IFFFFFF")
                let qtyToIssued = req.body.qty;
                let invToIssued = [];

                let invList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getInvList(req.body);

                if (invList instanceof Error) {

                    errorMessage = "ERROR WHILE CONSUME INVENTORY"
                } else if (invList.rowsAffected < 1) {
                    errorMessage = "NO AVAIALBE INVENTORY FOUND"


                } else {

                    for (let i = 0; i < invList.recordset.length; i++) {

                        if (qtyToIssued != 0) {
                            if (qtyToIssued <= invList.recordset[i].EvolveInventory_QtyAvailable) {
                                invToIssued.push(invList.recordset[i]);
                                invToIssued[invToIssued.length - 1].qty = qtyToIssued;
                                qtyToIssued = 0;

                            } else {
                                invToIssued.push(invList.recordset[i]);
                                invToIssued[invToIssued.length - 1].qty = invList.recordset[i].EvolveInventory_QtyAvailable;
                                qtyToIssued = qtyToIssued - invList.recordset[i].EvolveInventory_QtyAvailable;
                            }
                        } else {
                            break;
                        }
                    }

                    if (qtyToIssued != 0) {
                        errorMessage = 'Enough Inventory Not Available'
                    }
                }

                if (errorMessage == '') {

                    for (let i = 0; i < invToIssued.length; i++) {

                        ttMultWOComponents.push({


                            "site": req.body.EvolveUnit_Code,
                            "effDate": currentDate,
                            "orderNumber": req.body.EvolveProdOrders_OrderNo,
                            "woLot": req.body.EvolveProdOrders_OrderID,
                            "part": req.body.parentPart,
                            "prodLine": {},
                            "shift": {},
                            "workCenter": {},
                            "operation": "10",

                            "machine": {},
                            "routing": req.body.parentPart,
                            "bomCode": {},
                            "operation": "",
                            "compPart": req.body.EvolveItem_Part,
                            "location": invToIssued[i].EvolveLocation_Code,
                            "lot": invToIssued[i].EvolveInventory_LotSerialNo,
                            "ref": invToIssued[i].EvolveInventory_SerialNo,
                            "qty": invToIssued[i].qty



                        })
             
                    }
                }


              

                if (errorMessage == '') {


                    let date = new Date()

                    let month = (date.getMonth() + 1).toString();

                    month = month.length < 2 ? '0' + `${month + ''}` : month;

                    let currentDate = date.getFullYear() + '-' + (month) + '-' + date.getDate();
                    let comPissueObj = {
                        "soapenv:Envelope": {
                            "@xmlns": "urn:schemas-qad-com:xml-services",
                            "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                            "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                            "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                            "soapenv:Header": {
                                "wsa:Action": "",
                                "wsa:To": "urn:services-qad-com:QADERP",
                                "wsa:MessageID": "urn:services-qad-com::QADERP",
                                "wsa:ReferenceParameters": { "qcom:suppressResponseDetail": "true" },
                                "wsa:ReplyTo": { "wsa:Address": "urn:services-qad-com:" }
                            },
                            "soapenv:Body": {
                                "recordIssueComponentForOrders": {
                                    "qcom:dsSessionContext": {
                                        "qcom:ttContext": [
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "domain",
                                                "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "scopeTransaction",
                                                "qcom:propertyValue": "true"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "version",
                                                "qcom:propertyValue": "ERP3_1"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "mnemonicsRaw",
                                                "qcom:propertyValue": "false"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "username",
                                                "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "password",
                                                "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "action",
                                                "qcom:propertyValue": "Save"
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "entity",
                                                "qcom:propertyValue": 'CFD01'
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "email",
                                                "qcom:propertyValue": ""
                                            },
                                            {
                                                "qcom:propertyQualifier": "QAD",
                                                "qcom:propertyName": "emailLevel",
                                                "qcom:propertyValue": ""
                                            }
                                        ]
                                    },
                                    "dsMultWOIssue": {
                                        "ttMultWOIssue": {
                                            "site": req.body.EvolveUnit_Code,
                                            "effDate": currentDate,
                                            "orderNumber": req.body.EvolveProdOrders_OrderNo,
                                            "woLot": req.body.EvolveProdOrders_OrderID,
                                            "part": req.body.parentPart,
                                            "prodLine": {},
                                            "shift": {},
                                            "workCenter": {},
                                            "machine": {},
                                            "routing": req.body.parentPart,
                                            "bomCode": {},
                                            "qtyToIssue": "None",
                                            "operation": "10",
                                            ttMultWOComponents
                                        }
                                    }
                                }
                            }
                        }
                    }
                    let parseObj = Evolve.Xmlbuilder.create(comPissueObj, { version: '1.0', encoding: 'utf-8' })
                    let comIssueXml = parseObj.end({ pretty: true });


                    let config = {
                        headers: {
                            'Accept-Encoding': 'gzip, deflate',
                            'Content-Type': 'text/xml;charset=UTF-8',
                            'SOAPAction': "",
                            'Host': Evolve.Config.QXTENHOST,
                            'Connection': 'Keep - Alive',
                            'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                            //'Content-Length': pendingInvXmldoc.length 
                        }
                    }

                    console.log('JSON STRINGIFY>>', (comIssueXml))
                    let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config);
                    await Evolve.Xml2JS.parseString(comIssueResponse.data, async function (err, resPonsedXml) {
                        try {
                            if (err) {
                                // error = true;
                                errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING FILE TO ERP';

                    

                            }
                            else {
                                console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
                                let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns1:result'][0];
                                console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult", result)
                                if (result == 'error') {
                                    // error = true;
                                    // errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);


                                    errorMessage =  resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]
                                } else {


                                }
                            }
                        } catch (error) {

                            errorMessage = " EERR2713: Error while Component Issue " + error.message;

                        }
                    });
                }

                if (errorMessage == '') {

                    for (let i = 0; i < invToIssued.length; i++) {
                        let updateInv = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateInventory(invToIssued[i]);
                        if (updateInv instanceof Error || updateInv.rowsAffected < 1) {
                            errorMessage = 'Error While Update Inventory Status'
                        } else {
                            let transDetails = {
                                EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
                                EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
                                EvolveItem_Part: req.body.EvolveItem_Part,
                                EvolveLocation_Code: '',
                                EvolveTransHistory_Qty: invToIssued[i].qty,
                                EvolveInventory_SerialNo: invToIssued[i].EvolveInventory_SerialNo,
                                EvolveTransHistory_Type: 'MATERIALISSUED',
                                EvolveTransHistory_BatchNo: invToIssued[i].EvolveInventory_BatchNo,
                                EvolveTransHistory_LotSerialNo: invToIssued[i].EvolveInventory_LotSerialNo,

                            }
                            console.log('transDetails???', transDetails)
                            await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);
                        }
                    }
                }

                if (errorMessage == '') {

                    let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateIssuedQty(req.body);
                    if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
                        errorMessage = 'Error while UpDate IssuedQty'
                    }

                }

            } else {



                let date = new Date()

                let month = (date.getMonth() + 1).toString();

                month = month.length < 2 ? '0' + `${month + ''}` : month;

                let currentDate = date.getFullYear() + '-' + (month) + '-' + date.getDate();
                let comPissueObj = {
                    "soapenv:Envelope": {
                        "@xmlns": "urn:schemas-qad-com:xml-services",
                        "@xmlns:qcom": "urn:schemas-qad-com:xml-services:common",
                        "@xmlns:soapenv": "http://schemas.xmlsoap.org/soap/envelope/",
                        "@xmlns:wsa": "http://www.w3.org/2005/08/addressing",
                        "soapenv:Header": {
                            "wsa:Action": "",
                            "wsa:To": "urn:services-qad-com:QADERP",
                            "wsa:MessageID": "urn:services-qad-com::QADERP",
                            "wsa:ReferenceParameters": { "qcom:suppressResponseDetail": "true" },
                            "wsa:ReplyTo": { "wsa:Address": "urn:services-qad-com:" }
                        },
                        "soapenv:Body": {
                            "recordIssueComponentForOrders": {
                                "qcom:dsSessionContext": {
                                    "qcom:ttContext": [
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "domain",
                                            "qcom:propertyValue": Evolve.Config.QXTENDDOMAIN
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "scopeTransaction",
                                            "qcom:propertyValue": "true"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "version",
                                            "qcom:propertyValue": "ERP3_1"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "mnemonicsRaw",
                                            "qcom:propertyValue": "false"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "username",
                                            "qcom:propertyValue": Evolve.Config.QXTENDUSERNAME
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "password",
                                            "qcom:propertyValue": Evolve.Config.QXTENDPASSWORD == "QXTENDPASSWORD" ? "" : Evolve.Config.QXTENDPASSWORD
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "action",
                                            "qcom:propertyValue": "Save"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "entity",
                                            "qcom:propertyValue": 'CFD01'
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "email",
                                            "qcom:propertyValue": ""
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "emailLevel",
                                            "qcom:propertyValue": ""
                                        }
                                    ]
                                },
                                "dsMultWOIssue": {
                                    "ttMultWOIssue": {
                                        "site": req.body.EvolveUnit_Code,
                                        "effDate": currentDate,
                                        "orderNumber": req.body.EvolveProdOrders_OrderNo,
                                        "woLot": req.body.EvolveProdOrders_OrderID,
                                        "part": req.body.parentPart,
                                        "prodLine": {},
                                        "shift": {},
                                        "workCenter": {},
                                        "machine": {},
                                        "routing": req.body.parentPart,
                                        "bomCode": {},
                                        "qtyToIssue": "None",
                                        "operation": "10",
                                        "ttMultWOComponents": {
                                            "site": req.body.EvolveUnit_Code,
                                            "effDate": currentDate,
                                            "orderNumber": req.body.EvolveProdOrders_OrderNo,
                                            "woLot": req.body.EvolveProdOrders_OrderID,
                                            "part": req.body.parentPart,
                                            "prodLine": {},
                                            "operation": "10",
                                            "shift": {},
                                            "workCenter": {},
                                            "machine": {},
                                            "routing": req.body.parentPart,
                                            "bomCode": {},
                                            "operation": "",
                                            "compPart": req.body.EvolveItem_Part,
                                            "location": req.body.invDetails.EvolveLocation_Code,
                                            "lot": req.body.invDetails.EvolveInventory_LotSerialNo,
                                            "ref": req.body.invDetails.EvolveInventory_SerialNo,
                                            "qty": req.body.qty
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                let parseObj = Evolve.Xmlbuilder.create(comPissueObj, { version: '1.0', encoding: 'utf-8' })
                let comIssueXml = parseObj.end({ pretty: true });


                let config = {
                    headers: {
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': "",
                        'Host': Evolve.Config.QXTENHOST,
                        'Connection': 'Keep - Alive',
                        'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                        //'Content-Length': pendingInvXmldoc.length 
                    }
                }

                console.log('JSON STRINGIFY>>', (comIssueXml))
                let comIssueResponse = await Evolve.Axios.post(Evolve.Config.QXTENDURL, comIssueXml, config);
                await Evolve.Xml2JS.parseString(comIssueResponse.data, async function (err, resPonsedXml) {
                    try {
                        if (err) {
                            // error = true;
                            errorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING FILE TO ERP';

                        }
                        else {
                            console.log("RESPONSE XML????", JSON.stringify(resPonsedXml))
                            let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns1:result'][0];
                            console.log("resultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresultresult", result)
                            if (result == 'error') {
                                // error = true;
                                // errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);

                                errorMessage =  resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:recordIssueComponentForOrdersResponse'][0]['ns3:dsExceptions'][0]['ns3:temp_err_msg'][0]['ns3:tt_msg_desc'][0]
                            } else {


                            }
                        }
                    } catch (error) {

                        errorMessage = " EERR2713: Error while Component Issue " + error.message;

                    }
                });

                if (errorMessage == '') {

                let updateInv = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateInventory(req.body);
                if (updateInv instanceof Error || updateInv.rowsAffected < 1) {
                    errorMessage = 'Error While Update Inventory Status'
                } else {


                    let transDetails = {

                        EvolveProdOrders_OrderNo: req.body.EvolveProdOrders_OrderNo,
                        EvolveProdOrders_OrderID: req.body.EvolveProdOrders_OrderID,
                        EvolveItem_Part: req.body.EvolveItem_Part,
                        EvolveLocation_Code: '',
                        EvolveTransHistory_Qty: req.body.qty,
                        EvolveInventory_SerialNo: req.body.EvolveInventory_SerialNo,
                        EvolveTransHistory_Type: 'MATERIALISSUED',
                        EvolveTransHistory_BatchNo: req.body.invDetails.EvolveInventory_BatchNo,
                        EvolveTransHistory_LotSerialNo: req.body.invDetails.EvolveInventory_LotSerialNo,

                    }
                    console.log("transDetails?? ", transDetails)
                    await Evolve.App.Services.Common.SrvCommon.addTransHistory(transDetails);
                    let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.updateIssuedQty(req.body);
                    if (updateIssuedQty instanceof Error || updateIssuedQty.rowsAffected < 1) {
                        errorMessage = 'Error while UpDate IssuedQty'
                    }

                }
            }

            }

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Material Consumed Successfully' : errorMessage, result: null };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Consume Ineventory" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while Consume Ineventory",
                result: null
            };
            res.send(obj);
        }
    },


    getTransHistory: async function (req, res) {
        try {

            console.log("TRANSACTION  HISTORY>>>>>>>> ,  ", req.body)
            req.body.EvolveTransHistory_Type = 'MATERIALISSUED';
            let getTransHistory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV3.getTransHistory(req.body);
            if (getTransHistory instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR####: Error while get BOM Datils ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Issued Material ",
                    result: getTransHistory.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get BOM Datils " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR####: Error while get BOM Datils ",
                result: null
            };
            res.send(obj);
        }
    },








}