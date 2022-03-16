'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


  getmachineMasterList: async function (req, res) {
 
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      let Count = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.getMachineMasterCount(search);
      let getMachineMasterList = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.getmachineMasterList(  start, length,search );
      if (getMachineMasterList instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  machine master list ! ",
          result: getMachineMasterList.message
        };
        res.send(obj);
      } else {
        let resObj = {
          noOfRecord: Count.recordset[0].count,
          records: getMachineMasterList.recordset
      }
      let obj = {
          statusCode: 200,
          status: "success",
          message: "Machine list",
          result: resObj
      };
      res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0302: Error while getting machine master list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0302: Error while getting machine master list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addMachineMaster: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.addMachineMaster(req.body);
      if (result instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while add Machine!",
              result: null
          };
          res.send(obj);
      } else {
          let obj = {
              statusCode: 200,
              status: "Success",
              message: "Success",
              result: null
          };
          res.send(obj);
      }
  } catch (error) {
      Evolve.Log.error("Error while add Machine "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while add Machine "+error.message,
          result: null
      };
      res.send(obj);
  }
  },


  selectSingleMachine: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.selectSingleMachine(
        req.body.EvolveMachine_ID
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on select single machine !",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Single Master",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0304: Error while selecting single master "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0304: Error while selecting single master "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateMachineMaster: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.updateMachineMaster(req.body);
      if (result instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while Update Machine!",
              result: null
          };
          res.send(obj);
      } else {
          let obj = {
              statusCode: 200,
              status: "Success",
              message: "Success",
              result: null
          };
          res.send(obj);
      }
  } catch (error) {
      Evolve.Log.error("Error while Update Machine "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while Update Machine "+error.message,
          result: null
      };
      res.send(obj);
  }
  },

  getAllLocation: async function (req, res) {
  try {
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.getAllLocation();
      if (result instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while get Location Group!",
              result: null
          };
          res.send(obj);
      } else {
          let obj = {
              statusCode: 200,
              status: "Success",
              message: "Success",
              result: result.recordset
          };
          res.send(obj);
      }
  } catch (error) {
      Evolve.Log.error("Error while getting all location group "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while getting all location group "+error.message,
          result: null
      };
      res.send(obj);
  }
},


getAllSection: async function (req, res) {
  try {
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.getAllSection();
      if (result instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while get Section Group!",
              result: null
          };
          res.send(obj);
      } else {
          let obj = {
              statusCode: 200,
              status: "Success",
              message: "Success",
              result: result.recordset
          };
          res.send(obj);
      }
  } catch (error) {
      Evolve.Log.error("Error while getting all Section group "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while getting all Section group "+error.message,
          result: null
      };
      res.send(obj);
  }
},

getAllUom: async function (req, res) {
  try {
      let result = await Evolve.App.Services.Evolve.MachineMaster.SrvMachineMasterList.getAllUom();
      if (result instanceof Error ) {
          let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while get Uom !",
              result: null
          };
          res.send(obj);
      } else {
          let obj = {
              statusCode: 200,
              status: "Success",
              message: "Success",
              result: result.recordset
          };
          res.send(obj);
      }
  } catch (error) {
      Evolve.Log.error("Error while getting all Uom  "+error.message);
      let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while getting all Uom  "+error.message,
          result: null
      };
      res.send(obj);
  }
},

    


}