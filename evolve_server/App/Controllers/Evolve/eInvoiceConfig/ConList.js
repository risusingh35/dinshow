'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getConfigList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.getInvoiceConfigCount(search);
            let list = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.getConfigList(start, length, search);
            if (list instanceof Error) {
                Evolve.Log.error("EERR3106 : Error while getting config list " + error.message);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3106 : Error while getting config list !",
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
            Evolve.Log.error("EERR3107 : Error while getting config list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3107 : Error while getting config list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let key = "add"
            let checkConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.checkConfig(req.body, key);
            if (checkConfig instanceof Error) {
                Evolve.Log.error("EERR3112 : Error on  check already exist! " + error.message);
                let obj = { statusCode: 400, status: "fail", message: "EERR3112 : Error on  check already exist!", result: null };
                res.send(obj);
            }
            else if (checkConfig.rowsAffected > 0) {
                let obj = { statusCode: 400, status: "fail", message: "Key already exist!", result: null };
                res.send(obj);
            }
            else {
                let addConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.addConfig(req.body);
                if (addConfig instanceof Error || addConfig.rowsAffected < 1) {
                    Evolve.Log.error("EERR3113 : Error on adding E-Invoice config " + error.message);
                    let obj = { statusCode: 400, status: "fail", message: "EERR3113 : Error on adding E-Invoice config", result: null };
                    res.send(obj);
                } else {
                    let EvolveEinvoiceConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveEinvoiceConfig");
                    if (EvolveEinvoiceConfig instanceof Error || EvolveEinvoiceConfig.rowsAffected < 1) {
                        Evolve.Log.error('EvolveEinvoiceConfig Not Found!');
                    } else {
                        Evolve.Log.info('Loading... SqlDB Connection');
                        EvolveEinvoiceConfig = EvolveEinvoiceConfig.recordsets[0];
                        Evolve.EvolveEinvoiceConfig = {};
                        for (let i = 0; i < EvolveEinvoiceConfig.length; i++) {
                            Evolve.EvolveEinvoiceConfig[EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Key] = EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Value;
                        }
                    }

                    let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveEinvoiceConfig';
                    console.log("apiUrl =======================================================", apiUrl)
                    let response = await Evolve.Axios.get(apiUrl).then(data => {
                        let obj = { statusCode: 200, status: "success", message: "Config Added successfully", result: null };
                        res.send(obj);
                    }).catch(error => {
                        let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
                        res.send(obj);
                    })
                }
            }
        } catch (error) {
            //   Evolve.Log.error("Error while adding E-Invoice config "+error.message);
            Evolve.Log.error("EERR3114 : Error while adding E-Invoice config " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3114 : Error while adding E-Invoice config " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleConfigData: async function (req, res) {
        try {
            let getSingleConfigData = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.getSingleConfigData(req.body);
            if (getSingleConfigData instanceof Error || getSingleConfigData.rowsAffected < 1) {
                Evolve.Log.error("EERR3115 : Error while getting single eInvoice config " + error.message);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3115  : Error while getting single eInvoice config",
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
            Evolve.Log.error("EERR3116 : Error while getting single eInvoice config" + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3116 : Error while getting single eInvoice config ",
                result: null
            };
            res.send(obj);
        }
    },
    updateConfig: async function (req, res) {
        try {
            let key = "update"
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.checkConfig(req.body, key);
            if (checkConfig instanceof Error) {
                Evolve.Log.error("EERR3117 : Error on  check already exist! " + error.message);
                let obj = { statusCode: 400, status: "fail", message: "EERR3117 : Error on  check already exist!", result: null };
                res.send(obj);
            }
            else if (checkConfig.rowsAffected > 0) {
                let obj = { statusCode: 400, status: "fail", message: "Key already exist!", result: null };
                res.send(obj);
            }
            else {
                let updateConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.updateConfig(req.body);
                if (updateConfig instanceof Error || updateConfig.rowsAffected < 1) {
                    Evolve.Log.error("EERR3118 : Error on  Query " + error.message);
                    let obj = { statusCode: 400, status: "fail", message: "EERR3118 : Error on  Query", result: null };
                    res.send(obj);
                } else {
                    let EvolveEinvoiceConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveEinvoiceConfig");
                    if (EvolveEinvoiceConfig instanceof Error || EvolveEinvoiceConfig.rowsAffected < 1) {
                        Evolve.Log.error('EvolveEinvoiceConfig Not Found!');
                    } else {
                        Evolve.Log.info('Loading... SqlDB Connection');
                        EvolveEinvoiceConfig = EvolveEinvoiceConfig.recordsets[0];
                        Evolve.EvolveEinvoiceConfig = {};
                        for (let i = 0; i < EvolveEinvoiceConfig.length; i++) {
                            Evolve.EvolveEinvoiceConfig[EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Key] = EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Value;
                        }
                    }

                    let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveEinvoiceConfig';
                    console.log("apiUrl =======================================================", apiUrl)
                    
                    let response = await Evolve.Axios.get(apiUrl).then(data => {
                        let obj = { statusCode: 200, status: "success", message: "Config updated successfully", result: null };
                        res.send(obj);
                    }).catch(error => {
                        let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
                        res.send(obj);
                    })
                    
                    

                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR3119 : Error while updating config " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3119 : Error while updating config ",
                result: null
            };
            res.send(obj);
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
                let fileName = 'EInvoiceConfig_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

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
                                let checkConfigExits = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.checkConfigExits(ConfigArray[i]['KEY']);
                                if (checkConfigExits.rowsAffected > 0) {
                                    ConfigArray[i].EvolveEinvoiceConfig_ID = checkConfigExits.recordset[0].EvolveEinvoiceConfig_ID;
                                    let updateConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.UpdateConfigCsv(req.body, ConfigArray[i]);
                                    if (updateConfig.rowsAffected <= 0) {
                                        errorStatus = true;
                                        Evolve.Log.error(updateConfig.message);
                                    }
                                }
                                else {
                                    let addConfig = await Evolve.App.Services.Evolve.eInvoiceConfig.SrvList.addConfigCsv(req.body, ConfigArray[i]);
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
                            let EvolveEinvoiceConfig = await Evolve.SqlPool.request().query("SELECT * FROM EvolveEinvoiceConfig");
                            if (EvolveEinvoiceConfig instanceof Error || EvolveEinvoiceConfig.rowsAffected < 1) {
                                Evolve.Log.error('EvolveEinvoiceConfig Not Found!');
                            } else {
                                Evolve.Log.info('Loading... SqlDB Connection');
                                EvolveEinvoiceConfig = EvolveEinvoiceConfig.recordsets[0];
                                Evolve.EvolveEinvoiceConfig = {};
                                for (let i = 0; i < EvolveEinvoiceConfig.length; i++) {
                                    Evolve.EvolveEinvoiceConfig[EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Key] = EvolveEinvoiceConfig[i].EvolveEinvoiceConfig_Value;
                                }
                            }

                            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveEinvoiceConfig';
                            console.log("apiUrl =======================================================", apiUrl)
                            let response = await Evolve.Axios.get(apiUrl).then(data => {
                                let obj = { statusCode: 200, status: "success", message: "Config uploaded successfully", result: null };
                                res.send(obj);
                            }).catch(error => {
                                let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
                                res.send(obj);
                            })

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
}