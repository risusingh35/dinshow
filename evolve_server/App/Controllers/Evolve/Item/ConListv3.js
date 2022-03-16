'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    uploadItemMasterCsv: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'itemMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        // console.log("Error in File Upload ::", error.message);
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        // const converter=Evolve.Csv({
                        //     trim:false,
                        // })
                        let csvDataArray = await Evolve.Csv({
                            trim: false,
                            ignoreEmpty: true,
                        }).fromFile('./csv/doa/' + fileName);

                        // const csv = require('csv-parser');
                        // const fs = require('fs');

                        // fs.createReadStream('./csv/doa/' + fileName)
                        // .pipe(csv())
                        // .on('data', (row) => {
                        //     console.log(row);
                        // })
                        // .on('end', () => {
                        //     console.log('CSV file successfully processed');
                        // });
                        // console.log("csvDataArray>>>>>", csvDataArray);
                        let errorMessage = 'Error While Upload Item Master!!';
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (csvDataArray[i]['Item'] == '' || csvDataArray[i]['Item'] == undefined) {
                                    errorStatus = true;
                                    errorMessage = 'Error In Upload Item Master !! File Is Not Proper !! '
                                }
                            }
                        }
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (csvDataArray[i]['Item'] != '' && csvDataArray[i]['Item'] != undefined) {

                                    csvDataArray[i]['Item'] = csvDataArray[i]['Item'].trimEnd();
                                    errorStatus = false;

                                    // if (csvDataArray[i]['UM'] != '' && csvDataArray[i]['UM'] != undefined && csvDataArray[i]['UM'] != null) {
                                    // UOM Part
                                    let checkUomExist = await Evolve.App.Services.Evolve.Item.SrvListv3.checkUomExist(csvDataArray[i]['UM']);
                                    if (checkUomExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkUomExist.message);
                                    }
                                    else if (checkUomExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveUom_ID'] = checkUomExist.recordset[0].EvolveUom_ID;
                                    }
                                    else {
                                        let addUom = await Evolve.App.Services.Evolve.Item.SrvListv3.addUom(csvDataArray[i]['UM']);
                                        if (addUom instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(addUom.message);
                                        }
                                        else {
                                            csvDataArray[i]['EvolveUom_ID'] = addUom.recordset[0].inserted_id;
                                        }
                                    }


                                    // Unit Part
                                    // if (csvDataArray[i]['Item site'] != '' && csvDataArray[i]['Item site'] != undefined && csvDataArray[i]['Item site'] != null) {
                                    // let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListv3.getUnitId(csvDataArray[i]['Item site']);
                                    // console.log("getUnitId>>>>>", getUnitId);
                                    // if (getUnitId instanceof Error || getUnitId.rowsAffected < 1) {
                                    //     errorStatus = true;
                                    //     Evolve.Log.error("Unit ID Not Found");
                                    // }
                                    // else {
                                    //     csvDataArray[i]['EvolveUnit_ID'] = getUnitId.recordset[0].EvolveUnit_ID;
                                    // }

                                    //Tax Class Part

                                    if (csvDataArray[i]['Tax Class'] != '' && csvDataArray[i]['Tax Class'] != undefined && csvDataArray[i]['Tax Class'] != null) {
                                        let checkTaxClass = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkTaxClass(csvDataArray[i]['Tax Class']);
                                        if (checkTaxClass instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkTaxClass.message);
                                        }
                                        else if (checkTaxClass.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveTaxClass_ID'] = checkTaxClass.recordset[0].EvolveTaxClass_ID
                                        }
                                        else if (checkTaxClass.rowsAffected < 1) {
                                            let addTaxClass = await Evolve.App.Services.eDoa.customerMaster.SrvList.addTaxClass(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addTaxClass instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(checkTaxClass.message);
                                            }
                                            else {
                                                csvDataArray[i]['EvolveTaxClass_ID'] = addTaxClass.recordset[0].inserted_id
                                            }
                                        }
                                    }

                                    if (errorStatus == false) {
                                        let checkItemExist = await Evolve.App.Services.Evolve.Item.SrvListv3.checkItemExist(csvDataArray[i]['Item']);
                                        if (checkItemExist instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkItemExist.message);
                                        }
                                        else if (checkItemExist.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveItem_ID'] = checkItemExist.recordset[0].EvolveItem_ID;
                                            let updateItemMaster = await Evolve.App.Services.Evolve.Item.SrvListv3.updateItemMaster(req.EvolveUser_ID, csvDataArray[i]);
                                            if (updateItemMaster instanceof Error || updateItemMaster.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error In Update Item Master");
                                            }
                                            else {
                                                const data = csvDataArray[i]['Item site'];
                                                let itemSite = String(data);
                                                let itemSiteArr = itemSite.split(",");
                                                // console.log("itemSiteArr>>>>>", itemSiteArr);

                                                for (let k = 0; k < itemSiteArr.length; k++) {
                                                    const EvolveUnit_Code = itemSiteArr[k];
                                                    let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListv3.getUnitId(EvolveUnit_Code);
                                                    if (getUnitId instanceof Error || getUnitId.rowsAffected < 1) {
                                                        errorStatus = true;
                                                        Evolve.Log.error("Unit ID Not Found in Item Unit Link");
                                                    }
                                                    else {
                                                        let linkItemId = checkItemExist.recordset[0].EvolveItem_ID;
                                                        let linkUnitId = getUnitId.recordset[0].EvolveUnit_ID;

                                                        let checkItemUnitLinkExist = await Evolve.App.Services.Evolve.Item.SrvListv3.checkItemUnitLinkExist(linkItemId, linkUnitId);
                                                        if (checkItemUnitLinkExist instanceof Error ) {
                                                            errorStatus = true;
                                                            Evolve.Log.error("Error In Check Item Unit Link");
                                                        }
                                                        else if (checkItemUnitLinkExist.rowsAffected < 1) {
                                                            let createItemUnitLink = await Evolve.App.Services.Evolve.Item.SrvListv3.createItemUnitLink(req.EvolveUser_ID, linkItemId, linkUnitId);
                                                            if (createItemUnitLink instanceof Error || createItemUnitLink.rowsAffected < 1) {
                                                                errorStatus = true;
                                                                Evolve.Log.error("Error In Create Item Unit Link");
                                                            }
                                                            // Evolve.Log.info("created in Update Item======================");
                                                        }
                                                    }
                                                }

                                                Evolve.Log.info("Update Item " + csvDataArray[i]['Item']);
                                            }
                                        }
                                        else {
                                            let addItemMaster = await Evolve.App.Services.Evolve.Item.SrvListv3.addItemMaster(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addItemMaster instanceof Error || addItemMaster.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error In Add Item Master");
                                            }
                                            else {
                                                let linkItemId = addItemMaster.recordset[0].inserted_id;

                                                const data = csvDataArray[i]['Item site'];
                                                let itemSite = String(data);
                                                let itemSiteArr = itemSite.split(",");
                                                // console.log("itemSiteArr>>>>>", itemSiteArr);
                
                                                for (let k = 0; k < itemSiteArr.length; k++) {
                                                    const EvolveUnit_Code = itemSiteArr[k];
                                                    let getUnitId = await Evolve.App.Services.Evolve.Item.SrvListv3.getUnitId(EvolveUnit_Code);
                                                    if (getUnitId instanceof Error || getUnitId.rowsAffected < 1) {
                                                        errorStatus = true;
                                                        Evolve.Log.error("Unit ID Not Found in Item Unit Link");
                                                    }
                                                    else {
                                                        let linkUnitId = getUnitId.recordset[0].EvolveUnit_ID;

                                                        let createItemUnitLink = await Evolve.App.Services.Evolve.Item.SrvListv3.createItemUnitLink(req.EvolveUser_ID, linkItemId, linkUnitId);
                                                        if (createItemUnitLink instanceof Error || createItemUnitLink.rowsAffected < 1) {
                                                            errorStatus = true;
                                                            Evolve.Log.error("Error In Create Item Unit Link");
                                                        }
                                                    }
                                                }

                                                Evolve.Log.info("Add Item " + csvDataArray[i]['Item']);
                                            }
                                        }
                                    }
                                    else {
                                        errorStatus = true;
                                    }

                                }
                            }
                        }
                       
                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Item Master uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Item Master " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Item Master ", result: null
            };
            res.send(obj);
        }
    },

    getItemsList3: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.Item.SrvListv3.getItemGroupListCount(search);
            let items = await Evolve.App.Services.Evolve.Item.SrvListv3.getItemsList(start, length, search);
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
            Evolve.Log.error(" EERR0255: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0255: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}