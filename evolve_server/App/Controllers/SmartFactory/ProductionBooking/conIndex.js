'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    getLocationList: async function (req, res) {
        try {
            let locationList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getLocationList();
            let obj = { statusCode: 200, status: "success", message: "location List", result: locationList.recordsets[0]};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0682: Error while getting Location List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0682: Error while getting Location List "+error.message, result: null };
            res.send(obj);
        }
    },
    
    getOperatorList: async function (req, res) {
        try {
            let opratorList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getOperatorList();
            let obj = {statusCode: 200, status: "success", message: "Oprator List", result: opratorList.recordset };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0683: Error while getting Operator List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0683: Error while getting Operator List "+error.message, result: null };
            res.send(obj);
        }
    },

    getMachineAndSection: async function (req, res) {
        try {
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getMachineAndSection = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getMachineAndSection(req.body.EvolveUser_ID);
            let obj = { statusCode: 200, status: "success", message: "Machine List", result: getMachineAndSection.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0684: Error while getting Machine And Section "+error.message);
            let obj = {statusCode: 400, status: "fail", message: " EERR0684: Error while getting Machine And Section "+error.message, result: null };
            res.send(obj);
        }
    },

    getWorkCenterList: async function (req, res) {
        try {
            let getWorkCenterList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getWorkCenterList();
            let obj = { statusCode: 200, status: "success", message: "getWorkCenter List", result: getWorkCenterList.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0685: Error while getting Work Center List "+error.message);
            let obj = {statusCode: 400, status: "fail", message: " EERR0685: Error while getting Work Center List "+error.message, result: null };
            res.send(obj);
        }
    },

    getMachineListBySectionId: async function (req, res) {
        try {
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let machineList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getMachineListBySectionId(req.body.workCenterId,req.body.EvolveUser_ID);
            let obj = {statusCode: 200,status: "success",message: "Machine List",result: machineList.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0686: Error while getting Machine List By Section Id "+error.message);
            let obj = {statusCode: 400,status: "fail",message: " EERR0686: Error while getting Machine List By Section Id "+error.message,result: null};
            res.send(obj);
        }
    },
    
    getLocationByMachine: async function (req, res) {
        try {
            let locationList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getLocationByMachine(req.body.EvolveMachine_ID);
            let obj = {statusCode: 200, status: "success", message: "location List", result: locationList.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0687: Error while getting Location By Machine "+error.message);
            let obj = {statusCode: 400,status: "fail", message: " EERR0687: Error while getting Location By Machine "+error.message, result: null};
            res.send(obj);
        }
    },


    getItemListByWorkOrder: async function (req, res) {
        try {
            let itemList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getItemListByWorkOrder(req.body.EvolveProdOrders_ID);
            let obj = {statusCode: 200, status: "success", message: "Item List", result: itemList.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0688: Error while getting Item List By Work Order "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0688: Error while getting Item List By Work Order "+error.message, result: null};
            res.send(obj);
        }
    },

    checkPickList: async function (req, res) {
        try {
            let checkPickList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.checkPickList(req.body);
                if (checkPickList.recordset[0].iss_qty != null && checkPickList.recordset[0].req_qty != null) 
                {
                    if (checkPickList.recordset[0].iss_qty >= checkPickList.recordset[0].req_qty)
                    {
                        let obj = {statusCode: 200,status: "success",message: "Pick List",result: "Picklist Issued"};
                        res.send(obj);
                    } else {
                        let obj = {statusCode: 400, status: "error",message: "Pick List",result: "Picklist Not Issued"};
                        res.send(obj);
                    }
                } else {
                    let obj = {statusCode: 400, status: "error", message: "Pick List", result: "Picklist Not Generated"};
                    res.send(obj);
                }
        } catch (error) {
            Evolve.Log.error(" EERR0689: Error while checking Pick List "+error.message);
            let obj = {statusCode: 400,status: "fail",message: " EERR0689: Error while checking Pick List "+error.message,result: null};
            res.send(obj);
        }
    },

    
    checkWoInShift: async function (req, res) {
        try {
            let checkWoInShift = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkWoInShift(req.body);
            if (checkWoInShift.rowsAffected[0] > 0) {
                let obj = {statusCode: 200, status: "success",message: "Check Shift",result: "Work Order Is In Shift"};
                res.send(obj);
            } else {
                let obj = {statusCode: 400,status: "error",message: "Check Shift",result: "Work Order Not Is In Shift"};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0690: Error while checking  Wo In Shift "+error.message);
            let obj = {statusCode: 400,status: "fail",message: " EERR0690: Error while checking  Wo In Shift "+error.message,result: null};
            res.send(obj);
        }
    },

    getProdOrdersBom: async function (req, res) {
        try {
            // console.log(req.body);
            let scanningList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getProdOrdersBom(req.body);
            let obj = { statusCode: 200, status: "success", message: "Prodcution Order BOM List", result: scanningList.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0691: Error while getting Prod Orders Bom "+error.message);
            let obj = { statusCode: 400, status: "fail",message: " EERR0691: Error while getting Prod Orders Bom "+error.message,result: null};
            res.send(obj);
        }
    },

    getWorkOrderByItem: async function (req, res) {
        try {
            let wo_lists = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getWorkOrderByItem(req.body);
            let obj = {statusCode: 200,status: "success",message: "WO list",result: wo_lists.recordset};
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0692: Error while getting  Work Order By Item "+error.message);
            let obj = {statusCode: 400,status: "fail",message: " EERR0692: Error while getting  Work Order By Item "+error.message, result: null };
            res.send(obj);
        }
    },

    createOperator: async function (req, res) {
        try {
            //req.body.EvoleCompany_ID = 1;
            let createOperator = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.createOperator(req.body);
            if (createOperator instanceof Error || createOperator.rowsAffected < 1) {
                let obj = {statusCode: 400, status: "fail",message: createOperator.message,result: null };
                res.send(obj);
            } else {
                let obj = {statusCode: 200,status: "success", message: "Operator Add Successfully",result: createOperator.recordset };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0693: Error while creating Operator "+error.message);
            let obj = {statusCode: 400,status: "fail",message: " EERR0693: Error while creating Operator "+error.message,result: null};
            res.send(obj);
        }
    },

    saveInventory: async function (req, res) {
        try {
            req.body.EvolveInventoryStatus_ID = 1;
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            req.body.EvolveInventoryStatus_ID = 1; // Set Default Status ID
            req.body.EvolveTransitionHistory_TypeID = 1;
            let po_barcode = "";
            let get_barcode_details = await Evolve.App.Services.Wms.EwsServices.getBarcodeDetails(); // get po barcode details
            if (get_barcode_details instanceof Error || get_barcode_details.rowsAffected < 1)
            {
                let obj = {statusCode: 400,status: "fail", message: get_barcode_details.message,result: null};
                res.send(obj);
                get_barcode_details = {};
            } 
            else 
            {
                let settings = get_barcode_details.recordsets[0];
                let barcode_num = settings[0].EvolveWMS_SettingsPallateBarEnd; // add 000 zero before digit , if digit would be 1 letter
                po_barcode = "PB" + pad(barcode_num, 4); // Generet New Barcode for Purchase Order Receive
                var last_num = parseInt(settings[0].EvolveWMS_SettingsPallateBarEnd) + 1;
                let update_bar = await Evolve.App.Services.Wms.EwsServices.updateNextNumBarcode(last_num,   settings[0].EvolveWMS_SettingID); // Update EvolveWMSSeting table for next barcode
                if (update_bar instanceof Error || update_bar.rowsAffected < 1) 
                {
                let obj = {statusCode: 400,status: "fail",message: update_bar.message,result: null};
                res.send(obj);
                } 
                else
                {
                    req.body.EvolveInventory_RefNumber = po_barcode;
                    let error = false;
                    if (req.body.EvolveProdOrders_ID == 0) 
                    {
                        let EvolveProdOrdersresult = await Evolve.App.Services.ProductionBooking.srvIndex.EsmartFactoryServices.createProductionOrders(req.body);
                        if (EvolveProdOrdersresult instanceof Error || EvolveProdOrdersresult.rowsAffected < 1)
                        {
                        let obj = {statusCode: 400, status: "fail", message: EvolveProdOrdersresult.message,result: null};
                        res.send(obj);
                        error = true;
                        } else {
                        req.body.EvolveProdOrders_ID = EvolveProdOrdersresult.recordset[0].inserted_id;
                        }
                    }
                    if (error == false) {
                        let saveInventory = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.saveInventoryAndHistory(req.body);
                        if (saveInventory instanceof Error || saveInventory.rowsAffected < 1)
                        {
                        let obj = {statusCode: 400,status: "fail",message: saveInventory.message,result: null};
                        res.send(obj);
                        } else {
                        let obj = {statusCode: 200,status: "success",message: "Inventory Added Successfully",result: req.body.EvolveProdOrders_ID
                        };
                        res.send(obj);
                        }
                    }
                }
          }
        } catch (error) {
          Evolve.Log.error(" EERR0694: Error while saving Inventory "+error.message);
          let obj = {statusCode: 400,status: "fail",message: " EERR0694: Error while saving Inventory "+error.message,result: null };
          res.send(obj);
        }
    },

    getProductionBookingList: async function (req, res) {
        try {
          let productionBookingList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getProductionBookingList(req.body);
          let obj = {statusCode: 200, status: "success", message: "Production Booking List", result: productionBookingList.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0695: Error while getting Production Booking List "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0695: Error while getting Production Booking List "+error.message, result: null };
          res.send(obj);
        }
    },

    moveMachine: async function (req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          req.body.EvolveCompany_ID = req.EvolveCompany_ID;
          req.body.EvolveUnit_ID = req.EvolveUnit_ID;
          let response = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.moveMachine(req.body);
          if (response instanceof Error || response.rowsAffected < 1) {
            let obj = {statusCode: 400, status: "fail", message: response.message, result: null};
            res.send(obj);
          } else {
            let response1 = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.updateProdMachine(req.body);
            if (response1 instanceof Error || response1.rowsAffected < 1) {
                let obj = {statusCode: 400, status: "fail", message: response1.message, result: null};
                res.send(obj);
            } else {
                let obj = {statusCode: 200, status: "success",message: "Move Machine Successfully !",result: null};
                res.send(obj);
            }
          }
        } catch (error) {
          Evolve.Log.error(" EERR0696: Error while moving the Machine "+error.message);
          let obj = {statusCode: 400,status: "fail",message: " EERR0696: Error while moving the Machine "+error.message,result: null };
          res.send(obj);
        }
    },

    
  getWorkOrderList: async function (req, res) {
    try {
      let workOrderList = await Evolve.App.Services.SmartFactory.ProductionBooking.srvIndex.getWorkOrderList(req.body);
      let obj = {statusCode: 200, status: "success", message: "Work Order List", result: workOrderList.recordset};
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0697: Error while getting Work Order List "+error.message);
      let obj = {statusCode: 400, status: "fail", message: " EERR0697: Error while getting Work Order List "+error.message, result: null};
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
  