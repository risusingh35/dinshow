'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

  getConfigList: async function (req, res) {
    try {
      let start = parseInt(req.body.startFrom);
      let length = parseInt(req.body.displayRecord);
      let search = req.body.search;

      let count = await Evolve.App.Services.Evolve.Config.SrvList.getConfigListCount(search);
      let list = await Evolve.App.Services.Evolve.Config.SrvList.getConfigList(start, length, search);
      if (list instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error while getting config list !",
          result: list.message
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
          message: "Config list get successfully !",
          result: resObj
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0213: Error while getting config list " + error.message);
      let obj = {
        statusCode: 400,
        status: "fail",
        message: " EERR0213: Error while getting config list " + error.message,
        result: null
      };
      res.send(obj);
    }
  },

  addConfig: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let key = "add"
      let checkConfig = await Evolve.App.Services.Evolve.Config.SrvList.checkConfig(req.body, key);
      if (checkConfig instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  check already exist!",
          result: null
        };
        res.send(obj);
      }
      else if (checkConfig.rowsAffected > 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Key already exist!",
          result: null
        };
        res.send(obj);
      }
      else {
        let addConfig = await Evolve.App.Services.Evolve.Config.SrvList.addConfig(req.body);
        if (addConfig instanceof Error || addConfig.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on  Query",
            result: null
          };
          res.send(obj);
        } else {
          let EvolveConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveConfig");
          if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
            Evolve.Log.error('Evolve Config Not Found!');
          } else {
            Evolve.Log.info('Loading... SqlDB Connection');
            EvolveConfig = EvolveConfig.recordsets[0];
            Evolve.Config = {};
            for (let i = 0; i < EvolveConfig.length; i++) {
              Evolve.Config[EvolveConfig[i].EvolveConfig_Key] = EvolveConfig[i].EvolveConfig_Value;
            }
          }
          let obj = {
            statusCode: 200,
            status: "success",
            message: "Config added successfully",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0216: Error while adding config " + error.message);
    }
  },

  getSingleConfigData: async function (req, res) {
    try {

      let getSingleConfigData = await Evolve.App.Services.Evolve.Config.SrvList.getSingleConfigData(
        req.body
      );


      if (getSingleConfigData instanceof Error || getSingleConfigData.rowsAffected < 1) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  Query",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 200,
          status: "success",
          message: "Config data gotted",
          result: getSingleConfigData.recordset[0]
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0217: Error while getting single config data " + error.message);
    }
  },

  updateConfig: async function (req, res) {
    try {
      let key = "update"
      req.body.EvolveUser_ID = req.EvolveUser_ID;
      let checkConfig = await Evolve.App.Services.Evolve.Config.SrvList.checkConfig(req.body, key);
      if (checkConfig instanceof Error) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Error on  check already exist!",
          result: null
        };
        res.send(obj);
      }
      else if (checkConfig.rowsAffected > 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Key already exist!",
          result: null
        };
        res.send(obj);
      }
      else {
        let updateConfig = await Evolve.App.Services.Evolve.Config.SrvList.updateConfig(req.body);
        if (updateConfig instanceof Error || updateConfig.rowsAffected < 1) {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Error on  Query",
            result: null
          };
          res.send(obj);
        } else {

          let EvolveConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveConfig");
          if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
            Evolve.Log.error('Evolve Config Not Found!');
          } else {
            Evolve.Log.info('Loading... SqlDB Connection');
            EvolveConfig = EvolveConfig.recordsets[0];
            Evolve.Config = {};
            for (let i = 0; i < EvolveConfig.length; i++) {
              Evolve.Config[EvolveConfig[i].EvolveConfig_Key] = EvolveConfig[i].EvolveConfig_Value;
            }
          }

          let obj = {
            statusCode: 200,
            status: "success",
            message: "Config updated successfully",
            result: null
          };
          res.send(obj);
        }
      }
    } catch (error) {
      Evolve.Log.error(" EERR0218: Error while updating config " + error.message);
    }
  },

  CsvConfigUpload: async function (req, res) {
    try {
      req.body.EvolveUser_ID = req.EvolveUser_ID
      if (req.files.csvFile) {
        let csv = req.files.csvFile;
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(csv.name)[1];
        let date = new Date();
        let fileName = 'Config_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

        // Use the mv() method to place the file somewhere on your server
        csv.mv('./csv/' + fileName, async function (error) {
          if (error) {
            // console.log("Error in File Upload ::", error.message);
            let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
            res.send(obj);
          } else {
            let ConfigArray = await Evolve.Csv().fromFile('./csv/' + fileName);
            let errorStatus = false;
            if (errorStatus == false) {
              for (let i = 0; i < ConfigArray.length; i++) {
                if (ConfigArray[i]['KEY'] == undefined || ConfigArray[i]['VALUE'] == undefined || ConfigArray[i]['DESCRIPTION'] == undefined || ConfigArray[i]['KEY'] == '' || ConfigArray[i]['VALUE'] == '' || ConfigArray[i]['DESCRIPTION'] == '') {
                  errorStatus = true;
                }
              }
            }
            if (errorStatus == false) {
              for (let i = 0; i < ConfigArray.length; i++) {
                let checkConfigExits = await Evolve.App.Services.Evolve.Config.SrvList.checkConfigExits(ConfigArray[i]['KEY']);
                if (checkConfigExits.rowsAffected > 0) {
                  ConfigArray[i].EvolveConfig_ID = checkConfigExits.recordset[0].EvolveConfig_ID;
                  let updateConfig = await Evolve.App.Services.Evolve.Config.SrvList.UpdateConfigCsv(ConfigArray[i]);
                  if (updateConfig.rowsAffected <= 0) {
                    errorStatus = true;
                    Evolve.Log.error(updateConfig.message);
                  }
                }
                else {
                  let addConfig = await Evolve.App.Services.Evolve.Config.SrvList.addConfigCsv(ConfigArray[i]);
                  if (addConfig.rowsAffected <= 0) {
                    errorStatus = true;
                    Evolve.Log.error(addConfig.message);
                  }
                }
              }

            }
            if (errorStatus == true) {
              let obj = { statusCode: 400, status: "fail", message: 'Error while upload Config!', result: null };
              res.send(obj);
            }
            else {
              let EvolveConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveConfig");
              if (EvolveConfig instanceof Error || EvolveConfig.rowsAffected < 1) {
                Evolve.Log.error('Evolve Config Not Found!');
              } else {
                Evolve.Log.info('Loading... SqlDB Connection');
                EvolveConfig = EvolveConfig.recordsets[0];
                Evolve.Config = {};
                for (let i = 0; i < EvolveConfig.length; i++) {
                  Evolve.Config[EvolveConfig[i].EvolveConfig_Key] = EvolveConfig[i].EvolveConfig_Value;
                }
              }
              let obj = { statusCode: 200, status: "success", message: 'Config uploaded succsessfully', result: null };
              res.send(obj);
            }
          }
        });
      }
    } catch (error) {
      Evolve.Log.error(" EERR0256: Error while uploading csv Config " + error.message);
      let obj = { statusCode: 400, status: "fail", message: " EERR0256: Error while uploading csv Config " + error.message, result: null };
      res.send(obj);
    }
  },

  restartPM2Server: async function (req, res) {
    try {
      let ServerName = req.body.ServerName;
      if (Evolve.Config.EvolvePM2Enable == 1 && Evolve.Config.EvolveServerPM2INDEX != undefined && Evolve.Config.EvolveIOServerPM2INDEX != undefined) {
        if (ServerName == 'EvolveServer') {
          let command = 'pm2 restart ' + Evolve.Config.EvolveServerPM2INDEX;
          Evolve.Log.info("=================Evolve Server ==================" + command)
          Evolve.CMD.run(command,
            function (err, data) {
              if (err) {
                Evolve.Log.error(err);
              } else {
                Evolve.Log.info(data);
              }
            });

          let obj = {
            statusCode: 200,
            status: "success",
            message: "Evolve Server Restart Successfully!",
            result: null
          };
          res.send(obj);
        } else if (ServerName == 'EvolveIOServer') {

          let command = 'pm2 restart ' + Evolve.Config.EvolveIOServerPM2INDEX;
          Evolve.Log.info("=================Evolve IO Server ==================" + command)
          Evolve.CMD.run(command,
            function (err, data) {
              if (err) {
                Evolve.Log.error(err);
              } else {
                Evolve.Log.info(data);
              }
            });

          let obj = {
            statusCode: 200,
            status: "success",
            message: "Evolve IO Server Restart Successfully!",
            result: null
          };
          res.send(obj);
        } else {
          let obj = {
            statusCode: 400,
            status: "fail",
            message: "Evolve PM2 Server Not Found!",
            result: null
          };
          res.send(obj);
        }


      } else if (Evolve.Config.EvolvePM2Enable == 0) {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "PM2 Server Not Setup!",
          result: null
        };
        res.send(obj);
      } else {
        let obj = {
          statusCode: 400,
          status: "fail",
          message: "Evolve PM2 Setting Not Define!",
          result: null
        };
        res.send(obj);
      }
    } catch (error) {
      Evolve.Log.error(" EERR0218: Error while Restart PM2 Server " + error.message);
    }
  },



}