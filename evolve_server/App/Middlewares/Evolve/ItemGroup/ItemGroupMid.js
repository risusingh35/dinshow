'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getItemGroupListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2237: Error while getting Item Group List Auth "+validateEvolveData.error.toString());
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
    addItemGroupAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItemGroup_Name: Evolve.Joi.string().required(),
            EvolveItemGroup_Code: Evolve.Joi.string().required(),
            EvolveItemGroup_Desc: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2238: Error while adding Item Group Auth "+validateEvolveData.error.toString());
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
    getSingleGroupDatagAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
             EvolveItemGroup_ID: Evolve.Joi.number().required(),
           });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2239: Error while getting Single Group Data gAuth "+validateEvolveData.error.toString());
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

    updateItemGroupAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveItemGroup_Name: Evolve.Joi.string().required(),
            EvolveItemGroup_Code: Evolve.Joi.string().required(),
            EvolveItemGroup_Desc: Evolve.Joi.string().required().allow(''),
            EvolveItemGroup_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2240: Error while updating Item Group Auth "+validateEvolveData.error.toString());
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