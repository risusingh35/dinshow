'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getCustomerMasterList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.customerMaster.SrvList.getCustomerMasterListCount(search, req.EvolveUser_ID, req.body);
            let result = await Evolve.App.Services.eDoa.customerMaster.SrvList.getCustomerMasterList(start, length, search, req.EvolveUser_ID, req.body);
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get customer master list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get customer master list!",
                    result: result.message
                };
                res.send(obj);
            } else {
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
            Evolve.Log.error(" EERR####: Error while get customer master list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get customer master list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addCustomerMaster: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.customerMaster.SrvList.addCustomerMaster(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add customer master ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "customer master added Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add customer master " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add customer master " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateCustomerMaster: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.customerMaster.SrvList.updateCustomerMaster(req.EvolveUser_ID, sreq.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update customer master ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "customer master updated Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update customer master " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update customer master " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteCustomer: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.customerMaster.SrvList.deleteCustomer(req.body.EvolveCustomer_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while delete customer ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "customer deleted Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete customer " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete customer " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onUploadCustomerCsvFile: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'customerMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                        // console.log("csvDataArray>>>>", csvDataArray);
                        let errorMessage = 'Error While Upload Customer Master!!';
                        let errorStatus = false;

                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                errorStatus = false;
                                if (csvDataArray[i]['Customer'] != '' && csvDataArray[i]['Customer'] != undefined) {

                                    // Unit Code Part
                                    if (csvDataArray[i]['Site'] != '' && csvDataArray[i]['Site'] != undefined && csvDataArray[i]['Site'] != null) {
                                        let checkUnitCode = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkUnitCode(csvDataArray[i]['Site']);
                                        if (checkUnitCode instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkUnitCode.message);
                                        }
                                        else if (checkUnitCode.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveUnit_ID'] = checkUnitCode.recordset[0].EvolveUnit_ID;
                                            // csvDataArray[i]['EvolveUnit_State'] = checkUnitCode.recordset[0].EvolveUnit_State;
                                        }
                                    }

                                    // Sales Person Part
                                    if (csvDataArray[i]['Salesperson'] != '' && csvDataArray[i]['Salesperson'] != undefined && csvDataArray[i]['Salesperson'] != null) {
                                        let checkSalesPerson = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkSalesPerson(csvDataArray[i]['Salesperson']);
                                        if (checkSalesPerson instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkSalesPerson.message);
                                        }
                                        else if (checkSalesPerson.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveSalesPerson_ID'] = checkSalesPerson.recordset[0].EvolveSalesPerson_ID
                                        }
                                        else if (checkSalesPerson.rowsAffected < 1) {
                                            let addSalesPerson = await Evolve.App.Services.eDoa.customerMaster.SrvList.addSalesPerson(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addSalesPerson instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(checkSalesPerson.message);
                                            }
                                            else {
                                                csvDataArray[i]['EvolveSalesPerson_ID'] = addSalesPerson.recordset[0].inserted_id
                                            }
                                        }
                                    }

                                    //Credit Terms Part
                                    if (csvDataArray[i]['Terms'] != '' && csvDataArray[i]['Terms'] != undefined && csvDataArray[i]['Terms'] != null) {
                                        // console.log("csvDataArray[i]>>>>> con credit terms", csvDataArray[i]);
                                        let checkCreditTermsCode = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkCreditTermsCode(csvDataArray[i]['Terms']);
                                        if (checkCreditTermsCode instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkCreditTermsCode.message);
                                        }
                                        else if (checkCreditTermsCode.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveCreditTerms_ID'] = checkCreditTermsCode.recordset[0].EvolveCreditTerms_ID
                                        }
                                        else if (checkCreditTermsCode.rowsAffected < 1) {
                                            let addCreditTermsCode = await Evolve.App.Services.eDoa.customerMaster.SrvList.addCreditTermsCode(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addCreditTermsCode instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(addCreditTermsCode.message);
                                            }
                                            else {
                                                csvDataArray[i]['EvolveCreditTerms_ID'] = addCreditTermsCode.recordset[0].inserted_id
                                            }
                                        }
                                    }

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

                                    // Ship To part
                                    if (csvDataArray[i]['Bill-To'] != '' && csvDataArray[i]['Bill-To'] != undefined && csvDataArray[i]['Bill-To'] != null) {
                                        let checkShipTo = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkShipTo(csvDataArray[i]['Bill-To']);
                                        if (checkShipTo instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkShipTo.message);
                                        }
                                        else if (checkShipTo.rowsAffected < 1) {
                                            let addShipTo = await Evolve.App.Services.eDoa.customerMaster.SrvList.addShipTo(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addShipTo instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(addShipTo.message);
                                            }
                                            else {
                                                csvDataArray[i]['EvolveCustomer_BillTo'] = addShipTo.recordset[0].inserted_id
                                            }
                                        }
                                        else {
                                            csvDataArray[i]['EvolveCustomer_BillTo'] = checkShipTo.recordset[0].EvolveShipTo_ID
                                        }
                                    }


                                    if (errorStatus == false) {
                                        let checkCustomeCodeExist = await Evolve.App.Services.eDoa.customerMaster.SrvList.checkCustomeCodeExist(csvDataArray[i]['Customer']);
                                        if (checkCustomeCodeExist instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkCustomeCodeExist.message);
                                        }
                                        else if (checkCustomeCodeExist.rowsAffected > 0) {
                                            if (csvDataArray[i]['Active'] == 'Yes') {
                                                csvDataArray[i]['Active'] = true;
                                            }
                                            else {
                                                csvDataArray[i]['Active'] = false;
                                            }

                                            csvDataArray[i]['EvolveCustomer_ID'] = checkCustomeCodeExist.recordset[0].EvolveCustomer_ID;
                                            let updateCustomerMaster = await Evolve.App.Services.eDoa.customerMaster.SrvList.updateCustomerMaster(req.EvolveUser_ID, csvDataArray[i]);
                                            if (updateCustomerMaster instanceof Error || updateCustomerMaster.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error In Update Customer Master");
                                            }
                                            else {
                                                let updateshipTo = await Evolve.App.Services.eDoa.customerMaster.SrvList.updateshipTo(req.EvolveUser_ID, csvDataArray[i]);
                                                if (updateshipTo instanceof Error || updateshipTo.rowsAffected < 1) {
                                                    errorStatus = true;
                                                    Evolve.Log.error("Error in Update Ship To");
                                                }
                                                else {
                                                    Evolve.Log.info("Update Customer" + csvDataArray[i]['Customer']);
                                                }
                                            }
                                        }
                                        else {
                                            if (csvDataArray[i]['Active'] == 'Yes') {
                                                csvDataArray[i]['Active'] = true;
                                            }
                                            else {
                                                csvDataArray[i]['Active'] = false;
                                            }

                                            let addCustomerMaster = await Evolve.App.Services.eDoa.customerMaster.SrvList.addCustomerMaster(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addCustomerMaster instanceof Error || addCustomerMaster.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error In Add Customer");
                                            }
                                            else {
                                                csvDataArray[i]['EvolveCustomer_ID'] = addCustomerMaster.recordset[0].inserted_id;
                                                let updateshipTo = await Evolve.App.Services.eDoa.customerMaster.SrvList.updateshipTo(req.EvolveUser_ID, csvDataArray[i]);
                                                if (updateshipTo instanceof Error || updateshipTo.rowsAffected < 1) {
                                                    errorStatus = true;
                                                    Evolve.Log.error("Error in Update Ship To");
                                                }
                                                else {
                                                    Evolve.Log.info("Add Customer" + csvDataArray[i]['Customer']);
                                                }
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
                            let obj = { statusCode: 200, status: "success", message: 'Customer Master uploaded succsessfully', result: null };
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