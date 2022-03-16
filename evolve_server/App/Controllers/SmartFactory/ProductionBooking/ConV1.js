'use strict';
const Evolve = require("../../../../Boot/Evolve");
const { changePalletStatus } = require("../../../Services/SmartFactory/PickList/SrvWoPickList");
module.exports = {
    getSectionList: async function (req, res) {
        try {
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getSectionList();
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
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getMachineList(req.body);
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
                console.log("list.recordset?????///", list.recordset);
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
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoList(req.body);
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
            console.log("req.body", req.body);
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let woDetails = {}
            let details = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoDetails(req.body);
            if (details instanceof Error) {
                error = true;

            } else if (details.rowsAffected == 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Work order details not found ",
                    result: null
                };
                res.send(obj);

            } else if (details.recordset[0].EvolveLocation_ID == '' || details.recordset[0].EvolveLocation_ID == null || details.recordset[0].EvolveLocation_ID == undefined) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Machine Location not found  ",
                    result: null
                };
                res.send(obj);
            } else {
                woDetails.basicDetail = details.recordset[0];
                let materialToIssue = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getMaterialToIssue(req.body);
                if (materialToIssue instanceof Error) {
                    error = true;
                } else {
                    for (let i = 0; i < materialToIssue.recordset.length; i++) {
                        if (error == false) {
                            if (materialToIssue.recordset[i].qtyHand == null) {
                                materialToIssue.recordset[i].qtyHand = 0;
                            }
                            let subItems = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                            if (subItems instanceof Error) {
                                error = true;
                            }
                            else {
                                for (let j = 0; j < subItems.recordset.length; j++) {
                                    if (error == false) {
                                        let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID, req.body.EvolveWoSchedule_ID)
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
                    woDetails.materialToIssue = materialToIssue.recordset
                    if (error == false) {
                        let issuedPallets = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getissuedPallets(req.body);
                        if (issuedPallets instanceof Error) {
                            error = true;
                        } else {
                            woDetails.issuedPallets = issuedPallets.recordset
                        }
                    }
                }
                if (error == false) {

                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "WO details",
                        result: woDetails
                    };
                    res.send(obj);
                } else {
                    Evolve.Log.error(" EERR2686: Error while get WO details  ");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2686 :Error while get WO details",
                        result: woDetails
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2687: Error while get WO details  " + error.message);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "EERR2687 : Error while get WO details",
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
            let details = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getMachinePlanDetails(req.body);
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

                //    let upcomingPlans = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getUpcomingPlansDetails(req.body);
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
            let materialToIssue = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getMaterialToIssue(req.body);
            if (materialToIssue instanceof Error) {
                error = true;
            } else {
                for (let i = 0; i < materialToIssue.recordset.length; i++) {
                    if (error == false) {
                        if (materialToIssue.recordset[i].qtyHand == null) {
                            materialToIssue.recordset[i].qtyHand = 0;
                        }
                        let subItems = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                        if (subItems instanceof Error) {
                            error = true;
                        } else {
                            for (let j = 0; j < subItems.recordset.length; j++) {
                                if (error == false) {
                                    let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID, req.body.EvolveWoSchedule_ID)
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
                let inComPlans = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getInComingPLans(req.body);
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
            let addComments = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addProdComments(req.body);
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
    checkPallet: async function (req, res) {
        try {
            let check = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.checkPallet(req.body);
            if (check instanceof Error) {
                Evolve.Log.error("EERR2694 : Error while check pallet")
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR2694 : Error while check pallet ",
                    result: check.message
                };
                res.send(obj);
            } else if (check.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Cannot issue " + req.body.EvolveInventory_RefNumber + " to this job. Incorrect material.",
                    result: check.message
                };
                res.send(obj)
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Valid pallet",
                    result: check.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2695: Error while check pallet " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2695: Error while check pallet ",
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
            let woNumber = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoNumber(req.body.EvolveWoSchedule_ID);
            if (woNumber instanceof Error) {
                Evolve.Log.error("EERR3088 : Error while get wo number ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3088: Error while get wo number ", result: null };
                res.send(obj);
            } else {
                req.body.EvolveWoSchedule_OrderID = woNumber.recordset[0].EvolveWoSchedule_OrderID;
                let changePalletStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.changeInvPalletStatus(req.body);
                if (changePalletStatus instanceof Error || changePalletStatus.rowsAffected < 1) {
                    error = true;
                } else {
                    let addIssuedPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addIssuedPallet(req.body);
                    if (addIssuedPallet instanceof Error || addIssuedPallet.rowsAffected < 1) {
                        error = true;
                    } else {
                        let updateProdOrd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateProdOrderBom(req.body);
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
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getRtsLocationList(req.body);
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
            let locStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                Evolve.Log.error("EERR3086  : Error while get location status ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3086 : Error while get location status ", result: null };
                res.send(obj);
            } else {
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let updateIssuedQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateIssuedQty(req.body);
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
                    let updateProdOrder = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateProdOrderIssueQty(req.body);
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
                        let updateInventoryPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateInventoryPallet(req.body);
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
                            let changePalletRtsStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.changePalletRtsStatus(req.body);

                            //  let newPalletId =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get pallet barcode  
                            //     if (newPalletId == 0  ) {
                            //         Evolve.Log.error(" Error while create new pallet ")
                            //           let obj = { statusCode: 400, status: "fail", message: " Error while create new pallet ", result: null };
                            //          res.send(obj);
                            //    }
                            //    else {
                            //         let newPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.createNewPallet(newPalletId , req.body);
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
            let uomList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoItemSecUomList(req.body);
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
                let bookedList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoBookedList(req.body.EvolveWoSchedule_ID);
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
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let locStatus = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                Evolve.Log.error("EERR3087 : Error while get location status ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3087 : Error while get location status ", result: null };
                res.send(obj);
            } else {
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let error = false;
                let getTransTypeID = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getTransTypeID('WO-RCPT');
                if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                    error = true;
                }
                else {
                    req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID
                    let palletNumber = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
                    if (palletNumber == 0) {
                        error = true;
                    } else {
                        req.body.palletNumber = palletNumber;
                        let addInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addInventory(req.body);
                        if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                            error = true;
                        } else {
                            req.body.EvolveInventory_ID = addInventory.recordset[0].inserted_id;
                            let addProdOrderDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addProdOrderDetails(req.body);
                            if (addProdOrderDetails instanceof Error || addProdOrderDetails.rowsAffected < 1) {
                                error = true;
                            } else {
                                let updateWoQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateWoCompletedQty(req.body);
                                if (updateWoQty instanceof Error || updateWoQty.rowsAffected < 1) {
                                    error = true;
                                }
                            }
                        }
                    }
                }
                if (error == true) {
                    Evolve.Log.error("EERR2708 : Error while complete booking")
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2708 : Error while complete booking",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "BOOKING COMPLETED",
                        result: null
                    };
                    res.send(obj);
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR2709 : Error while complete booking " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2709 : Error while complete booking ",
                result: null
            };
            res.send(obj);
        }
    },
    deleteBookedPallet: async function (req, res) {
        try {
            let error = false;
            let updateQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateWoOrderQty(req.body, 'DELETEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected < 1) {
                error = true;
            } else {
                let deletePallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.deleteProdOrderPallet(req.body.EvolveProdOrdersDetail_ID);
                if (deletePallet instanceof Error || deletePallet.rowsAffected < 1) {
                    error = true;
                } else {
                    let deleteInventory = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.deleteInventory(req.body.EvolveInventory_ID);
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
    confirmBooking: async function (req, res) {
        try {
            let error = false;
            let errorMessage = "";
            let woDetails = [];

            for (let i = 0; i < req.body.palletsToConfirm.length; i++) {
                let getWorkorderDetailsForQextend = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWorkorderDetailsForQextend(req.body.palletsToConfirm[0].EvolveInventory_ID)
                if (getWorkorderDetailsForQextend instanceof Error || getWorkorderDetailsForQextend.rowsAffected < 1) {
                    error = true;
                    errorMessage = "Error While Get Work Order Details For Qextend!!!!!"
                } else {
                    woDetails.push(getWorkorderDetailsForQextend.recordset[0])
                }
            }

            if (error == false) {
                let receiptDetail = [];
                for (let i = 0; i < woDetails.length; i++) {
                    receiptDetail.push({
                        "woNbr": woDetails[i].EvolveProdOrders_OrderId,
                        "woLot": woDetails[i].EvolveProdOrders_Lot,
                        "site": woDetails[i].EvolveProdOrders_Site,
                        "location": woDetails[i].EvolveLocation_Code,
                        "lotserial": woDetails[i].EvolveProdOrdersDetail_LotNumber,
                        "lotref": woDetails[i].EvolveProdOrdersDetail_RefNumber,
                        "lotserialQty": woDetails[i].EvolveProdOrdersDetail_Qty
                    });
                }

                let WorkOrderInfo = {
                    "woNbr": woDetails[0].EvolveProdOrders_OrderId,
                    "woLot": woDetails[0].EvolveProdOrders_Lot,
                    "um": woDetails[0].EvolveUom_Uom,
                    "conv": "1",
                    "site": woDetails[0].EvolveProdOrders_Site,
                    "multiEntry": true,
                    receiptDetail
                };
                let WorkOrderTail = {
                    "woNbr": woDetails[0].EvolveProdOrders_OrderId,
                    "woLot": woDetails[0].EvolveProdOrders_Lot,
                    WorkOrderInfo
                };

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
                            "receiveWorkOrder": {
                                "qcom:dsSessionContext": {
                                    "qcom:ttContext": [
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "domain",
                                            "qcom:propertyValue": Evolve.EvolveIOConfig.DOAQXTENDDOAMIN
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "scopeTransaction",
                                            "qcom:propertyValue": "false"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "version",
                                            "qcom:propertyValue": "ERP3_2"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "mnemonicsRaw",
                                            "qcom:propertyValue": "false"
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "username",
                                            "qcom:propertyValue": Evolve.EvolveIOConfig.QADUSERNAME
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "password",
                                            "qcom:propertyValue": ""
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "action",
                                            "qcom:propertyValue": ""
                                        },
                                        {
                                            "qcom:propertyQualifier": "QAD",
                                            "qcom:propertyName": "entity",
                                            "qcom:propertyValue": Evolve.EvolveIOConfig.QADENTITY
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
                                "dsWorkOrderReceipt": {
                                    "workOrderReceipt": {
                                        "woNbr": woDetails[0].EvolveProdOrders_OrderId,
                                        "woLot": woDetails[0].EvolveProdOrders_Lot,
                                        "effDate": woDetails[0].dateCreated,
                                        WorkOrderTail
                                    }
                                }
                            }
                        }
                    }
                }

                var pendingInvXmldoc = Evolve.Xmlbuilder.create(pendingInvXmlObj, { version: '1.0', encoding: 'utf-8' })
                let pendingInvXmlFileData = pendingInvXmldoc.end({ pretty: true });

                // console.log("pendingInvXmlFileData???", pendingInvXmlFileData)

                console.log("pendingInvXmlFileData??? , pendingInvXmlFileData", pendingInvXmlFileData)
                let pendingInvConfig = {
                    headers: {
                        'Accept-Encoding': 'gzip, deflate',
                        'Content-Type': 'text/xml;charset=UTF-8',
                        'SOAPAction': "",
                        'Host': Evolve.EvolveIOConfig.DOAHOST,
                        'Connection': 'Keep - Alive',
                        'User-Agent': 'Apache - HttpClient / 4.1.1(java 1.5)'
                        //'Content-Length': pendingInvXmldoc.length 
                    }
                }
                console.log("pendingInvConfig",pendingInvConfig);
                console.log("Evolve.EvolveIOConfig.DOAQXTENDURL",Evolve.EvolveIOConfig.DOAQXTENDURL);
                let pendingInvResponce = await Evolve.Axios.post(Evolve.EvolveIOConfig.DOAQXTENDURL, pendingInvXmlFileData, pendingInvConfig);
                Evolve.Xml2JS.parseString(pendingInvResponce.data, async function (err, resPonsedXml) {
                    try {
                        if (err) {

                            error = true;
                            data.EvolveSalesOrder_ErrorMessage = 'ERROR IN QXTEND SERVICE WHILE SENDING PENDING INVOICE  DATA';

                        }
                        else {
                            console.log(JSON.stringify(resPonsedXml));
                            let result = resPonsedXml['soapenv:Envelope']['soapenv:Body'][0]['ns1:receiveWorkOrderResponse'][0]['ns1:result'][0];
                            if (result == 'error') {
                                error = true;
                                errorMessage = 'ERROR IN QXTEND WHILE SENDING Booked Pallet DATA ' + JSON.stringify(resPonsedXml);
                            } else {
                                for (let i = 0; i < req.body.palletsToConfirm.length; i++) {
                                    if (error == false) {
                                        let confirmBookedPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.confirmBookedPallet(req.body.palletsToConfirm[i], req.EvolveUser_ID);
                                        if (confirmBookedPallet instanceof Error) {
                                            error = true;
                                            errorMessage = "Error While Update Booked Pallet As ERPPosted!!!"
                                        }
                                    }
                                }

                            }
                            if (error == true) {
                                Evolve.Log.error("EERR2712 : Error while confirm booking  ")
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "EERR2712 : Error while confirm booking  ",
                                    result: null
                                };
                                res.send(obj);
                            } else {
                                console.log("Responce Fired:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::");
                                let obj = {
                                    statusCode: 200,
                                    status: "success",
                                    message: "BOOKING CONFIRMED",
                                    result: null
                                };
                                res.send(obj);
                            }
                        }
                    } catch (error) {
                        Evolve.Log.error(" EERR2713: Error while confirm booking  " + error.message);
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "EERR2713 : Error while confirm booking",
                            result: null
                        };
                        res.send(obj);
                    }

                });
            }


        } catch (error) {
            Evolve.Log.error(" EERR2713: Error while confirm booking  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2713 : Error while confirm booking",
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
            let updateQty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateWoOrderQty(req.body, 'UPDATEPALLET');
            if (updateQty instanceof Error || updateQty.rowsAffected < 1) {
                error = true;
            }
            else {
                let uodateDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updatePbPalletDetails(req.body);
                if (uodateDetails instanceof Error || uodateDetails.rowsAffected < 1) {
                    error = true;
                } else {
                    let updateInvPbPallet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateInvPbPallet(req.body);
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
            let uomList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoItemSecUomList(req.body);
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
    // getTsShiftList: async function (req, res) {
    //     try {
    //        let shiftList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getTsShiftList(req.body);
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
    //                     let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);

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
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
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
    //                 let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
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
    //          let qty = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getCurrentShiftQty(req.body);
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
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getRtsReasonCodeList();
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
            let list = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getSubReasonCodeList(req.body);
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

            let userData = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getOperatorData(req.body);
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
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addTimeSheet(req.body);
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
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getTimesheetList(req.body);

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
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoItemSecUomList(req.body);
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
            let deleteSheet = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.deleteTimeSheet(req.body.deleteSheetId);
            if (deleteSheet instanceof Error || deleteSheet.rowsAffected < 1) {
                error = true;
            } else {

                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateSheetOnDelete(req.body.updateArray[i], req.body.EvolveUser_ID);
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
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addTimeSheet(req.body.tsData);


            if (addTs instanceof Error) {
                Evolve.Log.error("EERR2737  : Error while add timesheet ");
                error = true;

            } else {
                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        let updateSheetOnAdd = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateSheetOnDelete(req.body.updateArray[i], req.EvolveUser_ID);
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

            let compJob = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.completeJob(req.body);
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
            let addTs = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.addEditedTimeSheet(req.body.tsData, req.EvolveUser_ID);
            if (addTs instanceof Error || addTs.rowsAffected < 1) {

                error = true;
            } else {
                for (let i = 0; i < req.body.updateArray.length; i++) {
                    if (error == false) {
                        req.body.updateArray[i].EvolveTimesheet_StartDateTime = req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(6, 10) + '-' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(3, 5) + '-' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(0, 2) + ' ' + req.body.updateArray[i].EvolveTimesheet_StartDateTime.slice(11, 16) + ':00';
                        req.body.updateArray[i].EvolveTimesheet_StopDateTime = req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(6, 10) + '-' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(3, 5) + '-' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(0, 2) + ' ' + req.body.updateArray[i].EvolveTimesheet_StopDateTime.slice(11, 16) + ':00';

                        let updateSheetOnDelete = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.updateSheetOnDelete(req.body.updateArray[i], req.EvolveUser_ID);
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
            let comments = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getMachineSheduleComments(req.body);
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
            let shiftList = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getTsShiftList(req.body);
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
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift3StartTime);
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
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift2StartTime);
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
                        let getShifTName = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getShifTName(shiftList.recordset[i].EvolveMachineCalendar_Shift1StartTime);
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
            let getPlcDevice = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getPlcDevice(req.body.EvolveMachine_ID);
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

    getWoDetails: async function (req, res) {
        try {
            let data = {};
            let bomDetails = await Evolve.App.Services.SmartFactory.ProductionBooking.SrvV1.getWoBomDetails(req.body.EvolveProdOrders_ID);
            if (bomDetails instanceof Error) {
                Evolve.Log.error("EERR2795: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo bom details", result: null };
                res.send(obj);
            } else {
                data.woBomDetails = bomDetails.recordset;
                let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                res.send(obj);
            }
                // }

        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },








}