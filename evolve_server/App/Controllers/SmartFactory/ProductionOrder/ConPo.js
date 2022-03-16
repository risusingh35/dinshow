'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getProductionOrderList: async function (req, res) {
    try {
      let start = parseInt(req.body.start);
      let length = parseInt(req.body.length);
      let searchData = {
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        EvolveProdOrders_OrderId: req.body.EvolveProdOrders_ID,
      };
      let proOrdsCount = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getProductionOrderCountList(searchData);
      let proOrds = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getProductionOrderDatatableList(start, length, searchData);
      let resObj = {
        noOfRecord: proOrdsCount.recordset[0].count,
        records: proOrds.recordset
      }
      let obj = { statusCode: 200, status: "success", message: "Work Order Gotted successfully ", result: resObj };
      console.log("obj :",obj);
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0698: Error while getting Production Order List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0698: Error while getting Production Order List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  checkAllowCreatWo: async function (req, res) {
    try {


      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let checkAllowCreatWo = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.checkAllowCreatWo(
        req.body.EvolveUser_ID
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "",
        result: checkAllowCreatWo.recordset[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0699: Error while checking Allow Creat Wo "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0699: Error while checking Allow Creat Wo "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getAllItem: async function (req, res) {
    try {
      let getItemList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getAllItem();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "getItemList list",
        result: getItemList.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0700: Error while getting All Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0700: Error while getting All Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getItemDescCustPart: async function (req, res) {
    try {
      let getItemDescCustPart = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getItemDescCustPart(
        req.body
      );
      if (
        getItemDescCustPart instanceof Error ||
        getItemDescCustPart.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error to get item desc. and cust part",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "getItemList list",
          result: getItemDescCustPart.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0701: Error while getting Item Desc Cust Part "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0701: Error while getting Item Desc Cust Part "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  printProdOrder: async function (req, res) {
    try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.printProdOrder(
        req.body
      );

      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get work order detail",
          result: null
        };
        res.send(obj);
      } else {
        // for (let i = 0; i < detailWorkOrder.rowsAffected; i++) {
        let barcode =
          detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;

        let ZplData =
          "^XA\r\n" +
          "^MMT^PW360\r\n" +
          "^LL0160^LS10\r\n" +
          "^FX\r\n" +
          "^BY2,2,100\r\n" +
          "^FO10,20^BY0,5,5^BQ,3,6^SN%23%23" +
          barcode +
          ",1,Y^FS\r\n" +
          "^CF0,30 \r\n" +
          "^FO10,170^FD^SN" +
          barcode +
          ",1,Y^FS\r\n" +
          "^PQ" +
          detailWorkOrder.rowsAffected +
          ",0,1,Y\r\n" +
          "^XZ";
        const data = Evolve.Config.printer['url'] + "?KonnectID=" + Evolve.Config.printer['KonnectID'] + "&data=" + ZplData;
        Evolve.Axios.get(data)
          .then((response) => {
            if (response.status == 200) {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode printed",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error in print barcode",
                result: null
              };
              res.send(obj);
              Evolve.Log.info(res);
            }
          })
      }
    } catch (error) {
      Evolve.Log.error(" EERR0702: Error while printing Prod Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0702: Error while printing Prod Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printProdOrderSerial: async function (req, res) {
    try {
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.printProdOrderSerial(
        req.body.EvolveProdOrdersDetail_ID
      );
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get work order detail",
          result: null
        };
        res.send(obj);
      } else {
        let barcode =
          detailWorkOrder.recordset[0].EvolveProdOrdersDetail_Serial;
        let itemCode = detailWorkOrder.recordset[0].EvolveItem_Code;
        let ZplData =
          "^XA\r\n" +
          "^MMT^PW360\r\n" +
          "^LL0160^LS10\r\n" +
          "^FX\r\n" +
          "^BY2,2,100\r\n" +
          "^FO10,20^BY0,5,5^BQ,3,6^FDQA," +
          barcode +
          "^FS\r\n" +
          "^CF0,30 \r\n" +
          "^FO10,170^FD" +
          barcode +
          "^FS\r\n" +
          "^XZ";

        const data = Evolve.Config.printer['url'] + "?KonnectID=" + Evolve.Config.printer['KonnectID'] + "&data=" + ZplData;
        Evolve.Axios.get(data)
          .then((response) => {
            if (response.status == 200) {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Barcode printed",
                result: null
              };
              res.send(obj);
            } else {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error in print barcode",
                result: null
              };
              res.send(obj);
              Evolve.Log.info(res);
            }
          })
      }
    } catch (error) {
      Evolve.Log.error(" EERR0703: Error while printing Prod Order Serial "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0703: Error while printing Prod Order Serial "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  startWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let checkPickListGenerated = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.checkPickListGenerated(
        req.body
      );
      if (
        checkPickListGenerated instanceof Error ||
        checkPickListGenerated.recordset[0].count < 1
      ) {
        console.log("error in check picklist generte ")
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Picklist not generated",
          result: null
        };
        res.send(obj);
      } else {
        let getWorkOrderData = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getWorkOrderData(
          req.body
        );
        if (
          getWorkOrderData instanceof Error ||
          getWorkOrderData.rowsAffected < 1
        ) {
          console.log("error in check getWorkOrderData ")

          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while getting work order !",
            result: null
          };
          res.send(obj);
        } else {
          let getWorkOrderItemData = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getWorkOrderItemData(
            getWorkOrderData.recordset[0].EvolveItem_ID
          );
          if (
            getWorkOrderItemData instanceof Error ||
            getWorkOrderItemData.rowsAffected < 1
          ) {
            console.log("error in check getWorkOrderItemData ")

            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while getting work order item",
              result: null
            };
            res.send(obj);
          } else {
            if (
              getWorkOrderItemData.recordset[0].EvolveSerial_ID == null ||
              getWorkOrderItemData.recordset[0].EvolveProcessTemp_Id == null
            ) {
              console.log("error in check getWorkOrderItemData ")

              let obj = {
                statusCode: 400,
                status: "fail",
                message:
                  "Serial master / process template not assign to item",
                result: null
              };
              res.send(obj);
            } else {
              let countStartedWo = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.countStartedWo(
                getWorkOrderData.recordset[0].EvolveItem_ID
              );
              if (
                countStartedWo instanceof Error ||
                countStartedWo.rowsAffected < 1
              ) {
                let obj = {
                  statusCode: 400,
                  status: "fail",
                  message: "Error while work order count",
                  result: null
                };
                res.send(obj);
              } else {
                if (
                  parseInt(countStartedWo.recordset[0].EvolveSerial_WoLimit) >
                  parseInt(countStartedWo.recordset[0].started_Wo)
                ) {
                  let startWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.startWorkOrder(
                    req.body
                  );
                  if (
                    startWorkOrder instanceof Error ||
                    startWorkOrder.rowsAffected < 1
                  ) {
                    let obj = {
                      statusCode: 400,
                      status: "fail",
                      message: "Error while start work order",
                      result: null
                    };
                    res.send(obj);
                  } else {
                    let obj = {
                      statusCode: 200,
                      status: "success",
                      message: "Work order started successfully",
                      result: null
                    };
                    res.send(obj);
                  }
                } else {
                  let obj = {
                    statusCode: 400,
                    status: "fail",
                    message:
                      "Only " +
                      countStartedWo.recordset[0].EvolveSerial_WoLimit +
                      " Work order limit to started at a time",
                    result: null
                  };
                  res.send(obj);
                }
              }
              // let startWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.startWorkOrder(req.body);
              // if (startWorkOrder instanceof Error || startWorkOrder.rowsAffected < 1) {
              //   let obj = { statusCode: 400, status: "fail", message: "Error While Start Work Order", result: null };
              //   res.send(obj);
              // } else {

              //   let obj = { statusCode: 200, status: "success", message: "Work Order Started Successfully !", result: null };
              //   res.send(obj);
              // }
            }
          }
        }
      } //if (checkPickListGenerated instanceof Error || checkPickListGenerated.recordset[0].count < 0) {
    } catch (error) {
      Evolve.Log.error(" EERR0704: Error while starting Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0704: Error while starting Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  createWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let createWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.createWorkOrder(
        req.body
      );
      if (
        createWorkOrder instanceof Error ||
        createWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while create work order",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work order created successfully",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0705: Error while creating Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0705: Error while creating Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  closeWorkOrder: async function (req, res) {
    try {

      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let response = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.closeWorkOrder(
        req,
        res,
        req.body.EvolveProdOrders_ID
      );
      if (response instanceof Error || response.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "Fail",
          message: response.message,
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work order close successfully",
          result: []
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0706: Error while closing Work Order "+error.message);
      // let obj = {
      //   statusCode: 400,
      //   status: "fail",
      //   message: "  "+error.message,
      //   result: null
      // };
      res.send(obj);
    }
  },


  getWorkCenterList: async function (req, res) {
    try {
      let getWorkCenterList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getWorkCenterList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "getWorkCenter list",
        result: getWorkCenterList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0707: Error while getting Work Center List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0707: Error while getting Work Center List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },
  getWorkCenterList: async function () {
    try {
      return await Evolve.SqlPool.request().query(
        "SELECT EvolveSection_ID,EvolveSection_Name  FROM EvolveSection"
      );
    } catch (error) {
      Evolve.Log.error(" EERR0708: Error while getting Work Center List "+error.message);
      return new Error(" EERR0708: Error while getting Work Center List "+error.message);
    }
  },
  detailWorkOrder: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      req.body.EvolveCompany_ID = req.EvolveCompany_ID;
      req.body.EvolveUnit_ID = req.EvolveUnit_ID;
      let detailWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.detailWorkOrder(
        req.body
      );
      if (
        detailWorkOrder instanceof Error ||
        detailWorkOrder.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get work order detail",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Work order started successfully",
          result: detailWorkOrder.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0709: Error while detail Work Order "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0709: Error while detail Work Order "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getOpenWorkOrderList: async function (req, res) {
    try {
      let workOrderList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getOpenWorkOrderList();
      let obj = {
        statusCode: 200,
        status: "success",
        message: "Work order list",
        result: workOrderList.recordsets[0]
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0710: Error while getting Open Work Order List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0710: Error while getting Open Work Order List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  downloadPO_xls: async function (req, res) {
    let data1 = [
      ["Work Order ID", "Work Order Number", "Quantity"],
      ["04320001", "WO04320001", "10"],
    ];
    let ws = Evolve.Xlsx.utils.aoa_to_sheet(data1);
    let wb = Evolve.Xlsx.utils.book_new();
    let file_name = "WO04320001.xlsx"
    Evolve.Xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    Evolve.Xlsx.writeFile(wb, Evolve.Config.csvReportPath + "/" + file_name);
    let obj = { statusCode: 200, status: "success", message: "Work order XLS File", result: "/" + file_name };
    res.send(obj);
  },

  getWoPlanningList: async function (req, res) {
    try {
      let getWoPlanningList = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.getWoPlanningList(req.body);
      if (getWoPlanningList instanceof Error || getWoPlanningList.rowsAffected < 1) {
        let obj = { statusCode: 400, status: "fail", message: "Machine list not found", result: null };
        res.send(obj);
      } else {
        let obj = { statusCode: 200, status: "success", message: "Machine list", result: getWoPlanningList.recordset };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0711: Error while getting Wo Planning List "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0711: Error while getting Wo Planning List "+error.message, result: null };
      res.send(obj);
    }
  },

  publishWoPlanning: async function (req, res) {
    try {
      let EvolveUser_ID = req.EvolveUser_ID;
      let publishWoPlanning_error = false;
      for (let i = 0; i < req.body.publishWoArray.length; i++) {
        if (publishWoPlanning_error == false) {
          let data = req.body.publishWoArray[i];
          data.EvolveUser_ID = EvolveUser_ID;
          data.EvolveProdOrders_OrderId = data.EvolveProdOrders_OrderId + "_" + (i + 1);
          let publishWoPlanning = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.publishWoPlanning(data);
          console.log("publish planning >>. ", publishWoPlanning)
          if (publishWoPlanning instanceof Error || publishWoPlanning.rowsAffected < 1) {
            Evolve.Log.info("Error while publish workorder")
            Evolve.Log.error(" EERR0712: Error while publishing Wo Planning "+publishWoPlanning.message);
            publishWoPlanning_error = true;
          } else {
            let ioData = {
              EvolveIO_Data: {
                "EvolveProdOrders_OrderId": data.EvolveProdOrders_OrderId,
                "EvolveProdOrders_Order": data.EvolveProdOrders_Order,
                "EvolveItem_Code": data.EvolveItem_Code,
                "EvolveMachine_Name": data.EvolveMachine_Name,
                "EvolveProdOrders_Quantity": data.EvolveProdOrders_Quantity
              },

              EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
              EvolveIO_Code: "EVOLVEWOSPLT", // EVOLVEWOSPLT = Evolve Work Order Split
              EvolveIO_Data_Formate: "XML",
              EvolveIO_ERP_Type: "QAD",
              EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
              EvolveIO_File_Data: ""
            };
            // console.log("ioData ::", ioData.EvolveIO_Data.child);
            let addIOData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.addIOData(ioData);
            console.log("ad dio data >>", addIOData)

            if (addIOData instanceof Error || addIOData.rowsAffected < 1) {
              Evolve.Log.info("Error while add in ioData");
              Evolve.Log.error(" EERR0713: Error while adding Io Data "+addIOData.message);
              publishWoPlanning_error = true;
            }
          }
        }
      }
      if (publishWoPlanning_error == true) {
        let obj = { statusCode: 400, status: "fail", message: "Error while publish work order", result: null };
        res.send(obj);
      } else {
        let deleteWorkOrder = await Evolve.App.Services.SmartFactory.ProductionOrder.SrvPo.deleteWorkOrder(req.body.EvolveProdOrders_ID);
        if (deleteWorkOrder instanceof Error || deleteWorkOrder.rowsAffected < 1) {
          let obj = { statusCode: 400, status: "fail", message: "Error while delete work order", result: null };
          res.send(obj);
        }
        else {
          let obj = { statusCode: 200, status: "success", message: "Work order publish successfully ", result: null };
          res.send(obj)
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0714: Error while publishing Wo Planning "+error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0714: Error while publishing Wo Planning "+error.message, result: null };
      res.send(obj);
    }
  },

  checkWoSplitEnable: async function (req, res) {
    let configValue = await Evolve.App.Services.Unit.UnitServices.getUnitConfigValue('wo_split_enable');
    if (configValue instanceof Error || configValue.rowsAffected < 1) {
      let obj = { statusCode: 400, status: "fail", message: configValue.message, result: { isEnable: "false" } };
      res.send(obj);
    } else {
      let obj = { statusCode: 200, status: "success", message: "Unit Config Value", result: { isEnable: configValue.recordset[0].EvolveUnitConfig_Value } };
      res.send(obj);
    }
  }
}
