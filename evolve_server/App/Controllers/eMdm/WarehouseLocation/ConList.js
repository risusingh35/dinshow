'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getWarehouseList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getWarehouseList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Warehouse List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Warehouse List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Warehouse List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getLocGroupList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getLocGroupList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Warehouse List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Warehouse List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Warehouse List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUomList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getUomList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Uom List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Uom List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Uom List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getErpLocationList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getErpLocationList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Location List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Location List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Location List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getParentLocationDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getParentLocationDetails(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Parent Location Details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get Parent Location Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Parent Location Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addWarehouseLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.addWarehouseLocation(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while All Location !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Warehouse Location Add Successfully!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while add Location " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while add Location " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getWarehouseLocationList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getWarehouseLocationListCount(search);
            console.log("Count/???" , Count)
            let List = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getWarehouseLocationList(start, length, search);
            console.log("List/???" , List)

            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Location List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Location list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Location list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleWarehouseLocationDetails: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.getSingleWarehouseLocationDetails(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single Location Details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while get single Location Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while get Parent Location Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateWarehouseLocation: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.updateWarehouseLocation(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Update Location Details !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Location Updated Successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR#### Error while Update Location Details " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#### Error while Update Location Details " + error.message,
                result: null
            };
            res.send(obj);
        }
    },




    uploadErpLocation: async function (req, res) {
        try {
            let commonService = {};
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'erpLocation_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                csv.mv('./csv/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/' + fileName);
                        let errorMessage = '';
                        // let error = false;
                        for (let i = 0; i < csvDataArray.length; i++) {

                            if (errorMessage == '') {

                                if (csvDataArray[i]['Location_Code'] == '' || csvDataArray[i]['Location_Code'] == undefined || csvDataArray[i]['Location_Code'] == null) {

                                    errorMessage = 'Location Code not found in  row no ' + (i + 1)

                                } else if (csvDataArray[i]['Inventory_Status'] == '' || csvDataArray[i]['Inventory_Status'] == undefined || csvDataArray[i]['Inventory_Status'] == null) {

                                    errorMessage = 'Inventory status  not found in  row no ' + (i + 1)

                                } else if (csvDataArray[i]['Uom'] == '' || csvDataArray[i]['Uom'] == undefined || csvDataArray[i]['Uom'] == null) {

                                    errorMessage = 'Uom not found in  row no ' + (i + 1)
                                } else if (csvDataArray[i]['Dimension_Uom'] == '' || csvDataArray[i]['Dimension_Uom'] == undefined || csvDataArray[i]['Dimension_Uom'] == null) {

                                    errorMessage = 'Dimension uom not found in  row no ' + (i + 1)

                                } else if (csvDataArray[i]['Height'] == '' || csvDataArray[i]['Height'] == undefined || csvDataArray[i]['Height'] == null) {

                                    csvDataArray[i]['Height'] = null;

                                } else if (csvDataArray[i]['Length'] == '' || csvDataArray[i]['Length'] == undefined || csvDataArray[i]['Length'] == null) {

                                    csvDataArray[i]['Length'] = null;

                                } else if (csvDataArray[i]['Width'] == '' || csvDataArray[i]['Width'] == undefined || csvDataArray[i]['Width'] == null) {

                                    csvDataArray[i]['Width'] = null;

                                } else if (csvDataArray[i]['Pecentage_Full'] == '' || csvDataArray[i]['Pecentage_Full'] == undefined || csvDataArray[i]['Pecentage_Full'] == null) {

                                    csvDataArray[i]['Pecentage_Full'] = null;
                                }


                                if (errorMessage == '') {

                                    commonService.tableName = 'EvolveLocation';
                                    commonService.fieldName = 'EvolveLocation_ID';
                                    commonService.matchField = 'EvolveLocation_Code';
                                    commonService.value = csvDataArray[i]['Location_Code'];


                                    let checkCode = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.genericService(commonService);

                                    console.log('checkCode???' ,  checkCode)

                                    if (checkCode instanceof Error) {

                                        errorMessage = "Error While Check Loocation Code " + csvDataArray[i]['Location_Code'];

                                    } else if (checkCode.rowsAffected > 0) {

                                        errorMessage = "Location Code " + csvDataArray[i]['Location_Code'] + " Already Exit";

                                    }




                                }
                            }
                        }
                        if (errorMessage == '') {


                            for (let i = 0; i < csvDataArray.length; i++) {
                                if(errorMessage == ''){
                                csvDataArray[i].EvolveLocation_Code = csvDataArray[i]['Location_Code'];
                                csvDataArray[i].EvolveLocation_Desc = csvDataArray[i]['Location_Desc'];
                                csvDataArray[i].EvolveLocation_Type = "ERP";
                                csvDataArray[i].EvolveInventoryStatus_Code = csvDataArray[i]['Inventory_Status'];
                                csvDataArray[i].EvolveInventoryStatus_ID = null;
                                csvDataArray[i].EvolveUom_ID = null;
                                csvDataArray[i].EvolveUom_Uom = csvDataArray[i]['Uom'];
                                csvDataArray[i].EvolveLocation_Capacity = parseFloat(csvDataArray[i]['Capacity']);
                                csvDataArray[i].EvolveLocation_DimensionUom_Uom = csvDataArray[i]['Dimension_Uom'];
                                csvDataArray[i].EvolveLocation_DimensionUom_ID = null;
                                csvDataArray[i].EvolveLocation_Height = parseFloat(csvDataArray[i]['Height']);
                                csvDataArray[i].EvolveLocation_Length = parseFloat(csvDataArray[i]['Length']);
                                csvDataArray[i].EvolveLocation_Width = parseFloat(csvDataArray[i]['Width']);
                                csvDataArray[i].EvolveLocation_PercentFull = parseFloat(csvDataArray[i]['Pecentage_Full']);
                                csvDataArray[i].EvolveWarehouse_ID = null;
                                csvDataArray[i].EvolveUser_ID = req.EvolveUser_ID;


                                commonService.tableName = 'EvolveInventoryStatus';
                                commonService.fieldName = 'EvolveInventoryStatus_ID';
                                commonService.matchField = 'EvolveInventoryStatus_Code';
                                commonService.value = csvDataArray[i].EvolveInventoryStatus_Code;


                                let inventoryID = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.genericService(commonService);

                                if (inventoryID instanceof Error || inventoryID.rowsAffected < 1) {
                                    errorMessage = "Inventory Status " + csvDataArray[i].EvolveInventoryStatus_Code + " Not Found  In Master Data";


                                } else {

                                    csvDataArray[i].EvolveInventoryStatus_ID = inventoryID.recordset[0].EvolveInventoryStatus_ID;
                                    commonService.tableName = 'EvolveUom';
                                    commonService.fieldName = 'EvolveUom_ID';
                                    commonService.matchField = 'EvolveUom_Uom';
                                    commonService.value = csvDataArray[i].EvolveUom_Uom;

                                    let uom = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.genericService(commonService);

                                    if (uom instanceof Error || uom.rowsAffected < 1) {

                                        errorMessage = "Uom " + csvDataArray[i].EvolveUom_Uom + " Not Found  In Master Data";


                                    } else {
                                        csvDataArray[i].EvolveUom_ID = uom.recordset[0].EvolveUom_ID;
                                        commonService.value = csvDataArray[i].EvolveLocation_DimensionUom_Uom;

                                        let dimessionalUom = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.genericService(commonService);

                                        if (dimessionalUom instanceof Error || dimessionalUom.rowsAffected < 1) {


                                            errorMessage = "Dimensional Uom " + csvDataArray[i].EvolveLocation_DimensionUom_Uom + " Not Found  In Master Data";


                                        } else {

                                            csvDataArray[i].EvolveLocation_DimensionUom_ID = dimessionalUom.recordset[0].EvolveUom_ID;



                                        }

                                    }


                                }

                            }
                        }
                            

                        }


                        if (errorMessage == '') {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if(errorMessage == ''){
                                    let addLocation = await Evolve.App.Services.eMdm.WarehouseLocation.SrvList.addErpLocation(csvDataArray[i]);

                                    if (addLocation instanceof Error || addLocation.rowsAffected < 1) {

                                        errorMessage = "Error While Add Location on row no "+(i+1);


                                    }
                                }
                        }
                        }




                        if (errorMessage == '') {

                            let obj = { statusCode: 200, status: "success", message: 'Erp Location Uploaded Successfully ', result: null };
                            res.send(obj);
                         
                        }
                        else {


                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                     
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Credit terms " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Credit terms ", result: null
            };
            res.send(obj);
        }
    },


}