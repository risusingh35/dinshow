'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getAllAppList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;

            let getAllAppListCount = await Evolve.App.Services.Evolve.AppMaster.SrvList.getAllAppListCount(search);
            let getAllAppList = await Evolve.App.Services.Evolve.AppMaster.SrvList.getAllAppList(start, length,search);
    
            if (getAllAppList instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on get app list !",
                    result: getAllAppList.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: getAllAppListCount.recordset[0].count,
                    records: getAllAppList.recordset
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "App Master List",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR32519: Error while getting App list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32519: Error while getting App list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    selectSingleApp : async function (req, res) {
        try {

            let selectSingleApp = await Evolve.App.Services.Evolve.AppMaster.SrvList.selectSingleApp(req.body);
            if (selectSingleApp instanceof Error || selectSingleApp.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on select single app list !",
                    result: selectSingleApp.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "single app master",
                    result: selectSingleApp.recordset
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR32520: Error while getting single app  "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32520: Error while getting single app  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addNewApp : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;
            let getSequenceId = await Evolve.App.Services.Evolve.AppMaster.SrvList.getSeqenceId();
            if (getSequenceId instanceof Error || getSequenceId.rowsAffected < 1 ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error While get sequence id ",
                    result: getSequenceId.message
                };
                res.send(obj);
            } else {
            req.body.EvolveApp_SEQ = getSequenceId.recordset[0].EvolveApp_SEQ;

            let addNewApp = await Evolve.App.Services.Evolve.AppMaster.SrvList.addNewApp(req.body);
            if (addNewApp instanceof Error || addNewApp.rowsAffected < 1 ) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error on adding new app !",
                    result: addNewApp.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "new app master added",
                    result: null
                };
                res.send(obj);
            }
        }
            
        } catch (error) {
            Evolve.Log.error(" EERR32521: Error while adding app  "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32521: Error while adding app  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    updateApp : async function (req, res) {
        try {
            req.body.EvolveUser_ID = req.EvolveUser_ID;

            let updateSeqNumber = await Evolve.App.Services.Evolve.AppMaster.SrvList.updateSeqNumber(req.body.EvolveApp_SEQ);

            let updateApp = await Evolve.App.Services.Evolve.AppMaster.SrvList.updateApp(req.body);

            if (updateApp instanceof Error || updateApp.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error in updating new app !",
                    result: updateApp.message
                };
                res.send(obj);
            } else {
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "new app master updated",
                    result: updateApp.recordset
                };
                res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" EERR32522: Error while updating app  "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR32522: Error while updating app  "+error.message,
                result: null
            };
            res.send(obj);
        }
    },


}