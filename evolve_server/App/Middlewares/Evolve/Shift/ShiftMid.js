'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getShiftListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2325: Error while getting shift list auth " +validateEvolveData.error.toString());
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
    addShift: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveShift_Name: Evolve.Joi.string().required(),
            EvolveShift_Start: Evolve.Joi.string().required(),
            EvolveShift_Desc: Evolve.Joi.string().required().allow(''),
            EvolveShift_End: Evolve.Joi.string().required(),
            EvolveShift_Desc: Evolve.Joi.string().required(),
            EvolveShift_Code: Evolve.Joi.string().required(),
            EvolveShift_Type: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2326: Error while adding shift list " +validateEvolveData.error);
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
    getSingleShift: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2327: Error while getting single shift " +validateEvolveData.error);
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
    updateShift: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveShift_ID: Evolve.Joi.number().required(),
            EvolveShift_Name: Evolve.Joi.string().required(),
            EvolveShift_Desc: Evolve.Joi.string().required().allow(''),
            EvolveShift_Start: Evolve.Joi.string().required(),
            EvolveShift_End: Evolve.Joi.string().required(),
            EvolveShift_Code: Evolve.Joi.string().required(),
            EvolveShift_Type: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2328: Error while updating shift " +validateEvolveData.error);
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