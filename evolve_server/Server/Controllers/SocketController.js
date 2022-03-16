const Evolve = require('../../Boot/Evolve');
var timerObj = '';
var functionCalled = false;
module.exports = {

    test: async function (socket, data) {
        try {
            console.log("Data :::", data)
            await Evolve.Io.emit('DataChange', {
                count: 10
            });
            return {
                status: 'success',
                result: null,
                message: 'Test Successfully Register!'
            }
        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
        }
    },

    reciveMillingData: async function (data) {
        try {
            //console.log("Milling Data Recive :::",data)
            let itemData = {};

            // for(let j=0; j <Evolve.Milling.length; j++){
            if (Evolve.Milling.Evolve_Milling_Barcode == data.Evolve_Milling_Barcode) {
                Evolve.Milling.Evolve_Milling_Barcode = data.Evolve_Milling_Barcode;
                Evolve.Milling.Evolve_Milling_Cycle_Start = data.Evolve_Milling_Cycle_Start;
                Evolve.Milling.Evolve_Milling_Cycle_Finished = data.Evolve_Milling_Cycle_Finished;
                Evolve.Milling.Evolve_Milling_Cycle_Part_OK = data.Evolve_Milling_Cycle_Part_OK;
                Evolve.Milling.Evolve_Milling_Cycle_Part_Not_OK = data.Evolve_Milling_Cycle_Part_Not_OK;
                //  EvolveInvalid_Barcode = Evolve.Milling.EvolveInvalid_Barcode;
            } else {
                console.log("/******************New Barcode Scan************************************/")
                // Save Old Barcode Data into Database......
                if (Evolve.Milling.EvolveInvalid_Barcode == false) {
                    let responce = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.saveAndUpdteMillingData(data);
                    if (responce instanceof Error || responce.rowsAffected < 1) {
                        console.log("Error in milling Data....................................")
                    }
                }


                // New Barcode Scan 
                let itemDetail = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.checkMillingMachinBarcode(data.Evolve_Milling_Barcode);
                if (itemDetail instanceof Error || itemDetail.rowsAffected < 1) {
                    // Error No Item Found!
                    // Invalid Barcode....
                    itemData = {
                        'EvolveItem_Code': '-',
                        'EvolveItem_Desc': '-',
                        'EvolveItem_CustPart': '-',
                        'EvolveInvalid_Barcode': true
                    }
                } else {
                    itemData = {
                        'EvolveItem_Code': itemDetail.recordset[0].EvolveItem_Code,
                        'EvolveItem_Desc': itemDetail.recordset[0].EvolveItem_Desc,
                        'EvolveItem_CustPart': itemDetail.recordset[0].EvolveItem_CustPart,
                        'EvolveInvalid_Barcode': false
                    }
                }
                Evolve.Milling = {
                    Evolve_Milling_Barcode: data.Evolve_Milling_Barcode,
                    Evolve_Milling_Cycle_Start: data.Evolve_Milling_Cycle_Start,
                    Evolve_Milling_Cycle_Finished: data.Evolve_Milling_Cycle_Finished,
                    Evolve_Milling_Cycle_Part_OK: data.Evolve_Milling_Cycle_Part_OK,
                    Evolve_Milling_Cycle_Part_Not_OK: data.Evolve_Milling_Cycle_Part_Not_OK,
                    EvolveItem_Code: itemData.EvolveItem_Code,
                    EvolveItem_Desc: itemData.EvolveItem_Desc,
                    EvolveItem_CustPart: itemData.EvolveItem_CustPart,
                    EvolveInvalid_Barcode: itemData.EvolveInvalid_Barcode
                };

            }
            // }



            let message = '-';

            // create Array for Result
            let tableData = [];

            if (data.Evolve_Milling_Barcode != null) {
                message = 'Barcode Scanned successfully';
                tableData.push({ no: 1, desc: "Barcode", value: data.Evolve_Milling_Barcode })
            } else {
                tableData.push({ no: 1, desc: "Barcode", value: data.Evolve_Milling_Barcode })
            }

            if (data.Evolve_Milling_Barcode != null && data.Evolve_Milling_Cycle_Start == 1) {
                message = 'Cycle Start';
                tableData.push({ no: 2, desc: "Cycle Start", value: data.Evolve_Milling_Cycle_Start })
            } else {
                tableData.push({ no: 2, desc: "Cycle Start", value: data.Evolve_Milling_Cycle_Start })
            }

            if (data.Evolve_Milling_Barcode != null && data.Evolve_Milling_Cycle_Finished == 1) {
                message = 'Cycle Stop';
                tableData.push({ no: 3, desc: "Cycle Stop", value: data.Evolve_Milling_Cycle_Finished })
            } else {
                tableData.push({ no: 3, desc: "Cycle Stop", value: data.Evolve_Milling_Cycle_Finished })
            }

            if (data.Evolve_Milling_Barcode != null && data.Evolve_Milling_Cycle_Part_OK == 1) {
                message = 'Part Ok';
                tableData.push({ no: 4, desc: "Part Ok", value: data.Evolve_Milling_Cycle_Part_OK })
            } else {
                tableData.push({ no: 4, desc: "Part Ok", value: data.Evolve_Milling_Cycle_Part_OK })
            }

            if (data.Evolve_Milling_Barcode != null && data.Evolve_Milling_Cycle_Part_Not_OK == 1) {
                message = 'Part Not Ok';
                tableData.push({ no: 5, desc: "Part Not Ok", value: data.Evolve_Milling_Cycle_Part_Not_OK })
            } else {
                tableData.push({ no: 5, desc: "Part Not Ok", value: data.Evolve_Milling_Cycle_Part_Not_OK })
            }

            if (data.Evolve_Milling_Barcode != null && (data.Evolve_Milling_Cycle_Part_OK == 1 || data.Evolve_Milling_Cycle_Part_Not_OK == 1) && data.Evolve_Milling_Cycle_Finished == 1) {
                message = 'Part Completed';
            }


            if (data.Evolve_Milling_Barcode != null && Evolve.Milling.EvolveInvalid_Barcode == true) {
                message = 'Barcode Invalid';
                tableData = [];
                tableData.push({ no: 6, desc: "Barcode Invalid", value: 'Barcode Invalid' })
            }


            await Evolve.Io.emit('yfaiMillingMessage', {
                message: message,
                barcode: data.Evolve_Milling_Barcode,
                data: tableData,
                itemData: {
                    'EvolveItem_Code': Evolve.Milling.EvolveItem_Code,
                    'EvolveItem_Desc': Evolve.Milling.EvolveItem_Desc,
                    'EvolveItem_CustPart': Evolve.Milling.EvolveItem_CustPart,
                    'EvolveInvalid_Barcode': Evolve.Milling.EvolveInvalid_Barcode
                }
            });


            if ((data.Evolve_Milling_Cycle_Part_OK == 1 || data.Evolve_Milling_Cycle_Part_Not_OK == 1) && data.Evolve_Milling_Cycle_Finished == 1) {

                // Save into DB.
                if (Evolve.Milling.EvolveInvalid_Barcode == false) {
                    let responce = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.saveAndUpdteMillingData(data);
                    if (responce instanceof Error || responce.rowsAffected < 1) {
                        console.log("Error in milling Data....................................")
                    }
                }

            }
            return {
                status: 'success',
                result: null,
                message: 'Test Successfully Register!'
            }
        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
        }
    },

    reciveVibrationData: async function (data) {
        try {

            data.K3220_077_K3220_077_K3220_Barcode_VALUE = data.K3220_077_K3220_077_K3220_Barcode_VALUE.replace(/\s/g, '')


            let id = data.id;
            let ms = data.K3220_077_K3220_077_Machine_Start_VALUE;
            let cs = data.K3220_077_K3220_077_Cycle_Start_VALUE;
            let pok = data.K3220_077_K3220_077_Part_Ok_VALUE;
            let pnok = data.K3220_077_K3220_077_Part_NOK_VALUE;
            let cstp = data.K3220_077_K3220_077_Cycle_Stop_VALUE;
            let barcode = data.K3220_077_K3220_077_K3220_Barcode_VALUE;
            let mah = data.K3220_077_K3220_077_Machine_at_Home_VALUE;


            // console.log("##################################LATEST########################################################3")
            // console.log("ID ::::::::::::::::::::::::::::::::::::", id)
            // console.log("K3220_077_K3220_077_K3220_Barcode_VALUE ::", barcode)
            // console.log("K3220_077_K3220_077_Machine_Start_VALUE ::", ms)
            // console.log("K3220_077_K3220_077_Cycle_Start_VALUE ::", cs)
            // console.log("K3220_077_K3220_077_Part_Ok_VALUE ::", pok)
            // console.log("K3220_077_K3220_077_Part_NOK_VALUE ::", pnok)
            // console.log("K3220_077_K3220_077_Cycle_Stop_VALUE ::", cstp)
            // console.log("K3220_077_K3220_077_Machine_at_Home_VALUE ::", mah)
            // console.log("##########################################################################################3")




            if (barcode != null) {
                let responce = await Evolve.App.Services.SmartFactory.EsmartFactoryServices.insertUpdateVibrationData(data);
                if (responce instanceof Error) {
                    console.log("Error in Vibration data ::", responce.parameters) // Print All Paramiter
                }

                // Evolve.Vibration = data;
                let message = '-';

                // create Array for Result
                let tableData = [];


                // console.log("##########################################################################################3")
                // console.log("ID ::::::::::::::::::::::::::::::::::::", id)
                // console.log("K3220_077_K3220_077_K3220_Barcode_VALUE ::", barcode)
                // console.log("K3220_077_K3220_077_Machine_Start_VALUE ::", ms)
                // console.log("K3220_077_K3220_077_Cycle_Start_VALUE ::", cs)
                // console.log("K3220_077_K3220_077_Part_Ok_VALUE ::", pok)
                // console.log("K3220_077_K3220_077_Part_NOK_VALUE ::", pnok)
                // console.log("K3220_077_K3220_077_Cycle_Stop_VALUE ::", cstp)
                // console.log("K3220_077_K3220_077_Machine_at_Home_VALUE ::", mah)
                // console.log("##########################################################################################3")




                if (barcode != null && ms == 1 && Evolve.vibrationMessageStatus.step <= 1) {
                    Evolve.vibrationMessageStatus.step = 2;
                    Evolve.vibrationMessageStatus.partOk = '-';
                }
                if (barcode != null && cs == 1 && Evolve.vibrationMessageStatus.step <= 2) {
                    Evolve.vibrationMessageStatus.step = 3;
                    Evolve.vibrationMessageStatus.partOk = '-';
                }

                if (barcode != null && pok == 1 && Evolve.vibrationMessageStatus.step <= 3) {
                    Evolve.vibrationMessageStatus.partOk = true;
                    Evolve.vibrationMessageStatus.pnok = false;
                    Evolve.vibrationMessageStatus.step = 4;
                }

                if (barcode != null && pnok == 1 && Evolve.vibrationMessageStatus.step <= 4) {
                    Evolve.vibrationMessageStatus.pnok = false;
                    Evolve.vibrationMessageStatus.partOk = true;
                    Evolve.vibrationMessageStatus.step = 5;
                }

                if (barcode != null && cstp == 1 && Evolve.vibrationMessageStatus.step <= 5 && mah != 2) {
                    Evolve.vibrationMessageStatus.step = 6;
                }

                if (barcode != null && mah == 2 && ms == 0 && Evolve.vibrationMessageStatus.step <= 6 && Evolve.vibrationMessageStatus.step >= 2) { // Evolve.vibrationMessageStatus.step <= 6 ADD aFTER tEST
                    Evolve.vibrationMessageStatus.step = 7;
                }

                if (Evolve.vibrationMessageStatus == 1) {
                    message = 'Barcode Scanned successfully';
                }
                if (Evolve.vibrationMessageStatus.step == 2) {
                    message = 'Machine Start';
                }
                if (Evolve.vibrationMessageStatus.step == 3) {
                    message = 'Cycle Start';
                }
                if (Evolve.vibrationMessageStatus.step == 4) {
                    message = 'Part Ok';
                }
                if (Evolve.vibrationMessageStatus.step == 5) {
                    message = 'Part Not Ok';
                }
                if (Evolve.vibrationMessageStatus.step == 6) {
                    message = 'Cycle Stop';
                }

                if (Evolve.vibrationMessageStatus.step == 7) {
                    message = 'Part Completed';
                }

                tableData.push({ no: 1, desc: "Barcode", value: (barcode != null) ? barcode : '-' })
                tableData.push({ no: 2, desc: "Machine Start", value: (barcode != null && Evolve.vibrationMessageStatus.step >= 2) ? true : '' })
                tableData.push({ no: 3, desc: "Cycle Start", value: (barcode != null && Evolve.vibrationMessageStatus.step >= 3) ? true : '' })
                tableData.push({ no: 4, desc: "Part Ok", value: (barcode != null && (Evolve.vibrationMessageStatus.partOk == true)) ? true : '' })
                tableData.push({ no: 5, desc: "Part Not Ok", value: (barcode != null && (Evolve.vibrationMessageStatus.partOk == false)) ? true : '' })
                //tableData.push({ no : 5, desc : "Part Not Ok", value :(barcode != null && (Evolve.vibrationMessageStatus.pnok == true))? true : '' })
                tableData.push({ no: 6, desc: "Cycle Stop", value: (barcode != null && Evolve.vibrationMessageStatus.step >= 4) ? true : '' })


                //    console.log("Evolve.vibrationMessageStatus.step >>>>>>>>>>>>>.", Evolve.vibrationMessageStatus)
                //    console.log("message >>>>>>>>>>>>>.", message)
                //    console.log("tableData >>>>>>>>>>>>>.", tableData)


                await Evolve.Io.emit('yfaiVibrationMessage', {
                    message: message,
                    barcode: barcode,
                    data: tableData
                });


            }
            return {
                status: 'success',
                result: null,
                message: 'Test Successfully Register!'
            }
        } catch (error) {
            Evolve.Log.info('Error in filter Request Data : ' + error);
        }
    },

    sleep: async function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    getEvolvePrinterTaskReceiveStatus: async function (data) {
        try {
            let getEvolvePrinterTaskReceiveStatus = await Evolve.App.Services.Evolve.printProcess.SrvList.getEvolvePrinterTaskReceiveStatus(data);
            if (getEvolvePrinterTaskReceiveStatus instanceof Error || getEvolvePrinterTaskReceiveStatus.rowsAffected <= 0) {

            } else {
                // let obj = {
                //     statusCode: 200,
                //     status: "success",
                //     message: "Task Receive Status Updated Successfully",
                //     result: data.EvolvePrintProcess_ID
                // }
                Evolve.Io.emit("EvolvePrinterTaskReceiveAck", data.EvolvePrintProcess_ID)
            }
        } catch (error) {
            Evolve.Log.info('Error in Get Printer Task Receive Update : ' + error.message);
        }
    },

    // getEvolvePrinterTaskStatus: async function (data) {
    //     try {
    //         console.log("getEvolvePrinterTaskStatus>>>>>",data);
    //         let checkLabelStatus = await Evolve.App.Services.Evolve.printProcess.SrvList.checkLabelStatus(data.EvolvePrintProcess_ID)
    //         if (checkLabelStatus.recordset[0].EvolvePrintHistory_ID == null) {
    //             let deleteRecordInPrintProcess = await Evolve.App.Services.Evolve.printProcess.SrvList.deleteRecordInPrintProcess(data.EvolvePrintProcess_ID);
    //             if (deleteRecordInPrintProcess instanceof Error || deleteRecordInPrintProcess.rowsAffected <= 0) {

    //             } else {
    //                 // let obj = {
    //                 //     statusCode: 200,
    //                 //     status: "success",
    //                 //     message: "Task Status Updated Successfully",
    //                 //     result: data.EvolvePrintProcess_ID
    //                 // }
    //                 Evolve.Io.emit("EvolvePrinterTaskAck", data.EvolvePrintProcess_ID)
    //             }
    //         } else {
    //             if (data.IsPrinted == true) {
    //                 let getPrintProcessDetail = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessDetail(data.EvolvePrintProcess_ID);
    //                 if (getPrintProcessDetail instanceof Error || getPrintProcessDetail.rowsAffected <= 0) {

    //                 } else {
    //                     let checkStatusInPrintQueue = await Evolve.App.Services.Evolve.printProcess.SrvList.checkStatusInPrintQueue(getPrintProcessDetail.recordset[0].EvolvePrintHistory_ID);
    //                     if (checkStatusInPrintQueue instanceof Error || checkStatusInPrintQueue.rowsAffected <= 0) {

    //                     } else {
    //                         if (checkStatusInPrintQueue.recordset[0].EvolvePrintHistory_Flag == false) {
    //                             let updateStatusInPrintQueue = await Evolve.App.Services.Evolve.printProcess.SrvList.updateStatusInPrintQueue(getPrintProcessDetail.recordset[0].EvolvePrintHistory_ID);
    //                             if (updateStatusInPrintQueue instanceof Error || updateStatusInPrintQueue.rowsAffected <= 0) {

    //                             } else {
    //                                 data.EvolvePrintProcess_ZplCode = getPrintProcessDetail.recordset[0].EvolvePrintProcess_ZplCode;
    //                                 data.EvolvePrintHistory_ID = getPrintProcessDetail.recordset[0].EvolvePrintHistory_ID;
    //                                 let addRecordInPrintHistory = await Evolve.App.Services.Evolve.printProcess.SrvList.addRecordInPrintHistory(data);
    //                                 if (addRecordInPrintHistory instanceof Error || addRecordInPrintHistory.rowsAffected <= 0) {

    //                                 } else {
    //                                     let deleteRecordInPrintProcess = await Evolve.App.Services.Evolve.printProcess.SrvList.deleteRecordInPrintProcess(data.EvolvePrintProcess_ID);
    //                                     if (deleteRecordInPrintProcess instanceof Error || deleteRecordInPrintProcess.rowsAffected <= 0) {

    //                                     } else {
    //                                         // let obj = {
    //                                         //     statusCode: 200,
    //                                         //     status: "success",
    //                                         //     message: "Task Status Updated Successfully",
    //                                         //     result: data.EvolvePrintProcess_ID
    //                                         // }
    //                                         Evolve.Io.emit("EvolvePrinterTaskAck", data.EvolvePrintProcess_ID)
    //                                     }
    //                                 }
    //                             }
    //                         } else {
    //                             let deleteRecordInPrintProcess = await Evolve.App.Services.Evolve.printProcess.SrvList.deleteRecordInPrintProcess(data.EvolvePrintProcess_ID);
    //                             if (deleteRecordInPrintProcess instanceof Error || deleteRecordInPrintProcess.rowsAffected <= 0) {

    //                             } else {
    //                                 // let obj = {
    //                                 //     statusCode: 200,
    //                                 //     status: "success",
    //                                 //     message: "Task Status Updated Successfully",
    //                                 //     result: data.EvolvePrintProcess_ID
    //                                 // }
    //                                 Evolve.Io.emit("EvolvePrinterTaskAck", data.EvolvePrintProcess_ID)
    //                             }
    //                         }

    //                     }
    //                 }
    //             } else {
    //                 console.log('false called==============>');
    //                 let getEvolvePrinterTaskStatus = await Evolve.App.Services.Evolve.printProcess.SrvList.getEvolvePrinterTaskStatus(data);
    //                 if (getEvolvePrinterTaskStatus instanceof Error || getEvolvePrinterTaskStatus.rowsAffected <= 0) {

    //                 } else {
    //                     // let obj = {
    //                     //     statusCode: 200,
    //                     //     status: "success",
    //                     //     message: "Task Status Updated Successfully",
    //                     //     result: data.EvolvePrintProcess_ID
    //                     // }
    //                     Evolve.Io.emit("EvolvePrinterTaskAck", data.EvolvePrintProcess_ID)
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         Evolve.Log.error('Error in Get Printer Task Update : ' + error.message);
    //     }
    // },

    getPrinterList: async function () {
        try {
            let getPrinterList = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrinterList();
            if (getPrinterList instanceof Error || getPrinterList.rowsAffected <= 0) {
                // let obj = {
                //     statusCode: 400,
                //     status: "fail",
                //     message: "No PrinterList Available",
                //     result: null
                // }
                // Evolve.Io.emit("EvolvePrinterList", obj)
                setTimeout(function () {
                    Evolve.Server.Controllers.SocketController.getPrinterList()
                }, 5000);
            } else {
                // let obj = {
                //     statusCode: 200,
                //     status: "success",
                //     message: "Printer List !",
                //     result: getPrinterList.recordset
                // }
                Evolve.Io.emit("EvolvePrinterList", getPrinterList.recordset)

                setTimeout(function () {
                    Evolve.Server.Controllers.SocketController.getPrinterList()
                }, 10000);
            }
        } catch (error) {
            Evolve.Log.info('Error in Get Printer Task : ' + error.message);
            setTimeout(function () {
                Evolve.Server.Controllers.SocketController.getPrinterList()
            }, 5000);
        }
    },

    getPrinterStatus: async function (data) {
        try {
            let updatePrinterStatus = await Evolve.App.Services.Evolve.printProcess.SrvList.updatePrinterStatus(data);
            if (updatePrinterStatus instanceof Error || updatePrinterStatus.rowsAffected <= 0) {

            } else {
                // let obj = {
                //     statusCode: 200,
                //     status: "success",
                //     message: "Printer Status Updated Successfully",
                //     result: data.EvolvePrinterID_ID
                // }
                if (data.EvolvePrinter_status == false || data.EvolvePrinter_status == 0) {
                    let updatePrintTaskStatus = await Evolve.App.Services.Evolve.printProcess.SrvList.updatePrintTaskStatus(data.EvolvePrinter_ID);
                }
                Evolve.Io.emit("EvolvePrinterStatusAck", data.EvolvePrinterID_ID)
            }
        } catch (error) {
            Evolve.Log.info('Error in Get Printer Status Update : ' + error.message);
        }
    },

    getEvolvePrinterTask: async function (doProcess) {
        console.log("############################### getEvolvePrinterTask ###############################");
        if (functionCalled == false) {
            functionCalled = true;
            try {
                let getPrinterTask = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrinterTask();
                if (getPrinterTask instanceof Error || getPrinterTask.rowsAffected <= 0) {
                    console.log("getPrinterTask>>>>>>>>", getPrinterTask);
                    functionCalled = false;
                    setTimeout(function () {
                        Evolve.Server.Controllers.SocketController.getEvolvePrinterTask(true)
                    }, 5000);
                } else {
                    await Evolve.Io.emit("EvolvePrinterTask", getPrinterTask.recordset[0]); // Emit Task to Print JS APP
                    functionCalled = false;
                    timerObj = setTimeout(async function () { // Wait for 10 Sec. if 10 sec no responce come for APP then set record in Error Statge
                        let errorData = {
                            EvolvePrintProcess_ID: getPrinterTask.recordset[0].EvolvePrintProcess_ID,
                            EvolvePrintProcess_ErrorMessage: 'DID NOT GET REPLAY FROM PRINTER',
                            EvolvePrintProcess_ErrorCode: 2
                        }
                        await Evolve.App.Services.Evolve.printProcess.SrvList.updateEvolvePrinterTaskErrorStatus(errorData);
                        Evolve.Server.Controllers.SocketController.getEvolvePrinterTask(true);
                    }, 10000);
                }
            } catch (error) {
                Evolve.Log.info('Error in Get Printer Task : ' + error.message);
                setTimeout(function () {
                    Evolve.Server.Controllers.SocketController.getEvolvePrinterTask(true)
                }, 5000);
            }
        }
    },

    getEvolvePrinterTaskStatus: async function (data) {
        console.log("############################### getEvolvePrinterTaskStatus ###############################");
        try {
            console.log("getEvolvePrinterTaskStatus>>>>>", data);
            let getPrintProcessDetail = await Evolve.App.Services.Evolve.printProcess.SrvList.getPrintProcessDetail(data.EvolvePrintProcess_ID);
            if (getPrintProcessDetail instanceof Error || getPrintProcessDetail.rowsAffected <= 0) {
                // Do Nothing Here
            } else {
                if (data.IsPrinted == true) {
                    if (getPrintProcessDetail.recordset[0].EvolvePrintHistory_ID == null || getPrintProcessDetail.recordset[0].EvolvePrintHistory_ID == "") {
                        // Save in History
                        let addRecordInPrintHistory = await Evolve.App.Services.Evolve.printProcess.SrvList.addRecordInPrintHistory(getPrintProcessDetail.recordset[0]);
                        let printProcessDetails = await Evolve.App.Services.Evolve.printProcess.SrvList.getprintProcessDetailsTabel(getPrintProcessDetail.recordset[0].EvolvePrintProcess_ID);
                        if(printProcessDetails instanceof Error || printProcessDetails.rowsAffected < 1){
                            // Do Nothing
                            console.log("Error In Add Record In PrintHistory");
                        }else{
                            let insertString = "";
                            let datetime = await Evolve.App.Controllers.Unit.unitControllers.getDateTime();
                            for(let i = 0 ; i <printProcessDetails.recordset.length ; i++){
                                insertString = insertString + `, (${addRecordInPrintHistory.recordset[0].inserted_id} , 0 , '${printProcessDetails.recordset[i].EvolvePrintProcessDetails_Key}' , '${printProcessDetails.recordset[i].EvolvePrintProcessDetails_Value}')`
                            }
                            let addRecordInPrintHistoryDetails = await Evolve.App.Services.Evolve.printProcess.SrvList.addRecordInPrintHistoryDetails(insertString.substring(1));
                            if(addRecordInPrintHistoryDetails instanceof Error || addRecordInPrintHistoryDetails.rowsAffected < 1){
                                console.log("Error In Add Record In PrintHistoryDetails");
                            }
                        }
                    }
                    //Now Remove from Process
                    await Evolve.App.Services.Evolve.printProcess.SrvList.deleteRecordInPrintProcess(data.EvolvePrintProcess_ID);
                } else {
                    // Save As Error
                    await Evolve.App.Services.Evolve.printProcess.SrvList.updateEvolvePrinterTaskErrorStatus(data);
                }
            }
            Evolve.Io.emit("EvolvePrinterTaskAck", data.EvolvePrintProcess_ID)

            clearTimeout(timerObj);
            functionCalled = false;
            Evolve.Server.Controllers.SocketController.getEvolvePrinterTask(true);

        } catch (error) {
            Evolve.Log.error('Error in Get Printer Task Update : ' + error.message);

        }
    },
}