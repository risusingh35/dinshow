'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMenusByAppIdAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2216: Error while getting Menus By App Id Auth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2217: Error while selecting Single Menu Auth "+validateEvolveData.error.toString());
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
            EvolveMenu_Parent: Evolve.Joi.string().required(),
            EvolveMenu_Name: Evolve.Joi.string().required(),
            EvolveMenu_Desc: Evolve.Joi.string().required(),
            EvolveMenu_Url: Evolve.Joi.string().required(),
            EvolveMenu_IsActive: Evolve.Joi.boolean().required(),
            EvolveMenu_Icon: Evolve.Joi.string().required().allow('').allow(null).required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2218: Error while creating Menu Auth "+validateEvolveData.error.toString());
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
            EvolveMenu_Icon: Evolve.Joi.string().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2219: Error while updating Menu Auth "+validateEvolveData.error.toString());
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
            Evolve.Log.error(" EERR2220: Error while deleting Menu "+validateEvolveData.error);
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
    getCustomerListAuth: async function (req, res, next) {
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
            Evolve.Log.error("EERR3064 : Error while get customer list "+validateEvolveData.error);
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