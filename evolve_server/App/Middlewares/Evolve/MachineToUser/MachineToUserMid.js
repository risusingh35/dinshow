'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getMachinetoUserListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2264: Error while getting Machine to User List Auth "+validateEvolveData.error.toString());
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
    addMachineToUser: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveMachineToUser_DefaultMenu: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2265: Error while adding Machine To User "+validateEvolveData.error);
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

    getSingleMachineToUser: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachineToUser_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2266: Error while getting Single Machine To User "+validateEvolveData.error);
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

    updateMachineToUser: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachineToUser_ID: Evolve.Joi.number().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveMachineToUser_DefaultMenu: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2267: Error while updating Machine To User "+validateEvolveData.error);
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