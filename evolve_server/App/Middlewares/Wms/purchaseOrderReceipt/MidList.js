'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    
    checkUomConvAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            CurrentUOM: Evolve.Joi.number().required(),
            ContverUOM: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2468: Error while check Uom Conv Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    getPoDetailsByPoIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2469: Error while get Po Details By Po Id Auth  "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    getPoDetailsByLineNumberAndPoIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
            EvolvePurchaseOrderDetail_Line: Evolve.Joi.array().required(),
            EvolveSupplier_Invoice: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2470: Error while get Po Details By Line Number And PoId Auth  "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    receivePurchaseOrderAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrderDetail_ID: Evolve.Joi.number().required(),
            EvolvePurchaseOrderDetail_QuantityReceived: Evolve.Joi.number().required(),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveInventory_CustLotRef: Evolve.Joi.string().required().allow(''),
            EvolveTransitionHistory_SupplierInvoice_ChallanNumber: Evolve.Joi.string().required(),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveTransitionHistory_GateEntryNumber: Evolve.Joi.string().required().allow(''),
            EvolveTransitionHistory_GateEntryDate: Evolve.Joi.string().required().allow(''),
            EvolveTransitionHistory_SupplierShipDate: Evolve.Joi.string().required().allow(''),
            EvolveTransitionHistory_SupplierShipLocation: Evolve.Joi.string().required().allow(''),
            EvolveUOM_ID: Evolve.Joi.number().required(),
            CurrentUOM: Evolve.Joi.number().required(),
          
         

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2471: Error while receive Purchase Order Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    //middlewares for recieve cooper

    closePOAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2472: Error while close PO Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },
    receivePurchaseOrder: function (req, res, next) {
       
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrderDetail_ID: Evolve.Joi.number().required(),
            EvolvePurchaseOrderDetail_QuantityReceived: Evolve.Joi.number().required(),
            EvolveInventory_LotNumber: Evolve.Joi.string().required(),
            EvolveInventory_CustLotRef: Evolve.Joi.string().required().allow(''),
            EvolvePOTransInvoice_number: Evolve.Joi.string().required().allow(''),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            EvolveUOM_ID: Evolve.Joi.number().required(),
            // CurrentUOM: Evolve.Joi.number().required(),
            poLineClose :  Evolve.Joi.required(),
            EvolvePOHead_EWaybillNUm: Evolve.Joi.string().required().allow(''),
            EvoveGate_ID: Evolve.Joi.string().required().allow(''),
            EvolvePOHead_BOEDate: Evolve.Joi.string().required().allow(''),
            EvolvePOHead_BOENO: Evolve.Joi.string().required().allow(''),
            EvolvePOTransExpriryDate: Evolve.Joi.required().allow(''),
            EvolvePOTransGst_number: Evolve.Joi.string().required().allow(''),
            EvolvePOTransReceiptDate: Evolve.Joi.required().allow(null),
            EvolvePOTrans_PackingSlipNO: Evolve.Joi.string().required().allow(''),
            unlimitedPo :Evolve.Joi.required(),
            EvolvePOHead_GateEntryDate: Evolve.Joi.string().required(),
            EvolvePOHead_ShipDate: Evolve.Joi.string().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2473: Error while receive Purchase Order "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    deletePalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            removeQty: Evolve.Joi.number().required(),
            EvolvePOTransPalletNum: Evolve.Joi.string().required(),
           

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2474: Error while delete Pallet Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },
    updateSinglePalletDataAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            updatedQty: Evolve.Joi.number().required(),
            EvolvePOTransPalletNum: Evolve.Joi.string().required(),
            currentQty: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2475: Error while update Single Pallet Data Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

    
    getPoLineListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2476: Error while  get Single Pallet Data Auth "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },
    getSummary: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
             EvolveInventory_LotNumber: Evolve.Joi.string().required().allow(''),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2623: Error while authenticate get summary "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },
    printAllPalletsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            printArray: Evolve.Joi.array().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2624: Error while authenticate print all pallets "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },
    checkPoStatusAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePurchaseOrder_ID: Evolve.Joi.number().required(),
          });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2474: Error while authenticate chek po status "+validateEvolveData.error.toString());
            res.send({
                statusCode: 400,
                status: 'fail',
                message: validateEvolveData.error.toString(),
                result: null
            });
        } else {
            next();
        }
    },

}