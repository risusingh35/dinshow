'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getDSTokenList: function (req, res, next) {
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
            Evolve.Log.error(" EERR2337: Error while getting DS Token Auth  " +validateEvolveData.error.toString());
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
    updateDSToken: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDSToken_ID: Evolve.Joi.number().required(),
            EvolveUser: Evolve.Joi.number().required(),
            EvolveDSToken_Name: Evolve.Joi.string().required(),
            EvolveDSToken_Code: Evolve.Joi.string().required(),
            EvolveDSToken_Pin: Evolve.Joi.string().required(),
            EvolveDSToken_Token: Evolve.Joi.string().required(),
            EvolveDSToken_Desc: Evolve.Joi.string().required(),
            EvolveDSToken_ExpiryDate: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2338: Error while updating Unit List Auth " +validateEvolveData.error.toString());
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
    addDSToken: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser: Evolve.Joi.number().required(),
            EvolveDSToken_Name: Evolve.Joi.string().required(),
            EvolveDSToken_Code: Evolve.Joi.string().required(),
            EvolveDSToken_Pin: Evolve.Joi.string().required(),
            EvolveDSToken_Token: Evolve.Joi.string().required(),
            EvolveDSToken_Desc: Evolve.Joi.string().required(),
            EvolveDSToken_ExpiryDate: Evolve.Joi.string().required(),
          
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2339: Error while creating DS Token " +validateEvolveData.error.toString());
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

    getSingleDSToken: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDSToken_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  EERR2340: Error while selecting Single DS Token " +validateEvolveData.error.toString());
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