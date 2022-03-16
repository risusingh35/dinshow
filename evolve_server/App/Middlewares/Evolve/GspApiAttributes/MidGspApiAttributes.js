'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    addGspApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Type: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Default: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Group: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveGSPApiAttributes_IsDefault: Evolve.Joi.boolean().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2224: Error while adding Gsp " + validateEvolveData.error);
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
    updateGspApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApiAttributes_ID: Evolve.Joi.number().required(),
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Type: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Datatype: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Default: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Group: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_Status: Evolve.Joi.boolean().required(),
            EvolveGSPApiAttributes_IsDefault: Evolve.Joi.boolean().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2225: Error while updating Gsp " + validateEvolveData.error);
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
    getGSPApiAttributesList: async function (req, res, next) {
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
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
    getSingleGSPApiAttributesData: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApiAttributes_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
            EvolveGSPApiAttributes_Parent: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Code: Evolve.Joi.string().required(),
            EvolveGSPApi_ID: Evolve.Joi.string().required(),
            EvolveGSPApiAttributes_ID: Evolve.Joi.number().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
            EvolveGSPApi_ID: Evolve.Joi.number().required(),
            EvolveGSPApiAttributes_Group: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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
    deleteGspApiAttributes: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveGSPApiAttributes_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2226: Error while getting Gsp List " + validateEvolveData.error);
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