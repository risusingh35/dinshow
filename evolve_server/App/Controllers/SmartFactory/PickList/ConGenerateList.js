'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
      getPickListByWorkOrder: async function(req, res) {
        try {
          let start = parseInt(req.body.start);
          let length = parseInt(req.body.length);
          let searchData = {
            EvolveProdOrders_ID: req.body.EvolveProdOrders_ID
          };
          if (req.body.EvolveProdOrders_ID != "") {
            let pickListCount = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getPickListByWorkOrderCount(
              searchData
            );
            let pickList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getPickListByWorkOrderDatatableList(
              start,
              length,
              searchData
            );
            let obj = {
              draw: req.body.draw,
              recordsTotal: pickListCount.recordset[0].count,
              recordsFiltered: pickListCount.recordset[0].count,
              data: pickList.recordset
            };
            res.send(obj);
          } else {
            let obj = {
              draw: req.body.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0628: Error while getting PickList By Work Order  "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0628: Error while getting PickList By Work Order "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getWorkCenterList: async function(req, res) {
        try {
          let getWorkCenterList = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getWorkCenterList();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "getWorkCenter list",
            result: getWorkCenterList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0629: Error while getting Work Center List "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0629: Error while getting Work Center List "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getWorkOrderList: async function(req, res) {
        try {
          let workOrderList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getWorkOrderList();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Work order list",
            result: workOrderList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0630: Error getting Work Order List "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0630: Error getting Work Order List "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getPickListByWorkOrderCount: async function(req, res) {
        try {
          let picklistCount = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getPickListByWorkOrderCountList(
            req.body
          );
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Item list",
            result: picklistCount.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0631: Error while getting PickList By Work Order Count "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0631: Error while getting PickList By Work Order Count "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      generatePickList: async function(req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          req.body.EvolveCompany_ID = req.EvolveCompany_ID;
          req.body.EvolveUnit_ID = req.EvolveUnit_ID;
          let generatePickList = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.generatePickList(req.body);
          if (generatePickList instanceof Error || generatePickList.rowsAffected < 1 ) 
          {
            let obj = { statusCode: 400, status: "fail", message: generatePickList.message, result: null };
            res.send(obj);
          } 
          else 
          {
            let obj = { statusCode: 200, status: "success", message: "Picklist generated successfully",  result: [] };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0632: Error while generating pick list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0632: Error while generating pick list "+error.message,result: null};
          res.send(obj);
        }
      },
}