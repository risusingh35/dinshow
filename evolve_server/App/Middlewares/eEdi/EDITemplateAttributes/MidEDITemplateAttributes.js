'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addEDITemplateAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplate_ID: Evolve.Joi.number().required(),
            EvolveEDITemplateAttributes_Parent: Evolve.Joi.number().required(),
            EvolveEDITemplateAttributes_Code: Evolve.Joi.string().required(),
            // EvolveEDITemplateAttributes_Type: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Default: Evolve.Joi.string().required(),
            // EvolveEDITemplateAttributes_Group: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveEDITemplateAttributes_IsDefault: Evolve.Joi.boolean().required(),
            EvolveEDITemplateAttributes_Rules: Evolve.Joi.string().required().allow(''),

            

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
    updateEDITemplateAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplateAttributes_ID: Evolve.Joi.number().required(),
            EvolveEDITemplate_ID: Evolve.Joi.number().required(),
            EvolveEDITemplateAttributes_Parent: Evolve.Joi.number().required(),
            EvolveEDITemplateAttributes_Code: Evolve.Joi.string().required(),
            // EvolveEDITemplateAttributes_Type: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Default: Evolve.Joi.string().required(),
            // EvolveEDITemplateAttributes_Group: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveEDITemplateAttributes_IsDefault: Evolve.Joi.boolean().required(),
            EvolveEDITemplateAttributes_Rules: Evolve.Joi.string().required().allow(''),

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
    getEDITemplateAttributesList: async function (req, res, next) {
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
    getSingleEDITemplateAttributesData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplateAttributes_ID: Evolve.Joi.number().required(),
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
    checkAttributesCode: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplateAttributes_Parent: Evolve.Joi.number().required(),
            EvolveEDITemplateAttributes_Code: Evolve.Joi.string().required(),
            EvolveEDITemplate_ID: Evolve.Joi.string().required(),
            EvolveEDITemplateAttributes_ID: Evolve.Joi.number().required().allow(''),
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
    getParentAttributeList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplate_ID: Evolve.Joi.number().required(),
            // EvolveEDITemplateAttributes_Group: Evolve.Joi.string().required(),
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
    deleteEDITemplateAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveEDITemplateAttributes_ID: Evolve.Joi.number().required(),
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