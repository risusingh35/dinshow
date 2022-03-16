'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    deleteSubItem: async function (req, res) {
        try {
       
          let result = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.deleteSubItem(
            req.body.id
          );
    
          if (result instanceof Error || result.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while delete sub item ! ",
              result: null,
              resultseq: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Sub item deleted successfully",
              result: null,
              resultseq: null
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0413: Error while deleting Sub-Item "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0413: Error while deleting Sub-Item "+error.message,
            result: null,
            resultseq: null
          };
          res.send(obj);
        }
      },

      getItemSearch: async function (req, res) {
        try {
          let poList = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.getItemSearch(
            req.body.term
          );
          let obj = {
            statusCode: 200,
            status: "success",
            message: "search List",
            result: poList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0414: Error while getting Item search "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0414: Error while getting Item search "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getSubItemList: async function (req, res) {
        try {

          console.log("entered in controller >>> ")
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.getSubItemListCount(search);
            console.log("count>>" , count.recordset[0].count)
          let list = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.getSubItemList(start,length,search);
          if (list instanceof Error ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while get sub item list !",
              result: list.message
            };
            res.send(obj);
          } else {
            let resObj = {
              noOfRecord: count.recordset[0].count,
              records: list.recordset
          }
          let obj = {
              statusCode: 200,
              status: "success",
              message: "Sub Item list",
              result: resObj
          };
          res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0415: Error while getting Sub-Item List Dt "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0415: Error while getting Sub-Item List Dt "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      getItemNumber: async function (req, res) {
        try {
          let itemNumberList = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.getItemNumber();
          //console.log("countryList :", countryList)
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Item number list",
            result: itemNumberList.recordsets[0]
          };
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0416: Error while adding Sub-Item number "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0416: Error while adding Sub-Item number "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      
      addSubItemList  : async function (req, res) {
        try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let checkSubItem = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.checkSubItem(
            req.body
          );
          if (checkSubItem.recordset[0].count > 0) {
         
    
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Sub item already exist !" ,
              result: null
            };
            res.send(obj);
          } else {
            let result = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.addSubItemList(
              req.body
            );
            if (result instanceof Error || result.rowsAffected < 1) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while add sub item !",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Sub item created successfully",
                result: null
              };
              res.send(obj);
            }
          }
        } catch (error) {
          Evolve.Log.error(" EERR0417: Error while adding Sub-Item list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0417: Error while adding Sub-Item list "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      
      selectSingleSubItem: async function (req, res) {
        try {
          let processData = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.selectSingleSubItem(
            req.body
          );
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Sub item single List",
            result: processData.recordset
          };
    
          res.send(obj);
        } catch (error) {
          Evolve.Log.error(" EERR0418: Error while selecting single Sub-Item "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0418: Error while selecting single Sub-Item "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      updateSubItem: async function (req, res) {
        try {
          let checkSubItem = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.checkSubItemEdit(
            req.body
          );
          if (checkSubItem.recordset[0].count > 0) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Sub item already exist !" ,
              result: null
            };
            res.send(obj);
          } else {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.SubItem.SrvSubItemList.updateSubItem(
              req.body
            );
    
            if (result instanceof Error || result.rowsAffected < 1) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while update sub item !",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Sub item updated successfully",
                result: null
              };
              res.send(obj);
            }
          }
        } catch (error) {
          Evolve.Log.error(" EERR0419: Error while updating Sub-Item "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0419: Error while updating Sub-Item "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      
    



}