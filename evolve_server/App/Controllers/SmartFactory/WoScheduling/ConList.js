'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getItemSearch: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getItemSearch(req.body.term);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Item search Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0755: Error while getting Item search " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0755: Error while getting Item search " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getWorkOrderList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getWorkOrderList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Work Order List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0756: Error while getting Work Order List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0756: Error while getting Work Order List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getShiftList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getShiftList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Shift List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0757: Error while getting Shift list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0757: Error while getting Shift list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getMachineList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getMachineList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Machine List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0758: Error while getting machine list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0758: Error while getting machine list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getDepartmentList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getDepartmentList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Department List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0759: Error while getting department list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0759: Error while getting department list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getItemList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Item List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0760: Error while getting Item list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0760: Error while getting Item list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWoSchedulingList: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getWoSchedulingList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get WoScheduling List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0761: Error while getting Wo Scheduling list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0761: Error while getting Wo Scheduling list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addWOScheduling: async function (req, res) {
        try {
            let error = false;
            console.log(req.body.tableData)
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            console.log("length=", req.body.tableData.length)
            for (let i = 0; i < req.body.tableData.length; i++) {
                let get_barcode_details = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('WOSSEQUENCE') // get po barcode details 
                if (get_barcode_details == 0) {
                    Evolve.Log.error("EERR0082 :Error while assign WOSSqc number")
                    let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
                    res.send(obj);
                    // get_barcode_details = {}
                } else {
                    req.body.EvolveWoSchedule_SEQ = get_barcode_details;
                    req.body.EvolveWoSchedule_OrderID = get_barcode_details;
                }

                // let WOSsqc = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getWOSSqcNo();
                // req.body.EvolveWoSchedule_SEQ = WOSsqc.recordset[0].EvolveWoSchedule_ID + 1;
                console.log("WOSSqcNew", req.body.EvolveWoSchedule_SEQ)
                let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.addWOScheduling(req.body, req.body.tableData[i]);
                if (result instanceof Error || result.rowsAffected < 1) {
                    error = true;
                }
                else {
                    error = false;
                }
            }
            if (error == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling add Success",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on add Wo Scheduling",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0762: Error while adding Wo Scheduling  " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0762: Error while adding Wo Scheduling  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteWos: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.deleteWos(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on delete WO Scheduling",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling delete Success",
                    result: null
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0763: Error while deleting Wos " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0763: Error while deleting Wos " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateWOSSqc: async function (req, res) {
        try {
            let errorMsg = false;
            let newSqc;
            for (let i = 0; i < req.body.WOSSqcList.length; i++) {
                newSqc = i + 1;
                console.log("newSqc", newSqc)
                let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.updateWOSSqc(req.body.WOSSqcList[i], newSqc);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "error on Update WO Scheduling Sqc",
                        result: null
                    };
                    res.send(obj);
                }
                else {
                    errorMsg = false;
                }
            }

            if (errorMsg == false) {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling Sqc Updated",
                    result: null
                };
                res.send(obj);
            }



        } catch (error) {
            Evolve.Log.error(" EERR0764: Error while updating WOSSqc " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0764: Error while updating WOSSqc " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getItemWorkOrderList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getItemWorkOrderList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Work Order List",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getListByWorkOrderID: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getListByWorkOrderID(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get List By Work Order",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getPreviousShiftAvailableTime: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getPreviousShiftAvailableTime(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on Update WO Scheduling Sqc",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Wo Scheduling Sqc Updated",
                    result: result.recordset
                };
                res.send(obj);
            }



        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getShiftMinMaxTime: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.WoScheduling.SrvList.getShiftMinMaxTime();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "error on get Shift Min Max Time",
                    result: null
                };
                res.send(obj);
            }
            else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: error.message,
                result: null
            };
            res.send(obj);
        }
    },

}