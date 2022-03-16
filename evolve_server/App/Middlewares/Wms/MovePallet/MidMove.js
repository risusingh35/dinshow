'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


	getPalletListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.array().required(),
            EvolveInventory_Refnumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2465: Error while getting Pallet List Auth "+validateEvolveData.error.toString());
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
	
	movePalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            EvolveReason_ID: Evolve.Joi.number().required().allow(null),
            EvolveToLocation_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
            locName : Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2466: Error while movePalletAuth "+validateEvolveData.error.toString());
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

    getReasonListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveInventory_Refnumber: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2467: Error while getting Reason List Auth "+validateEvolveData.error.toString());
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

    // Move pallet V1 middelwares
    getscannedPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({  
            EvolveInventory_SerialNo : Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3126 : Error while get scanned pallet Authentication  "+validateEvolveData.error.toString());
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
    movePalletV1Auth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveInventory_ID: Evolve.Joi.number().required(),
            // EvolveReason_ID: Evolve.Joi.number().required().allow(null),
            EvolveLocation_ID: Evolve.Joi.number().required(),
            // EvolveToLocation_ID: Evolve.Joi.number().required(),

            // EvolveItem_ID: Evolve.Joi.number().required(),
            // locName : Evolve.Joi.string().required(),
            // EvolveInventory_LotNumber : Evolve.Joi.string().required(),
            // EvolveInventory_RefNumber : Evolve.Joi.string().required(),
            // EvolveInventory_QtyOnHand : Evolve.Joi.number().required(),
            // EvolveLocation_FromID : Evolve.Joi.number().required(),
            // EvolveInventory_PostingStatus : Evolve.Joi.string().required(),
            // EvolveItem_Code : Evolve.Joi.string().required(),
            // FromLocName : Evolve.Joi.string().required(),
            // EvolveInventory_IsPicked : Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3127 : Error while movepalet authentication "+validateEvolveData.error.toString());
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
    rePrintPalletAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({  
            EvolveInventory_ID : Evolve.Joi.number().required(),
            EvolveInventory_RefNumber : Evolve.Joi.string().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3151 : Error while pallet print authentication  "+validateEvolveData.error.toString());
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