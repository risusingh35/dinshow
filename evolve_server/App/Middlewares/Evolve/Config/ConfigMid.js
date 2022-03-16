'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getConfigListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            search : Evolve.Joi.string().required().allow(''),
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2207: Error while get config list "+validateEvolveData.error.toString());
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

            EvolveConfig_Key: Evolve.Joi.string().required(),
            // EvolveCompany_Host: Evolve.Joi.string().required(),
            EvolveConfig_Value: Evolve.Joi.string().required(),
            // Evolve_Apps: Evolve.Joi.array().required(),
            EvolveConfig_Desc: Evolve.Joi.string().required().allow('')
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2207: Error while adding Config Auth "+validateEvolveData.error.toString());
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

            EvolveConfig_ID: Evolve.Joi.number().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2208: Error while getting Single Config Data Auth "+validateEvolveData.error.toString());
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

            EvolveConfig_Key: Evolve.Joi.string().required(),
            // EvolveCompany_Host: Evolve.Joi.string().required(),
            EvolveConfig_Value: Evolve.Joi.string().required(),
            // Evolve_Apps: Evolve.Joi.array().required(),
            EvolveConfig_Desc: Evolve.Joi.string().required().allow(''),
            EvolveConfig_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2209: Error while updating Config Auth "+validateEvolveData.error.toString());
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