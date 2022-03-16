'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

  getAllDoSup: async function (req, res) {
    try {
      let getAllDoSup = await Evolve.App.Services.SmartFactory.MrpSticker.SrvIndex.getAllDoSup();
      if (getAllDoSup instanceof Error || getAllDoSup.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "No any do available for MRP Print",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Do for MRP sticker",
          result: getAllDoSup.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error("Error while getting do for MRP "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "Error while getting do for MRP "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  getDoLine: async function (req, res) {
    try {

      let getDoLine = await Evolve.App.Services.SmartFactory.MrpSticker.SrvIndex.getDoLine(req.body);
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
          message: "DO Line gotted successfully",
          result: getDoLine.recordset
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error("Error while getting Do Line for mrp sticker "+error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: "Error while getting Do Line for mrp sticker "+error.message,
        result: null
      };
      res.send(obj);
    }
  },

  printMrpSticker: async function (req, res) {
    try {
      let getDoLineDetails = await Evolve.App.Services.SmartFactory.MrpSticker.SrvIndex.getDoLineDetails(req.body);
      if (getDoLineDetails instanceof Error || getDoLineDetails.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while MRP Sticker data",
          result: null
        };
        res.send(obj);
      } else {
        // let ZplData =
        //   "^XZ\r\n" +
        //   "^XA\r\n" +
        //   "^FX\r\n" +
        //   "^CF0,25\r\n" +
        //   "^FO10,10^FDDO Number : " +
        //   getDoLineDetails.recordset[0].EvolveDO_Number +
        //   "^FS\r\n" +
        //   "^FO10,40^FDCustomer : " +
        //   getDoLineDetails.recordset[0].EvolveSupplier_Name +
        //   "^FS\r\n" +
        //   "^FO10,70^FDVehicle Number : " +
        //   getDoLineDetails.recordset[0].EvolveDO_VehicelNumber +
        //   "^FS\r\n" +
        //   "^FO10,95^FDItem Code : " +
        //   getDoLineDetails.recordset[0].EvolveItem_Code +
        //   "^FS\r\n" +
        //   "^FO10,120\r\n" +
        //   "^FB450,4,,\r\n" +
        //   "^FDItem Description : " +
        //   getDoLineDetails.recordset[0].EvolveItem_Desc +
        //   "^FS\r\n" +
        //   "^FO156,220^FDQuality Inspected^FS\r\n" +
        //   "^PQ" +
        //   parseInt(getDoLineDetails.recordset[0].EvolveDOLine_QtyDO) +
        //   ",0,1,Y\r\n" +
        //   "^XZ"; 
        if(getDoLineDetails.recordset[0].EvolvePriceList_ID == null){
            let obj = {statusCode: 400,status: "fail",message: "Price list not updated",result: null};
            res.send(obj);
        } else {
            if(Evolve.Config.mrpStickerPrintDirectory == undefined || Evolve.Config.mrpStickerPrintDirectory == "") {
                let obj = {statusCode: 400,status: "fail",message: "MRP  Print Directory key not exist",result: null};
                res.send(obj);
              }
            else {
                let doSize = getDoLineDetails.recordset[0].EvolveDOLine_QtyDO;
                let stdSize = req.body.EvolvePriceList_StdPktSize
                let totalLbl = 0;
                if(doSize == stdSize ){
                    totalLbl = 1
                } else if (doSize < stdSize) {
                    totalLbl = stdSize / doSize
                    if(totalLbl <= 0){
                        totalLbl = 1;
                    }
                } else if (stdSize < doSize) {
                    totalLbl = doSize / stdSize
                    if(totalLbl <= 0){
                        totalLbl = 1;
                    }
                }
                if(!Number.isInteger(totalLbl)) {
                    totalLbl = parseInt(totalLbl)  + 1
                }
                let d = new Date();
                let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let crntMonth = monthNames[d.getMonth()].toUpperCase()+" "+d.getFullYear()
                let ZplData = "CT~~CD,~CC^~CT~\r\n"+
                "^XA~TA000~JSN^LT0^MNN^MTD^PON^PMN^LH0,0^JMA^PR3,3~SD10^JUS^LRN^CI0^XZ\r\n"+
                "~DG000.GRF,00512,004,\r\n"+
                ",:::::::::::::::::::I08,H01FC0,H0EAB8,H0C008,H08008,H0C0,:H0HDC0,H0HEC0,H0C0,::,:H02780,H06CC0,H0IC0,:H0F880,H07180,J080,,:I07,H0E680,H046C0,H0C6C0,H0C0C0,:H04180,H02B80,H01F,I08,,::H080,H0B0,H0BA80,H0HFC0,H0BA80,H010,I02,H01F80,H03A80,H030C0,::H01B80,H01F,I02,,::::J0C0,:,:H0HEC0,H0HFC0,,:I0980,H030C0,::H03A80,H01F,I02,,I0A80,H03FC0,H030,:H01880,H03FC0,H02A80,,I08,H0HFC0,H0HA80,,H08008,H0C018,H0BAE8,H01FC0,I08,,::::::::::::::::::~DG001.GRF,01792,008,\r\n"+
                ",::::::::::::::::::::::::::::::::::M020H08,M01,,M010010,M0202,M0101,O02,M010110,M0202,M010510,N08208,M0105,M0286,M0145,N0CA,N0H510,N06E,N054,N02A,M0154,M0H28,M0H10,N028,M0H10,M02A008,M0151,M02A2,M015510,M02EE,M0155,N0HA08,M015510,M0H2E,M015510,M010E08,M010510,O0208,O0H10,,O0H10,,:::O0218,P010,O02,M0141,N0E2,M0145,N0A6,M0155,M02EE,M0155,N0HA,M015510,M0H2E,M0154,N02808,M0H10,M0H2H08,M0H10,N03010,M0J10,M02E2,M0151,N0HA,M0155,M02EE,M0155,N0HA08,M0155,M032E,M015510,M0202,M010110,,O01,Q08,O0H10,,N05010,N03808,N054,N0EC,N054,N0HA08,M0154,N08E,M0144,N08208,M0H15,M0202,M0105,O02,M015110,M02,M0141,M01,M0H1510,N086,M010410,N082,M0H1410,M01EE,M015410,N0A8,N05408,N06810,N05410,N020,M01,M02,M01,:M010010,M02,M010010,N080,M0140,M02C0,M0140,Q08,N05110,N0H2,N015,N02E,M015510,M0H2E08,M0155,N0HA10,M015510,M02EE,M015510,N0A218,M0141,M02C2,M014110,M0280,M010010,M02,M01,P018,,:::::::::::::::::::::::::::::::::::::::::::::~DG002.GRF,02304,012,\r\n"+
                ",::::::::::::::::::::::::::::::::P028,P0H5,O02AHA0,P0H5C0,P02AA8,Q0H58,O0200A8,R01C,N02A0H08,P010,N0I2A02,O0405,O0A008A,O050016,O0A800A,O05D01C,O0A0A8A,O040156,N02A00AA,O04001C,O0A200A,O041416,O0A0A8A,O0401DC,O0A00AA,O050016,N02AA00A,O045404,O0A0A8A,O040156,O0A00AA,O040H0C,O0A200A,O041016,N02A2A0A,O04011C,O0A808A,O050016,O02A00A,P01C1C,Q0IA,Q0156,O0A002A,O05C014,O02A00A,P05016,Q0A8A,R0DC,O0A00AA,O050016,N02AA00A,O05140C,O0A0A8A,O040156,O0A002A,O04001C,O0A280A,O041416,N02A0A8A,O040104,O0A800A,O014016,P0A80A,P01C1C,Q0IA,R056,N02A002A,O040H0C,O0A280A,P01516,P02A8A,Q0HDC,O0802AA,R056,O02002A,O0H4H04,O0HA8,O0H15,O0JA2,O0J40,O0KA,O015154,O02A2AA,P04044,O0282AA,O010114,O0282AA,P04044,O0282AA,O014154,O0282AA,P04044,,:S02,,O0J8A,O015154,O02AIA,O0J40,O0HAH80,O0H10,O0A8802,O04,O08080A,P01014,Q08AA,P01044,P0H8HA,O0H1014,O0A08AA,R0H4,Q08AA,P01054,Q08AA,S04,O08080A,P010,O0HA802,O0H40,O0IA82,O015140,O02AIA,O0H4H04,O08A80A,,P0A002,P040,P080A2,O014140,O0282A2,O0H4040,O0282A0,O0101,O0282A2,Q0H40,Q0A80,Q01,Q0A,Q04,O082A08,Q0H10,P02AA0,Q0H40,P0HA80,\r\n"+
                ",:::::::::::::\r\n"+
                "^XA\r\n"+
                "^MMT\r\n"+
                "^PW519\r\n"+
                "^LL0599\r\n"+
                "^LS0\r\n"+
                "^FT240,192^XG000.GRF,1,1^FS\r\n"+
                "^FT0,608^XG001.GRF,1,1^FS\r\n"+
                "^FT0,224^XG002.GRF,1,1^FS\r\n"+
                "^FT90,561^A0B,33,36^FH\^FDPART NO.^FS\r\n"+
                "^FT90,350^A0B,33,36^FH\^FD:^FS\r\n"+
                "^FT90,330^A0B,33,36^FH\^FD"+getDoLineDetails.recordset[0].EvolveDOLine_Part+"^FS\r\n"+
                "^FT130,561^A0B,33,36^FH\^FDDESCRIPTION^FS\r\n"+
                "^FT130,350^A0B,33,36^FH\^FD:^FS\r\n"+
                "^FB320,4,1,^FT230,330^A0B,33,36^FH\^FD"+getDoLineDetails.recordset[0].EvolvePriceList_ItemDesc+"^FS\r\n"+
                "^FT228,561^A0B,25,36^FH\^FDPKD^FS\r\n"+
                "^FT228,350^A0B,25,36^FH\^FD:^FS\r\n"+
                "^FT228,330^A0B,25,36^FH\^FD"+crntMonth+"^FS\r\n"+
                "^FT257,561^A0B,25,32^FH\^FDMRP(For "+stdSize+" nos)^FS\r\n"+
                "^FT257,350^A0B,25,36^FH\^FD:^FS\r\n"+
                "^FT257,330^A0B,25,36^FH\^FDRs."+getDoLineDetails.recordset[0].EvolvePriceList_MRPPrice * stdSize+"^FS\r\n"+
                "^FT287,561^A0B,25,36^FH\^FDNET QTY^FS\r\n"+
                "^FT287,350^A0B,25,36^FH\^FD:^FS\r\n"+
                "^FT287,330^A0B,25,36^FH\^FD"+stdSize+" Nos^FS\r\n"+
                "^FT314,561^A0B,25,36^FH\^FDCoupon Of^FS\r\n"+
                "^FT314,350^A0B,25,36^FH\^FD:^FS\r\n"+
                "^FT314,330^A0B,25,36^FH\^FD"+getDoLineDetails.recordset[0].EvolvePriceList_CouponOf+"^FS\r\n"+
                "^FO2,25^GB508,572,8^FS\r\n"+
                "^FO322,35^GB0,556,6^FS\r\n"+
                "^FT363,582^A0B,28,28^FH\^FDYORK Transport Equipment (I) Pvt. Ltd.^FS\r\n"+
                "^FB520,4,3^FT470,582^A0B,23,24^FH\^FDGat no. 537 & 538, Badhalwadi,Vill.- Navlakh Umbre, Near Talegaon MIDC, Taluka. Maval, Pune - 410507, India^FS\r\n"+
                "^FT470,580^A0B,23,24^FH\^FDWeb Site : www.yorktransport.com^FS\r\n"+
                "^FT494,582^A0B,23,16^FH\^FDCustomer Care : (+91) 9270223355; Email:customersupport@yorktpt.co.in^FS\r\n"+
                "^PQ"+totalLbl+",0,1,Y^XZ\r\n"+
                "^XA^ID000.GRF^FS^XZ\r\n"+
                "^XA^ID001.GRF^FS^XZ\r\n"+
                "^XA^ID002.GRF^FS^XZ";
                console.log("ZplData>> ", ZplData)
                console.log("Evolve.Config.mrpStickerPrintDirectory >>>",Evolve.Config.mrpStickerPrintDirectory);
                let fileName = "MRP_"+getDoLineDetails.recordset[0].EvolveDO_Number+"_"+getDoLineDetails.recordset[0].EvolveDOLine_ID+".txt";
                Evolve.Fs.writeFile(Evolve.Config.mrpStickerPrintDirectory + fileName, ZplData,function (err) {
                    if (err) {
                        let obj = {statusCode: 400,status: "fail",message: "Error In Print Do Label",result: null};
                        res.send(obj);
                    } else {
                        let obj = {statusCode: 200,status: "success",message: "MRP Sticker printed successfully",result: null};
                        res.send(obj);
                    }
                    }
                );
            }
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

      let getSingleDOSOData = await Evolve.App.Services.SmartFactory.MrpSticker.SrvIndex.getSingleDOSOData(req.body);
      if (getSingleDOSOData instanceof Error || getSingleDOSOData.rowsAffected < 1) {
        let obj = {statusCode: 400, status: "fail", message: "SO data not found for selected DO", result: null};
        res.send(obj);
      } else {
        let obj = {statusCode: 200,status: "success",message: "SO data gotted Successfully !",result: getSingleDOSOData.recordset};
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error("SO data not found for selected DO "+error.message);
      let obj = {statusCode: 400,status: "fail",message: "SO data not found for selected DO "+error.message,result: null};
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