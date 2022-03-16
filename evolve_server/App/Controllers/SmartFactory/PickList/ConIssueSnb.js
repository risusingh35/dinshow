'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
      addPickListDetails: async function(req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let obj;
          let error = false;
          for (let i = 0; i < req.body.resultArray.length; i++) {
            if (error == false) {
              obj = req.body.resultArray[i];
              console.log(obj)
              let checkInventoryQty =  await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.checkInventoryQty(obj);
              if (checkInventoryQty instanceof Error || checkInventoryQty.rowsAffected < 1) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Lot Number not Found",
                  result: null
                };
                res.send(obj);
                error = true;
              } else {
                
                let remaningQty = parseInt(checkInventoryQty.recordset[0].EvolveInventory_QtyOnHand) - parseInt(checkInventoryQty.recordset[0].EvolveInventory_QtyAllocated);
                console.log('remaningQty',remaningQty);
                if(obj.Value <= remaningQty){
                   let addPickListDetails =  await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.addPickListDetails(req.body.EvolveUser_ID, obj);
                  if (addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1) {
                    let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: "Error on Add picklist Details",
                      result: null
                    };
                    res.send(obj);
                    error = true;
                  } else {
                    let updatePickList = await await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.updatePickList(req.body.EvolveUser_ID,obj );
                    if (updatePickList instanceof Error || updatePickList.rowsAffected < 1  ) {
                      let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on Update Pick List",
                        result: null
                      };
                      res.send(obj);
                      error = true;
                    } else {
                      let QtyAllocated = parseInt(checkInventoryQty.recordset[0].EvolveInventory_QtyAllocated) + obj.Value;
                      let EvolveInventory_ID = checkInventoryQty.recordset[0].EvolveInventory_ID;
                      let updateInventoryQty = await await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.updateInventoryQty(EvolveInventory_ID, QtyAllocated);
                      if (updateInventoryQty instanceof Error || updateInventoryQty.rowsAffected < 1  ) {
                        let obj = {
                          statusCode: 400,
                          status: "fail",
                          message: "Error on Update Inventory Qty",
                          result: null
                        };
                        res.send(obj);
                        error = true;
                      }
                      let getPickListDetailsById = await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.getPickListDetailsById(obj.ID);
                      if (getPickListDetailsById instanceof Error || getPickListDetailsById.rowsAffected < 1  ) {
                        let obj = {
                          statusCode: 400,
                          status: "fail",
                          message: "Error while get Pick List by ID",
                          result: null
                        };
                        res.send(obj);
                        error = true;
                      } else {
                        let ioData = {
                          EvolveIO_Data: {
                            EvolveItem_Code: getPickListDetailsById.recordset[0].EvolveItem_Code,
                            EvolvePickList_QtyIss: obj.Value,
                            EvolvePickList_ID : getPickListDetailsById.recordset[0].EvolvePickList_ID,
                            locFrom : 'RM',
                            locTo : 'FG',
                            lotserFrom: obj.LotNumber,
												    lotrefFrom: obj.LotNumber,

                          },
                          EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
                          EvolveIO_Code: "EVOLVEST",
                          EvolveIO_Data_Formate: "XML",
                          EvolveIO_ERP_Type: "QAD",
                          EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
                          EvolveIO_File_Data: ""
                        };
                        console.log("ioData ::", ioData);
                        let addIOData = await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.addIOData(ioData);
                        if (addIOData instanceof Error || addIOData.rowsAffected < 1  ) {
                          let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while add IO Data",
                            result: null
                          };
                          res.send(obj);
                          error = true;
                        }
                      }
                    }
                  }                  

                }else{
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Transferable Qty Greater Than On-Hand Qty",
                    result: null
                  };
                  res.send(obj);
                  error = true;
                }


              }
             
            } //if(error == false)
          }
          if (error == false) {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Pick list updated successfully",
              result: ""
            };
            res.send(obj);
          } //if(error==false)
        } catch (error) {
          Evolve.Log.error(" EERR0640: Error while adding Pick List Details "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0640: Error while adding Pick List Details "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getWorkOrderListIssue: async function(req, res) {
        try {
          let workOrderList = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.getWorkOrderListIssue();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Work order list",
            result: workOrderList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0641: Error while getting Work Order List Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0641: Error while getting Work Order List Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getSalesOrderListIssue: async function(req, res) {
        try {
          let workOrderList = await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.getSalesOrderList();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Sales order list",
            result: workOrderList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0642: Error while getting Sales Order List Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0642: Error while getting Sales Order List Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getPickListForIssue: async function(req, res) {
        try {
          let pickList = await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.getPickListForIssue(req.body);
          if (pickList instanceof Error || pickList.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "No pick list generated",
              result: null
            };
            res.send(obj);
          } else {
            let getPickListItem = await Evolve.App.Services.SmartFactory.PickList.SrvIssueSnb.getPickListItemForIssue(req.body);
            if (getPickListItem instanceof Error || getPickListItem.rowsAffected < 1) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "No pick item found",
                result: null
              };
              res.send(obj);
            } else {
              let result = {
                pickList: pickList.recordsets[0],
                getPickListItem: getPickListItem.recordsets[0]
              };
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Pick list",
                result: result
              };
              res.send(obj);
            }
          }
        } catch (error) {
          Evolve.Log.error(" EERR0643: Error while getting Pick List For Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0643: Error while getting Pick List For Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
}