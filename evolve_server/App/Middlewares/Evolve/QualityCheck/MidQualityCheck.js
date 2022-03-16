'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addQCTemplate: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveQCTemp_Name: Evolve.Joi.string().required(),
            EvolveQCTemp_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2301: Error while adding QC Template "+validateEvolveData.error);
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

    updateQCTempalte: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveQCTemp_ID: Evolve.Joi.number().required(),
            EvolveQCTemp_Name: Evolve.Joi.string().required(),
            EvolveQCTemp_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2302: Error while updating QC Tempalte "+validateEvolveData.error);
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

    addQCValue: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveQCTemp_ID: Evolve.Joi.number().required(),
            EvolveQCVal_Seq: Evolve.Joi.number().required(),
            EvolveQCVal_Desc: Evolve.Joi.string().required(),
            EvolveQCVal_Type: Evolve.Joi.string().required(),
            EvolveQCVal_Value: Evolve.Joi.string().required().allow(''),
            EvolveQCVal_Compare_Type: Evolve.Joi.string().required(),
            EvolveQCVal_Compare_Value: Evolve.Joi.string().required().allow(''),
            EvolveQCVal_Required: Evolve.Joi.boolean().required(),
            EvolveQCVal_Auto: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2303: Error while adding QC Value "+validateEvolveData.error);
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

    getQCTemplateList : async function (req, res, next) {
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
            Evolve.Log.error(" EERR2304: Error while getting QC Template List "+validateEvolveData.error);
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