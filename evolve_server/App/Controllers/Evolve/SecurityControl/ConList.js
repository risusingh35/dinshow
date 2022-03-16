'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    saveSecurityControl : async function (req, res) {
        req.body.EvolveUser_ID = req.EvolveUser_ID;
        try {
            let result = await Evolve.App.Services.Evolve.SecurityControl.SrvList.saveSecurityControl(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Save Security Control Data !",
                    result: result.message
                };
                res.send(obj);
            } else { 
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Save Security Control Data Save Successfully",
                        result: null
                    };
                    res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Save Security Control Data - Controller "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Save Security Control Data - Controller "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    getSecurityControlData : async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.SecurityControl.SrvList.getSecurityControlData(req.body);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while Get Security Control Data !",
                    result: result.message
                };
                res.send(obj);
            } else { 
                    let obj = {
                        statusCode: 200,
                        status: "success",
                        message: "Security Control Data Get Successfully",
                        result: result.recordset[0]
                    };
                    res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Get Security Control Data - Controller "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Get Security Control Data - Controller "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    
}