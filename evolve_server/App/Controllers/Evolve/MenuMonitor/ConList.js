'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getMenuMonitorList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = '';
            let date = req.body.date
            let d= date.split("-")
            console.log("d:::::::::::::::::", d);
            let newDate = d[1] + "/" + d[0] + "/" + d[2]
            console.log("newDate:::::::::::::::::", newDate);

            if (req.body.date !=  "" &&  req.body.date !=  null &&  req.body.date !=  undefined) {

                condition = " AND CONVERT(VARCHAR(20), emm.EvolveMenuMonitor_InTime, 101) = '" + newDate + "' "

            }


            let getMenuMonitorListCount = await Evolve.App.Services.Evolve.MenuMonitor.SrvList.getMenuMonitorListCount(search , condition);
            let getMenuMonitorList = await Evolve.App.Services.Evolve.MenuMonitor.SrvList.getMenuMonitorList(start, length, search , condition);
            if (getMenuMonitorList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get bom !",
                    result: getMenuMonitorList.message
                };
                res.send(obj);
            } else { 
                let resObj = {
                    noOfRecord: getMenuMonitorListCount.recordset[0].count,
                    records: getMenuMonitorList.recordset
                }
                console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::", resObj)
                console.log("resObj::::::::", resObj)
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: resObj
                };
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR0201: Error while getting Business Group List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0201: Error while getting Business Group List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },


}