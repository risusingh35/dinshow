'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addUnitToCustomerLink: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveDocument_ID : Evolve.Joi.number().required(),
            EvolveUnit_ID : Evolve.Joi.number().required(),
            EvolveSupplier_ID : Evolve.Joi.number().required(),
            EvolveUnitToCustomerLink_FromEmail_ID : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_ToEmail_ID : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_CCEmail_IDS : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_EmailSubject : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_EmailBody : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_Status : Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2341: Error while add Unit To Customer Link auth "+validateEvolveData.error.toString());
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
    getUnitToCustomerLinkList: function (req, res, next) {
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
            Evolve.Log.error(" EERR2341: Error while getting all conversation list auth "+validateEvolveData.error.toString());
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
    getSingleUnitToCustomerLink: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnitToCustomerLink_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2341: Error while getting all conversation list auth "+validateEvolveData.error.toString());
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
    updateUnitToCustomerLink: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnitToCustomerLink_ID : Evolve.Joi.number().required(),
            EvolveDocument_ID : Evolve.Joi.number().required(),
            EvolveUnit_ID : Evolve.Joi.number().required(),
            EvolveSupplier_ID : Evolve.Joi.number().required(),
            EvolveUnitToCustomerLink_FromEmail_ID : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_ToEmail_ID : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_CCEmail_IDS : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_EmailSubject : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_EmailBody : Evolve.Joi.string().required(),
            EvolveUnitToCustomerLink_Status : Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2341: Error while getting all conversation list auth "+validateEvolveData.error.toString());
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
    checkDuplicate: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnitToCustomerLink_ID : Evolve.Joi.number().required().allow(''),
            EvolveDocument_ID : Evolve.Joi.number().required(),
            EvolveUnit_ID : Evolve.Joi.number().required(),
            EvolveSupplier_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2341: Error while getting all conversation list auth "+validateEvolveData.error.toString());
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