'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProductLineList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eMdm.ProductLine.SrvList.getProductLineListCount(search);
            let List = await Evolve.App.Services.eMdm.ProductLine.SrvList.getProductLineList(start, length, search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get ProductLine List !",
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
                    message: "ProductLine List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get ProductLine list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get ProductLine list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
}