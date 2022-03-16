'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    checkUomConv: async function (req, res) {
        try {
            let responce = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.checkUomConv(req.body);
            if (responce instanceof Error || responce.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Conversation Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Uom Conversation List", result: responce.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0054: Error while checking Uom Conversation "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0054: Error while checking Uom Conversation "+error.message, result: null };
            res.send(obj);
        }
    },

    getLocationList: async function (req, res) {
        try {
            let locationList = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getLocationList();
            let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0055: Error while getting location list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0055: Error while getting location list "+error.message, result: null };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let uomList = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getUomList();
            let obj = { statusCode: 200, status: "success", message: "Uom List", result: uomList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0056: Error while getting Uom list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0056: Error while getting Uom list "+error.message, result: null };
            res.send(obj);
        }
    },

    getPoDetailsByPoId: async function (req, res) {
        try {
            let poDetailsList = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getPoDetailsByPoId(req.body.EvolvePurchaseOrder_ID);
            let poData = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getPoById(req.body.EvolvePurchaseOrder_ID);
            let supplier = {};
            if (poData instanceof Error || poData.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: null };
                res.send(obj);
            } else {
                let supplierData = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getSupplierById(poData.recordsets[0][0].EvolveSupplier_ID);
                if (supplierData instanceof Error || supplierData.rowsAffected < 1) {
                    supplier = {}
                } else {
                    supplier = supplierData.recordsets[0];
                }
            }

            let result = {
                poDetailsList: poDetailsList.recordsets[0],
                supplier: supplier
            }
            let obj = { statusCode: 200, status: "success", message: "PoList Details List ", result: result };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0057: Error while getting po details by po id"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0057: Error while getting po details by po id "+error.message, result: null };
            res.send(obj);
        }
    },

    
    getPoDetailsByLineNumberAndPoId: async function (req, res) {
        try {
            let poDetailsList = [];
            if (req.body.EvolvePurchaseOrderDetail_Line == 0) {
                poDetailsList = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getPoDetailsByPurchaseOrderId(req.body.EvolvePurchaseOrder_ID);
            } else {
                poDetailsList = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getPoDetailsByLineNumberAndPoId(req.body.EvolvePurchaseOrder_ID, req.body.EvolvePurchaseOrderDetail_Line);
            }
            let obj = { statusCode: 200, status: "success", message: "PoList Details List ", result: poDetailsList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0058: Error while getting Po Details By LineNumber And PoId "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0058: Error while getting Po Details By LineNumber And PoId "+error.message, result: null };
            res.send(obj);
        }
    },

    revicePurchaseOrder: async function (req, res) {
        try {
            // console.log("Call Function : ",req.body);
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let po_detail_id = req.body.EvolvePurchaseOrderDetail_ID;
            let po_receive_qty = req.body.EvolvePurchaseOrderDetail_QuantityReceived;
            let po_barcode = '';
            let get_barcode_details = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.getBarcodeDetails();  // get po barcode details 
            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                res.send(obj);
                get_barcode_details = {}
            } else {
                let settings = get_barcode_details.recordsets[0];
                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                let last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                let update_bar = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                    res.send(obj);
                } else {
                    req.body.EvolveInventory_Refnumber = po_barcode;
                    let add_inventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.receivePurchaseOrder(req.body);
                    if (add_inventory instanceof Error || add_inventory.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: add_inventory.message, result: null };
                        res.send(obj);
                    } else {
                        let update_poDetail = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.updatePurchaseOrder(po_detail_id, po_receive_qty, req.body.EvolveUser_ID); // Update Purchase Order Receive QTY 
                        if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {
                            let obj = { statusCode: 400, status: "fail", message: update_poDetail.message, result: null };
                            res.send(obj);
                        } else {               
                            let obj = { statusCode: 200, status: "success", message: "Purchase Order Received" , result : { "barcode": po_barcode }};
                            res.send(obj);
                        }
                    }
                }
            }
            // }

        } catch (error) {
            Evolve.Log.error("EERR0059: Error while recieving purchase order"+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0059: Error while recieving purchase order "+error.message, result: null };
            res.send(obj);
        }
    },

    
    updateBarcodePrint: async function (req, res) {
        try {
            let response = await Evolve.App.Services.Wms.PurchaseOrder.SrvReceive.updateBarcodePrint(req.body.EvolvePurchaseOrderDetail_ID);
            if (response instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Issue Added Successfully !", result: [] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0060: Error while updating barcode print "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0060: Error while updating barcode print "+error.message, result: null };
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