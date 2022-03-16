"use strict";
const Evolve = require("../Boot/Evolve");
module.exports = {
  constructor: async function () {
    try {
      console.log("/*** Load Called  ...****/");

      // Automatically Create Folder If does not Avilable.
      let ioRequiredDir = [];
      let EvolveConfig = await Evolve.SqlPool.request().query(
        "SELECT * FROM EvolveConfig WHERE EvolveConfig_Desc LIKE 'PATH' "
      );
      if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
        Evolve.Log.error("EvolveConfig PATH Not Found!");
      } else {
        EvolveConfig = EvolveConfig.recordsets[0];
        for (let i = 0; i < EvolveConfig.length; i++) {
          ioRequiredDir.push(EvolveConfig[i].EvolveConfig_Value);
        }
      }
      for (let eInvDir of ioRequiredDir) {
        let folders = eInvDir.split("/");
        let path = "";
        for (let folder of folders) {
          path = path == "" ? folder : path + "/" + folder;
          if (!Evolve.Fs.existsSync(path) && folder != "") {
            Evolve.Fs.mkdirSync(path);
          }
        }
      }

      // Polybond
      if (Evolve.Config.ENABLEPOLYBOND == 1) {
        Evolve.App.Controllers.Evolve.evolveControllers.printJob();
      }

      // Byke Project Only
      if (Evolve.Config.ENABLEBYKE == 1) {
        Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.saveAllbedsIntoRAM();
        // Schedular for Bed Report Send Email
        let schedule = Evolve.Schedule;
        let rule = new schedule.RecurrenceRule();
        rule.hour = 23;
        rule.minute = 55;
        rule.second = 0;
        let j = schedule.scheduleJob(rule, async (req, res) => {
          Evolve.App.Controllers.eAssets.MqttController.ConMqttAssets.todayHistory();
        });
      }
      // Power BI
      if (Evolve.Config.ENABLEBI == 1) {
        let schedule = Evolve.Schedule;
        let ruleClose = new schedule.RecurrenceRule();
        ruleClose.day = 1;
        ruleClose.hour = 0;
        ruleClose.minute = 1;
        ruleClose.second = 0;
        let k = schedule.scheduleJob(ruleClose, async (req, res) => {
          Evolve.Log.info("Auto Forecast Close Scheduler execution start");
          Evolve.App.Controllers.Snop.Forecasting.ConSlotManagement.closeForecastSchedular();
          Evolve.Log.info("Auto Forecast Close Scheduler execution End");
        });
      }
      // Printers Logic
      if (Evolve.Config.ENABLEPRINTERS == 1) {
        // Evolve.Server.Controllers.SocketController.getEvolvePrinterTask(true);
        // Evolve.Server.Controllers.SocketController.getPrinterList()
      }

      // YFAI
      if (Evolve.Config.ENABLEYFAI == 1) {
        console.log("entere in  >>>>");
        // Schedular for Reset Serial Master
        let schedule = Evolve.Schedule;
        var rule = new schedule.RecurrenceRule();
        rule.hour = 0;
        rule.minute = 0;
        rule.second = 2;
        var j = schedule.scheduleJob(rule, async (req, res) => {
          Evolve.App.Controllers.Evolve.evolveControllers.resetSerialMaster();
        });
        // MF PROCESS CONTROLLERS CALLING
        // Evolve.App.Controllers.Evolve.evolveControllers.printJobYfai();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConDoorAssy.doorAssyCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConConsole.consoleAssyCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConKneeBolster.kneeBolsterCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFlaming.ipFlamingCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConIPFoaming.ipFoamingCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConHPLamination.HPLaminationCheckAudit();
        // Evolve.App.Controllers.SmartFactory.MfProcess.ConIPAssembly.ipAssemblyCheckAudit();
      }

      //Suraksha
      if (Evolve.Config.ENABLESURAKSHA == 1) {
        // Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.changeQuarStatus();
        // Evolve.App.Controllers.Suraksha.TravelStatusTrans.ConList.covidTestUploadRemider();
      }

      // YORK
      if (Evolve.Config.ENABLEYORK == 1) {
        // Schedular for Reset Serial Master
        var rule = new Evolve.Schedule.RecurrenceRule();
        rule.hour = 0;
        rule.minute = 0;
        rule.second = 2;
        var j = Evolve.Schedule.scheduleJob(rule, async (req, res) => {
          Evolve.App.Controllers.Evolve.evolveControllers.resetSerialMaster();
        });
      }

      // TRUBOT
      if (Evolve.Config.ISTRUBOTENBLE == 1) {
        // await Evolve.App.Controllers.eTrubot.Report.ConList.generateTrubotToken();
        // setInterval(function () {
        // 	Evolve.App.Controllers.eTrubot.Report.ConList.generateTrubotToken();
        // }, 1800000); // Every 30 min
      }

      // PO SUBMIT TO ERP
      // Evolve.App.Controllers.Wms.PurchaseOrder.ConV3.poSubmitToERP();

      setInterval(async function () {
        // console.log("setimng...........########");
        var date = new Date();
        var year = date.getFullYear();
        /*  In the date format, the month starts from 0, so add 0
         * Use the three-dimensional expression to add 0 in front of less than 10 to achieve the format unity, such as 09:11:05
         * */
        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        //  Splicing
        let dt =
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds;

        // console.log("DT>>>>",dt);
        await Evolve.Io.emit("timeDates", {
          dateTime: dt,
        });
      }, 100000); // Every 30 min

      // Set Serial Number Master In Memory  - Start

      let EvolveSerial = await Evolve.SqlPool.request().query(
        " SELECT * FROM EvolveSerial WHERE  EvolveSerial_Active = 1"
      );
      if (EvolveSerial instanceof Error || EvolveSerial.rowsAffected < 1) {
        Evolve.Log.error("EvolveSerial Not Found!");
      } else {
        EvolveSerial = EvolveSerial.recordsets[0];
        for (let i = 0; i < EvolveSerial.length; i++) {
          Evolve.Generator.add(EvolveSerial[i].EvolveSerial_Prefix, {
            digits:
              EvolveSerial[i].EvolveSerial_Prefix.length +
              parseInt(EvolveSerial[i].EvolveSerial_Width),
            letters: EvolveSerial[i].EvolveSerial_Prefix.length,
            store: function (key) {
              // console.log("generatedIds",generatedIds);
              Evolve.SqlPool.request().query(
                ` UPDATE EvolveSerial SET EvolveSerial_LastGeneratedCode = '${key[0].replace(
                  " - ",
                  ""
                )}' WHERE EvolveSerial_ID =  '${
                  EvolveSerial[i].EvolveSerial_ID
                }'`
              );

              if (
                EvolveSerial[i].EvolveSerial_Reset ==
                key[0].replace(EvolveSerial[i].EvolveSerial_Prefix + " - ", "")
              ) {
                Evolve.Generator.keys[
                  EvolveSerial[i].EvolveSerial_Prefix
                ].numbers = 0;
              }
            },
            restore: EvolveSerial[i].EvolveSerial_LastGeneratedCode,
          });
        }
        Evolve.Generator.start();

        console.log("generator Beforew ", Evolve.Generator.keys.SQ);
      }

      // let palletNumber = await Evolve.Generator.generate("PCL");
      // console.log("palletNumber>>>>>>", palletNumber);

      console.log(
        "########################################################################"
      );

      // crypto module
      const crypto = require("crypto");

      const algorithm = "aes-256-cbc";

      // generate 16 bytes of random data
      const initVector = crypto.randomBytes(16);

      // protected data
      const message = "MDM:11-08-2021:2:2"; //"MODULE:EXPIRED_DATE:UNIT_COUNT:USER_COUNT"

      // secret key generate 32 bytes of random data
      const Securitykey = "SHIV1234567890ALITER222878798765";

      // the cipher function
      const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

      // encrypt the message
      // input encoding
      // output encoding
      let encryptedData = cipher.update(message, "utf-8", "hex");

      encryptedData += cipher.final("hex");

      console.log("Encrypted message: " + encryptedData);

      // the decipher function
      const decipher = crypto.createDecipheriv(
        algorithm,
        Securitykey,
        initVector
      );

      let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

      decryptedData += decipher.final("utf8");

      console.log("Decrypted message: " + decryptedData);

      let keyArray = decryptedData.split(":");

      console.log("Module : ", keyArray[0]);
      console.log("Date : ", keyArray[1]);
      console.log("Unit : ", keyArray[2]);
      console.log("User : ", keyArray[3]);

      console.log(
        "########################################################################"
      );

      let date = new Date();
      let datetime =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      console.log("datetime >>>>>>>>>>", datetime);

      await Evolve.App.Controllers.Common.ConCommon.getApprovalMatrixList({
        ACTION: "GENERATE",
        EvolveApprovalMatrix_ID: 0,
      });

      // let url = 'http://103.207.171.202:8021/sap/opu/odata/sap/ZOP_API_MATERIAL_DOCUMENT_SRV/A_MaterialDocumentHeader';
      // let config = {};
      // let responce = "";

      // // config = {
      // //     headers: {
      // //         'x-csrf-token': 'fetch',
      // //         'Authorization': 'Basic QUxJVEVSOndlbGNvbWUxMjM='
      // //     }
      // // }

      // // //responce = await Evolve.Axios.get(url, config);

      // // //	console.log("responce GET >>>>", responce.headers['x-csrf-token'])

      // // // let csrfToken = responce.headers['x-csrf-token'];

      // let csrfToken = "DIQtDMYRVyerBnqQA6Jhpg==";

      // config = {
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'x-csrf-token': csrfToken,

      //         'Accept': 'application/json'
      //     }
      // }

      // let data = {
      //     "PostingDate": "2021-09-29T00:00:00.000",
      //     "MaterialDocumentHeaderText": "test odata from HR PC",
      //     "GoodsMovementCode": "01",
      //     "to_MaterialDocumentItem": {
      //         "results": [
      //             {
      //                 "Material": "RM18",
      //                 "Plant": "1710",
      //                 "PurchaseOrder": "4500000109",
      //                 "PurchaseOrderItem": "00010",
      //                 "GoodsMovementType": "101",
      //                 "QuantityInBaseUnit": "1",
      //                 "EntryUnit": "PC"
      //             }
      //         ]
      //     }
      // }

      // // console.log("config ::::::::::::::::::;", config);
      // // console.log("Data ::::::::::::::::::;", data);
      // responce = await Evolve.Axios.post(url, data, config);

      // console.log("Entered after qexten>>>>>>>>>>>>")
      // console.log("responce>>>>", responce)
      // console.log("MaterialDocument >>>>", responce.MaterialDocument)

      // let config = {
      //     headers: {
      //         "accept": "application/pdf",
      //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
      //         Authorization: `Bearer ${token}`,
      //         "Content-type": "application/pdf"
      //     },
      //     responseType: 'arraybuffer'
      // }

      // let response = await Evolve.Axios.get("http://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=" + req.body.beneficiaryRefId, config).then(details => {
      // })

      // const doc = {
      //     EvolvePrintProcess_Data: 'http://localhost:5148/printFiles/EvolveMaterialIn_GATE0038.pdf',
      //     EvolvePrintProcess_CreatedAt : new Date(),
      //     EvolvePrintProcess_CreatedUser : 1,
      //     EvolvePrintProcess_UpdatedAt : new Date(),
      //     EvolvePrintProcess_UpdatedUser : 1,
      //     EvolvePrintProcess_Status: 0,
      //     EvolvePrinter_ID : 1,
      //     EvolvePrinter_Code : 'ZPL_248',
      //     EvolvePrintProcess_ErrorCode : '',
      //     EvolvePrintProcess_ErrorMessage : ''
      //   }
      //   let result = await Evolve.Mongo.collection('EvolvePrintDetails').insertOne(doc);

      //   console.log("Result::::::::::::::::::::;0",result.insertedId);

      /** Start get DeviceDatils Code */
      // let getDeviceDatils = await Evolve.SqlPool.request().query("SELECT ed.EvolveDeviceType_ID , ed.EvolveDevice_ID , ed.EvolveDevice_Code , ed.EvolveMachine_ID , edt.EvolveDeviceType_Code FROM EvolveDevice ed , EvolveDeviceType edt where ed.EvolveDevice_Status  = 'active' AND edt.EvolveDeviceType_ID = ed.EvolveDeviceType_ID")
      // if (getDeviceDatils instanceof Error || getDeviceDatils.rowsAffected < 1) {
      // Evolve.Log.error("Error while getting DeviceDatils data")
      // }else{
      // Evolve.EvolveDeviceDatils = getDeviceDatils.recordset
      // console.log("EvolveDeviceDatils>>>>>>>>>>..", Evolve.EvolveDeviceDatils);
      // }

      /** End Get DeviceDatils Code */

      /** Start get Mixing Started WorkOrder Code */

      // let getMixingStartPordOrderNo = await Evolve.SqlPool.request().query("SELECT epo.EvolveProdOrders_ID ,  epo.EvolveProdOrders_OrderNo ,  epo.EvolveItem_ID , ei.EvolveItem_Part , ei.EvolveItem_HighSpeedTime , epo.EvolveMachine_ID  , es.EvolveSection_Code , em.EvolveMachine_Code from EvolveProdOrders epo , EvolveSection es , EvolveItem ei , EvolveMachine em  where es.EvolveSection_ID = epo.EvolveSection_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND em.EvolveMachine_ID = epo.EvolveMachine_ID AND es.EvolveSection_Code = 'Mixing' AND epo.EvolveProdOrders_Status = 'published'")
      // if (getMixingStartPordOrderNo instanceof Error) {
      // Evolve.Log.error("Error while getting MixingStartPordOrderNo Datils data")
      // }else{
      // Evolve.MixingStartPODatils = getMixingStartPordOrderNo.recordset
      // console.log("Evolve.MixingStartPODatils>>>>>>..",Evolve.MixingStartPODatils);
      // }

      /** End Get Mixing Started WorkOrder Code */

      /** Start CFD Started WorkOrder Code */

      // let getCFDStartPoOrderNo = await Evolve.SqlPool.request().query("SELECT epo.EvolveProdOrders_ID ,  epo.EvolveProdOrders_OrderNo ,  epo.EvolveItem_ID , ei.EvolveItem_Part , epo.EvolveMachine_ID  , es.EvolveSection_Code , em.EvolveMachine_Code from EvolveProdOrders epo , EvolveSection es , EvolveItem ei , EvolveMachine em where es.EvolveSection_ID = epo.EvolveSection_ID AND ei.EvolveItem_ID = epo.EvolveItem_ID AND em.EvolveMachine_ID = epo.EvolveMachine_ID AND epo.EvolveProdOrders_Status = 'published' AND es.EvolveSection_Code = 'CFD'")
      // if (getCFDStartPoOrderNo instanceof Error) {
      // Evolve.Log.error("Error while getting CFDStartPoOrderNo Datils data")
      // }else{
      // Evolve.CFDStartPODatils = getCFDStartPoOrderNo.recordset
      // console.log("Evolve.CFDStartPODatils?????", Evolve.CFDStartPODatils);

      // }
      /** End CFD Started WorkOrder Code */

      //   let findResult = await Evolve.Mongo.collection('GeneralData').find({"CreatedAt":{$gte:new Date("2022-01-26"),$lt:new Date("2022-01-28")}}).toArray();
      //   for (let obj of findResult) {
      //       console.log("obj>>>>>" ,obj.CreatedAt);

      //       const d = new Date(obj.CreatedAt);
      //       let time = d.getTime();
      //       let day = d.getDate();
      //       let hour = d.getHours();
      //       let getUTCHours = d.getUTCHours();
      //       console.log("time>>>>>" , time);
      //       console.log("day>>>>>" , day);
      //       console.log("hour>>>>>" , hour);
      //       console.log("getUTCHours >>>>>" , getUTCHours);
      //   }

      // let result = await Evolve.Mongo.collection('EvolvePrintDetails').updateOne({'_id':Evolve.ObjectID('61fa27e997b14c4340582459')}, {$set: {DeviceCode : "XYZ"}});

      // console.log("result" , result);

      let getPrinterList = await Evolve.SqlPool.request().query(
        " SELECT * FROM EvolvePrinter"
      );
      if (getPrinterList instanceof Error || getPrinterList.rowsAffected < 1) {
      } else {
        for (let i = 0; i < getPrinterList.recordset.length; i++) {
          let printerData = getPrinterList.recordset[i];
          printerData.EvolvePrinter_JobList = [];
          Evolve.PrinterList[printerData.EvolvePrinter_Code] = printerData;
        }
      }

      // let obj = {
      //     EvolvePrintProcess_ID: '61fa81da0043d86620766835',
      //     EvolvePrintProcess_Data: 'http://localhost:5148/printFiles/EvolveMaterialIn_GATE0038.pdf',
      //     EvolvePrinter_Name: 'HP LaserJet Pro MFP M125-M126 PCLmS',
      //     EvolvePrinter_Code: 'HP LaserJet Pro MFP M125-M126 PCLmS',
      //     EvolvePrinter_ID: '1',
      //     EvolvePrinter_IP: '192.168.1.52',
      //     EvolvePrinter_Port: '9100',
      //     EvolvePrinter_pcName: '',
      //     EvolvePrinter_Type: 'nw',
      //     EvolvePrinter_SubType: 'A4',
      //     EvolvePrinter_Copy : 1
      // }

      // let obj2 = {
      //     EvolvePrintProcess_ID: '61fa81da0043d86620766835',
      //     EvolvePrintProcess_Data: '^XA ^MD20^FO10,37^GD5,5,2^FS^FO34,13^GD5,5,2^FS^FO18,20^GFA,224,224,14,:Z64:eJw1zzEOwjAMBVBHHrIlF6iUi4B6pYwwNZ24lpm4hiuGjoSJDKjBscz4pC//b0BaKGBn9rE38LTUoaqKlFvAAs3DBJAonwICfFVnytPQobpSDkMv1VtVYL+J3Kbq5fkQ4d207SK/WpI/orjaFV5EqVsDz6K5Wzsn0cXZMo6i6mw1j3Z2/49Q9ANeQEi7:0c5a ^CF0,17^FO150,25^FDADIENT PART NO :^FS^FO280,25^FD 4083380 ^FS  ^FO150,50^FDADIENT PART DESC : ^FS^FO300,50^FB150,3,,L^FD2W LH TRACK ASSLY ^FS^FO150,120^FDCUST PART NO : ^FS^FO270,120^FD00 ^FS    ^FO150,145^FDDATE : 18-11-2021^FS  ^FO320,145^FDSHIFT : C ^FS ^FO150,170^FDSR. NO : 036654^FS^FO10,40^BQN,2,5^FD##4083380-181121-036654^FS^XZ',
      //     EvolvePrinter_Name: 'TSC TE244',
      //     EvolvePrinter_Code: 'TSC TE244',
      //     EvolvePrinter_ID: '2',
      //     EvolvePrinter_IP: '',
      //     EvolvePrinter_Port: '',
      //     EvolvePrinter_pcName: 'LAPTOP-MKDA70KR',
      //     // EvolvePrinter_Type: 'usb-shared',
      //     EvolvePrinter_Type: 'usb',

      //     EvolvePrinter_SubType: 'ZPL',
      //     EvolvePrinter_Copy : 1
      // }

      /** Evolve Device List Store in Memory */

      let deviceList = await Evolve.SqlPool.request().query(
        "SELECT ed.*,em.EvolveMachine_Code FROM EvolveDevice ed, EvolveMachine em WHERE em.EvolveMachine_ID = ed.EvolveMachine_ID"
      );
      if (deviceList instanceof Error || deviceList.rowsAffected < 1) {
        Evolve.Log.error("Error while getting Device List IOT Memory");
      } else {
        for (let i = 0; i < deviceList.recordset.length; i++) {
          Evolve.EvolveIOTDevice.push({
            ID: deviceList.recordset[i].EvolveDevice_ID,
            Code: deviceList.recordset[i].EvolveDevice_Code,
            Machine_ID: deviceList.recordset[i].EvolveMachine_ID,
            Machine_Code: deviceList.recordset[i].EvolveMachine_Code,
            Status: deviceList.recordset[i].EvolveDevice_Status,
            Location: deviceList.recordset[i].EvolveLocation_ID,
            Name: deviceList.recordset[i].EvolveDevice_Name,
            Data: {},
          });
        }
      }

      /** End : Store in Memory */
    } catch (error) {
      Evolve.Log.error("Error On Load....");
      Evolve.Log.error(error.message);
    }
  },
  getDT: async function () {
    try {
      let date = new Date();
      let dt =
        date.getFullYear() +
        "-" +
        ("0" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + date.getDate()).slice(-2) +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      return dt;
    } catch (error) {
      Evolve.Log.error("Evolve Error in GetDT  : " + error.message);
      return "0000-00-00 00:00:00";
    }
  },
};
