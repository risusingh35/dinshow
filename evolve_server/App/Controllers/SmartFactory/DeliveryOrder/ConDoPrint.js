'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getAllDoSup: async function (req, res) {
    try {
      let getAllDoSup = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDoPrint.getAllDoSup();
      if (getAllDoSup instanceof Error || getAllDoSup.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Not found do and sup",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getAllDoSup.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0567: Error while getting all Do Sup "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0567: Error while getting all Do Sup "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoLine: async function (req, res) {
    try {

      let getDoLine = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDoPrint.getDoLine(
        req.body
      );
      if (getDoLine instanceof Error || getDoLine.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Do line data not found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getDoLine.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0568: Error while getting Do Line "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0568: Error while getting Do Line "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printDoLable: async function (req, res) {
    try {
      let getDoLineDetails = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDoPrint.getDoLineDetails(req.body);
      if (
        getDoLineDetails instanceof Error ||
        getDoLineDetails.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while print do lable",
          result: null
        };
        res.send(obj);
      } else {
        console.log("entered in else part ??")
        // ^XA
        // ^FX
        // ^CF0,25
        // ^FO10,10^FDDO Number : DR190533^FS
        // ^FO10,40^FDCustomer : Seamless Autotech Pvt Ltd.^FS
        // ^FO10,70^FDVehicle Number : MH14DM-7403^FS
        // ^FO10,95^FDItem Code : 5023=KTX17AF0K1850^FS
        // ^FO10,120
        // ^FB450,4,,
        // ^FDItem Description : AXLE 6"SQ,ISOM22x2.510*335,420*180,I/B,TM-A^FS
        // ^FO156,220^FDQuality Inspected^FS
        // ^PQ2,0,1,Y

        let ZplData =
          "^XZ\r\n" +
          "^XA\r\n" +
          "^FX\r\n" +
          "^CF0,25\r\n" +
          "^FO10,10^FDDO Number : " +
          getDoLineDetails.recordset[0].EvolveDO_Number +
          "^FS\r\n" +
          "^FO10,40^FDCustomer : " +
          getDoLineDetails.recordset[0].EvolveSupplier_Name +
          "^FS\r\n" +
          "^FO10,70^FDVehicle Number : " +
          getDoLineDetails.recordset[0].EvolveDO_VehicelNumber +
          "^FS\r\n" +
          "^FO10,95^FDItem Code : " +
          getDoLineDetails.recordset[0].EvolveItem_Code +
          "^FS\r\n" +
          "^FO10,120\r\n" +
          "^FB450,4,,\r\n" +
          "^FDItem Description : " +
          getDoLineDetails.recordset[0].EvolveItem_Desc +
          "^FS\r\n" +
          "^FO156,220^FDQuality Inspected^FS\r\n" +
          "^PQ" +
          parseInt(getDoLineDetails.recordset[0].EvolveDOLine_QtyDO) +
          ",0,1,Y\r\n" +
          "^XZ";

        console.log("ZplData>> ", ZplData)
        console.log("Evolve.Config.doLabelPrintDirectory >>>",Evolve.Config.doLabelPrintDirectory);
        if(Evolve.Config.doLabelPrintDirectory == undefined) {
          let obj = {statusCode: 400,status: "fail",message: "Do Label Print Directory key not exist",result: null};
          res.send(obj);
        } else {
          let fileName = getDoLineDetails.recordset[0].EvolveDO_Number+"_"+getDoLineDetails.recordset[0].EvolveDoLine_ID+".txt";
          Evolve.Fs.writeFile(Evolve.Config.doLabelPrintDirectory + fileName, ZplData,function (err) {
              if (err) {
                let obj = {statusCode: 400,status: "fail",message: "Error In Print Do Label",result: null};
                res.send(obj);
              } else {
                let obj = {statusCode: 200,status: "success",message: "DO Label printed successfully",result: null};
                res.send(obj);
              }
            }
          );
          // const data = Evolve.Config.printer['url'] + "?KonnectID=" + Evolve.Config.printer['KonnectID'] + "&data=" + ZplData;
          // Evolve.Axios.get(data).then((response) => {
          //     if (response.status == 200) {
          //       let obj = {
          //         statusCode: 200,
          //         status: "success",
          //         message: "DO lable printed",
          //         result: null
          //       };
          //       res.send(obj);
          //     } else {
          //       let obj = {
          //         statusCode: 400,
          //         status: "fail",
          //         message: "Error in print do lable",
          //         result: null
          //       };
          //       res.send(obj);
          //       Evolve.Log.info(res);
          //     }
          //   })
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0569: Error while printing Do Lable "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0569: Error while printing Do Lable "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getSingleDOSOData: async function (req, res) {
    try {

      let getSingleDOSOData = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.getSingleDOSOData(
        req.body
      );
      if (
        getSingleDOSOData instanceof Error ||
        getSingleDOSOData.rowsAffected < 1
      ) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Data not found",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Successfully !",
          result: getSingleDOSOData.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0570: Error while getting Single DOSO Data "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0570: Error while getting Single DOSO Data "+error.message,
        result: null
      };
      res.send(obj);
    }
  },


  getMrpPrintData: async function (req, res) {
    try {
      let getMrpPrintData = await Evolve.App.Services.SmartFactory.DeliveryOrder.SrvDoPrint.getMrpPrintData(req.body);
      if (getMrpPrintData instanceof Error || getMrpPrintData.rowsAffected < 1) 
      {
        let obj = {statusCode: 400, status: "fail", message: "Price list not uploaded", result: null};
        res.send(obj);
      } else {
        let obj = {statusCode: 200, status: "success", message: "Successfully !", result: getMrpPrintData.recordset[0]};
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" Error while getting Single DOSO Data "+error.message);
      let obj = {statusCode: 400,status: "fail", message: " Error while getting MRP price data  "+error.message,result: null};
      res.send(obj);
    }
  },

}