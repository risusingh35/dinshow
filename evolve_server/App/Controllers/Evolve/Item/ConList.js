'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemsList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.Item.SrvList.getItemGroupListCount(search);
            let items = await Evolve.App.Services.Evolve.Item.SrvList.getItemsList(start , length, search);
            if (items instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
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

    deleteItem: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Item.SrvList.deleteItem(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Delete Item !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR0256: Error while deleting Item "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
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
                        let itemArray = await Evolve.Csv().fromFile('./csv/items/' + fileName);
                        let item_errorStatus = false;
                        if (item_errorStatus == false) {

                            for (let i = 0; i < itemArray.length; i++) {
                                if (itemArray[i]['Item Code'] == undefined || itemArray[i]['Description'] == undefined || itemArray[i]['Item Type'] == undefined || itemArray[i]['Load Capacity'] == undefined || itemArray[i]['Unit of Measure'] == undefined || itemArray[i]['Cust Part'] == undefined || itemArray[i]['Inventory Trackable'] == undefined || itemArray[i]['Is Scan'] == undefined || itemArray[i]['Item Code'] == '' || itemArray[i]['Description'] == '' || itemArray[i]['Item Type'] == '') {

                                    item_errorStatus = true;
                                }
                            }
                        }
                        if (item_errorStatus == false) {
                            for (let i = 0; i < itemArray.length; i++) {
                                let checkItemExits = await Evolve.App.Services.Evolve.Item.SrvList.checkItemExist(itemArray[i]['Item Code']);
                                if (checkItemExits.rowsAffected > 0) {
                                    itemArray[i].EvolveItem_ID = checkItemExits.recordset[0].EvolveItem_ID;
                                    let updateItem = await Evolve.App.Services.Evolve.Item.SrvList.updateItem(itemArray[i]);
                                    if (updateItem.rowsAffected <= 0) {
                                        item_errorStatus = true;
                                        Evolve.Log.error(updateItem.message);
                                    }
                                }
                                else {
                                    let addItem = await Evolve.App.Services.Evolve.Item.SrvList.addItem(itemArray[i]);
                                    if (addItem.rowsAffected <= 0) {
                                        item_errorStatus = true;
                                        Evolve.Log.error(addItem.message);
                                    }
                                }
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

    uploadFileUpdateTolerance: async function (req, res) {
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
                        console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let itemArray = await Evolve.Csv().fromFile('./csv/items/' + fileName);
                        let finalResult = [];

                            for (let i = 0; i < itemArray.length; i++) {
                                let checkItemExits = await Evolve.App.Services.Evolve.Item.SrvList.checkItemExist(itemArray[i]['Item Code']);
                                if (checkItemExits instanceof Error || checkItemExits.rowsAffected < 1) {
                                    let obj = {
                                        statusCode: 400,
                                        message: "Item Not Found For Item Code "+itemArray[i]['Item Code'],
                                    };
                                    finalResult.push(obj);
                                }
                                else{
                                    let EvolveItem_ID = checkItemExits.recordset[0].EvolveItem_ID;
                                    let tolerence = itemArray[i]['Tolerance']
                                    let updateItemTolerance = await Evolve.App.Services.Evolve.Item.SrvList.updateItemTolerance(EvolveItem_ID, tolerence);
                                    if (updateItemTolerance instanceof Error || updateItemTolerance.rowsAffected < 1) {
                                        let obj = {
                                            statusCode: 400,
                                            message: "Error In Update Item "+itemArray[i]['Item Code'],
                                        };
                                        finalResult.push(obj);
                                    }
                                    else{
                                        let obj = {
                                            statusCode: 200,
                                            message: itemArray[i]['Item Code']+" Item Update Successfully",
                                        };
                                        finalResult.push(obj);
                                    }
                                }                                
                            }
                            let finalObj = {
                                statusCode: 200,
                                status : "SUCCESS",
                                message: "Item Update Successfully",
                                result : finalResult
                            }
                            res.send(finalObj);
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR0256: Error while uploading csv items "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0256: Error while uploading csv items "+error.message, result: null };
            res.send(obj);
        }
    },

    getItemsDTList: async function (req, res) {
        try {
            console.log("Body : ", req.body)


            let itemsCounts = await Evolve.App.Services.Evolve.Item.SrvList.getItemsDTCount(req.body);
            if (itemsCounts instanceof Error || itemsCounts.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Record Found in item list !", result: items.message };
                res.send(obj);
            } else {
                let items = await Evolve.App.Services.Evolve.Item.SrvList.getItemsDTList(req.body);
                if (items instanceof Error) {
                    let obj = { statusCode: 400, status: "fail", message: "Error on  item list !", result: items.message };
                    res.send(obj);
                } else {

                    let resObj = {
                        noOfRecord: itemsCounts.recordset[0].count,
                        records: items.recordset
                    }

                    let obj = { statusCode: 200, status: "success", message: "Item list gotted successfully ", result: resObj };
                    res.send(obj);
                }

            }



        } catch (error) {
            Evolve.Log.error(" EERR0256: Error while getting Items DTList "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0256: Error while getting Items DTList "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}