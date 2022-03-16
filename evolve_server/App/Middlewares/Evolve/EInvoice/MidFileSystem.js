'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getDirectoryTreeAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            selectedServer: Evolve.Joi.string().required(),
            // type: Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32713 : Error while validating getDirectoryTreeAuth  "+validateEvolveData.error.toString());
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
    getDirectoryTreeByPathAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            path: Evolve.Joi.string().required(),
            search: Evolve.Joi.string().required().allow(''),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32714 : Error while validating getDirectoryTreeByPath  "+validateEvolveData.error.toString());
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
    renameSourceAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            pathFrom : Evolve.Joi.string().required(),
            pathTo : Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32713 : Error while validating renameSourceAuth  "+validateEvolveData.error.toString());
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
    moveSourceAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            moveFromPath : Evolve.Joi.string().required(),
            moveToPath : Evolve.Joi.string().required(),
            operationType : Evolve.Joi.string().required(),

           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32715 : Error while validating moveSourceAuth  "+validateEvolveData.error.toString());
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
    createResourseAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            sourseType : Evolve.Joi.string().required(),
            path : Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32716 : Error while validating createResourseAuth  "+validateEvolveData.error.toString());
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
    onUploadFileAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            sourseType : Evolve.Joi.string().required(),
            path : Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32717 : Error while validating onUploadFileAuth  "+validateEvolveData.error.toString());
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
    deleteResourceAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            path : Evolve.Joi.string().required(),
            type : Evolve.Joi.string().required(),
           
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("EERR32718 : Error while validating deleteResourceAuth  "+validateEvolveData.error.toString());
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