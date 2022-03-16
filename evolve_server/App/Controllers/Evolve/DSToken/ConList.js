'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addDSToken: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DSToken.SrvList.addDSToken(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add DS Token!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "DS Token Add Successfully",
                    result: "Success"
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0237: Error while adding DS Token "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0237: Error while adding DS Token"+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getDSTokenList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.Evolve.DSToken.SrvList.getDSTokenListCount(search);
            let result = await Evolve.App.Services.Evolve.DSToken.SrvList.getDSTokenList(start, length, search);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get DS Token list!",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: result.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "DS Token list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0238: Error while getting DS Token list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0238: Error while getting DS Token list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUserList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DSToken.SrvList.getUserList();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get User list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0244: Error while getting User List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0244: Error while getting User List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSingleDSToken: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.DSToken.SrvList.getSingleDSToken(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get Single DS Token list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0244: Error while getting single DS Token "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0244: Error while getting single DS Token "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updateDSToken: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.DSToken.SrvList.updateDSToken(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update DS Token list!",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "DS Token Update Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0245: Error while updating DS Token "+error.message);
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