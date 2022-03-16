'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getStateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.State.SrvList.getStateListCount(search);
            let list = await Evolve.App.Services.Evolve.State.SrvList.getStateList(start, length,search);
            if (list instanceof Error) {
            Evolve.Log.error(" EERR3027: Error while get State list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3027 : Error while get State list!",
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
                    message: "Success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3028: Error while get State list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3028: Error while get State list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addState: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.State.SrvList.addState(req.body);
            if (result instanceof Error) {
                Evolve.Log.error("EERR3027: Error while Add State ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3027 : Error while Add State!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: "null"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3028: Error while Add State "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3028: Error while add State  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleState: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.State.SrvList.getSingleState(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error("EERR3032: Error while get single State ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3032 : Error while get single State !",
                    result: null
                };
                res.send(obj);
            }else{
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "State",
                    result: result.recordset
                };
               res.send(obj);
             }
        } catch (error) {
            Evolve.Log.error(" EERR3033: Error while get single State "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3033: Error while get single State "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateState: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.State.SrvList.updateState(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error("EERR3035: Error while update State ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3035 : Error while update State " ,
                    result: null 
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Status code updated successfully  ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3036: Error while update State "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3036: Error while update State "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    StateCSVUpload: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'EvolveState_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let StateArray = await Evolve.Csv().fromFile('./csv/' + fileName);
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < StateArray.length; i++) {
                                if (StateArray[i]['STATE NAME'] == undefined || StateArray[i]['STATE CODE'] == undefined || StateArray[i]['CITY'] == undefined || StateArray[i]['STATE NAME'] == '' || StateArray[i]['STATE CODE'] == '' ||StateArray[i]['CITY'] == '' || StateArray[i]['PIN CODE'] == undefined || StateArray[i]['PIN CODE'] == '') {
                                    errorStatus = true;
                                }
                            }
                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < StateArray.length; i++) {
                                let checkDataExits = await Evolve.App.Services.Evolve.State.SrvList.checkDataExits(StateArray[i]['PIN CODE']);
                                if (checkDataExits.rowsAffected > 0) {
                                    StateArray[i].EvolveState_ID = checkDataExits.recordset[0].EvolveState_ID;
                                    let updateState = await Evolve.App.Services.Evolve.State.SrvList.UpdateStateCsv(req.body,StateArray[i]);
                                    if (updateState.rowsAffected <= 0) {
                                        errorStatus = true;
                                        Evolve.Log.error(updateState.message);
                                    }
                                }
                                else {
                                    let addState = await Evolve.App.Services.Evolve.State.SrvList.addStateCsv(req.body, StateArray[i]);
                                    if (addState.rowsAffected <= 0) {
                                        errorStatus = true;
                                        Evolve.Log.error(addState.message);
                                    }
                                }
                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: 'Error while upload State!', result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'State uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR0256: Error while uploading csv state "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0256: Error while uploading csv state "+error.message, result: null };
            res.send(obj);
        }
    },



}