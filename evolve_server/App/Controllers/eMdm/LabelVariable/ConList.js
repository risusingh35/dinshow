'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    GetStickerDetail: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eMdm.HarshMaster.SrvList.GetStickerDetailCount(search);
            let List = await Evolve.App.Services.eMdm.HarshMaster.SrvList.GetStickerDetailList(start, length, search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Currency List !",
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
                    message: "Currency List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Currency list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    GetStickerCode: async function (req, res) {
        try {
            let List = await Evolve.App.Services.eMdm.HarshMaster.SrvList.GetStickerCode();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Currency List !",
                    result: List.message
                };
                res.send(obj);
            } else {
              
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Currency List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Currency list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    setStickerDetail: async function (req, res) {
        try {
            
            let List = await Evolve.App.Services.eMdm.HarshMaster.SrvList.setStickerDetail(req.body);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Currency List !",
                    result: List.message
                };
                res.send(obj);
            } else {
              
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Currency List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Currency list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Currency list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
}