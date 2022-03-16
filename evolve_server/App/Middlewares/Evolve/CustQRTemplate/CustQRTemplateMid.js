'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addCustQRTemplate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQRTemplate_Name: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Code: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Type: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Status: Evolve.Joi.boolean().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2221: Error while adding Cust QR Template "+validateEvolveData.error);
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

    updateCustQRTemplate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQRTemplate_ID: Evolve.Joi.number().required(),
            EvolveCustQRTemplate_Name: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Code: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Type: Evolve.Joi.string().required(),
            EvolveCustQRTemplate_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2221: Error while Update Cust QR Template "+validateEvolveData.error);
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

    getCustQRTemplateList : async function (req, res, next) {
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
             Evolve.Log.error(" EERR2223: Error while getting Cust QR Template List "+validateEvolveData.error);
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
    getSingleCustQRTemplate : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQRTemplate_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2223: Error while getting Cust QR Template List "+validateEvolveData.error);
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