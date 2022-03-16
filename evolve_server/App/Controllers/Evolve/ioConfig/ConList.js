'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getConfigList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.ioConfig.SrvList.getConfigListCount(search)
            let list = await Evolve.App.Services.Evolve.ioConfig.SrvList.getConfigList(start, length, search);

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
                    noOfRecord: Count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "IO Config list get successfully !",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("Error while getting config list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while getting config list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let key = "add"
            let checkConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.checkConfig(req.body, key);
            if (checkConfig instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error on check already exist!", result: null };
                res.send(obj);
            }
            else if (checkConfig.rowsAffected > 0) {
                let obj = { statusCode: 400, status: "fail", message: "Key already exist!", result: null };
                res.send(obj);
            }
            else {
                let addConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.addConfig(req.body);
                if (addConfig instanceof Error || addConfig.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error on adding IO config", result: null };
                    res.send(obj);
                } else {
                    let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveIOConfig';
                    console.log("apiUrl =======================================================", apiUrl)
                    
                    let response = await Evolve.Axios.get(apiUrl).then(data => {
                        let obj = { statusCode: 200, status: "success", message: "IO Config added successfully", result: null };
                        res.send(obj);
                    }).catch(error => {
                        let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
                        res.send(obj);
                    })
                }
            }
        } catch (error) {
            Evolve.Log.error("Error while adding IO config " + error.message);
        }
    },

    getSingleConfigData: async function (req, res) {
        try {
            let getSingleConfigData = await Evolve.App.Services.Evolve.ioConfig.SrvList.getSingleConfigData(req.body);
            if (getSingleConfigData instanceof Error || getSingleConfigData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting single IO config",
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
            Evolve.Log.error("Error while getting single IO config" + error.message);
        }
    },

    updateConfig: async function (req, res) {
        try {
            let key = "update"
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.checkConfig(req.body, key);
            if (checkConfig instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error on check already exist!", result: null };
                res.send(obj);
            }
            else if (checkConfig.rowsAffected > 0) {
                let obj = { statusCode: 400, status: "fail", message: "Key already exist!", result: null };
                res.send(obj);
            }
            else {
                let updateConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.updateConfig(req.body);
                if (updateConfig instanceof Error || updateConfig.rowsAffected < 1) {
                    let obj = { statusCode: 400, status: "fail", message: "Error while update IO config", result: null };
                    res.send(obj);
                } else {
                    let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveIOConfig';
                    console.log("apiUrl =======================================================", apiUrl)
                    let response = await Evolve.Axios.get(apiUrl).then(data => {
                        let obj = { statusCode: 200, status: "success", message: "IO Config Updated successfully", result: null };
                        res.send(obj);
                    }).catch(error => {
                        let obj = { statusCode: 200, status: "success", message: "IO Server Not Started", result: null };
                        res.send(obj);
                    })
                }
            }
        } catch (error) {
            Evolve.Log.error("Error while updating config " + error.message);
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
                                let checkConfigExits = await Evolve.App.Services.Evolve.ioConfig.SrvList.checkConfigExits(ConfigArray[i]['KEY']);
                                if (checkConfigExits.rowsAffected > 0) {
                                    ConfigArray[i].EvolveIOConfig_ID = checkConfigExits.recordset[0].EvolveIOConfig_ID;
                                    let updateConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.UpdateConfigCsv(ConfigArray[i], req.body);
                                    if (updateConfig.rowsAffected <= 0) {
                                        errorStatus = true;
                                        Evolve.Log.error(updateConfig.message);
                                    }
                                }
                                else {
                                    let addConfig = await Evolve.App.Services.Evolve.ioConfig.SrvList.addConfigCsv(ConfigArray[i], req.body);
                                    if (addConfig.rowsAffected <= 0) {
                                        errorStatus = true;
                                        Evolve.Log.error(addConfig.message);
                                    }
                                }
                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: 'Error while upload IO Config!', result: null };
                            res.send(obj);
                        }
                        else {
                            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/resetConfigVariable/EvolveIOConfig';
                            console.log("apiUrl =======================================================", apiUrl)
                            let response = await Evolve.Axios.get(apiUrl).then(data => {
                                let obj = { statusCode: 200, status: "success", message: "IO Config uploaded successfully", result: null };
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