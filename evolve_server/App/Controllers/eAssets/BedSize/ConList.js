'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addSizes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.BedSize.SrvList.addSizes(req.body);
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
                    message: "Sizes Created Success",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0119: Error while adding sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0119: Error while adding sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSizes: async function (req, res) {
        try {
            let start = parseInt(req.body.start);
            let length = parseInt(req.body.length);
            let search = req.body.search.value;

            let getSizesCount = await Evolve.App.Services.eAssets.BedSize.SrvList.getSizesCount();
            let getSizes = await Evolve.App.Services.eAssets.BedSize.SrvList.getSizesDatatableList(start, length);

            var obj = {
                'draw': req.body.draw,
                'recordsTotal': getSizesCount.recordset[0].count,
                'recordsFiltered': getSizesCount.recordset[0].count,
                'data': getSizes.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0120: Error while getting sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0120: Error while getting sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleSizes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.BedSize.SrvList.getSingleSizes(req.body.EvolveSize_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on Single Size",
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
            Evolve.Log.error(" EERR0121: Error while getting single sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0121: Error while getting single sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    editSizes: async function (req, res) {
        try {
            // req.body.EvolveUser_ID = req.EvolveUser_ID
            let userResponse = await Evolve.App.Services.eAssets.BedSize.SrvList.editSizes(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Process Updated Successfully",
                result: null
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0122: Error while editing Sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0122: Error while editing Sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteSizes: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eAssets.BedSize.SrvList.deleteSizes(req.body.id);
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
            Evolve.Log.error(" EERR0123: Error while deleting sizes "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0123: Error while deleting sizes "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

}