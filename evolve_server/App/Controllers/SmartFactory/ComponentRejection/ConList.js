'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getComponentRejectionList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.ComponentRejection.SrvList.getComponentRejectionList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get component rejection list",
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
            Evolve.Log.error(" EERR0552: Error while getting Component Rejection List "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0552: Error while getting Component Rejection List "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addScrapItem: async function (req, res) {
        try {
            let result = await Evolve.App.Services.SmartFactory.ComponentRejection.SrvList.addScrapItem(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on add scrap",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Scrap added successfully",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0553: Error while adding a scrap "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0553: Error while adding a scrap "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}