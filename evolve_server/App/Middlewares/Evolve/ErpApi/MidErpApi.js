'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addErpApi: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERP_ID: Evolve.Joi.number().required(),
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveERPApi_Code: Evolve.Joi.string().required(),
            EvolveERPApi_URL: Evolve.Joi.string().required(),
            EvolveERPApi_Method: Evolve.Joi.string().required(),
            EvolveERPApi_Type: Evolve.Joi.string().required(),
            EvolveERPApi_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2224: Error while adding Erp Api " + validateEvolveData.error);
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
    updateErpApi: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERP_ID: Evolve.Joi.number().required(),
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveERPApi_Code: Evolve.Joi.string().required(),
            EvolveERPApi_URL: Evolve.Joi.string().required(),
            EvolveERPApi_Method: Evolve.Joi.string().required(),
            EvolveERPApi_Type: Evolve.Joi.string().required(),
            EvolveERPApi_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2225: Error while updating Erp Api " + validateEvolveData.error);
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
    getERPApiList: async function (req, res, next) {
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
            Evolve.Log.error(" EERR2226: Error while getting Erp Api List " + validateEvolveData.error);
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
    getSingleERPApiData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Erp Api " + validateEvolveData.error);
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
    getErpApiUrldata: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Erp Api " + validateEvolveData.error);
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