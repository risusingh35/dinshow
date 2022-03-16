'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemGroupList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let groupLisCount = await Evolve.App.Services.Evolve.ItemGroup.SrvList.getItemGroupListCount(search);
            let groupList = await Evolve.App.Services.Evolve.ItemGroup.SrvList.getItemGroupList(start , length,search);
            if (groupList instanceof Error ) {
                Evolve.Log.error(" EERR0100 : Error while get item group list ")
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR0100 : Error while get item group list "   ,
                    result: groupList.message
                };
                res.send(obj);
            } else {
              let resObj = {
                noOfRecord: groupLisCount.recordset[0].count,
                records: groupList.recordset
            }
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Item group list",
                result: resObj
            };
            res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR1027: Error while getting item group list"+error.message);
        }
    },
    addItemGroup: async function (req, res) {
      try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let checkGroupCode = await Evolve.App.Services.Evolve.ItemGroup.SrvList.checkCodeExist(
            req.body , 'add');
        if (checkGroupCode instanceof Error) {
            Evolve.Log.error(" EERR0101 : Error while check group code already exist or not ")
             let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR0101 : Error while check group code already exist or not ",
              result: null
            };
            res.send(obj);
        }
        else if(checkGroupCode.rowsAffected > 0)
        {
          let obj = {
                statusCode: 400,
                status: "fail",
                message: "Group code alread exist !",
                result: null
              };
              res.send(obj);

        }
        else{
          let addItemGroup = await Evolve.App.Services.Evolve.ItemGroup.SrvList.addItemGroup(
          req.body
        );
        if (addItemGroup instanceof Error || addItemGroup.rowsAffected < 1) {
          Evolve.Log.error(" EERR0102 : Error while add item group ")
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0102 : Error while add item group ",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Item group added successfully",
            result: null
          };
          res.send(obj);
        }
      }
      } catch (error) {
        Evolve.Log.error(" EERR1028: Error while adding item "+error.message);
      }
    },
 
    getSingleGroupData: async function (req, res) {
        try {
            let groupData = await Evolve.App.Services.Evolve.ItemGroup.SrvList.getSingleGroupData(
            req.body );
            if (groupData instanceof Error || groupData.rowsAffected < 1) {
             Evolve.Log.error("EERR0103 : Erro while get item group data")
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0103 : Erro while get item group data",
                result: null
              };
              res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "group data gotted",
              result: groupData.recordset[0]
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR1029: Error while getting Single Group Data"+error.message);
        }
    },
    updateItemGroup: async function (req, res) {
      try {
          req.body.EvolveUser_ID = req.EvolveUser_ID;
          let checkGroupCode = await Evolve.App.Services.Evolve.ItemGroup.SrvList.checkCodeExist(req.body , "update");
          if (checkGroupCode instanceof Error) {
            Evolve.Log.error("EERR0104 : Error while check group code already exist or not")
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR0104 : Error while check group code already exist or not",
                result: null
              };
              res.send(obj);
          }
          else if(checkGroupCode.rowsAffected > 0)
          {
              let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Group code already exist!",
                  result: null
                };
                res.send(obj);

          }
          else{
              let updateItemGroup = await Evolve.App.Services.Evolve.ItemGroup.SrvList.updateItemGroup(req.body);
              if (updateItemGroup instanceof Error || updateItemGroup.rowsAffected < 1) {
                Evolve.Log.error("EERR0104 : Error while update item group")
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Error while update item group",
                  result: null
                };
                res.send(obj);
              } else {
                let obj = {
                  statusCode: 200,
                  status: "success",
                  message: "Item group updated successfully",
                  result: null
                };
                res.send(obj);
              }
        }
      } catch (error) {
        Evolve.Log.error(" EERR1030: Error while updating Item group "+error.message);
      }
    },
}