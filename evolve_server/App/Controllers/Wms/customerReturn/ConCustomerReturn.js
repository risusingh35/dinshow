'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    invoiceLineNoList : async function(req, res) {
        try {
            let InvoiceLineNoList = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.invoiceLineNoList(req.body.term);
           
            if(InvoiceLineNoList instanceof Error || InvoiceLineNoList.rowsAffected < 1){
                let obj = {
					statusCode: 400,
					status: "fail",
					message: "No Invoice Line List",
					result: null
				};
				res.send(obj);
            }else{
                let obj = {
					statusCode: 200,
					status: "success",
					message: "invoice Line List",
					result : InvoiceLineNoList.recordset
				};
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting invoice line number list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while getting invoice line number list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    invoiceLineDetails : async function(req, res) {
        try {
            let invoiceLineDetails = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.invoiceLineDetails(req.body);
            if(invoiceLineDetails instanceof Error || invoiceLineDetails.rowsAffected < 1){
                let obj = {
					statusCode: 400,
					status: "fail",
					message: "No Invoice Line Details",
					result: null
				};
				res.send(obj);
            }else{
                let obj = {
					statusCode: 200,
					status: "success",
					message: "Invoice Line Details",
					result : invoiceLineDetails.recordset
				};
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting invoice line number list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while getting invoice line number list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },
    
    holdLocationList : async function(req, res) {
        try {
            let holdLocationList = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.holdLocationList();
            
            if(holdLocationList instanceof Error || holdLocationList.rowsAffected < 1){
                let obj = {
					statusCode: 400,
					status: "fail",
					message: "No Location List",
					result: null
				};
				res.send(obj);
            }else{
                let obj = {
					statusCode: 200,
					status: "success",
					message: "Get Location List",
					result : holdLocationList.recordset
				};
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting location list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while getting loctaion list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    shippedPallets : async function (req, res) {
        try {
            let shippedPallets = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.shippedPallets(req.body);
            if(shippedPallets instanceof Error || shippedPallets.rowsAffected < 1){
                let obj = {
					statusCode: 400,
					status: "fail",
					message: "No Shipped Pallets",
					result: null
				};
				res.send(obj);
            }else{
                let obj = {
					statusCode: 200,
					status: "success",
					message: "Shipped Pallets List",
					result : shippedPallets.recordset
				};
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting shipped pallets list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while getting shipped pallets list "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    returnNewNcrNo : async function (req, res) {
        try {
            let returnNcrNo = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('QCNCR') 
				if (returnNcrNo == 0) {
					Evolve.Log.error("EERR0082 :Error while assign NCR number")
					let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign NCR number", result: null };
					res.send(obj);
				} else {
                    req.body.EvolveNCR_No = returnNcrNo;
                    let createNewNcrNo = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.createNewNcrNo(req.body);
                    if(createNewNcrNo instanceof Error || createNewNcrNo.rowsAffected < 1){
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "NCR Number Not Created",
                            result: null
                        };
                        res.send(obj);
                    }else{
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Ncr Number Created",
                            result : returnNcrNo
                        };
                        res.send(obj);
                    }
                }
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while generating new returnNcr Number"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while generating new returnNcr Number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    returnPallet : async function (req, res) {
        try {
            let customerReturnUom = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.customerReturnUom(req.body);
                    if(customerReturnUom instanceof Error || customerReturnUom.rowsAffected < 1){
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Error In Getting Customer Return UOM",
                            result: null
                        };
                        res.send(obj);
                    }else{
                        req.body.EvolveCustRtn_Uom = customerReturnUom.recordset[0].EvolveUom_Uom
                    }

            let customerReturnPalletNumber = await Evolve.App.Controllers.Common.ConCommon.getSerialNumber('PORECIEVEPALLET') 
				if (customerReturnPalletNumber == 0) {
					Evolve.Log.error("EERR0082 :Error while assign Customer Return Pallet Number")
					let obj = { statusCode: 400, status: "fail", message: "EERR0082 :Error while assign Customer Return Pallet Number", result: null };
					res.send(obj);
				} else {
                    req.body.EvolveCustRtnPallet_No = customerReturnPalletNumber;

                    let returnPallet = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.returnPallet(req.body);
                    console.log("returnPallet>>>>>>>>>>>>>>>>>>", returnPallet);
                    if(returnPallet instanceof Error || returnPallet.rowsAffected < 1){
                        let obj = {
                            statusCode: 400,
                            status: "fail",
                            message: "Return Pallet Not Created",
                            result: null
                        };
                        res.send(obj);
                    }else{
                        let obj = {
                            statusCode: 200,
                            status: "success",
                            message: "Return pallet Created",
                            result : returnPallet.recordset
                        };
                        res.send(obj);
                    }
                }
        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while generating new returnNcr Number"+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while generating new returnNcr Number "+error.message,
                result: null
            };
            res.send(obj);
        }
    },

    returnedPalletsList : async function (req, res) {
        try {
            let returnedPalletsList = await Evolve.App.Services.Wms.customerReturn.SrvCustomerReturn.returnedPalletsList(req.body);
            if(returnedPalletsList instanceof Error || returnedPalletsList.rowsAffected < 1){
                let obj = {
					statusCode: 400,
					status: "fail",
					message: "No Returned Pallets",
					result: null
				};
				res.send(obj);
            }else{
                let obj = {
					statusCode: 200,
					status: "success",
					message: "Returned Pallets List",
					result : returnedPalletsList.recordset
				};
                res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" EERR#####: Error while getting returned pallets list "+error.message);
            let obj = {
                statusCode: 400,
                status: "fail",
                message: " EERR#####: Error while getting returned pallets list "+error.message,
                result: null
            };
            res.send(obj);
        }
    }

}