'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getAllRoleAuth: function (req, res, next) {
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
             Evolve.Log.error(" EERR2309: Error while getting All Role Auth "+validateEvolveData.error.toString());
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
    createRoleAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveRole_Name: Evolve.Joi.string().required(),
            EvolveRole_Description: Evolve.Joi.string().required(),
            EvolveRole_IsActive: Evolve.Joi.boolean().required(),
            EvolveRole_DefaultMenu_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2310: Error while creating Role Auth "+validateEvolveData.error.toString());
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

    selectSingleRoleAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveRole_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2311: Error while selecting Single Role Auth "+validateEvolveData.error.toString());
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

    updateRoleAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveRole_ID: Evolve.Joi.number().required(),
            EvolveRole_Name: Evolve.Joi.string().required(),
            EvolveRole_Description: Evolve.Joi.string().required(),
            EvolveRole_IsActive: Evolve.Joi.boolean().required(),
            EvolveRole_DefaultMenu_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2312: Error while updating Role Auth "+validateEvolveData.error.toString());
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
    deleteRole: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2313: Error while deleting Role "+validateEvolveData.error);
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
    getDefaultMenuList: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
             Evolve.Log.error(" EERR2314: Error while getting Default Menu List "+validateEvolveData.error);
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