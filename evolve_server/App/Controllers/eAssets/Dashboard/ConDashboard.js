'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getTotalInBeds: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Dashboard.SrvDashboard.getTotalInBeds();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: result.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "total production booking",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0129: Error while getting total in Beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0129: Error while getting total in Beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    gettotalBeds: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Dashboard.SrvDashboard.gettotalBeds();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: result.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "total work order",
                    result: result.recordset
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0130: Error while getting total beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0130: Error while getting total beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    gettotalOutBeds: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Dashboard.SrvDashboard.gettotalOutBeds();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: result.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "total product order recievd",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0131: Error while getting total out beds "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0131: Error while getting total out beds "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWorkOrderInProgressData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Dashboard.SrvDashboard.getWorkOrderInProgressData();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: result.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "order in progress",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0132: Error while getting Work Order In Progress Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0132: Error while getting Work Order In Progress Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getWorkOrderCompletedData: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.Dashboard.SrvDashboard.getWorkOrderCompletedData();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: result.message,
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "order completed",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0133: Error while get Work Order Completed Data "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0133: Error while get Work Order Completed Data "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}
