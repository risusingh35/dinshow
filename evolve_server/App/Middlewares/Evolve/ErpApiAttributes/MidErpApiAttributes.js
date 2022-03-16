'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addErpApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Type: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Default: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Group: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveERPApiAttributes_IsDefault: Evolve.Joi.boolean().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2224: Error while adding ERP Api Attributes " + validateEvolveData.error);
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
    updateERPApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required(),
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Type: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Default: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Group: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveERPApiAttributes_IsDefault: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2225: Error while updating ERP Api Attributes " + validateEvolveData.error);
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
    getERPApiAttributesList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting ERP Api Attributes List " + validateEvolveData.error);
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
    getSingleErpApiAttributesData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting ERP Api Attributes List " + validateEvolveData.error);
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
    checkAttributesCode: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveERPApi_ID: Evolve.Joi.string().required(),
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Check ERP Api Attributes code " + validateEvolveData.error);
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
    getParentAttributeList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApi_ID: Evolve.Joi.number().required(),
            EvolveERPApiAttributes_Group: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting ERP Api Attributes parent attributes " + validateEvolveData.error);
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
    deleteERPApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveERPApiAttributes_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting ERP Api Attributes " + validateEvolveData.error);
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