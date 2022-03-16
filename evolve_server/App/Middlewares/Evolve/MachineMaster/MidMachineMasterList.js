'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getmachineMasterListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2253: Error while getting machine Master List Auth "+validateEvolveData.error.toString());
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
    addMachineMasterAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_Name: Evolve.Joi.string().required(),
            EvolveMachine_Desc: Evolve.Joi.string().required(),
            EvolveMachine_Capacity: Evolve.Joi.string().required().allow(''),
            EvolveSection_ID: Evolve.Joi.number().required(),
            EvolveMachine_Supplier: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Address: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Contact: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Email: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Status: Evolve.Joi.number().required(),
            EvolveLocation_Type: Evolve.Joi.string().required().allow(''),
            EvolveLocationGroup_ID: Evolve.Joi.number().required().allow(''),
            machineAsLocation: Evolve.Joi.boolean().required().allow(false),
            EvolveMachine_IotEnabled: Evolve.Joi.number().required(),
            // EvolveLocation_Status: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2254: Error while adding Machine Master Auth "+validateEvolveData.error);
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
    selectSingleMaster: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2255: Error while selecting Single Master "+validateEvolveData.error);
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

    updateMachineMasterAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveMachine_ID: Evolve.Joi.number().required(),
           EvolveMachine_Name: Evolve.Joi.string().required(),
            EvolveMachine_Desc: Evolve.Joi.string().required(),
            EvolveMachine_Capacity: Evolve.Joi.string().required().allow(''),
            EvolveSection_ID: Evolve.Joi.number().required(),
            EvolveMachine_Supplier: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Address: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Contact: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Email: Evolve.Joi.string().required().allow(''),
            EvolveMachine_Status: Evolve.Joi.number().required(),
            EvolveLocation_Type: Evolve.Joi.string().required().allow(''),
            EvolveLocationGroup_ID: Evolve.Joi.number().required().allow(''),
            machineAsLocation: Evolve.Joi.boolean().required().allow(false),
            // EvolveLocation_Status: Evolve.Joi.string().required().allow(''),
            assignedLocationId: Evolve.Joi.number().required().allow(''),
            EvolveMachine_IotEnabled: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2256: Error while updating Machine Master Auth "+validateEvolveData.error);
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


    assignMachineToReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReasonList: Evolve.Joi.array().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2257: Error while assigning Machine To Reason Auth "+validateEvolveData.error.toString());
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

    updateMachineToReasonAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveReasonList: Evolve.Joi.array().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2258: Error while updating Machine To Reason Auth "+validateEvolveData.error.toString());
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

    getReasonsForMachineAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveMachine_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2259: Error while getting Reasons For Machine Auth "+validateEvolveData.error.toString());
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