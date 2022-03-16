'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    createVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_Code: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2539 : All Validations are required while create variance  group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2539 : All Validations are required while create variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getSingleVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2540 : All Validations are required while get single variance group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2540 : All Validations are required while get single variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    updateVarianceGroup: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVarianceGroup_Code: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Name: Evolve.Joi.string().required(),
            EvolveVarianceGroup_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2541 : All Validations are required while update variance  group");
            let obj = {statusCode: 400,status: "fail",message: "EERR2541 : All Validations are required while update variance group",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    createVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVariance_Code: Evolve.Joi.string().required(),
            EvolveVariance_Name: Evolve.Joi.string().required(),
            EvolveVariance_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2542 : All Validations are required while create variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2542 : All Validations are required while create variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getVarianceAll: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2542 : All Validations are required while get variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2542 : All Validations are required while get variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    getSingleVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVariance_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2544 : All Validations are required while get single variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2544 : All Validations are required while get single variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },

    updateVariance: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveVariance_ID: Evolve.Joi.number().required(),
            EvolveVarianceGroup_ID: Evolve.Joi.number().required(),
            EvolveVariance_Code: Evolve.Joi.string().required(),
            EvolveVariance_Name: Evolve.Joi.string().required(),
            EvolveVariance_Description: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(validateEvolveData.error);
            Evolve.Log.error("EERR2545 : All Validations are required while update variance");
            let obj = {statusCode: 400,status: "fail",message: "EERR2545 : All Validations are required while update variance",result: null};
            res.send(obj);
        } else {
            next();
        }
    },
}