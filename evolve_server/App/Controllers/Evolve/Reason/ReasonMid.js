'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    createReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_Name: Evolve.Joi.string().required(),
            EvolveReason_Desc: Evolve.Joi.string().required(),
            EvolveReason_Code: Evolve.Joi.string().required(),
            EvolveReason_Type : Evolve.Joi.string().required(),
            EvolveReason_IsParent : Evolve.Joi.boolean(),
            EvolveReasonRules_IsScarpReq : Evolve.Joi.boolean(),
            EvolveReasonRules_IsCommentsReq : Evolve.Joi.boolean(),
            EvolveReasonRules_IsQtyReq : Evolve.Joi.boolean()
            // EvolveReason_Colour: Evolve.Joi.string().required(),
            // EvolveReason_Status: Evolve.Joi.number().required(),
            // selectedMachineArray : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2305: Error while creating Reason Auth "+validateEvolveData.error.toString());
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

    selectSingleReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: true,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2306: Error while selecting single reason auth "+validateEvolveData.error.toString());
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

    updateReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_ID : Evolve.Joi.number().required(),
            EvolveReason_Name: Evolve.Joi.string().required(),
            EvolveReason_Desc: Evolve.Joi.string().required(),
            EvolveReason_Code: Evolve.Joi.string().required(),
            reasonType : Evolve.Joi.string().required(),
            reasonIsParent : Evolve.Joi.boolean(),
            EvolveReasonRules_IsScarpReq : Evolve.Joi.boolean(),
            EvolveReasonRules_IsCommentsReq : Evolve.Joi.boolean(),
            EvolveReasonRules_IsQtyReq : Evolve.Joi.boolean()
            // EvolveReason_Colour: Evolve.Joi.string().required(),
            // EvolveReason_Status: Evolve.Joi.number().required(),
            // selectedMachineArray : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2307: Error while updating reason auth "+validateEvolveData.error.toString());
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

    changeReasonStatusAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReason_ID : Evolve.Joi.number().required(),
            EvolveReason_Status: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2308: Error while changing reason status auth "+validateEvolveData.error.toString());
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
    getAllReasonListAuth : async function (req, res, next) {
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
}
