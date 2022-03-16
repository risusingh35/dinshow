'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getBomList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getBomListCount = await Evolve.App.Services.Evolve.Bom.SrvList.getBomListCount(search);
            let getBomList = await Evolve.App.Services.Evolve.Bom.SrvList.getBomList(start, length,search);
            if (getBomList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get bom !",
                    result: getBomList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getBomListCount.recordset[0].count,
                    records: getBomList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Bom Master List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while getting Bom list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while getting Bom list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addBom: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let checkBomMaster = await Evolve.App.Services.Evolve.Bom.SrvList.checkBomMaster(req.body);
            if (checkBomMaster.recordset[0].count > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Bom already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.Bom.SrvList.addBom(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on add bom !",
                        result: null
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Bom master created successfully ",
                        result: null
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0202: Error while adding bom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0202: Error while adding bom "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getBomDisplaySeq: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.Bom.SrvList.getBomDisplaySeq(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "sucess",
                result: processData.recordsets[0]
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0203: Error while getting Bom Display Seq "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0203: Error while getting Bom Display Seq "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSingleBom: async function (req, res) {
        try {
            let processData = await Evolve.App.Services.Evolve.Bom.SrvList.getSingleBom(req.body);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Part bom master single list",
                result: processData.recordset
            };

            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0204: Error while getting single bom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0204: Error while getting single bom "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateBom: async function (req, res) {
        try {
            let checkBomMaster = await Evolve.App.Services.Evolve.Bom.SrvList.checkBomMasterEdit(req.body);
            if (checkBomMaster.recordset[0].count > 0) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Bom already exist !",
                    result: null
                };
                res.send(obj);
            } else {
                let result = await Evolve.App.Services.Evolve.Bom.SrvList.updateBom(req.body);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error on update bom !" ,
                        result: null 
                    };
                    res.send(obj);
                } else {
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Part bom master update successfully ",
                        result: result.recordsets
                    };
                    res.send(obj);
                }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0205: Error while updating bom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0205: Error while updating bom "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    deleteBom: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Bom.SrvList.deleteBom(req.body.id);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on delete bom baster !",
                    result: null,

                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Bom deleted Successfully ",
                    result: null,

                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0206: Error while deleting bom "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0206: Error while deleting bom "+error.message,
                result: null,

            };
            res.send(obj);
        }
    },

    getItemSearch: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.Bom.SrvList.getItemSearch(req.body.term);
            let obj = {
                statusCode: 200,
                status: "success",
                message: "Item search Successfully",
                result: result.recordset
            };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error(" EERR0207: Error while getting Item Search "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0207: Error while getting Item Search "+error.message,
                result: null
            };
            res.send(obj);
        }
    },




}