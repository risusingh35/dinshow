'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getRejectionWorkOrder: async function (req, res) {
    try {
      let getRejectionWorkOrder = await Evolve.App.Services.SmartFactory.Rework.SrvRework.getRejectionWorkOrderDatatableList();
      if (
        getRejectionWorkOrder instanceof Error ||
        getRejectionWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 200,
          status: "fail",
          message: "Rejection order not found",
          result: getRejectionWorkOrder.recordsets[0]
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getRejectionWorkOrder.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0749: Error while getting rejection of work order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0749: Error while getting rejection of work order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSinglePodProceess: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.Rework.SrvRework.getSinglePodProceess(req.body);
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on single pod process",
          result: result.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: result.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0750: Error while getting Single Pod Proceess "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0750: Error while getting Single Pod Proceess "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateEpodErework: async function (req, res) {
    try {
      let updateEpodReworkstatus = await Evolve.App.Services.SmartFactory.Rework.SrvRework.updateEpodReworkstatus(req.body);
      let updateReworkRemarkStatus = await Evolve.App.Services.SmartFactory.Rework.SrvRework.updateReworkRemarkStatus(req.body);
      let obj = {
        statusCode: 200,
        status: "success",
        message: "update Reworked status success",
        result: updateEpodReworkstatus.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0751: Error while updating Epod Erework "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0751: Error while updating Epod Erework "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateEpodEreworkScrap: async function (req, res) {
    req.body.EvolveUser_ID = req.EvolveUser_ID;
    try {
      let getScrapDetails = await Evolve.App.Services.SmartFactory.Rework.SrvRework.getScrapDetails(
        req.body
      );
      if (
        getScrapDetails instanceof Error ||
        getScrapDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get scrap details",
          result: getScrapDetails.message
        };
        res.send(obj);
      } else {
        let addScrapDetails = await Evolve.App.Services.SmartFactory.Rework.SrvRework.addScrapDetails(req.body, getScrapDetails.recordset[0]);
        if (addScrapDetails instanceof Error || addScrapDetails.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while create scrap deails",
            result: addScrapDetails.message
          };
          res.send(obj);
        } else {
          let updateEpodScrapStatus = await Evolve.App.Services.SmartFactory.Rework.SrvRework.updateEpodScrapStatus(
            req.body
          );
          let updateScrapRemarkStatus = await Evolve.App.Services.SmartFactory.Rework.SrvRework.updateScrapRemarkStatus(
            req.body
          );
          if (
            updateScrapRemarkStatus instanceof Error ||
            updateScrapRemarkStatus.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while scrap status update",
              result: addScrapDetails.message
            };
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Scrapped Successfully !",
              result: ""
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0752: Error while updating Epod Erework Scrap "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0752: Error while updating Epod Erework Scrap "+error.message,
        result: null
      };
      res.send(obj);
    }
  },



}