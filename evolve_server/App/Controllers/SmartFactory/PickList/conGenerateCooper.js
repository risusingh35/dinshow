'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    
getPickListByWorkOrderCount: async function(req, res) {
    try {
        let picklistCount =Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getPickListByWorkOrderCountList(req.body);
        let obj = { statusCode: 200, status: "success", message: "Item List", result: picklistCount.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0608: Error while getting pick list by work order count "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0608: Error while getting pick list by work order count "+error.message, result: null };
        res.send(obj);
    }
  },
  
  
  

getPickListByWorkOrder: async function(req, res) {
    try {
      let start = parseInt(req.query.start);
      let length = parseInt(req.query.length);
      let searchData = {
        EvolveSection_ID : req.query.EvolveSection_ID,
        EvolveMachine_ID : req.query.EvolveMachine_ID,
        EvolveProdOrders_ID : req.query.EvolveProdOrders_ID,
      }
    
  
      if(req.query.EvolveSection_ID != '' && req.query.EvolveMachine_ID != '' && req.query.EvolveProdOrders_ID != ''){
        let pickListCount = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getPickListByWorkOrderCount(searchData);
        let pickList = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getPickListByWorkOrderDatatableList(start,length,searchData);
        let obj = {
          'draw': req.query.draw,
          'recordsTotal': pickListCount.recordset[0].count,
          'recordsFiltered': pickListCount.recordset[0].count,
          'data':pickList.recordset
        };
        res.send(obj);
      }else{
        let obj = {
          'draw': req.query.draw,
          'recordsTotal':0,
          'recordsFiltered': 0,
          'data':[]
        };
        res.send(obj);
      }
      
    } catch (error) {
        Evolve.Log.error(" EERR0609: Error while getting pick list by work order "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0609: Error while getting pick list by work order "+error.message, result: null };
        res.send(obj);
    }
  },
  
getWorkCenterList: async function(req, res) {
    try {
        let getWorkCenterList = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getWorkCenterList();
        let obj = { statusCode: 200, status: "success", message: "getWorkCenter List", result: getWorkCenterList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0610: Error while getting Work Center List "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0610: Error while getting Work Center List "+error.message, result: null };
        res.send(obj);
    }
  },

getMachineList: async function(req, res) {
    try {
        req.body.EvolveUnit_ID = req.EvolveUnit_ID;
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let machineList = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getMachineList();
        let obj = { statusCode: 200, status: "success", message: "Machine List", result: machineList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0611: Error while getting machine list "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0611: Error while getting machine list "+error.message, result: null };
        res.send(obj);
    }
  },

  getWorkOrderList: async function(req, res) {
    try {
        let workOrderList = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getWorkOrderList();
        let obj = { statusCode: 200, status: "success", message: "Work Order List", result: workOrderList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0612: Error while getting Work Order List "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0612: Error while getting Work Order List "+error.message, result: null };
        res.send(obj);
    }
  },

  generatePickList: async function(data) {
    try {
      // req.body.EvolveUser_ID = req.EvolveUser_ID;
      // req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      // req.body.EvolveUnit_ID = req.EvolveUnit_ID
      return await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.generatePickList(data);
  
      // if(response instanceof Error || response.rowsAffected < 1){
      //     let obj = { statusCode: 400, status: "fail", message: response.message, result: null };
      //     res.send(obj);
      // }else{
      //     let obj = { statusCode: 200, status: "success", message: "Picklist Generated Successfully !", result: [] };
      //     res.send(obj);
      // }
    } catch (error) {
        Evolve.Log.error(" EERR0613: Error while generating pick list "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0613: Error while generating pick list "+error.message, result: null };
        res.send(obj);
    }
  },

  getShiftList: async function(req, res) {
    try {
      let getShiftList = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getShiftList();
      let obj = { statusCode: 200, status: "success", message: "Shift list", result: getShiftList.recordset};
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0614: Error while getting shift list "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0614: Error while getting shift list "+error.message, result: null };
      res.send(obj);
    }
  },
  getMachineListBySectionId: async function(req, res) {
    try {
        req.body.EvolveUnit_ID = req.EvolveUnit_ID;
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let machineList =await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getMachineListBySectionId(req.body.workCenterId);
        let obj = { statusCode: 200, status: "success", message: "Machine List", result: machineList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0615: Error while getting machine list by section Id "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0615: Error while getting machine list by section Id "+error.message, result: null };
        res.send(obj);
    }
  },
  getWorkOrdersByMachineId: async function(req, res) {
    try {
        req.body.EvolveUnit_ID = req.EvolveUnit_ID;
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        let woList =await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getWorkOrdersByMachineId(req.body.machineId);
        let obj = { statusCode: 200, status: "success", message: "Machine List", result: woList.recordsets[0] };
        res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0616: Errror while getting Work Orders by machine id "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0616: Errror while getting Work Orders by machine id "+error.message, result: null };
        res.send(obj);
    }
  },
  getWoDetails: async function(req, res) {
    try 
    {
      // console.log(req.body);
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let andkey = true;
      let condition = "";
      if (req.body.startDate != "" && req.body.endDate != "") {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition = condition+"cast(epo.EvolveProdOrders_CreatedAt as date) >="+"'"+req.body.startDate+"'"+" and cast(epo.EvolveProdOrders_UpdatedAt as date) <="+"'" +req.body.endDate+"'";
        andkey = true;
      }

      if (req.body.EvolveProdOrders_ID != "" && req.body.EvolveProdOrders_ID != '0' && req.body.EvolveProdOrders_ID != null && req.body.EvolveProdOrders_ID != 0) 
      {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epo.EvolveProdOrders_ID = " + parseInt(req.body.EvolveProdOrders_ID);
        andkey = true;
      }

      if (req.body.EvolveMachine_ID != ""  && req.body.EvolveMachine_ID != '0' && req.body.EvolveMachine_ID != null  && req.body.EvolveMachine_ID != 0) 
      {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epo.EvolveMachine_ID=" + parseInt(req.body.EvolveMachine_ID);
        andkey = true;
      }

      if (req.body.EvolveSection_ID != ""  && req.body.EvolveSection_ID != '0' && req.body.EvolveSection_ID != null && req.body.EvolveSection_ID != 0) {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epo.EvolveSection_ID=" + parseInt(req.body.EvolveSection_ID);
        andkey = true;
      }

      if (req.body.EvolveShift_ID != ""  && req.body.EvolveShift_ID != '0' && req.body.EvolveShift_ID != null  && req.body.EvolveShift_ID != 0)
      {
        if (andkey == true) {
          condition = condition + " AND ";
        }
        condition += " epo.EvolveShift_ID=" + parseInt(req.body.EvolveShift_ID);
        andkey = true;
      }
      let wpDetails =await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getWoDetails(condition);
      let response = [];
      // console.log("wpDetails.recordset :",wpDetails.recordset);
      for(let i = 0 ; i < wpDetails.recordset.length ; i++)
      {
        let workOrderData = wpDetails.recordset[i];
        let subResponce = {};
        let woDetails = {
            "EvolveProdOrders_ID" : workOrderData.EvolveProdOrders_ID,
            "EvolveProdOrders_OrderId" : workOrderData.EvolveProdOrders_OrderId,
            "EvolveProdOrders_Quantity" : workOrderData.EvolveProdOrders_Quantity,
            "EvolveProdOrders_Order" : workOrderData.EvolveProdOrders_Order,
            "EvolveProdOrders_CreatedAt" : workOrderData.EvolveProdOrders_CreatedAt,
            "EvolveItem_Code" : workOrderData.EvolveItem_Code,
            "EvolveItem_Desc" : workOrderData.EvolveItem_Desc,
            "EvolveMachine_Name" : workOrderData.EvolveMachine_Name,
            "display" : false,
        };
        subResponce.woDetails = woDetails;
        let getChildItems =await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.getChildItems(workOrderData.EvolveProdOrders_ID);
        let childArray = [];
        if(getChildItems.recordset.length > 0 )
        {
          for(let j = 0; j < getChildItems.recordset.length ; j++)
          {
            let childPart = {
              "child_itemCode" : getChildItems.recordset[j].EvolveItem_Code,
              "child_itemDesc" : getChildItems.recordset[j].EvolveItem_Desc,
              "child_itemQtyReq" : getChildItems.recordset[j].EvolvePickList_QtyReq,
              "child_itemQtyIssue" : getChildItems.recordset[j].EvolvePickList_QtyIss,
            }
            let availableToPick = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.availableToPick(getChildItems.recordset[j].EvolveItem_ID);
            if(availableToPick.recordset.length > 0 )
            {
              let availableToPickArray = [];
              for(let k = 0; k < availableToPick.recordset.length;k++)
              {
                let availableToPickObj = {
                  "barode" : availableToPick.recordset[k].EvolveInventory_RefNumber,
                  "qtyOnHand" : availableToPick.recordset[k].EvolveInventory_QtyOnHand,
                  "location" : availableToPick.recordset[k].EvolveLocation_Code,
                };
                availableToPickArray.push(availableToPickObj)
              }
              childPart.availableToPick = availableToPickArray;
            }
            else
            {
              childPart.availableToPick = [];
            }
            let alreadyPicked = await Evolve.App.Services.SmartFactory.PickList.srvGenerateCooper.alreadyPicked(getChildItems.recordset[j].EvolveItem_ID , getChildItems.recordset[j].EvolvePickList_ID);
            if(alreadyPicked.recordset.length > 0 )
            {
              let alreadyPickedArray = [];
              for(let l = 0; l < alreadyPicked.recordset.length; l++)
              {
                let alreadyPickedObj = {
                  "barode" : availableToPick.recordset[l].EvolveInventory_RefNumber,
                  "qtyOnHand" : availableToPick.recordset[l].EvolveInventory_QtyOnHand,
                  "location" : availableToPick.recordset[l].EvolveLocation_Code,
                };
                alreadyPickedArray.push(alreadyPickedObj)
              }
              childPart.alreadyPicked = alreadyPickedArray;
            }
            else
            {
              childPart.alreadyPicked = [];
            }
            childArray.push(childPart);
          }
          subResponce.childParts = childArray;
        }
        else
        {
          subResponce.childParts = [];
        }
        response.push(subResponce);
      }
      let obj = { statusCode: 200, status: "success", message: "Picklist data", result: response };
      res.send(obj);
    } catch (error) {
        Evolve.Log.error(" EERR0617: Error while getting Wo details "+error.message);
        let obj = { statusCode: 400, status: "fail", message: " EERR0617: Error while getting Wo details "+error.message, result: null };
        res.send(obj);
    }
  },
}