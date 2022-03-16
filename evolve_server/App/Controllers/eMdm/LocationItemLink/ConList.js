"use strict";
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  getItemSearch: async function (req, res) {
    try {
      let result =
        await Evolve.App.Services.Evolve.Location.SrvList.getItemSearch(
          req.body.term
        );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Item search Successfully",
        result: result.recordset,
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(
        "EERR0755: Error while getting Item search" + error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "EERR0755: Error while getting Item search" + error.message,
        result: null,
      };
      res.send(obj);
    }
  },
  getLocationList: async function (req, res) {
    try {
      let result =
        await Evolve.App.Services.Evolve.Location.SrvList.getLocationList();
      console.log("result >>>>>>>>>>>>>>>>>>>>>>>>>", result);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get Location List !",
          result: null,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: result.recordset,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(
        "EERR0755: Error while getting Location Search" + error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message:
          "EERR0755: Error while getting Location Search" + error.message,
        result: null,
      };
      res.send(obj);
    }
  },
  getSingleItemDetails: async function (req, res) {
    try {
      let result =
        await Evolve.App.Services.eMdm.LocationItemLink.SrvList.getSingleItemDetails(
          req.body
        );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get Item List !",
          result: null,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "success",
          result: result.recordset,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR#### Error while get Item List " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR#### Error while get Item List " + error.message,
        result: null,
      };
      res.send(obj);
    }
  },
  getSingleLocationDetails: async function (req, res) {
    try {
      let result =
        await Evolve.App.Services.eMdm.LocationItemLink.SrvList.getSingleLocationDetails(
          req.body
        );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get Location List !",
          result: null,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "success",
          result: result.recordset,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR#### Error while get Location List " + error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR#### Error while get Location List " + error.message,
        result: null,
      };
      res.send(obj);
    }
  },

  AddLocationItemLink: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result =
        await Evolve.App.Services.eMdm.LocationItemLink.SrvList.AddLocationItemLink(
          req.body
        );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while Add Location Item Link List !",
          result: null,
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Location Item Link Successfully",
          result: result.recordset,
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(
        " EERR#### Error while Add Location Item Link " + error.message
      );
      let obj = {
        statusCode: 400,
        status: "fail",
        message:
          " EERR#### Error while Add Location Item Link " + error.message,
        result: null,
      };
      res.send(obj);
    }
  },
};
