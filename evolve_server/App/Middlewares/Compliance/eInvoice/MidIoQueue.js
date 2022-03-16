'use strict';
const Evolve = require("../../../../Boot/Evolve");
module.exports = {

    getIoReportData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            startDate: Evolve.Joi.required().allow(''),
            endDate: Evolve.Joi.required().allow(''),
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2229: Error while getting Io Report Data "+validateEvolveData.error);
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

    reQueueProcess: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveIO_ID: Evolve.Joi.required(),
            FileName : Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2231: Error while re Queue"+validateEvolveData.error);
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
    deleteIOQueue: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveIO_ID: Evolve.Joi.required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2231: Error while Delete IO Queue"+validateEvolveData.error);
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