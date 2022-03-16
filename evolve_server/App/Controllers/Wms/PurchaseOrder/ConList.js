'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    getPoList: async function (req, res) {
        try {

            console.log("PO  LISt  ?????" )

            console.log("req>>>>>" ,  req.EvolveUnit_ID)
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = '';

            // if (req.body.EvolveUnit_ID != null) {

            //     condition += " AND einv.EvolveUnit_ID = " + req.body.EvolveUnit_ID;

            // }
            // if (req.body.EvolveItem_ID != null) {

            //     condition += " AND einv.EvolveItem_ID = " + req.body.EvolveItem_ID;

            // }

            // console.log("req.body.searchList>>>>" ,  req.body.searchList)
            for(let i=0 ; i<req.body.searchList.length ; i++){

                condition += " AND '"+req.body.searchList[i].tableField+"' '"+req.body.searchList[i].operator+"' "+ req.body.searchList[i].value+"'";


            }

            // console.log("condition???" , condition)

            
            // if(req.body.EvolveUnit_ID)
            
            let count = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.getPoListCount(search, condition ,  req.EvolveUnit_ID);
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.getPoList(start, length, search, condition , req.EvolveUnit_ID);
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

                let settingList = [{
                    label  : 'ORDER',
                    value : 'EvolvePurchaseOrder_Number',
                    isShow : true
                } ,
                {
                    label  : 'SITE',
                    value : 'EvolveUnit_Code',
                    isShow : true

                },
                {
                    label  : 'SUPPLIER',
                    value : 'EvolveSupplier_Code',
                    isShow : true

                },
                {
                    label  : 'SUPPLIER NAME',
                    value : 'EvolveSupplier_Name',
                    isShow : true

                },
                {
                    label  : 'LINE',
                    value : 'EvolvePurchaseOrderDetails_LineNo',
                    isShow : true

                },
                {
                    label  : 'DUE DATE',
                    value : 'dueDate',
                    isShow : true

                },
                // {
                //     label  : 'NEED DATE',
                //     value : 'needDate',
                //     isShow : true

                // },
                {
                    label  : 'QTY ORDERED',
                    value : 'EvolvePurchaseOrderDetails_QtyOrdered',
                    isShow : true

                },
                {
                    label  : 'QTY RECEIVED',
                    value : 'EvolvePurchaseOrderDetails_QtyRecieved',
                    isShow : true

                },
                // {
                //     label  : 'QUANTITY RETURNED',
                //     value : '-',
                //     isShow : true

                // },
                // {
                //     label  : 'QUANTITY OPEN',
                //     value : '',
                //     isShow : true

                // },
                // {
                //     label  : 'STATUS',
                //     value : 'EvolvePurchaseOrder_Status',
                //     isShow : true

                // },
                {
                    label  : 'UM',
                    value : 'EvolveUom_Uom',
                    isShow : true

                },
                {
                    label  : 'ITEM NUMBER',
                    value : 'EvolveItem_Part',
                    isShow : true

                },   
                {
                    label  : 'ITEM DESCRIPTION',
                    value : 'EvolveItem_Desc1',
                    isShow : true

                }
                ]

                result.recordset = result.recordset.map(v => {

                    if(v.EvolvePurchaseOrderDetails_Type == 'M'){

                        v.EvolveItem_Part = v.EvolvePurchaseOrderDetails_MemoItem ;
                    }
                    return v  
                })
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset ,
                    settingList : settingList 
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

                                    let checkLocation = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkInventoryLocation(csvDataArray[i]['Location']);


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

                                        let unitId = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkUnitCode(data.EvolveUnit_Code);
                                        if (unitId instanceof Error) {
                                            errorMessage = "Error while check unit code"
                                        } else if (unitId.rowsAffected > 0) {

                                            data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                                            let itemID = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkItemCode(data.EvolveItem_Code);
                                            if (itemID instanceof Error) {
                                                errorMessage = "Error While Check  Item Code";
                                            } else if (itemID.rowsAffected > 0) {

                                                data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                                                let checkInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkInventory(data);
                                                if (checkInventory instanceof Error) {
                                                    errorMessage = "Error While Check Inventory";
                                                } else if (checkInventory.rowsAffected > 0) {

                                                    data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                                                    let updateInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.updateInventory(data);
                                                    if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                                                        errorMessage = "Error While update inventory";
                                                    }
                                                } else {

                                                    let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.addInventory(data);
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
                            //     //         let unitId = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkUnitCode(data.EvolveUnit_Code);
                            //     //         if (unitId instanceof Error) {
                            //     //             errorMessage = "Error while check unit code"
                            //     //         } else if (unitId.rowsAffected > 0) {

                            //     //             data.EvolveUnit_ID = unitId.recordset[0].EvolveUnit_ID;

                            //     //             let itemID = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkItemCode(data.EvolveItem_Code);
                            //     //             if (itemID instanceof Error) {
                            //     //                 errorMessage = "Error While Check  Item Code";
                            //     //             } else if (itemID.rowsAffected > 0) {

                            //     //                 data.EvolveItem_ID = itemID.recordset[0].EvolveItem_ID;
                            //     //                 let checkInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.checkInventory(data);
                            //     //                 if (checkInventory instanceof Error) {
                            //     //                     errorMessage = "Error While Check Inventory";
                            //     //                 } else if (checkInventory.rowsAffected > 0) {

                            //     //                     data.EvolveInventory_ID = checkInventory.recordset[0].EvolveInventory_ID;
                            //     //                     let updateInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.updateInventory(data);
                            //     //                     if (updateInventory instanceof Error || updateInventory.rowsAffected < 1) {

                            //     //                         errorMessage = "Error While update inventory";
                            //     //                     }
                            //     //                 } else {

                            //     //                     let addInventory = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.addInventory(data);
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
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.getItemList(data);
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
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvList.getUnitList(data);
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