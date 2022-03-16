'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getSectionList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let itemsCount = await Evolve.App.Services.Evolve.Section.SrvList.getSectionListCount(search);
            let items = await Evolve.App.Services.Evolve.Section.SrvList.getSectionList(start, length,search);
            if (items instanceof Error ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while getting section list !"   ,
                    result: items.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: itemsCount.recordset[0].count,
                    records: items.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0398: Error while getting section list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0398: Error while getting section list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addsection: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Section.SrvList.addsection(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while add section !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section created successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0399: Error while adding section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0399: Error while adding section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleSection: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Section.SrvList.getSingleSection(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get single section",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section single list",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0400: Error while getting single section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0400: Error while getting single section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSection: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Section.SrvList.deleteSection(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while delete section !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section deleted successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0401: Error while deleting section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0401: Error while deleting section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateSection: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.Section.SrvList.updateSection(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while update section",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Section Updated successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0402: Error while updating section "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0402: Error while updating section "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
}