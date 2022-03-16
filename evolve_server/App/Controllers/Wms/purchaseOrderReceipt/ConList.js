'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    gateEntryNoList: async function (req, res) {
        try {
            let result = await Evolve.App.Services.Wms.PurchaseOrder.SrvPOReceive.gateEntryNoList(req.body.term);
            let obj = { statusCode: 200, status: "success", message: "Gate Entry Number List", result: result.recordsets[0] };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR0061: Error while gate entry number list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR0061: Error while gate entry number list "+error.message, result: null };
            res.send(obj);
        }
    },

    getAsnDetails : async function (req , res) {
        try {
            let result = await Evolve.App.Services.Wms.purchaseOrderReceipt.SrvList.getAsnDetails(req.body);
            let obj = { statusCode: 200, status: "success", message: "ASN  Details List!!", result: result.recordsets };
            res.send(obj);
        } catch (error) {
            Evolve.Log.error("EERR####: Error while Get ASN Details "+error.message);
            let obj = { statusCode: 400, status: "fail", message: "EERR####: Error while Get ASN Details "+error.message, result: null };
            res.send(obj);
        }
    }
}