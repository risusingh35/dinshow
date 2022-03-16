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
            Evolve.Log.error(" EERR2458: Error while printing Pallet Auth "+validateEvolveData.error.toString());
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

    combinePalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            combinePallets : Evolve.Joi.array().required(),
            EvolveLocation_ID  : Evolve.Joi.number().required(),
            lotArray  : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2459: Error while combine Pallet Auth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2460: Error while printing Pallet Auth "+validateEvolveData.error.toString());
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

    // Combine pallet V1 middelwares
    getscannedPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({  
            EvolveInventory_RefNumber : Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3170 : Error while get scanned pallet Authentication  "+validateEvolveData.error.toString());
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
    combinePalletV1Auth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            combinePallets : Evolve.Joi.array().required(),
            EvolveLocation_ID  : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3171 : Error while combine Pallet Authentication "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2460: Error while printing Pallet Auth "+validateEvolveData.error.toString());
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