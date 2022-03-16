'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessToMachineList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getProcessToMachineCount(search);
            let processtomachine = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getProcessToMachineList(start , length,search);
           if (processtomachine instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get process to machine list !",
                    result: null
                };
                res.send(obj);
            } else {
                let resultData = [];
                let processId = 0;
                let processName = "";
                let machineList = [];
                for (let i = 0; i < processtomachine.recordset.length; i++) {

                    if (processId == processtomachine.recordset[i].EvolveProcess_ID) {
                        machineList.push(processtomachine.recordset[i].EvolveMachine_Name)
                    } else {
                        if (processId != 0) {
                            resultData.push({
                                EvolveProcess_ID: processId,
                                EvolveProcess_Name: processName,
                                machineList: machineList
                            })
                            machineList = [];
                        }

                        processId = processtomachine.recordset[i].EvolveProcess_ID;
                        processName = processtomachine.recordset[i].EvolveProcess_Name;
                        machineList.push(processtomachine.recordset[i].EvolveMachine_Name)
                    }

                    if (i == (processtomachine.recordset.length - 1)) {
                        resultData.push({
                            EvolveProcess_ID: processId,
                            EvolveProcess_Name: processName,
                            machineList: machineList
                        })
                    }
                }
                let resObj = {
                    noOfRecord: resultData.length,
                    records: resultData
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process to Machine List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0361: Error while getting process to machine list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0361: Error while getting process to machine list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getProcessList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getProcessList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process List",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0362: Error while getting process list "+error.message);
            let obj = { 
                statusCode: 400,
                status: "fail",
                message: " EERR0362: Error while getting process list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMachineList: async function (req, res) {
        try {
            let apps = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getMachineList();
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Machine List",
                result: apps.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0363: Error while getting machine list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0363: Error while getting machine list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleProcessToMachine: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getSingleProcessToMachine(req.body);
            if (result instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Getting single process !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0364: Error while getting single process to machine "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0364: Error while getting single process to machine "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getProcessSelectList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.getProcessSelectList(req.body);
            console.log("getProcessSelectList>>> " , result)
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while  get  process list  !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Success ",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0365: Error while getting process select list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0365: Error while getting process select list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addProcessToMachine: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let deleteProcessToMachine = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.deleteProcessToMachine(req.body.EvolveProcess_id);
            if (deleteProcessToMachine instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete process to machine !",
                    result: null
                };
                res.send(obj);

            } else {
                let error = false;
                for (let i = 0; i < req.body.EvolveMachineList.length; i++) {
                    let details = {
                        EvolveMachine_ID : parseInt(req.body.EvolveMachineList[i].EvolveMachine_id) ,
                        EvolveProcess_ID : parseInt(req.body.EvolveProcess_id) ,
                        EvolveUser_ID : parseInt(req.EvolveUser_ID) ,
                    }
                    let result = await Evolve.App.Services.Evolve.ProcessToMachine.SrvList.addProcessToMachine(details);
                    if (result instanceof Error || result.rowsAffected < 1) {
                        error = true;
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error while asign process to machine !",
                            result: null
                        };
                        res.send(obj);
                        break;
                    }
                }
                if (error == false) {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Process to machine asigned successfully",
                        result: null
                    };
                    res.send(obj);
                }
            }

        } catch (error) {
            Evolve.Log.error(" EERR0366: Error while adding process to machine "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0366: Error while adding process to machine "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}