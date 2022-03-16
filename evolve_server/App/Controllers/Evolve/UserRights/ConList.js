'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


getMenuList: async function (req, res) {
  try {
      let list = await Evolve.App.Services.Evolve.UserRights.SrvList.getMenuList();
      if (list instanceof Error) {
        Evolve.Log.error("EERR2497 : Error while get menu list")
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "EERR2497 : Error while get menu list",
          result: null
        };
        res.send(obj);
    } else if(list.rowsAffected < 1){

      let obj = {
        statusCode: 400,
        status: "fail",
        message: "NO MENU FOUND ",
        result: null
      };
      res.send(obj);


    }else {
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Menu list",
        result: list.recordset
      };
      res.send(obj);
    }
  } catch (error) {
    Evolve.Log.error(" EERR2499: Error while get Menu List "+error.message);
    let obj = {
      statusCode: 400,
      status: "fail",
      message: "EERR2499: Error while get Menu List "+error.message,
      result: null
  };
  res.send(obj);
  }
},
getUserList: async function (req, res) {
  try {
      let list = await Evolve.App.Services.Evolve.UserRights.SrvList.getUserList();
      if (list instanceof Error ) {
       Evolve.Log.error("EERR2500 : Error while get user list")
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "EERR2500 : Error while get user list",
          result: null
        };
        res.send(obj); 
    }else {
      let obj = {
        statusCode: 200,
        status: "success",
        message: "user list",
        result: list.recordset
      };
      res.send(obj);
    }
  } catch (error) {
    Evolve.Log.error(" EERR2501: Error while get user list "+error.message);
    let obj = {
      statusCode: 400,
      status: "fail",
      message: " EERR2501: Error while get user list "+error.message,
      result: null
  };
  res.send(obj);
  }
},
getAppList: async function (req, res) {
  try {
      let list = await Evolve.App.Services.Evolve.UserRights.SrvList.getAppList();
      if (list instanceof Error ) {
       Evolve.Log.error("EERR2502 : Error while get app list")
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "EERR2502 : Error while get app list",
          result: null
        };
        res.send(obj);
    } else if( list.rowsAffected < 1){
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "NO APP FOUND FOR USER ",
        result: null
      };
      res.send(obj);
    
    }else{
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Menu list",
        result: list.recordset
      };
      res.send(obj);
    }
  } catch (error) {
    Evolve.Log.error(" EERR2503: Error while get app List "+error.message);
    let obj = {
      statusCode: 400,
      status: "fail",
      message: " EERR2503: Error while get app list "+error.message,
      result: null
  };
  res.send(obj);
  }
},
getUserRole: async function (req, res) {
  try {
      let list = await Evolve.App.Services.Evolve.UserRights.SrvList.getUserRole(req.body.EvolveUser_ID);
      if (list instanceof Error) {
       Evolve.Log.error("EERR2504 : Error while get user role")
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "EERR2504 : Error while get user role",
          result: null
        };
        res.send(obj);
    } else if(list.rowsAffected < 1){

      let obj = {
        statusCode: 400,
        status: "fail",
        message: "USER ROLE NOT FOUND",
        result: null
      };
      res.send(obj);
    }else {
      let obj = {
        statusCode: 200,
        status: "success",
        message: "User role ",
        result: list.recordset[0]
      };
      res.send(obj);
    }
  } catch (error) {
    Evolve.Log.error(" EERR2505: Error while get user role "+error.message);
    let obj = {
      statusCode: 400,
      status: "fail",
      message: " EERR2505: Error while get user role "+error.message,
      result: null
  };
  res.send(obj);
  }
},
getMenuList: async function (req, res) {
  req.body.EvolveUser_ID = req.EvolveUser_ID;
  try {
      let menus = await Evolve.App.Services.Evolve.UserRights.SrvList.getMenuList(req.body);
      if (menus instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: " EERR2506: Error while get menu list !",
              result: null
          };
          res.send(obj);
      }else if(menus.rowsAffected < 1){

        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No menu found !",
          result: null
      };
      res.send(obj);

      }else{
          let obj = {
          statusCode: 200,
          status: "success",
          message: "Menu  list",
          result: menus.recordset
        };
        res.send(obj);

      }
  } catch (error) {
      Evolve.Log.error(" EERR2507: Error while get menu list "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: " EERR2507: Error while get menu list "+error.message,
          result: null
      };
      res.send(obj);
  }
},
getPageConfigs: async function (req, res) {
  try {
      let list = await Evolve.App.Services.Evolve.UserRights.SrvList.getPageConfigs(req.body.EvolveMenu_Id);
      if (list instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "EERR2508: Error while get page configs !",
              result: null
          };
          res.send(obj);
      }else if(list.rowsAffected < 1){

        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No page config found !",
          result: null
      };
      res.send(obj);

      }else{
          let obj = {
          statusCode: 200,
          status: "success",
          message: "Page configs",
          result: list.recordset
        };
        res.send(obj);

      }
  } catch (error) {
      Evolve.Log.error(" EERR2509: Error while get page configs "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: " EERR2509: Error while get page configs "+error.message,
          result: null
      };
      res.send(obj);
  }
},
addRights: async function (req, res) {
  try {
       req.body.EvolveUser_ID = req.EvolveUser_ID;
       let checkExistRights = await Evolve.App.Services.Evolve.UserRights.SrvList.checkExistRights(req.body ,'INSERT');
       if (checkExistRights instanceof Error  ) {
        let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2510: Error while check existing rights !",
                result: null
            };
            res.send(obj);
          }else if(checkExistRights.rowsAffected >= 1){
           let obj = {
              statusCode: 400,
              status: "fail",
              message: "Rights already exist !",
              result: null
          };
           res.send(obj);

       }else{
          let addRigths = await Evolve.App.Services.Evolve.UserRights.SrvList.addRights(req.body);
          if (addRigths instanceof Error || addRigths.rowsAffected < 1) {
              let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "EERR2511: Error while add rights !",
                  result: null
              };
              res.send(obj);
          }else{
              let obj = {
              statusCode: 200,
              status: "success",
              message: "Rights added successfully",
              result: ''
            };
            res.send(obj);

          }
       }
  } catch (error) {
      Evolve.Log.error(" EERR2512: Error while add rights "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: " EERR2512: Error while add rights "+error.message,
          result: null
      };
      res.send(obj);
  }
},
updateRights: async function (req, res) {
  try {
       req.body.EvolveUser_ID = req.EvolveUser_ID;
       let checkExistRights = await Evolve.App.Services.Evolve.UserRights.SrvList.checkExistRights(req.body , 'UPDATE');
       if (checkExistRights instanceof Error  ) {
        let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR2513: Error while check existing rights !",
                result: null
            };
            res.send(obj);
          }else if(checkExistRights.rowsAffected >= 1){
           let obj = {
              statusCode: 400,
              status: "fail",
              message: "Rights already exist !",
              result: null
          };
           res.send(obj);

       }else{
          let addRigths = await Evolve.App.Services.Evolve.UserRights.SrvList.updateRights(req.body);
          if (addRigths instanceof Error || addRigths.rowsAffected < 1) {
              let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "EERR2514: Error while update rights !",
                  result: null
              };
              res.send(obj);
          }else{
              let obj = {
              statusCode: 200,
              status: "success",
              message: "Rights updated successfully ",
              result: ''
            };
            res.send(obj);

          }
       }
  } catch (error) {
      Evolve.Log.error(" EERR2515: Error while update rights "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: " EERR2515: Error while update rights "+error.message,
          result: null
      };
      res.send(obj);
  }
},
getUserRights: async function (req, res) {
      try {
          let start = parseInt(req.body.startFrom);
          let length = parseInt(req.body.displayRecord);
          let search = req.body.search;
          let count = await Evolve.App.Services.Evolve.UserRights.SrvList.getUserRightsCount(search);
          let rights = await Evolve.App.Services.Evolve.UserRights.SrvList.getUserRights(start , length,search);
          if (rights instanceof Error ) {
              Evolve.Log.error(" EERR2516 : Error while get user rights list ")
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: " EERR2516 : Error while get user rights list "   ,
                  result: rights.message
              };
              res.send(obj);
          } else {
            let resObj = {
              noOfRecord: count.recordset[0].count,
              records: rights.recordset
          }
          let obj = {
              statusCode: 200,
              status: "success",
              message: "user rights list",
              result: resObj
          };
          res.send(obj);
          }
      } catch (error) {
          Evolve.Log.error(" EERR2517: Error while getting user rights list "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR2517: Error while getting user rights list "+error.message,
            result: null
        };
        res.send(obj);
      }
  },
getSingleRightsData: async function (req, res) {
    try {
        let data = await Evolve.App.Services.Evolve.UserRights.SrvList.getSingleRightsData(
        req.body );
        if (data instanceof Error || data.rowsAffected < 1) {
          Evolve.Log.error("EERR2518 : Error while get user rights data")
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR2518 : Error while get user rights data",
            result: null
          };
          res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: " data gotted",
          result: data.recordset[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR2519: Error while get user rights data "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR2519: Error while get user rights data "+error.message,
            result: null
        };
        res.send(obj);
      
    }
},

}