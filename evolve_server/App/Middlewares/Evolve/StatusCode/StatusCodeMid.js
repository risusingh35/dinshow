'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getStausCodeListAuth : async function (req, res, next) {
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
            Evolve.Log.error(" EERR3023: Error while authenticate getStausCodeListAuth "+validateEvolveData.error);
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

    addStatusCodeAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
          
            EvolveStatusCodeMstr_Type: Evolve.Joi.string().required(),
            EvolveStatusCodeMstr_Code: Evolve.Joi.string().required(),
            EvolveStatusCodeMstr_Desc: Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3024: Error while authenticate addStatusCodeAuth "+validateEvolveData.error);
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
    getSingleCodeDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveStatusCodeMstr_Id : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3025: Error while authenticate getSingleCodeDetailsAuth "+validateEvolveData.error);
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

    updateCodeDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveStatusCodeMstr_Id: Evolve.Joi.number().required(),
            EvolveStatusCodeMstr_Type: Evolve.Joi.string().required(),
            EvolveStatusCodeMstr_Code: Evolve.Joi.string().required(),
            EvolveStatusCodeMstr_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3026: Error while authenticate updateCodeDetailsAuth "+validateEvolveData.error);
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