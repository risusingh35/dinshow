'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getReadySerialNumberList : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord : Evolve.Joi.number().required(),
            startFrom : Evolve.Joi.number().required(),
            EvolveProdOrders_ID : Evolve.Joi.string().required().allow(''),
            EvolveItem_ID : Evolve.Joi.string().required().allow(''),
            EvolveProdOrdersDetail_Serial : Evolve.Joi.string().required().allow(''),
            startDate : Evolve.Joi.string().required().allow(''),
            endDate : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error("EERR2609 : Error while validating ready to export serial number list  "+validateEvolveData.error.toString());
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

    exportSerialNumber : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error("EERR2610 : Error while validating ready to export serial number  "+validateEvolveData.error.toString());
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

    exportSerialBulkNumber : function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveProdOrdersDetail_ID : Evolve.Joi.array().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error("EERR2611 : Error while validating ready to export bulk serial number "+validateEvolveData.error.toString());
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