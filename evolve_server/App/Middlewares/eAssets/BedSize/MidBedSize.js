'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    addSizes: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSize_Name: Evolve.Joi.string().required(),
            EvolveSize_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2182: Error in adding sizes "+validateEvolveData.error.toString());
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
    editSizes: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSize_ID: Evolve.Joi.number().required(),
            EvolveSize_Name: Evolve.Joi.string().required(),
            EvolveSize_Desc: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2183: Error in editing Sizes "+validateEvolveData.error.toString());
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

    getSizes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            draw : Evolve.Joi.string().required(),
            columns : Evolve.Joi.array().required(),
            start : Evolve.Joi.number().required(),
            length : Evolve.Joi.number().required(),
            search : Evolve.Joi.object().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2183: Error in editing Sizes "+validateEvolveData.error);
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