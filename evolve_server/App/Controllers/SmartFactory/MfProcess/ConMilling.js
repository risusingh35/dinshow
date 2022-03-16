'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {


    getMillingWoList: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvMilling.getMillingWoList();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordsets[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0603: Error while getting milling Wo List "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0603: Error while getting milling Wo List "+error.message, result: null };
            res.send(obj);
        }
    },
    getMillingCompletedTriggers: async function (req, res) {
        try {
            let woList = await Evolve.App.Services.SmartFactory.MfProcess.SrvMilling.getMillingCompletedTriggers();
            if (woList instanceof Error || woList.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "No Work Order Found!", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Work Order List Successfully", result: woList.recordset[0] };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR0604: Error while getting milling completed triggers "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " EERR0604: Error while getting milling completed triggers "+error.message, result: null };
            res.send(obj);
        }
    },

}