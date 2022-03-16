'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    addBusinessLineAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBusinessLine_Name: Evolve.Joi.string().required(),
            EvolveBusinessLine_Code: Evolve.Joi.string().required(),

            EvolveBusinessLine_Desc: Evolve.Joi.string().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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

    getSingleBusinessLineAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBusinessLine_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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
    updateBusinessLineAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBusinessLine_Name: Evolve.Joi.string().required(),
            EvolveBusinessLine_Code: Evolve.Joi.string().required(),

            EvolveBusinessLine_Desc: Evolve.Joi.string().required(),
            EvolveBusinessLine_ID: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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
    deleteBusinessLineAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            id: Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error.toString());
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