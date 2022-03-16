'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    deleteUser: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            id: Evolve.Joi.number().required()
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2352: Error while delete User "+validateEvolveData.error);
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

    getCompanyListById: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2353: Error while getting Company List By Id "+validateEvolveData.error.toString());
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

    selectSingleUserAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2354: Error while selecting Single User Auth "+validateEvolveData.error.toString());
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

    updateUserAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser_login: Evolve.Joi.string().required(),
            EvolveUser_Name: Evolve.Joi.string().required(),
            EvolveUser_EmailID: Evolve.Joi.string().required(),
            EvolveUser_password: Evolve.Joi.string().allow('').allow(null).required(),
            // EvoleCompany_ID: Evolve.Joi.number().required(),
            // EvolveUnit_ID: Evolve.Joi.array().required(),
            // EvolveRole_ID: Evolve.Joi.array().required(),
            EvolveUser_IsActive: Evolve.Joi.boolean().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
            // EvolveUser_PrintAllow: Evolve.Joi.boolean().required(),
            // EvolveUser_CreatePoAllow: Evolve.Joi.boolean().required(),
            // EvolveUser_IsBranchUser: Evolve.Joi.boolean().required(),
            // EvolveUser_ActiveDirIsActive: Evolve.Joi.boolean().required(),
            // EvolveUser_ActiveDirUrl: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirBaseDN: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirUserName: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirPassword: Evolve.Joi.string().required().allow(''),
            // EvolveUser_DefaultMenu_ID: Evolve.Joi.number().required().allow('').allow(null).required().allow('null').required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2355: Error while updating User Auth "+validateEvolveData.error.toString());
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

    createUserAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUser_login: Evolve.Joi.string().required(),
            EvolveUser_Name: Evolve.Joi.string().required(),
            EvolveUser_EmailID: Evolve.Joi.string().required(),
            EvolveUser_password: Evolve.Joi.string().required(),
            // EvoleCompany_ID: Evolve.Joi.number().required(),
            // EvoleUnit_ID: Evolve.Joi.array().required(),
            // EvoleRole_ID: Evolve.Joi.array().required(),
            EvolveUser_IsActive: Evolve.Joi.boolean().required(),
            // EvolveUser_PrintAllow: Evolve.Joi.boolean().required(),
            // EvolveUser_CreatePoAllow: Evolve.Joi.boolean().required(),
            // EvolveUser_IsBranchUser: Evolve.Joi.boolean().required(),
            // EvolveUser_ActiveDirIsActive: Evolve.Joi.boolean().required(),
            // EvolveUser_ActiveDirUrl: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirBaseDN: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirUserName: Evolve.Joi.string().required().allow(''),
            // EvolveUser_ActiveDirPassword: Evolve.Joi.string().required().allow(''),
            // EvolveUser_DefaultMenu_ID: Evolve.Joi.number().required().allow('').allow(null).required().allow('null').required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2356: Error while creating User Auth "+validateEvolveData.error.toString());
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


    assignBranchAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBranch_ID: Evolve.Joi.array().required(),
            insertUser_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2357: Error while assigning Branch Auth "+validateEvolveData.error.toString());
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


    updateBranchAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveBranch_ID: Evolve.Joi.array().required(),
            insertUser_ID: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2358: Error while updating Branch Auth "+validateEvolveData.error.toString());
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
    getDefaultMenuList: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveMenu_AppId: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });
        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2359: Error while getting Default Menu List "+validateEvolveData.error.toString());
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
    getUsersListAuth : async function (req, res, next) {
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
            Evolve.Log.error("EERR3068 : Error while get user list "+validateEvolveData.error);
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