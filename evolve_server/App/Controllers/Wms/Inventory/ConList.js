'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    getInventoryList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = '';
            if (req.body.EvolveUnit_ID != null) {

                condition += " einv.EvolveUnit_ID = " + req.body.EvolveUnit_ID + " AND ";

            }
            if (req.body.EvolveItem_ID != null) {

                condition += " einv.EvolveItem_ID = " + req.body.EvolveItem_ID + " AND ";

            }
            // if(req.body.EvolveUnit_ID)
            let count = await Evolve.App.Services.Wms.Inventory.SrvList.getInventoryListCount(search, condition ,  req.EvolveUnit_ID);

            let result = await Evolve.App.Services.Wms.Inventory.SrvList.getInventoryList(start, length, search, condition ,  req.EvolveUnit_ID);


            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get inventory list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get inventory list!",
                    result: result.message
                };
                res.send(obj);
            } else {


                result.recordset = result.recordset.map(v => {

                    if (v.EvolveItem_ID == null || v.EvolveItem_ID == undefined || v.EvolveItem_ID == '') {

                        v.EvolveItem_Part = v.EvolveInventory_MemoItem;
                    }
                    return v
                })
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
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get inventory list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get inventory list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    onUploadInventryCsv: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'INventory_' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                csv.mv(Evolve.Config.WEBSHOPCSVPATH + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv({
                            trim: false,
                            ignoreEmpty: true,
                        }).fromFile(Evolve.Config.WEBSHOPCSVPATH + fileName);
                        let errorMessage = '';
                        for (let i = 0; i < csvDataArray.length; i++) {
                            if (csvDataArray[i]['Item Number'] == '' && csvDataArray[i]['Item Number'] == undefined && csvDataArray[i]['Item Number'] == null && csvDataArray[i]['Site'] == '' && csvDataArray[i]['Site'] == undefined && csvDataArray[i]['Site'] == null && csvDataArray[i]['Qty On Hand - Inv Mstr'] == '' && csvDataArray[i]['Qty On Hand - Inv Mstr'] == undefined && csvDataArray[i]['Qty On Hand - Inv Mstr'] == null && csvDataArray[i]['Location'] == '' && csvDataArray[i]['Location'] == undefined && csvDataArray[i]['Location'] == null && csvDataArray[i]['Lot/Serial'] == '' && csvDataArray[i]['Lot/Serial'] == undefined && csvDataArray[i]['Lot/Serial'] == null) {

                                errorMessage = 'Error In Upload Inventory !! File Is Not Proper !! '

                            }
                        }

                        if (errorMessage == '') {

                            for (let i = 0; i < csvDataArray.length; i++) {

                                if (errorMessage == '') {

                                    let checkLocation = await Evolve.App.Services.Wms.Inventory.SrvList.checkInventoryLocation(csvDataArray[i]['Location']);


                                    if (checkLocation instanceof Error) {

                                        errorMessage = 'Error While Check Location ' + csvDataArray[i]['Location'];

                                    } else if (checkLocation.rowsAffected < 1) {

                                        errorMessage = 'Location ' + csvDataArray[i]['Location'] + ' Not Found ';


                                    } else {

                                        let createdDate = null
                                        if (csvDataArray[i]['Created'] != '' && csvDataArray[i]['Created'] != undefined && csvDataArray[i]['Created'] != null) {

                                            let dt = csvDataArray[i]['Created'].split("-")
                                            createdDate = dt[2] + "-" + dt[1] + "-" + dt[0];
                                        }

                                        let data = {

                                            EvolveItem_Code: csvDataArray[i]['Item Number'].trimEnd(),
                                            EvolveUnit_Code: csvDataArray[i]['Site'],
                                            EvolveInventory_QtyOnHand: ((csvDataArray[i]['Qty On Hand - Inv Detail'] + '').replace(/,/g, '')),
                                            EvolveItem_ID: null,
                                            EvolveUnit_ID: null,
                                            EvolveUser_ID: req.EvolveUser_ID,
                                            EvolveLocation_ID: checkLocation.recordset[0].EvolveLocation_ID,
                                            EvolveInventory_LotNumber: csvDataArray[i]['Lot/Serial'],
                                            EvolveInventory_RefNumber: csvDataArray[i]['Ref'] == undefined ? '' : csvDataArray[i]['Ref'],
                                            EvolveInventory_CreatedAt: createdDate


                                        }

                                        let unitId = await Evolve.App.Services.Wms.Inventory.SrvList.checkUnitCode(data.EvolveUnit_Code);
                                        if (unitId instanceof Error) {
                                            errorMessage = "Error while check unit code"
                                        } else if (unitId.rowsAffected > 0) {

                                            data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                                            let itemID = await Evolve.App.Services.Wms.Inventory.SrvList.checkItemCode(data.EvolveItem_Code);
                                            if (itemID instanceof Error) {
                                                errorMessage = "Error While Check  Item Code";
                                            } else if (itemID.rowsAffected > 0) {

                                                data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                                                let checkInventory = await Evolve.App.Services.Wms.Inventory.SrvList.checkInventory(data);
                                                if (checkInventory instanceof Error) {
                                                    errorMessage = "Error While Check Inventory";
                                                } else if (checkInventory.rowsAffected > 0) {

                                                    data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                                                    let updateInventory = await Evolve.App.Services.Wms.Inventory.SrvList.updateInventory(data);
                                                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                                                        errorMessage = "Error While update inventory";
                                                    }
                                                } else {

                                                    let addInventory = await Evolve.App.Services.Wms.Inventory.SrvList.addInventory(data);
                                                    if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                                                        errorMessage = 'Error While Add Inventory'
                                                    }
                                                }
                                            } else {
                                                errorMessage = "Item Code " + data.EvolveItem_Code + " Not Found";

                                            }
                                        } else {
                                            errorMessage = "Site Code " + data.EvolveUnit_Code + " Not Found";

                                        }

                                    }

                                }



                            }

                            //     // let uniqData = [];
                            //     // for (let i = 0; i < csvDataArray.length; i++) {

                            //     //     let isDuplicate = false;

                            //     //     for (let j = 0; j < uniqData.length; j++) {

                            //     //         if ((uniqData[j]['Item Number'] == csvDataArray[i]['Item Number']) && (uniqData[j]['Site'] == csvDataArray[i]['Site']) && (uniqData[j]['Qty On Hand - Inv Mstr'] == csvDataArray[i]['Qty On Hand - Inv Mstr'])) {

                            //     //             isDuplicate = true;

                            //     //         }
                            //     //     }
                            //     //     if (!isDuplicate) {
                            //     //         uniqData.push(csvDataArray[i])
                            //     //     }
                            //     // }

                            //     // for (let i = 0; i < uniqData.length; i++) {
                            //     //     if (uniqData[i]['Item Number'] != '' && uniqData[i]['Item Number'] != undefined && uniqData[i]['Item Number'] != null && uniqData[i]['Site'] != '' && uniqData[i]['Site'] != undefined && uniqData[i]['Site'] != null && uniqData[i]['Qty On Hand - Inv Mstr'] != '' && uniqData[i]['Qty On Hand - Inv Mstr'] != undefined && uniqData[i]['Qty On Hand - Inv Mstr'] != null) {
                            //     //         let data = {

                            //     //             EvolveItem_Code: uniqData[i]['Item Number'].trimEnd(),
                            //     //             EvolveUnit_Code: uniqData[i]['Site'],
                            //     //             EvolveInventory_QtyOnHand: ((uniqData[i]['Qty On Hand - Inv Mstr'] + '').replace(/,/g, '')),
                            //     //             EvolveItem_ID: null,
                            //     //             EvolveUnit_ID: null,
                            //     //             EvolveUser_ID: req.EvolveUser_ID
                            //     //         }
                            //     //         let unitId = await Evolve.App.Services.Wms.Inventory.SrvList.checkUnitCode(data.EvolveUnit_Code);
                            //     //         if (unitId instanceof Error) {
                            //     //             errorMessage = "Error while check unit code"
                            //     //         } else if (unitId.rowsAffected > 0) {

                            //     //             data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                            //     //             let itemID = await Evolve.App.Services.Wms.Inventory.SrvList.checkItemCode(data.EvolveItem_Code);
                            //     //             if (itemID instanceof Error) {
                            //     //                 errorMessage = "Error While Check  Item Code";
                            //     //             } else if (itemID.rowsAffected > 0) {

                            //     //                 data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                            //     //                 let checkInventory = await Evolve.App.Services.Wms.Inventory.SrvList.checkInventory(data);
                            //     //                 if (checkInventory instanceof Error) {
                            //     //                     errorMessage = "Error While Check Inventory";
                            //     //                 } else if (checkInventory.rowsAffected > 0) {

                            //     //                     data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                            //     //                     let updateInventory = await Evolve.App.Services.Wms.Inventory.SrvList.updateInventory(data);
                            //     //                     if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                            //     //                         errorMessage = "Error While update inventory";
                            //     //                     }
                            //     //                 } else {

                            //     //                     let addInventory = await Evolve.App.Services.Wms.Inventory.SrvList.addInventory(data);
                            //     //                     if (addInventory instanceof Error || addInventory.rowsAffected < 1) {
                            //     //                         errorMessage = 'Error While Add Inventory'
                            //     //                     }
                            //     //                 }
                            //     //             }
                            //     //         }
                            //     //     }
                            //     // }







                        }
                        if (errorMessage != '') {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Inventory Updated Successfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading inventory csv " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading inventory csv ", result: null
            };
            res.send(obj);
        }
    },
    getItemList: async function (req, res) {
        try {
            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.Wms.Inventory.SrvList.getItemList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get item list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get item list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }


        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get item list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get item list " + error.message, result: null };
            res.send(obj);
        }
    },
    getUnitList: async function (req, res) {
        try {

            let data = {
                search: req.body.term,
            }
            let result = await Evolve.App.Services.Wms.Inventory.SrvList.getUnitList(data);
            if (result instanceof Error) {
                Evolve.Log.error("EERR#### : Error while get unit list")
                let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while get unit list", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Wo List", result: result.recordset };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get unit list " + error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR####: Error while get unit list " + error.message, result: null };
            res.send(obj);
        }
    },



}