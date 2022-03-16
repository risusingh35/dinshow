'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMenuUrl: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.PageConfig.SrvList.getMenuUrl();
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Menu Url Not found",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0331: Error while getting menu url "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0331: Error while getting menu url "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getPageConfigList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Evolve.PageConfig.SrvList.getPageConfigListCount(search);
            let KeyList = await Evolve.App.Services.Evolve.PageConfig.SrvList.getPageConfigList(start, length, search);
            if (KeyList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Get Page Config List",
                    result: KeyList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: KeyList.recordset
                }
                var obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Page Config list",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0332: Error while getting page config list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0332: Error while getting page config list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    addPageConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.PageConfig.SrvList.addPageConfig(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Create Page Config",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Config Key Add Successfully ",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0333: Error while adding page config "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0333: Error while adding page config "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getSinglePageConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.PageConfig.SrvList.getSinglePageConfig(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On get Single data",
                    result: result.message
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
            Evolve.Log.error(" EERR0334: Error while getting  single page config "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0334: Error while getting  single page config "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    updatePageConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.PageConfig.SrvList.updatePageConfig(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Update Page Config",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Page Config Update Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0335: Error while updating page config "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0335: Error while updating page config "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deletePageConfig: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Evolve.PageConfig.SrvList.deletePageConfig(req.body);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error On Delete Page Config",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Page Config Key Delete Successfully",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0336: Error while deleting page config "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0336: Error while deleting page config "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}   