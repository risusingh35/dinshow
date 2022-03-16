'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {



  getScrap: async function (req, res) {
    try {

      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      let search = req.body.search.value;

      let processtomachineCount = await await Evolve.App.Services.SmartFactory.Scrap.SrvGetScrap.getScrapCount();
      let processtomachine = await await Evolve.App.Services.SmartFactory.Scrap.SrvGetScrap.getScrapList(
        start,
        length
      );

      var obj = {
        draw: req.body.draw,
        recordsTotal: processtomachineCount.recordset[0].count,
        recordsFiltered: processtomachineCount.recordset[0].count,
        data: processtomachine.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0753: Error while getting scrap "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message:" EERR0753: Error while getting scrap "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  changeScrapStatus: async function (req, res) {
    try {
      let changeScrapStatus = await Evolve.App.Services.SmartFactory.Scrap.SrvGetScrap.changeScrapStatus(
        req.body.EvolveScrap_ID
      );
      if (
        changeScrapStatus instanceof Error ||
        changeScrapStatus.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while change the Scrap Status",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Scrap status change Successfully",
          result: changeScrapStatus.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0754: Error while changing Scrap status "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0754: Error while changing Scrap status "+error.message,
        result: null
      };
      res.send(obj);
    }
  },





}