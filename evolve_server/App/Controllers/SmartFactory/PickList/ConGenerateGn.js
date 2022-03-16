'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
      getPickListByWorkOrder: async function(req, res) {
        try {
          let start = parseInt(req.query.start);
          let length = parseInt(req.query.length);
          let searchData = {
            EvolveProdOrders_ID: req.query.EvolveProdOrders_ID
          };
          if (req.query.EvolveProdOrders_ID != "") {
            let pickListCount = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getPickListByWorkOrderCount(
              searchData
            );
            let pickList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateList.getPickListByWorkOrderDatatableList(
              start,
              length,
              searchData
            );
            let obj = {
              draw: req.query.draw,
              recordsTotal: pickListCount.recordset[0].count,
              recordsFiltered: pickListCount.recordset[0].count,
              data: pickList.recordset
            };
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
          Evolve.Log.error(" EERR0618: Error while getting pick list by work order "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0618: Error while getting pick list by work order "+error.message,
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
          Evolve.Log.error(" EERR0619: Error while getting work center list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0619: Error while getting work center list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getWorkOrderList: async function(req, res) {
        try {
          let workOrderList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getWorkOrderList();
          let obj = { statusCode: 200, status: "success", message: "Work order list", result: workOrderList.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0620: Error while getting Work Order list  "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0620: Error while getting Work Order list  "+error.message, result: null };
          res.send(obj);
        }
      },

      getSectionList: async function(req, res) {
        try {
          let sectionList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getSectionList();
          let obj = { statusCode: 200, status: "success", message: "Section list", result: sectionList.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0621: Error while getting section list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0621: Error while getting section list "+error.message, result: null };
          res.send(obj);
        }
      },

      getShiftList: async function(req, res) {
        try {
          let getShiftList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getShiftList();
          let obj = { statusCode: 200, status: "success", message: "Shift list", result: getShiftList.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0622: Error while getting shift list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0622: Error while getting shift list "+error.message, result: null };
          res.send(obj);
        }
      },

      getMachineList: async function(req, res) {
        try {
          let getMachineList = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getMachineList();
          let obj = { statusCode: 200, status: "success", message: "Machine list", result: getMachineList.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0623: Error while getting machine list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0623: Error while getting machine list "+error.message, result: null };
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
          Evolve.Log.error(" EERR0624: Error while getting PickList By Work Order Count "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0624: Error while getting PickList By Work Order Count "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      generatePickList: async function(req, res) {
        try {

          console.log("entered in your function>>")
          let date = new Date();
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          req.body.EvolveCompany_ID = req.EvolveCompany_ID;
          req.body.EvolveUnit_ID = req.EvolveUnit_ID;
          let checkPickListExist = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.checkPickListExist(req.body.EvolveProdOrders_ID);
          if(checkPickListExist instanceof Error || checkPickListExist.rowsAffected < 1)
          {
            let getProdOrderDetails = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getProdOrderDetails(req.body.EvolveProdOrders_ID);
            if(getProdOrderDetails instanceof Error || getProdOrderDetails.rowsAffected < 1)
            {
              let obj = { statusCode: 400, status: "fail", message: "Workorder detail not found",  result: [] };
              res.send(obj);
            }
            else
            {
              let getProdBomDetails = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getProdBomDetails(req.body.EvolveProdOrders_ID);
              console.log("producttion order bom  >>. " ,getProdBomDetails )
              if(getProdBomDetails instanceof Error || getProdBomDetails.rowsAffected < 1)
              {
                let obj = { statusCode: 400, status: "fail", message: "Production Order Bom Not Found",  result: [] };
                res.send(obj);
              }
              else
              {
                let partBom = getProdBomDetails.recordset;
                let pickListNumber = '';
                let newDate = ('0' + date.getDate()).slice(-2)+""+('0' + (date.getMonth() + 1)).slice(-2)+""+date.getFullYear();
                let getLastPickListNumber = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getLastPickListNumber();
                if(getLastPickListNumber.rowsAffected < 1)
                { 
                  pickListNumber = "PL"+newDate+"0001";
                }
                else
                {
                  let oldPickListNumber = getLastPickListNumber.recordset[0].EvolvePickList_Number;
                  if(oldPickListNumber.includes(newDate))
                  {
                    let pad = "0000";
                    let pl_new = parseInt(oldPickListNumber.substr(-4)) + 1; //0002 => 2
                    let tmp = "" + pl_new;
                    let plcount = pad.substring(0, pad.length - tmp.length) + tmp;
                    pickListNumber = "PL"+newDate+""+plcount;
                  }
                  else
                  {
                    pickListNumber = "PL"+newDate+"0001";
                  }
                }
                  let addPickListArray = {
                    "EvolvePickList_Number" : pickListNumber , 
                    "EvolveItem_ID" : getProdOrderDetails.recordset[0].EvolveItem_ID,
                    "EvolveProdOrders_ID" : getProdOrderDetails.recordset[0].EvolveProdOrders_ID,
                    "EvolveMachine_ID" : getProdOrderDetails.recordset[0].EvolveMachine_ID,
                    "EvolvePickList_Type" : "PRODORD",
                    "EvolvePickList_Status" : "OPEN",
                    "EvolveUser_ID" : req.EvolveUser_ID,
                  }
                  let addPickList = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.addPickList(addPickListArray);
                  if(addPickList instanceof Error || addPickList.rowsAffected < 1)
                  {
                    Evolve.Log.error("Error while add pick list");
                    Evolve.Log.error(addPickList.message);
                    let obj = { statusCode: 400, status: "fail", message: "Error while add pick list",  result: [] };
                    res.send(obj);
                  }
                  else
                  { 
                    let pickList_ID = addPickList.recordset[0].inserted_id;
                    let pickListDetailError = false;
                    for(let i = 0 ; i < getProdBomDetails.rowsAffected ; i++)
                    {
                      if(pickListDetailError == false)
                      {
                        let bomData = getProdBomDetails.recordset[i];
                        let addPickListDetailArray = {
                          "EvolvePickList_ID" : pickList_ID ,
                          "EvolveItem_ID" : bomData.EvolveProdOrderBom_CompItem_ID ,
                          "EvolvePickListDetail_ReqQty" : bomData.EvolveProdOrderBom_QtyPer , 
                          "EvolvePickListDetail_IssQty" : 0,
                          "EvolvePickListDetail_ReturnQty" : 0,
                          "EvolvePickListDetail_Status" : 'OPEN',
                          "EvolveUser_ID" : req.EvolveUser_ID,
                        };
                        let addPickListDetail = await Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.addPickListDetail(addPickListDetailArray);
                        if(addPickListDetail instanceof Error || addPickListDetail.rowsAffected < 1)
                        {
                          Evolve.Log.error("Error while add pick list detail");
                          Evolve.Log.error(addPickListDetail.message);
                          pickListDetailError = true;
                        }
                      }
                    }
                    if(pickListDetailError == true)
                    {
                      let obj = { statusCode: 400, status: "fail", message: "Pick list generate have some issue",  result: [] };
                      res.send(obj);
                    }
                    else
                    {
                      let obj = { statusCode: 200, status: "success", message: "Picklist generated successfully",  result: [] };
                      res.send(obj);
                    }
                  }
              }
            } 
          }
          else
          {
            let obj = { statusCode: 400, status: "fail", message: "Picklist "+checkPickListExist.recordset[0].EvolvePickList_Number+" alredy generated",  result: [] };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0625: Error while generating pick list "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0625: Error while generating pick list "+error.message,result: null};
          res.send(obj);
        }
      },

      getPickListData: async function(req, res) {
        try {
          let condition = "WHERE ";
          if(req.body.startDate != '' && req.body.endDate!='')
          {
            let startDate = req.body.startDate.split('/').reverse().join('-');
            let endDate = req.body.endDate.split('/').reverse().join('-');
            condition = condition + " CONVERT(DATE,epl.EvolvePickList_CreatedAt) BETWEEN '"+startDate+"' AND '"+endDate+"'";
          }

          if(req.body.EvolveProdOrders_ID!="" && req.body.EvolveProdOrders_ID !='0' && req.body.EvolveProdOrders_ID !=null)
          {
            condition = condition + " AND epo.EvolveProdOrders_ID = "+req.body.EvolveProdOrders_ID;
          }

          if(req.body.EvolveMachine_ID!="" && req.body.EvolveMachine_ID !='0' && req.body.EvolveMachine_ID !=null)
          {
            condition = condition + " AND epo.EvolveMachine_ID = "+req.body.EvolveMachine_ID;
          }

          if(req.body.EvolveShift_ID!="" && req.body.EvolveShift_ID !='0' && req.body.EvolveShift_ID !=null)
          {
            condition = condition + " AND epo.EvolveShift_ID = "+req.body.EvolveShift_ID;
          }

          if(req.body.EvolveSection_ID!="" && req.body.EvolveSection_ID !='0' && req.body.EvolveShift_ID !=null)
          {
            condition = condition + " AND epo.EvolveSection_ID = "+req.body.EvolveSection_ID;
          }
          let getPickListData = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getPickListData(condition);
          let obj = { statusCode: 200, status: "success", message: "PickList list", result: getPickListData.recordset};
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0626: Error while getting picklist data "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0626: Error while getting picklist data "+error.message, result: null };
          res.send(obj);
        }
      },

      getPickListDetail: async function(req, res) {
        try {
          let getPickListDetail = await  Evolve.App.Services.SmartFactory.PickList.SrvGenerateGn.getPickListDetail(req.body.EvolvePickList_ID);
          if(getPickListDetail instanceof Error || getPickListDetail.rowsAffected < 1)
          {
            let obj = { statusCode: 400, status: "fail", message: "No PickList detail found", result: null};
            res.send(obj);
          }
          else
          {
            let obj = { statusCode: 200, status: "success", message: "PickList detail list", result: getPickListDetail.recordset};
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0627: Error while getting pick list detail "+error.message);
          let obj = { statusCode: 400, status: "fail", message: " EERR0627: Error while getting pick list detail "+error.message, result: null };
          res.send(obj);
        }
      },
}