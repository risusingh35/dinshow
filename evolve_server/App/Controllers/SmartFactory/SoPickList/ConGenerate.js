'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSalesOrderList: async function (req, res) {
        try {
          let getSalesOrderList = await Evolve.App.Services.SmartFactory.SoPickList.SrvGenerate.getSalesOrderList();
          if (
            getSalesOrderList instanceof Error ||
            getSalesOrderList.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Sales Order Not Found",
              result: getSalesOrderList.message
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Sales Order Goted Successfully !",
              result: getSalesOrderList.recordset
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0903: Error while getting sales order list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0903: Error while getting sales order list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
      getPickListBySoNumberCount: async function (req, res) {
        try {
          let picklistCount = await Evolve.App.Services.SmartFactory.SoPickList.SrvGenerate.getPickListBySoNumberCountList(
            req.body
          );
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Item List",
            result: picklistCount.recordset
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0904: Error while getting Pick List By So Number Count "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0904: Error while getting Pick List By So Number Count "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
      generateSoPickList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            req.body.EvolveCompany_ID = req.EvolveCompany_ID;
            req.body.EvolveUnit_ID = req.EvolveUnit_ID;
            let generateSoPickList = await Evolve.App.Services.SmartFactory.SoPickList.SrvGenerate.generateSoPickList(req.body);
            if (generateSoPickList instanceof Error )
            {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: generateSoPickList.message,
                    result: null
                };
                res.send(obj);
            }
            else
            {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Picklist Generated Successfully !",
                    result: []
                };
                res.send(obj);
            }
        } catch (error) {
          Evolve.Log.error(" EERR0905: Error while generating So Pick List "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0905: Error while generating So Pick List "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
    
      getPickListBySalesOrder: async function (req, res) {
        try {
          // console.log("req.query.EvolveSection_ID ::", req.query)
          let start = parseInt(req.body.start);
          let length = parseInt(req.body.length);
          let searchData = {
            EvolveSalesOrder_ID: req.body.EvolveSalesOrder_ID
          };
          if (req.body.EvolveSalesOrder_ID != "") {
            let pickListCount = await Evolve.App.Services.SmartFactory.SoPickList.SrvGenerate.getPickListBySalesOrderCount(
              searchData
            );
            let pickList = await Evolve.App.Services.SmartFactory.SoPickList.SrvGenerate.getPickListBySalesOrderDatatableList(
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
            console.log(obj);
            res.send(obj);
          } else {
            let obj = {
              draw: req.query.draw,
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0906: Error while getting Pick List By Sales Order "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0906: Error while getting Pick List By Sales Order "+error.message,
            result: null
          };
          res.send(obj);
        }
      }
}