'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


  getAllData: async function (req, res) {
    
    try {
      
      let list = await Evolve.App.Services.Evolve.QcReports.QcSrv.getAllData(req.query);
      
      if (list instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: " Error while getting Item ",
          result: list.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successful",
          result:  list.recordset,
        };
      res.send(obj);
      }

      
    } catch (error) {
      Evolve.Log.error(" Error while getting parent List "+error.message);
      let obj = {
        statusCode: 400,
        message: " Error while getting parent List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getDatabyLotAndSerial: async function (req, res) {
   
    try {
      let response = await Evolve.App.Services.Evolve.QcReports.QcSrv.getDatabyLotAndSerial(req.body)     
      if (response instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: " Error while getting Item ",
          result: response.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successful",
          result:  response.recordset,
        };

       
      res.send(obj);
      }

      
    } catch (error) {
      Evolve.Log.error(" Error while getting  List "+error.message);
      let obj = {
        statusCode: 400,
        message: " Error while getting  List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getPalletAndLotNo: async function (req, res) {
    
    try {
      
      let list = await Evolve.App.Services.Evolve.QcReports.QcSrv.getPalletAndLotNo(req.query);
      
      if (list instanceof Error ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: " Error while getting Item ",
          result: list.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successful",
          result:  list.recordset,
        };
      res.send(obj);
      }

      
    } catch (error) {
      Evolve.Log.error(" Error while getting pallet and lot List "+error.message);
      let obj = {
        statusCode: 400,
        message: " Error while getting pallet and lot List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  

  // let response = await Evolve.App.Services.Evolve.QcReports.QcSrv.getDatabyLotAndSerial(req.body)







}