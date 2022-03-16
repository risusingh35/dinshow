'use strict';
const Evolve = require('../../../../Boot/Evolve');
module.exports = {

    getUnitListAuth: function (req, res, next) {
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
            Evolve.Log.error(" EERR2337: Error while getting Unit List Auth  " +validateEvolveData.error.toString());
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
    updateUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnit_ID: Evolve.Joi.number().required(),
            EvolveCompany_ID: Evolve.Joi.number().required(),
            EvolveUnit_Name: Evolve.Joi.string().required(),
            EvolveUnit_Description: Evolve.Joi.string().required(),
            EvolveUnit_Location: Evolve.Joi.string().required(),
            EvolveUnit_LogoImage: Evolve.Joi.string().required().allow(''),
            // EvolveUnit_DBUser: Evolve.Joi.string().required(),
            // EvolveUnit_Password: Evolve.Joi.string().required(),
            // EvolveUnit_Instance: Evolve.Joi.string().required(),
            // EvolveUnit_Port: Evolve.Joi.number().required(),
            EvolveUnit_IsActive: Evolve.Joi.boolean().required(),
            imageChanged : Evolve.Joi.required(),
            EvolveUnit_Email: Evolve.Joi.string().required(),
            EvolveUnit_Gstin: Evolve.Joi.string().required(),
            EvolveUnit_MachingField: Evolve.Joi.string().required(),
            EvolveUnit_Identifier: Evolve.Joi.string().required(),
            EvolveUnit_Code : Evolve.Joi.string().required(),
            EvolveUnit_Pin : Evolve.Joi.number().required().allow(''),
            EvolveUnit_Address : Evolve.Joi.string().required().allow(''),
            EvolveUnit_StateCode : Evolve.Joi.number().required().allow(''),
            EvolveUnit_Phone : Evolve.Joi.string().required().allow(''),
            EvolveUnit_GstnUser : Evolve.Joi.string().required().allow(''),
            EvolveUnit_GstnPass : Evolve.Joi.string().required().allow(''),
            EvolveUnit_Rek : Evolve.Joi.string().required().allow(''),
            EvolveUnit_Country : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2338: Error while updating Unit List Auth " +validateEvolveData.error.toString());
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
    createUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveCompany_ID: Evolve.Joi.number().required(),
            EvolveUnit_Name: Evolve.Joi.string().required(),
            EvolveUnit_Description: Evolve.Joi.string().required(),
            EvolveUnit_Location: Evolve.Joi.string().required(),
            EvolveUnit_LogoImage: Evolve.Joi.string().required().allow(''),
            // EvolveUnit_DBUser: Evolve.Joi.string().required(),
            // EvolveUnit_Password: Evolve.Joi.string().required(),
            // EvolveUnit_Instance: Evolve.Joi.string().required(),
            // EvolveUnit_Port: Evolve.Joi.number().required(),
            EvolveUnit_IsActive: Evolve.Joi.boolean().required(),
            EvolveUser_ID: Evolve.Joi.number().required(),
            EvolveUnit_Email: Evolve.Joi.string().required(),
            EvolveUnit_Gstin: Evolve.Joi.string().required(),
            EvolveUnit_MachingField: Evolve.Joi.string().required(),
            EvolveUnit_Identifier : Evolve.Joi.string().required(),
            EvolveUnit_Code : Evolve.Joi.string().required(),
            EvolveUnit_Pin : Evolve.Joi.number().required().allow(''),
            EvolveUnit_Address : Evolve.Joi.string().required().allow(''),
            EvolveUnit_StateCode : Evolve.Joi.number().required().allow(''),
            EvolveUnit_Phone : Evolve.Joi.string().required().allow(''),
            EvolveUnit_GstnUser : Evolve.Joi.string().required().allow(''),
            EvolveUnit_GstnPass : Evolve.Joi.string().required().allow(''),
            EvolveUnit_Rek : Evolve.Joi.string().required().allow(''),
            EvolveUnit_Country : Evolve.Joi.string().required().allow(''),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error(" EERR2339: Error while creating Unit Auth " +validateEvolveData.error.toString());
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
    selectSingleUnitAuth: function (req, res, next) {
        const rulesSchema = Evolve.Joi.object({
            EvolveUnit_ID: Evolve.Joi.number().required(),
        });
        const validateEvolveData = Evolve.Joi.validate(req.body, rulesSchema, {
            allowUnknown: false,
            abortEarly: false
        });

        if (validateEvolveData.error) {
            Evolve.Log.error("  EERR2340: Error while selecting Single Unit Auth " +validateEvolveData.error.toString());
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