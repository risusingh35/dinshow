'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getMenuListAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required(),
            EvolveRole_ID: Evolve.Joi.number().required(),

           });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2491: Errror while authenticate getMenuList "+validateEvolveData.error.toString());
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
    getPageConfigsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_Id: Evolve.Joi.number().required(),

           });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2492: Errror while authenticate getPageConfigs "+validateEvolveData.error.toString());
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
    addRightsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolvePageConfig_ID: Evolve.Joi.number().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveMenu_Id: Evolve.Joi.number().required(),
            EvolveUserPageRights_Value: Evolve.Joi.string().required(),
            EvolveUserPageRights_Desc: Evolve.Joi.string().required(),
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2493: Errror while authenticate addRights "+validateEvolveData.error.toString());
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
    updateRightsAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveUserPageRights_ID: Evolve.Joi.number().required(),
            EvolvePageConfig_ID: Evolve.Joi.number().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveMenu_Id: Evolve.Joi.number().required(),
            EvolveUserPageRights_Value: Evolve.Joi.string().required(),
            EvolveUserPageRights_Desc: Evolve.Joi.string().required(),
         });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2494: Errror while authenticate updateRights "+validateEvolveData.error.toString());
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
    getUserRightsAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2495: Error while authenticate getUserRights "+validateEvolveData.error.toString());
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
    getSingleRightsDataAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUserPageRights_ID : Evolve.Joi.number().required(),
         
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2496: Error while authenticate getSingleRight "+validateEvolveData.error.toString());
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