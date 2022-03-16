'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getStausCodeListAuth : async function (req, res, next) {
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
            Evolve.Log.error(" EERR3023: Error while authenticate getStausCodeListAuth "+validateEvolveData.error);
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

    addApprovalMatrixAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveApprovalMatrix_Type: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_Code: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_Name: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_IsEmailNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsMessageNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsWPMessageNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsQxtendReq: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_Status: Evolve.Joi.number().required(),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3024: Error while authenticate addStatusCodeAuth "+validateEvolveData.error);
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
    getSingleMatrixDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3025: Error while authenticate getSingleMatrixDetailsAuth "+validateEvolveData.error);
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
    getMatrixDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3025: Error while authenticate getMatrixDetailsAuth "+validateEvolveData.error);
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

    updateApprovalMatrixDetailsAuth: async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveApprovalMatrix_ID: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_Type: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_Code: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_Name: Evolve.Joi.string().required(),
            EvolveApprovalMatrix_IsEmailNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsMessageNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsWPMessageNotif: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_IsQxtendReq: Evolve.Joi.number().required(),
            EvolveApprovalMatrix_Status: Evolve.Joi.number().required(),

        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3026: Error while authenticate updateApprovalMatrixDetailsAuth "+validateEvolveData.error);
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

    // Matrix index details 

    getMatrixDetailsAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate getMatrixDetailsAuth "+validateEvolveData.error);
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
    getTableColumnListAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            tablesList : Evolve.Joi.required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate getTableColumnListAuth "+validateEvolveData.error);
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
    saveMatrixDetailsAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveApprovalMatrixIndex_Name : Evolve.Joi.string().required(),
            EvolveApprovalMatrixIndex_Seq : Evolve.Joi.number().required(),
            EvolveApprovalMatrixDetails : Evolve.Joi.array().required(),
            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
            EvolveApprovalMatrixIndex_ID : Evolve.Joi.number().required().allow(null),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate saveMatrixDetailsAuth "+validateEvolveData.error);
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
    getMatrixDetailsListAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
            EvolveApprovalMatrixIndex_Seq : Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate getMatrixDetailsListAuth "+validateEvolveData.error);
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
    getMatrixIndexListAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),


        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate getMatrixIndexListAuth "+validateEvolveData.error);
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
    getHighSequenceMAtDetailListAuth : async function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({

            EvolveApprovalMatrix_ID : Evolve.Joi.number().required(),
            EvolveApprovalMatrixIndex_Seq : Evolve.Joi.number().required(),



        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR3023: Error while authenticate getHighSequenceMAtDetailListAuth "+validateEvolveData.error);
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