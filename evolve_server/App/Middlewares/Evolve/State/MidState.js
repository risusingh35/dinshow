'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getStateListAuth : async function (req, res, next) {
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
            Evolve.Log.error(" EERR3023: Error while authenticate get State "+validateEvolveData.error);
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

    addStateAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveState_Name: Evolve.Joi.string().required(),
            EvolveState_Code: Evolve.Joi.string().required(),
            EvolveState_City: Evolve.Joi.string().required(),
            EvolveState_Pin: Evolve.Joi.string().required(),
            EvolveState_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3024: Error while authenticate addStatusCodeAuth "+validateEvolveData.error);
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
    getSingleStateAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveState_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3025: Error while authenticate getSingle State Auth "+validateEvolveData.error);
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

    updateStateAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveState_ID: Evolve.Joi.number().required(),
            EvolveState_Name: Evolve.Joi.string().required(),
            EvolveState_Code: Evolve.Joi.string().required(),
            EvolveState_City: Evolve.Joi.string().required(),
            EvolveState_Pin: Evolve.Joi.string().required(),
            EvolveState_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3026: Error while authenticate update State Auth "+validateEvolveData.error);
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