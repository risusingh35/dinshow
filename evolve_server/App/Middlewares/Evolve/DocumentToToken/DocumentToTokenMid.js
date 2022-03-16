'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getDocumentToTokenList : async function (req, res, next) {
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
            Evolve.Log.error("Error while validating Document to Token "+validateEvolveData.error);
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

    addDocumentToToken : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocument_ID : Evolve.Joi.number().required(),
            EvolveDSToken_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("Error While validating add document to token  "+validateEvolveData.error);
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

    getSingleDocToTokenData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentToToken_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2203: Error while getting Single Bom "+validateEvolveData.error);
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

    updateDocumentToToken: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentToToken_ID : Evolve.Joi.number().required(),
            EvolveDocument_ID : Evolve.Joi.number().required(),
            EvolveDSToken_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while validating update document to token "+validateEvolveData.error);
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