'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {
    getDayBookSet: async function (req, res) {
        let start = parseInt(req.body.startFrom);
        let length = parseInt(req.body.displayRecord);
        let search = req.body.search;

        try {
            let count = await Evolve.App.Services.eDoa.DayBookSet.SrvList.getDayBookSetCount(search);
            let result = await Evolve.App.Services.eDoa.DayBookSet.SrvList.getDayBookSet(start, length, search);

            if (result instanceof Error) {
                Evolve.Log.error(" EERR####: Error while get Day Book Set ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get Day Book Set!",
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
        }
        catch (err) {
            Evolve.Log.error("Error while get Day Book Set", err);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while get Day Book Set",
                result: null
            });
        }
    },

    uploadDayBookSet: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            if (req.files.fileData) {
                let csv = req.files.fileData;
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(csv.name)[1];
                let date = new Date();
                let fileName = 'dayBookMaster_' + date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + '_' + date.getHours() + '_' + date.getMinutes() + '_' + date.getSeconds() + '.' + ext;
                // Use the mv() method to place the file somewhere on your server
                csv.mv('./csv/doa/' + fileName, async function (error) {
                    if (error) {
                        let obj = { statusCode: 400, status: "fail", message: error.message, result: null };
                        res.send(obj);
                    } else {
                        let csvDataArray = await Evolve.Csv().fromFile('./csv/doa/' + fileName);

                        let errorMessage = 'Error While Upload Day Book Set!!';
                        let errorStatus = false;
                        if (errorStatus == false) {
                            for (let i = 0; i < csvDataArray.length; i++) {
                                if (csvDataArray[i]['Daybook Set'] != '' && csvDataArray[i]['Daybook Set'] != undefined && csvDataArray[i]['Daybook Set'] != null && csvDataArray[i]['Site'] != '' && csvDataArray[i]['Site'] != undefined && csvDataArray[i]['Site'] != null && csvDataArray[i]['Type'] != '' && csvDataArray[i]['Type'] != undefined && csvDataArray[i]['Type'] != null) {
                                    if (!errorStatus) {
                                        let checkUnitCode = await Evolve.App.Services.eDoa.DayBookSet.SrvList.checkUnitCode(csvDataArray[i]['Site']);
                                        if (checkUnitCode instanceof Error) {
                                            errorMessage = 'Erro While Get Site Code ' + csvDataArray[i]['Site']
                                            errorStatus = true;
                                        } else if (checkUnitCode.rowsAffected < 1) {
                                            errorMessage = 'UNIT CODE ' + csvDataArray[i]['Site'] + " NOT FOUND"
                                            errorStatus = true;

                                        } else {

                                            csvDataArray[i].EvolveUnit_ID = checkUnitCode.recordset[0].EvolveUnit_ID
                                            let checkTaxClassExist = await Evolve.App.Services.eDoa.DayBookSet.SrvList.checkDayBookSetExits(csvDataArray[i]['Site']);
                                            if (checkTaxClassExist instanceof Error) {
                                                errorStatus = true;
                                                Evolve.Log.error(checkTaxClassExist.message);
                                            }
                                            else if (checkTaxClassExist.rowsAffected > 0) {
                                                csvDataArray[i]['EvolveDBSet_ID'] = checkTaxClassExist.recordset[0].EvolveDBSet_ID;
                                                let updateDayBookSet = await Evolve.App.Services.eDoa.DayBookSet.SrvList.updateDayBookSet(req.EvolveUser_ID, csvDataArray[i]);
                                                if (updateDayBookSet instanceof Error || updateDayBookSet.rowsAffected < 1) {
                                                    errorStatus = true;
                                                    Evolve.Log.error("Error In Update Day Book Set");
                                                }
                                            }
                                            else {
                                                let addDayBookSet = await Evolve.App.Services.eDoa.DayBookSet.SrvList.addDayBookSet(req.EvolveUser_ID, csvDataArray[i]);
                                                if (addDayBookSet instanceof Error || addDayBookSet.rowsAffected < 1) {
                                                    errorStatus = true;
                                                    Evolve.Log.error("Error In Add Day Book Set");
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    
                                    errorMessage = 'Fill All  Required Data In Row No ' + i;

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
                            let obj = { statusCode: 200, status: "success", message: 'DayBook Set uploaded succsessfully', result: null };
                            res.send(obj);
                        }
                    }
                });
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while uploading CSV DayBook Set " + error.message);
            let obj = {
                statusCode: 400, status: "fail",
                message: " EERR####: Error while uploading CSV DayBook Set ", result: null
            };
            res.send(obj);
        }
    },
    onActiveDeactiveDS: async function (req, res) {
        try {
            req.body.EvolveUnit_ID = req.EvolveUser_ID ;
            let result = await Evolve.App.Services.eDoa.DayBookSet.SrvList.onActiveDeactiveDS(req.body);

            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while upate Daybook set ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while upate Daybook set!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Daybook Set Updated Successfully",
                    result: null
                };
                res.send(obj);
            }
        }
        catch (err) {
            Evolve.Log.error("Error while upate Daybook set", err);

            return res.json({
                statusCode: 500,
                status: 'fail',
                message: "Error while upate Daybook set",
                result: null
            });
        }
    },
    
}