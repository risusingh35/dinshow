'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getEvolvePageList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
    
           

            let count = await Evolve.App.Services.Evolve.EvolvePage.SrvList.getEvolvePageListCount(search);

            let result = await Evolve.App.Services.Evolve.EvolvePage.SrvList.getEvolvePageList(start, length, search);

            if (result instanceof Error) {

                Evolve.Log.error(" EERR####: Error while Evolve Page List ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while Evolve Page List!",
                    result: result.message
                };
                res.send(obj);
            } else {

                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset ,
                }
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: resObj
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Evolve Page List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Evolve Page List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    deleteEvolvePageList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Evolve.EvolvePage.SrvList.deleteEvolvePageList(req.body.EvolvePage_ID);
            if (result instanceof Error || result.rowsAffected < 1) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while deleting Record !",
                    result: null
                };
                res.send(obj);
            } else {

                let result = await Evolve.App.Services.Evolve.EvolvePage.SrvList.deleteEvolvePageFieldetails(req.body.EvolvePage_ID);
                if (result instanceof Error || result.rowsAffected < 1) {
                    let obj = {
                        statusCode: 400,
                        status: "fail",
                        message: "Error while deleting Record !",
                        result: null
                    };
                    res.send(obj);
                } else {



                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "Record deleted succsessfully",
                    result: null
                };
                res.send(obj);
            }
            }
        } catch (error) {
            Evolve.Log.error(" EERR0330: Error while deleting Record " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0330: Error while deleting Record " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}