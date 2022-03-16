'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getQCTemplateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getQCTemplateListCount(search);
            let items = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getQCTemplateList(start, length,search);
            if (items instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on QC Template list !",
                    result: items.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: items.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Qc Template list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0376: Error while getting QC Template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0376: Error while getting QC Template list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addQCTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.addQCTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while creating QC template !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC template created succsessfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0377: Error while getting QC Template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0377: Error while getting QC Template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleQCTemplate: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getSingleQCTemplate(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "QC temlate single list",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0378: Error while getting Single QC Template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0378: Error while getting Single QC Template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateQCTempalte: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.updateQCTempalte(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while updating QC template !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC template updated succsessfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0379: Error while update QC Tempalte "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0379: Error while update QC Tempalte "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getAllQCTemplateList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getAllQCTemplateList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get QC Temp List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0380: Error while update all QC Tempalte list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0380: Error while update all QC Tempalte list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addQCValue: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.addQCValue(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while creating QC Value !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "QC Value created succsessfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0381: Error while add QC value "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0381: Error while add QC value "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleQCTempProcessList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getSingleQCTempProcessList(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "QC Process teplate single list",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0382: Error while getting Single QC Temp process list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0382: Error while getting Single QC Temp process list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getQCVSequenceNo: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.QualityCheck.SrvList.getQCVSequenceNo(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while QC Val Sequence !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "succsessfully ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0383: Error while getting getting QCV Sequence No "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0383: Error while getting getting QCV Sequence No "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}