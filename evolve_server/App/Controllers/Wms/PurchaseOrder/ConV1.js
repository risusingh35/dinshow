'use strict';
const { copyFile } = require("fs");
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getSuppliersList: async function (req, res) {
        try {
            let suppliers = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getSuppliersList(req.body);
            if (suppliers instanceof Error) {
                 Evolve.Log.error("EERR0009 : Error while get supplier list")
                  let obj = { statusCode: 400, status: "fail", message: "EERR0009 : Error while get supplier list", result: null };
                  res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "supplier list", result: suppliers.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0979: Error while getting supplier list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0979: Error while getting supplier list "+error.message, result: null };
            res.send(obj);
        }
    },
    getLocationList: async function (req, res) {
        try {

            let locationList = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getLocationList();
            if (locationList instanceof Error) {
             Evolve.Log.error(" EERR0007 : Error while get location list ")
             let obj = { statusCode: 400, status: "fail", message: "EERR0007 : Error while get location list", result: null };
                res.send(obj);
            } else
            {
            let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0] };
            res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0980: Error while getting location list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0980: Error while getting location list "+error.message, result: null };
            res.send(obj);
        }
    },

    getPoList: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPoList(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error("EERR0010 : Eroor While get po list of supplier")
                let obj = { statusCode: 400, status: "fail", message: "EERR0010 : Eroor While get po list of supplier", result: null };
                res.send(obj);
            } else if (poList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No po found !", result: poList.recordset };
                res.send(obj);


            } else {
                let obj = { statusCode: 200, status: "success", message: "Po List", result: poList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0981: Error while getting Po List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0981: Error while getting Po List "+error.message, result: null };
            res.send(obj);


        }
    },
    getSinglePoDetails: async function (req, res) {
        try {

            let checkAprvStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.checkAprvStatus(req.body);
            if (checkAprvStatus instanceof Error || checkAprvStatus.rowsAffected < 1 ) {

                Evolve.Log.error("EERR3218 : Error while check po approved status ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3218 : Error while check po approved status ", result: null };
                res.send(obj);

            }else if(checkAprvStatus.recordset[0].EvolvePurchaseOrder_IsApproved != true){
            
                let obj = { statusCode: 400, status: "fail", message: "PO IS NOT APPROVED. PLEASE APPROVE PO FIRST", result: null };
                res.send(obj);

            }else{
            let poDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getSinglePoDetails(req.body);
            if (poDetails instanceof Error) {
                 Evolve.Log.error(" EERR0011 : Error while getting po line details of  po ")
                let obj = { statusCode: 400, status: "fail", message: " EERR0011 : Error while getting po line details of  po ", result: null };
                res.send(obj);
            }else if(poDetails.rowsAffected <1 ){
                let obj = { statusCode: 400, status: "fail", message: "No open po line found", result: null };
                res.send(obj);

            } else {
                let obj = { statusCode: 200, status: "success", message: "Po line details", result: poDetails.recordset };
                res.send(obj);
            }
        }
        } catch (error) {
            Evolve.Log.error(" EERR0982: Error while getting Single Po Details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0982: Error while getting Single Po Details "+error.message, result: null };
            res.send(obj);
       
        }
    },

    getAllPoDetails: async function (req, res) {
        try {
            let allPo = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getAllPoDetails(req.body);
            if (allPo instanceof Error) {
                Evolve.Log.error(" EERR3219 : No po data  Found!")
                let obj = { statusCode: 400, status: "fail", message: "EERR3219 : No po data  Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po details", result: allPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0983: Error while getting all Po Details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0983: Error while getting all Po Details "+error.message, result: null };
            res.send(obj);
        }
    },
    getPodetails: async function (req, res) {
        try {

            let condition = ''
            let and = true;
            for (let i = 0; i < req.body.searchArray.length; i++) {
                if (and == true) {

                    condition = condition + " AND " + "(epod.EvolvePurchaseOrderDetail_ID =" + req.body.searchArray[i].EvolvePurchaseOrderDetail_ID;
                    and = false;
                }
                else {
                    condition = condition + " OR " + "epod.EvolvePurchaseOrderDetail_ID =" + req.body.searchArray[i].EvolvePurchaseOrderDetail_ID

                }

            }
            condition = condition + ")"
            let allPo = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPodetails(condition);
            if (allPo instanceof Error) {
              Evolve.Log.error(" EERR0012 : Error while get line details ")
              let obj = { statusCode: 400, status: "fail", message: " EERR0012 : Error while get line details ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Line details", result: allPo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0984: Error while getting Po details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: 'EERR0984: Error while getting Po details', result: null };
            res.send(obj);
        }
    },

    getPalletDetails: async function (req, res) {
        try {

            let palletDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPalletDetails(req.body);
            if (palletDetails instanceof Error) {
               Evolve.Log.error("EERR0013 : Error while get pallet details")
               let obj = { statusCode: 400, status: "fail", message: "EERR0013 : Error while get pallet details", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet Details", result: palletDetails.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3226: Error while get pallet"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR3226: Error while get pallet", result: null };
            res.send(obj);

        }
    },


    getUomList: async function (req, res) {
        try {
            let uomList = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getUomList(req.body);
            if (uomList instanceof Error) {
             Evolve.Log.error("EERR0008 : Error while get uom  list")
             let obj = { statusCode: 400, status: "fail", message: "EERR0008 : Error while get uom  list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Uom list", result: uomList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0985: Error while getting pallet details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0985: Error while getting pallet details", result: null };
            res.send(obj);

        }
    },

    gateEntryNoList: async function (req, res) {
        try {

            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.gateEntryNoList(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Gate Entry Number List", result: result.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0986: Error while getting gate Entry no. list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0986: Error while getting gate Entry no. list ", result: null };
            res.send(obj);
        }
    },

    receivePurchaseOrder: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let locStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getLocationStatus(req.body.EvolveLocation_ID);
            if (locStatus instanceof Error || locStatus.rowsAffected < 1) {
                Evolve.Log.error("EERR3220: Error while get location status ")
                let obj = { statusCode: 400, status: "fail", message: "EERR3220 : Error while get location status ", result: null };
                res.send(obj);
            }else{
            req.body.EvolveInventory_Status  = locStatus.recordset[0].EvolveStatusCodeMstr_Code
            let getTransTypeID = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getTransTypeID('PO-RCPT');
            if (getTransTypeID instanceof Error || getTransTypeID.rowsAffected < 1) {
               Evolve.Log.error(" EERR0014 :Error while get EvolveTranstype_ID ")
                let obj = { statusCode: 400, status: "fail", message: " EERR0014 :Error while get EvolveTranstype_ID ", result: null };
                res.send(obj);
            }
            else {
                req.body.EvolveTranstype_ID = getTransTypeID.recordset[0].EvolveTranstype_ID;
                let po_detail_id = req.body.EvolvePurchaseOrderDetail_ID;
                let po_receive_qty = req.body.EvolvePurchaseOrderDetail_QuantityReceived;

                let get_barcode_details =  await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') // get po barcode details 
                 if (get_barcode_details == 0  ) {
                     Evolve.Log.error(" EERR0015 :Error while assign pallet number ")

                    let obj = { statusCode: 400, status: "fail", message: " EERR0015 :Error while assign pallet number ", result: null };
                    res.send(obj);
                    // get_barcode_details = {}
                }
                else {
                        req.body.EvolveInventory_Refnumber = get_barcode_details;
                        let add_inventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.receivePurchaseOrder(req.body);
                        if (add_inventory instanceof Error) {
                            Evolve.Log.error(" EERR0016 :Error while recieve po ")
                            let obj = { statusCode: 400, status: "fail", message:"EERR0016 :Error while recieve po", result: null };
                            res.send(obj);
                        }
                        else {
                            let update_poDetail = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePurchaseOrder(po_detail_id, po_receive_qty, req.body); // Update Purchase Order Receive QTY 
                            if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {
                                Evolve.Log.error(" EERR0017 :Error while update po details ")
                                let obj = { statusCode: 400, status: "fail", message:"EERR0017 :Error while update po details", result: null };
                                res.send(obj);
                            } else {
                                let ZplData =
                                    "^XA\r\n" +
                                    "^MMT^PW360\r\n" +
                                    "^LL0160^LS10\r\n" +
                                    "^FX\r\n" +
                                    "^BY2,2,100\r\n" +
                                    "^FO50,50^BC^FD" +
                                    req.body.EvolveInventory_Refnumber +
                                    "^FS\r\n" +
                                    "^CFA,14 \r\n" +

                                    "^XZ";

                                // console.log("Xpl data >> ", ZplData)
                                // const data = Evolve.Config.printer['url']+"?KonnectID="+Evolve.Config.printer['KonnectID']+"&data="+ZplData;
                                // Evolve.Axios.get(data)
                                // .then((response) => {
                                //   if(response.status == 200){

                                // let updatePrintStatus = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoTrans(req.body.EvolveInventory_Refnumber); // Update EvolveWMSSeting table for next barcode
                                // if (updatePrintStatus instanceof Error || updatePrintStatus.rowsAffected < 1) {
                                //     Evolve.Log.error(" EERR0018 :Error while update pallet print status ")
                                //     let obj = { statusCode: 400, status: "fail", message: " EERR0018 :Error while update pallet print status ", result: null };
                                //     res.send(obj);
                                // }
                                // else {
                                    let obj = {
                                        statusCode: 200,
                                        status: "success",
                                        message: "Po recieved successfully",
                                        result: null
                                    };
                                    res.send(obj);

                                // }
                            }
                            //         }
                        }
                    // }
                }
            }
        }

        } catch (error) {
            Evolve.Log.error(" EERR0040: Error while recieving Purchase order "+error.message);

            let obj = { statusCode: 400, status: "fail", message: " EERR0040: Error while recieving Purchase order ", result: null };
            res.send(obj);
        }
    },


    checkUomConv: async function (req, res) {
        try {
            let responce = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.checkUomConv(req.body);
            if (responce instanceof Error ) {
                Evolve.Log.error("EERR0006: Error while get uom conversion rule")

                let obj = { statusCode: 400, status: "fail", message: "EERR0006: Error while get uom conversion rule ", result: null };
                res.send(obj);
            } else if(responce.rowsAffected < 1)
            {
                let obj = { statusCode: 400, status: "fail", message: "Uom conversion rule not found!", result: null };
                res.send(obj);
            }
            else {
                let obj = { statusCode: 200, status: "success", message: "Conversion List", result: responce.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0041: Error while checking Uom Conv "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0041: Error while checking Uom Conv", result: null };
            res.send(obj);

        }
    },


    printPallet: async function (req, res) {
        try {
            let ZplData =
                "^XA\r\n" +
                "^MMT^PW360\r\n" +
                "^LL0160^LS10\r\n" +
                "^FX\r\n" +
                "^BY2,2,100\r\n" +
                "^FO50,50^BC^FD" +
                req.body.EvolveInventory_RefNumber +
                "^FS\r\n" +
                "^CFA,14 \r\n" +

                "^XZ";

            // console.log("Xpl data >> " ,ZplData )

            // const data = Evolve.Config.printer['url']+"?KonnectID="+Evolve.Config.printer['KonnectID']+"&data="+ZplData;
            //             Evolve.Axios.get(data)
            //             .then((response) => {
            //               if(response.status == 200){

            let updatePoTrans = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoTrans(req.body.EvolveInventory_RefNumber); // Update EvolveWMSSeting table for next barcode

            if (updatePoTrans instanceof Error) {
                 Evolve.Log.error("EERR0021 : Error while update print status")
                let obj = { statusCode: 400, status: "fail", message:" EERR0021 : Error while update print status", result: null };
                res.send(obj);
            }
            else {
                let updateInvPrint = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updateInvPrintStatus(req.body.EvolveInventory_RefNumber); // Update EvolveWMSSeting table for next barcode
                if (updateInvPrint instanceof Error) {
                    Evolve.Log.error("EERR3221 : Error while print  pallet"+error.message)
                    let obj = { statusCode: 400, status: "fail", message:" EERR3221 : Error while print  pallet", result: null };
                    res.send(obj);
                  }else{
                      let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Barcode printed",
                        result: null
                      };
                    res.send(obj);


                  }
                // let updatePoTrans = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoTrans(req.body.EvolveInventory_RefNumber); // Update EvolveWMSSeting table for next barcode


            }
        } catch (error) {
            Evolve.Log.error(" EERR0042: Error while printing pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0042: Error while printing pallet ", result: null };
            res.send(obj);
        }
    },

    getPalletCount: async function (req, res) {
        try {
            let condition = ' WHERE ';

            let first = true;

            for (let i = 0; i < req.body.searchPallet.length; i++) {
                if (first == true) {
                    condition += " (EvolveInventory_LotNumber LIKE '" + req.body.searchPallet[i].EvolveInventory_LotNumber + "' AND " + " EvolveItem_ID='" + req.body.searchPallet[i].EvolveItem_ID + "' )";

                    first = false;

                }
                else {

                    condition += " OR  (EvolveInventory_LotNumber LIKE '" + req.body.searchPallet[i].EvolveInventory_LotNumber + "' AND " + " EvolveItem_ID='" + req.body.searchPallet[i].EvolveItem_ID + "')";
                }
            }

            let palletCount = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPalletCount(condition);
            if (palletCount instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while getting total pallets !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Pallet List", result: palletCount.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0043: Error while getting Pallet Count "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0043: Error while getting Pallet Count ", result: null };
            res.send(obj);

        }
    },

    getSummary: async function (req, res) {
        try {
            req.body.EvolveInventory_LotNumber = req.body.EvolveInventory_LotNumber.trim()
            let summary = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getSummary(req.body);
            if (summary instanceof Error) {
                 Evolve.Log.error(" EERR0977 : Error while get summary ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0977 : Error while get summary ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Summary", result: summary.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0044: Error while getting summary "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0044: Error while getting summary", result: null };
            res.send(obj);


        }
    },

    updateSinglePalletData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let palletData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getpoDetailId(req.body);
            if (palletData instanceof Error) {
               Evolve.Log.error("EERR0027 : Error while get pallet id ")
              let obj = { statusCode: 400, status: "fail", message: "EERR0027 : Error while get pallet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let updateInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updateInventory(req.body.EvolveInventory_ID, req.body.updatedQty, req.body.EvolveUser_ID);
                if (updateInventory instanceof Error) {
                    Evolve.Log.error("EERR0028 : Error while update inventory ")

                    let obj = { statusCode: 400, status: "fail", message: "EERR0028 : Error while update inventory", result: null };
                    res.send(obj);
                }
                else {
                    let updatePoTrans = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePalletPoTrans(req.body);
                    if (updatePoTrans instanceof Error) {
                         Evolve.Log.error("EERR0029 : Error while update pallet detail ")

                        let obj = { statusCode: 400, status: "fail", message: "EERR0029 : Error while update pallet detail ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoDetails = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoDetails(req.body);
                        if (updatePoDetails instanceof Error) {
                            Evolve.Log.error("EERR0030 : Error while update po detail ")

                            let obj = { statusCode: 400, status: "fail", message: "EERR0030 : Error while update po detail", result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: "Pallet updated successfully ", result: palletData.recordsets[0] };
                            res.send(obj);
                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0045: Error while updating single pallet data"+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0045: Error while updating single pallet data", result: null };
            res.send(obj);
        }
    },

    deletePallet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let palletData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getpoDetailId(req.body);
            if (palletData instanceof Error) {
                Evolve.Log.error(" EERR0031 : Error while get palet id ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0031 : Error while get palet id ", result: null };
                res.send(obj);
            } else {
                req.body.EvolvePurchaseOrderDetail_ID = palletData.recordset[0].EvolvePurchaseOrderDetail_ID
                let deletePallet = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.deletePallet(req.body);

                if (deletePallet instanceof Error || deletePallet.rowsAffected < 1) {
                    Evolve.Log.error("EERR0032 : Error while delete pallet ")

                    let obj = { statusCode: 400, status: "fail", message: " EERR0032 : Error while delete pallet ", result: null };
                    res.send(obj);
                }
                else {

                    let deletePoTrans = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.deletePoTrans(req.body);

                    if (deletePoTrans instanceof Error || deletePoTrans.rowsAffected < 1) {
                         Evolve.Log.error(" EERR0033 : Error while delete po transaction ")
                          let obj = { statusCode: 400, status: "fail", message: " ERR0033 : Error while delete po transaction ", result: null };
                        res.send(obj);
                    }
                    else {
                        let updatePoQty = await await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoQty(req.body);

                        if (updatePoQty instanceof Error || updatePoQty.rowsAffected < 1) {
                            Evolve.Log.error(" EERR0034 : Error while update po qty ")

                            let obj = { statusCode: 400, status: "fail", message: " EERR0034 : Error while update po qty ", result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: "Pallet deleted successfully ", result: palletData.recordsets[0] };
                            res.send(obj);

                        }
                    }
                }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0978: Error while deleting pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0978: Error while deleting pallet"+error.message, result: null };
            res.send(obj);

        }
    },

    getPoByGateNumber: async function (req, res) {
        try {


            let poData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPoByGateNumber(req.body);
            if (poData instanceof Error) {
               Evolve.Log.error("EERR0020 : Error while get po by gate Number")

                let obj = { statusCode: 400, status: "fail", message: "EERR0020 : Error while get po by gate Number", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po data", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0046: Error while getting po by gate Number "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0046: Error while getting po by gate Number", result: null };
            res.send(obj);

        }
    },
    getPodetailsbyGate: async function (req, res) {
        try {
            let poData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPodetailsbyGate(req.body.EvolvePurchaseOrder_Number);
            if (poData instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "error while getting po data !", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "po list", result: poData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0047: Error while getting po details by gate "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0047: Error while getting po details by gate", result: null };
            res.send(obj);

        }
    },

    getUnpostedTransaction: async function (req, res) {
        try {

            let tranData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getUnpostedTransaction(req.body);
            if (tranData instanceof Error) {
                Evolve.Log.error("EERR0022 : Erro while get unposted transactions")

                let obj = { statusCode: 400, status: "fail", message: "EERR0022 : Erro while get unposted transactions", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted transactions", result: tranData.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0048: Error while getting unposted transaction  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0048: Error while getting unposted transaction", result: null };
            res.send(obj);

        }
    },

    // postToErp: async function (req, res) {
    //     try {
    //         req.body.EvolveUser_ID = req.EvolveUser_ID;
    //         req.body.EvolveCompany_ID = req.EvolveCompany_ID;
    //         req.body.EvolveUnit_ID = req.EvolveUnit_ID;
    //         let error = false;
    //         for (let i = 0; i < req.body.postArray.length; i++) {
    //             if (error == false) {
    //                 let post = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.postToErp(req.body.postArray[i], req.body);
    //                 if (post instanceof Error || post.rowsAffected < 1) {
                    
    //                     error = true;
    //                 }
    //             }
    //         }
    //         if (error == true) {
    //             Evolve.Log.error("EERR0023 : Error change pallet status to ERPPOSTED")

    //             let obj = { statusCode: 400, status: "fail", message: "EERR0023 : Error change pallet status to ERPPOSTED", result: null };
    //             res.send(obj);
    //         } else {
    //             let postpallets = []
    //             for (let i = 0; i < req.body.postArray.length; i++) {
    //                 let getSinglePalletData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getSinglePalletData(req.body.postArray[i]);
    //                 if (getSinglePalletData instanceof Error || getSinglePalletData.rowsAffected < 1) {
    //                     Evolve.Log.error("EERR0024 : Error while get single pallet data")

    //                     let obj = { statusCode: 400, status: "fail", message: 'EERR0024 : Error while get single pallet data', result: null };
    //                     res.send(obj);

    //                 }
    //                 else {
    //                     postpallets.push(getSinglePalletData.recordset[0]);

    //                 }
    //             }
    //             let slipArray = []
    //             for (let i = 0; i < postpallets.length; i++) {
    //                 let available = false
    //                 let child = []

    //                 if (slipArray.length != 0) {
    //                     for (let l = 0; l < slipArray.length; l++) {
    //                         for (let m = 0; m < slipArray[l].child.length; m++) {
    //                             if (slipArray[l].child[m] == postpallets[i]) {
    //                                 available = true
    //                                 // br = true ; 
    //                             }
    //                         }
    //                     }
    //                     if (available == false) {

    //                         child.push(postpallets[i])

    //                     }
    //                 }
    //                 else {
    //                     child.push(postpallets[i])

    //                 } 

    //                 for (let j = i + 1; j < postpallets.length; j++) {
    //                     if (postpallets[i].EvolvePOTrans_PackingSlipNO.trim() == postpallets[j].EvolvePOTrans_PackingSlipNO.trim()) {
    //                         if (slipArray.length != 0) {
    //                             let repeat = false

    //                             for (let k = 0; k < slipArray.length; k++) {

    //                                 if (slipArray[k].slipNo == postpallets[j].EvolvePOTrans_PackingSlipNO.trim()) {

    //                                 }
    //                                 else {
    //                                     if (repeat == false) {
    //                                         if (available == false) {
    //                                             child.push(postpallets[j])

    //                                         }

    //                                         repeat = true;
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                         else {

    //                             child.push(postpallets[j])

    //                         }
    //                     }
    //                 }
    //                 slipArray[i] = {
    //                     'slipNo': postpallets[i].EvolvePOTrans_PackingSlipNO.trim(),
    //                     'child': child
    //                 }
    //             }
    //            let slpiWisePallets = []
    //             for (let i = 0; i < slipArray.length; i++) {
    //                 if (slipArray[i].child.length != 0) {

    //                     slpiWisePallets.push(slipArray[i])
    //                 }
    //             }
    //             for (let v = 0; v < slpiWisePallets.length; v++) {
    //                 let slipNumber = slpiWisePallets[0].slipNo
    //                 postpallets = slpiWisePallets[v].child

    //                 let dateArray = []

    //                 for (let i = 0; i < postpallets.length; i++) {
    //                     let available = false
    //                     let child = []

    //                     if (dateArray.length != 0) {
    //                         for (let l = 0; l < dateArray.length; l++) {
    //                             for (let m = 0; m < dateArray[l].child.length; m++) {
    //                                 if (dateArray[l].child[m] == postpallets[i]) {
    //                                     available = true
    //                                     // br = true ; 
    //                                 }
    //                             }
    //                         }
    //                         if (available == false) {

    //                             child.push(postpallets[i])

    //                         }
    //                     }
    //                     else {
    //                         child.push(postpallets[i])
    //                     } 
    //                     for (let j = i + 1; j < postpallets.length; j++) {
    //                         if (postpallets[i].EvolvePOTransReceiptDate == postpallets[j].EvolvePOTransReceiptDate) {
    //                             if (dateArray.length != 0) {
    //                                 let repeat = false

    //                                 for (let k = 0; k < dateArray.length; k++) {
    //                                     if (dateArray[k].date != postpallets[j].EvolvePOTransReceiptDate) {
    //                                         if (repeat == false) {
    //                                             if (available == false) {
    //                                                 child.push(postpallets[j])

    //                                             }
    //                                             repeat = true;
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                             else {

    //                                 child.push(postpallets[j])

    //                             }
    //                         }
    //                     }
    //                     dateArray[i] = {
    //                         'date': postpallets[i].EvolvePOTransReceiptDate,
    //                         'child': child
    //                     }
    //                 }
    //                 let dateWiseArray = []
    //                 for (let i = 0; i < dateArray.length; i++) {
    //                     if (dateArray[i].child.length != 0) {

    //                         dateWiseArray.push(dateArray[i])
    //                     }
    //                 }
    //                  for (let m = 0; m < dateWiseArray.length; m++) {
    //                     if (error == false) {
    //                         let rcptDate = dateWiseArray[m].date
    //                         let poNumber = dateWiseArray[m].child[0].EvolvePurchaseOrder_Number
    //                         let qtyOrdered  = dateWiseArray[m].child[0].EvolvePurchaseOrderDetail_QuantityOrdered
    //                         let qtyReceived  = dateWiseArray[m].child[0].EvolvePurchaseOrderDetail_QuantityReceived
    //                         let uomCode = dateWiseArray[m].child[0].EvolveUom_Uom
    //                         let lineArray = []
    //                         let allPoDAta = dateWiseArray[m].child
    //                         for (let i = 0; i < allPoDAta.length; i++) {
    //                             let available = false
    //                             let child = []

    //                             if (lineArray.length != 0) {
    //                                 for (let l = 0; l < lineArray.length; l++) {
    //                                     for (let m = 0; m < lineArray[l].child.length; m++) {
    //                                         if (lineArray[l].child[m] == allPoDAta[i]) {
    //                                             available = true
    //                                             // br = true ; 
    //                                         }
    //                                     }
    //                                 }
    //                                 if (available == false) {

    //                                     child.push(allPoDAta[i])

    //                                 }
    //                             }
    //                             else {
    //                                 child.push(allPoDAta[i])

    //                             } for (let j = i + 1; j < allPoDAta.length; j++) {
    //                                 if (allPoDAta[i].EvolvePurchaseOrderDetail_Line == allPoDAta[j].EvolvePurchaseOrderDetail_Line) {
    //                                     if (lineArray.length != 0) {
    //                                         let repeat = false

    //                                         for (let k = 0; k < lineArray.length; k++) {

    //                                             if (lineArray[k].line == allPoDAta[j].EvolvePurchaseOrderDetail_Line) {

    //                                             }
    //                                             else {
    //                                                 if (repeat == false) {
    //                                                     if (available == false) {
    //                                                         child.push(allPoDAta[j])

    //                                                     }

    //                                                     repeat = true;
    //                                                 }
    //                                             }
    //                                         }
    //                                     }
    //                                     else {

    //                                         child.push(allPoDAta[j])

    //                                     }
    //                                 }
    //                             }
    //                             lineArray[i] = {
    //                                 'line': allPoDAta[i].EvolvePurchaseOrderDetail_Line,
    //                                 'cancelBo' : (qtyOrdered == qtyReceived) ? 'true' : 'false' ,
    //                                 'receiptUm' : uomCode,
    //                                 'child': child
    //                             }
    //                         }
    //                         let lineChild = []
    //                         for (let i = 0; i < lineArray.length; i++) {
    //                             if (lineArray[i].child.length != 0) {

    //                                 lineChild.push(lineArray[i])
    //                             }
    //                         }
    //                        let ioData = {

    //                             EvolveIO_Data: {
    //                                 "slipNumber": slipNumber,
    //                                 "RecieptDate": rcptDate,
    //                                 "PoNumber": poNumber,
    //                                 "lineDetails": lineChild,
    //                               },
    //                             EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
    //                             EvolveIO_Code: "EVOLVEPOOB", // EVOLVEPOOB = po receive
    //                             EvolveIO_Data_Formate: "XML",
    //                             EvolveIO_ERP_Type: "QAD",
    //                             EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
    //                             EvolveIO_File_Data: ''
    //                         }

    //                         let addIOData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.addIOData(ioData);
    //                         if (addIOData instanceof Error) {
                                
    //                             error = true;
    //                            Evolve.Log.error("EERR0025 : Error while add data in  IO")
    //                         }
    //                         else {
    //                             error = false
    //                         }
    //                     }
    //                 }
    //             }
    //             if (error == false) {
    //                 let obj = { statusCode: 200, status: "success", message: "Posted To Erp successfully", result: '' };
    //                 res.send(obj);
    //             }
    //             else {
    //                 let obj = { statusCode: 400, status: "fail", message: 'Error Post to Erp!', result: null };
    //                 res.send(obj);
    //             }

    //         }
    //     } catch (error) {
    //         Evolve.Log.error(" EERR0049: Error while posting to erp "+error.message);

    //     }
    // },


    getPreviosdatTranCount: async function (req, res) {
        try {

            let count = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPreviosdatTranCount();
            if (count instanceof Error) {
                Evolve.Log.error(" EERR0026 : Error while get  previous unposted transactions count ")
                 let obj = { statusCode: 400, status: "fail", message: " EERR0026 : Error while get  previous unposted transactions count   ", result: null };
                res.send(obj);
            } else {

                let obj = { statusCode: 200, status: "success", message: "count", result: count.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0050: Error while getting previous transaction count "+error.message)
            let obj = { statusCode: 400, status: "fail", message: "EERR0050: Error while getting previous transaction count ", result: null };
            res.send(obj);

        }
    },
    closePO: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID; 
            let closePo = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.closePO(req.body);
            if (closePo instanceof Error || closePo.rowsAffected<1) {
               Evolve.Log.error(" EERR0019 : Error while closing po ")

                let obj = { statusCode: 400, status: "fail", message: "EERR0019 : Error while closing po", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Purchase order closed successfully", result: closePo.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0051: Error while closing po "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0051: Error while closing po ", result: null };
            res.send(obj);

        }
    },
    getUnpostedPoList: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getUnpostedPoList(req.body);
            if (poList instanceof Error) {
                Evolve.Log.error(" EERR0004 : Error while getting unposted po list ")

                let obj = { statusCode: 400, status: "fail", message: " EERR0004 : Error while get unposted po list ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "unPosted Po ", result: poList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0052: Error while getting unposted po list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0052: Error while getting unposted po list", result: null };
            res.send(obj);

        }
    },
    getPoLineList: async function (req, res) {
        try {
            let lineList = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getPoLineList(req.body.EvolvePurchaseOrder_ID);
            if (lineList instanceof Error) {
                Evolve.Log.error(" EERR0005 : Error while get unposted lines for po ")
                let obj = { statusCode: 400, status: "fail", message: "EERR0005 : Error while get unposted lines for po ", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Po lines", result: lineList.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0052: Error while getting unposted po list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0052: Error while getting unposted po list ", result: null };
            res.send(obj);

        }
    },
    printAllPallets: async function (req, res) {
        try {
            let error = false;
            for(let i=0 ; i<req.body.printArray.length ;i++){
                if(error == false){           
                    let ZplData =
                        "^XA\r\n" +
                        "^MMT^PW360\r\n" +
                        "^LL0160^LS10\r\n" +
                        "^FX\r\n" +
                        "^BY2,2,100\r\n" +
                        "^FO50,50^BC^FD" +
                        req.body.printArray[i].EvolveInventory_RefNumber +
                        "^FS\r\n" +
                        "^CFA,14 \r\n" +
                        "^XZ";
                    let updatePoTrans = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updatePoTrans(req.body.printArray[i].EvolveInventory_RefNumber); // Update EvolveWMSSeting table for next barcode
                     if (updatePoTrans instanceof Error) {
                                Evolve.Log.error("EERR2626: Error while print all pallets ")
                                error = true
                     }else{
                        let updateInvPrint = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.updateInvPrintStatus(req.body.printArray[i].EvolveInventory_RefNumber); // Update EvolveWMSSeting table for next barcode
                        if (updateInvPrint instanceof Error) {
                            Evolve.Log.error("EERR3222: Error while print all pallets ")
                            error = true
                          }

                      }
       
                    }
           }
           if(error == true){
            Evolve.Log.error("EERR3223 : Error while print all pallets ")

            let obj = { statusCode: 200, status: "success", message: "EERR3223 : Error while print all pallets", result: lineList.recordset };
            res.send(obj);

           }else{
            let obj = {
            statusCode: 200,
            status: "success",
            message: "Barcodes printed",
            result: null
            };
            res.send(obj);

           }
        } catch (error) {
            Evolve.Log.error("EERR2628: Error while print all pallets"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2628: Error while print all pallets", result: null };
            res.send(obj);
        }
    },
    checkPoStatus: async function (req, res) {
        try {
            let status = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.checkPoStatus(req.body.EvolvePurchaseOrder_ID);
            if (status instanceof Error) {
                Evolve.Log.error("EERR2629: Error while check po status "+error.message)
                let obj = { statusCode: 400, status: "fail", message: "EERR2629 : Error while check po status", result: null };
                res.send(obj);
            } else if(status.recordset[0].EvolvePurchaseOrder_Status != 'open') {
                let obj = { statusCode: 400, status: "fail", message: " Po closed already please refresh the screen", result: null };
                res.send(obj);
            }else{
                let obj = { statusCode: 200, status: "success", message: "Po is open", result: null };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error("EERR2630 : Error while check po status "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR2630 : Error while check po status ", result: null };
            res.send(obj);

        }
    },
    postToErp: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;

            console.log("req.body.EvolveUnit_ID>>>>" ,  req.body.EvolveUnit_ID)
            let error = false;
            for (let i = 0; i < req.body.postArray.length; i++) {
                if (error == false) {
                    let post = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.postToErp(req.body.postArray[i], req.body);
                    if (post instanceof Error || post.rowsAffected < 1) {
                    
                        error = true;
                    }
                }
            }
            if (error == true) {
                Evolve.Log.error("EERR0023 : Error change pallet status to ERPPOSTED")

                let obj = { statusCode: 400, status: "fail", message: "EERR0023 : Error change pallet status to ERPPOSTED", result: null };
                res.send(obj);
            } else {
                let postpallets = []
                for (let i = 0; i < req.body.postArray.length; i++) {
                    let getSinglePalletData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.getSinglePalletData(req.body.postArray[i]);
                    if (getSinglePalletData instanceof Error || getSinglePalletData.rowsAffected < 1) {
                        Evolve.Log.error("EERR0024 : Error while get single pallet data")

                        let obj = { statusCode: 400, status: "fail", message: 'EERR0024 : Error while get single pallet data', result: null };
                        res.send(obj);
                        error = true ;

                    }
                    else {
                        if(getSinglePalletData.recordset[0].EvolveItem_ShelfLife == true){
                            getSinglePalletData.recordset[0].EvolveItem_ShelfLife ='S'
                        }else{
                            getSinglePalletData.recordset[0].EvolveItem_ShelfLife ='N'
                        }
                        // console.log
                        postpallets.push(getSinglePalletData.recordset[0]);
                        postpallets[postpallets.length -1 ].headPicked = false;

                    }
                }
                if(error == false){
                    let  filtedArray = [];
                    for(let i=0 ; i<postpallets.length ; i++){
                        if(postpallets[i].headPicked ==  false){
                        filtedArray.push({
                            EvolvePurchaseOrder_Number : postpallets[i].EvolvePurchaseOrder_Number , 
                            EvolvePOTrans_PackingSlipNO : postpallets[i].EvolvePOTrans_PackingSlipNO , 
                            EvolvePOTrans_BoeNo : postpallets[i].EvolvePOTrans_BoeNo , 
                            EvolvePOTrans_BoeDate : postpallets[i].EvolvePOTrans_BoeDate , 
                            EvolvePOTrans_GateEntryDate : postpallets[i].EvolvePOTrans_GateEntryDate , 
                            EvolvePOTrans_GateEntryNumber : postpallets[i].EvolvePOTrans_GateEntryNumber , 
                            EvolvePOTrans_EWaybillNUm : postpallets[i].EvolvePOTrans_EWaybillNUm ,
                            EvolvePOTransInvoice_number : postpallets[i].EvolvePOTransInvoice_number , 
                            EvolvePOTransEffDate : postpallets[i].EvolvePOTransEffDate , 
                            EvolvePOTrans_ShipDate : postpallets[i].EvolvePOTrans_ShipDate , 
                            EvolvePOTransReceiptDate : postpallets[i].EvolvePOTransReceiptDate , 
                            EvolveUnit_entity : postpallets[i].EvolveUnit_entity , 
                            EvolveUnit_domain : postpallets[i].EvolveUnit_domain , 
                            EvolveUnit_Code : postpallets[i].EvolveUnit_Code , 

                            lineDetails : []

                        })
                        filtedArray[filtedArray.length-1].lineDetails.push({
                            EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[i].EvolvePurchaseOrderDetail_QuantityOrdered,
                            EvolveUom_Uom :  postpallets[i].EvolveUom_Uom,
                            EvolvePurchaseOrderDetail_WoLot :  postpallets[i].EvolvePurchaseOrderDetail_WoLot,
                            EvolvePurchaseOrderDetail_WoOp :  postpallets[i].EvolvePurchaseOrderDetail_WoOp,
                            EvolvePoTrans_LotNumber : postpallets[i].EvolvePoTrans_LotNumber ,
                            EvolveItem_ShelfLife : postpallets[i].EvolveItem_ShelfLife ,
                            EvolveItem_Code : postpallets[i].EvolveItem_Code ,
                            EvolvePurchaseOrderDetail_Line : postpallets[i].EvolvePurchaseOrderDetail_Line ,

                            palletDetails: [{
                                EvolveLocation_Code : postpallets[i].EvolveLocation_Code,
                                EvolvePurchaseOrder_Number : postpallets[i].EvolvePurchaseOrder_Number,
                                EvolvePOTransExpriryDate : postpallets[i].EvolvePOTransExpriryDate,
                                EvolvePOTransPalletNum : postpallets[i].EvolvePOTransPalletNum,
                                EvolvePoTrans_CustLotRef : postpallets[i].EvolvePoTrans_CustLotRef,
                                EvolvePOTransPalletQTY : postpallets[i].EvolvePOTransPalletQTY,
                                EvolvePoTrans_LotNumber : postpallets[i].EvolvePoTrans_LotNumber ,

                            }] ,



                        })
                        let  randParent = {
                            EvolvePurchaseOrder_Number : postpallets[i].EvolvePurchaseOrder_Number , 
                            EvolvePOTrans_PackingSlipNO : postpallets[i].EvolvePOTrans_PackingSlipNO , 
                            EvolvePOTrans_BoeNo : postpallets[i].EvolvePOTrans_BoeNo , 
                            EvolvePOTrans_BoeDate : postpallets[i].EvolvePOTrans_BoeDate , 
                            EvolvePOTrans_GateEntryDate : postpallets[i].EvolvePOTrans_GateEntryDate , 
                            EvolvePOTrans_GateEntryNumber : postpallets[i].EvolvePOTrans_GateEntryNumber , 
                            EvolvePOTrans_EWaybillNUm : postpallets[i].EvolvePOTrans_EWaybillNUm ,
                            EvolvePOTransInvoice_number : postpallets[i].EvolvePOTransInvoice_number , 
                            EvolvePOTransEffDate : postpallets[i].EvolvePOTransEffDate , 
                            EvolvePOTrans_ShipDate : postpallets[i].EvolvePOTrans_ShipDate , 
                            EvolvePOTransReceiptDate : postpallets[i].EvolvePOTransReceiptDate , 

                        }
                        postpallets[i].headPicked = true ;
                        for(let j = i+1 ;j<postpallets.length ; j++ ){
                            if(postpallets[j].headPicked == false){
                                let randChild = {
                                    EvolvePurchaseOrder_Number : postpallets[j].EvolvePurchaseOrder_Number , 
                                    EvolvePOTrans_PackingSlipNO : postpallets[j].EvolvePOTrans_PackingSlipNO , 
                                    EvolvePOTrans_BoeNo : postpallets[j].EvolvePOTrans_BoeNo , 
                                    EvolvePOTrans_BoeDate : postpallets[j].EvolvePOTrans_BoeDate , 
                                    EvolvePOTrans_GateEntryDate : postpallets[j].EvolvePOTrans_GateEntryDate , 
                                    EvolvePOTrans_GateEntryNumber : postpallets[j].EvolvePOTrans_GateEntryNumber , 
                                    EvolvePOTrans_EWaybillNUm : postpallets[j].EvolvePOTrans_EWaybillNUm ,
                                    EvolvePOTransInvoice_number : postpallets[j].EvolvePOTransInvoice_number , 
                                    EvolvePOTransEffDate : postpallets[j].EvolvePOTransEffDate , 
                                    EvolvePOTrans_ShipDate : postpallets[j].EvolvePOTrans_ShipDate , 
                                    EvolvePOTransReceiptDate : postpallets[j].EvolvePOTransReceiptDate , 

                                }
                                
                                if(JSON.stringify(randParent) == JSON.stringify(randChild) ){

                            
                                    // let  parentLine  = {
                                    //     EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[i].EvolvePurchaseOrderDetail_QuantityOrdered,
                                    //     EvolveUom_Uom :  postpallets[i].EvolveUom_Uom,
                                    //     EvolvePurchaseOrderDetail_WoLot :  postpallets[i].EvolvePurchaseOrderDetail_WoLot,
                                    //     EvolvePurchaseOrderDetail_WoOp :  postpallets[i].EvolvePurchaseOrderDetail_WoOp,
                                    //     EvolvePoTrans_LotNumber : postpallets[i].EvolvePoTrans_LotNumber ,
                                    //     EvolveItem_ShelfLife : postpallets[i].EvolveItem_ShelfLife ,
                                    //     EvolveItem_Code : postpallets[i].EvolveItem_Code ,

                                    // }
                                    
                                    let  childLine  = {
                                        EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[j].EvolvePurchaseOrderDetail_QuantityOrdered,
                                        EvolveUom_Uom :  postpallets[j].EvolveUom_Uom,
                                        EvolvePurchaseOrderDetail_WoLot :  postpallets[j].EvolvePurchaseOrderDetail_WoLot,
                                        EvolvePurchaseOrderDetail_WoOp :  postpallets[j].EvolvePurchaseOrderDetail_WoOp,
                
                                        EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,
                                        EvolveItem_ShelfLife : postpallets[j].EvolveItem_ShelfLife ,
                                        EvolveItem_Code : postpallets[j].EvolveItem_Code ,
                                        

                                    }

                                //     if(JSON.stringify(parentLine) == JSON.stringify(childLine)){


                                //         filtedArray[filtedArray.length-1].lineDetails[lineLenght].palletDetails.push({

                                //             EvolveLocation_Code : postpallets[j].EvolveLocation_Code,
                                //             EvolvePurchaseOrder_Number : postpallets[j].EvolvePurchaseOrder_Number,
                                //             EvolvePOTransExpriryDate : postpallets[j].EvolvePOTransExpriryDate,
                                //             EvolvePOTransPalletNum : postpallets[j].EvolvePOTransPalletNum,
                                //             EvolvePoTrans_CustLotRef : postpallets[j].EvolvePoTrans_CustLotRef,
                                //             EvolvePOTransPalletQTY : postpallets[j].EvolvePOTransPalletQTY,
                                //             EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,


                                //         })


                                //     }else{

                                //         // for(let k = lineLenght+1 ; k <filtedArray[filtedArray.length-1].lineDetails[lineLenght].length ; k++ )
                                //         // {
                                //         //     let  obj  = 

                                //         // if()
                                //         filtedArray[filtedArray.length -1 ].lineDetails.push({
                                //         EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[j].EvolvePurchaseOrderDetail_QuantityOrdered,
                                //         EvolveUom_Uom :  postpallets[j].EvolveUom_Uom,
                                //         EvolvePurchaseOrderDetail_WoLot :  postpallets[j].EvolvePurchaseOrderDetail_WoLot,
                                //         EvolvePurchaseOrderDetail_WoOp :  postpallets[j].EvolvePurchaseOrderDetail_WoOp,
                
                                //         EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,
                                //         EvolveItem_ShelfLife : postpallets[j].EvolveItem_ShelfLife ,
                                //         EvolveItem_Code : postpallets[j].EvolveItem_Code ,
                                //         palletDetails: [{
                                //             EvolveLocation_Code : postpallets[j].EvolveLocation_Code,
                                //             EvolvePurchaseOrder_Number : postpallets[j].EvolvePurchaseOrder_Number,
                                //             EvolvePOTransExpriryDate : postpallets[j].EvolvePOTransExpriryDate,
                                //             EvolvePOTransPalletNum : postpallets[j].EvolvePOTransPalletNum,
                                //             EvolvePoTrans_CustLotRef : postpallets[j].EvolvePoTrans_CustLotRef,
                                //             EvolvePOTransPalletQTY : postpallets[j].EvolvePOTransPalletQTY,
                                //             EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,

                                //         }] ,
                                //     })
                                // // }

                                //     }

                                    let entered  = false;
                                    for(let k=0 ; k<filtedArray[filtedArray.length-1].lineDetails.length ; k++){
                                        if(postpallets[j].headPicked == false){                                          
                                            let  parentLine  = {
                                                EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[k].EvolvePurchaseOrderDetail_QuantityOrdered,
                                                EvolveUom_Uom :  postpallets[k].EvolveUom_Uom,
                                                EvolvePurchaseOrderDetail_WoLot :  postpallets[k].EvolvePurchaseOrderDetail_WoLot,
                                                EvolvePurchaseOrderDetail_WoOp :  postpallets[k].EvolvePurchaseOrderDetail_WoOp,
                                                EvolvePoTrans_LotNumber : postpallets[k].EvolvePoTrans_LotNumber ,
                                                EvolveItem_ShelfLife : postpallets[k].EvolveItem_ShelfLife ,
                                                EvolveItem_Code : postpallets[k].EvolveItem_Code ,
                                                EvolvePurchaseOrderDetail_Line : postpallets[k].EvolvePurchaseOrderDetail_Line ,


                                            }

                                    if(JSON.stringify(parentLine) == JSON.stringify(childLine) ){

                                        filtedArray[filtedArray.length-1].lineDetails[k].palletDetails.push({

                                            EvolveLocation_Code : postpallets[j].EvolveLocation_Code,
                                            EvolvePurchaseOrder_Number : postpallets[j].EvolvePurchaseOrder_Number,
                                            EvolvePOTransExpriryDate : postpallets[j].EvolvePOTransExpriryDate,
                                            EvolvePOTransPalletNum : postpallets[j].EvolvePOTransPalletNum,
                                            EvolvePoTrans_CustLotRef : postpallets[j].EvolvePoTrans_CustLotRef,
                                            EvolvePOTransPalletQTY : postpallets[j].EvolvePOTransPalletQTY,
                                            EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,

                                        })
                                        entered = true ;
                                        postpallets[j].headPicked =  true ;
                                    }
                                }
                        }

                                    if(entered == true){

                                        postpallets[j].headPicked =  true ;
                                    }else{
                                        filtedArray[filtedArray.length -1 ].lineDetails.push({
                                            EvolvePurchaseOrderDetail_QuantityOrdered :  postpallets[j].EvolvePurchaseOrderDetail_QuantityOrdered,
                                            EvolveUom_Uom :  postpallets[j].EvolveUom_Uom,
                                            EvolvePurchaseOrderDetail_WoLot :  postpallets[j].EvolvePurchaseOrderDetail_WoLot,
                                            EvolvePurchaseOrderDetail_WoOp :  postpallets[j].EvolvePurchaseOrderDetail_WoOp,
                    
                                            EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,
                                            EvolveItem_ShelfLife : postpallets[j].EvolveItem_ShelfLife ,
                                            EvolveItem_Code : postpallets[j].EvolveItem_Code ,
                                            EvolvePurchaseOrderDetail_Line : postpallets[j].EvolvePurchaseOrderDetail_Line ,

                                            palletDetails: [{
                                                EvolveLocation_Code : postpallets[j].EvolveLocation_Code,
                                                EvolvePurchaseOrder_Number : postpallets[j].EvolvePurchaseOrder_Number,
                                                EvolvePOTransExpriryDate : postpallets[j].EvolvePOTransExpriryDate,
                                                EvolvePOTransPalletNum : postpallets[j].EvolvePOTransPalletNum,
                                                EvolvePoTrans_CustLotRef : postpallets[j].EvolvePoTrans_CustLotRef,
                                                EvolvePOTransPalletQTY : postpallets[j].EvolvePOTransPalletQTY,
                                                EvolvePoTrans_LotNumber : postpallets[j].EvolvePoTrans_LotNumber ,
        
                                            }] ,
                                        })
                                        postpallets[j].headPicked =  true ;


                                    }
                        



                                }

                            }                    

                        }
                    }
                    }

                    for(let i = 0; i<filtedArray.length ; i++)
                    {
                    if(error == false){
                        let ioData = {
                        EvolveIO_Data: filtedArray[i],
                        EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
                        EvolveIO_Code: "EVOLVEPOOB", // EVOLVEPOOB = po receive
                        EvolveIO_Data_Formate: "XML",
                        EvolveIO_ERP_Type: "QAD",
                        EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                        EvolveIO_File_Data: ''
                        }

                        let addIOData = await Evolve.App.Services.Wms.PurchaseOrder.SrvV1.addIOData(ioData);
                        if (addIOData instanceof Error) {
                            
                            error = true;
                            Evolve.Log.error("EERR0025 : Error while add data in  IO")
                        }
                        else {
                            error = false
                        }
                    }
                    }
                    if (error == false) {
                        let obj = { statusCode: 200, status: "success", message: "Posted To Erp successfully", result: '' };
                        res.send(obj);
                    }
                    else {
                        let obj = { statusCode: 400, status: "fail", message: 'Error Post to Erp!', result: null };
                        res.send(obj);
                    }
                 }

            }
        } catch (error) {
            Evolve.Log.error(" EERR0049: Error while posting to erp "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0049: Error while posting to erp ", result: null };
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