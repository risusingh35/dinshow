'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {


    getMachineToItemList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.query, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        // console.log(req.query);
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2260: Error while getting Machine To Item List "+validateEvolveData.error);
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

    addMachineToItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveMachineToItem_Capacity: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2261: Error while adding machine to item "+validateEvolveData.error);
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

    getSingleMachineToItem: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachineToItem_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2262: Error while getiting single machine to item "+validateEvolveData.error);
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

    updateMachineToItem: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMachineToItem_ID: Evolve.Joi.number().required(),
            EvolveMachine_ID: Evolve.Joi.number().required(),
            EvolveItem_ID: Evolve.Joi.number().required(),
            EvolveMachineToItem_Capacity: Evolve.Joi.number().required(),
            EvolveUom_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2263: Error while updating machine to item "+validateEvolveData.error);
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