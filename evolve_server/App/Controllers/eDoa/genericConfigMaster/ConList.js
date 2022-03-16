'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    
    getGenericConfigMasterList: async function (req, res) {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
        let search = req.body.search;

        try {
            let count = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.getGenericConfigMasterListCount(search);
            let result = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.getGenericConfigMasterList(start, length, search);

            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while get generic config master ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get generic config master!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        }
        catch (err) {
            Evolve.Log.error("Error while get tax class list",err);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while get tax class list",
                result: null
            });
        }
    },

    addGenericConfig: async function (req, res) {
        try {

            req.body.EvolveUser_ID = req.EvolveUser_ID ;
            
            let result = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.addGenConfigMaster(req.body);

            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while add generic config master ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add generic config master!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (err) {
            Evolve.Log.error("Error while add generic config master ",err);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add generic config master "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateGenericConfig: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.updateConfigMaster(req.body);

            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while update generic config master ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update generic config master!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Update Generic Config Master Successfully",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (err) {
            Evolve.Log.error("Error while update generic config master ",err);

            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update generic config master "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onUploadGenericConfigMasterFile : async function (req, res) {
        try {
            let keyValue = req.body.keyValue
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'genericConfigMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                
                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
           
                        let errorMessage = 'Error While Upload Generic Config Master !!';
                        let errorStatus = false;
                  
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {

                                if(csvDataArray[i]['Value'] != '' && csvDataArray[i]['Value'] != undefined && csvDataArray[i]['Value'] != null){
                              
                                    let checkgenericConfigExist = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.checkgenericConfigExist(csvDataArray[i] , keyValue) ;
                                    if (checkgenericConfigExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkgenericConfigExist.message);
                                    }
                                    else if (checkgenericConfigExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveGenericCodeMaster_ID'] = checkgenericConfigExist.recordset[0].EvolveGenericCodeMaster_ID;
                                        let updateGenericConfig = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.updateGenericConfig(req.EvolveUser_ID, csvDataArray[i], keyValue);
                                        if (updateGenericConfig instanceof Error || updateGenericConfig.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Update Generic Config Maseter");
                                        }
                                    }
                                    else {
                                        let addGenericConfig = await Evolve.App.Services.eDoa.genericConfigMaster.SrvList.addGenericConfig(req.EvolveUser_ID, csvDataArray[i], keyValue);
                                        if (addGenericConfig instanceof Error || addGenericConfig.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error In Add Generic Config Maseter");
                                        }
                                    }
                                }
                            }

                        }
                        else {
                            errorStatus = true;
                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Generic Config Master uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Generic Config Master " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Generic Config Master ", result: null
            };
            res.send(obj);
        }
    }
}