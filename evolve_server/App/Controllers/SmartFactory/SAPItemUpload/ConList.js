'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemsList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.SmartFactory.SAPItemUpload.SrvList.getItemListCount(search);
            let items = await Evolve.App.Services.SmartFactory.SAPItemUpload.SrvList.getItemsList(start, length, search);
            if (items instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get item list !",
                    result: items.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: items.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: resObj
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