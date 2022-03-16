'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    
    getQCBarcodeData: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let tabelData = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQCTabelData(req.body);
            if (tabelData instanceof Error || tabelData.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Data Not Found",
                    result: null
                };
                res.send(obj);
            }
            else {
                let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getQCBarcodeData(req.body);
                if (result.rowsAffected > 0) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Scan Barcode Success",
                        result: {
                            tabelData: tabelData.recordset,
                            templateData: result.recordset
                        }
                    };
                    res.send(obj);
                }
                else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Scan Barcode Success",
                        result: {
                            tabelData: tabelData.recordset,
                            templateData: result.recordset
                        }
                    };
                    res.send(obj);
                }
            }


        } catch (error) {
            Evolve.Log.error(" EERR0722: Error while getting QC Barcode Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0722: Error while getting QC Barcode Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
    QcProcessOky: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.QcProcessOky(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on QC Oky Process",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Process Oky Success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0723: Error while getting QcProcessOky "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0724: Error while getting All Location List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllLocationList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.getAllLocationList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Location",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0724: Error on QcProcess Reject "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0724: Error on QcProcess Reject "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    QcProcessReject: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.QualityCheck.SrvList.QcProcessReject(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on QC Reject Process",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Reject Success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0725: Error on QcProcess Reject "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0725: Error on QcProcess Reject "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}

function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}