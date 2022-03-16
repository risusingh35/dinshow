'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemsList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.Item.SrvListV1.getItemListCount(search);
            let items = await Evolve.App.Services.Evolve.Item.SrvListV1.getItemsList(start, length, search);

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
            Evolve.Log.error(" EERR32544: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32544: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getModelList: async function (req, res) {
        try {
            let modelList = await Evolve.App.Services.Evolve.Item.SrvListV1.getModelList();

            if (modelList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
                    result: modelList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: modelList.recordset
                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32545: Error while getting model list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32545: Error while getting model list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnitList: async function (req, res) {
        try {
            let unitList = await Evolve.App.Services.Evolve.Item.SrvListV1.getUnitList();

            if (unitList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
                    result: unitList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: unitList.recordset
                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32546: Error while getting unit list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32546: Error while getting unit list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLabelFormateList: async function (req, res) {
        try {
            let labelFormateList = await Evolve.App.Services.Evolve.Item.SrvListV1.getLabelFormateList();

            if (labelFormateList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on  item list !",
                    result: labelFormateList.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: labelFormateList.recordset
                }
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32547: Error while getting label formate list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32547: Error while getting label formate list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addtItem: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let addtItem = await Evolve.App.Services.Evolve.Item.SrvListV1.addtItem(req.body);

            if (addtItem instanceof Error || addtItem.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in add item",
                    result: addtItem.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item added successfully",
                    result: addtItem.recordset
                }
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32548: Error while add item " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32548: Error while add item " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editItem: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let editItem = await Evolve.App.Services.Evolve.Item.SrvListV1.editItem(req.body);

            if (editItem instanceof Error || editItem.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in edit item !",
                    result: editItem.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item edited successfully",
                    result: editItem.recordset
                }
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32549: Error while edit item " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32549: Error while edit item " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteItem: async function (req, res) {
        try {
            let deleteItem = await Evolve.App.Services.Evolve.Item.SrvListV1.deleteItem(req.body);

            if (deleteItem instanceof Error || deleteItem.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in delete item !",
                    result: deleteItem.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Item list",
                    result: null
                }
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR32550: Error while delete item " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32550: Error while delete item " + error.message,
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
                let fileName = 'itemMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/items/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let itemListArray = await Evolve.Csv().fromFile('./csv/items/' + fileName);
                        let errorMessage = 'Error While Upload Item!!';
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < itemListArray.length; i++) {
                                if (itemListArray[i]['ITEM NAME'] == undefined || itemListArray[i]['ITEM CODE'] == undefined || itemListArray[i]['ADIENT ITEM DESCRIPTION'] == undefined || itemListArray[i]['UNIT CODE'] == undefined || itemListArray[i]['CUST ITEM CODE'] == undefined || itemListArray[i]['MODEL CODE'] == undefined || itemListArray[i]['MODEL NAME'] == undefined || itemListArray[i]['MODEL DESC'] == undefined || itemListArray[i]['MODEL ON/OFF'] == undefined || itemListArray[i]['MODEL SR WIDTH'] == undefined ||
                                    itemListArray[i]['ITEM NAME'] == '' || itemListArray[i]['ITEM CODE'] == '' || itemListArray[i]['ADIENT ITEM DESCRIPTION'] == '' || itemListArray[i]['UNIT CODE'] == '' || itemListArray[i]['CUST ITEM CODE'] == '' || itemListArray[i]['MODEL CODE'] == '' || itemListArray[i]['MODEL NAME'] == '' || itemListArray[i]['MODEL DESC'] == '' || itemListArray[i]['MODEL ON/OFF'] == '' || itemListArray[i]['MODEL SR WIDTH'] == '') {
                                    errorStatus = true;
                                    errorMessage = 'Error In Upload ItemList !! File Is Not Proper !! '
                                }
                            }
                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < itemListArray.length; i++) {
                                if (errorStatus == false) {
                                    let checkItemCodeExists = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemCodeExists(itemListArray[i]['ITEM CODE']);
                                    if (checkItemCodeExists instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkItemCodeExists.message);
                                    }
                                    else if (checkItemCodeExists.rowsAffected > 0) {
                                        itemListArray[i].EvolveItem_ID = checkItemCodeExists.recordset[0].EvolveItem_ID;
                                        let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListV1.getUnitId(itemListArray[i]['UNIT CODE'])
                                        if (getUnitId.rowsAffected <= 0 || getUnitId instanceof Error) {
                                            errorStatus = true;
                                            errorMessage = `Error In Upload ItemList !! Unit "${itemListArray[i]['UNIT CODE']}" is Not Found`
                                            Evolve.Log.error(getUnitId.message);
                                        }
                                        else {
                                            itemListArray[i].EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID

                                            let updateItemCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.updateItemCsv(itemListArray[i], req.body);
                                            if (updateItemCsv.rowsAffected <= 0 || updateItemCsv instanceof Error) {
                                                errorStatus = true;
                                                errorMessage = `Error While Update Item ${itemListArray[i]['ITEM NAME']} !!`
                                                Evolve.Log.error(updateItemCsv.message);
                                            }

                                            let checkModelCode = await Evolve.App.Services.Evolve.Item.SrvListV1.checkModelCode(itemListArray[i]['MODEL CODE']);
                                            if (checkModelCode.rowsAffected > 0) {
                                                itemListArray[i].EvolveModel_ID = checkModelCode.recordset[0].EvolveModel_ID;
                                                let updateModelCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.updateModelCsv(itemListArray[i], req.body);
                                                if (updateModelCsv.rowsAffected <= 0 || updateModelCsv instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateModelCsv.message);
                                                }
                                            }
                                            else {
                                                let addModelCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.addModelCsv(itemListArray[i], req.body);
                                                if (addModelCsv.rowsAffected <= 0 || addModelCsv instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addModelCsv.message);
                                                }
                                                else {
                                                    let checkModelCode = await Evolve.App.Services.Evolve.Item.SrvListV1.checkModelCode(itemListArray[i]['MODEL CODE']);
                                                    itemListArray[i].EvolveModel_ID = checkModelCode.recordset[0].EvolveModel_ID;
                                                }
                                            }

                                            let checkSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.checkSerialPrefix(itemListArray[i].EvolveModel_ID);
                                            if (checkSerialPrefix.rowsAffected > 0) {
                                                let updateSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.updateSerialPrefix(itemListArray[i], req.body);
                                                if (updateSerialPrefix.rowsAffected <= 0 || updateSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateSerialPrefix.message);
                                                }
                                            }

                                            else {
                                                let addSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.addSerialPrefix(itemListArray[i], req.body);
                                                if (addSerialPrefix.rowsAffected <= 0 || addSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addSerialPrefix.message);
                                                }
                                            }

                                            let checkItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemToModel(itemListArray[i]);
                                            if (checkItemToModel.rowsAffected > 0) {
                                                itemListArray[i].EvolveItemToModel_ID = checkItemToModel.recordset[0].EvolveItemToModel_ID;
                                                let UpdateItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.UpdateItemToModel(itemListArray[i], req.body);
                                                if (UpdateItemToModel.rowsAffected <= 0 || UpdateItemToModel instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(UpdateItemToModel.message);
                                                }
                                            }
                                            else {
                                                let addItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.addItemToModel(itemListArray[i], req.body);
                                                if (addItemToModel.rowsAffected <= 0 || addItemToModel instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addItemToModel.message);
                                                }
                                            }

                                        }
                                    }
                                    else {

                                        let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListV1.getUnitId(itemListArray[i]['UNIT CODE'])
                                        if (getUnitId.rowsAffected <= 0 || getUnitId instanceof Error) {
                                            errorStatus = true;
                                            errorMessage = `Error While Upload Item !! Unit "${itemListArray[i]['UNIT CODE']}" Not Found `
                                            Evolve.Log.error(getUnitId.message);
                                        }
                                        else {
                                            itemListArray[i].EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID

                                            let addItemCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.addItemCsv(itemListArray[i], req.body);
                                            if (addItemCsv.rowsAffected <= 0 || addItemCsv instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(addItemCsv.message);
                                            }
                                            else {
                                                let checkItemCodeExists = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemCodeExists(itemListArray[i]['ITEM CODE']);
                                                itemListArray[i].EvolveItem_ID = checkItemCodeExists.recordset[0].EvolveItem_ID;
                                            }

                                            let checkModelCode = await Evolve.App.Services.Evolve.Item.SrvListV1.checkModelCode(itemListArray[i]['MODEL CODE']);
                                            if (checkModelCode.rowsAffected > 0) {
                                                itemListArray[i].EvolveModel_ID = checkModelCode.recordset[0].EvolveModel_ID;
                                                let updateModelCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.updateModelCsv(itemListArray[i], req.body);
                                                if (updateModelCsv.rowsAffected <= 0 || updateModelCsv instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateModelCsv.message);
                                                }
                                            }
                                            else {
                                                let addModelCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.addModelCsv(itemListArray[i], req.body);
                                                if (addModelCsv.rowsAffected <= 0 || addModelCsv instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addModelCsv.message);

                                                }
                                                else {
                                                    let checkModelCode = await Evolve.App.Services.Evolve.Item.SrvListV1.checkModelCode(itemListArray[i]['MODEL CODE']);
                                                    itemListArray[i].EvolveModel_ID = checkModelCode.recordset[0].EvolveModel_ID;
                                                }
                                            }
                                            let checkSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.checkSerialPrefix(itemListArray[i].EvolveModel_ID);
                                            if (checkSerialPrefix.rowsAffected > 0) {
                                                let updateSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.updateSerialPrefix(itemListArray[i], req.body);
                                                if (updateSerialPrefix.rowsAffected <= 0 || updateSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateSerialPrefix.message);
                                                }
                                            }

                                            else {
                                                let addSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.addSerialPrefix(itemListArray[i], req.body);
                                                if (addSerialPrefix.rowsAffected <= 0 || addSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addSerialPrefix.message);
                                                }
                                            }

                                            let checkItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemToModel(itemListArray[i]);
                                            if (checkItemToModel.rowsAffected > 0) {
                                                itemListArray[i].EvolveItemToModel_ID = checkItemToModel.recordset[0].EvolveItemToModel_ID;
                                                let UpdateItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.UpdateItemToModel(itemListArray[i], req.body);
                                                if (UpdateItemToModel.rowsAffected <= 0 || UpdateItemToModel instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(UpdateItemToModel.message);
                                                }
                                            }
                                            else {
                                                let addItemToModel = await Evolve.App.Services.Evolve.Item.SrvListV1.addItemToModel(itemListArray[i], req.body);
                                                if (addItemToModel.rowsAffected <= 0 || addItemToModel instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addItemToModel.message);
                                                }
                                            }
                                        }


                                    }
                                }
                                else {
                                    errorStatus = true;
                                }

                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
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
            Evolve.Log.error(" EERR32551: Error while uploading csv Item " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR32551: Error while uploading csv Item ", result: null
            };
            res.send(obj);
        }
    },

    csvItemsV2Upload: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.csvFile) {
                let csv = req.files.csvFile;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'itemMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/items/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let itemListArray = await Evolve.Csv().fromFile('./csv/items/' + fileName);
                        let errorMessage = 'Error While Upload Item!!';
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < itemListArray.length; i++) {
                                if (itemListArray[i]['ITEM NAME'] == undefined || itemListArray[i]['ITEM CODE'] == undefined || itemListArray[i]['ADIENT ITEM DESCRIPTION'] == undefined || itemListArray[i]['UNIT CODE'] == undefined || itemListArray[i]['CUST ITEM CODE'] == undefined || itemListArray[i]['MODEL SR WIDTH'] == undefined ||
                                    itemListArray[i]['ITEM NAME'] == '' || itemListArray[i]['ITEM CODE'] == '' || itemListArray[i]['ADIENT ITEM DESCRIPTION'] == '' || itemListArray[i]['UNIT CODE'] == '' || itemListArray[i]['CUST ITEM CODE'] == '' || itemListArray[i]['MODEL SR WIDTH'] == '') {
                                    errorStatus = true;
                                    errorMessage = 'Error In Upload ItemList !! File Is Not Proper !! '
                                }
                            }
                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < itemListArray.length; i++) {
                                if (errorStatus == false) {
                                    let checkItemCodeExists = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemCodeExists(itemListArray[i]['ITEM CODE']);
                                    if (checkItemCodeExists instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkItemCodeExists.message);
                                    }
                                    else if (checkItemCodeExists.rowsAffected > 0) {
                                        itemListArray[i].EvolveItem_ID = checkItemCodeExists.recordset[0].EvolveItem_ID;
                                        let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListV1.getUnitId(itemListArray[i]['UNIT CODE'])
                                        if (getUnitId.rowsAffected <= 0 || getUnitId instanceof Error) {
                                            errorStatus = true;
                                            errorMessage = `Error In Upload ItemList !! Unit "${itemListArray[i]['UNIT CODE']}" is Not Found`
                                            Evolve.Log.error(getUnitId.message);
                                        }
                                        else {
                                            itemListArray[i].EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID

                                            let updateItemCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.updateItemCsv(itemListArray[i], req.body);
                                            if (updateItemCsv.rowsAffected <= 0 || updateItemCsv instanceof Error) {
                                                errorStatus = true;
                                                errorMessage = `Error While Update Item ${itemListArray[i]['ITEM NAME']} !!`
                                                Evolve.Log.error(updateItemCsv.message);
                                            }


                                            let checkSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.checkSerialPrefix(itemListArray[i].EvolveItem_ID);
                                            if (checkSerialPrefix.rowsAffected > 0) {
                                                let updateSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.updateSerialPrefixV2(itemListArray[i], req.body);
                                                if (updateSerialPrefix.rowsAffected <= 0 || updateSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateSerialPrefix.message);
                                                }
                                            }

                                            else {
                                                let addSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.addSerialPrefixV2(itemListArray[i], req.body);
                                                if (addSerialPrefix.rowsAffected <= 0 || addSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addSerialPrefix.message);
                                                }
                                            }
                                        }
                                    }
                                    else {

                                        let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListV1.getUnitId(itemListArray[i]['UNIT CODE'])
                                        if (getUnitId.rowsAffected <= 0 || getUnitId instanceof Error) {
                                            errorStatus = true;
                                            errorMessage = `Error While Upload Item !! Unit "${itemListArray[i]['UNIT CODE']}" Not Found `
                                            Evolve.Log.error(getUnitId.message);
                                        }
                                        else {
                                            itemListArray[i].EvolveUnit_ID = getUnitId.recordset[0].EvolveUnit_ID

                                            let addItemCsv = await Evolve.App.Services.Evolve.Item.SrvListV1.addItemCsv(itemListArray[i], req.body);
                                            if (addItemCsv.rowsAffected <= 0 || addItemCsv instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(addItemCsv.message);
                                            }
                                            else {
                                                let checkItemCodeExists = await Evolve.App.Services.Evolve.Item.SrvListV1.checkItemCodeExists(itemListArray[i]['ITEM CODE']);
                                                itemListArray[i].EvolveItem_ID = checkItemCodeExists.recordset[0].EvolveItem_ID;
                                            }
                                            let checkSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.checkSerialPrefix(itemListArray[i].EvolveModel_ID);
                                            if (checkSerialPrefix.rowsAffected > 0) {
                                                let updateSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.updateSerialPrefixV2(itemListArray[i], req.body);
                                                if (updateSerialPrefix.rowsAffected <= 0 || updateSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(updateSerialPrefix.message);
                                                }
                                            }

                                            else {
                                                let addSerialPrefix = await Evolve.App.Services.Evolve.Item.SrvListV1.addSerialPrefixV2(itemListArray[i], req.body);
                                                if (addSerialPrefix.rowsAffected <= 0 || addSerialPrefix instanceof Error) {
                                                    errorStatus = true;
                                                    Evolve.Log.error(addSerialPrefix.message);
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    errorStatus = true;
                                }

                            }

                        }
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
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
            Evolve.Log.error(" EERR32551: Error while uploading csv Item " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR32551: Error while uploading csv Item ", result: null
            };
            res.send(obj);
        }
    },



}