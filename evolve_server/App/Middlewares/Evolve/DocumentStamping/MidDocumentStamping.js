'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addDocumentStamping: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveDocumentStamping_Code: Evolve.Joi.string().required(),
            EvolveDocumentStamping_StartX: Evolve.Joi.string().required(),
            EvolveDocumentStamping_StartY: Evolve.Joi.string().required(),
            EvolveDocumentStamping_EndX: Evolve.Joi.string().required(),
            EvolveDocumentStamping_EndY: Evolve.Joi.string().required(),
            EvolveDocumentStamping_ExtraText: Evolve.Joi.string().required().allow(''),
            EvolveDocumentStamping_Status: Evolve.Joi.boolean().required(),
           

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
    updateDocumentStamping: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentStamping_ID: Evolve.Joi.number().required(),
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveDocumentStamping_Code: Evolve.Joi.string().required(),
            EvolveDocumentStamping_StartX: Evolve.Joi.string().required(),
            EvolveDocumentStamping_StartY: Evolve.Joi.string().required(),
            EvolveDocumentStamping_EndX: Evolve.Joi.string().required(),
            EvolveDocumentStamping_EndY: Evolve.Joi.string().required(),
            EvolveDocumentStamping_ExtraText: Evolve.Joi.string().required().allow(''),
            EvolveDocumentStamping_Status: Evolve.Joi.boolean().required(),
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
    getDocumentStampingList: async function (req, res, next) {
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
    getSingleDocumentStamping: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocumentStamping_ID: Evolve.Joi.number().required(),
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
    checkDocumentStampingCode: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocument_ID: Evolve.Joi.number().required(),
            EvolveDocumentStamping_Code: Evolve.Joi.string().required(),
            EvolveDocumentStamping_ID: Evolve.Joi.number().required().allow(''),
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