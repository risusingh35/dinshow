'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getSingleDoData: async function (req, res) {
    try {
      let doData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getSingleDoData(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Shift single list",
        result: doData.recordset
      };

      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0554: Error while get Single Do Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0554: Error while get Single Do Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getdoidpdftabledata: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getdoidpdftabledata(
        req.body
      );
      if (result instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get pdf data",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Success",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0555: Error while getting doi pdfTable data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0555: Error while getting doi pdfTable data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getDoDataTable: async function (req, res) {
    try {
      let doItems = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getDoDataTableList(
        req.body
      );
      if (doItems instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Do data not found",
          result: doItems.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: doItems.recordsets[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0556: Error while getting Do data table "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0556: Error while getting Do data table "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getallCustomer: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getallCustomer(
        req.body
      );
      if (result instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get customer ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0557: Error while getting all customer "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0557: Error while getting all customer "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSingleDoSoLine: async function (req, res) {
    try {
      let getSingleDoSoLine = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getSingleDoSoLine(
        req.body
      );
      if (
        getSingleDoSoLine instanceof Error
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on single do line",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: getSingleDoSoLine.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0558: Error while getting Single Do So Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0558: Error while getting Single Do So Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getSalesOrderDetails: async function (req, res) {
    try {
      let getDate = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getSalesOrderDetails(
        req.body
      );
      if (getDate instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get so details",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: getDate.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0559: Error while getting sales order details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0559: Error while getting sales order details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoDetails: async function (req, res) {
    try {
      let getDoDetails = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getDoDetails(req.body);
      if (getDoDetails.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get do",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: getDoDetails.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0560: Error while getting Do details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0560: Error while getting Do details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getSoNumberList: async function (req, res) {
    try {
      let itemNumberList = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getSoNumberList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Success",
        result: itemNumberList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0561: Error while getting So number list "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0561: Error while getting So number list "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addDoList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let doNumber = await Evolve.App.Controllers.Unit.unitControllers.getDoNumber();
      req.body.EvolveDo_Number = doNumber.recordset[0].EvolveUnitConfig_Value;
      let getSoNumber = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getSoNumberById(
        req.body
      );
      if (getSoNumber instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get so number",
          result: null
        };
        res.send(obj);
      }
      let soNumber = getSoNumber.recordset[0].EvolveSalesOrder_Number;
      let addDoList = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.addDoList(
        req.body,
        soNumber
      );
      if (addDoList instanceof Error || addDoList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on add do",
          result: null
        };
        res.send(obj);
      }

      let doLineError = false;
      let array = req.body.doLineArrayData;
      console.log("array :",array);
      for (let i = 0; i < array.length; i++) {

        let part = array[i].EvolveSalesOrderLine_Part;
        let getTempId = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getTempId(
          part
        );
        if (getTempId.rowsAffected < 1) {
          array[i].EvolvePDITemplate_ID = "";
        } else {
          let tempId = getTempId.recordset[0].EvolvePDITemplate_ID;
          array[i].EvolvePDITemplate_ID = tempId;
        }

      }

      for (let i = 0; i < array.length; i++) {
        if (doLineError == false) {
          let indexData = {
            EvolveDO_ID: addDoList.recordset[0].inserted_id,
            EvolveDOLine_Number: i + 1,
            EvolveDOLine_Part: array[i].EvolveSalesOrderLine_Part,
            EvolveDOLine_Custpart: array[i].EvolveSalesOrderLine_Custpart,

            EvolveDOLine_QtyInv: array[i].EvolveSalesOrderLine_InvQty,
            EvolveDOLine_QtyDO: array[i].newDoQty,
            EvolveSalesOrderLine_ID: array[i].EvolveSalesOrderLine_ID,
            EvolvePDITemplate_ID: array[i].EvolvePDITemplate_ID,
            EvolveSoLine_Number: array[i].EvolveSalesOrderLine_Number
          };
          
          if (indexData.EvolvePDITemplate_ID != "") {
            indexData.EvolveUser_ID = req.EvolveUser_ID;

            let addDolineData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.addDoLineData(
              indexData
            );
            let updateSaesOrder = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateSaesOrder(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO)
            );

            if (
              updateSaesOrder instanceof Error ||
              updateSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let addDoHistory = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.addDoHistory(
              indexData,
              req.body,
              soNumber
            );
            if (
              addDoHistory instanceof Error ||
              addDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          } else {
            let addDolineNullPDI = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.addDolineNullPDI(
              indexData
            );
            if (
              addDolineNullPDI instanceof Error ||
              addDolineNullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateSONullPDI = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateSONullPDI(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO)
            );

            if (
              updateSONullPDI instanceof Error ||
              updateSONullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let addDoHistoryNullPDI = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.addDoHistoryNullPDI(
              indexData,
              req.body,
              soNumber
            );
            if (
              addDoHistoryNullPDI instanceof Error ||
              addDoHistoryNullPDI.rowsAffected < 1
            ) {
              doLineError = true;
            }
          }
        }
      }
      if (doLineError == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Do Number : " + req.body.EvolveDo_Number
        };
        res.send(obj);
        let doNumber = await Evolve.App.Controllers.Unit.unitControllers.updateDoNumber();
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on add do data !"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0562: Error  while adding Do List" +error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0562: Error  while adding Do List" +error.message,
        result: null
      };
      res.send(obj);
    }
  },

  updateDoList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let updateDoList = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateDoList(
        req.body
      );
      if (updateDoList instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on update do",
          updateDoList: null
        };
        res.send(obj);
      }
      let doLineError = false;
      let array = req.body.doLineArrayData;

      for (let i = 0; i < array.length; i++) {
        if (doLineError == false) {
          let indexData = {
            EvolveDO_ID: req.body.EvolveDO_ID,
            EvolveDOLine_Number: i + 1,
            EvolveDOLine_Part: array[i].EvolveSalesOrderLine_Part,
            EvolveDOLine_Custpart: array[i].EvolveSalesOrderLine_Custpart,
            EvolveDOLine_QtyInv: array[i].EvolveSalesOrderLine_InvQty,
            EvolveDOLine_QtyDO: array[i].newDoQty,
            EvolveSalesOrderLine_ID: array[i].EvolveSalesOrderLine_ID,
            EvolveDOLine_QtyDOOld: array[i].EvolveDOLine_QtyDO,
            EvolveDOLine_ID: array[i].EvolveDOLine_ID
          };
          let getDoNumberById = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getDoNumberById(
            req.body
          );

          let getPDITemplateID = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getPDITemplateID(
            indexData.EvolveDOLine_ID
          );

          if (
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == null ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == "" ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == 0 ||
            getPDITemplateID.recordset[0].EvolvePDITemplate_ID == "NULL"
          ) {
            let updateNonPdiSaesOrder = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateNonPdiSaesOrder(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO),
              indexData.EvolveDOLine_QtyDOOld
            );
            if (
              updateNonPdiSaesOrder instanceof Error ||
              updateNonPdiSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }
            let updateDoQuantity = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateNonPDIDoLineAtUpdate(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body.EvolveDO_ID
            );
            if (
              updateDoQuantity instanceof Error ||
              updateDoQuantity.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateNonPDIDoHistory = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateNonPDIDoHistory(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body,
              getDoNumberById.recordset[0].EvolveDO_Number
            );
            if (
              updateNonPDIDoHistory instanceof Error ||
              updateNonPDIDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          } else {
            let updateSaesOrder = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateSalesOrderAtUpdate(
              indexData.EvolveSalesOrderLine_ID,
              parseInt(indexData.EvolveDOLine_QtyDO),
              indexData.EvolveDOLine_QtyDOOld
            );
            if (
              updateSaesOrder instanceof Error ||
              updateSaesOrder.rowsAffected < 1
            ) {
              doLineError = true;
            }
            let updateDoQuantity = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateDoLineAtUpdate(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body.EvolveDO_ID
            );
            if (
              updateDoQuantity instanceof Error ||
              updateDoQuantity.rowsAffected < 1
            ) {
              doLineError = true;
            }

            let updateDoHistory = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateDoHistory(
              indexData,
              parseInt(indexData.EvolveDOLine_QtyDO),
              req.body,
              getDoNumberById.recordset[0].EvolveDO_Number
            );
            if (
              updateDoHistory instanceof Error ||
              updateDoHistory.rowsAffected < 1
            ) {
              doLineError = true;
            }
          }
        }
      }

      if (doLineError == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message:
            " Do Number :" + req.body.EvolveDO_Number + " Updated Successfully"
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on add do data !"
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0563: Error while updating Do List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0563: Error while updating Do List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  deleteDoLine: async function (req, res) {
    try {
      let getDoLineDetails = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getDoSoLineDetails(
        req.body
      );
      if (
        getDoLineDetails instanceof Error ||
        getDoLineDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while found dO line"
        };
        res.send(obj);
      } else {
        let doLineData = getDoLineDetails.recordset[0];
        doLineData.EvolveDOLine_QtyPDI = 0;
        if (parseInt(doLineData.EvolveDOLine_QtyPDI) > 0) {
          pdiQty = doLineData.EvolveDOLine_QtyPDI;
          // Delete PDI History based on Do Line ID
          let deletePDIHistoryDoLine = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.deletePDIHistoryDoLine(
            req.body
          );
          if (
            deletePDIHistoryDoLine instanceof Error ||
            deletePDIHistoryDoLine.rowsAffected < 1
          ) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on delete pdi qty",
              result: null
            };
            res.send(obj);
          }
        } else {
          doLineData.EvolveDOLine_QtyPDI = 0;
        }

        //Update SO Qty
        let updateSoLineDetails = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateSoLineDetails(
          doLineData
        );
        if (
          updateSoLineDetails instanceof Error ||
          updateSoLineDetails.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on update so line",
            result: null
          };
          res.send(obj);
        } else {
          //DO Line
          let deleteDoLine = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.deleteDoLine(
            doLineData
          );
          if (deleteDoLine instanceof Error || deleteDoLine.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error on delete do line",
              result: null
            };
            res.send(obj);
          } else {
            let obj = {
              statusCode: 200,
              status: "success",
              message: "DO line deleted successfully !",
              result: null
            };
            res.send(obj);
          }
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0564: Error while deleting Do Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0564: Error while deleting Do Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoList: async function (req, res) {
    try {
      let result = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.getDoList(
        req.body
      );
      if (result instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on get do list",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully",
          result: result.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0565: Error while getting Do List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0565: Error while getting Do List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  deleteDoData: async function (req, res) {
    try {
      let updateSoLineData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.updateSoLineData(
        req.body.id
      );
      if (updateSoLineData instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on update so line data",
          result: null
        };
        res.send(obj);
      }
      let deleteDoLineData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.deleteDoLineData(
        req.body.id
      );

      if (
        deleteDoLineData instanceof Error
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on delete do line data",
          result: null
        };
        res.send(obj);
      }
      let deleteDoData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDo.deleteDoData(
        req.body.id
      );

      if (deleteDoData instanceof Error || deleteDoData.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on delete do data ",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "DO deleted succsessfully ",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0566: Error while deleting Do Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0566: Error while deleting Do Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },






}