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
              let addPickListDetails =  await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.addPickListDetails(req.body.EvolveUser_ID, obj);
              if (
                addPickListDetails instanceof Error || addPickListDetails.rowsAffected < 1
              ) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Error on query",
                  result: null
                };
                res.send(obj);
                error = true;
              } else {
                let updatePickList = await await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.updatePickList(req.body.EvolveUser_ID,obj );
                if (updatePickList instanceof Error || updatePickList.rowsAffected < 1  ) {
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on query",
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
          Evolve.Log.error(" EERR0633: Error while adding pics list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0633: Error while adding pics list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getWorkOrderListIssue: async function(req, res) {
        try {
          let workOrderList = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.getWorkOrderListIssue();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Work order list",
            result: workOrderList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0634: Error while getting Work Order List Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0634: Error while getting Work Order List Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getSalesOrderListIssue: async function(req, res) {
        try {
          let workOrderList = await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.getSalesOrderList();
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Sales order list",
            result: workOrderList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0635: Error while getting Sales Order List Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0635: Error while getting Sales Order List Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getPickListForIssue: async function(req, res) {
        try {
          let pickList = await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.getPickListForIssue(
            req.body
          );
          if (pickList instanceof Error || pickList.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "No pick list generated",
              result: null
            };
            res.send(obj);
          } else {
            let getPickListItem = await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.getPickListItemForIssue(
              req.body
            );
            if (
              getPickListItem instanceof Error ||
              getPickListItem.rowsAffected < 1
            ) {
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
          Evolve.Log.error(" EERR0636: Error while getting Pick List For Issue "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0636: Error while getting Pick List For Issue "+error.message,
            result: null
          };
          res.send(obj);
        }
      },


      getItemLocation: async function(req, res) {
        try {
          let locationList = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.getItemLocation(req.body);
        console.log("record set >>. " , locationList)
          let obj = {
            statusCode: 200,
            status: "success",
            message: "locations get succsessfully",
            result: locationList.recordset
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0637: Error while get Item Location "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0637: Error while get Item Location "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      updateInventory: async function(req, res) {
        try {
   
          req.body.EvolveUser_ID = req.EvolveUser_ID;
             
          let totalQuntity = 0 ;
          let errorGenerate  = false ;
          let NewgetLicationId = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.NewgetLicationId(req.body);
          req.body.EvolveLocation_ID = NewgetLicationId.recordset[0].EvolveMachine_ID

          if (  NewgetLicationId instanceof Error ||NewgetLicationId.rowsAffected < 1)
          {
           
            errorGenerate = true ;
     
          }

        //   if(errorGenerate == false)
        //  {
        //   let checkQuntity = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.checkQuntity(req.body);
        //   console.log("quntity check >>" , checkQuntity)
  
  
        //     if (  checkQuntity instanceof Error ||checkQuntity.rowsAffected > 0)
        //     {
        //         errorGenerate =true ;
 
  
        //     }
        //   }

            
          for(let i= 0 ; i<req.body.itemList.length ; i++)
          {
            console.log("inventiry id >> "  , req.body.itemList[i].EvolveInventory_ID)
            console.log("weight >> "  ,req.body.itemList[i].weight)
             totalQuntity = totalQuntity +parseInt(req.body.itemList[i].weight);


         if(errorGenerate == false)
          {
        let updateInventory = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.updateInventory(req.body.itemList[i]);


          if (  updateInventory instanceof Error ||updateInventory.rowsAffected < 1)
          {
              errorGenerate =true ;
              console.log()
              let totalQuntity = totalQuntity +req.body.itemList[i].weight;
        

          }
          }
        }

        console.log("total quntity >> " ,totalQuntity )
          if(errorGenerate == false)
          {
        
            let addInventory = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.addInventory( req.body.EvolveLocation_ID ,totalQuntity  ,req.body.EvolveUser_ID , req.body.EvolveItem_ID );



            if (  addInventory instanceof Error ||addInventory.rowsAffected < 1)
            {
                errorGenerate =true ;
     
            }
          }


          if(errorGenerate == false)
          {
        
            let updatePickList = await  Evolve.App.Services.SmartFactory.PickList.SrvIssueList.updatePickList(  totalQuntity  ,req.body.EvolveUser_ID , req.body.EvolvePickList_ID );



            if (  updatePickList instanceof Error ||updatePickList.rowsAffected < 1)
            {
                errorGenerate =true ;
     
            }
          }
        

          console.log("last" , errorGenerate)

          if(errorGenerate == true)
          {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error While updating inventory !",
              result: null
            };
            res.send(obj)

          }
          else{
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Inventory Updated succsessfully",
             
            };
            res.send(obj)


          }
       
          


          
  
        } catch (error) {
          Evolve.Log.error(" EERR0638: Error while updating inventory "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0638: Error while updating inventory "+error.message,
            result: null
          };
          res.send(obj);
        }
      },


      checkQuntity: async function(req, res) {
        try {
          let checkQuntity = await Evolve.App.Services.SmartFactory.PickList.SrvIssueList.checkQuntity(req.body);
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Sales order list",
            result: checkQuntity.rowsAffected
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0639: Error while checking Quantity "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0639: Error while checking Quantity "+error.message,
            result: null
          };
          res.send(obj);
        }
      },
}