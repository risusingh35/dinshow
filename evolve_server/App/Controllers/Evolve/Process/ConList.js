'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getProcessList = await Evolve.App.Services.Evolve.Process.SrvList.getProcessListCount(search);
            let getProcessListDatatable = await Evolve.App.Services.Evolve.Process.SrvList.getProcessListDatatable(start, length ,search);
            if (getProcessListDatatable instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get process list !",
                    result: getProcessListDatatable.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getProcessList.recordset[0].count,
                    records: getProcessListDatatable.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Get process list succsessfully ",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0344: Error while getting process list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0344: Error while getting process list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProcess: async function (req, res) {
        try {
            let searchData = {
                processName: req.body.processName,
                processDescription: req.body.processDescription
            };
            let addProcess = await Evolve.App.Services.Evolve.Process.SrvList.addProcess(searchData);
            if (addProcess instanceof Error || addProcess.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while adding process !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process added succsessfully",
                    result: addProcess.recordsets[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0345: Error while adding process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0345: Error while adding process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleProcess: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Process.SrvList.getSingleProcess(req.body.EvolveProcess_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single processs !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single process",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0346: Error while getting single process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0346: Error while getting single process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateProcess: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Process.SrvList.updateProcess(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while updating process !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process updated successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0347: Error while updating process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0347: Error while updating process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteProcess: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Process.SrvList.deleteProcess(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while deleting process !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0348: Error while deleting process "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0348: Error while deleting process "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectProcessValidation: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.Process.SrvList.selectProcessValidation(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process validation",
                result: processData.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0349: Error while selecting process validation "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0349: Error while selecting process validation "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}