const Evolve = require("../../../Boot/Evolve");

module.exports = {


    wmsSidebarMenuList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let sidebarMenuList = await Evolve.App.Services.Wms.EwsServices.getWmsSidebarMenuList(req.body);
            let menuList = [];
            for (let i = 0; i < sidebarMenuList.recordsets[0].length; i++) {

                // Find Child Link 
                let childLink = await Evolve.App.Services.Wms.EwsServices.getWmsSidebarMenuChildLinkList(sidebarMenuList.recordsets[0][i].EvolveMenu_Id);
                let childs = [];
                for (let i = 0; i < childLink.recordset.length; i++) {
                    console.log(childLink.recordset[i])
                    childs.push(childLink.recordset[i].EvolveMenu_Url);
                }
                menuList.push({
                    id: sidebarMenuList.recordsets[0][i].EvolveMenu_Id,
                    title: sidebarMenuList.recordsets[0][i].EvolveMenu_Name,
                    icon: sidebarMenuList.recordsets[0][i].EvolveMenu_Icon,
                    page: sidebarMenuList.recordsets[0][i].EvolveMenu_Url,
                    childs: childs
                });
            }
            let obj = { statusCode: 200, status: "success", message: "Menu List", result: menuList };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0995: Error while wms Sidebar menu list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0995: Error while wms Sidebar menu list "+error.message, result: null };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let uomList = await Evolve.App.Services.Wms.EwsServices.getUomList();
            let obj = { statusCode: 200, status: "success", message: "Uom List", result: uomList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0996: Error while getting Uom list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0996: Error while getting Uom list "+error.message, result: null };
            res.send(obj);
        }
    },

    getAllPoList: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.EwsServices.getAllPoList();
            let obj = { statusCode: 200, status: "success", message: "PoList List", result: poList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0997: Error while getting Po List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0997: Error while getting Po List "+ error.message, result: null };
            res.send(obj);
        }
    },

    getPo: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.EwsServices.getPo(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "PoList List", result: poList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0998: Error while getting Po  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0998: Error while getting Po  "+error.message, result: null };
            res.send(obj);
        }
    },


    getPoDetailsByPoId: async function (req, res) {
        try {
            let poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPoDetailsByPoId(req.body.EvolvePurchaseOrder_ID);

            let poData = await Evolve.App.Services.Wms.EwsServices.getPoById(req.body.EvolvePurchaseOrder_ID);

            let supplier = {};

            if (poData instanceof Error || poData.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: null };
                res.send(obj);
            } else {
                let supplierData = await Evolve.App.Services.Wms.EwsServices.getSupplierById(poData.recordsets[0][0].EvolveSupplier_ID);

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
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
    },

    getPoDetailsByLineNumberAndPoId: async function (req, res) {
        try {
            let poDetailsList = [];

            if (req.body.EvolvePurchaseOrderDetail_Line == 0) {
                // console.log("Line 000000")
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPoDetailsByPurchaseOrderId(req.body.EvolvePurchaseOrder_ID);
            } else {
                console.log("Line []")
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPoDetailsByLineNumberAndPoId(req.body.EvolvePurchaseOrder_ID, req.body.EvolvePurchaseOrderDetail_Line);
            }

            // console.log("poDetailsList::", poDetailsList)

            let obj = { statusCode: 200, status: "success", message: "PoList Details List ", result: poDetailsList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0999: Error while getting Po Details By Po Id "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0999: Error while getting Po Details By Po Id "+error.message, result: null };
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

            // Chek Quantity 

            if (req.body.CurrentUOM != req.body.CurrentUOM) {

                // Convert Recive Quantity to Orignal Quantity.
                // let data = {
                //     CurrentUOM : '',
                //     ContverUOM : '',
                //     EvolveItem_ID : ''
                // }

                // let Conversion = await Evolve.App.Services.Wms.EwsServices.checkUomConv(data);
                // if(responce instanceof Error || responce.rowsAffected < 1){
                //     let obj = { statusCode: 400, status: "fail", message: "No Conversation Found!", result: null };
                //     res.send(obj);
                // }else{
                //     let obj = { statusCode: 200, status: "success", message: "Uom Conversation List", result: responce.recordsets[0] };
                //     res.send(obj);
                // }

            }


            let obj = { statusCode: 200, status: "success", message: "Purchase Order Received" };

            // let update_poDetail = await Evolve.App.Services.Wms.EwsServices.updatePurchaseOrder(po_detail_id,po_receive_qty); // Update Purchase Order Receive QTY 
            // if(update_poDetail instanceof Error || update_poDetail.rowsAffected < 1){
            // 	let obj = { statusCode: 400, status: "fail", message: update_poDetail.message, result: null };
            //     res.send(obj);
            // }else{
            let po_barcode = '';
            let get_barcode_details = await Evolve.App.Services.Wms.EwsServices.getBarcodeDetails();  // get po barcode details 
            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: get_barcode_details.message, result: null };
                res.send(obj);
                get_barcode_details = {}
            } else {

                let settings = get_barcode_details.recordsets[0];
                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd  // add 000 zero before digit , if digit would be 1 letter 
                po_barcode = settings[0].EvolveWMS_SettingsPallatePrefix + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                let update_bar = await Evolve.App.Services.Wms.EwsServices.updateNextNumBarcode(last_num, settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                if (update_bar instanceof Error || update_bar.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: update_bar.message, result: null };
                    res.send(obj);
                } else {
                    req.body.EvolveInventory_Refnumber = po_barcode;
                    let add_inventory = await Evolve.App.Services.Wms.EwsServices.receivePurchaseOrder(req.body);
                    if (add_inventory instanceof Error || add_inventory.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: add_inventory.message, result: null };
                        res.send(obj);
                    } else {
                        let update_poDetail = await Evolve.App.Services.Wms.EwsServices.updatePurchaseOrder(po_detail_id, po_receive_qty, req.body.EvolveUser_ID); // Update Purchase Order Receive QTY 
                        if (update_poDetail instanceof Error || update_poDetail.rowsAffected < 1) {
                            let obj = { statusCode: 400, status: "fail", message: update_poDetail.message, result: null };
                            res.send(obj);
                        } else {





                            obj['result'] = { "barcode": po_barcode };
                            res.send(obj);
                        }
                    }
                }
            }
            // }

        } catch (error) {
            Evolve.Log.error(" EERR1000: Error while recieving purchase order "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1000: Error while recieving purchase order "+error.message, result: null };
            res.send(obj);
        }
    },


    checkUomConv: async function (req, res) {
        try {
            let responce = await Evolve.App.Services.Wms.EwsServices.checkUomConv(req.body);
            if (responce instanceof Error || responce.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Conversation Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Uom Conversation List", result: responce.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1001: Error while checking Uom Conv "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR1001: Error while checking Uom Conv" +error.message, result: null };
            res.send(obj);
        }
    },



    // Move Pallet 

    getInventoryItemNumber: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.EwsServices.getInventoryItemNumber();
            let obj = { statusCode: 200, status: "success", message: "item List", result: poList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1002: Error while getting Inventory Item Number "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1002: Error while getting Inventory Item Number "+error.message, result: null };
            res.send(obj);
        }
    },



    getPalletList: async function (req, res) {
        try {
            let poDetailsList = [];
            if (req.body.EvolveItem_ID.length == 0 && req.body.EvolveInventory_Refnumber == '0') {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletList();
            }
            if (req.body.EvolveItem_ID.length != 0 && req.body.EvolveInventory_Refnumber == '0') {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListByItemId(req.body.EvolveItem_ID);
            }
            if (req.body.EvolveItem_ID.length == 0 && req.body.EvolveInventory_Refnumber != '0') {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListByRefnumber(req.body.EvolveInventory_Refnumber);
            }
            if (req.body.EvolveItem_ID.length != 0 && req.body.EvolveInventory_Refnumber != '0') {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListByItemIdAndRefnumber(req.body.EvolveItem_ID, req.body.EvolveInventory_Refnumber);
            }
            // if(req.body.EvolveInventory_Refnumber == '0'){
            //     poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListByItemId(req.body.EvolveItem_ID);
            // } else {
            //     poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListByItemIdAndRefnumber(req.body.EvolveItem_ID, req.body.EvolveInventory_Refnumber);
            // }
            // console.log("poDetailsList :", poDetailsList);
            let obj = { statusCode: 200, status: "success", message: "Pallet List", result: poDetailsList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
    },

    getPalletListExternal: async function (req, res) {
        try {
            let poDetailsList = [];
            poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListExternalByItemIDAndRefnumber(req.body);
            // if(req.body.EvolveInventory_Refnumber == '0'){
            //     poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListExternalByItemId(req.body.EvolveItem_ID);
            // }else{
            //     poDetailsList = await Evolve.App.Services.Wms.EwsServices.getPalletListExternalByItemIdAndRefnumber(req.body.EvolveItem_ID, req.body.EvolveInventory_Refnumber);
            // }
            let obj = { statusCode: 200, status: "success", message: "Pallet List", result: poDetailsList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1003: Error while getting pallet list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1003: Error while getting pallet list "+error.message, result: null };
            res.send(obj);
        }
    },


    getReasonList: async function (req, res) {
        try {
            let reasonList = await Evolve.App.Services.Wms.EwsServices.getReasonList();
            let obj = { statusCode: 200, status: "success", message: "Reason List", result: reasonList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1004: Error while getting reason list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1004: Error while getting reason list "+error.message, result: null };
            res.send(obj);
        }
    },

    getToLocationList: async function (req, res) {
        try {
            let reasonList = await Evolve.App.Services.Wms.EwsServices.getToLocationList(req.body.EvolveLocation_ID);
            let obj = { statusCode: 200, status: "success", message: "location List", result: reasonList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1005: Error while getting to location list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1005: Error while getting to location list "+error.message, result: null };
            res.send(obj);
        }
    },

    movePallet: async function (req, res) {
        try {
            console.log("old function called >> ")
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let invnt = await Evolve.App.Services.Wms.EwsServices.getInventoryById(req.body.EvolveInventory_ID);
            if (invnt instanceof Error || invnt.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: null };
                res.send(obj);
            } else {
                // console.log(invnt.recordsets[0][0].EvolveInventory_QtyOnHand)
                // console.log(req.body.EvolveInventory_QtyAllocated)
                if (invnt.recordsets[0][0].EvolveInventory_QtyOnHand >= parseInt(req.body.EvolveInventory_QtyAllocated)) {
                    req.body.EvolveInventory_QtyOnHand = parseFloat(invnt.recordsets[0][0].EvolveInventory_QtyOnHand - req.body.EvolveInventory_QtyAllocated);
                    let result = {};
                    let new_inv = {};
                    req.body.EvolveItem_ID = invnt.recordsets[0][0].EvolveItem_ID
                    req.body.EvolveInventory_Lotnumber = invnt.recordsets[0][0].EvolveInventory_Lotnumber
                    req.body.EvolveInventory_Refnumber = invnt.recordsets[0][0].EvolveInventory_Refnumber
                    let checkInv = await Evolve.App.Services.Wms.EwsServices.movePalletCheckInv(req.body);
                    if (checkInv instanceof Error) {
                        let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: null };
                        res.send(obj);
                    } else {
                        if (checkInv.rowsAffected == 0) {
                            new_inv = await Evolve.App.Services.Wms.EwsServices.movePalletInsert(req.body, invnt.recordsets[0][0]);
                            await Evolve.App.Services.Wms.EwsServices.movePalletHistory(req.body);
                        } else {
                            let newQty = parseInt(checkInv.recordset[0].EvolveInventory_QtyOnHand) + parseInt(req.body.EvolveInventory_QtyAllocated)
                            new_inv = await Evolve.App.Services.Wms.EwsServices.movePalletUpdate(checkInv.recordset[0].EvolveInventory_ID, newQty, req.body.EvolveReason_ID, req.body.EvolveUser_ID);
                            await Evolve.App.Services.Wms.EwsServices.movePalletHistory(req.body);
                        }
                    }

                    if (req.body.EvolveInventory_QtyOnHand <= 0) {
                        result = await Evolve.App.Services.Wms.EwsServices.movePalletAndDeleteRow(req.body);
                        await Evolve.App.Services.Wms.EwsServices.movePalletHistory(req.body);
                    } else {
                        result = await Evolve.App.Services.Wms.EwsServices.movePallet(req.body);
                        await Evolve.App.Services.Wms.EwsServices.movePalletHistory(req.body);
                    }



                    let LocationData = await Evolve.App.Services.Wms.EwsServices.getLocationDetails(req.body.EvolveToLocation_ID);
                    let itemData = await Evolve.App.Services.Wms.EwsServices.getItemDetails(req.body.EvolveItem_ID);
                    if (LocationData instanceof Error || itemData instanceof Error) {

                    } else {
                        console.log("LocationData :", LocationData)
                        console.log("itemData :", itemData)

                        /** PUT TO LIGHT */
                        let deviceCode = '855750545456092825';
                        let jsonData = JSON.stringify({
                            ID: deviceCode,
                            Device: 'P2L',
                            TID: Math.floor(Math.random() * 9999) + 1000,
                            data: [1, 0, 1, 1, 0, 7, itemData.recordset[0].EvolveItem_Desc, "QTY : " + req.body.EvolveInventory_QtyAllocated, LocationData.recordset[0].EvolveLocation_Name]
                        });
                        console.log("Task Sent >>>> :", jsonData)
                        if (Evolve.Config.mqtt == '1') {
                            Evolve.MqttClient.publish('evolvefcus', jsonData);
                        }

                        /**  */
                    }









                    if (result instanceof Error || result.rowsAffected < 1) {
                        let obj = { statusCode: 400, status: "fail", message: "Error on Query", result: null };
                        res.send(obj);
                    } else {
                        let obj = { statusCode: 200, status: "success", message: "Move successfully", result: null };
                        res.send(obj);
                    }
                } else {
                    let obj = { statusCode: 400, status: "fail", message: "Invalid quantity allocated ", result: null };
                    res.send(obj);
                }
            }



        } catch (error) {
            Evolve.Log.error(" EERR1006: Error while moving pallet "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1006: Error while moving pallet "+error.message, result: null };
            res.send(obj);
        }
    },


    // Production Booking




    getProductionOrdersItemNumber: async function (req, res) {
        try {
            let productionOrdersItemNumberList = await Evolve.App.Services.Wms.EwsServices.getProductionOrdersItemNumber();
            let obj = { statusCode: 200, status: "success", message: "Production Orders Item Number List", result: productionOrdersItemNumberList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1007: Error while getting production Orders Item number "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1007: Error while getting production Orders Item number "+error.message, result: null };
            res.send(obj);
        }
    },

    getIssueList: async function (req, res) {
        try {
            let poDetailsList = [];
            if (req.body.EvolveInventory_RefNumber == '0') {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getIssueListByItemId(req.body.EvolveItem_ID);
            } else {
                poDetailsList = await Evolve.App.Services.Wms.EwsServices.getIssueListByItemIdAndRefnumber(req.body.EvolveItem_ID, req.body.EvolveInventory_RefNumber);
            }
            let obj = { statusCode: 200, status: "success", message: "Issue List", result: poDetailsList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1008: Error while getting Issue list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1008: Error while getting Issue list "+error.message, result: null };
            res.send(obj);
        }
    },

    addIssue: async function (req, res) {
        try {
            req.body.EvolveCompany_ID = req.EvolveCompany_ID
            req.body.EvolveUnit_ID = req.EvolveUnit_ID
            req.body.EvolveUser_ID = req.EvolveUser_ID
            response = await Evolve.App.Services.Wms.EwsServices.addIssue(req.body);
            if (response instanceof Error || response.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Issue Add Successfully", result: [] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1009: Error while adding Issue "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1009: Error while adding Issue "+error.message, result: null };
            res.send(obj);
        }
    },

    // Plane Upload


    // getProductionPlanList: async function(req, res) {
    //     try {
    //         let productionPlanList = await Evolve.App.Services.Wms.EwsServices.getProductionPlanList();
    //         let obj = { statusCode: 200, status: "success", message: "Production PlanList", result: productionPlanList.recordsets[0] };
    //         res.send(obj);
    //     } catch (error) {
    //         Evolve.Log.error(error.message);
    //         let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
    //         res.send(obj);
    //     }
    // },



    // publishPlan: async function(req, res) {
    //     try {
    //             req.body.EvolveUser_ID = req.EvolveUser_ID
    //            let  response = await Evolve.App.Services.Wms.EwsServices.publishPlan(req.body);
    //             if(response instanceof Error || response.rowsAffected < 1){
    //                 let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
    //                 res.send(obj);
    //             }else{
    //                 let obj = { statusCode: 200, status: "success", message: "Plan Publish Successfully", result: [] };
    //                 res.send(obj);
    //             }
    //         } catch (error) {
    //             Evolve.Log.error(error.message);
    //             let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
    //             res.send(obj);
    //         }
    // },

    subContractorIssue: async function (req, res) {
        try {
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let response = await Evolve.App.Services.Wms.EwsServices.subContractorIssue(req.body);
            if (response instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                console.log("response ::", response)
                let obj = { statusCode: 200, status: "success", message: "Issue Added Successfully !", result: response };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1010: Error in sub Contractor Issue "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1010: Error in sub Contractor Issue "+error.message, result: null };
            res.send(obj);
        }
    },

    getExternalLocationList: async function (req, res) {
        try {
            let reasonList = await Evolve.App.Services.Wms.EwsServices.getExternalLocationList();
            let obj = { statusCode: 200, status: "success", message: "location List", result: reasonList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1011: Error while getting External Location List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1011: Error while getting External Location List "+error.message, result: null };
            res.send(obj);
        }

    },



    getHistoryReportToday: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;
            //   console.log("------------------------------------------------------------")
            //   console.log("Histroy Req    : ",req.body);
            //   console.log("Histroy Params : ",req.params);
            //   console.log("------------------------------------------------------------")
            let historyReportCount = await Evolve.App.Services.Wms.EwsServices.getHistoryReportCountToday();
            let historyReport = await Evolve.App.Services.Wms.EwsServices.getHistoryReportDatatableListToday(start, length);

            var obj = {
                'draw': req.body.draw,
                'recordsTotal': historyReportCount.recordset[0].count,
                'recordsFiltered': historyReportCount.recordset[0].count,
                'data': historyReport.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1012: Error while getting History Report Today "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1012: Error while getting History Report Today "+error.message, result: null };
            res.send(obj);
        }
    },


    getLocationList: async function (req, res) {
        try {
            let locationList = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getLocationList();
            let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
        }
    },

    getHistoryReportFilterd: async function (req, res) {
        try {
            //   let start = parseInt(req.query.start);
            //   let length = parseInt(req.query.length);
            //   let search = req.query.search.value;

            //   let historyReportCount = await Evolve.App.Services.Wms.EwsServices.getHistoryReportCountFilterd(req.body.startDate,req.body.endDate);
            //   let historyReport = await Evolve.App.Services.Wms.EwsServices.getHistoryReportDatatableListFilterd(req.body.startDate,req.body.endDate,start,length);
            let historyReportCount = await Evolve.App.Services.Wms.EwsServices.getHistoryReportCountFilterd(req.body.start_date, req.body.end_date);
            let historyReport = await Evolve.App.Services.Wms.EwsServices.getHistoryReportDatatableListFilterd(req.body.start_date, req.body.end_date);
            var obj = {
                'draw': req.query.draw,
                'recordsTotal': historyReportCount.recordset[0].count,
                'recordsFiltered': historyReportCount.recordset[0].count,
                'data': historyReport.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1013: Error while getting location list  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1013: Error while getting location list  "+error.message, result: null };
            res.send(obj);
        }
    },


    getInventoryReport: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;
            let searchData = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                item_code: req.body.item_number,
                location: req.body.location,
                location_type: req.body.location_type,
            }
            let invenotryCount = await Evolve.App.Services.Wms.EwsServices.getInventoryReportCountList(searchData);
            let inventory = await Evolve.App.Services.Wms.EwsServices.getInventoryReportDatatableList(start, length, searchData)
            var obj = {
                'draw': req.body.draw,
                'recordsTotal': invenotryCount.recordset[0].count,
                'recordsFiltered': invenotryCount.recordset[0].count,
                'data': inventory.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1014: Error while getting Inventory Report "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1014: Error while getting Inventory Report "+error.message, result: null };
            res.send(obj);
        }
    },

    updateBarcodePrint: async function (req, res) {
        try {
            let response = await Evolve.App.Services.Wms.EwsServices.updateBarcodePrint(req.body.EvolvePurchaseOrderDetail_ID);
            if (response instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Issue Added Successfully !", result: [] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1015: Error while updating Barcode print "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1015: Error while updating Barcode print "+error.message, result: null };
            res.send(obj);
        }
    },


    printBarcode: async function (req, res) {
        try {

            console.log("req.body ::", req.body)

            let item = await Evolve.App.Services.Wms.EwsServices.getItemDetails(req.body.EvolveItem_ID);
            if (item instanceof Error || item.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: item.message, result: null };
                res.send(obj);
            } else {

                let EvolveItem_Code = item.recordset[0].EvolveItem_Code.toString();
                let EvolveItem_Desc = item.recordset[0].EvolveItem_Desc.toString();
                let EvolveInventory_LotNumber = req.body.EvolveInventory_LotNumber.toString();
                let fileName = req.body.EvolvePurchaseOrderDetail_ID.toString();
                let Barcode_ID = req.body.Barcode_ID.toString();
                let Receive_Qty = req.body.Receive_Qty.toString();
                let error = false;

                console.log("EvolveItem_Code :", EvolveItem_Code)
                console.log("EvolveItem_Desc :", EvolveItem_Desc)
                console.log("fileName :", EvolveInventory_LotNumber)
                console.log("Barcode_ID :", Barcode_ID)
                console.log("Receive_Qty :", Receive_Qty)
                console.log("fileName :", fileName)


                let barcode = "^XA^CF0,150^FO200,90^FD" + EvolveItem_Code + "^FS^FO300,290^FD" + Receive_Qty + "^FS^FO300,520^BCN,100,Y,N,N^SN" + Barcode_ID + ",1,Y^FS^XZ";

                // let barcode = "^XA^CF0,150^FO200,90^FDITM001^FS^FO300,290^FD999^FS^FO300,520^BCN,100,Y,N,N^SN855750545456092825,1,Y^FS^XZ";

                /** API code Start Here */


                // let KonnectID = '6881ffbf713c';
                // let url = 'http://192.168.1.33:5141/print?KonnectID='+KonnectID+'&data='+barcode;

                // Evolve.Axios.get(url)
                // .then((response) => {
                //      console.log("response ::", response)
                // })

                // let url = 'http://'+weightScaleId.recordset[0].EvolveDevice_API+":5141/weight";
                //    let url = 'http://192.168.1.33:5141/print';
                //     let jsonData = JSON.stringify({
                //         KonnectID : '6881ffbf713c',
                //         data : barcode
                //     });
                //     console.log("barcode ::", barcode)
                //     console.log("url ::", url)
                //     console.log("jsonData ::", jsonData)
                //     Evolve.Axios.post(url,jsonData)
                //     .then((response) => {
                //          console.log("response ::", response)
                //     })
                //     Evolve.Axios.post(url,{
                //         KonnectID : '6881ffbf713c',
                //         data : barcode
                //     })
                //     .then((response) => {
                //          console.log("response 111::", response)
                //     })





                // let barcode = "^XA^CF0,35^FO300,40^FDITM001^FS^FO350,80^FD0.05^FS^FO200,120^BCN,70,Y,N,N^SNPO0116,1,Y^FS^XZ";

                // const FormData = require('form-data');
                // let form = new FormData();

                // form.append('KonnectID','6881ffbf713c');
                // form.append('data',barcode);

                // // let url = 'http://192.168.1.33:5141/print';
                // //         let jsonData = JSON.stringify({
                // //             KonnectID : '6881ffbf713c',
                // //             data : barcode
                // //         });
                // console.log("form ::", form)
                // Evolve.Axios.create({
                //     headers: form.getHeaders()
                //     }).post('http://192.168.1.33:5141/print', form).then(response => {
                //         console.log(response);
                //     }).catch(error => {
                //     if (error.response) {
                //         console.log(error.response);
                //     }
                //         console.log(error.message);
                //     });

                //          console.log("barcode ::", barcode)
                //        // console.log("url ::", url)
                //       //  console.log("jsonData ::", jsonData)
                //         // Evolve.Axios.post(url,jsonData)
                //         // .then((response) => {
                //         //      console.log("response ::", response)
                //         // })
                //         // Evolve.Axios.post(url,{
                //         //     KonnectID : '6881ffbf713c',
                //         //     data : barcode
                //         // })
                //         // .then((response) => {
                //         //      console.log("response 111::", response)
                //         // })




                let jsonData = JSON.stringify({
                    action: barcode,
                });
                console.log("Task Sent :", jsonData)
                if (Evolve.Config.mqtt == '1') {
                    Evolve.MqttClient.publish('evolveprinters', jsonData);
                }






                /** API Code End Here */

                Evolve.PrintJob.push({
                    EvolvePrintDevice_ID: req.body.EvolvePrintDevice_ID,
                    barcode: Barcode_ID,
                    itemCode: EvolveItem_Code,
                    itemDesc: EvolveItem_Desc,
                    lotNumber: EvolveInventory_LotNumber,
                    recvQty: Receive_Qty,
                });



                // let dateObj = new Date();
                // let crnt_date =dateObj.getDate()+"-"+(dateObj.getMonth() + 1) +"-" +dateObj.getFullYear();
                // let crnt_time =dateObj.getHours()+":" +dateObj.getMinutes()+":"+dateObj.getSeconds();

                // let child = Evolve.ChildProcess.spawn('java',['-jar','PiplPrint.jar',Barcode_ID,EvolveItem_Code,EvolveItem_Desc,crnt_date,Receive_Qty+"KG",EvolveInventory_LotNumber]);

                let obj = { statusCode: 200, status: "success", message: "Barcode Printed Successfuly", result: item.recordset[0] };
                res.send(obj);

            }
        } catch (error) {
            Evolve.Log.error(" EERR1016: Error in printing barcode "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1016: Error in printing barcode "+error.message, result: null };
            res.send(obj);
        }
    },


    getPrintJobList: async function (req, res) {
        try {

            let obj = { statusCode: 200, status: "success", message: "Print JOB LIST Successfuly", result: Evolve.PrintJob };
            res.send(obj);

        } catch (error) {
            Evolve.Log.error(" EERR1017: Error while getting print job list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1017: Error while getting print job list "+error.message, result: null };
            res.send(obj);
        }
    },

    subContractorReport: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;
            let searchData = {
                startDate: req.body.startDate,
                endDate: req.body.endDate,
            }
            let proOrdsCount = await Evolve.App.Services.Wms.EwsServices.subContractorReportCountList(searchData);
            let proOrds = await Evolve.App.Services.Wms.EwsServices.subContractorReportDatatableList(start, length, searchData);
            // console.log("proOrdsCount>>", proOrdsCount.recordset[0].count)
            var obj = {
                'draw': req.body.draw,
                'recordsTotal': proOrdsCount.recordset[0].count,
                'recordsFiltered': proOrdsCount.recordset[0].count,
                'data': proOrds.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1017: Error in sub contractor report  "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1017: Error in sub contractor report  "+error.message, result: null };
            res.send(obj);
        }
    },

    checkItemTrackable: async function (req, res) {
        try {
            let response = await Evolve.App.Services.Wms.EwsServices.checkItemTrackable(req.body);
            if (response instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Check Item Trackable!", result: response.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1019: Error while checking Item trackable "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1019: Error while checking Item trackable "+error.message, result: null };
            res.send(obj);
        }
    },


    getItem: async function (req, res) {
        try {
            let poList = await Evolve.App.Services.Wms.EwsServices.getItem(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Item List", result: poList.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR1020: Error while getting item "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR1020: Error while getting item "+error.message, result: null };
            res.send(obj);
        }
    },

    //  <<<<---------- Get Exit  ---------->>>>>

    // start function getallInvoice
    getallInvoice: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.EwsServices.getallInvoice(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "not Invoice data",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1021: Error while getting all Invoice "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1021: Error while getting all Invoice "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // end function getallInvoice

    // start function getallInvoiceDo
    getallInvoiceDo: async function (req, res) {
        try {
            let getSingleInvoice = await Evolve.App.Services.Wms.EwsServices.getSingleInvoice(req.body);
            if (getSingleInvoice instanceof Error || getSingleInvoice.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Invoice Data Not Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let getDoSoNo = await Evolve.App.Services.Wms.EwsServices.getDoSoNo(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
                if (getDoSoNo instanceof Error || getDoSoNo.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "DO Not Found",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "suceess",
                        result: getDoSoNo.recordset
                    };
                    res.send(obj);
                }
            }
        }
        catch (error) {
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
    //end function getallInvoiceDo

    // start function getDoSoInvoice
    getDoSoInvoice: async function (req, res) {
        try {
            let getSingleInvoice = await Evolve.App.Services.Wms.EwsServices.getSingleInvoice(req.body);
            if (getSingleInvoice instanceof Error || getSingleInvoice.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Invoice Data Not Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let getDoSoNo = await Evolve.App.Services.Wms.EwsServices.getDoSoNo(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
                if (getDoSoNo instanceof Error || getDoSoNo.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "DO Line Not Found",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    let getSingleSalesOrder = await Evolve.App.Services.Wms.EwsServices.getSingleSalesOrder(getSingleInvoice.recordset[0].EvolveInvoice_SONumber);
                    if (getSingleSalesOrder instanceof Error || getSingleSalesOrder.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "SO Data Not Found",
                            result: null
                        };
                        res.send(obj);
                    }
                    else {
                        let result = [getSingleInvoice.recordset, getDoSoNo.recordset, getSingleSalesOrder.recordset];
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "suceess",
                            result: result
                        };
                        res.send(obj);
                    }
                }
            }
        }
        catch (error) {
            Evolve.Log.error(" EERR1022: Error while getting all invoice do "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1022: Error while getting all invoice do "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // end function getDoSoInvoice

    // start function getSingleDo
    getSingleDo: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.EwsServices.getSingleDo(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "DO Line Not Found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1023: Error while getting Single Do "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1023: Error while getting Single Do "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // end function getSingleDo

    // start function getexit table data
    getExitTableDate: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.EwsServices.getExitTableDate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Not Data Found",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1024: Error while getting exit table date "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1024: Error while getting exit table date "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // end function get Exit Table data

    //start function addGetExit
    addGetExit: async function (req, res) {
        console.log('addGetExit');
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let exitGateNo = await Evolve.App.Controllers.Unit.unitControllers.getExitGateNumber();
            req.body.EvolveGateExit_SerialNo = exitGateNo.recordset[0].EvolveUnitConfig_Value;
            let exitGateError = false;
            let getdoNumber = await Evolve.App.Services.Wms.EwsServices.getdoNumber(req.body.EvolveDO_ID);
            if (getdoNumber instanceof Error || getdoNumber.rowsAffected < 1) {
                exitGateError = true;
            }
            else {
                req.body.EvolveDO_Number = getdoNumber.recordset[0].EvolveDO_Number;
                for (let i = 0; i < req.body.EvolveDOLine.length; i++) {
                    if (exitGateError == false) {
                        let EvolveDOLine_ID = req.body.EvolveDOLine[i].EvolveDOLine_ID;
                        let getdolineNumber = await Evolve.App.Services.Wms.EwsServices.getdolineNumber(EvolveDOLine_ID);
                        if (getdolineNumber instanceof Error || getdolineNumber.rowsAffected < 1) {
                            exitGateError = true;
                        }
                        else {
                            req.body.EvolveDOLine_Number = getdolineNumber.recordset[0].EvolveDOLine_Number;
                            console.log('doNumber', req.body.EvolveDO_Number)
                            console.log('doLineNumber', req.body.EvolveDOLine_Number)
                            let result = await Evolve.App.Services.Wms.EwsServices.addGetExit(req.body);
                            if (result instanceof Error || result.rowsAffected < 1) {
                                exitGateError = true;
                            }
                            else {
                                let InvoiceStatus = await Evolve.App.Services.Wms.EwsServices.updateInvoiceStatus(req.body);
                                let DOStatus = await Evolve.App.Services.Wms.EwsServices.updateDOStatus(req.body);
                                let DOLineStatus = await Evolve.App.Services.Wms.EwsServices.updateDOLineStatus(EvolveDOLine_ID);
                                let getSOLine_Id = await Evolve.App.Services.Wms.EwsServices.getSOLine_Id(EvolveDOLine_ID);
                                let SOLineStatus = await Evolve.App.Services.Wms.EwsServices.updateSOLineStatus(getSOLine_Id.recordset[0].EvolveSalesOrderLine_ID);
                                let getOpenSOLineCnt = await Evolve.App.Services.Wms.EwsServices.getOpenSOLineCnt(req.body);
                                if (parseInt(getOpenSOLineCnt.recordset[0].openSoLines) == 0) {
                                    let updateSoStatusByNumber = await Evolve.App.Services.Wms.EwsServices.updateSoStatusByNumber(req.body);
                                    console.log('So Line Update')
                                }
                                console.log('success Add Get Exit');
                            }
                        }
                    }
                }
            }
            if (exitGateError == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "not data add",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Gate Exit No : " + req.body.EvolveGateExit_SerialNo,
                    result: null
                };
                res.send(obj);
                let updateexitGateNo = await Evolve.App.Controllers.Unit.unitControllers.updateExitGateNumber();
            }
        } catch (error) {
            Evolve.Log.error(" EERR1025: Error while adding get exit "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR1025: Error while adding get exit "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    // end function addGetExit





}



function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}