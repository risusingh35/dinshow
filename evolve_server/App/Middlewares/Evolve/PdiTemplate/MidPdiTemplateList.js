'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addPDITemp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolvePDITemplateDetail_Label: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Type: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Value: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2277: Error while adding PDI Temp "+validateEvolveData.error);
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
  updatePDITempDetail: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplateDetail_ID: Evolve.Joi.number().required(),
            EvolvePDITemplate_ID: Evolve.Joi.number().required(),
            EvolvePDITemplateDetail_Label: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Type: Evolve.Joi.string().required(),
            EvolvePDITemplateDetail_Value: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2278: Error while updating PDI Temp Detail "+validateEvolveData.error);
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

    addPDITempCode: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplate_Code: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2279: Error while adding PDI Temp Code "+validateEvolveData.error);
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

    selectSinglePDITemp: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePDITemplateDetail_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2280: Error while selecting Single PDI Temp "+validateEvolveData.error);
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
    getPDITempDetailAuth: async function (req, res, next) {
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
            Evolve.Log.error(" EERR3061: Error while get pdi template list "+validateEvolveData.error);
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