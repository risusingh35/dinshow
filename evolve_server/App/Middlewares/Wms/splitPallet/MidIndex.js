'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = { 
    getInventoryListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_LotNumber : Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2477: Error while getting Inventory List Auth "+validateEvolveData.error.toString());
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

    splitPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID : Evolve.Joi.number().required(),
            EvolveInventory_QtyOnHand : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2478: Error while spliting Pallet Auth "+validateEvolveData.error.toString());
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

    printPalletAuth : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID : Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2479: Error while printing Pallet Auth "+validateEvolveData.error.toString());
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

    // V1 middleware 

    getScannedPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({  
            EvolveInventory_RefNumber : Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3194 : Error while get scanned pallet Authentication  "+validateEvolveData.error.toString());
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
    splitPalletV1Auth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID : Evolve.Joi.number().required(),
            EvolveInventory_QtyOnHand : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3195 : Error while spliting Pallet Auth "+validateEvolveData.error.toString());
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
    printPalletV1Auth : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID : Evolve.Joi.number().required(),
            EvolveInventory_RefNumber : Evolve.Joi.string().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2479: Error while printing Pallet Auth "+validateEvolveData.error.toString());
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