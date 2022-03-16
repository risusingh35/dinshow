'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getAddressList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let condition = "";
            // if(req.body.EvolveUnit_ID != '' && req.body.EvolveUnit_ID != null){
            //     condition = " INNER JOIN EvolveUnit eus ON  eus.EvolveUnit_ID = '"+ req.body.EvolveUnit_ID+"' AND eus.EvolveAddress_ID = ea.EvolveAddress_ID "
            // }else if(req.body.EvolveCompany_ID != '' && req.body.EvolveCompany_ID != null){
            //     condition = " INNER JOIN EvolveCompany ecs ON  ecs.EvolveCompany_ID = '"+ req.body.EvolveCompany_ID+"' AND ecs.EvolveAddress_ID = ea.EvolveAddress_ID "
            // }else if(req.body.EvolveBusinessGroup_ID != '' && req.body.EvolveBusinessGroup_ID != null){
            //     condition = " INNER JOIN EvolveBusinessGroup ebgs ON  ebgs.EvolveBusinessGroup_ID = '"+ req.body.EvolveBusinessGroup_ID+"' AND ebgs.EvolveAddress_ID = ea.EvolveAddress_ID "
            // }
            // console.log("condition===",condition)

            let Count = await Evolve.App.Services.eMdm.Address.SrvList.getAddressListCount(search, condition);
            let List = await Evolve.App.Services.eMdm.Address.SrvList.getAddressList(start, length, search, condition);
            if (List instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Address List !",
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
                    message: "Address List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Address list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Address list " + error.message,
                result: null
            };
            res.send(obj);
        }
    }, 
    getBusinessGroupList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.Address.SrvList.getBusinessGroupList();
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Business Group List !",
                    result: result.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Business Group List",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while get Business Group list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Business Group list " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    getCompanyList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.eMdm.Address.SrvList.getCompanyList(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While Get Company List !",
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
            Evolve.Log.error(" EERR####: Error while get Company list " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get Company list " + error.message,
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