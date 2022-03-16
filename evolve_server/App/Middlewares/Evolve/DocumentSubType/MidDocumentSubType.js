'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocumentSubType: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentType_ID: Evolve.Joi.number().required(),
            EvolveDocumentSubType_Name: Evolve.Joi.string().required(),
            EvolveDocumentSubType_Code: Evolve.Joi.string().required(),
            EvolveDocumentSubType_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2221: Error while adding Document Type "+validateEvolveData.error);
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

    updateDocumentSubType: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentSubType_ID: Evolve.Joi.number().required(),
            EvolveDocumentType_ID: Evolve.Joi.number().required(),
            EvolveDocumentSubType_Name: Evolve.Joi.string().required(),
            EvolveDocumentSubType_Code: Evolve.Joi.string().required(),
            EvolveDocumentSubType_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2221: Error while adding Document Type "+validateEvolveData.error);
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

    getDocumentSubTypeList : async function (req, res, next) {
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
             Evolve.Log.error(" EERR2223: Error while getting Document type List "+validateEvolveData.error);
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
    getSingleDocumentSubType : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentSubType_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2223: Error while getting Document type List "+validateEvolveData.error);
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