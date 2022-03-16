'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    // getWoList: async function (req, res) {
    //     try {
    //         let woList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoList();
    //         if (woList instanceof Error) {
    //              Evolve.Log.error("EERR0009 : Error while get wo list")
    //               let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get wo list", result: null };
    //               res.send(obj);
    //         } else {
    //             let obj = { statusCode: 200, status: "success", message: "wo list", result: woList.recordset };
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0644: Error while getting Wo List "+error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR0644: Error while getting Wo List "+error.message, result: null };
    //         res.send(obj);
    //     }
    // },

    // WOAjaxUrl: async function (req, res) {
    //     try {
    //         let result = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.WOAjaxUrl(req.body.term);
    //         let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
    //         res.send(obj);
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0644: Error while getting Wo List "+error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR0644: Error while getting Wo List "+error.message, result: null };
    //         res.send(obj);
    //     }
    // },

    getWoList: async function (req, res) {
        try {
            console.log("ENTEREED IN GET WO DETAILS")
            let woDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoList(req.body.term);
            if (woDetails instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get wo id")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get wo id", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: woDetails.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get wo id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get wo id " + error.message, result: null };
            res.send(obj);
        }
    },

    getLocationList: async function (req, res) {
        try {
            let locationList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getLocationList();
            if (locationList instanceof Error) {
                Evolve.Log.error("EERR2793 : Error while get location list")
                let obj = { statusCode: 400, status: "fail", message: "EERR2793: Error while get location list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2794: Error while get location list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2794: Error while get location list " + error.message, result: null };
            res.send(obj);
        }
    },

    getWoDetails: async function (req, res) {
        try {

            let data = {};
            let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoDetails(req.body.EvolveProdOrders_ID);
            if (details instanceof Error) {
                Evolve.Log.error("EERR2795: Error while  get wo details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo details", result: null };
                res.send(obj);
            } else {

                // if (details.recordset[0].EvolveProdOrders_IsPicklistGenerated) {
                //     Evolve.Log.error("Pick list already generated")
                //     let obj = { statusCode: 400, status: "fail", message: "Pick list already generated", result: null };
                //     res.send(obj);
                // } else {
                    data.woDetails = details.recordset;
                    let bomDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoBomDetails(req.body.EvolveProdOrders_ID);
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
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },

    getSoList: async function (req, res) {
        try {
            // console.log("???????????????????????", req.body);

            console.log("ENTEREED IN get so list ajax url ")
            let woDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getSoList(req.body.term);
            if (woDetails instanceof Error) {
                Evolve.Log.error("EERR2791 : Error while get wo id")
                let obj = { statusCode: 400, status: "fail", message: "EERR2791: Error while get wo id", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: woDetails.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR2792: Error while get wo id " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2792: Error while get wo id " + error.message, result: null };
            res.send(obj);
        }
    },

    getSoDetails: async function (req, res) {
        try {
            console.log("req????????????????????/", req.body);
            let data = {};
            let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getSoDetails(req.body.EvolveSalesOrder_ID);
            if (details instanceof Error) {
                Evolve.Log.error("EERR2795: Error while  get so details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get so details", result: null };
                res.send(obj);
            } else {

                // if (details.recordset[0].EvolveProdOrders_IsPicklistGenerated) {
                //     Evolve.Log.error("Pick list already generated")
                //     let obj = { statusCode: 400, status: "fail", message: "Pick list already generated", result: null };
                //     res.send(obj);
                // } else {
                    data.SoDetails = details.recordset;
                    let bomDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getSoLineDetails(req.body.EvolveSalesOrder_ID);
                    if (bomDetails instanceof Error) {
                        Evolve.Log.error("EERR2795: Error while  get so details")
                        let obj = { statusCode: 400, status: "fail", message: "EERR2795: Error while  get wo bom details", result: null };
                        res.send(obj);
                    } else {
                        data.soLineDetails = bomDetails.recordset;
                        console.log("data???????", data);
                        let obj = { statusCode: 200, status: "success", message: "wo production details", result: data };
                        res.send(obj);
                    }
                // }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get so details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get so details " + error.message, result: null };
            res.send(obj);
        }
    },

    generatePickList: async function (req, res) {
        console.log("?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..");
        try {
            let pickListNumber = "";
            console.log("GENERATE PICKLIST"  , req.body)
            let errorMessage = '';
            if (req.body.EvolvePickListDetail.length == 0) {

                errorMessage = 'Material To Pick Not Found';

            } else {
                pickListNumber = Evolve.Generator.generate("PCL");

                if (pickListNumber == undefined || pickListNumber.length == 0) {

                    errorMessage = 'Error While Generate PickList Number';


                } else {

                    req.body.EvolvePickList_Number = pickListNumber;

                    req.body.EvolvePickList_Number = (req.body.EvolvePickList_Number.toString()).replace(/ -/g, '')

                    req.body.EvolvePickList_Number = req.body.EvolvePickList_Number.split(" ").join("");
                    req.body.EvolveUser_ID = req.EvolveUser_ID == undefined ? null : req.EvolveUser_ID;
                    let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.generatePickList(req.body);

                    if (details instanceof Error || details.rowsAffected < 1) {

                        errorMessage = 'Error While Generate Pick list';


                    } else {

                        req.body.EvolvePickList_ID = details.recordset[0].inserted_id;

                        for (let i = 0; i < req.body.EvolvePickListDetail.length; i++) {
                            req.body.EvolvePickListDetail[i].EvolvePickList_ID = details.recordset[0].inserted_id;
                            req.body.EvolvePickListDetail[i].PickList = req.body.PickList;

                            let pickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.addPickListDetails(req.body.EvolvePickListDetail[i]);

                            if (pickListDetails instanceof Error || pickListDetails.rowsAffected < 1) {

                                errorMessage = 'Error While Generate Pick list';
                            }
                        }
                        if (errorMessage == '') {
                            if (req.body.PickList == 'WO') {
                                let updateWorkOrder = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updateWorkOrderPickListStatus(req.body);
                                if (updateWorkOrder instanceof Error || updateWorkOrder.rowsAffected < 1) {
    
                                    errorMessage = 'Error while update Work order picklist status';
                                }
                            }else if (req.body.PickList == 'SO') {
                                let updateSalesOrder = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updateSalesOrderPickListStatus(req.body);
                                if (updateSalesOrder instanceof Error || updateSalesOrder.rowsAffected < 1) {
    
                                    errorMessage = 'Error while update Sales order picklist status';
                                }
                            }
                        }

                    }
                }
            }

            let obj = { statusCode: errorMessage == '' ? 200 : 400, status: errorMessage == '' ? "success" : 'fail', message: errorMessage == "" ? 'Pick List Generated SuccessFully Pick list number is ' + req.body.EvolvePickList_Number : errorMessage, result: { EvolvePickList_Number : req.body.EvolvePickList_Number} };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR2796: Error while  get wo details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2796: Error while  get wo details " + error.message, result: null };
            res.send(obj);
        }
    },




    // getWoissueDetails: async function (req, res) {
    //     try {
    //          let checkExistPick = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.checkExistPick(req.body.EvolveProdOrders_ID);
    //         if (checkExistPick instanceof Error) {
    //             Evolve.Log.error("EERR0009 : Error while get existing pick details")
    //             let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get existing pick details", result: null };
    //             res.send(obj);
    //         } else {
    //             if(checkExistPick.rowsAffected == 0)
    //             {
    //                 let issueDetail = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.issueDetail(req.body.EvolveProdOrders_ID);
    //                 if (issueDetail instanceof Error) {
    //                     Evolve.Log.error("EERR0009 : Error while get material to issue details")
    //                     let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get existing pick details", result: null };
    //                     res.send(obj);
    //                 } else {
    //                     issueDetail.recordset[0].EvolvePickList_QtyReq =issueDetail.recordset[0].EvolveProdOrders_Quantity ;

    //                     issueDetail.recordset[0].EvolvePickList_QtyPick = 0 ;
    //                     issueDetail.recordset[0].EvolvePickList_QtyIss = 0 ;
    //                     issueDetail.recordset[0].EvolvePickList_leftToPick= issueDetail.recordset[0].EvolveProdOrders_Quantity  ;
    //                     issueDetail.recordset[0].issueId= issueDetail.recordset[0].EvolveProdOrders_ID ;
    //                     let obj = { statusCode: 200, status: "success", message: "wo production details", result:issueDetail.recordset};
    //                     res.send(obj);
    //                   }
    //             }
    //             else
    //             {

    //                 let pickedDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.issueDetailWhilePickGenerated(req.body.EvolveProdOrders_ID);
    //                 if (pickedDetails instanceof Error) {
    //                     Evolve.Log.error("EERR0009 : Error while get picked details")
    //                     let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get picked details", result: null };
    //                     res.send(obj);
    //                 } else {
    //                      pickedDetails.recordset[0].EvolvePickList_leftToPick= pickedDetails.recordset[0].EvolvePickList_QtyReq-pickedDetails.recordset[0].EvolvePickList_QtyPick  ;
    //                     pickedDetails.recordset[0].issueId= pickedDetails.recordset[0].EvolveProdOrders_ID ;
    //                     let obj = { statusCode: 200, status: "success", message: "wo production details", result:pickedDetails.recordset};
    //                     res.send(obj);
    //                 }

    //             }

    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0647: Error while getting  Wo issue Details "+error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR0647: Error while getting  Wo issue Details "+error.message, result: null };
    //         res.send(obj);
    //     }
    // },
    getPalletDetails: async function (req, res) {
        try {

            let palletDetails = {}
            let availablePallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getAvailablePallets(req.body);
            if (availablePallets instanceof Error) {
                Evolve.Log.error("EERR2797 : Error while get wo available pallets details")
                let obj = { statusCode: 400, status: "fail", message: "EERR2797 : Error while get wo pallets details", result: null };
                res.send(obj);
            } else {
                palletDetails.available = availablePallets.recordset
                let pickedPallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getpickedPallets(req.body);
                if (pickedPallets instanceof Error) {
                    Evolve.Log.error("EERR2798 : Error while get wo picked pallets details")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2798 : Error while get wo pallets details", result: null };
                    res.send(obj);
                } else {
                    palletDetails.picked = pickedPallets.recordset
                    let obj = { statusCode: 200, status: "success", message: "wo pallets details", result: palletDetails };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2799: Error while  get Pallet Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2799: Error while  get  Pallet Details " + error.message, result: null };
            res.send(obj);
        }
    },
    pickPallets: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let woNumber = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWoNumber(req.body.EvolveProdOrders_ID);
            if (woNumber instanceof Error) {
                Evolve.Log.error("EERR2800 : Error while get location status")
                let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                res.send(obj);
            } else {
                req.body.EvolveWoSchedule_OrderID = woNumber.recordset[0].EvolveWoSchedule_OrderID;
                let locStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getLocationStatus(req.body.pickToLoc);
                if (locStatus instanceof Error) {
                    Evolve.Log.error("EERR2800 : Error while get location status")
                    let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                    res.send(obj);
                } else {
                    req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                    let checkPickNumber = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.checkExistPick(req.body.EvolveProdOrders_ID);
                    if (checkPickNumber instanceof Error) {
                        Evolve.Log.error("EERR2800 : Error while check picklist exist or not")
                        let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while check picklist exist or not", result: null };
                        res.send(obj);
                    } else {
                        if (checkPickNumber.rowsAffected == 0) {
                            let pickListNumber = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PICKLISTNUMBER') // get po barcode details 
                            if (pickListNumber == 0) {
                                Evolve.Log.error("EERR2801 : Error while assign pallet number")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2801 :Error while assign pallet number", result: null };
                                res.send(obj);
                            } else {
                                req.body.EvolvePickList_Number = pickListNumber
                                let createPickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.createPickList(req.body) // get po barcode details 
                                if (createPickList instanceof Error || createPickList.rowsAffected < 1) {
                                    Evolve.Log.error("EERR2802 : Error while create picklist")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2802 :Error while create picklist", result: null };
                                    res.send(obj);
                                    // pickListNumber = {}
                                } else {
                                    req.body.EvolvePickList_ID = createPickList.recordset[0].inserted_id
                                }
                            }
                        } else {
                            req.body.EvolvePickList_ID = checkPickNumber.recordset[0].EvolvePickList_ID
                        }
                    }
                    let error = false
                    for (let i = 0; i < req.body.pickedPallets.length; i++) {
                        if (error == false) {
                            let changePalletStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.changePalletStatus(req.body.pickedPallets[i].EvolveInventory_ID, req.body);
                            if (changePalletStatus instanceof Error || changePalletStatus.rowsAffected < 1) {
                                error = true;
                                Evolve.Log.error("EERR2803 : Error while change pallets status")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2803 : Error while change pallets status", result: null };
                                res.send(obj);
                            } else {
                                let addPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.addPickListDetails(req.body.pickedPallets[i], req.body);
                                if (addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1) {
                                    error = true;
                                    Evolve.Log.error("EERR2804 : Error while add pick list details")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2804 : Error while add pick list details", result: null };
                                    res.send(obj);
                                } else {
                                    // if(req.body.isBom == false)
                                    // {
                                    //     let updatePickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updatePickList(req.body.EvolvePickList_ID,req.body.EvolveUser_ID ,req.body.pickedPallets[i].EvolveInventory_QtyOnHand);
                                    //     console.log("updatePickList" , updatePickList)
                                    //     if (updatePickList instanceof Error || updatePickList.rowsAffected < 1) {
                                    //         error = true;
                                    //         Evolve.Log.error("EERR0009 : Error while update picklist")
                                    //         let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update picklist", result: null };
                                    //         res.send(obj);
                                    //     }
                                    // }else
                                    // {
                                    let updatePickList = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updateBomPickList(req.body.selectedIssueLine, req.body.EvolveUser_ID, req.body.pickedPallets[i].EvolveInventory_QtyOnHand);
                                    if (updatePickList instanceof Error || updatePickList.rowsAffected < 1) {
                                        error = true;
                                        Evolve.Log.error("EERR2805 : Error while update picklist")
                                        let obj = { statusCode: 400, status: "fail", message: "EERR2805 : Error while update picklist", result: null };
                                        res.send(obj);
                                    }

                                    // }
                                }
                            }
                        }
                    }
                    if (error == false) {
                        let obj = { statusCode: 200, status: "success", message: "Pallets picked successfully", result: "" };
                        res.send(obj);
                    } else {
                        Evolve.Log.error("EERR2806 : Error While pick pallets")
                        let obj = { statusCode: 400, status: "success", message: "EERR2806 : Error While pick pallets", result: "" };
                        res.send(obj);

                    }
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR2807: Error While pick pallets " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2807: Error While pick pallets " + error.message, result: null };
            res.send(obj);
        }
    },

    unpickPallets: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let locStatus = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error) {
                Evolve.Log.error("EERR2800 : Error while get location status")
                let obj = { statusCode: 400, status: "fail", message: "EERR2800 : Error while get location status", result: null };
                res.send(obj);
            } else {
                req.body.EvolveInventory_Status = locStatus.recordset[0].EvolveStatusCodeMstr_Code;
                let error = false;
                for (let i = 0; i < req.body.unPickedPallets.length; i++) {
                    if (error == false) {
                        let deletePicklist = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.deletePicklist(req.body.unPickedPallets[i]);
                        if (deletePicklist instanceof Error || deletePicklist.rowsAffected < 1) {
                            error = true
                            Evolve.Log.error("EERR2808 : Error while delete picklist")
                            let obj = { statusCode: 400, status: "fail", message: "EERR2808 : Error while delete picklist", result: null };
                            res.send(obj);
                        } else {
                            // if(req.body.isBom == false)
                            // {
                            //     let updatePickQty = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updatePickQty(req.body.unPickedPallets[i].EvolveInventory_QtyOnHand ,req.body.selectedIssueLine);
                            //     if (updatePickQty instanceof Error || updatePickQty.rowsAffected < 1) {
                            //             error = true
                            //             Evolve.Log.error("EERR0009 : Error while update pick qty")
                            //             let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update pick qty", result: null };
                            //             res.send(obj);
                            //     }else{
                            //     let updatePallet = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updatePallet(req.body.unPickedPallets[i] , req.body.EvolveLocation_ID ,req.body.EvolveUser_ID);
                            //     if (updatePallet instanceof Error || updatePallet.rowsAffected < 1) {
                            //         error = true
                            //         Evolve.Log.error("EERR0009 : Error while update pallet status")
                            //         let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while update pallet status", result: null };
                            //         res.send(obj);
                            //     }

                            //     }
                            // }else{
                            let updatePickQty = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updateBomPickListOnUnpick(req.body.unPickedPallets[i].EvolveInventory_QtyOnHand, req.body.selectedIssueLine, req.body.EvolveUser_ID);
                            if (updatePickQty instanceof Error || updatePickQty.rowsAffected < 1) {
                                error = true
                                Evolve.Log.error("EERR2809 : Error while update pick qty")
                                let obj = { statusCode: 400, status: "fail", message: "EERR2809 : Error while update pick qty", result: null };
                                res.send(obj);
                            } else {
                                let updatePallet = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.updatePallet(req.body.unPickedPallets[i], req.body.EvolveLocation_ID, req.body.EvolveUser_ID, req.body.EvolveInventory_Status);
                                if (updatePallet instanceof Error || updatePallet.rowsAffected < 1) {
                                    error = true
                                    Evolve.Log.error("EERR2810 : Error while update pallet status")
                                    let obj = { statusCode: 400, status: "fail", message: "EERR2810 : Error while update pallet status", result: null };
                                    res.send(obj);
                                }

                            }
                            // }
                        }
                    }
                }
                if (error == false) {
                    let obj = { statusCode: 200, status: "success", message: "Pallets unpicked successfully", result: "" };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR2811: Error while unpick pallets " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2811: Error while unpick pallets " + error.message, result: null };
            res.send(obj);
        }
    },
    getSubItemList: async function (req, res) {
        try {
            let subItems = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getSubItemList(req.body.EvolveItem_ID);
            if (subItems instanceof Error) {
                Evolve.Log.error(" EERR2812 : Error while get sub item list ")
                let obj = { statusCode: 400, status: "fail", message: " EERR2812 : Error while get sub item list ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "sub item list", result: subItems.recordset };
                res.send(obj);
            }
        } catch (error) {
            EEERR2812olve.Log.error(" EERR2813: Error while  getting Pallet Details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2813: Error while  getting Pallet Details " + error.message, result: null };
            res.send(obj);
        }
    },
    getSubItemAvailPallets: async function (req, res) {
        try {
            let pallets = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getAvailablePallets(req.body);
            if (pallets instanceof Error) {
                Evolve.Log.error(" EERR2814 : Error while get sub item available pallets ")
                let obj = { statusCode: 400, status: "fail", message: " EERR2814 : Error while get sub item available pallets ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "sub item available pallets", result: pallets.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR2815: Error while get sub item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2815: Error while get sub item list " + error.message, result: null };
            res.send(obj);
        }
    },
    getWobomIssueDetails: async function (req, res) {
        try {
            // let details = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWobomIssueDetails(req.body.EvolveWoSchedule_ID);
            // if (details instanceof Error) {
            //  Evolve.Log.error("EERR0007 : Error while get material to issue details")
            //  let obj = { statusCode: 400, status: "fail", message: "EERR0007 : while get material to issue details", result: null };
            //     res.send(obj);
            // } else if(details.rowsAffected<1)
            // {
            //     Evolve.Log.error("EERR0007 : No data found ! ")
            //     let obj = { statusCode: 400, status: "fail", message: "EERR0007 : No data found ! ", result: null };
            //        res.send(obj);
            // }else
            // {
            //     for(let i =0 ; i<details.recordset.length ;i++)
            //     {
            //       details.recordset[i].EvolvePickList_leftToPick= details.recordset[i].EvolvePickList_QtyReq -details.recordset[i].EvolvePickList_QtyPick  ;
            //     details.recordset[i].issueId= details.recordset[i].EvolveProdOrderBom_ID ;

            //     }
            //      let obj = { statusCode: 200, status: "success", message: "wo material to issue", result:details.recordset};
            //     res.send(obj);          
            // }
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let error = false;
            let materialToIssue = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getWobomIssueDetails(req.body.EvolveWoSchedule_ID);
            if (materialToIssue instanceof Error) {
                error = true;
            } else {
                for (let i = 0; i < materialToIssue.recordset.length; i++) {
                    if (error == false) {
                        materialToIssue.recordset[i].EvolvePickList_leftToPick = materialToIssue.recordset[i].EvolveSchedulingBom_QtyReq - materialToIssue.recordset[i].EvolveSchedulingBom_QtyPick
                        if (materialToIssue.recordset[i].qtyHand == null) {
                            materialToIssue.recordset[i].qtyHand = 0;
                        }
                        let subItems = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getSubItems(materialToIssue.recordset[i].EvolveSchedulingBom_CompItem_ID);
                        if (subItems instanceof Error) {
                            error = true;
                        } else {
                            for (let j = 0; j < subItems.recordset.length; j++) {
                                if (error == false) {
                                    let getQtyOnHAnd = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getQtyOnHAnd(subItems.recordset[j].EvolveSubItem_SubItem_ID, req.body.EvolveWoSchedule_ID)
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
                if (error == true) {
                    Evolve.Log.error(" EERR2816: Error while get material to issue details");
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "EERR2816 : Error while get material to issue details",
                        result: null
                    };
                    res.send(obj);
                } else if (materialToIssue.recordset.length == 0) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Material to issue not found",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = { statusCode: 200, status: "success", message: "wo material to issue", result: materialToIssue.recordset };
                    res.send(obj);
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR2817: Error while get material to issue details " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR2817: Error while get material to issue details " + error.message, result: null };
            res.send(obj);
        }
    },
    // getScannedItem: async function (req, res) {
    //     try {
    //         let scannedItem = await Evolve.App.Services.SmartFactory.PickList.SrvWoPickListGenerate.getScannedItem();
    //         if (scannedItem instanceof Error) {
    //              Evolve.Log.error("EERR2818 : Error while get pallet")
    //               let obj = { statusCode: 400, status: "fail", message: "EERR2818 : Error while get pallet", result: null };
    //               res.send(obj);
    //         } else if(scannedItem.rowsAffected < 1) {
    //             let obj = { statusCode: 400, status: "fail", message: "PALLET NOT FOUND", result: [] };
    //               res.send(obj);
    //         }else{
    //             let obj = { statusCode: 200, status: "success", message: "PALLET", result: scannedItem.recordset[0] };
    //             res.send(obj);
    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0644: Error while get pallet "+error.message);
    //         let obj = { statusCode: 400, status: "fail", message: " EERR0644: Error while get pallet "+error.message, result: null };
    //         res.send(obj);
    //     }
    // },









}