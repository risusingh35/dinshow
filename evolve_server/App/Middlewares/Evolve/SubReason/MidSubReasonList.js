'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getSubReasonFinalListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().allow(''),
            startFrom : Evolve.Joi.number().allow(''),
            search : Evolve.Joi.string().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while Sub Item List Auth " +validateEvolveData.error.toString());
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

    
    getReasonTypeChildListAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_Type: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error in child list " +validateEvolveData.error);
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
    insertSubReasonAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubReason_ActualReason_ID: Evolve.Joi.number().required(),
            EvolveSubReason_SubReason_ID: Evolve.Joi.number().required(),
            
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while inserting SubReason " +validateEvolveData.error);
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
    checkSubReasonsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubReason_ActualReason_ID: Evolve.Joi.number().required(),
            EvolveSubReason_SubReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while updating sub reasons" +validateEvolveData.error);
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

    updateSubReasonsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubReason_ID: Evolve.Joi.number().required(),
            EvolveSubReason_ActualReason_ID: Evolve.Joi.number().required(),
            EvolveSubReason_SubReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  Error while updating sub reasons" +validateEvolveData.error);
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
    checkSubReasonsEditAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubReason_ActualReason_ID: Evolve.Joi.number().required(),
            EvolveSubReason_SubReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while updating sub reasons" +validateEvolveData.error);
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
    selectSingleSubReasonAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveSubReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" Error while updating sub reasons" +validateEvolveData.error);
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