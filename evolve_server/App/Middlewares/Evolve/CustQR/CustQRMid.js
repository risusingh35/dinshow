'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getCustQRListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2580: Error while get Cust QR list "+validateEvolveData.error);
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

    getTableFieldsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            table: Evolve.Joi.string().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2578: Error while get table fileds  "+validateEvolveData.error);
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
    addCustQRAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQRTemplate_ID: Evolve.Joi.number().required(),
            EvolveCustQR_Name: Evolve.Joi.string().required(),
            EvolveCustQR_Code: Evolve.Joi.string().required(),
            EvolveCustQR_IndexNumber: Evolve.Joi.number().required(),
            EvolveCustQR_Separator: Evolve.Joi.string().required(),
            EvolveCustQR_ValueType: Evolve.Joi.number().required(),
            EvolveCustQR_Static_Value: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_IsSingle: Evolve.Joi.boolean().required(),
            EvolveCustQR_Table: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_Field: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_MatchFeild: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2579: Error while add Cust QR "+validateEvolveData.error);
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
   
    getSingleCustQRAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQR_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2581: Error while get Single Cust QR "+validateEvolveData.error);
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
    updateCustQRAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCustQR_ID: Evolve.Joi.number().required(),
            EvolveCustQRTemplate_ID: Evolve.Joi.number().required(),
            EvolveCustQR_Name: Evolve.Joi.string().required(),
            EvolveCustQR_Code: Evolve.Joi.string().required(),
            EvolveCustQR_IndexNumber: Evolve.Joi.number().required(),
            EvolveCustQR_Separator: Evolve.Joi.string().required(),
            EvolveCustQR_ValueType: Evolve.Joi.number().required(),
            EvolveCustQR_Static_Value: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_IsSingle: Evolve.Joi.boolean().required(),
            EvolveCustQR_Table: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_Field: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_MatchFeild: Evolve.Joi.string().required().allow(''),
            EvolveCustQR_Status: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2582: Error while update Cust QR "+validateEvolveData.error);
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