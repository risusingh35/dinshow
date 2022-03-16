'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getLoginFailedAttempts: async function (req, res) {
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

                condition = "CONVERT(VARCHAR(20),EvolveLoginFailedAttempts_Time, 101) = '"+newDate+ "' AND "

            }


            let getLoginFailedAttemptsCount = await Evolve.App.Services.Evolve.LoginFailedAttempts.SrvList.getLoginFailedAttemptsCount(search , condition);
            let getLoginFailedAttempts = await Evolve.App.Services.Evolve.LoginFailedAttempts.SrvList.getLoginFailedAttempts(start, length, search , condition);
            if (getLoginFailedAttempts instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get bom !",
                    result: getLoginFailedAttempts.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getLoginFailedAttemptsCount.recordset[0].count,
                    records: getLoginFailedAttempts.recordset
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