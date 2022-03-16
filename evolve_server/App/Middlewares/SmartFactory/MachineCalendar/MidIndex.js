'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {
    saveMachineCalendar : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            machineCalArray : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2488: Error while save machine calendar "+validateEvolveData.error);
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

    checkAlreadyExistCal : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            calMonth : Evolve.Joi.number().required(),
            calYear : Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2488: Error while save machine calendar "+validateEvolveData.error);
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