'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    addConfigAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEinvoiceConfig_Key: Evolve.Joi.string().required(),
            EvolveEinvoiceConfig_Value: Evolve.Joi.string().required(),
            EvolveEinvoiceConfig_Desc: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3102 : Error while validating add EInvoice config auth  "+validateEvolveData.error.toString());
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
    getSingleConfigDataAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEinvoiceConfig_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3103 : Error while validating eInvoice single config data auth "+validateEvolveData.error.toString());
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

    updateConfigAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEinvoiceConfig_Key: Evolve.Joi.string().required(),
            EvolveEinvoiceConfig_Value: Evolve.Joi.string().required(),
            EvolveEinvoiceConfig_Desc: Evolve.Joi.string().required().allow(''),
            EvolveEinvoiceConfig_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR3104 : Error while validating update EInvoice config api auth "+validateEvolveData.error.toString());
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
    getConfigListAuth : async function (req, res, next) {
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
            Evolve.Log.error(" EERR3105 : Error while getting config list auth "+validateEvolveData.error);
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