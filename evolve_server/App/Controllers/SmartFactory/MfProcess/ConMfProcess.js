'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
  checkAllowCreatWo: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let checkAllowCreatWo = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.checkAllowCreatWo(
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
      Evolve.Log.error(" EERR0592: Error while checking allow creating Wo "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0592: Error while checking allow creating Wo "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFProcessValidations: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMFProcessValidations(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "MF process validations",
        result: result.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0593: Error while getting MF process validations "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0593: Error while getting MF process validations "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFSerialList: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMFSerialList(
        req.body
      );
      let obj = {
        statusCode: 200,
        status: "success",
        message: "MF process serial list",
        result: result.recordset
      };
      res.send(obj);
    } catch (error) {
      Evolve.Log.error(" EERR0594: Error while getting MF Serial List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0594: Error while getting MF Serial List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMFBarcodeDetails: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let result = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMFBarcodeDetails(
        req.body
      );
      if (result.rowsAffected > 0) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Barcode details",
          result: result.recordset[0]
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "success",
          message: "Invalid barcode scan",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0595: Error while getting MF Barcode Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0595: Error while getting MF Barcode Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  saveMfProcess: async function (req, res) {
    // saveMfProcess Start
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;

      let errorProcess = false;
      for (let i = 0; i < req.body.saveProcess.length; i++) {
        if (errorProcess == false) {
          req.body.saveProcess[i].EvolveProdOrderHistoryType_Code = "MFPROCESS";
          req.body.saveProcess[i].remark = req.body.remark;
          req.body.saveProcess[i].operator = req.body.operator;


          if (req.body.saveProcess[i].old_value != null) {
            if (req.body.saveProcess[i].EvolveProcessVal_Type == 'Image') {
              if (req.body.saveProcess[i].selected_value != '') {


                let d = new Date();
                let time = d.getTime();
                let extention = req.body.saveProcess[i].selected_value.substring(
                  "data:image/".length,
                  req.body.saveProcess[i].selected_value.indexOf(";base64")
                );
                let fileName = time + "_process_validation." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/png;base64,/, "");
                base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(
                  Evolve.Config.imageUploadPath + fileName,
                  base64Data,
                  "base64",
                  function (err) {
                    if (err) {
                      console.log(err);
                      // res.json(0);
                    } else {
                      console.log("The file was saved!");
                      // res.json(fileName);
                    }
                  }
                );
                req.body.saveProcess[i].selected_value = req.body.imageName;
              }
              else {
                req.body.saveProcess[i].selected_value = '';
              }
            }
            let addHistory = await Evolve.App.Controllers.Unit.unitControllers.updateProdOrdersHistory(
              req.body.saveProcess[i],
              req.body.EvolveUser_ID
            );
            if (addHistory.rowsAffected[0] < 1) {
              errorProcess = true;
            }
          }
          else {
            if (req.body.saveProcess[i].EvolveProcessVal_Type == 'Image') {

              if (req.body.saveProcess[i].selected_value != '') {


                let d = new Date();
                let time = d.getTime();
                let extention = req.body.saveProcess[i].selected_value.substring(
                  "data:image/".length,
                  req.body.saveProcess[i].selected_value.indexOf(";base64")
                );
                let fileName = time + "_process_validation." + extention;
                req.body.imageName = fileName;
                let base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/png;base64,/, "");
                base64Data = req.body.saveProcess[i].selected_value.replace(/^data:image\/jpeg;base64,/, "");
                Evolve.Fs.writeFile(
                  Evolve.Config.imageUploadPath + fileName,
                  base64Data,
                  "base64",
                  function (err) {
                    if (err) {
                      console.log(err);
                      // res.json(0);
                    } else {
                      console.log("The file was saved!");
                      // res.json(fileName);
                    }
                  }
                );
                req.body.saveProcess[i].selected_value = req.body.imageName;
              }
              else {
                req.body.saveProcess[i].selected_value = '';
              }
            }
            let addHistory = await Evolve.App.Controllers.Unit.unitControllers.addProdOrdersHistory(
              req.body.saveProcess[i],
              req.body.EvolveUser_ID
            );
            if (addHistory.rowsAffected[0] < 1) {
              errorProcess = true;
            }

          }

        }
      }
      if (errorProcess == false) {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Validations saved successfully",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while save process validations",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0596: Error while saving Mf process "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0596: Error while saving Mf process "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // saveMfProcess End

  printMfProcessDetails: async function (req, res) {
    try {
      let detailSerialNo = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.printMfProcessDetails(
        req.body.EvolveProdOrdersDetail_Serial
      );

      if (detailSerialNo instanceof Error || detailSerialNo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get item code  ",
          result: null
        };
        res.send(obj);
      } else {
        let barcode = req.body.EvolveProdOrdersDetail_Serial;
        let itemCode = detailSerialNo.recordset[0].EvolveItem_Code;
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
      Evolve.Log.error(" EERR0597: Error while printing Mf Process Details "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0597: Error while printing Mf Process Details "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printRejectionDetails: async function (req, res) {
    try {
      let detailSerialNo = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.printRejectionDetails(
        req.body.EvolveProdOrdersDetail_Serial
      );


      if (detailSerialNo instanceof Error || detailSerialNo.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while get item code  ",
          result: null
        };
        res.send(obj);
      } else {
        let rejectedSerialNO =
          detailSerialNo.recordset[0].EvolveReworkSrNo_Serial;
        let serialNO = req.body.EvolveProdOrdersDetail_Serial;
        let userName = detailSerialNo.recordset[0].EvolveUser_Name;

        let ZplData =
          "^XA\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,100^FDRejected Serial No :" +
          rejectedSerialNO +
          "^FS\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,120^FDSerial No :" +
          serialNO +
          "^FS\r\n" +
          "^CFA,14 \r\n" +
          "^FO45,140^FDUser Name :" +
          userName +
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
      Evolve.Log.error(" EERR0598: Error while printing rejections details " +error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0598: Error while printing rejections details " +error.message,
        result: null
      };
      res.send(obj);
    }
  },

  moveMfProcess: async function (req, res) {
    // moveMfProcess Start
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getNxtProcessSeq = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getNxtProcessSeq(
        req.body
      ); // Get Next Process Seq.
      let getMachineId = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMachineId(
        req.body.EvolveUser_ID
      );
      if (req.body.finished == true) {
        if (
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_PrvSeq == 5 &&
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq == 6
        ) {
          getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq =
            parseInt(getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq) + 2;
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq =
            parseInt(
              getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
            ) + 2;
        }
      }

      // console.log("Sequence is >>. " ,getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq )
      if (getNxtProcessSeq.rowsAffected > 0) {
        //getNxtProcessSeq.rowsAffected >0 Start
        let updateSerialNxtProcess = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.updateSerialNxtProcess(
          req.body,
          getNxtProcessSeq.recordset[0].Evolveprocesstemp_seq,
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
        );

        if (updateSerialNxtProcess.rowsAffected < 1) {
          //updateSerialNxtProcess instanceof error Start
          Evolve.Log.error(updateSerialNxtProcess.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while move serial number !",
            result: null
          };
          res.send(obj);
        }
        let getSerialNoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getSerialNoData(
          req.body
        );

        let updatePoHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.updatePoHistory(
          req.body,
          getMachineId.recordset[0].EvolveMachine_ID,
          getNxtProcessSeq.recordset[0],
          getNxtProcessSeq.recordset[0].EvolveProdOrdersDetail_NxtSeq
        );
        if (
          updatePoHistory instanceof Error ||
          updatePoHistory.rowsAffected < 1
        ) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Move Serial Number !",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Serial Number Completed Successfully !",
            result: null
          };
          res.send(obj);
        }
      } else {
        let completeSerialNxtProcess = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.completeSerialNxtProcess(
          req.body,
          getMachineId.recordset[0].EvolveMachine_ID
        );
        if (completeSerialNxtProcess.rowsAffected < 1) {
          //completeSerialNxtProcess instanceof error Start
          Evolve.Log.error(completeSerialNxtProcess.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error While Complete Serial Number !",
            result: null
          };
          res.send(obj);
        } else {
          // Send Data to QAD/SAP/ETC

          let getWoDetails = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getWoDetails(req.body.EvolveProdOrdersDetail_Serial);
          // console.log("getWoDetails ::", getWoDetails);
          if (getWoDetails.rowsAffected > 0) {
            // let childData = [];
            // // console.log("length==", getWoDetails.recordset.length);
            // for (let i = 0; i < getWoDetails.recordset.length; i++) {
            //   let lotQty = getWoDetails.recordset[i].EvolveProdOrderBom_QtyReq / getWoDetails.recordset[i].EvolveProdOrders_Quantity;
            //   // console.log('reqQty--', getWoDetails.recordset[i].EvolveProdOrderBom_QtyReq)
            //   childData.push(
            //     {
            //       'part': getWoDetails.recordset[i].child_item,
            //       'lotserialQty': lotQty,
            //       'site': '10',
            //       'location': 'FG',
            //       'lotserial': getWoDetails.recordset[0].EvolveProdOrdersDetail_Serial,
            //       'multiEntry': 'TRUE',
            //     }
            //   )
            // }
            // console.log('child', childData);
            let ioData = {
              EvolveIO_Data: {
                parent: {
                  EvolveProdOrdersDetail_Serial: getWoDetails.recordset[0].EvolveProdOrdersDetail_Serial,
                  EvolveProdOrders_Order: getWoDetails.recordset[0].EvolveProdOrders_Order,
                  EvolveProdOrders_OrderId: getWoDetails.recordset[0].EvolveProdOrders_OrderId,
                  EvolveProdOrdersDetail_Qty: getWoDetails.recordset[0].EvolveProdOrdersDetail_Qty,
                  EvolveItem_Code: getWoDetails.recordset[0].EvolveItem_Code,
                  EvolveProdOrders_Lot : getWoDetails.recordset[0].EvolveProdOrders_Lot
                }
              },

              EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
              EvolveIO_Code: "EVOLVEPBBF", // Evolve Production booking backflush YORK
              EvolveIO_Data_Formate: "XML",
              EvolveIO_ERP_Type: "QAD",
              EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
              EvolveIO_File_Data: ""
            };
            console.log("ioData ::", ioData.EvolveIO_Data.child);
            await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.addIOData(ioData);



          }


          // End Send Data

          let getCompletedWoCount = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getCompletedWoCount(
            req.body
          );
          if (
            parseInt(getCompletedWoCount.recordset[0].order_qty) ==
            parseInt(getCompletedWoCount.recordset[0].cmp_serial)
          ) {
            let CompleteWO = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.CompleteWO(
              req.body
            );
          }
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Serial Number Completed Successfully !",
            result: null
          };
          res.send(obj);
        } // completeSerialNxtProcess instanceof error End
      } //getNxtProcessSeq.rowsAffected >0 End
    } catch (error) {
      Evolve.Log.error(" EERR0599: Error while moving Mf Process "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0599: Error while moving Mf Process "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // moveMfProcess End

  rejectMfProcess: async function (req, res) {
    // rejectMfProcess Start
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let getReworkedSrData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getReworkedSrData(
        req.body
      ); // Get Serial data.
      if (getReworkedSrData.rowsAffected < 1) {
        //getReworkedSrData.rowsAffected < 1 Start
        Evolve.Log.error(getReworkedSrData.message);
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error get reject serial number data !",
          result: null
        };
        res.send(obj);
      } else {
        let addReworkSrData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.addReworkSrData(
          req.body,
          getReworkedSrData.recordset[0]
        ); // Add Data In Rework Table.
        if (addReworkSrData.rowsAffected < 1) {
          //addReworkSrData.rowsAffected < 1 Start
          Evolve.Log.error(getReworkedSrData.message);
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error while add data in rework!",
            result: null
          };
          res.send(obj);
        } else {
          let updateRejectSrNo = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.updateRejectSrNo(
            req.body
          ); // Update Rejected Serial Number.
          if (updateRejectSrNo.rowsAffected < 1) {
            //updateRejectSrNo.rowsAffected < 1 Start
            Evolve.Log.error(getReworkedSrData.message);
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while reject serial number!",
              result: null
            };
            res.send(obj);
          } else {
            // let getSequenceData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getSequenceData(
            //   req.body
            // );
            // let getMachineId = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMachineId(
            //   req.body.EvolveUser_ID
            // );
            // let getSerialNoData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getSerialNoData(
            //   req.body
            // );
            // let getNxtProcessSeq = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getNxtProcessSeq(
            //   req.body
            // );
            // let insertItemRejectHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.insertItemRejectHistory(
            //   req.body,
            //   getSerialNoData.recordset[0],
            //   getMachineId.recordset[0].EvolveMachine_ID,
            //   getSequenceData.recordset[0],
            //   getNxtProcessSeq.recordset[0]
            // );

            // if (
            //   insertItemRejectHistory instanceof Error ||
            //   insertItemRejectHistory.rowsAffected < 1
            // ) {
            //   let obj = {
            //     statusCode: 400,
            //     status: "fail",
            //     message: "Error while reject serial number",
            //     result: null
            //   };
            //   res.send(obj);
            // } else {
              let obj = {
                statusCode: 200,
                status: "success",
                message: "Rejected  succsessfully",
                result: ""
              };
              res.send(obj);
            // }
          } // updateRejectSrNo.rowsAffected < 1 End
        } // addReworkSrData.rowsAffected < 1 Start
      } //getReworkedSrData.rowsAffected < 1 End
    } catch (error) {
      Evolve.Log.error(" EERR0600: Error while rejecting Mf Process "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0600: Error while rejecting Mf Process "+error.message,
        result: null
      };
      res.send(obj);
    }
  }, // rejectMfProcess End

  getComponantItemList: async function (req, res) {
    try {
      let getComponantList = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getComponantItemList(req.body);
      if (getComponantList instanceof Error || getComponantList.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Componant list not found",
          result: getComponantList.message
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Componant list goted successfully",
          result: getComponantList.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0601: Error while getting Component Item List "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0601: Error while getting Component Item List "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  rejectComponantItem: async function (req, res) {
    req.body.EvolveUser_ID = req.EvolveUser_ID;
    try {
      let getComponantItem = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getComponantItem(req.body);
      if (getComponantItem instanceof Error || getComponantItem.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while reject componant",
          result: getComponantItem.message
        };
        res.send(obj);
      } else {
        let totalIssueQty = parseInt(getComponantItem.recordset[0].EvolvePickList_QtyIss) - parseInt(getComponantItem.recordset[0].EvolvePickList_QtyReturn);
        if (totalIssueQty >= req.body.EvolvePickList_QtyReturn) 
        {
          req.body.EvolvePickList_ID =  getComponantItem.recordset[0].EvolvePickList_ID;
          let updateRejectedComponantQty = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.updateRejectedComponantQty(req.body);
          if (updateRejectedComponantQty instanceof Error || updateRejectedComponantQty.rowsAffected < 1) {
            let obj = {
              statusCode: 400,
              status: "fail",
              message: "Error while reject componant",
              result: updateRejectedComponantQty.message
            };
            res.send(obj);
          } else {
            let addComponentHistory = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.addComponentHistory(getComponantItem.recordset[0], req.body);
            if (addComponentHistory instanceof Error || addComponentHistory.rowsAffected < 1) {
              let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while add reject componant history",
                result: addComponentHistory.message
              };
              res.send(obj);
            } else {
              // let ioData = {
              //   EvolveIO_Data: {
              //     EvolveItem_Code: getComponantItem.recordset[0].EvolveItem_Code,
              //     EvolvePickList_QtyIss: req.body.EvolvePickList_QtyReturn,
              //     locFrom : 'FG',
              //     locTo : 'RM',
              //   },
              //   EvolveIO_Direction: 0, // 1 Means IN Direction , 0 Means Out Direction
              //   EvolveIO_Code: "EVOLVEST",
              //   EvolveIO_Data_Formate: "XML",
              //   EvolveIO_ERP_Type: "QAD",
              //   EvolveIO_Status: 1, // 1 Means Loaded in IO DB , 0 Means Error on Loading , 2 Successfully loaded in Evolve DB
              //   EvolveIO_File_Data: ""
              // };
              // console.log("ioData ::", ioData);
              // let addIOData = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.addIOData(ioData);
              // if (addIOData instanceof Error || addIOData.rowsAffected < 1  ) {
              //   let obj = {
              //     statusCode: 400,
              //     status: "fail",
              //     message: "Error while add IO Data",
              //     result: null
              //   };
              //   res.send(obj);
              // } else {
                let obj = {
                  statusCode: 200,
                  status: "success",
                  message: "Componant item rejected successfully",
                  result: null
                };
                res.send(obj);
              // }
            }
          } // if (updateRejectedComponantQty instanceof Error || updateRejectedComponantQty.rowsAffected < 1)
        } else {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Return qty should be less than issue qty",
            result: getComponantItem.message
          };
          res.send(obj);
        } //if(totalIssueQty >= req.body.EvolvePickList_QtyReturn)
      } //if (getComponantItem instanceof Error || getComponantItem.rowsAffected < 1)
    } catch (error) {
      Evolve.Log.error(" EERR0602: Error while rejecting Component Item "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0602: Error while rejecting Component Item "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getMfReasonCode: async function (req, res) {
    try {
      let getMfReasonCode = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMfReasonCode();
      if(getMfReasonCode instanceof Error || getMfReasonCode.rowsAffected < 1) {
        let obj = {statusCode: 400, status: "fail", message: "MFPROCESS type reasons not fund", result: null};
        res.send(obj);
      } else {
        let obj = {statusCode: 200, status: "success", message: "", result: getMfReasonCode.recordset};
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0592: Error while checking allow creating Wo "+error.message);
      let obj = {statusCode: 400,status: "fail",message: " EERR0592: Error while checking allow creating Wo "+error.message,result: null};
      res.send(obj);
    }
  },

  addMFValidations : async function(req,res) {
    // var expectedData = `We are in AUTO MODE 
    //   Connect Sensor then press START
    //   R=1299 ⸮
    //   Start wheel rotation
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =     0 mtrs/hr ERROR : Speed Low.
    //   Wheel Speed =  7656 mtrs/hr                    
    //   Wheel Speed = 12181 mtrs/hr                    
    //   Wheel Speed = 13851 mtrs/hr                      
    //   Wheel Speed = 14757 mtrs/hr                    
    //   Airgap Analysis: Signal strength  = 86 %
    //   Runout Analysis: Signal Deviation = 29 %
    //   Pole Wheel Analysis: OK
    //   Test complete
    //   Press RESET to start again.`;
      var expectedData = req.body.iotString;
      var seprators = ["=",":"];
      var lines = expectedData.split("\n");
      var jsonData = {};
      lines.forEach(line => {
        for (let i = 0; i < seprators.length; i++) {
          const seprator = seprators[i];
          if (line.includes(seprator) && ! line.includes("Speed Low")) {
            console.log(line);
            var val
            if(line.includes(seprators[0])){
              val = line.split(seprators[0])
            }else{
              val = line.split(seprators[1])
            }
            jsonData[ val[0].trim() ] = parseInt(val[1].trim());
            break;
          }      
        }
      });
      console.log("Required json =================");
      console.log(jsonData);
      console.log("^^^^^^^^^^^^^^^^^^^^");
      let machineValidationObj = {
        "EvolveMachineIOTValidation_String" : expectedData,
        "EvolveMachineIOTValidation_Json" : JSON.stringify(jsonData)
      };
      await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.truncateIOTValidationTbl();
      let addMachineIOTValidation = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.addMachineIOTValidation(machineValidationObj);
      if(addMachineIOTValidation instanceof Error || addMachineIOTValidation.rowsAffected < 1) {
        let obj = {statusCode: 400, status: "fail", message: "Error while add machine iot validation", result: null};
        res.send(obj);
      } else {
        let obj = {statusCode: 200, status: "success", message: "IOT Validation Added successfully", result: null};
        res.send(obj);
      }
  },

  getMachineIOTValidation : async function (req,res) {
    let getMachineIOTValidation = await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.getMachineIOTValidation();
    if(getMachineIOTValidation instanceof Error || getMachineIOTValidation.rowsAffected < 1) {
      let obj = {statusCode: 400, status: "fail", message: "No validations are found.", result: null};
      res.send(obj);
    } else {
      let obj = {statusCode: 200, status: "success", message: "IOT validation get successfully !", result: getMachineIOTValidation.recordset[0]};
      res.send(obj);
      await Evolve.App.Services.SmartFactory.MfProcess.SrvMfProcess.truncateIOTValidationTbl();
    }
  }
}