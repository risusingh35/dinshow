'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getGspList: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getGspList();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3234: Error while get Gsp list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3234 : Error while get Gsp list!",
                    result: null
                };
                res.send(obj);
            } else {
                
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3235: Error while getting Gsp List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3235: Error while getting Gsp List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCustomerCountList: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getCustomerCountList();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3236: Error while get Customer list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3236: Error while get Customer list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3237: Error while getting Customer List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3237: Error while getting Customer List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTotalEInvoiceProcess: async function (req, res) {
        try {
           let totalCount = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getTotalEInvoiceProcess();
            if (totalCount instanceof Error) {
                Evolve.Log.error(" EERR3238: Error while get Total E-Invoice Process list");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3238 : Error while get Total E-Invoice Process list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: totalCount.recordset
                    };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3242: Error while getting Total E-Invoice Process List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3242: Error while getting Total E-Invoice Process List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getTotalEInvoiceError: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getTotalEInvoiceError();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3243: Error while get Total E-Invoice Error list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3243 : Error while get Total E-Invoice Error list!",
                    result: null
                };
                res.send(obj);
            } else {
                 let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3249 : Error while getting Total E-Invoice Error List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3249 : Error while getting Total E-Invoice Error List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCompletedInvoiceList: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getCompletedInvoiceList();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3249 : Error while get Total E-Invoice count  and completed invoice  count data ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3249 : Error while get Total E-Invoice count  and completed invoice  count data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3250 : Error while get Total E-Invoice count  and completed invoice  count data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3250 : Error while get Total E-Invoice count  and completed invoice  count data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getLastTenDayData: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getLastTenDayData();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3249 : Error while get Last 10 Day E-Invoice data ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3249 : Error while get Last 10 Day E-Invoice data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3250 : Error while get Last 10 Day E-Invoice data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3250 : Error while get Last 10 Day E-Invoice data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getUnitWiseData: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getUnitWiseData();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3249 : Error while get Unit Wise data ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3249 : Error while get Unit Wise data !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3250 : Error while get Unit Wise data " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3250 : Error while get Unit Wise data " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getIOQueue: async function (req, res) {
        try {
           let result = await Evolve.App.Services.Compliance.Dashboard.SrvDashboard.getIOQueue();
            if (result instanceof Error) {
                Evolve.Log.error(" EERR3249 : Error while get IO Queue ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3249 : Error while get IO Queue !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3250 : Error while get IO Queue " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3250 : Error while get IO Queue " + error.message,
                result: null
            };
            res.send(obj);
        }
    },



}