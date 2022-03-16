'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getProductionOrderList: async function(req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
    // let search = req.body.search;
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      }
  
        let proOrdsCount = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getProductionOrderCountList(searchData);
        let proOrds = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getProductionOrderDatatableList(start, length, searchData);
  
        if (proOrds instanceof Error) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while get Production Order !",
            parselList: null
          };
          res.send(obj);
        }
        else{
          let resObj = {
            noOfRecord: proOrdsCount.recordset[0].count,
            records: proOrds.recordset
          }
  
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Production Order",
            result: resObj,
          };
          res.send(obj);
        }
        
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
  },
  
  getItemDescCustPart: async function(req, res) {
    try {
        let getItemDescCustPart = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getItemDescCustPart(req.body);
        if(getItemDescCustPart instanceof Error || getItemDescCustPart.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error To Get Item Desc. And Cust Part", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "getItemList List", result: getItemDescCustPart.recordset };
          res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  
  createWorkOrder: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID
        req.body.EvolveCompany_ID = req.EvolveCompany_ID
        req.body.EvolveUnit_ID = req.EvolveUnit_ID
        let createWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.createWorkOrder(req.body);
        if(createWorkOrder instanceof Error || createWorkOrder.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error While Create Work Order", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Work Order Created Successfully !", result: null };
          res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  
  startWorkOrder: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID
        req.body.EvolveCompany_ID = req.EvolveCompany_ID
        req.body.EvolveUnit_ID = req.EvolveUnit_ID
        let startWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.startWorkOrder(req.body);
        if(startWorkOrder instanceof Error || startWorkOrder.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error While Start Work Order", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Work Order Started Successfully !", result: null };
          res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  
  
  detailWorkOrder: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID
        req.body.EvolveCompany_ID = req.EvolveCompany_ID
        req.body.EvolveUnit_ID = req.EvolveUnit_ID
        let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.detailWorkOrder(req.body);
        if(detailWorkOrder instanceof Error || detailWorkOrder.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Order Detail", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Work Order Started Successfully !", result: detailWorkOrder.recordset };
          res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  printProdOrder: async function(req, res) {
    try {
        let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.printProdOrder(req.body);
        if(detailWorkOrder instanceof Error || detailWorkOrder.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Order Detail", result: null };
          res.send(obj);
        } else {
            let wo_no = detailWorkOrder.recordset[0].EvolveProdOrders_Order;
            let barcode = detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;
            let qty = detailWorkOrder.recordset[0].EvolveProdOrders_Quantity;
            let ZplData = "^XA\r\n"+
            "^MMT^PW360\r\n"+
            "^LL0160^LS0\r\n"+
            "^FT55,152^BQN,2,4\r\n"+
            "^FH\r\n"+
            "^FDMA,^SN##"+barcode+",1,Y^FS\r\n"+
            "^FT281,20^A0I,25,24^FH^FD^SN"+barcode+",1,Y^FS\r\n"+
            "^PQ"+qty+",0,1,Y^XZ"; 
            console.log("Evolve.ConfigData.App.dirWorkOrderPrint>>" ,  Evolve.ConfigData.App.dirWorkOrderPrint)
            Evolve.Fs.writeFile(Evolve.ConfigData.App.dirWorkOrderPrint+'/'+wo_no+'.txt',ZplData,function(err){
              if(err){
                let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                res.send(obj);
              } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order Printed Successfully", result: null };
                res.send(obj);
              }
            });
          // for(let i= 0 ; i < detailWorkOrder.rowsAffected; i++){
          //   let barcode = detailWorkOrder.recordset[i].EvolveProdOrdersDetail_Serial;
          //   let ZplData = "^XA\r\n"+
          //   "^MMT^PW360\r\n"+
          //   "^LL0160^LS0\r\n"+
          //   "^FT55,152^BQN,2,4\r\n"+
          //   "^FH\r\n"+
          //   "^FDMA,"+barcode+"^FS\r\n"+
          //   "^FT281,20^A0I,25,24^FH^FD"+barcode+"^FS\r\n"+
          //   "^PQ1,0,1,Y^XZ"; 
          //   Evolve.Fs.writeFile(Evolve.ConfigData.App.dirWorkOrderPrint+'/'+barcode+'.txt',ZplData,function(err){
          //     if(err){
          //       // let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
          //       // res.send(obj);
          //     } else {
          //       // let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
          //       // res.send(obj);
          //     }
          //   });
          // }
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  
  
  getAllItem: async function(req, res) {
    try {
        let getItemList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getAllItem();
        let obj = { statusCode: 200, status: "success", message: "getItemList List", result: getItemList.recordset };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  getWorkOrderDetail: async function(req, res) {
    try {
        let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getWorkOrderDetail(req.body.EvolveProdOrdersDetail_ID);
        if(detailWorkOrder instanceof Error || detailWorkOrder.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Order Detail", result: null };
          res.send(obj);
        } else {
          let obj = { statusCode: 200, status: "success", message: "Work Order Started Successfully !", result: detailWorkOrder.recordset[0] };
          res.send(obj);
        }
    } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
    }
  },
  closeWorkOrder: async function(req, res) {
    try {
        req.body.EvolveUser_ID = req.EvolveUser_ID
         let  response = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.closeWorkOrder(req.body);
        if(response instanceof Error || response.rowsAffected < 1){
          let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
          res.send(obj);
        }else{
          let obj = { statusCode: 200, status: "success", message: "Work Order Close Successfully", result: [] };
          res.send(obj);
        }
      } catch (error) {
        Evolve.Log.error(error.message);
        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
        res.send(obj);
      }
    },
    
printProdOrderSerial: async function(req, res) {
  try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.printProdOrderSerial(req.body.EvolveProdOrdersDetail_ID);
      if(detailWorkOrder instanceof Error || detailWorkOrder.rowsAffected < 1){
        let obj = { statusCode: 400, status: "fail", message: "Error While Get Work Order Detail", result: null };
        res.send(obj);
      } else {
        let barcode = detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;
        let itemCode = detailWorkOrder.recordset[0].EvolveItem_Code
        let ZplData = "^XA\r\n"+
        "^MMT^PW360\r\n"+
        "^LL0160^LS0\r\n"+
        "^FT55,152^BQN,2,4\r\n"+
        "^FH\r\n"+
        "^FDMA,"+barcode+"^FS\r\n"+
        "^FT281,20^A0I,25,24^FH^FD"+barcode+"^FS\r\n"+
        "^PQ1,0,1,Y^XZ"; 
        Evolve.Fs.writeFile(Evolve.ConfigData.App.dirWorkOrderPrint+'/'+barcode+'.txt',ZplData,function(err){
          if(err){
            let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
            res.send(obj);
          } else {
            let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
            res.send(obj);
          }
        });
      }
  } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
  }
},
getWorkCenterList: async function(req, res) {
  try {
      let getWorkCenterList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPoV2.getWorkCenterList();
      let obj = { statusCode: 200, status: "success", message: "getWorkCenter List", result: getWorkCenterList.recordsets[0] };
      res.send(obj);
  } catch (error) {
      Evolve.Log.error(error.message);
      let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
      res.send(obj);
  }
},

  



}
