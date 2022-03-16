'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getProcessValListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2296: Error while getting Process Val List Auth "+validateEvolveData.error.toString());
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
    getSingleProcessVal: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProcessVal_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2298: Error while getting Single Process Val "+validateEvolveData.error);
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

    addProcessVal: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            // EvolveProcessVal_ID : Evolve.Joi.number().required(),
            selected_process: Evolve.Joi.number().required(),
            validation_sequence_number: Evolve.Joi.number().required(),
            validation_description: Evolve.Joi.string().required(),
            selected_validation_type: Evolve.Joi.string().required(),
            process_default_value: Evolve.Joi.string().required().allow(''),
            selected_process_validation_type: Evolve.Joi.string().required().allow(''),
            process_validation_value: Evolve.Joi.number().required().allow(''),
            is_required: Evolve.Joi.number().required(),
            is_auto: Evolve.Joi.number().required(),
           
            
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2299: Error while adding Process Val "+validateEvolveData.error);
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

    updateProcessVal: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProcessVal_ID: Evolve.Joi.number().required(),
            EvolveProcess_ID: Evolve.Joi.number().required(),
            EvolveProcessVal_Seq: Evolve.Joi.number().required(),
            EvolveProcessVal_Desc: Evolve.Joi.string().required(),
            EvolveProcessVal_Type: Evolve.Joi.string().required(),
            EvolveProcessVal_Compare_Type: Evolve.Joi.string().required().allow('').allow(null),
            EvolveProcessVal_Compare_Value: Evolve.Joi.number().required().allow('').allow(null),
            EvolveProcessVal_Required: Evolve.Joi.number().required(),
            EvolveProcessVal_Auto: Evolve.Joi.number().required(),
            EvolveProcessVal_Value: Evolve.Joi.string().required().allow(''),
           


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2300: Error while updating Process Val "+validateEvolveData.error);
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