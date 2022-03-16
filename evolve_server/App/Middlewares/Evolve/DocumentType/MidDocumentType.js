'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocumentType: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentType_Name: Evolve.Joi.string().required(),
            EvolveDocumentType_Code: Evolve.Joi.string().required(),
            EvolveDocument_Group: Evolve.Joi.string().required(),
            EvolveDocumentType_Status: Evolve.Joi.boolean().required(),
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

    updateDocumentTypeData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentType_ID: Evolve.Joi.number().required(),
            EvolveDocumentType_Name: Evolve.Joi.string().required(),
            EvolveDocumentType_Code: Evolve.Joi.string().required(),
            EvolveDocument_Group: Evolve.Joi.string().required(),
            EvolveDocumentType_Status: Evolve.Joi.boolean().required(),
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

    getDocumentTypeList : async function (req, res, next) {
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
    getSingleDocumentType : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentType_ID : Evolve.Joi.number().required(),
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