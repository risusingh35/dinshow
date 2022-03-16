'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    
    getProcessTemplateList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessTemplateCount(search);

            let getProcessTemplateList = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessTemplateList(start , length,search);
            if (getProcessTemplateList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get process template list !",
                    result: getProcessTemplateList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: getProcessTemplateList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process template  list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0350: Error while getting process template list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0350: Error while getting process template list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProcessTemplate: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.addProcessTemplate(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while creating process template !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process template created succsessfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0351: Error while getting process template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0351: Error while getting process template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleProcessTempalte: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getSingleProcessTempalte(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process temlate single list",
                result: processData.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0352: Error while getting single process template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0352: Error while getting single process template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateProcessTempalte: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.updateProcessTempalte(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while updating process template !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process template updated succsessfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0353: Error while updating process template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0353: Error while updating process template "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessSequencePTN: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessSequencePTN();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while  get process sequence PTN !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Get process sequence PTN successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0354: Error while getting process sequence PTN "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0354: Error while getting process sequence PTN "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessSequencePN: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessSequencePN();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get process sequence PIN !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Get process sequence PIN successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0355: Error while getting process sequence PN "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0355: Error while getting process sequence PN "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    checkSequenceProcessName: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.checkSequenceProcessName(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while check sequence process name !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Check sequence process name successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0356: Error while sequence process name "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0356: Error while sequence process name "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessSequenceON: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessSequenceON(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting process sequence On !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Get process sequence on successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0357: Error while getting process sequence on "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0357: Error while getting process sequence on "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProcessSequence: async function (req, res) {
        try {
            console.log(" add sequence master controller called >> ");
            console.log("body daa is >> " , req.body) 
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.addProcessSequence(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while  adding process sequence",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process sequence created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0358: Error while adding process sequence "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0358: Error while adding process sequence "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessTeplateSequence: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.getProcessTeplateSequence(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process teplate single list",
                result: processData.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0359: Error while getting process template sequence "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0359: Error while getting process template sequence "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteProcessTempalte: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.deleteProcessTempalte(req.body.id);
            let resultseq = await Evolve.App.Services.Evolve.ProcessTemplate.SrvList.deleteProcessTempalteSeq(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while deleting process template !",
                    result: null,
                    resultseq: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process template deleted succsessfully ",
                    result: null,
                    resultseq: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0360: Error while deleting process template "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0360: Error while deleting process template "+error.message,
                result: null,
                resultseq: null
            };
            res.send(obj);
        }
    },

}