'use strict';
const Evolve = require('../../../../Boot/Evolve');

module.exports = {


    getCreditTermsList: async function (req, res) {
        try {
            let start = parseInt(req.body.startFrom);
            let length = parseInt(req.body.displayRecord);
            let search = req.body.search;
            let count = await Evolve.App.Services.eDoa.creditTerms.SrvList.getCreditTermsListCount(search ,req.EvolveUser_ID);
            let result = await Evolve.App.Services.eDoa.creditTerms.SrvList.getCreditTermsList(start, length, search ,req.EvolveUser_ID);
            if (result instanceof Error) {
            
                Evolve.Log.error(" EERR####: Error while get credit terms list ");
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR#### : Error while get credit terms list!",
                    result: result.message
                };
                res.send(obj);
            } else {
                let resObj = {
                    noOfRecord: count.recordset[0].count,
                    records: result.recordset
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
            Evolve.Log.error(" EERR####: Error while get credit terms list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while get credit terms list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    addNewCustomerSupplier : async function (req, res) {
        try {
            console.log("called:::::::::::::::::::::::");
            console.log('wwdwasedasdasfafdfsads',req.body);
        } catch (error) {
            Evolve.Log.error(" EERR####: Error while Add new Customer Supplier "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR####: Error while Add new Customer Supplier "+error.message,
                result: null
            };
            res.send(obj);
        }
    }

}