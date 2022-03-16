'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getQuestionListAuth: async function (req, res, next) {
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
            Evolve.Log.error(" EERR32815: Error while Auth getQuestionListAuth " + validateEvolveData.error);
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
    addQuestionAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMedQuests_Name: Evolve.Joi.string().required(),
            EvolveMedQuests_FieldType: Evolve.Joi.string().required(),
            EvolveMedQuests_Type: Evolve.Joi.string().required(),
            EvolveMedQuests_Options: Evolve.Joi.string().required().allow(''),
            EvolveMedQuests_IsActive: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32816: Error while Auth addQuestionAuth" + validateEvolveData.error);
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


    getSingalQuestionDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMedQuests_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32817: Error while Auth getSingalQuestionDetailsAuth" + validateEvolveData.error);
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
    updatQuestionDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMedQuests_Name: Evolve.Joi.string().required(),
            EvolveMedQuests_FieldType: Evolve.Joi.string().required(),
            EvolveMedQuests_Type: Evolve.Joi.string().required(),
            EvolveMedQuests_Options: Evolve.Joi.string().required().allow(''),
            EvolveMedQuests_IsActive: Evolve.Joi.number().required(),
            EvolveMedQuests_ID: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32818: Error while Auth updatQuestionDetailsAuth" + validateEvolveData.error);
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
    
    deleteQuestionAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMedQuests_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR32819: Error while Auth deleteQuestionAuth" + validateEvolveData.error);
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