'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getShipToList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.shipTo.SrvList.getShipToListCount(search, req.EvolveUser_ID);
            let result = await Evolve.App.Services.eDoa.shipTo.SrvList.getShipToList(start, length, search, req.EvolveUser_ID);

            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get ship to list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get ship to list!",
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
            Evolve.Log.error(" EERR####: Error while get ship to list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get ship to list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addShipTo: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.shipTo.SrvList.addShipTo(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add ship to ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ship to added Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add ship to " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add ship to " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateShipTo: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.shipTo.SrvList.updateShipTo(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update ship to ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ship to updated Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update ship to " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update ship to " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteShipTo: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.shipTo.SrvList.deleteShipTo(req.body.EvolveShipTo_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while delete ship to ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ship to deleted Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while delete ship to " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while delete ship to " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getCustomerList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.shipTo.SrvList.getCustomerList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while getting customer list ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "customer list get Succesfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting customer list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting customer list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    uploadShipToCsv: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'taxClassMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);
                        let errorMessage = 'Error While Upload Ship To!!';
                        let errorStatus = false;

                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                console.log(csvDataArray[i])
                                errorStatus = false;
                                if (csvDataArray[i]['Ship-To Code'] != '' && csvDataArray[i]['Ship-To Code'] != undefined && csvDataArray[i]['Ship-To Code'] != null) {
                                    let getCustomerId = await Evolve.App.Services.eDoa.shipTo.SrvList.getCustomerId(csvDataArray[i]['Customer']);
                                    if (getCustomerId instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(getCustomerId.message);
                                    }
                                    else if (getCustomerId.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveCustomer_ID'] = getCustomerId.recordset[0].EvolveCustomer_ID;
                                    }

                                    if (errorStatus == false) {
                                        let checkShipToExist = await Evolve.App.Services.eDoa.shipTo.SrvList.checkShipToExist(csvDataArray[i]['Ship-To Code']);
                                        if (checkShipToExist instanceof Error) {
                                            errorStatus = true;
                                            Evolve.Log.error(checkShipToExist.message);
                                        }
                                        else if (checkShipToExist.rowsAffected > 0) {
                                            csvDataArray[i]['EvolveShipTo_ID'] = checkShipToExist.recordset[0].EvolveShipTo_ID;
                                            let updateShipTo = await Evolve.App.Services.eDoa.shipTo.SrvList.updateShipTo(req.EvolveUser_ID, csvDataArray[i]);
                                            if (updateShipTo instanceof Error || updateShipTo.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error IN Update Ship To " + csvDataArray[i]['Ship-To Code']);
                                            }
                                            else {
                                                Evolve.Log.info("Update Ship To" + csvDataArray[i]['Ship-To Code']);
                                            }
                                        }
                                        else {
                                            // csvDataArray[i]['EvolveShipTo_ID'] = checkShipToExist.recordset[0].EvolveShipTo_ID;
                                            let addShipTo = await Evolve.App.Services.eDoa.shipTo.SrvList.addShipTo(req.EvolveUser_ID, csvDataArray[i]);
                                            if (addShipTo instanceof Error || addShipTo.rowsAffected < 1) {
                                                errorStatus = true;
                                                Evolve.Log.error("Error IN Add Ship To " + csvDataArray[i]['Ship-To Code']);
                                            }
                                            else {
                                                Evolve.Log.info("Add Ship To" + csvDataArray[i]['Ship-To Code']);
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
                            let obj = { statusCode: 200, status: "success", message: 'Ship To uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV Ship To " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV Ship To ", result: null
            };
            res.send(obj);
        }
    }



}