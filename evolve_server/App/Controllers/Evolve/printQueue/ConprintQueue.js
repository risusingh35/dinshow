'use strict';
const Evolve = require("../../../../Boot/Evolve");

module.exports = {

    getAllOnlinePrintQueue: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllOnlinePrintQueueCount(search);
            let menus = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllOnlinePrintQueue(start, length, search);
            if (menus instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get online PrintQueue list !",
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
                    message: "Online PrintQueue List Get Successfully",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32588: Error while get online PrintQueue list ! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32588: Error while get online PrintQueue list ! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllOfflinePrintQueue: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllOfflinePrintQueueCount(search);
            let menus = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllOfflinePrintQueue(start, length, search);
            if (menus instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get offline PrintQueue list !",
                    result: menus.message
                };
                res.send(obj);
            } else {
                for(let i = 0 ; i < menus.recordset.length ; i++){
                    menus.recordset[i].EvolvePrintLabelSerial_Number = menus.recordset[i].EvolvePrintLabelSerial_Number.split("~")[1]
                }
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: menus.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Offline PrintQueue List Get Successfully",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32589: Error while get offline PrintQueue list ! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32589: Error while get offline PrintQueue list ! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getAllOfflineModelList: async function (req, res) {
        try {
            let menus = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllOfflineModelList();
            if (menus instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get offline Model list !",
                    result: menus.message
                };
                res.send(obj);
            } else {

                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Offline Model List Get Successfully",
                    result: menus.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32590: Error while get offline Model list ! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32590: Error while get offline Model list ! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    saveOfflinePrintQueue: async function (req, res) {
        try {
            let ModelId = req.body.EvolveModel_ID
            let getItemByModelId = await Evolve.App.Services.Evolve.printQueue.SrvList.getItemByModelId(ModelId);
            console.log(getItemByModelId);
            if (getItemByModelId instanceof Error || getItemByModelId.rowsAffected <= 0) {
                Evolve.Log.error(`Item Not Found For Selected Model !`);
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: " EERR32591: Item Not Found For Selected Model ! ",
                    result: null
                };
                res.send(obj);
            }
            else {
                for (let i = 0; i < req.body.Quantity; i++) {
                    let getSerialNumber = await Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getNewSerailNumber(ModelId);
                    for (let j = 0; j < getItemByModelId.recordset.length; j++) {
                        let addPrintHistory = await Evolve.App.Services.Evolve.printQueue.SrvList.addPrintHistory(getItemByModelId.recordset[j].EvolveItem_ID, ModelId, getSerialNumber);
                        if (addPrintHistory instanceof Error || addPrintHistory.rowsAffected <= 0) {
                            Evolve.Log.error(`Error While Add Print History !`);
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: " EERR32591: Error While Save Offline PrintQueue Data ",
                                result: null
                            };
                            res.send(obj);
                        }
                    }
                }
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " Offline PrintQueue Data Save Successfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32591: Error while Save Offline PrintQueue Data ! " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32591: Error while Save Offline PrintQueue Data ! " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getNewSerailNumber: async function (modelId) {
        try {
            let getSerialNumberDetail = await Evolve.App.Services.Evolve.printQueue.SrvList.getSerialNumberDetail(modelId);
            let nextNumber = '' + getSerialNumberDetail.recordset[0].EvolveSerial_Next
            let width = getSerialNumberDetail.recordset[0].EvolveSerial_Width
            while (nextNumber.length < width) {
                nextNumber = '0' + nextNumber;
            }
            let dt = new Date();
            let date = dt.getUTCDate();
            date = ('0' + Math.floor(date)).slice(-2)
            let month = parseInt(dt.getUTCMonth() + 1);
            month = ('0' + Math.floor(month)).slice(-2)
            let year = dt.getUTCFullYear().toString();
            let todayDate =  date + month + year;
            let newSerialNumber = getSerialNumberDetail.recordset[0].EvolveSerial_ID + todayDate + '~' + getSerialNumberDetail.recordset[0].EvolveSerial_Prefix + nextNumber
            let addSerialNumber = await Evolve.App.Services.Evolve.printQueue.SrvList.addSerialNumber(newSerialNumber);
            if (addSerialNumber instanceof Error || addSerialNumber.rowsAffected < 1) {
                setTimeout(function () {
                    Evolve.App.Services.Evolve.printQueue.ConprintQueue.getNewSerailNumber(modelId);
                }, 5000);
            }
            else {
                let updatednumber = getSerialNumberDetail.recordset[0].EvolveSerial_Next + 1;
                if((updatednumber+'').length > width){
                    updatednumber = 1;
                }
                let updateNextSerialNumber = await Evolve.App.Services.Evolve.printQueue.SrvList.updateNextSerialNumber(updatednumber, modelId);
                let getSerialNumberId = await Evolve.App.Services.Evolve.printQueue.SrvList.getSerialNumberId(newSerialNumber);
                if (getSerialNumberId instanceof Error || getSerialNumberId.rowsAffected < 1) {
                    Evolve.Log.error(' EERR32592: Error On Get Serial Number');
                    return new Error(' EERR32592: Error On Get Serial Number');
                } else {
                    return getSerialNumberId.recordset[0].EvolvePrintLabelSerial_ID
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR32592: Error On Get Serial Number")
            Evolve.Log.error(error)
            return new Error(' EERR32592: Error On Get Serial Number');
        }
    },

    printOfflineLabel: async function (req, res) {
        try {
            console.log('printOfflineLabel called=========================================>');
            let labelPrintArray = req.body.labelData
            console.log('labelPrintArray[i]============================>',labelPrintArray);
            let error = false;
            let errorMessage = ""
            for (let i = 0; i < labelPrintArray.length; i++) {
                if (error == false) {
                    let getZplCode = await Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getZplCode(labelPrintArray[i]);
                    Evolve.Log.error("zplcode=================>",getZplCode)
                    if (getZplCode == undefined || getZplCode == null || getZplCode instanceof Error) {
                        error = true;
                        errorMessage = `Error while Get ZPL Code For Item ${labelPrintArray[i].EvolveItem_Code} !`
                        i = labelPrintArray.length
                    }
                    else {
                        let addRecordInPrintProcess = await Evolve.App.Services.Evolve.printQueue.SrvList.addRecordInPrintProcess(getZplCode, req.EvolveUser_ID, labelPrintArray[i]);
                        if (addRecordInPrintProcess instanceof Error || addRecordInPrintProcess.rowsAffected < 1) {
                            error = true;
                            errorMessage = "Error While Print Label"
                            i = labelPrintArray.length
                        }
                    }

                }
            }
            console.log('error=============>', error);
            console.log('erro messaer=============>', errorMessage);
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: " Label Print.. Command Sent SuccessFully ! ",
                    result: null
                };
                console.log("Success message send==========");
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: errorMessage,
                    result: null
                };
                console.log("Error Message Send");
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32593: Error On Print Offline Label")
            Evolve.Log.error(error.message)
            console.log("Catch called======");
            // return new Error(' EERR32593: Error On Print Offline Label');
        }
    },

    getZplCode: async function (data) {
        return new Promise(async function (resolve, reject) {
            // console.log("Get ZPL code called=============>");
            let ZplCode = ""
            let getLabelData = await Evolve.App.Services.Evolve.printQueue.SrvList.getLabelData(data.EvolveItem_ID);
            // console.log("getlabeldata=====>", getLabelData);
            if (getLabelData instanceof Error || getLabelData.rowsAffected <= 0) {
                Evolve.Log.error(" EERR32594: Error On Get Label Data");
                resolve(new Error('Error On Get Label Data'));
            }
            else {
                console.log("enter in else part========>");
                let str = getLabelData.recordset[0].EvolveSticker_Code
                let getAllVariable = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllVariables(getLabelData.recordset[0].EvolveSticker_ID);
                // console.log("getallvariablwee===========>", getAllVariable);
                if (getAllVariable instanceof Error) {
                    Evolve.Log.error(" EERR32594: Error On Get Variables");
                    resolve(new Error('Error On Get Variables'));
                }
                else if (getAllVariable.rowsAffected <= 0) {
                    ZplCode = getLabelData.recordset[0].EvolveSticker_Code
                    // console.log("zpl code from zpl func =========>", ZplCode);
                    resolve(ZplCode);
                }
                else {
                    // console.log("Enter in replace else part=====>");
                    for (let i = 0; i < getAllVariable.recordset.length; i++) {
                        console.log("getAllVariable.recordset[i].EvolveStickerVar_Value====", getAllVariable.recordset[i].EvolveStickerVar_Value);
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
                                let nextNumber = '' + data.EvolvePrintHistory_DSN
                                let width = 6
                                while (nextNumber.length < width) {
                                    nextNumber = '0' + nextNumber;
                                }
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", nextNumber)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolvePrintHistory_VIN") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolvePrintHistory_VIN)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolvePrintLabelSerial_Number") {
                                str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", data.EvolvePrintLabelSerial_Number)
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "EvolveShift_Code") {
                                // console.log("Enter in Shit part=======>");
                                let getAllShift = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllShift();
                                for (let j = 0; j < getAllShift.recordset.length; j++) {
                                    let checkCurrentShift = await Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.checkShiftByTime(getAllShift.recordset[j].StartTime, getAllShift.recordset[j].EndTime)
                                    // console.log("checkCurrentShift=====>",checkCurrentShift);
                                    // console.log("getAllShift.recordset[j].EvolveShift_Code===>",getAllShift.recordset[j].EvolveShift_Code);
                                    if (checkCurrentShift == true) {
                                        // console.log("check currentshit get success====>");
                                        // console.log("getAllShift.recordset[j].EvolveShift_Code success part====>",getAllShift.recordset[j].EvolveShift_Code);
                                        str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", getAllShift.recordset[j].EvolveShift_Code)
                                        j = getAllShift.recordset.length
                                    }
                                }
                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "CurrentDate") {
                                let dt
                                if(data.EvolvePrintHistory_DSNDate != null && data.EvolvePrintHistory_DSNDate != ''){
                                    dt = data.EvolvePrintHistory_DSNDate;
                                    let dtNew = dt.split('-')
                                    let date = ((dtNew[2].length) < 2 ? ('0'+ (dtNew[2].slice(0,1))) : (dtNew[2].slice(0,2)))
                                    // date = ('0' + Math.floor(date)).slice(-2)
                                    let month = ((dtNew[1].length) < 2 ? ('0'+ dtNew[1]) : (dtNew[1]))
                                    // month = ('0' + Math.floor(month)).slice(-2)
                                    // let year = dt.getUTCFullYear().toString().substr(2, 2);
                                    let finalDate = month + date;
                                    console.log('final date -==========================>', finalDate);
                                    str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", finalDate)
                                }else{
                                    dt = new Date();
                                    let date = dt.getUTCDate();
                                    date = ('0' + Math.floor(date)).slice(-2)
                                    let month = parseInt(dt.getUTCMonth() + 1);
                                    month = ('0' + Math.floor(month)).slice(-2)
                                    let year = dt.getUTCFullYear();
                                    let todayDate =  date +"-" + month +"-" + year
                                    str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", todayDate)
                                }

                            }
                            if (getAllVariable.recordset[i].EvolveStickerVar_Value == "CurrentDate1") {
                                let dt
                                if(data.EvolvePrintHistory_DSNDate != null && data.EvolvePrintHistory_DSNDate != ''){
                                    dt = data.EvolvePrintHistory_DSNDate;
                                    let dtNew = dt.split('-')
                                    let date = ((dtNew[2].length) < 2 ? ('0'+ (dtNew[2].slice(0,1))) : (dtNew[2].slice(0,2)))
                                    // date = ('0' + Math.floor(date)).slice(-2)
                                    let month = ((dtNew[1].length) < 2 ? ('0'+ dtNew[1]) : (dtNew[1]))
                                    // month = ('0' + Math.floor(month)).slice(-2)
                                    let year = dtNew[0].substring(2)
                                    let finalDate = date + month + year;
                                    console.log('final date -==========================>', finalDate);
                                    str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", finalDate)
                                }else{
                                    dt = new Date();
                                    let date = dt.getUTCDate();
                                    date = ('0' + Math.floor(date)).slice(-2)
                                    let month = parseInt(dt.getUTCMonth() + 1);
                                    month = ('0' + Math.floor(month)).slice(-2)
                                    let year = dt.getUTCFullYear().toString().substring(2);
                                    let todayDate =  date + month + year;
                                    str = str.replace("{~" + getAllVariable.recordset[i].EvolveStickerVar_Key + "~}", todayDate)
                                }

                            }

                            i--;
                        }
                    }
                    console.log("zpl code from zpl func =========>", str);
                    resolve(str);
                }
            }
        })
    },

    checkShiftByTime: async function (start, end) {
        // console.log("start=====>", start);
        // console.log("end====>", end);
        var setDateTime = function (date, str) {
            var sp = str.split(':');
            date.setHours(parseInt(sp[0], 10));
            date.setMinutes(parseInt(sp[1], 10));
            date.setSeconds(parseInt(sp[2], 10));
            // console.log("date====>",date);
            return date;
        }

        var current = new Date();
        var currentadd = new Date();
        currentadd.setDate(currentadd.getDate() + 1);
        var startnew = start.split(':');
        var endnew = end.split(':');
        // console.log("currentaddd ======>", currentadd);
        var c = (parseInt(endnew[0]) < parseInt(startnew[0]) ? currentadd.getTime() : current.getTime())
            , start = setDateTime(new Date(current), start)
            , end = setDateTime((parseInt(endnew[0]) < parseInt(startnew[0]) ? currentadd : current), end);
        // console.log("c===========>",c);
        // console.log("start after========>,", start);
        // console.log("end after=====>",end);
        return (
            c > start.getTime() &&
            c < end.getTime());
    },

    printFirst21DSN: async function (req, res) {
        try {
            let getFirst21DSN = await Evolve.App.Services.Evolve.printQueue.SrvList.getFirst21DSN();
            if (getFirst21DSN instanceof Error || getFirst21DSN.rowsAffected <= 0) {
                Evolve.Log.error("Error On Get First 21 DSN")
                let obj = {
                    statusCode: 400,
                    status: "Fail",
                    message: " Error On Get First 21 DSN ! ",
                    result: null
                };
                res.send(obj);
            } else {
                let printArrayFor21DSN = []
                for (let i = 0; i < getFirst21DSN.recordset.length; i++) {
                    let getPrintDetail = await Evolve.App.Services.Evolve.printQueue.SrvList.getPrintDetail(getFirst21DSN.recordset[i]);
                    console.log(getPrintDetail, 'printdetail');
                    for (let j = 0; j < getPrintDetail.recordset.length; j++) {
                        getPrintDetail.recordset[j].EvolvePrinter_ID = req.body.EvolvePrinter_ID
                        printArrayFor21DSN.push(getPrintDetail.recordset[j]);
                    }
                }
                for (let k = 0; k < printArrayFor21DSN.length; k++) {
                    let getZplCode = await Evolve.App.Controllers.Evolve.printQueue.ConprintQueue.getZplCode(printArrayFor21DSN[k]);
                    let addRecordInPrintQueue = await Evolve.App.Services.Evolve.printQueue.SrvList.addRecordInPrintProcess(getZplCode, req.EvolveUser_ID, printArrayFor21DSN[k]);
                    if (addRecordInPrintQueue instanceof Error || addRecordInPrintQueue.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while Print Label !",
                            result: null
                        };
                        res.send(obj)
                    }
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Frist 21 DSN Print SuccessFully !",
                    result: null
                };
                res.send(obj)
            }
        } catch (error) {
            Evolve.Log.error(" EERR32595: Error On Print First 21 DSN")
            Evolve.Log.error(error.message)
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "Error while Print Label !",
                result: null
            };
            res.send(obj)
        }
    },

    getAllPrinter: async function (req, res) {
        try {
            let getAllPrinter = await Evolve.App.Services.Evolve.printQueue.SrvList.getAllPrinter();
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
    }

}