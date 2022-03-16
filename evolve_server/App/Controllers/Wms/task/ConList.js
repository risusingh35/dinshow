'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getAllTaskList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let count = await Evolve.App.Services.Wms.rack.SrvList.getAllRackListCount(search);
            let list = await Evolve.App.Services.Wms.task.SrvList.getAllTaskList(start, length, search);
    
            if (list instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get Task List !",
                    result: null
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: list.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Task List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while getting task list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while getting task list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },



}