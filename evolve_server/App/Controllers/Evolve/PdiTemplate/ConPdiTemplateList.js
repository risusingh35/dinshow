'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addPDITemp: async function (req, res) {
        try {
          let result = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.addPDITemp(
            req.body
          );
          if (result instanceof Error || result.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while create pdi template !",
              result: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "Pdi template created successfully",
              result: null
            };
            res.send(obj);
          }
        } catch (error) {
          Evolve.Log.error(" EERR0337: Error while adding PDI Temp "+error.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: " EERR0337: Error while adding PDI Temp "+error.message,
            result: null
          };
          res.send(obj);
        }
      },

      
  updatePDITempDetail: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.updatePDITempDetail(
        req.body
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while updating pdi template !",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Pdi template updating succsessfully ",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0338: Error while updating PDI temp detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0338: Error while updating PDI temp detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addPDITempCode: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.addPDITempCode(
        req.body
      );
      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while add pdi template code !",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Pdi template code added succsessfully ",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0339: Error while adding PDI Temp Code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0339: Error while adding PDI Temp Code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  
  selectSinglePDITemp: async function (req, res) {
    try {
      let processData = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.selectSinglePDITemp(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Single pdi template",
        result: processData.recordset
      };

      res.send(obj);
    } catch (error) { 
      Evolve.Log.error(" EERR0340: Error while selecting selecting Single PDI Temp "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0340: Error while selecting selecting Single PDI Temp "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getPDITempCode: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.getPDITempCode(
        req.body
      );

      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while select pdi template code !",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Process",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0341: Error while getting PDI Temp Code "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0341: Error while getting PDI Temp Code "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getPDITempDetail: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;
      let count = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.getPDITempDetailListCount(search);
      let list = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.getPDITempDetailList(start ,length , search);
     
      if (list instanceof Error) {
        let obj = {
            statusCode: 400,
            status: "fail",
            message: "EERR3062 : Error while get pdi template list ",
            result: null        
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
            message: "Pdi template list",
            result: resObj
        };
        res.send(obj);
    }
    } catch (error) {
      Evolve.Log.error(" EERR0342: Error while getting PDI temp Detail "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0342: Error while getting PDI temp Detail "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deletePDITempDetail: async function (req, res) {
    try {
      let result = await Evolve.App.Services.Evolve.PdiTemplate.SrvPdiTemplateList.deletePDITempDetail(
        req.body.id
      );

      if (result instanceof Error || result.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while deleting pdi template !",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Pdi template deleted succsessfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0343: Error while deleting PDI Temp details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0343: Error while deleting PDI Temp details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },




}