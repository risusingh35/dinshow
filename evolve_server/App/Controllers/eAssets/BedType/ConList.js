'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addTypes: async function (req, res) {
        try {

            let result = await Evolve.App.Services.eAssets.BedType.SrvList.addTypes(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Query",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Types Created Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0124: Error while adding types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0124: Error while adding types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getTypes: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;

            let getTypesCount = await Evolve.App.Services.eAssets.BedType.SrvList.getTypesCount();
            let getTypes = await Evolve.App.Services.eAssets.BedType.SrvList.getTypesDatatableList(start, length);

            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getTypesCount.recordset[0].count,
                'recordsFiltered': getTypesCount.recordset[0].count,
                'data': getTypes.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0125: Error while getting types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0125: Error while getting types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleTypes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.BedType.SrvList.getSingleTypes(req.body.EvolveType_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on single types",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process",
                    result: result.recordset

                };

                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0126: Error while getting Single types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0126: Error while getting Single types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editTypes: async function (req, res) {
        try {
            // req.body.EvolveUser_ID = req.EvolveUser_ID
            let userResponse = await Evolve.App.Services.eAssets.BedType.SrvList.editTypes(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process Updated Successfully",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0127: Error while editing types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0127: Error while editing types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteTypes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.BedType.SrvList.deleteTypes(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Process",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Process Deleted Successfully!",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0128: Error while deleting types "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0128: Error while deleting types "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}