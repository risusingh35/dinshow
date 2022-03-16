'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {


    getCreditTermsList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.creditTerms.SrvList.getCreditTermsListCount(search, req.EvolveUser_ID);
            let result = await Evolve.App.Services.eDoa.creditTerms.SrvList.getCreditTermsList(start, length, search, req.EvolveUser_ID);
            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while get credit terms list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get credit terms list!",
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
            Evolve.Log.error(" EERR####: Error while get credit terms list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get credit terms list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addCreditTerms: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.creditTerms.SrvList.addCreditTerms(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while add credit terms ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "credit terms added Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while add credit terms " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while add credit terms " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateCreditTerms: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eDoa.creditTerms.SrvList.updateCreditTerms(req.EvolveUser_ID, req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while update credit terms ",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "credit terms updated Succesfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while update credit terms " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while update credit terms " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    onUploadCreditTermsFile: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'creditTermsMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;

                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);

                        let errorMessage = 'Error While Upload Credit Terms!!';
                        let errorStatus = false;
                        // if (errorStatus == false) {
                        //     for (let i = 0; i < csvDataArray.length; i++) {
                        //         if (csvDataArray[i]['Credit Terms Code'] == '' || csvDataArray[i]['Credit Terms Code'] == undefined) {
                        //             errorStatus = true;
                        //             errorMessage = 'Error In Upload Credit Terms !! File Is Not Proper !! '
                        //         }
                        //     }
                        //   }

                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (csvDataArray[i]['Credit Terms Code'] != '' && csvDataArray[i]['Credit Terms Code'] != undefined && csvDataArray[i]['Credit Terms Code'] != null) {
                                    let checkCreditTermsCodeExist = await Evolve.App.Services.eDoa.creditTerms.SrvList.checkCreditTermsCodeExist(csvDataArray[i]['Credit Terms Code']);
                                    if (checkCreditTermsCodeExist instanceof Error) {
                                        errorStatus = true;
                                        Evolve.Log.error(checkCreditTermsCodeExist.message);
                                    }
                                    else if (checkCreditTermsCodeExist.rowsAffected > 0) {
                                        csvDataArray[i]['EvolveCreditTerms_ID'] = checkCreditTermsCodeExist.recordset[0].EvolveCreditTerms_ID;
                                        let updateCreditTermsCode = await Evolve.App.Services.eDoa.creditTerms.SrvList.updateCreditTerms(req.EvolveUser_ID, csvDataArray[i]);
                                        if (updateCreditTermsCode instanceof Error || updateCreditTermsCode.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error in Update Credit Terms");
                                        }
                                    }
                                    else {
                                        let addCreditTermsCode = await Evolve.App.Services.eDoa.creditTerms.SrvList.addCreditTerms(req.EvolveUser_ID, csvDataArray[i]);
                                        if (addCreditTermsCode instanceof Error || addCreditTermsCode.rowsAffected < 1) {
                                            errorStatus = true;
                                            Evolve.Log.error("Error in Update Credit Terms");
                                        }
                                    }
                                }
                            }

                        }
                        else {
                            errorStatus = true;
                        }

                        if (errorStatus == true) {
                            let obj = { statusCode: 400, status: "fail", message: errorMessage, result: null };
                            res.send(obj);
                        }
                        else {
                            let obj = { statusCode: 200, status: "success", message: 'Credit Terms uploaded succsessfully', result: null };
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