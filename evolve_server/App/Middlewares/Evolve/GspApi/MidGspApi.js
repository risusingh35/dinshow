'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addGspApi: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSP_ID: Evolve.Joi.number().required(),
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveGSPApi_Code: Evolve.Joi.string().required(),
            EvolveGSPApi_URL: Evolve.Joi.string().required(),
            EvolveGSPApi_Method: Evolve.Joi.string().required(),
            EvolveGSPApi_Type: Evolve.Joi.string().required(),
            EvolveGSPApi_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2224: Error while adding Gsp " + validateEvolveData.error);
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
    updateGspApi: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveGSP_ID: Evolve.Joi.number().required(),
            EvolveGSPApi_Code: Evolve.Joi.string().required(),
            EvolveGSPApi_URL: Evolve.Joi.string().required(),
            EvolveGSPApi_Method: Evolve.Joi.string().required(),
            EvolveGSPApi_Type: Evolve.Joi.string().required(),
            EvolveGSPApi_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2225: Error while updating Gsp " + validateEvolveData.error);
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
    getGSPApiList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
    getSingleGSPApiData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
    getGspApiUrldata: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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