'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getBomList : async function (req, res, next) {
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
            Evolve.Log.error(" EERR2200: Error while getting Bom List "+validateEvolveData.error);
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

    addBom: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePartBom_ParentItem_ID: Evolve.Joi.number().required(),
            EvolvePartBom_CompItem_ID: Evolve.Joi.number().required(),
            EvolvePartBom_QtyPer: Evolve.Joi.number().required(),
            EvolvePartBom_DispSeq: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2201: Error while adding Bom "+validateEvolveData.error);
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

    getBomDisplaySeq: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2202: Error while getting Bom Display Seq "+validateEvolveData.error);
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

    getSingleBom: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2203: Error while getting Single Bom "+validateEvolveData.error);
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

    updateBom: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePartBom_ID: Evolve.Joi.number().required(),
            EvolvePartBom_ParentItem_ID: Evolve.Joi.number().required(),
            EvolvePartBom_CompItem_ID: Evolve.Joi.number().required(),
            EvolvePartBom_QtyPer: Evolve.Joi.number().required(),
            EvolvePartBom_DispSeq: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2204: Error while updating Bom "+validateEvolveData.error);
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