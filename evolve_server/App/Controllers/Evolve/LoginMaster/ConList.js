'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getLogInList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = "";
            let date = req.body.date
            let d= date.split("-")
            console.log("d:::::::::::::::::", d);
            let newDate = d[1] + "/" + d[0] + "/" + d[2]
            console.log("newDate:::::::::::::::::", newDate);

            if (req.body.date !=  "" &&  req.body.date !=  null &&  req.body.date !=  undefined) {

                condition = "AND CONVERT(VARCHAR(20),el.EvolveLogin_InTime, 101) =  '"+newDate+ "' "

            }


            let getLogInListCount = await Evolve.App.Services.Evolve.LoginMaster.SrvList.getLogInListCount(search , condition);
            let getLogInList = await Evolve.App.Services.Evolve.LoginMaster.SrvList.getLogInList(start, length, search , condition);
            if (getLogInList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get bom !",
                    result: getLogInList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getLogInListCount.recordset[0].count,
                    records: getLogInList.recordset
                }
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