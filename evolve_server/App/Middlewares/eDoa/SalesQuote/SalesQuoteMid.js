'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {
    getApprovalListAuth : async function (req, res, next) {
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
            Evolve.Log.error(" EERR####: Error while authenticate getApprovalListAuth "+validateEvolveData.error);
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
            Evolve.Log.error(" EERR####: Error while authenticate addStatusCodeAuth "+validateEvolveData.error);
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
            Evolve.Log.error(" EERR####: Error while authenticate getSingleMatrixDetailsAuth "+validateEvolveData.error);
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