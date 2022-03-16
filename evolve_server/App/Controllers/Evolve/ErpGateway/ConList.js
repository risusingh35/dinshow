'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAllErp: async function (req, res) {
        try {
            let getAllErp = await Evolve.App.Services.Evolve.ErpGateway.SrvList.getAllErp();
            if (getAllErp instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3074 : Error while getting All Erp list",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ERP added succsessfully",
                    result: getAllErp.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3074 : Error while getting All Erp list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3074 : Error while getting All Erp list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getErpGatewayList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let getErpGatewayList = await Evolve.App.Services.Evolve.ErpGateway.SrvList.getErpGatewayListCount(search);
            let getErpGatewayListDatatable = await Evolve.App.Services.Evolve.ErpGateway.SrvList.getErpGatewayListDatatable(start, length ,search);
            if (getErpGatewayListDatatable instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3075 : Error while get ERP Gateway list",
                    result: getErpGatewayListDatatable.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getErpGatewayList.recordset[0].count,
                    records: getErpGatewayListDatatable.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Erp Gateway list succsessfully ",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3075 : Error while get ERP Gateway list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3075 : Error while get ERP Gateway list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addErpGateWay: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let addErpGateWay = await Evolve.App.Services.Evolve.ErpGateway.SrvList.addErpGateWay(req.body);
            if (addErpGateWay instanceof Error || addErpGateWay.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3076 : Error while create ERP Gateway",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ERP Gateway added succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3076 : Error while create ERP Gateway "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3076 : Error while create ERP Gateway "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleErpGateWay: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.ErpGateway.SrvList.getSingleErpGateWay(req.body.EvolveERPGateway_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3077 : Error while get single ERP Gateway",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Single erp Gateway",
                    result: result.recordset[0]
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3077 : Error while get single ERP Gateway "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3077 : Error while get single ERP Gateway "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateErpGateWay: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID
            let updateErpGateWay = await Evolve.App.Services.Evolve.ErpGateway.SrvList.updateErpGateWay(req.body);
            if (updateErpGateWay instanceof Error || updateErpGateWay.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3078 : Error while update ERP Gateway",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "ERP Gateway updated succsessfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error("EERR3078 : Error while update ERP Gateway "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "EERR3078 : Error while update ERP Gateway "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}