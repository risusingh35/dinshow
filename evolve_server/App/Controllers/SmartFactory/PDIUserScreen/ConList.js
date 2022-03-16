'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemList: async function (req, res) {
        try {
            let items = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.getItemList();
            if (items instanceof Error || items.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "item list Not Founds !",
                    result: items.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: items.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while getting Item list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Item list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },    
    getItemQty: async function (req, res) {
        try {
            let items = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.getItemQty(req.body);
            if (items instanceof Error || items.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Item Qty Not Found!",
                    result: items.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: items.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while getting Item list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Item list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    PrintBarcode: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
            if (get_barcode_details == 0) {
                Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                res.send(obj);
                // get_barcode_details = {}
            } else {
                let str = get_barcode_details.toString();
                let SerialNumberPrefix = str.slice(0, -3);
                let IncrementNo = str.slice(-3);
                
                let getItemCode = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.getItemCode(req.body);
                if (getItemCode instanceof Error || getItemCode.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Process Temp Seq Not Found !",
                        result: null
                    };
                    res.send(obj);
                } else {

                    let ItemCode = getItemCode.recordset[0].EvolveItem_Code;
                    let ItemDesc = getItemCode.recordset[0].EvolveItem_Desc;
                    req.body.EvolveProdOrdersDetail_NxtSeq = getItemCode.recordset[0].EvolveProcessTemp_Seq;
                    let newDate = new Date(); 
                    let month = newDate.getMonth() + 1;
                    if(month == 10){
                        month = "X";
                    }
                    if(month == 11){
                        month = "Y";
                    }
                    if(month == 12){
                        month = "Z";
                    }
                    console.log("month ===", month)
                    let year = newDate.getFullYear();
                    year = year.toString();
                    year = year.slice(-2);
                    console.log("year ===", year)

                    req.body.WorkOrderNo = req.body.Qty+ItemCode+month+year+IncrementNo;
                    console.log("req.body.WorkOrderNo====", req.body.WorkOrderNo)

                    let getPrinterID = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.getPrinterID(req.body);
                    if (getPrinterID instanceof Error || getPrinterID.rowsAffected < 1) {
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "ERROR On Get Printer!",
                            result: null
                        };
                        res.send(obj);
                    } else {
                        req.body.EvolvePrinter_ID = getPrinterID.recordset[0].EvolvePrinter_ID;
                    
                        let addProdOrders = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.addProdOrders(req.body);
                        if (addProdOrders instanceof Error || addProdOrders.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "ERROR On Add Prod Orders !",
                                result: addProdOrders.message
                            };
                            res.send(obj);
                        } else {
                        let addProdOrdersDetail = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.addProdOrdersDetail(req.body, addProdOrders.recordset[0]);
                        if (addProdOrdersDetail instanceof Error || addProdOrdersDetail.rowsAffected < 1) {
                            let obj = {
                                statusCode: 400,
                                status: "fail",
                                message: "ERROR On Add Prod Orders Details!",
                                result: null
                            };
                            res.send(obj);
                        } else {

                            
                                let newDate = new Date();
                                let date = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
                                let time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    
                                // req.body.EvolvePrintProcess_Data = "^XA^MD25^CFA,22^FO30,30^FDPart Code : "+ItemCode+
                                // "^FS^FO30,60^FDPart Name:"+ItemDesc+
                                // "^FS^FO30,90^FDDateTime : "+date+
                                // " | "+time+
                                // "^FS^FO30,120^FDQTY : "+req.body.Qty+
                                // "^FS^FO200,145^BY1^BCN,70,Y,N,N,D^FD"+req.body.WorkOrderNo+
                                // "^FS^XZ";

                                req.body.EvolvePrintProcess_Data = "^XA^MD25^CFA,22^FO5,30^FDPart Code : ^FS^FO155,30^FD"+ItemCode+
                                "^FS^FO5,60^FB350,2,L^FDPart Name: ^FS^FO150,60^FB300,2,L^FD" +ItemDesc+
                                "^FS^FO5,110^FDDateTime : "+date+" | "+time+
                                "^FS^FO5,140^FDQTY : "+req.body.Qty+
                                "^FS^FO20,160^BY1^BCN,50^FD" +req.body.WorkOrderNo+ "^FS^XZ";

                                let addPrinterProccess = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.addPrinterProccess(req.body);
                                if (addPrinterProccess instanceof Error || addPrinterProccess.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        status: "fail",
                                        message: "ERROR On add Printer Process!",
                                        result: null
                                    };
                                    res.send(obj);
                                } else {
                                    req.body.EvolvePrintProcess_ID = addPrinterProccess.recordset[0].inserted_id;
                                    req.body.EvolvePrintHistoryDetails_Key = 'PDI';
                                    req.body.EvolvePrintHistoryDetails_Value = req.body.WorkOrderNo;
                                    let addPrinterProcessDetails = await Evolve.App.Services.SmartFactory.PDIUserScreen.SrvList.addPrinterProcessDetails(req.body);
                                    if (addPrinterProcessDetails instanceof Error || addPrinterProcessDetails.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            status: "fail",
                                            message: "ERROR On add Printer Process Details!",
                                            result: null
                                        };
                                        res.send(obj);
                                    } else {
                                        let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
                                        res.send(obj);
                                    }
                                    
                                }

                            }


                           


                            // Evolve.Fs.writeFile(Evolve.Config.PDIUSERBARCODE+'/'+req.body.WorkOrderNo+'.txt',printerCode,function(err){
                            //     if(err){
                            //         let obj = { statusCode: 400, status: "fail", message: "Error In Print Barcode", result: null };
                            //         res.send(obj);
                            //     } else {
                            //         let obj = { statusCode: 200, status: "success", message: "Barcode Printed", result: null };
                            //         res.send(obj);
                            //     }
                            // });


                            // let obj = {
                            //     statusCode: 200,
                            //     status: "success",
                            //     message: "Data Add Successfully",
                            //     result: null
                            // };
                            // res.send(obj);
                        }
                    }
                }    
            }
        } catch (error) {
            Evolve.Log.error(" EERR0255: Error while Print Barcode "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while Print Barcode "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    csvItemsUpload: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'Item_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/items/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let itemArray = await Evolve.Csv({noheader: true,  headers: ['Item Code', 'Location', 'Description', 'BIN NO', 'Created Date', 'blank_space5', 'Invoice NO', 'DI NO', 'Invoice Qty', 'Packing Standard Qty', 'Vendor Code', 'Date', 'blank_space12', 'blank_space13', 'blank_space4', 'Vendor Name']}).fromFile('./csv/items/' + fileName);
                        let item_errorStatus = false;
                        // if (item_errorStatus == false) {

                        //     for (let i = 0; i < itemArray.length; i++) {
                        //         console.log("itemArray[i]========================",itemArray[i]);
                        //         if (itemArray[i]['Item Code'] == undefined || itemArray[i]['Location'] == undefined || itemArray[i]['Description'] == undefined || itemArray[i]['BIN NO'] == undefined || itemArray[i]['created_date'] == undefined || itemArray[i]['Unit of Measure'] == undefined || itemArray[i]['Cust Part'] == undefined || itemArray[i]['Inventory Trackable'] == undefined || itemArray[i]['Is Scan'] == undefined || itemArray[i]['Item Code'] == '' || itemArray[i]['Description'] == '' || itemArray[i]['Item Type'] == '') {
                        //             item_errorStatus = true;
                        //         }
                        //     }
                        // }
                        if (item_errorStatus == false) {
                            for (let i = 0; i < itemArray.length; i++) {
                                // let checkItemExits = await Evolve.App.Services.SmartFactory.ItemUpload.SrvList.checkItemExist(itemArray[i]['Item Code']);
                                // if (checkItemExits.rowsAffected > 0) {
                                //     itemArray[i].EvolveItem_ID = checkItemExits.recordset[0].EvolveItem_ID;
                                //     let updateItem = await Evolve.App.Services.SmartFactory.ItemUpload.SrvList.updateItem(itemArray[i]);
                                //     if (updateItem.rowsAffected <= 0) {
                                //         item_errorStatus = true;
                                //         Evolve.Log.error(updateItem.message);
                                //     }
                                // }
                                // else {
                                    let addItem = await Evolve.App.Services.SmartFactory.SAPItemUpload.SrvList.addItem(itemArray[i], req.body);
                                    if (addItem.rowsAffected <= 0) {
                                        item_errorStatus = true;
                                        Evolve.Log.error(addItem.message);
                                    }
                                // }
                            }

                        }
                        if (item_errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: 'Error while upload item !', result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Items uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR0256: Error while uploading csv items "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0256: Error while uploading csv items "+error.message, result: null };
            res.send(obj);
        }
    },

}