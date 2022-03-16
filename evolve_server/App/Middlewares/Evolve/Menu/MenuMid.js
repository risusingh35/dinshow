'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getAllMenulistAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            displayRecord: Evolve.Joi.number().required(),
            startFrom: Evolve.Joi.number().required(),
            search: Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2268: Error while getting All Menu list Auth " + validateEvolveData.error.toString());
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
    getMenusByAppIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2269: Error while getting Menus By App Id Auth " + validateEvolveData.error.toString());
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

    selectSingleMenuAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2270: Error while selecting Single Menu Auth " + validateEvolveData.error.toString());
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
    createMenuAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required().allow(''),
            EvolveMenu_Parent: Evolve.Joi.number().required(),
            EvolveMenu_Name: Evolve.Joi.string().required(),
            EvolveMenu_Desc: Evolve.Joi.string().required(),
            EvolveMenu_Url: Evolve.Joi.string().required(),
            EvolveMenu_IsActive: Evolve.Joi.boolean().required(),
            // EvolveMenu_Icon: Evolve.Joi.string().required().allow(''),
            EvolveMenu_IsReportPage: Evolve.Joi.boolean().required(),
            EvolveUser_IframeUrl: Evolve.Joi.string().required().allow('').allow(null).required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: true,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2271: Error while creating Menu Auth " + validateEvolveData.error.toString());
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
    updateMenuAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_Id: Evolve.Joi.number().required(),
            EvolveMenu_AppId: Evolve.Joi.number().required().allow(''),
            EvolveMenu_Parent: Evolve.Joi.string().required(),
            EvolveMenu_Name: Evolve.Joi.string().required(),
            EvolveMenu_Desc: Evolve.Joi.string().required(),
            EvolveMenu_Url: Evolve.Joi.string().required(),
            EvolveMenu_IsActive: Evolve.Joi.boolean().required(),
            // EvolveMenu_Icon: Evolve.Joi.string().required(),
            EvolveMenu_IsReportPage: Evolve.Joi.boolean().required(),
            EvolveUser_IframeUrl: Evolve.Joi.string().required().allow('').allow(null).required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: true,
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2272: Error while updating Menu Auth " + validateEvolveData.error.toString());
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
    deleteMenu: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2273: Error while deleting Menu " + validateEvolveData.error);
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