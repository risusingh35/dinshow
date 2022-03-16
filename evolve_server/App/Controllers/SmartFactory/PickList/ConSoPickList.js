'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    getUnPickLocationList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getUnPickLocationList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Location List Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting location List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting location List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    getShipToList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getShipToList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Ship To List Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Ship To List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Ship To List" + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getSoNoList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getSoNoList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "So No Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let getCustomer = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getCustomer(req.body);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: {
                       SoLineData : result.recordset,
                       CustomerName : getCustomer.recordset,
                    }
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting So No List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting So No List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },   
    getSoLineList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getSoLineList(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "So Line Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting So Line List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting So Line List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    getSoTableData: async function (req, res) {
        try {
            let soLineData = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getSoTableData(req.body);
            if (soLineData instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Data Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                // req.body.EvolveItem_ID = soLineData.recordset[0].EvolveItem_ID;
                // let AvailablePallets = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getAvailablePalletsList(req.body);
                // if (soLineData instanceof Error) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error On Get Available Pallets",
                //         result: null
                //     };
                //     res.send(obj);
                // }
                // let pickedPallets = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getPickedPalletsList(req.body);
                // if (pickedPallets instanceof Error) {
                //     let obj = {
                //         statusCode: 400,
                //         status: "fail",
                //         message: "Error Gating Pick Pallet",
                //         result: null
                //     };
                //     res.send(obj);
                // }


                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: soLineData.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Table Data" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Table Data" + error.message,
                result: null
            };
            res.send(obj);
        }
    },    
      
    getAvailablePalletsList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getAvailablePalletsList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Available Pallets Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Available Pallets List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Available Pallets List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getPickedPalletsList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getPickedPalletsList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Picked Pallets Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting picked Pallets List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting picked Pallets List" + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getGoodLocationList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getGoodLocationList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Good Location List Not Found",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Successfully",
                    result: result.recordset,
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while getting Good Location List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while getting Good Location List" + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 

    soQtyPick: async function (req, res) {
        try {
            console.log(req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getTransTypeID = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getTransTypeID('SO-PICK');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Trans Type Not Define",
                    result: null
                };
                res.send(obj);
            }else{
                let error = false;
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                for(let LineData of req.body.SoLineData){
                    let addSoPickList = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.addSoPickList(req.body, LineData);
                    if (addSoPickList instanceof Error || addSoPickList.rowsAffected < 1) {
                        console.log("addSoPickList===")
                        error = true;
                    }else{
                        req.body.EvolveSoPickList_ID = addSoPickList.recordset[0].inserted_id;
                        let addSoPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.addSoPickListDetails(req.body, LineData);
                        if (addSoPickListDetails instanceof Error || addSoPickListDetails.rowsAffected < 1) {
                            console.log("entered in  1st >>>>>")
                            error = true;
                        }else{
                            let getShipLocation = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getShipLocation('SHIP');
                            if (getShipLocation instanceof Error || getShipLocation.rowsAffected < 1) {
                                console.log("entered in  2st >>>>>")
                                error = true;
                            }else{
                                req.body.EvolveLocation_ID =  getShipLocation.recordset[0].EvolveLocation_ID;
                                req.body.EvolveInventory_Status = 'PICKED'
                                let updateInventory = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.updateInventory(req.body, LineData);
                                if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                                    console.log("entered in  3st >>>>>")
                                    error = true;
                                }else{
                                    // let history_Data = {
                                    //     'EvolveCompany_ID': updateInventory.recordset[0].EvolveCompany_ID,
                                    //     'EvolveUnit_ID': updateInventory.recordset[0].EvolveUnit_ID,
                                    //     'EvolveTranstype_code': 'SO-PICK',
                                    //     'EvolveItem_ID': updateInventory.recordset[0].EvolveItem_ID,
                                    //     'EvolveInventoryTransHistory_Number': null, // WO / PO / SO NUMBER 
                                    //     'EvolveInventoryTransHistory_Line': null, // PO / SO LINE NUMBER
                                    //     'EvolveInventoryTransHistory_LotSerial': updateInventory.recordset[0].EvolveInventory_LotNumber,
                                    //     'EvolveInventoryTransHistory_RefNumber': null,
                                    //     'EvolveInventoryTransHistory_FromRefNumber': updateInventory.recordset[0].EvolveInventory_RefNumber,
                                    //     'EvolveInventoryTransHistory_QtyRequire': 0,
                                    //     'EvolveInventoryTransHistory_Qty': updateInventory.recordset[0].EvolveInventory_QtyOnHand,
                                    //     'EvolveUom_ID': updateInventory.recordset[0].EvolveUom_ID,
                                    //     'EvolveLocation_FromID': updateInventory.recordset[0].EvolveLocation_ID,
                                    //     'EvolveLocation_ToID': null,
                                    //     'EvolveReason_ID': null,
                                    //     'EvolveInventoryTransHistory_InventoryStatus': updateInventory.recordset[0].EvolveInventory_Status,
                                    //     'EvolveInventoryTransHistory_PostingStatus': updateInventory.recordset[0].EvolveInventory_PostingStatus,
                                    //     'EvolveInventoryTransHistory_Remark': null,
                                    //     'EvolveUser_ID': updateInventory.recordset[0].EvolveInventory_CreatedUser,
                                    // };
                                    // let add_history = Evolve.App.Controllers.Common.ConCommon.addInvTransHistory(history_Data);
                                    // if (add_history instanceof Error || add_history.rowsAffected < 1) {
                                    //     Evolve.Log.error(" EERR0719: Error On Add Inventory History ");
                                    //     Evolve.Log.error(" " + add_history.message);
                                    //     error = true
                                    // }
                                } 
                            }  
                        }   
                    }
                }
                if(error == true){
                    console.log("entered in  lasts >>>>>")

                     let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error On So Pick List",
                        result: null,
                    };
                    res.send(obj);
                }
                else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "So Pick List Successfully",
                        result: null,
                    };
                    res.send(obj);
                }
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while So Pick List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while So Pick List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },  
    soQtyPickSplitPallet: async function (req, res) {
        try {
            console.log(req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getTransTypeID = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getTransTypeID('SO-PICK');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Trans Type Not Define",
                    result: null
                };
                res.send(obj);
            }else{
                let error = false;
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                for(let LineData of req.body.SoLineData){

                    let getShipLocation = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getShipLocation('SHIP');
                    if (getShipLocation instanceof Error || getShipLocation.rowsAffected < 1) {
                        console.log("getShipLocation===")
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error On get Ship Location",
                            result: null
                        };
                        res.send(obj);
                        break;
                        error = true;
                    }else{
                        req.body.EvolveLocation_ID =  getShipLocation.recordset[0].EvolveLocation_ID;
                        req.body.EvolveInventory_Status = 'PICKED'
                        req.body.remainingQty =  parseInt(req.body.TotalQty) - parseInt(req.body.QtyPick);
                        let updateInventory = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.updateInventoryRemainingQty(req.body);
                        if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                            console.log("updateInventory===")
                                let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "Error On Update Inventory",
                                result: null
                            };
                            res.send(obj);
                            break;
                            error = true;
                        }else{
                                // start new Pallet
                            let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
                            if (get_barcode_details == 0) {
                                Evolve.Log.error("EERR0082 :Error while assign PALLET")
                                let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign PALLET number", result: null };
                                res.send(obj);
                                // get_barcode_details = {}
                            } else {
                                req.body.NewRefNumber = get_barcode_details;
                            }
                            // end new Pallet
                            let AddInventoryPallet = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.AddInventoryPallet(req.body, updateInventory.recordset[0]);
                            if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                                console.log("updateInventory===")
                                let obj = {
                                    statusCode: 400,
                                    status: "fail",
                                    message: "Error On Update Inventory",
                                    result: null
                                };
                                res.send(obj);
                                break;
                                error = true;
                            }else{
                                req.body.EvolveInventory_ID = AddInventoryPallet.recordset[0].inserted_id;
                                let addSoPickList = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.addSoPickList(req.body, LineData);
                                if (addSoPickList instanceof Error || addSoPickList.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "Error On Add So Pick List",
                                        result: null
                                    };
                                    res.send(obj);
                                    break;
                                    error = true;
                                }else{
                                    req.body.EvolveSoPickList_ID = addSoPickList.recordset[0].inserted_id;
                                    let addSoPickListDetails = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.addSoPickListDetails(req.body, LineData);
                                    if (addSoPickListDetails instanceof Error || addSoPickListDetails.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "Error On Add So Pick List Details",
                                            result: null
                                        };
                                        res.send(obj);
                                        break;
                                        error = true;
                                    }
                                }

                            } 
                            
                        } 
                    }  
                    
                }
                if(error == true){
                     let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error On So Pick List",
                        result: null,
                    };
                    res.send(obj);
                }
                else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "So Pick List Successfully",
                        result: null,
                    };
                    res.send(obj);
                }
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while So Pick List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while So Pick List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },
   
    soQtyUnPick: async function (req, res) {
        try {
            console.log(req.body)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getTransTypeID = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.getTransTypeID('SO-PICK');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Trans Type Not Define",
                    result: null
                };
                res.send(obj);
            }else{
                let error = false;
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                req.body.EvolveInventory_Status = 'ACCEPTED'
                let updateInventory = await Evolve.App.Services.SmartFactory.PickList.SrvSoPickList.updateInventory(req.body);
                if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {
                    console.log("updateInventory===")
                    error = true;
                } 
                            
                if(error == true){
                     let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error On So Pick List",
                        result: null,
                    };
                    res.send(obj);
                }
                else{
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "So Pick List Successfully",
                        result: null,
                    };
                    res.send(obj);
                }
            }
            
        } catch (error) {
            Evolve.Log.error("EERR0755: Error while So Pick List" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0755: Error while So Pick List" + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}