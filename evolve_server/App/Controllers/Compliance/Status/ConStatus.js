'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getInvoiceList: async function (req, res) {
        try {
           let invoice = await Evolve.App.Services.Compliance.Status.SrvStatus.getInvoiceList(req.body);
            if (invoice instanceof Error) {
                let obj = {
                    statusCode: 400,
                    status: "fail",
                    message: "EERR3234 : Error while get Invoice List!",
                    result: null
                };
                res.send(obj); 
            }else {
                let einvoice = await Evolve.App.Services.Compliance.Status.SrvStatus.getEInvoiceList(req.body);
                let obj = {
                    statusCode: 200,
                    status: "success",
                    message: "success",
                    result: {
                        eInvoice :einvoice.recordset,
                        invoice :invoice.recordset
                    }    
                };
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" EERR3235: Error while getting Invoice List " + error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR3235: Error while getting Invoice List " + error.message,
                result: null
            };
            res.send(obj);
        }
    },

}