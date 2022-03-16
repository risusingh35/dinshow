'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getStickerVarList: async function (req, res) {
        try {
            console.log("req.EvolveUnit_ID???????????/", req.EvolveUnit_ID);
            console.log("req.EvolveUser_ID???????????/", req.EvolveUser_ID);
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let Count = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.getStickerVarListCount(search);
            let List = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.getStickerVarList(start, length, search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get StickerVar List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "StickerVar List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get StickerVar list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get StickerVar list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 

    getSticker: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.getSticker(req.body.term);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Sticker List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Sticker List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Sticker list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Sticker list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnit: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.getUnit(req.body.term);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Unit List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Unit List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Unit list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Unit list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    careatStickerVar: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.careatStickerVar(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While careat Sticker Variable !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while careat Sticker Variable " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while careat Sticker Variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSinglestickerVarDetails : async function (req, res){
        try {
            let result = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.getSinglestickerVarDetails(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While careat Sticker Variable !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while careat Sticker Variable " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while careat Sticker Variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateStickerVar: async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.eMdm.labelVariablemaster.SrvList.updateStickerVar(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While careat Sticker Variable !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Company List",
                    result: null
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while careat Sticker Variable " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while careat Sticker Variable " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getUnitList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.Address.SrvList.getUnitList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Unit List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Unit List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Unit list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Unit list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}