'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getLicenceList: async function(req, res) {
        try {
            console.log("req>>>>>>>>>", req.body);
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let Count = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceList.getLicenceListCount(search);
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceList.getLicenceList(start, length, search);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Key Value List !",
                    result: List.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: Count.recordset[0].count,
                    records: List.recordset
                }
                console.log(">>>>>>>>>>>>>>>>>>>>>.....", resObj);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Key Value List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Key Value list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Key Value list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}