'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getDSTokenList: async function (req, res) {
        try {
            let EvolveUser_ID = req.EvolveUser_ID;
            let result = await Evolve.App.Services.Compliance.eInvoice.SrvDSToken.getDSTokenList(EvolveUser_ID);
            if (result instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "Error while get DS Token list!",
                    result: null
                };
                res.send(obj);
            } else {
                let PingTime = parseInt(Evolve.EvolveEinvoiceConfig.DSTOKENPINGTIME);
                for(let i = 0; i < result.recordset.length; i++){
                    if(parseInt(result.recordset[i].DiffDate) <= PingTime){
                        result.recordset[i].PingStatus = 'ONLINE';
                    }else{
                        result.recordset[i].PingStatus = 'OFFLINE';
                    }
                }
                let obj = {
                    statusCode: 200,
                    status: "Success",
                    message: "Success",
                    result: result.recordset
                };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while Get DS Token List  " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
}