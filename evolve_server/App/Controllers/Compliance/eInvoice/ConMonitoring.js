'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    ReprocessEinvConfig: async function (req, res) {
        try {
            console.log("Controller ========ReprocessEinvConfig ============")
            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/restartEinvConfig';
            console.log("apiUrl==============", apiUrl)
            let response = await Evolve.Axios.get(apiUrl);
            if (response.data.result instanceof Error || response.data.result.rowsAffected < 1) {
                let obj = { statusCode: 400, status: "fail", message: "Error while Get config Data", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "EInvoice Config Restart SuccessFully", result: response.data.result };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR0098: Error while Reprocess Einv Config " + error.message,
                result: null
            };
            res.send(obj);
        }
    },
    EInvoiceFuncStatus: async function (req, res) {
        try {
            let apiUrl = Evolve.Config.IOSERVERURL + 'api/v1/eInvoice/funcStatus';
            let response = await Evolve.Axios.get(apiUrl);
            if (response.data.result instanceof Error) {
				let obj = { statusCode: 400, status: "fail", message: "Error while Get EInvoice Func Status", result: null };
				res.send(obj);
			} else {
				let obj = { statusCode: 200, status: "success", message: "SuccessFully", result: response.data.result };
				res.send(obj);
			}
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "IO Server Not Started",
                result: null
            };
            res.send(obj);
        }
    },
    eInvoiceStartFunction: async function (req, res) {
        try {
            let apiUrl = Evolve.EvolveEinvoiceConfig.EINVBASEURL+'api/v1/eInvoice/startFunction/'+req.body.functionName;
            console.log("apiUrl ============================",apiUrl)
            let response = await Evolve.Axios.get(apiUrl);
            if (response.data.result instanceof Error) {
                let obj = { statusCode: 400, status: "fail", message: "Error while Get EInvoice Func Status", result: null };
                res.send(obj);
            } else {
                let obj = { statusCode: 200, status: "success", message: "Function Restart Successfully", result: null };
                res.send(obj);
            }
        } catch (error) {
            let obj = {
                statusCode: 400,
                status: "fail",
                message: "IO Server Not Started",
                result: null
            };
            res.send(obj);
        }
    },
}