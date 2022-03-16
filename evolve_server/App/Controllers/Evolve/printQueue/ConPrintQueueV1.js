'use strict';
const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getAllItemList: async function (req, res) {
        try {
            let getAllItemList = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllItemList();
            if (getAllItemList instanceof Error || getAllItemList.rowsAffected <= 0) {
                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: "EERR32711: Error On Get All Items List ! ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item List !",
                    result: getAllItemList.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32711: Error On Get All Item List")
            Evolve.Log.error(error)
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32711 : Error On Get All Item List !",
                result: null
            };
            res.send(obj)
        }
    },

    saveOfflinePrintQueue: async function (req, res) {
        try {
            console.log("called");
            let ModelId = req.body.EvolveModel_ID;
            let error = false
            for (let i = 0; i < req.body.Quantity; i++) {
                if (error == false) {
                    let getSerialNumber = await Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getNewSerailNumber(ModelId);

                    let addPrintProcess = await Evolve.App.Services.Evolve.printQueue.SrvListV1.addPrintProcess(req.EvolveUser_ID);
                    if (addPrintProcess instanceof Error || addPrintProcess.rowsAffected <= 0) {
                        error = true
                    } else {
                        let detailsArray = [
                            {
                                EvolvePrintProcess_ID: addPrintProcess.recordset[0].inserted_id,
                                EvolvePrintProcessDetails_ParentID: 0,
                                EvolvePrintProcessDetails_Key: "ITEMID",
                                EvolvePrintProcessDetails_Value: ModelId,
                                EvolvePrintProcessDetails_CreatedUser: req.EvolveUser_ID
                            },
                            {
                                EvolvePrintProcess_ID: addPrintProcess.recordset[0].inserted_id,
                                EvolvePrintProcessDetails_ParentID: 0,
                                EvolvePrintProcessDetails_Key: "LABELSEIALID",
                                EvolvePrintProcessDetails_Value: getSerialNumber,
                                EvolvePrintProcessDetails_CreatedUser: req.EvolveUser_ID
                            },
                            {
                                EvolvePrintProcess_ID: addPrintProcess.recordset[0].inserted_id,
                                EvolvePrintProcessDetails_ParentID: 0,
                                EvolvePrintProcessDetails_Key: "REPRINTCOUNT",
                                EvolvePrintProcessDetails_Value: 0,
                                EvolvePrintProcessDetails_CreatedUser: req.EvolveUser_ID
                            }
                        ]
                        for (let i = 0; i < detailsArray.length; i++) {
                            let addRecordInPrintProcessDetails = await Evolve.App.Services.Evolve.printQueue.SrvListV1.addRecordInPrintProcessDetails(detailsArray[i]);
                            if (addRecordInPrintProcessDetails instanceof Error || addRecordInPrintProcessDetails.rowsAffected <= 0) {
                                error = true
                            }
                        }
                    }
                }
            }
            if (error == true) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR32711: Error While Save PrintQueue Data ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " PrintQueue Data Save Successfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32711: Error While Save PrintQueue Data")
            Evolve.Log.error(error)
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR32711 : Error While Save PrintQueue Data !",
                result: null
            };
            res.send(obj)
        }
    },

    getNewSerailNumber: async function (modelId) {
        try {
            let getSerialNumberDetail = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getSerialNumberDetail(modelId);
            let nextNumber = '' + getSerialNumberDetail.recordset[0].EvolveSerial_Next
            let width = getSerialNumberDetail.recordset[0].EvolveSerial_Width
            while (nextNumber.length < width) {
                nextNumber = '0' + nextNumber;
            }
            let prefix = '';
            if (getSerialNumberDetail.recordset[0].EvolveSerial_Prefix == null || getSerialNumberDetail.recordset[0].EvolveSerial_Prefix == '' || getSerialNumberDetail.recordset[0].EvolveSerial_Prefix == 'null') {
            } else {
                prefix = getSerialNumberDetail.recordset[0].EvolveSerial_Prefix
            }
            let date = new Date();
            let myDate = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
            let newSerialNumber = myDate + getSerialNumberDetail.recordset[0].EvolveSerial_ID + '~' + prefix + nextNumber;
            let addSerialNumber = await Evolve.App.Services.Evolve.printQueue.SrvListV1.addSerialNumber(newSerialNumber);
            if (addSerialNumber instanceof Error || addSerialNumber.rowsAffected < 1) {
                setTimeout(function () {
                    Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getNewSerailNumber(modelId);
                }, 5000);
            }
            else {
                let updatednumber = getSerialNumberDetail.recordset[0].EvolveSerial_Next + 1
                let limitNumber = "";
                while (limitNumber.length < width) {
                    limitNumber = limitNumber + "9"
                }
                if (getSerialNumberDetail.recordset[0].EvolveSerial_Next.toString() == limitNumber) {
                    updatednumber = "1"
                }
                let updateNextSerialNumber = await Evolve.App.Services.Evolve.printQueue.SrvListV1.updateNextSerialNumber(updatednumber, modelId);
                let getSerialNumberId = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getSerialNumberId(newSerialNumber);
                if (getSerialNumberId instanceof Error || getSerialNumberId.rowsAffected < 1) {
                    Evolve.Log.error(' EERR32592: Error On Get Serial Number');
                    return new Error(' EERR32592: Error On Get Serial Number');
                } else {
                    console.log('getSerialNumberId.recordset[0].EvolvePrintLabelSerial_ID get serial number =====', getSerialNumberId.recordset[0].EvolvePrintLabelSerial_ID);
                    return getSerialNumberId.recordset[0].EvolvePrintLabelSerial_ID
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32592: Error On Get Serial Number")
            Evolve.Log.error(error.message)
            return new Error(' EERR32592: Error On Get Serial Number');
        }
    },

    getAllOfflinePrintQueue: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllOfflinePrintQueueCount(search);
            let menus = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllOfflinePrintQueue(start, length, search);
            if (menus instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get PrintQueue list !",
                    result: menus.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: menus.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "PrintQueue List Get Successfully",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32589: Error while get PrintQueue list ! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32589: Error while get PrintQueue list ! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    printOfflineLabel: async function (req, res) {
        try {
            let labelPrintArray = req.body.labelData;
            if (req.body.IsPrintAll == true) {
                let menus = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllOfflinePrintQueueForPrint();
                for (let i = 0; i < menus.recordset.length; i++) {
                    let str = menus.recordset[i].EvolvePrintLabelSerial_Number;
                    let finalSrNo = str.slice(str.indexOf("~") + 1, str.length);
                    menus.recordset[i].EvolvePrintLabelSerial_Number = finalSrNo;
                    menus.recordset[i].EvolvePrinter_ID = labelPrintArray[0].EvolvePrinter_ID;
                    menus.recordset[i].EvolveShift_ID = labelPrintArray[0].EvolveShift_ID;
                }
                labelPrintArray = menus.recordset
            }
            labelPrintArray = labelPrintArray.reverse();
            console.log(labelPrintArray[0], "labelPrintArray>>>>>>");
            let error = false;
            let errorMessage = "";
            for (let i = 0; i < labelPrintArray.length; i++) {
                if (error == false) {
                    let getZplCode = await Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.getZplCode(labelPrintArray[i]);
                    console.log("getZplCode>>>>>>", labelPrintArray[i].EvolvePrintProcess_ID);
                    if (getZplCode == undefined || getZplCode == null || getZplCode instanceof Error) {
                        error = true;
                        errorMessage = `Error while Get ZPL Code For Item ${labelPrintArray[i].EvolveItem_Code} !`
                        i = labelPrintArray.length
                    }
                    else {
                        let updateRecordInPrintProcess = await Evolve.App.Services.Evolve.printQueue.SrvListV1.updateRecordInPrintProcess(getZplCode, req.EvolveUser_ID, labelPrintArray[i]);
                        if (updateRecordInPrintProcess instanceof Error || updateRecordInPrintProcess.rowsAffected < 1) {
                            error = true;
                            errorMessage = "Error While Print Label"
                            i = labelPrintArray.length
                        }
                    }

                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " Label Print.. Command Sent SuccessFully ! ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: errorMessage,
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32593: Error On Print Offline Label")
            Evolve.Log.error(error.message)
            return new Error(' EERR32593: Error On Print Offline Label');
        }
    },

    getZplCode: async function (data) {
        return new Promise(async function (resolve, reject) {
            let ZplCode = ""
            let getLabelData = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getLabelData(data.EvolveItem_ID);
            if (getLabelData instanceof Error || getLabelData.rowsAffected <= 0) {
                Evolve.Log.error(" EERR32594: Error On Get Label Data");
                resolve(new Error('Error On Get Label Data'));
            }
            else {
                let str = getLabelData.recordset[0].EvolveSticker_Code
                let getAllVariable = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllVariables(getLabelData.recordset[0].EvolveSticker_ID);
                if (getAllVariable instanceof Error) {
                    Evolve.Log.error(" EERR32594: Error On Get Variables");
                    resolve(new Error('Error On Get Variables'));
                }
                else if (getAllVariable.rowsAffected <= 0) {
                    ZplCode = getLabelData.recordset[0].EvolveSticker_Code
                    resolve(ZplCode);
                }
                else {
                    for (let i = 0; i < getAllVariable.recordset.length; i++) {

                        if (str.match("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}")) {
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolveItem_Code") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolveItem_Code)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolveItem_Desc") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolveItem_Desc)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolveCustItem_Code") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolveCustItem_Code)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolvePrintHistory_DSN") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolvePrintHistory_DSN)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolvePrintHistory_VIN") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolvePrintHistory_VIN)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolvePrintLabelSerial_Number") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolvePrintLabelSerial_Number)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolveShift_Code") {
                                let getAllShift = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllShift();
                                for (let j = 0; j < getAllShift.recordset.length; j++) {
                                    // let checkCurrentShift = await Evolve.App.Controllers.Evolve.printQueue.ConPrintQueueV1.checkShiftByTime(getAllShift.recordset[j].StartTime, getAllShift.recordset[j].EndTime)
                                    // if (checkCurrentShift == true) {
                                    // str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", getAllShift.recordset[j].EvolveShift_Code)
                                    // j = getAllShift.recordset.length
                                    // }
                                    if (getAllShift.recordset[j].EvolveShift_ID == data.EvolveShift_ID) {
                                        str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", getAllShift.recordset[j].EvolveShift_Name)
                                        j = getAllShift.recordset.length
                                    }
                                }
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "CurrentDate") {
                                let dt = new Date();
                                let date = dt.getUTCDate();
                                date = ('0' + Math.floor(date)).slice(-2)
                                let month = parseInt(dt.getUTCMonth() + 1);
                                month = ('0' + Math.floor(month)).slice(-2)
                                let year = dt.getUTCFullYear().toString().substr(2, 2);
                                let finalDate = date + month + year;
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", finalDate)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "DateFormated") {
                                let dt = new Date();
                                let date = dt.getUTCDate();
                                date = ('0' + Math.floor(date)).slice(-2)
                                let month = parseInt(dt.getUTCMonth() + 1);
                                month = ('0' + Math.floor(month)).slice(-2)
                                let year = dt.getUTCFullYear().toString();
                                let finalDate = date + month + year;
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", finalDate)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "DateFormated1") {
                                let dt = new Date();
                                let date = dt.getUTCDate();
                                date = ('0' + Math.floor(date)).slice(-2)
                                let month = parseInt(dt.getUTCMonth() + 1);
                                month = ('0' + Math.floor(month)).slice(-2)
                                let year = dt.getUTCFullYear().toString();
                                let finalDate = date + '.' + month + '.' + year;
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", finalDate)
                            }
                            i--;
                        }
                    }
                    resolve(str);
                }
            }
        })
    },

    checkShiftByTime: async function (start, end) {

        var setDateTime = function (date, str) {
            var sp = str.split(':');
            date.setHours(parseInt(sp[0], 10));
            date.setMinutes(parseInt(sp[1], 10));
            date.setSeconds(parseInt(sp[2], 10));
            return date;
        }

        var current = new Date();

        var c = current.getTime()
            , start = setDateTime(new Date(current), start)
            , end = setDateTime(new Date(current), end);

        return (
            c > start.getTime() &&
            c < end.getTime());
    },

    getAllPrinter: async function (req, res) {
        try {
            let getAllPrinter = await Evolve.App.Services.Evolve.printHistory.SrvListV1.getAllPrinter();
            if (getAllPrinter instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting online print history",
                    result: getAllPrinter.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Online Print Historyt",
                    result: getAllPrinter.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Reprint Label " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllShift: async function (req, res) {
        try {
            let getAllShift = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getAllShift();
            if (getAllShift instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in getting Shift List",
                    result: getAllShift.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Shift List",
                    result: getAllShift.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Get Shift " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Get Shift " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deletePrintQueue: async function (req, res) {
        try {
            let deletePrintQueue = await Evolve.App.Services.Evolve.printQueue.SrvListV1.deletePrintQueue(req.body.EvolvePrintHistory_ID);
            if (deletePrintQueue instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in delete Record!!",
                    result: deletePrintQueue.message
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Record Deleted Successfully!!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Delete Record " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Delete Record " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    // Printer API 
    getPrintTask: async function (req, res) {
        try {
            console.log("Body ", req.body);
            let obj = "";
            if (req.body.ACK_ID != undefined && req.body.ACK_ID != "" && req.body.ACK_ID != 0) {
                let printType = ""
                let getPrintType = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getPrintType(req.body.ACK_ID);
                if (getPrintType.recordset[0].EvolvePrintProcessDetails_Key == "EINVOICEID") {
                    printType = "EINVOICEID";
                }
                if (req.body.Error_Code != undefined && req.body.Error_Code != "") {
                    await Evolve.App.Services.Evolve.printQueue.SrvListV1.updatePrintTaskStatus(req.body.ACK_ID, req.body.Error_Code, req.body.Error_Msg, req.body.EvolvePrinter_Code, req.body.EvolvePrinter_SubType);
                    if (printType == "EINVOICEID") {
                        await Evolve.App.Services.Evolve.printQueue.SrvListV1.updateInvoicePrintTaskErrorStatus(getPrintType.recordset[0].EvolvePrintProcessDetails_Value, "ERROR", req.body.Error_Code, req.body.Error_Msg);
                    }
                } else {
                    if (printType == "EINVOICEID") {
                        await Evolve.App.Services.Evolve.printQueue.SrvListV1.updateInvoicePrintTaskStatus(getPrintType.recordset[0].EvolvePrintProcessDetails_Value, "PROCESS", "EINVPRINT");
                    }
                    let getPrintedTaskData = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getPrintedTaskData(req.body.ACK_ID);
                    if (getPrintedTaskData.recordset[0].EvolvePrintHistory_ID == null || getPrintedTaskData.recordset[0].EvolvePrintHistory_ID == "") {
                        let addRecordInPrintHistory = await Evolve.App.Services.Evolve.printQueue.SrvListV1.addRecordInPrintHistory(getPrintedTaskData.recordset[0]);
                        let getprintProcessDetailsTabel = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getprintProcessDetailsTabel(req.body.ACK_ID);
                        let insertString = "";
                        for (let i = 0; i < getprintProcessDetailsTabel.recordset.length; i++) {
                            insertString = insertString + `, (${addRecordInPrintHistory.recordset[0].inserted_id} , 0 , '${getprintProcessDetailsTabel.recordset[i].EvolvePrintProcessDetails_Key}' , '${getprintProcessDetailsTabel.recordset[i].EvolvePrintProcessDetails_Value}')`
                        }
                        let addRecordInPrintHistoryDetails = await Evolve.App.Services.Evolve.printProcess.SrvList.addRecordInPrintHistoryDetails(insertString.substring(1));
                        if (addRecordInPrintHistoryDetails instanceof Error || addRecordInPrintHistoryDetails.rowsAffected < 1) {
                            console.log("Error In Add Record In PrintHistoryDetails");
                        }
                    }
                    await Evolve.App.Services.Evolve.printQueue.SrvListV1.deleteRecordInPrintProcess(req.body.ACK_ID);
                }
            }

            if (req.body.EvolvePrinter_Code != undefined || req.body.EvolvePrinter_Code != "") {
                let getAllPrinter = await Evolve.App.Services.Evolve.printQueue.SrvListV1.getPrintTask(req.body.EvolvePrinter_Code);
                if (getAllPrinter instanceof Error || getAllPrinter.rowsAffected < 1) {
                    obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "No Task Found",
                        result: getAllPrinter.message
                    };
                } else {
                    console.log(getAllPrinter.recordset[0], "getAllPrinter.recordset[0]");
                    obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Print Data",
                        result: getAllPrinter.recordset[0]
                    };

                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32587: Error while Reprint Label " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32587: Error while Get Task " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}