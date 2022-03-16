'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    addBranchAuth: function (req, res, next) {

        const rulesSchema = Evolve.Joi.object({

            EvolveBranch_Name: Evolve.Joi.string().required(),
            EvolveBranch_Code: Evolve.Joi.string().required(),
            EvolveBranch_Desc: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_City: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_State: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Address: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Pin: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_GST: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Email: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Phone: Evolve.Joi.required().allow('').allow(null).required(),
            EvolveBranch_Region: Evolve.Joi.string().required().allow('').allow(null).required(),


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

    updateBranchAuth: function (req, res, next) {

        const rulesSchema = Evolve.Joi.object({

            EvolveBranch_ID: Evolve.Joi.number().required(),
            EvolveBranch_Name: Evolve.Joi.string().required(),
            EvolveBranch_Code: Evolve.Joi.string().required(),
            EvolveBranch_Desc: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_City: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_State: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Address: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Pin: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_GST: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Email: Evolve.Joi.string().required().allow('').allow(null).required(),
            EvolveBranch_Phone: Evolve.Joi.required().allow('').allow(null).required(),
            EvolveBranch_Region: Evolve.Joi.string().required().allow('').allow(null).required(),
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




    selectSingleBranchAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBranch_ID: Evolve.Joi.number().required(),
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
    // updateBusinessLineAuth: function (req, res, next) {
    //     const rulesSchema = Evolve.Joi.object({
    //         EvolveBusinessLine_Name: Evolve.Joi.string().required(),
    //         EvolveBusinessLine_Code: Evolve.Joi.string().required(),

    //         EvolveBusinessLine_Desc: Evolve.Joi.string().required(),
    //         EvolveBusinessLine_ID: Evolve.Joi.number().required(),


    //       });
    //     const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
    //         allowUnknown: false,
    //         abortEarly: false
    //     });

    //     if (validateEvolveData.error) {
    //         Evolve.Log.error(validateEvolveData.error.toString());
    //         res.send({
    //             statusCode: 400,
    //             status: 'fail',
    //             message: validateEvolveData.error.toString(),
    //             result: null
    //         });
    //     } else {
    //         next();
    //     }
    // },
    deleteBusinessLine: function (req, res, next) {
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

    assignLineToBranchAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveBranch_ID: Evolve.Joi.number().required(),
            businesslineArray: Evolve.Joi.array().required().allow([]),



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

    updateBusinessLineToBranchAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveBranch_ID: Evolve.Joi.number().required(),
            businesslineArray: Evolve.Joi.array().required(),



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