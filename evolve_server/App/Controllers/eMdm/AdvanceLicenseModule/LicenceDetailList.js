'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getlicenceDetailList: async function(req, res) {
        try {
            console.log("req>>>>>>>>>", req.body);
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = ""
            if (req.body.EvolveLicence_ID != "" && req.body.EvolveLicence_ID != null && req.body.EvolveLicence_ID != undefined) {
                condition += " eld.EvolveLicence_ID = " + req.body.EvolveLicence_ID + "AND "
            }
            let Count = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceDetailList.getlicenceDetailListCount(search, condition);
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceDetailList.getlicenceDetailList(start, length, search, condition);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get licenceDetail List !",
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
                    message: "licenceDetail List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licenceDetail list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licenceDetail list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getlicencelNumber: async function(req, res) {
        try {
            let List = await Evolve.App.Services.eMdm.AdvanceLicenseModule.LicenceDetailList.getlicencelNumber();
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get licence Number List !",
                    result: null
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "licence List",
                    result: List.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get licence Number list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get licence Number list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }
}