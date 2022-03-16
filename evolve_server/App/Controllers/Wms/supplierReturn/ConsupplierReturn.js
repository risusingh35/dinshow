'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getQcOrderList : async function (req,res){
        try {
            
            let result = await Evolve.App.Services.Wms.supplierReturn.SrvsupplierReturn.getQcOrderList(req.body.term);
            if (result instanceof Error || result.rowsAffected < 1) {
                Evolve.Log.error("Error while get qc order list")
                let obj = { statusCode: 400, status: "fail", message: "Error while get qc order list", result: null };
                   res.send(obj);
            }else{
                let obj = { statusCode: 200, status: "success", message: "QC Order List", result: result.recordset };
            res.send(obj);
            }
            
        } catch (error) {
            Evolve.Log.error(" Error while get qc order list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while get qc order list "+error.message, result: null };
            res.send(obj);
        }
    },

    getRejectPalletList : async function (req,res){
        try {
            let result = await Evolve.App.Services.Wms.supplierReturn.SrvsupplierReturn.getRejectPalletList(req.body.EvovleQCOrder_ID)
            if (result instanceof Error) {
                Evolve.Log.error("Error while get rejected pallet list")
                let obj = { statusCode: 400, status: "fail", message: "Error while get rejected pallet list", result: null };
                   res.send(obj);
            }
            else if(result.rowsAffected < 1){
                Evolve.Log.error("No Rejected Pallet Found For This QCOrder Number")
                let obj = { statusCode: 400, status: "fail", message: "No Rejected Pallet Found For This QCOrder Number", result: null };
                   res.send(obj);
            }
            else{
                let obj = { statusCode: 200, status: "success", message: "Reject Pallet List", result: result.recordset };
            res.send(obj);
            }

        } catch (error) {
            Evolve.Log.error(" Error while get rejected pallet list "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while get rejected pallet list "+error.message, result: null };
            res.send(obj);
        }
    },

    conformSupplierReturn : async function (req , res){
        try {
            let result = await Evolve.App.Services.Wms.supplierReturn.SrvsupplierReturn.conformSupplierReturn(req.body.supplierData)
            if(result instanceof Error || result.statusCode == 400){
                Evolve.Log.error("Error while conform supplier return")
                let obj = { statusCode: 400, status: "fail", message: "Error while conform supplier return", result: null };
                   res.send(obj);
            }
            else{
                let obj = { statusCode: 200, status: "success", message: "Supplier Return Successfully", result:null};
                res.send(obj);
            }
        } catch (error) {
            Evolve.Log.error(" Error while conform Supplier Return "+error.message);
            let obj = { statusCode: 400, status: "fail", message: " Error while conform Supplier Return "+error.message, result: null };
            res.send(obj);
        }
    }
}