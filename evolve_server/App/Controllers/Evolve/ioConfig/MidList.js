'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getConfigListAuth : function (req, res, next){
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
            Evolve.Log.error(" EERR2229: Error while getting IO Config List Data "+validateEvolveData.error);
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

    addConfigAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveIOConfig_Key: Evolve.Joi.string().required(),
            EvolveIOConfig_Value: Evolve.Joi.string().required(),
            EvolveIOConfig_Desc: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("Error while validating add IO config auth  "+validateEvolveData.error.toString());
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
            EvolveIOConfig_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("Error while validating io single config data auth"+validateEvolveData.error.toString());
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
            EvolveIOConfig_Key: Evolve.Joi.string().required(),
            EvolveIOConfig_Value: Evolve.Joi.string().required(),
            EvolveIOConfig_Desc: Evolve.Joi.string().required().allow(''),
            EvolveIOConfig_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("Error while validating update io config api auth "+validateEvolveData.error.toString());
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