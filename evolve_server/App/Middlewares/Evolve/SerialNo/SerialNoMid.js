'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getSerialNumberListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2320: Error while getting Serial Number List Auth "+validateEvolveData.error.toString());
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
    addSerialNumber: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSerial_Code: Evolve.Joi.string().required(),
            EvolveSerial_Desc: Evolve.Joi.string().required(),
            EvolveSerial_Active: Evolve.Joi.number().required(),
            EvolveSerial_Prefix: Evolve.Joi.string().required(),
            EvolveSerial_Start: Evolve.Joi.number().required(),
            EvolveSerial_Next: Evolve.Joi.number().required(),
            // EvolveSerial_WoLimit: Evolve.Joi.number().required(),
            EvolveSerial_Width: Evolve.Joi.number().required(),
            EvolveSerial_Reset: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2321: Error while adding serial number "+validateEvolveData.error.toString());
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

    updateSerialNumber: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSerial_ID: Evolve.Joi.number().required(),
            EvolveSerial_Code: Evolve.Joi.string().required(),
            EvolveSerial_Desc: Evolve.Joi.string().required(),
            EvolveSerial_Active: Evolve.Joi.number().required(),
            EvolveSerial_Prefix: Evolve.Joi.string().required(),
            EvolveSerial_Start: Evolve.Joi.number().required(),
            EvolveSerial_Next: Evolve.Joi.number().required(),
            // EvolveSerial_WoLimit: Evolve.Joi.number().required(),
            EvolveSerial_Width: Evolve.Joi.number().required(),
            EvolveSerial_Reset: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2322: Error while updating serial number "+validateEvolveData.error.toString());
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

    getSingleSerialNumber: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2323: Error while getting serial number "+validateEvolveData.error);
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

    deleteSerialNumber: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2324: Error while deleting serial number "+validateEvolveData.error);
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